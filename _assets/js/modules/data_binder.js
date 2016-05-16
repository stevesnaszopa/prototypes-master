/*global window, Zopa, document, jQuery */

window.Zopa = window.Zopa || {};

/**
 * Helper for two way data binding
 *
 * @param object_id
 * @constructor
 */

Zopa.DataBinder = function DataBind(object_id) {
  "use strict";
  var pubSub = jQuery({});
  //end var

  jQuery(document).on("input change", "[data-bind-" + object_id + "]", function () {
    var $input = jQuery(this);
    pubSub.trigger(object_id + ":change", [ $input.data('bind-' + object_id), $input.val() ]);
  });

  jQuery(document).on("click", "[data-destroy='" + object_id + "']", function (e) {
    e.preventDefault();
    var $input = jQuery(this);
    pubSub.trigger(object_id + ":destroy", [ $input.data("destroy")]);
  });

  jQuery(document).on("click", "[data-find='" + object_id + "']", function (e) {
    e.preventDefault();
    var $input = jQuery(this);
    pubSub.trigger(object_id + ":find", [ $input.data("destroy")]);
  });

  jQuery(document).on("click", "[data-action-" + object_id + "]", function (e) {
    e.preventDefault();
    var $input = jQuery(this);
    pubSub.trigger(object_id + ":action", [ $input.data("action"), $input]);
  });

  pubSub.on(object_id + ":change", function (evt, prop_name, new_val) {
    jQuery("[data-bind=" + prop_name + "]").each(function () {
      var $bound = jQuery(this);

      if ($bound.is("input, textarea, select")) {
        $bound.val(new_val);
      } else {
        $bound.html(new_val);
      }
    });
  });

  return pubSub;
};