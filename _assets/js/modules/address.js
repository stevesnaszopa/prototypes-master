//= require modules/date_helper.js

/*global window, Zopa */

window.Zopa = window.Zopa || {};

Zopa.Address = function (settings) {
  var that = this;
  //end var
  this.county       = settings.county;
  this.from         = settings.from;
  this.house_name   = settings.house_name;
  this.house_number = settings.house_number;
  this.id           = settings.id;
  this.postcode     = settings.postcode;
  this.ptcabs       = settings.ptcabs;
  this.rialto_id    = settings.rialto_id;
  this.street_1     = settings.street_1;
  this.street_2     = settings.street_2;
  this.to           = settings.to;

  // year and month needed to bind select input values with the model
  this.month = '';
  this.year = '';

  this.errors = [];

  /**
   * replaces spaces with underscores
   *
   * @returns {string}
   */
  this.sanitizedPtcabs = function () {
    return this.ptcabs.replace(' ', '_');
  };

  this.makeId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  this.localId = this.makeId().toLowerCase();

  /**
   * sets the year and month values if from date is present
   *
   * needed when generating select inputs with selected options
   */
  this.init = function () {
    if (this.from !== null) {
      var d = this.from.split('-');
      var fromDate = new Zopa.DateHelper({year: d[0], month: d[1], day: [2]});

      if (fromDate.complete()) {
        this.year = fromDate.year();
        this.month = fromDate.month();
      }
    }
  };

  /**
   *
   * Adds an error to the errors array
   *
   */
  this.addError = function (err) {
    this.removeError(err);
    this.errors.push(err);
  };

  /**
   *
   * Remove error from the errors array
   *
   */
  this.removeError = function (err) {
    var index  = this.errors.indexOf(err);

    if (index > -1) {
      this.errors.splice(index, 1);
    }
  };

  /**
   *
   * bind to elements with localId
   * this allows to listen for :change events
   *
   */
  var binder = new Zopa.DataBinder(this.localId);

  /**
   * sets the value to the attribute
   *
   * if changed values are for 'year' or 'month', it updates the 'from' value
   *
   * also triggers a :change event to binder so that two way data binding can happen
   *
   * @param attr_name - objects attribute name to change
   * @param val - new value to be set
   */
  this.set = function (attr_name, val) {
    this[attr_name] = val;

    if (attr_name === 'month' || attr_name === 'year') {
      var newDate = this.toZopaDateHelper();
      if (newDate) {
        if (newDate.toDate() > new Date()) {
          this.addError('dateInTheFuture');
        } else {
          this.removeError('dateInTheFuture');
        }
        this.from = newDate.toString();
        binder.trigger(that.localId + ":change", ['from', newDate, this ]);
      } else {

        this.from = '';
        binder.trigger(that.localId + ":change", ['from', '', this ]);
      }
    } else {

      binder.trigger(that.localId + ":change", [attr_name, val, this ]);
    }
  };

  // listen for change events for the current address
  binder.on(this.localId + ":change", function (e, attr_name, new_val, initiator) {
    if (initiator !== that) {
      that.set(attr_name, new_val);
    }
  });

  // listen for action events for the current address
  binder.on(this.localId + ":action", function () {
    if(that.month === '' || that.year  === '') {
      that.addError('moveInDateBlank');
    } else {
      that.removeError('moveInDateBlank');
    }
    $(document).trigger(that.localId + ":updateView");
  });

  /**
   * helper method for generating months array
   *
   * @returns {Array}
   */
  this.datesMonths = function () {
    var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      months = [];
     //end var

    for (var i = 1; i <= 12; i++) {
      if (i == that.month) {
        months.push([monthNames[i], i, 'selected']);
      } else {
        months.push([monthNames[i], i]);
      }
    }

    return months;
  };

  /**
   * helper method for generating years array
   *
   * @returns {Array}
   */
  this.datesYears = function () {
    var years = [],
      toYear = new Date().getFullYear(),
      fromYear = toYear - 50,
      i;
    //end var

    for (i = toYear; i > fromYear; i--) {
      if (i == that.year) {
        years.push([i, i, 'selected']);
      } else {
        years.push([i, i]);
      }
    }
    return years;
  };

  /**
   * check if address is valid
   * valid means 'from date' is set and is not in the future
   * @returns {boolean}
   */
  this.valid = function () {
    if (this.from !== null) {
      var d = this.from.split('-'),
        fromDate = new Zopa.DateHelper({year: d[0], month: d[1], day: [2]});

      if (fromDate.complete()) {
        if (fromDate.toDate() < new Date()) {
          this.errors = [];
          return true;
        }
      }
    }
    return false;
  };

  /**
   * check if address 'from' date is set
   * @returns {boolean}
   */
  this.complete = function () {
    if (this.from !== null) {
      var d = this.from.split('-'),
        fromDate = new Zopa.DateHelper({year: d[0], month: d[1], day: [2]});

      if (fromDate.complete()) {
        return true;
      }
    }
    return false;
  };

  /**
   * returns a new instance of Zopa.DateHelper with current year, month values
   * @returns {Zopa.DateHelper object}
   */
  this.toZopaDateHelper = function () {
    var d  = new Zopa.DateHelper({
      year: this.year,
      month: this.month,
      day: '1'
    });

    if (d.complete()) { return d; }

    return false;
  };

};
