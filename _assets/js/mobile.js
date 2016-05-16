(function($) {
  //var log = window.Zopa.Log("mobile");

  function detectScreenMode() {
    // the z-index in mobile.css is (mis-)used purely for detecting the screen mode here
    var screenModeHelper = $('#screen-mode').css('z-index') + '';
    var screenMode = $(document).data('screenMode');
    var hasChanged = false;

    //log.info('entering detectScreenMode() - screenModeHelper: {0} screenMode: {1}', screenModeHelper, screenMode);

    switch (screenModeHelper) {
      case '1':
        hasChanged = screenMode !== 'm';
        screenMode = 'm'; // e.g. tablet landscape
        break;
      case '2':
        hasChanged = screenMode !== 's';
        screenMode = 's'; // e.g. tablet portrait
        break;
      case '3':
        hasChanged = screenMode !== 'xs';
        screenMode = 'xs'; // e.g. phone
        break;
      default:
        hasChanged = screenMode !== 'l';
        screenMode = 'l'; // e.g. desktop
    }

    if (hasChanged) {
      $(document).data('screen-mode', screenMode).trigger('screen_mode_change');
    }

    //log.info('exiting detectScreenMode() - screenModeHelper: {0} screenMode: {1} - hasChanged: {2}', screenModeHelper, screenMode, hasChanged);
  }

  function changeFooter ($footerLinks) {
    if ($(document).data('screenMode') == 'xs') {
      $footerLinks.find('ul').aria('hide');
      $footerLinks.find('h3').append('<span title="Show items">+</span>');

      $footerLinks.on('click', 'h3', function () {
        var $list = $(this).parent().find('ul');

        $list.toggle();

        if ($list.is(':visible')) {
          $(this).find('span').text('-').attr("title", "Hide items");
        }
        else {
          $(this).find('span').text('+').attr("title", "Show items");
        }
      });
    } else {
      $footerLinks.off('click', 'h3');
      $footerLinks.find('ul').aria('show');
      $footerLinks.find('h3 > span').remove();
    }
  }

  var init = function(){
    var resizeTimer = false;
    var $footerLinks = $('#footer .col-4:not(.utilities)');

    $(window).bind('resize', function(){
      //log.debug('window resize event fired.');
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(detectScreenMode, 200);
    });

    detectScreenMode();

    changeFooter($footerLinks);

    $(document).bind('screen_mode_change', function() {
      //log.debug('document screen_mode_change event fired.');
      changeFooter($footerLinks);
    });
  };

  $(document).ready(init);

  /* stupid script to make snap points work in Windows Phone IE
   * see http://css-tricks.com/snippets/javascript/fix-ie-10-on-windows-phone-8-viewport/
   */
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}")
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
  }

})(jQuery);
