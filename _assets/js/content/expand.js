(function($) {

  $('.expand').on("click", function(){
    $(this).parents(".product-unit").toggleClass('expanded');
    $(this).html($(this).text() == 'Expand' ? 'Minimise' : 'Expand');
  });

})(jQuery);
