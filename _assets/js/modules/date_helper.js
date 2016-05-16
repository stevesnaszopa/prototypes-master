/*global window, Zopa */
window.Zopa = window.Zopa || {};

Zopa.DateHelper = function (settings) {
  this.yearVal = settings.year;
  this.monthVal = settings.month;
  this.dayVal = settings.day;

  this.errors = [];
};

Zopa.DateHelper.prototype = {

  /**
   * validates the date
   *
   * @returns {boolean}
   */
  complete: function () {
    if (this.yearVal  === '') { this.addError('yearBlank');  } else { this.removeError('yearBlank'); }
    if (this.monthVal === '') { this.addError('monthBlank'); } else { this.removeError('monthBlank'); }
    if (this.dayVal   === '') { this.addError('dayBlank');   } else { this.removeError('dayBlank'); }

    if (String(this.yearVal).length !== 4) { this.addError('yearWrongCharacterCount'); }  else { this.removeError('yearWrongCharacterCount'); }
    if (String(this.monthVal).length > 2)  { this.addError('monthWrongCharacterCount'); } else { this.removeError('monthWrongCharacterCount'); }
    if (String(this.dayVal).length > 2)    { this.addError('dayWrongCharacterCount'); }   else { this.removeError('dayWrongCharacterCount'); }

    if (isNaN(Number(this.yearVal)))  { this.addError('yearNaN'); }  else { this.removeError('yearNaN'); }
    if (isNaN(Number(this.monthVal))) { this.addError('monthNaN'); } else { this.removeError('monthNaN'); }
    if (isNaN(Number(this.dayVal)))   { this.addError('dayNaN'); }   else { this.removeError('dayNan'); }

    if (Number(this.monthVal) < 1 || Number(this.monthVal) > 12) { this.addError('monthInvalid'); } else { this.removeError('monthInvalid'); }
    if (Number(this.dayVal)   < 1 || Number(this.dayVal)   > 31) { this.addError('dayInvalid'); }   else { this.removeError('dayInvalid'); }

    return this.errors.length === 0;
  },

  inValid: function () {
    return !this.complete();
  },

  /**
   *
   * Adds an error to the errors array
   *
   */
  addError: function (err) {
    this.removeError(err);
    this.errors.push(err);
  },

  /**
   *
   * Remove error from the errors array
   *
   */
  removeError: function (err) {
    var index  = this.errors.indexOf(err);

    if (index > -1) {
      this.errors.splice(index, 1);
    }
  },

  /**
   * returns a string version of this object
   * @returns string: yyyy-mm-dd
   */
  toString: function () {
    if (this.inValid()) { return false; }
    var d = this.toDate();
    return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
  },

  /**
   * returns a date object
   * @returns {*|Date}
   */
  toDate: function () {
    if (this.inValid()) { return false; }
    return new Date([this.yearVal, this.monthVal, this.dayVal].join('/'));
  },

  /**
   *  returns the year number
   * @returns {*}
   */
  year: function () {
    if (this.inValid()) { return false; }
    return this.toDate().getFullYear();
  },

  /**
   * returns the month number
   * not 0 indexed, so May = 5 not 4
   * @returns {*}
   */
  month: function () {
    if (this.inValid()) { return false; }
    return this.toDate().getMonth() + 1;
  },

  /**
   * returns the difference between d1 and d2 in months
   * @param d1 Date object
   * @param d2 Date object
   * @returns {*}
   */
  monthDiff: function (d1, d2) {
    if (this.inValid()) { return false; }
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return ++months;
  },

  /**
   * returns the difference from current object and today in months
   * @returns {*}
   */
  //return the difference in months between set date and today
  differenceFromToday: function () {
    if (this.inValid()) { return false; }
    return this.monthDiff(this.toDate(), this.today());
  },

  today: function () {
    return new Date();
  }
};