/* globals currencyHelper: true */

window.Zopa = window.Zopa || {};

Zopa.Number = (function() {
  "use strict";

  return {

    commaSeparated : function(number) {
      number = number + "";
      var numberSplit = number.split('.');
      var left = numberSplit[0];
      var right = numberSplit.length > 1 ? '.' + numberSplit[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(left)) {
        left = left.replace(rgx, '$1' + ',' + '$2');
      }
      return left + right;
    },

    parseAndRound : function(number, decimalPlaces) {
      var value = parseFloat(number);
      var fixedValue = value.toFixed(decimalPlaces);
      return parseFloat(fixedValue);
    },

    ordinalize : function(n) {
        var s = ["th","st","nd","rd"],
        v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

  };

}());


$(function() {

  /**
    * This function allows for basic html templates to be used
    * without additional libraries to be used.
    *
    * Usage:
    * a script tag should be placed on the page where the content
    * should be inserted. this tag can contain (within reason) any
    * html. The script tag MUST have the following attributes set
    * type='text/html' and data-inline='true'
    *
    *
    * Example:
    * <script type="text/html" data-inline="true">
    *   <div>I was added by javascript</div>
    * </script>
    *
    * Notes:
    * After the template values have been inserted the original
    * script tag will be removed.
    */
  var insertTemplatedHtml = function() {
    $("script[type='text/html'][data-inline='true']").each(function(){
      var content = $(this);
      content.after(content.html());
      content.remove();
    });
  };

  // number input helper: only allow numbers and not more than maxlength
  $("input[type='number']").keypress(function(event) {
    if (event.which === 13 || event.which === 0) {
      // Enter
      return;
    }
    if (event.which === 8 || event.which === 0) {
      // backspace
      return;
    }

    if (event.which < 48 || event.which > 57) {
      var step = $(this).attr("step");
      if (!(step === "any" && event.which === 46) && !(parseFloat(step) < 1 && event.which === 46)) {
        // don't allow keypresses that aren't numbers
        event.preventDefault();
      }
    }

    this.oldvalue = this.value;
  });

  //solves issue of over typing not working in number inputs when maxlength reached
  $("input[type='number']").on('input', function() {
    var maxLength = $(this).data("maxlength");
    if(maxLength) {
      var length = $(this).val().length;
      if(length > maxLength) {
        this.value = this.oldvalue;
      }
    }
  });

  // tabs
  $('ul.nav-tabs li a').click(function(e) {
    var link = $(this);
    var href = $(link.attr('href'));
    link.closest('ul').find('li').removeClass('active');
    link.closest('li').addClass('active');
    href.parent().find('.tab-pane').removeClass('active');
    href.addClass('active');
    e.preventDefault();
  });

  // make tooltips keyboard accessible
  $('.tooltip').attr('tabindex', '0').find('span').attr('role', 'tooltip');

  $('input[data-hint]').on('keyup change', function(){
    Zopa.displayHint($(this));
  });

  Zopa.showHide($('a.show-more'));
  Zopa.CheckRequiredFields.init($('form.check-required'));
  Zopa.bindHandlers();
  insertTemplatedHtml();

});


jQuery.extend(window.Zopa, {

  bindHandlers: function() {

    $(document).click(Zopa.Tooltip.hide);
    $(document).on('click', '.tooltip', Zopa.Tooltip.show);

    // Stop the click event propogating for anchor tags so that the tooltip
    // isn't hidden instead of the link being followed.
    $(document).on('click', '.tooltip a', Zopa.stopPropagation);
  },

  stopPropagation: function(e) {
    e.stopPropagation();
  },

  Tooltip: {
    show: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var selection = $(this).find('span');

      // grab the selections current visibility so clicking it
      // a second time hides it
      var selectionVisible = selection.is(':visible');
      Zopa.Tooltip.hide();
      if (!selectionVisible) {
        // firefox highlights the tooltip text so remove any selections.
        if (window.getSelection && window.getSelection().removeAllRanges){
          window.getSelection().removeAllRanges();
        }
        Zopa.Tooltip.onShow.call(e);
        selection.show();
      }
    },

    hide: function() {
      $('.tooltip span').hide();
    },

    onShow: function() {}
  },

  /*
   * Get the ID of an anchor target
   */
  getTargetId: function(target) {
    if (target && target.length > 0 && target.substring(0, 1) === '#') {
      return target.substring(1, target.length);
    }
    return;
  },

  /*
   * Let a '$trigger' link toggle its target on and off
   * Requires the trigger link to include a <span>Show</span> if that should be toggled as well
   */
  showHide: function ($triggers, show, hide) {
    show = (typeof show !== 'undefined') ? show : 'Show';
    hide = (typeof hide !== 'undefined') ? hide : 'Hide';

    $triggers.each(function () {
      var $trigger = $(this),
          targetId = Zopa.getTargetId($trigger.attr('href'));

      if (!targetId) { return; }
      var $target = $('#' + targetId);

      $target.aria('hide');
      $trigger.aria('controls', targetId).aria('polite');
      var $label = $('span', $trigger).first();

      $trigger.on('click', function () {
        if ($target.is(':visible')) {
          $target.aria('slideUp');
          $(this).removeClass('expanded');
          $label.text(show);
        } else {
          $target.aria('slideDown');
          $(this).addClass('expanded');
          $label.text(hide);
        }

        return false;
      });
    });
  },

  /*
   * Let a '$trigger' link show its target
   * and hide the '$hide' element (often itself) afterwards
   */
  showOnce: function($trigger, $hide) {
    var targetId = Zopa.getTargetId($trigger.attr('href'));
    if (!targetId) { return; }
    var $target = $('#'+targetId);

    $target.aria('hide');
    $trigger.aria('controls', targetId).aria('polite');

    $trigger.on('click', function(e) {
      $hide.aria('hide');
      $target.aria('slideDown');

      e.preventDefault();
      return false;
    });
  },

  /*
   * Check if form fields are empty
   */
  checkEmptyFields: function($fields) {

    return $fields.filter(function() {
      var $input = $(this);
      // checkboxes and radio buttons
      if ($input.is(':checkbox') || $input.is(':radio')) {
        var name = $input.attr('name');
        var $inputNamed = $('input[name="'+name+'"]');
        return !$inputNamed.is(':checked');
      // select boxes
      } else if ($input.is('select')) {
        var $selectedOption = $('option:selected', $input);
        return !$selectedOption.length || $selectedOption.val() === "";
      // normal inputs, etc
      } else {
        return $.trim($input.val()) === "";
      }
    });

  },

  /*
   * Check all required form fields and set container class and disable/enable button accordingly
   */
  CheckRequiredFields: {

    // Enable the button if no empty fields are left
    _setFormState: function($button, $fields) {
      var $allEmptyFields = Zopa.checkEmptyFields($fields.filter('[required]'));
      var overwriteButton = $button.data('overwriteDisable') === true;
      var was_form_ready = $button.attr('disabled') !== 'disabled';
      var button_text = $button.is(':button') ? $button.text() : $button.val();
      var disabled_from_outside = $button.data('origtext') !== button_text;

      if (!$allEmptyFields.length && !overwriteButton && !disabled_from_outside) {
        $button.removeAttr('disabled');
      } else {
        $button.attr('disabled', 'disabled');
      }

      var is_form_ready = $button.attr('disabled') !== 'disabled';
      if (was_form_ready !== is_form_ready) {
        $button.trigger('form_state_change');
      }
    },

    // Set the container of form elements to 'done' if no empty fields are left per row
    _setContainerState: function($container, $fields) {
      var $emptyFields = Zopa.checkEmptyFields($fields.filter('[required]'));
      var hasEmptyField = $emptyFields.length;
      var hasInvalidField = false;
      $fields.each(function(){
        var isSelectGroup = $(this).parent().hasClass('select-group');
        var isRadioGroup = $(this).parent().parent().hasClass('radio-group');
        var $wrapper = $(this).parent();
        if (isSelectGroup) {
          $wrapper = $(this).parent().parent();
        } else if (isRadioGroup) {
          $wrapper = $(this).parent().parent().parent();
        }
        if ($wrapper.hasClass('error')) {
          hasInvalidField = true;
          return;
        }
      });

      if (hasEmptyField || hasInvalidField) {
        $container.removeClass('done');
      } else {
        $container.removeClass('error').addClass('done');
      }
    },

    _formContainer: function($form) {
      return $form.hasClass('units') ? $('fieldset > .row', $form).not('.novalidate') : $('fieldset', $form);
    },

    init: function($forms) {
      if (!$forms.length) {
        return;
      }
      var that = this;

      $forms.each(function(){
        var $form = $(this);

        var $container = that._formContainer($form);

        if ($form.hasClass('erroring')) {
          $container.each(function(){
            var $el = $(this);
            var $fields = $(':input', $el);
            that._setContainerState($el, $fields);

            $('input, select', $el).on('blur', function(){
              $el.addClass('done edited');
            });
          });
        } else {
          var $button = $(':submit', $form).last();
          var button_text = $button.is(':button') ? $button.text() : $button.val();
          $button.data('origtext', button_text);
          $button.attr('disabled', 'disabled').aria('polite');
          var $allRequiredFields = $('[required]', $form);

          $container.each(function(){
            var $el = $(this);
            var $fields = $(':input', $el);

            that._setContainerState($el, $fields);
            that._setFormState($button, $allRequiredFields);
            $fields.on('keyup click change select input', function() {
              that._setContainerState($el, $fields);
              that._setFormState($button, $allRequiredFields);
            });
          });
        }
      });
    },

    check: function($form) {
      if (!$form.hasClass('erroring')) {
        var that = this;
        var $container = that._formContainer($form);

        var $button = $(':submit', $form).last();
        var $allRequiredFields = $('[required]', $form);

        $container.each(function(){
          var $el = $(this);
          var $fields = $(':input', $el);

          that._setContainerState($el, $fields);
          that._setFormState($button, $allRequiredFields);
        });
      }
    }
  },

  displayHint: function($input){
    var hint = $input.data('hint');
    var type = $input.data('hinttype');

    if (hint && type) {
      var value = $input.val();

      if (type == 'currency') {
        value = parseFloat(value);
        value = currencyHelper.numberToCurrency(value);
        value = value.substr(0, value.length-3);
      }

      hint = hint.replace("$$", value);
      var $hint = Zopa.getHintContainer($input);
      $hint.hide();

      if ($input.val() && value) {
        $hint.show();
        $hint.text(hint);
      }
    }
  },

  getHintContainer: function($input){
    var $parent = $input.closest('p');
    var $hint = $parent.siblings('p.hint');

    // create if it doesn't exist yet
    if ($hint.length === 0) {
      $parent.after($('<p class="hint"></p>'));
      $hint = $parent.siblings('p.hint');
    }
    return $hint;
  }

});
