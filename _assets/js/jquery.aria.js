// jquery.aria is a wrapper round some common methods in order to make them more accessible
//
// In practice this means that aria attributes are added when a method is called
// for example:
//
// $('foo').aria('hide') is functionally the same as $('foo').hide()
// however the aria-expanded attribute is set to false.
//
// the following methods are implemented:
//
// * slideUp - which delegates to $.slideUp();
// * slideDown - which delegates to $.slideDown();
// * show - which delegates to $.slideUp();
// * hide - which delegates to $.slideDown();
// * polite - which is a convenience method to add the
//  'aria-live' attribute with the value 'polite'.
// * assertive - which is a convenience method to add the
//  'aria-live' attribute with the value 'assertive'.
// * controls - which is a convenience method to set the
//   'aria-controls' attribute with the value provided.
//
(function($){
  "use strict";

  var api = {
    slideUp : function() {
      var result = $.fn.slideUp.apply($(this), arguments);
      return result.attr('aria-expanded', false);
    },
    slideDown : function() {
      var result = $.fn.slideDown.apply($(this), arguments);
      return result.attr('aria-expanded', true);
    },
    show : function() {
      var result = $.fn.show.apply($(this), arguments);
      return result.attr('aria-expanded', true);
    },
    hide : function() {
      var result = $.fn.hide.apply($(this), arguments);
      return result.attr('aria-expanded', false);
    },
    polite : function() {
      return $(this).attr('aria-live', 'polite');
    },
    assertive : function() {
      return $(this).attr('aria-live', 'assertive');
    },
    controls : function(name) {
      return $(this).attr('aria-controls', name);
    }
  };

  $.fn.aria = function(method) {
    if (api[method]) {
      var args = Array.prototype.slice.call(arguments, 1);
      return api[method].apply(this, args);
    }
    else if (typeof method === 'object' || ! method) {
      return api.init.apply(this, arguments);
    }
    else {
      $.error( 'A Method named:' + method + ' does not exist on jQuery.aria' );
    }
  };
})(jQuery);