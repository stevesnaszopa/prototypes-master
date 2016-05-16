window.Zopa = window.Zopa || {};
var _gaq = _gaq || [];

(function(undefined) {

  Zopa.getLabel = function($obj) {
    var label = $obj.data('trackinglabel');
    var type = 'link';
    if ($obj.is(":input:not(:button):not(:submit)")) {
      type = 'input';
    } else if ($obj.is(":button, :submit")) {
      type = 'button';
    }

    if (!label) {
      switch(type) {
        case 'link':
          label = $.trim($obj.text());

          if (!label || !label.length) {
            var $img = $('img', $obj);
            if ($img) {
              label = $img.attr('alt');
            }
          }
          break;

        case 'input':
          var id = $obj.attr('id');
          label = $.trim($("label[for='"+id+"']").text());

          if (!label) {
            label = $obj.attr('title');
          }

          if (!label) {
            label = id;
          }
          break;

        case 'button':
          label = $.trim($obj.val());

          if (!label) {
            label = $obj.text();
          }
          break;
      }
    }

    return label;
  };

  Zopa.getCategory = function($obj) {
    var category = $obj.data('trackingcategory');

    if (!category) {
      category = $.trim($('#content h1').text());
    }

    return category;
  };

  var log = window.Zopa.Log("event_tracking");

  /* Track all links within a certain area
   * e.g. Zopa.trackLinks('#area', 'Category');
   */
  Zopa.trackLinks = function(selector, category, excludeLinksInForms) {
    excludeLinksInForms = (typeof excludeLinksInForms !== 'undefined') ? excludeLinksInForms : true;

    $(selector).on('mousedown keydown touchstart', 'a', function(e){

      // only track if key pressed was 'enter'
      if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
      }
      var $this = $(this);

      if (excludeLinksInForms && $this.closest('form').length === 1) {
        return;
      }

      var url = $.trim($this.attr("href"));
      var linkType = 'external';
      if (!url) {
        linkType = 'empty';
      } else {
        if (!url.length || url === '#') {
          linkType = 'empty';
        } else if (url.indexOf('#') === 0) {
          linkType = 'anchor';
        } else if (url.indexOf('mailto:') !== -1) {
          linkType = 'email';
        } else if ((url.indexOf(document.domain) !== -1) || (url.indexOf('/') === 0)) {
          linkType = 'internal';
        }
      }
      var action = 'Link '+linkType;
      var label = Zopa.getLabel($this);

      Zopa.track(category, action, label);
    });
  };

  /* Track most important form actions (focus fields and hit button) within a specific form
   * e.g. Zopa.trackForm('form.name', 'Category');
   */
  Zopa.trackForm = function(selector, category) {
    var $form = $(selector);
    category = (typeof category !== 'undefined') ? category : Zopa.getCategory($form);

    // track all form field focusses
    $form.on('focus', ':input:not(:button):not(:submit):not([readonly])', function(){
      var $this = $(this);
      var label = Zopa.getLabel($this);

      Zopa.track(category, 'Click field', label);
    });

    // track all form field changes
    $form.on('change', ':input:not(:button):not(:submit)', function(){
      var $this = $(this);
      var label = Zopa.getLabel($this);

      Zopa.track(category, 'Change field', label);
    });

    // track all form button clicks
    // :not(:disabled) necessary for IE
    $form.on('mousedown keydown touchstart', ':button:not(:disabled), :submit:not(:disabled)', function(e){
      // only track if key pressed was 'enter'
      if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
      }
      var $this = $(this);
      var label = Zopa.getLabel($this);

      Zopa.track(category, 'Click button', label);
    });

    // track all links within that form
    Zopa.trackLinks(selector, category, false);
  };

  Zopa.track = function (category, action, label) {
    _gaq.push(['_trackEvent', category, action, label]);
    log.debug('Tracking event - category: {0}, action: {1}, label: {2}', category, action, label);
  };

  Zopa.trackVideo = function (selector, category) {
    var $video = $(selector);
    $video.on('loadedmetadata', function () {
      var video_url  = $video[0].currentSrc;

      $video.on('play',   function () { Zopa.track(category, 'Video Play',   video_url); });
      $video.on('pause',  function () { Zopa.track(category, 'Video Pause',  video_url); });
      $video.on('seeked', function () { Zopa.track(category, 'Video Seeked', video_url); });
      $video.on('ended',  function () { Zopa.track(category, 'Video Ended',  video_url); });
    });
  };

})();
