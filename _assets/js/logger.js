window.Zopa = window.Zopa || {};
window.console = window.console || false;
window.JSON = window.JSON || false;

window.Zopa.LogManager = (function(){
  'use strict';

  var enabledLevels = { },
      filters = { };

  if (Zopa.LocalStorage.isAvailable() && window.JSON) {
    try {
      enabledLevels = Zopa.LocalStorage.getJson('log.levels') || enabledLevels;
      filters = Zopa.LocalStorage.getJson('log.filters') || filters;
    }
    catch(e) {
      if (window.console){
        window.console.log('Using Logger default values');
      }
      // can't read the settings so default values.
      enabledLevels = {'debug' : false, 'info' : false, 'warn' : false, 'error' : false};
      filters = { };
    }
  }

  var updateSettings = function(){
    if (Zopa.LocalStorage.isAvailable() && window.JSON) {
      Zopa.LocalStorage.setJson('log.levels', enabledLevels);
      Zopa.LocalStorage.setJson('log.filters', filters);
    }
  };

  var api = {
    isEnabled : function(level){
      return enabledLevels[level] || false;
    },
    levels : function(){
      for (var i = 0; i < arguments.length; i++){
        enabledLevels[arguments[i]] = true;
      }
      updateSettings();
    },
    disableLevel : function(level){
      enabledLevels[level] = false;
      updateSettings();
    },
    filter : function(){
      for (var i = 0; i < arguments.length; i++){
        filters[arguments[i]] = true;
      }
      updateSettings();
    },
    disableFilter : function(logger){
      filters[logger] = false;
      updateSettings();
    },
    isFiltered : function(logger){
      return filters[logger] || false;
    },
    settings: function() {
      if (window.console) {
        window.console.log(JSON.stringify({ levels: enabledLevels, filters: filters }));
      }
    },
    allthethings : function() {
      filters = {};
      enabledLevels = {'debug' : true, 'info' : true, 'warn' : true, 'error' : true };
      updateSettings();
    },
    silence : function() {
      enabledLevels = {'debug' : false, 'info' : false, 'warn' : false, 'error' : false };
      updateSettings();
    }
  };

  return api;

})();

window.Zopa.Log = function(namespace) {
  'use strict';

  var shouldLog = function(level) {
    return !window.Zopa.LogManager.isFiltered(namespace) && window.Zopa.LogManager.isEnabled(level);
  };

  var internalLogger = function(level, message, args) {
  if (shouldLog(level)) {
      try {
        var logger = 'log';
        message = internalFormatter(level, message, args);
        if (window.console) {
          for (var lvl in window.console){
            if (lvl === level){
              logger = [lvl];
            }
          }
          window.console[logger](message);
        }
      }
      catch (e) {
        return message;
      }
    }
  };
  var argumentReplace = function(message, args) {
    try {
      return message.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }
    catch (e) {
      return message;
    }
  };

  var leadingZero = function(value){
    if (value < 10){
      return '0' + value;
    } else {
      return '' + value;
    }
  };

  var dateString = function() {
    var d = new Date(),
      timePart = '' + leadingZero(d.getHours()) + ':' + leadingZero(d.getMinutes()) + ':' + leadingZero(d.getSeconds()),
      datePart = '' + d.getFullYear() + '-' + leadingZero(d.getMonth() + 1) + '-' + leadingZero(d.getDate());

    return datePart + 'T' + timePart;
  };

  var internalFormatter = function(level, message, args) {
    message = argumentReplace(message, args);
    var formatted = dateString() + ' [' + level.toUpperCase() + '] - ' + namespace + ' - ' + message;
    return formatted;
  };

  var spliceArgs = function(messageArgs){
    var args = Array.prototype.slice.call(messageArgs);
    return args.splice(1, args.length);
  };

  var api = {
    debug: function(message){
      internalLogger('debug', message, spliceArgs(arguments));
    },
    info : function(message){
      internalLogger('info', message, spliceArgs(arguments));
    },
    warn : function(message){
      internalLogger('warn', message, spliceArgs(arguments));
    },
    error : function(message) {
      internalLogger('error', message, spliceArgs(arguments));
    },
    dir : function(object){
      if (window.console.dir){
        window.console.dir(object);
      } else if (window.JSON) {
        internalLogger('debug', window.JSON.stringify(object));
      }
    },
    isDebugEnabled : function() {
      return shouldLog('debug');
    },
    isInfoEnabled : function() {
      return shouldLog('info');
    },
    isWarnEnabled : function() {
      return shouldLog('warn');
    },
    isErrorEnabled : function() {
      return shouldLog('error');
    }
  };

  return api;
};
