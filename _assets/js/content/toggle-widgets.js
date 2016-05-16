(function($) {

  $('.ls-summary').on('click', function(){
    $(this).parent().toggleClass('expanded');
    // Accordion effect
    $('.ls-row').not( $(this).parent() ).removeClass('expanded');
  });

})(jQuery);
