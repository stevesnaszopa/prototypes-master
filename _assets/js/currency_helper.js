(function(exports, undefined) {
  'use strict';

  var validCurrency = function (amount) {
    return (/^([1-9][0-9]*|0)(\.[0-9]{0,2})?$/).test(amount);
  };

  var currencyToNumber = function(currency) {
    return Number(currency.replace(/[^0-9\.]+/g,""));
  };

  /* @author: http://blog.prasannadeshpande.com/2010/01/javascript-number-to-currency-format-conversion-function/ */
  var numberToCurrency = function(num, currency) {
    var sign = '',
        cents = 0,
        i = 0,
        commaOffset = 0,
        numberOfCommas = 0;

    currency = currency || '£';

    if (isNaN(num)) {
      num = 0;
    }

    if (num < 0) {
      sign = '-';
      num = Math.abs(num);
    }

    num = Math.floor((num * 100) + 0.50000000001);
    cents = num % 100;

    num = Math.floor(num / 100).toString();

    if (cents < 10) {
      cents = '0' + cents;
    }

    numberOfCommas = Math.floor((num.length - 1) / 3);

    for (i = 0; i < numberOfCommas; i++) {
      commaOffset = num.length - ((4 * i) + 3);
      num = num.substring(0, commaOffset) + ',' + num.substring(commaOffset);
    }

    return sign + currency + num + '.' + cents;
  };

  exports.currencyHelper = {
    validCurrency: validCurrency,
    currencyToNumber : currencyToNumber,
    numberToCurrency : numberToCurrency
  };

}(typeof exports === 'object' && exports || this));
