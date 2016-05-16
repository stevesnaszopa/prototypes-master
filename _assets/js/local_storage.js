window.Zopa = window.Zopa || {};

window.Zopa.LocalStorage = (function(){
  'use strict';
  var hasLocalStorage = false,
      api = {};

  // Test to ensure local storage exists and is usable, IE8 can have a
  // localStorage element but not allow you to use it so its presence is not
  // sufficient.
  try {
    var mod = 'localStorage-test';
    window.localStorage.setItem(mod, mod);
    window.localStorage.removeItem(mod);
    hasLocalStorage = true;
  } catch(e) {
  }

  api.isAvailable = function() {
    return hasLocalStorage;
  };

  api.getItem = function(key) {
    return window.localStorage.getItem(key);
  };

  api.setItem = function(key, value) {
    if (hasLocalStorage === false) {
      return null;
    }
    return window.localStorage.setItem(key, value);
  };

  api.getJson = function(key) {
    var value = api.getItem(key);
    return window.JSON.parse(value);
  };

  api.setJson = function(key, obj) {
    var value = window.JSON.stringify(obj);
    return api.setItem(key, value);
  };

  api.removeItem = function(key) {
    if (hasLocalStorage === false) {
      return null;
    }
    return window.localStorage.removeItem(key);
  };

  return api;
})();
