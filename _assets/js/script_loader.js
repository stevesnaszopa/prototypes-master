window.Zopa = window.Zopa || {};

/*
  Simple script loader for loading third party scripts
  after the page has loaded.
 */
Zopa.delayScriptLoad = (function($) {
  "use strict";

  var scripts = [];

  $(window).load(function() {

    for (var i=0; i<scripts.length; i++) {
      var script = scripts[i];
      script.call(this);
    }

  });

  return function(script, callback) {

    if (typeof(script) === 'function') {

      scripts.push(script);
    } else {
      scripts.push(function() {
        $.getScript(script, callback);
      });
    }
  };

})(jQuery);
