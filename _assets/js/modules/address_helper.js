//= require modules/date_helper.js
//= require modules/address.js

/*global window, Zopa, document  */

window.Zopa = window.Zopa || {};

/**
 * Address helper - helps to manage a collection of addresses
 *
 * Usage: address = new Zopa.AddressHelper(params)
 *
 * params object needs to have:
 *  - onChange: callback function that will be run every time something in the model changes
 *  - existingJson: a JSON string with existing addresses to be loaded
 *  - messageTranslations: translations for error messages
 *      {errorMessage: 'Translated error message', ..}
 *
 */

Zopa.AddressHelper = function (settings) {
  var that = this;

  this.helperId = Date.now();
  this.results = [];
  this.currentAddresses = [];
  this.errors = [];
  this.onChange = settings.onChange || function () {};
  this.loadExisting(settings.existingJson);
  this.addressStaging = [];

  this.messageTranslations = settings.messageTranslations;

  // translate error message for mustache
  this.t = function () {
    return function (text, render) {
      return that.messageTranslations[render(text)];
    };
  };

  this.houseNumber = "";
  this.postcode = "";

  this.searching = false;

  this.binder = new Zopa.DataBinder(this.helperId);
  this.binder.on(this.helperId + ":change", function (e, attr_name, new_val, initiator) {
    if (initiator !== that) {
      that.set(attr_name, new_val);
    }
  });
  this.init();
};

