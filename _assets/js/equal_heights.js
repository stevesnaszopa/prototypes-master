(function($) {

  // make a set of elements the same height
  $.fn.equalHeights = function() {
    var $this = $(this).find('.box, fieldset').not('.box .box');

    $this.css({'min-height': 0});
    var tallest = 0;
    $this.each( function() {
      var height = $(this).innerHeight();
      if ( height > tallest ) {
        tallest = height;
      }
    });
    $this.css({'min-height': tallest});
  };

  // undo equalHeights()
  $.fn.unequalHeights = function() {
    var $this = $(this).find('.box, fieldset').not('.box .box');
    $this.each( function() {
      $this.css({'min-height': 0});
    });
  };

  // don't use equalHeights() in mobile mode
  $.fn.equalHeightsByMode = function() {
    var screenMode = $(document).data('screenMode');
    var $this = $(this);
    if (screenMode == 'xs') {
      $this.unequalHeights();
    } else {
      $this.equalHeights();
    }
  };

  $(function() {
    var $elements = $('.equalHeights');

    $elements.each(function() {
      $(this).equalHeightsByMode();
    });
    $(document).bind('screen_mode_change', function() {
      $elements.each(function() {
        $(this).equalHeightsByMode();
      });
    });
  });

})(jQuery);
