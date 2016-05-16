/* requiring/importing doesn't work yet,
   see https://github.com/KKBOX/FireApp/issues/260

//= require vendor/jquery-1.8.2.js
//= require focus
//= require jquery.aria
//= require mobile
//= require equal_heights
//= require currency_helper
//= require stuff

@import "vendor/jquery-1.8.2.js";
@import "focus";
@import "jquery.aria.js";
@import "mobile.js";
@import "equal_heights.js";
@import "currency_helper.js";
@import "stuff.js";
*/


(function($) {

  $('a').click(function(e){
    if ($(this).attr('href')) {
      if ($(this).attr('href').match(/\/404$/) || $(this).attr('href').match(/404\.html$/)) {
        e.preventDefault();
        alert("Unfortunately this link doesn't work, as this site is just a prototype.");
        return false;
      }
    }
  });

})(jQuery);