Zopa.AddressHelper.prototype = {

  /**
   * Sets an attribute and triggers a change event
   * useful when two-way data binding is needed
   */
  set: function (attr_name, val) {
    this[attr_name] = val;
    this.binder.trigger(this.helperId + ":change", [attr_name, val, this ]);
  },

  haveResults: function () {
    return (this.results.length > 0);
  },

  tooManyResults: function () {
    return this.results.length > 7;
  },

  haveCurrentAddresses: function () {
    return (this.currentAddresses.length > 0);
  },

  isValid: function () {
    return (this.errors.length === 0);
  },

  allAddressDatesSet: function () {
    for (var i = 0; i < this.currentAddresses.length; i++) {
      if (!this.currentAddresses[i].valid()) {
        return false;
      }
    }
    return true;
  },

  validate: function () {
    //clear errors before validation
    this.errors = [];
    this.checkDuplicates();
    this.longEnough(true);
    this.onChange();
  },

  init: function () {
    var that = this;

    //bind :find events for address find button
    this.binder
      .off(that.helperId + ':find')
      .on(that.helperId + ':find', function () {
        if (that.postcode !== '') {
          that.removeError('postCodeEmpty');
          that.search();
        } else {
          that.addError('postCodeEmpty');
          that.onChange();
        }
      });

    //bind address results select box changes
    $(document)
      .off('change', '#possible_addresses')
      .on('change', '#possible_addresses', function () {
        var localId = $(document).find('#possible_addresses').val();

        return (function () {
          var adr = that.findAddressByLocalId(localId, 'results');

          that.addAddressToStaging(adr);
        }());
      });
    //this.validate();
  },

  /**
   * Returns true if one of the addresses contain a 'from' date older than 3 years
   * @returns {boolean}
   */
  longEnough: function (addError) {

    if (typeof addError === 'undefined') { addError = false; }
    var valid = false;

    for (var i = 0; i < this.currentAddresses.length; i++) {
      if (this.currentAddresses[i].from !== null && !valid) {

        var d = this.currentAddresses[i].from.split('-');
        var addressDate = new Zopa.DateHelper({year: d[0], month: d[1], day: [2]});
        valid = (addressDate.differenceFromToday() >= 12 * 3);
      }
    }

    if (addError) {
      if (!valid) {
        this.addError('notLongEnough');
      } else {
        this.removeError('notLongEnough');
      }
    }

    return valid;
  },

  /**
   * Converts an address object to Zopa.Address
   * and attaches event listeners for destroy and change events
   *
   * @param object
   * @returns {Zopa.Address}
   */
  objectToAddress: function (object) {
    var a = object,
      that = this,
      address = new Zopa.Address({
        county:       a.county,
        from:         a.from,
        house_name:   a.house_name,
        house_number: a.house_number,
        id:           a.id,
        postcode:     a.postcode,
        ptcabs:       a.ptcabs,
        rialto_id:    a.rialto_id,
        street_1:     a.street_1,
        street_2:     a.street_2,
        to:           a.to
      }),
      binder = new Zopa.DataBinder(address.localId);
    //end var
    address.init();

    binder.on(address.localId + ":destroy", function (e, localId) {
      that.removeAddressByLocalId(localId);
      that.validate();
    });

    binder.on(address.localId + ":change", function (e, attr_name) {
      if (attr_name === 'year' || attr_name === "month") {
        if (address.complete()) {
          if(that.findAddressByLocalId(address.localId, 'addressStaging')) {
            that.addAddress(address);
          }
        } else {
          address.from = '';
        }
        that.validate(true);
      }
    });

    $(document).on(address.localId + ':updateView', function () {
      that.onChange();
    });

    return address;
  },

  /**
   * converts and saves results from Ajax call
   * saves to results
   * @param data
   */
  setResults: function (data) {
    this.results = [];
    for (var i = 0, a = data.addresses; i < a.length; i++) {
      this.results.push(this.objectToAddress(a[i]));
    }
    this.onChange();
    this.houseNumber = '';
  },

  /**
   * loads existing addresses from a JSON string
   * @param json
   */
  loadExisting: function (json) {
    var currentAddresses = JSON.parse(json);
    for ( var i = 0, a = currentAddresses; i < a.length; i++) {
      this.currentAddresses.push(this.objectToAddress(a[i]));
    }

    this.setAddressesIndex();
    this.onChange();
  },

  /**
   * helper for adding errors
   * errors make this object invalid
   * @param err
   */
  addError: function (err) {
    this.removeError(err);
    this.errors.push(err);
  },

  removeError: function (err) {
    var index  = this.errors.indexOf(err);

    if (index > -1) {
      this.errors.splice(index, 1);
    }
  },

  /**
   * shortcut method for running an Ajax address search
   * and save results in the results array
   */
  search: function () {
    this.searching = true;
    this.onChange();
    this.findAddress('setResults');
  },

  /**
   * find addresses with ajax, will post current houseNumber and postcode values
   * takes a callback function as parameter that will be run on success
   */
  findAddress: function (callback) {
    var that = this;
    $.ajax({
      url: "/_includes/components/address/addresses.json",
      type: 'GET',
      data: {
        '[address][house_number]': that.houseNumber,
        '[address][postcode]': that.postcode
      },
      success: function(data) {
        that.searching = false;
        if (data.addresses.length === 0) {
          if (data.error === 'equifaxUnavailable') {
            that.addError(data.error);
            that.removeError('noAddressesFound');
          } else {
            that.removeError('equifaxUnavailable');
            that.addError('noAddressesFound');
          }
        } else {
          that.removeError('noAddressesFound');
        }
        that[callback](data);

      },

      error: function () {
        that.searching = false;
        return (function () {
          that.addError('connectionError');
        })();
      }
    });
  },

  /**
   * Sets the current addresses indexes, this simplifies working with objects in the view
   */
  setAddressesIndex: function () {
    for (var i = 0; i < this.currentAddresses.length; i++) {
      this.currentAddresses[i].index = i;
    }
  },

  /**
   * Loops through current addresses, returns true if duplicates in a row
   * have been found and adds/removes the error message
   *
   * @returns {boolean}
   */
  checkDuplicates: function () {
    var addresses = this.currentAddresses.map(function (a) {
        return a.sanitizedPtcabs();
      });
    //end var

    for(var i = 0; i < this.currentAddresses.length; i++ ) {
      var addr1 = addresses[i];
      var addr2 = addresses[i+1];

      if (addr1 === addr2) {
        this.addError('duplicateAddress');
        return true;
      }
    }

    this.removeError('duplicateAddress');
    return false;
  },

  /**
   * moves an address from addressStaging to currentAddresses
   *
   * @param address
   */
  addAddress: function (address) {
    var a = this.findAddressByLocalId(address.localId, 'addressStaging');

    if (a.valid()) {
      this.currentAddresses.push(address);
      this.checkDuplicates();
      this.setAddressesIndex();
      this.addressStaging = [];
    }
    this.validate();
  },

  /**
   * adds given address to addressStaging
   *
   * @param address
   */
  addAddressToStaging: function (address) {
    address.index = this.currentAddresses.length;
    this.results = [];
    this.addressStaging.push(address);

    this.postcode = '';
    this.houseNumber = '';

    this.onChange();
  },

  findAddressByPtcabs: function (sanitizedPtcabs, target) {
   for(var i = 0; i < this[target].length; i++) {
     if(this[target][i].ptcabs.replace(' ', '_') == sanitizedPtcabs) {
       return this[target][i];
     }
   }
    return false;
  },

  findAddressByLocalId: function (localId, target) {
    for(var i = 0; i < this[target].length; i++) {
      if(this[target][i].localId == localId) {
        return this[target][i];
      }
    }
    return false;
  },

  removeAddressByPtcabs: function (sanitizedPtcabs) {
    var obj = this.findAddressByPtcabs(sanitizedPtcabs, 'addressStaging');
    if (obj) {
      this.addressStaging = [];
      this.onChange();
    } else {
       obj = this.findAddressByPtcabs(sanitizedPtcabs, 'currentAddresses');
      if (obj) {
        this.removeAddress(obj);
        this.onChange();
        return true;
      } else {
        return false;
      }
    }
  },

  removeAddressByLocalId: function (localId) {
    var obj = this.findAddressByLocalId(localId, 'addressStaging');
    if (obj) {
      this.addressStaging = [];
      this.onChange();
    } else {
      obj = this.findAddressByLocalId(localId, 'currentAddresses');
      if (obj) {
        this.removeAddress(obj);
        this.onChange();
        return true;
      } else {
        return false;
      }
    }
  },

  removeAddress: function (address) {
    var index = this.currentAddresses.indexOf(address);
    if (index > -1) {
      this.currentAddresses.splice(index, 1);
      this.checkDuplicates();
      this.setAddressesIndex();
      return true;
    }
    return false;
  }
};
