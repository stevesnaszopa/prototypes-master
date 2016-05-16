$(document).ready(function () {
  var autoTab = function(currentElementID, nextElementID, fieldLength) {
    var currentElement = $(currentElementID),
        nextElement    = $(nextElementID);

    currentElement.keyup(function(e) {
      var keyID = (window.event) ? event.keyCode : e.keyCode,
          exceedsLength,
          isNumberOrLatinLetter = (keyID >= 48 && keyID <= 90),
          isNumpadNumber = (keyID >= 96 && keyID <= 105),
          isSpace = (keyID === 32);

      if (isSpace || isNumberOrLatinLetter || isNumpadNumber) {
        currentElement.val(currentElement.val().replace(/\s+/g, ''));
      }

      exceedsLength = (currentElement.val().length >= fieldLength);

      if (exceedsLength && (isNumberOrLatinLetter || isNumpadNumber)) {
        nextElement.focus().select();
      }
    });
  };

  // Phone number
  // autoTab('#applications_loan_apply_home_phone',    '#dob_0', 11);

  // Date of birth
  autoTab('#dob_0',    '#dob_1', 2);
  autoTab('#dob_1',    '#dob_2', 2);
  // autoTab('#dob_2',    '#direct_debit_account_number', 4);

  // Bank details
  // autoTab('#direct_debit_account_number', '#direct_debit_sort_code_0', 8);
  autoTab('#direct_debit_sort_code_0',    '#direct_debit_sort_code_1', 2);
  autoTab('#direct_debit_sort_code_1',    '#direct_debit_sort_code_2', 2);
  // autoTab('#direct_debit_sort_code_2',    '#direct_debit_account_holder_name', 2);
});
