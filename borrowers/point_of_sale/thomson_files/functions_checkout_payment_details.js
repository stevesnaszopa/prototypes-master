// This ideally should be applied to all applications and created in away that sets specific details of the object.
var appConfig          = {};
var transactionAmounts = {};

/****************************************************************************************************/
/** Refresh to default when page loads etc ***/
function setToDefaultSelection()
{
  $('payment_type_0').selectedIndex       = 0;
  $("FieldCardNumber").value              = "";
  $('FieldExpiryDateMonth').selectedIndex = 0;
  $('FieldExpiryDateYear').selectedIndex  = 0;

  var fieldValidFromMonth = $('FieldValidFromMonth');

  if( fieldValidFromMonth )
  {
    fieldValidFromMonth.selectedIndex = 0;
  }

  var fieldValidFromYear = $('FieldValidFromYear');

  if( fieldValidFromYear )
  {
    fieldValidFromYear.selectedIndex = 0;
  }

  var fieldIssueNumber = $('FieldIssueNumber');

  if( fieldIssueNumber )
  {
    fieldIssueNumber.value = "";
  }

  $('FieldCardName').value = "";
  $('FieldSecurityCode').value = "";

  var promotionalCode = $('promotionalCode');

  if( promotionalCode )
  {
    promotionalCode.value = "";
  }

  var agreeTermAndCondition = $("agreeTermAndCondition");

  if( agreeTermAndCondition )
  {
    agreeTermAndCondition.checked = false;
  }
}

/* Refresh card charge text */
function amountPayableCaptionDisplay()
{
  var cardType = getSelectedCardType();

  if( cardType != null)
  {
    cardCharge = $(cardType+"_charge").value;

    if(1*trimSpaces(cardCharge)>0)
    {
      Element.show("AmtPayableCaption");
    }
    else
    {
      Element.hide("AmtPayableCaption");
    }
  }
}

/**
 *Updates essential fileds when user clicks submit button.
 */
function updateEssentialFields()
{
  var totalAmountPaid = PaymentInfo.calculatedPayableAmount;
  $("total_transamt").value = totalAmountPaid;
}

/*
 * Returns Transaction Amount without card charge.
 */
//TODO:Transaction amount can be taken from depositAmount map
function getTransactionAmount()
{
  var transactionAmount = transactionAmounts[getDepositSelectedValue()].depositAmount;
  return parseFloat(transactionAmount);
}

/*********Promocode related functions**********************************************************/

// Promotion code button clicked
function processRedeemButtonClickEvent()
{
   var promoCodeFailed = $("promoCodeFailed");

   if( promoCodeFailed )
   {
      promoCodeFailed.hide();
   }

   var priceDifferenceWarningBlock = $("PriceDifferenceWarningBlock");

   // clear any existing server side exception messages
   if( priceDifferenceWarningBlock )
   {
     priceDifferenceWarningBlock.innerHTML  ='';
     priceDifferenceWarningBlock.hide();
   }

   // clear any existing validation messages
   validationMessageClear( "PromotionalCodeValidationContainer" );
   var msgInvalidPromotionalCode = "Please enter a valid promotional code";
   var promotionalCode           = trimSpaces($('promotionalCode').value);

   if( promotionalCode.length <= 21 )
   {
     // TODO: Why are we only disabling the redeem button for FC and not FALCON?
     // This makes no sense as the purpose is to prevent the customer from clicking
     // the button multiple times.
     if( appConfig.disableRedeemBtn )
     {
       disableRedeemButton();
     }

     var balanceType = getDepositSelectedValue();

     //ajaxFunction();
     updatePromotionalCode( promotionalCode, balanceType );
   }
   else
   {
     validationMessageShow( "PromotionalCodeValidationContainer", msgInvalidPromotionalCode );
     refreshPromoCodeField();
   }

   return false;
}

function refreshPromoCodeField()
{
  if( appConfig.clearPromotionalCode )
  {
    $('promotionalCode').value = '';
  }
}
function disableRedeemButton()
{
  enableDisableBtn("redeemButton", "/cms-cps/firstchoice/hugo/images/buttons/redeem", false);
}

function enableRedeemButton()
{
  enableDisableBtn("redeemButton", "/cms-cps/firstchoice/hugo/images/buttons/redeem", true);
}
/***************************End of promocode related functions **************************************/

/*****************************************Non-AJAX *************************************************/
/**
 * Deposit servlet ajax call and card charge servlet ajax call functionalities are replaced with
 * plain javascript.
 * A common file /cms-cps/common/js/cardCharges.js  contains common non-ajax functionalities.
 */
/******************************Constants  **********/


/******************************************Functions to update payment page***********************/
/** Function for updating total amount based on the
 ** style class applied to it.
**/
function displayCalculatedPayableAmounts(payableAmountClassName)
{
  //Display the total amounts with calculated total amount.
   var payableAmts = $$('.'+payableAmountClassName);
   for(var i=0; i<payableAmts.length; i++)
   {
     payableAmts[i].innerHTML = PaymentInfo.calculatedPayableAmount;
   }
}

/** Function for updating total amount based on the
 ** style class applied to it.
**/
function displayTotalAmts()
{
   //Display the total amounts with calculated total amount.
   var totAmts = $$('.totalAmountClass');
   for(var i=0; i<totAmts.length; i++)
   {
     totAmts[i].innerHTML = parseFloat(1*PaymentInfo.totalAmount - 1*PaymentInfo.calculatedDiscount).toFixed(2);
   }
}

/** Function for updating amount based on the
 ** style class applied to it.
**/
function displayTheAmounts(amountClassName , amount)
{
  //Display the total amounts with calculated total amount.
   var amts = $$('.'+amountClassName);
   for(var i=0; i<amts.length; i++)
   {
     amts[i].innerHTML = parseFloat(amount).toFixed(2);
   }
}

/*
 * Updates the card charge amounts for each of the deposit types.
 */
function updateChargesForDeposits()
{
  var depositTypes = $$('input.depositRadioOption');
  var deposCardChargeDivs =  $$('.creditCardChargeAmt');
  var depoAmountDivs =  $$('.depositAmt');
  var depositAmount = null;
  var cardCharge = null;
  for(var i=0; i<deposCardChargeDivs.length; i++)
  {
    //Deposit amount associated with the deposit radio button
    depositAmount = (depositTypes[i].value)?depositAmountsMap.get(depositTypes[i].value): depositAmountsMap.get("fullCost");

    //Get the cardCharge applicable for the Deposit amount
    cardCharge = calculateCardCharges(depositAmount);
    if(deposCardChargeDivs[i])
       deposCardChargeDivs[i].innerHTML = parseFloat(cardCharge).toFixed(2);
  }
}
/*****************************************End of functions to update payment page***************/

/***************************Deposit amount related functions ****************************************/
/**
 * Function will be called from Update the amount payable based on deposit radio button selection
 **/
function displayFieldsWithValuesForDeposit()
{
  if( getDepositSelectedValue() == appConfig.defaultDepositType )
  {
      $('payDeposit').value = "false";
  }
  else
  {
     $('payDeposit').value = "true";
  }

  /**
    *  Function to update "Total holiday price" with card charges.
    *  Not Applicable to post Low deposit FC/Falcon
    */
   //displayCalculatedPayableAmounts(payableConstants.calculatePayableAmountClassName);
}

//TODO: REMOVE THIS FUNCTION AND MOVE THE CODE INTO ONLOAD DEPOSIT INITIALIZATION
function  setSelectedOption(description)
{
   PaymentInfo.depositType = trimSpaces(description);
   if(PaymentInfo.depositType=="" || PaymentInfo.depositType==null)
   {
	   PaymentInfo.depositType = "fullCost";
   }
}

/***************************end of Deposit amount related functions ****************************************/

/**************************Card type related functions *****************************************/
/**
 *  This function is invoked from common function "handleCardSelection(index)"
 *   when user selects a card type in drop down
 **/
function displayFieldsWithValuesForCard()
{

   var cardType = PaymentInfo.selectedCardType;

   PaymentInfo.isAMEX = (PaymentInfo.selectedCardType &&
                         (PaymentInfo.selectedCardType).indexOf("AMERICAN_EXPRESS") != -1)? true : false;

   var cardPaymentObject = toPaymentObject( $(payableConstants.CARD_TYPE_ID).value);

   //Show issue number field if card is a debit card, otherwise hide it.
   showOrHideIssueNumber( cardPaymentObject );

   // Change max length of security number field to card's security code length
   refreshSecurityCodeSection( cardPaymentObject );

        updateChargesInDropDown();


   /**
    *  Function to update "Total holiday price" with card charges.
    *  Not Applicable to post Low deposit FC/Falcon
    */
   //displayCalculatedPayableAmounts(payableConstants.calculatePayableAmountClassName);
}
/****************************************End of Non-AJAX *******************************************/




/**
 * Returns an object which represents the values contained for the parameter, cardTypeSelectionValue.
 *
 * The the value cannot be parsed then null will be returned.
 *
 * The properties are:
 * - cardType (VISA, AMERICAN_EXPRESS, etc)
 * - eNumValue (DCard, CCard, etc)
 * - securityCodeLength
 * - cardCharge
 * - hasIssueNumber (true or false)
 * - chargePercentage
 */
function toPaymentObject( cardTypeSelectionValue )
{
  var METHOD   = 0;
  var ENUM     = 1;
  var tmpArray = cardTypeSelectionValue.split( "|" );

  var cardPaymentObject = null;

  if( tmpArray.length > 1 )
  {
    cardPaymentObject                    = new Object();
    cardPaymentObject.cardType           = tmpArray[METHOD];
    cardPaymentObject.enumValue          = tmpArray[ENUM];
    cardPaymentObject.securityCodeLength = 0;
    cardPaymentObject.cardCharge         = 0.0;
    cardPaymentObject.hasIssueNumber     = false;
    cardPaymentObject.chargePercentage   = 0;

    var securityCodeLength = $( cardPaymentObject.cardType + "_securityCodeLength" );
    var cardCharge         = $( cardPaymentObject.cardType + "_charges" );
    var chargePercentage   = $( cardPaymentObject.cardType + "_charge" );
    var cardHasIssueNumber = $( cardPaymentObject.cardType + "_issueNo" );

    if( securityCodeLength )
    {
      cardPaymentObject.securityCodeLength = securityCodeLength.value;
    }

    if( cardCharge )
    {
      cardPaymentObject.cardCharge = cardCharge.value;
    }

    if( chargePercentage )
    {
      cardPaymentObject.chargePercentage = chargePercentage.value;
    }

    if( cardHasIssueNumber )
    {
      cardPaymentObject.hasIssueNumber = ( cardHasIssueNumber.value == "true" );
    }
  }

  return cardPaymentObject;
}

/** Displays or hides issue number fields based on card type selection */
function showOrHideIssueNumber( cardPaymentObject )
{
  // Show or hide issue number field
  if( cardPaymentObject && cardPaymentObject.hasIssueNumber )
  {
    Element.removeClassName("FieldIssueNumberValidationContainer", "hidden");
  }
  else
  {
    $("FieldIssueNumber").value = "";
    Element.addClassName("FieldIssueNumberValidationContainer", "hidden");
  }
}

/*** Based on card type selection
 * i. Changes maxLength attribute of security number field
 * ii. Updates security code message if applicable
 * @return
 */
function refreshSecurityCodeSection( cardPaymentObject )
{
  var securityCodeField = $("FieldSecurityCode");
  // If the selected card has a different length security number than field allows
  if(cardPaymentObject)
  {
    //securityCodeField.clear();
    //securityCodeField.maxLength = parseInt(cardPaymentObject.securityCodeLength);

    updateSecurityMessages( cardPaymentObject.cardType, cardPaymentObject.securityCodeLength );
  }
  else
  {
  //
  updateSecurityMessages(payableConstants.DEFAULT_CARD_SELECTION, payableConstants.DEFAULT_SECURITY_CODE_LEN);
  }
}

/**
 *  updateChargesInDropDown()
 **/
//TODO: Add Comments
function updateChargesInDropDown()
{
  var totalTransAmount = depositAmountsMap.get(PaymentInfo.depositType);

  //Options in payment method drop down
  var options = $('payment_type_0').options;
  var currency = getCurrency();

  /*TODO:
   * object is created for every iteration in the loop.
   */
  for( var i = 0, len = options.length ; i < len; i++)
  {
    //Get payment method e.g- MASTERCARD, VISA, SWITCH etc
    var cardPaymentObject = toPaymentObject( options[i].value );

    // Can the selected value be built into a cardPaymentObject.
    if( cardPaymentObject )
    {
      //var chargeCalc = roundOff(((cardPaymentObject.chargePercentage * totalTransAmount) / 100),2);
      //if (PaymentInfo.maxCardChargeAmount != null && PaymentInfo.maxCardChargeAmount != "")
      //{
      //   chargeCalc = (chargeCalc > 1*PaymentInfo.maxCardChargeAmount) ? 1*PaymentInfo.maxCardChargeAmount : chargeCalc;
      //}
	  var chargeCalc = calculateSelectedCardCharge(totalTransAmount, cardPaymentObject.cardType);
      if(chargeCalc>0)
      {
        options[i].text  = '';
        // Append new charge to card string
        options[i].text = paymenttypeoptions[i] + " (" + currency + chargeCalc + " Charge)";
      }
    }
  } //End for loop
}

/*
 * Gets the card payment object based on the currently selected card value.
 */
function getCardPaymentObject()
{
  var cardType          = $( "payment_type_0" );
  var cardPaymentObject = null;

  if ( cardType )
  {
    cardPaymentObject = toPaymentObject( cardType.value );
  }

  return cardPaymentObject
}


/* Returns card type e.g- MASTERCARD, AMERICAN_EXPRESS etc
*/
///TODO: Should be removed. Replace this function call with PaymentInfo.selectedCardType
function getSelectedCardType()
{
  // Find currently selected card
  var cardPaymentObject = getCardPaymentObject();

  if( cardPaymentObject )
  {
    return cardPaymentObject.cardType;
  }
  else
  {
    return null;
  }
}

/*Returns payment method e.g- Dcard, Card etc
*/
//TODO:Should be removed. Do we need it any where?
function getPaymentMethod()
{
  var cardPaymentObject = getCardPaymentObject();

  if( cardPaymentObject )
  {
    return cardPaymentObject.enumValue;
  }

  return null;
}

/* returns card type e.g- MASTERCARD, AMERICAN_EXPRESS etc */
///TODO: Should be removed. Replace this function call with PaymentInfo.selectedCardType
function getPaymentCode()
{
  var cardPaymentObject = getCardPaymentObject();

  if( cardPaymentObject )
  {
    return cardPaymentObject.cardType;
  }

  return null;
}


/**************************end of Card type  related functions *****************************************/

/**************************Security code related functions ******************************************/

/* Updates the security number validation and info messages based
 * on selected card's security number length */
function updateSecurityMessages(cardType, securityNumLen)
{
  var validationMsg = "", infoMsg = "";

  // If Amex card is selected, change validation and info messages
  if( isCardAmex(cardType) )
  {
    infoMsg       = "The 4 digits above your account number on the front of your card";
    validationMsg = "Please enter your " + securityNumLen + " digit security code";
  }
  else
  {
    infoMsg       = "The last " + securityNumLen + " digits on the reverse of your card";
    validationMsg = "Please enter the last " + securityNumLen + " digits of your card security code";
  }

  Element.update( $("numSecurityDigits") , infoMsg );
  validationMessageUpdate("FieldSecurityCodeValidationContainer", validationMsg);
}

/*
 * Is the cardType an American Express? true or false
 */
//TODO: Why can't we move this code into displayFieldsWithValuesForCard()
function isCardAmex( cardType )
{
  return ( cardType.indexOf("AMERICAN_EXPRESS") != -1 );
}

// show the specific security info blinky based on the card selection
///TODO: Following functions contain duplicate code (to be re-factored).
//////////////////////////////////////////////////////////////////////////////////////////////////
function securityInfoBlinkyShow( owner )
{
  var cardType = $('payment_type_0').value;
  var message  = null;

  if( isCardAmex(cardType) )
  {
    message = "blinky4digits";
  }
  else
  {
    message = "blinky3digits";
  }

  blinkyShow( owner, message );
}

// hides the specific security info blinky based on the card selection
function securityInfoBlinkyHide()
{
  var cardType = $('payment_type_0').value;
  var message  = null;

  if( isCardAmex(cardType) )
  {
    message = "blinky4digits";
  }
  else
  {
    message = "blinky3digits";
  }

  blinkyHide( message );
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**************************end of Security code related functions *********************************/


/**************************book this holiday now button click related functions *******************/
//TODO : Proper comments are necessary. Not clear about params being used here
function enableDisableBtn(button, imagePath, toggle)
{
  var button = $(button);

  button.style.cursor = (toggle == true) ? "pointer" : "default";
  var   btnPath =  imagePath;
  if(!toggle)
  {
     btnPath =  imagePath + "-greyed";
  }
  btnPath = btnPath + ".gif";
  button.src          = btnPath;
  button.canBeClicked = toggle;
  button.disabled     = !toggle;
}

//TODO: This function can be removed and code can be moved to book now hoilday button clicked.
function disableBookNowButton()
{
  disableButton( "CheckoutPaymentDetailsBookNowButton", "/cms-cps/firstchoice/hugo/images/buttons/book_holiday_now_greyed.gif" );
}

function disableButton( buttonId, greyedBtnFilename )
{
   var button      = $( buttonId );
   var disabledBut = $(buttonId + "Disabled");

   // IE6 does not preload images here so needs to be given the usual SPECIAL TREATMENT
  if(browser.isIE6x) {
     disabledBut.style.display = "";
     button.style.display = "none";
   } else
     button.src =  greyedBtnFilename;

   button.style.cursor = "default";
   button.canBeClicked = false;
   button.disabled = true;
}

function disableThreeDSecureButton()
{
	var payButtonDescription = threeDCards.get(PaymentInfo.selectedCardType);
	if(payButtonDescription == "mastercardgroup" || payButtonDescription == "visagroup" || payButtonDescription == "americanexpressgroup")
	{
	   $("confirmBookNowButton").innerHTML = '<img src="/cms-cps/firstchoice/hugo/images/buttons/proceed-to-payment-btn-grey.gif" alt="Proceed to payment" id="CheckoutPaymentDetailsBookNowButton" title="Proceed to payment"/>';
	}
	else
	{
	   $("confirmBookNowButton").innerHTML ='<img src="/cms-cps/firstchoice/hugo/images/buttons/book_holiday_now_greyed.gif" alt="Book this holiday now" id="CheckoutPaymentDetailsBookNowButton" title="Book this holiday now"/>';
	}
}

function enableButton(buttonId, btnFilename)
{
   var button = $( buttonId );
   var disabledBut = $(buttonId + "Disabled");

   // IE6 does not preload images here so needs to be given the usual SPECIAL TREATMENT
  if(browser.isIE6x) {
     disabledBut.style.display = "none";
     button.style.display = "block";
   } else
     button.src =  btnFilename;

   button.style.cursor = "pointer";
   button.canBeClicked = true;
   button.disabled = false;
}

/**
 * This function will be called when user clicks on "Book this holiday now"
 * */
//TODO: We can list all the validations which have to be passed before submitting the form
function bookNowButtonClicked()
{
  var termsChecked    = false;
  var fieldsValidated = false;

  // only proceed if the inputs on the form are valid
  if( !validateFormFields() )
  {
    return false;
  }
  else
  {
    fieldsValidated = true;
  }

  // If promotional code has been entered but not validated, display message
  if( $("promotionalCode") )
  {
    if((isPromotionalcodeApplied  == "false" || trimSpaces(isPromotionalcodeApplied)=="" )  && $("promotionalCode").value != "")
    {
      alert(errorMsg.promoCodeBlank);
      return false;
    }
  }

  // only proceed if terms and conditions agreed to
  if( !paymentDetailsCheckTermsAgreed() )
  {
    return false;
  }
  else
  {
    termsChecked = true;
  }

  // if terms are checked and fields validate, submit
  if( termsChecked && fieldsValidated )
  {
    // disable the button to avoid multiple form submissions
  updateEssentialFields();

   // disableBookNowButton();
    //disableButton( "CheckoutPaymentDetailsBookNowButton", "/cms-cps/firstchoice"+ appConfig.bookNowGreyedButton );

	//called the new function for disabling the pay button for 3D change.
	disableThreeDSecureButton();
    return true;
  }
  else
  {
    return false;
  }

  // we introduce a slight delay to give the button a chance to
  // turn grey in Firefox
  setTimeout( "checkoutPaymentDetailsFormSubmit();", 100 );
}
/*************************End of book this holiday now button click related functions*************/

/**************************form validation related functions *************************************/

/**
 *  Shows error message and highlight the field when server side bin validation error occurs
 */
//TODO: logic can be improved
function showMessage(messageField, bcerrorMessage )
{
  if(trimSpaces(messageField)!="")
  {
    var len = messageField.split("|").length;
    if( len > 1 )
    {
      for(var i = 0; i < len; i++)
      {
    	containerId = "Field"+messageField.split("|")[i]+"ValidationContainer";
        validationMessageShow( containerId , bcerrorMessage );
        $(containerId).removeClassName("hidden");
        Element.show(containerId);
      }
    }
    else
    {
    	containerId = "Field"+messageField+"ValidationContainer";
        validationMessageShow( containerId , bcerrorMessage );
        $(containerId).removeClassName("hidden");
        Element.show(containerId);
    }
  }
}

/**
 * validate all fields on the form and display appropriate error messages
 *  Returns false if validation fails to prevent form submission
 */
function validateFormFields()
{
  //Get card type
  var cardType = getSelectedCardType();

  // assume that the form validates until we find a field that doesn't
  var errorFields = $A( [] );

  // clear any existing server side exception messages
  var priceDifferenceWarningBlock = $("PriceDifferenceWarningBlock");

  if( priceDifferenceWarningBlock )
  {
    priceDifferenceWarningBlock.innerHTML  ='';
    priceDifferenceWarningBlock.hide();
  }

  // clear any existing validation messages
  validationMessageClear( "FieldCardTypeValidationContainer" );
  validationMessageClear( "FieldCardNumberValidationContainer" );

  if( $("FieldValidFromValidationContainer") )
  {
    validationMessageClear( "FieldValidFromValidationContainer" );
  }

  validationMessageClear( "FieldExpiryDateValidationContainer" );
  validationMessageClear( "FieldCardNameValidationContainer" );
  validationMessageClear( "FieldIssueNumberValidationContainer" );
  validationMessageClear( "FieldSecurityCodeValidationContainer" );

  //Address fields validation message clearings done here.
  validationMessageClear( "FieldStreet_address1ValidationContainer" );
  validationMessageClear( "FieldStreet_address2ValidationContainer" );
  validationMessageClear( "FieldStreet_address3ValidationContainer" );
  validationMessageClear( "FieldStreet_address4ValidationContainer" );
  validationMessageClear( "FieldPostCodeValidationContainer" );
  //validationMessageClear( "FieldCountryValidationContainer" );

  // some fields only need checking depending on which card type is selected

  var numDigits         = appConfig.defaultSecurityCodeLength;
  var cardPaymentObject = getCardPaymentObject();

  if( cardPaymentObject )
  {
    numDigits = cardPaymentObject.securityCodeLength
  }

  var msgSecurityCode = "Please enter your " + numDigits + " digit security code.";

  if( clientApp.indexOf("FALCONBYO") == -1 )
  {
    msgSecurityCode = "Please enter your " + numDigits + " digit security code.";
  }
  else
  {
    msgSecurityCode = "Please enter the last "+numDigits+" digits of your card security code";
  }

  // card type
  if( !validateSingleInput( "payment_type_0", "FieldCardTypeValidationContainer", validationTestNotBlank, errorMsg.cardTypeBlank ) )
  {
    errorFields.push( "payment_type_0" );
  }

  // Card number

  var cardNumber = $F( "FieldCardNumber" );

  if( cardNumber == "" )
  {
    validationMessageShow( "FieldCardNumberValidationContainer", errorMsg.cardNumberBlank );
    errorFields.push( "CardNumber" );
  }
  else if( !validationTestNumeric( cardNumber ) )
  {
    validationMessageShow( "FieldCardNumberValidationContainer", errorMsg.cardNumberNonNumeric );
    errorFields.push( "CardNumber" );
  }
  else if( !validationCardNumberCheck( cardNumber, cardType ) )
  {
    // TODO: card number CRC check needs to go here once specified
    validationMessageShow( "FieldCardNumberValidationContainer", errorMsg.cardNumberMOD );
    errorFields.push( "CardNumber" );
  }

  // If the selected card is Solo or Maestro, "Issue Number" must be present
  if( cardType != null && (cardType == "SOLO" || cardType == "SWITCH") )
  {
    if( appConfig.isCheckIssueNumber )
    {
      validateIssueNumber(errorFields, errorMsg.issueNumberBlank, true);
    }
    else
    {
      // Perform card-specific validation on "valid from" and "issue number" fields
      validateSoloMaestroSpecificFields(errorFields, errorMsg.validFromInvalid, errorMsg.validFromBlank, errorMsg.issueNumberBlank);
    }
  }
  // Otherwise, valid the fields as normal for all other cards
  else
  {
    // Validate "valid from" as optional
    if($('FieldValidFromMonth'))
    {
      validateValidFrom(errorFields, errorMsg.validFromInvalid, errorMsg.validFromBlank, true);
    }

    // Validate "issue number" as optional
    validateIssueNumber(errorFields, errorMsg.issueNumberBlank, true);
  }

  // Expiry Date
  var expiryDateMonth = $F( "FieldExpiryDateMonth" );
  var expiryDateYear = $F( "FieldExpiryDateYear" );

  if( expiryDateMonth == "" )
  {
    validationMessageShow( "FieldExpiryDateValidationContainer", errorMsg.expiryBlank );
    errorFields.push( "ExpiryDate" );
  }
  else if( expiryDateYear == "" )
  {
     validationMessageShow( "FieldExpiryDateValidationContainer", errorMsg.expiryBlank );
     errorFields.push( "ExpiryDate" );
  }
  else if( validationDateInPast( expiryDateYear, expiryDateMonth ) )
  {
    validationMessageShow( "FieldExpiryDateValidationContainer", errorMsg.expiryInvalid );
    errorFields.push( "ExpiryDate" );
  }

  // name on card
  if( !validateSingleInput( "FieldCardName", "FieldCardNameValidationContainer", validationTestNotBlank, errorMsg.nameOnCardBlank ) )
  {
    errorFields.push( "FieldCardName" );
  }
  else if(!validateSingleInput( "FieldCardName", "FieldCardNameValidationContainer", validationTestNoSpecialCharacters, errorMsg.nameOnCardNoChars ))
  {
    errorFields.push( "FieldCardName" );
  }
  // security code
  if( clientApp.indexOf("FALCONBYO") == -1 )
  {
     if( !validateSingleInput( "FieldSecurityCode", "FieldSecurityCodeValidationContainer", validationTestNotBlank, msgSecurityCode ) )
     {
        errorFields.push( "FieldSecurityCode" );
     }
     else if( !validateSingleInput( "FieldSecurityCode", "FieldSecurityCodeValidationContainer", validationTestCardSecurityCode, msgSecurityCode ) )
     {
        errorFields.push( "FieldSecurityCode" );
     }
  }
  else if( !validateSingleInput( "FieldSecurityCode", "FieldSecurityCodeValidationContainer", validationTestCardSecurityCode, msgSecurityCode ) )
  {
    errorFields.push( "FieldSecurityCode" );
  }

  // Address Line1
  if( !validateSingleInput( "street_address1", "FieldStreet_address1ValidationContainer", validationTestNotBlank, errorMsg.addressLine1 ) ||
	  !validateSingleInput( "street_address1", "FieldStreet_address1ValidationContainer", validationTestAddress, errorMsg.addressLine1 ))
  {
    errorFields.push( "street_address1" );
  }
  //Address Line2 - only validates the field if it is not empty
  if(validateSingleInputSilently( "street_address2", "FieldStreet_address2ValidationContainer", validationTestNotBlank) )
  {
	if ( !validateSingleInputSilently( "street_address2", "FieldStreet_address2ValidationContainer", validationTestAddress, errorMsg.addressLine2 ))
	{
		  errorFields.push( "street_address2" );
		  validationMessageShow( "FieldStreet_address2ValidationContainer", errorMsg.addressLine2 );
	}
  }
  // Town/City
  if( !validateSingleInput( "street_address3", "FieldStreet_address3ValidationContainer", validationTestNotBlank, errorMsg.city ) ||
	  !validateSingleInput( "street_address3", "FieldStreet_address3ValidationContainer", validationTestTownCity, errorMsg.city ))
  {
    errorFields.push( "street_address3" );
  }
  // County
  if( !validateSingleInput( "street_address4", "FieldStreet_address4ValidationContainer", validationTestNotBlank, errorMsg.county ) ||
	  !validateSingleInput( "street_address4", "FieldStreet_address4ValidationContainer", validationTestCounty, errorMsg.county ))
  {
    errorFields.push( "street_address4" );
  }
  // Postcode
  if(($("country").value == "GB") && (!validateSingleInput( "payment_0_postCode", "FieldPostCodeValidationContainer", validationTestNotBlank, errorMsg.postCode ) ||
	  !validateSingleInput( "payment_0_postCode", "FieldPostCodeValidationContainer", validationTestPostCode, errorMsg.postCode )))
  {
    errorFields.push( "payment_0_postCode" );
  }

  // the form validated okay if there were no fields in error
  var validatedOkay = (errorFields.length == 0);

  // if there was a problem during validation
  if( !validatedOkay )
  {
    // then we need to display a warning block at the top of the page
    // make a lookup table for mapping input fields to validation links that
    // can appear in the pagetop warning block
    var fieldValidationLinks = {};

    fieldValidationLinks["payment_type_0"] = { text: "Card type", anchor: "FieldCardTypeAnchor", field: "payment_type_0" };
    fieldValidationLinks["CardNumber"] = { text: "Card number", anchor: "CardNumberAnchor", field: "FieldCardNumber" };
    fieldValidationLinks["ValidFrom"] = { text: "Valid from", anchor: "ValidFromAnchor", field: "FieldValidFromMonth" };
    fieldValidationLinks["ExpiryDate"] = { text: "Expires", anchor: "ExpiryDateAnchor", field: "FieldExpiryDateMonth" };
    fieldValidationLinks["FieldCardName"] = { text: "Name on card", anchor: "FieldCardNameAnchor", field: "FieldCardName" };
    fieldValidationLinks["FieldIssueNumber"] = { text: "Issue number", anchor: "FieldIssueNumberAnchor", field: "FieldIssueNumber" };
    fieldValidationLinks["FieldSecurityCode"] = { text: "Security code", anchor: "FieldSecurityCodeAnchor", field: "FieldSecurityCode" };

	//Address field validation
    fieldValidationLinks["street_address1"] = { text: "Address 1", anchor: "address1Anchor", field: "street_address1" };
	fieldValidationLinks["street_address2"] = { text: "Address 2", anchor: "address2Anchor", field: "street_address2" };
    fieldValidationLinks["street_address3"] = { text: "City", anchor: "cityAnchor", field: "street_address3" };
    fieldValidationLinks["street_address4"] = { text: "County", anchor: "countyAnchor", field: "street_address4" };
    fieldValidationLinks["payment_0_postCode"] = { text: "Post code", anchor: "postCodeAnchor", field: "payment_0_postCode" };
    //fieldValidationLinks["country"] = { text: "Country", anchor: "countryAnchor", field: "country" };

    var validationLinks = [];

    for( var i = 0; i < errorFields.length; ++i )
    {
      var field = errorFields[i];
      validationLinks.push( fieldValidationLinks[field] );
    }

    // display the links in a pagetop warning block
    validationPagetopWarningDisplay( "ValidationWarningBlock", validationLinks );
  }
  else
  {
    // otherwise hide the validation warning block if there was one previously
    validationPagetopWarningHide( "ValidationWarningBlock" )
  }

  // return true if the form validated, otherwise return false so that
  // form submission does not occur
  return validatedOkay;
}


/**
 *  If selected card is Solo or Maestro, check for correct input of either
 * the issue number or from valid field.
 * @params errorFields -
 *         msgValidFrom -
 *         msgValidFromBlank -
 *         isOptional -
*/
function validateSoloMaestroSpecificFields(errorFields, msgValidFrom, msgValidFromBlank, msgIssueNumber) {

  // Get "valid from" and "issue number" elements
  var validFromMonthObj = $("FieldValidFromMonth");
  var validFromYearObj  = $("FieldValidFromYear");
  var issueNumObj       = $("FieldIssueNumber");

  // Get "valid from" month and year values
  var validFromMonth, validFromYear;
  if((validFromMonthObj != null) && (validFromYearObj != null)) {
    validFromMonth = validFromMonthObj.value;
    validFromYear  = validFromYearObj.value;
  }

  // Get "issue number" value
  var issueNumber;
  if(issueNumObj != null)
    issueNumber = issueNumObj.value;

  // Determine if fields are blank or not
  var validFromBlank = !validationTestNotBlank(validFromMonth) && !validationTestNotBlank(validFromYear);
  var issueNumBlank  = (issueNumber == "");

  // If both fields are blank, add error message for "valid from" field
  if(validFromBlank && issueNumBlank) {
    validationMessageShow( "FieldValidFromValidationContainer", msgValidFromBlank );
     errorFields.push( "ValidFrom" );
  }
  // If "valid from" field is not blank and "issue number" is blank, validate only "valid from"
  else if(!validFromBlank && issueNumBlank) {
     validateValidFrom(errorFields, msgValidFrom, msgValidFromBlank, false);
  }
  // If "valid from" is blank and "issue number" is not blank, validate only "issue number"
  else if(validFromBlank && !issueNumBlank) {
    validateIssueNumber(errorFields, msgIssueNumber, false);
  }
  // Otherwise, both fields are not blank and both need to be validated
  else {
     validateValidFrom(errorFields, msgValidFrom, msgValidFromBlank, false);
     validateIssueNumber(errorFields, msgIssueNumber, false);
  }
}

/**
 *  Validates of "valid from" field.
 * @params errorFields -
 *         msgValidFrom -
 *         msgValidFromBlank -
 *         isOptional -
*/
function validateValidFrom(errorFields, msgValidFrom, msgValidFromBlank, isOptional) {

  // Valid from
   var validFromMonth = $F( "FieldValidFromMonth" );
   var validFromYear = $F( "FieldValidFromYear" );

  if( (validFromMonth == "") && (validFromYear == "") ){
      // If the field is optional, then it's ok to have a blank field, so do nothing.
      if(isOptional) {
        return;
      }
      // if the field is not optional and both month and year are blank, invalid.
      else {
        validationMessageShow( "FieldValidFromValidationContainer", msgValidFromBlank );
        errorFields.push( "ValidFrom" );
      }
  }
  else if( validFromMonth == "" ){
      validationMessageShow( "FieldValidFromValidationContainer", msgValidFrom );
      errorFields.push( "ValidFrom" );
  }
  else if( validFromYear == "" ){
      validationMessageShow("FieldValidFromValidationContainer", msgValidFrom );
     errorFields.push( "ValidFrom" );
  }
  else if( validationDateInFuture( validFromYear, validFromMonth ) ){
    validationMessageShow( "FieldValidFromValidationContainer", msgValidFrom );
    errorFields.push( "ValidFrom" );
  }
}

/** Validates "issue number" field.
 *@params errorFields -
 *         msgIssueNumber -
 *         isOptional -
*/
function validateIssueNumber(errorFields, msgIssueNumber, isOptional) {

  // issue number (only if Maestro or Solo is selected)
   var issueNumber = $( "FieldIssueNumber" );
    var paymentType = getSelectedCardType();
    var  isIssueNoRequired = "false";
    if($(paymentType+"_issueNo"))
    {
       isIssueNoRequired =$(paymentType+"_issueNo").value;
    }
   // If this field is optional, do standard validation
   if(isOptional) {
     if(issueNumber.value != "")
     {
      if( !validateSingleInput( "FieldIssueNumber", "FieldIssueNumberValidationContainer", validationTestIssueNumber, msgIssueNumber ) )
          errorFields.push( "FieldIssueNumber" );
     }
   }
   // If not optional (possible scenario for Solo and Maestro cards)
   else {
     if( !validateSingleInput( "FieldIssueNumber", "FieldIssueNumberValidationContainer", validationTestIssueNumber, msgIssueNumber ) )
         errorFields.push( "FieldIssueNumber" );
   }
}

/**see whether a given date is in the future or not. This function returns true if input date  is
 *greater than current date.
 *@params year - It will be compared with current year.
 *        month - It will be compared with current month.
*/
function validationDateInFuture( year, month )
{
    var currentTime = new Date();
    var currentYear = year2digit();
    var currentMonth = currentTime.getMonth() + 1;
     currentYear = 1*currentYear;

    var inFuture = (year > currentYear ) || ( (year == currentYear) && (month > currentMonth) );

    return inFuture;
}

/** see whether a given date is in the past or not. This function returns true if input date  is
 * lesser than current date.
 *@params year - It will be compared with current year.
 *        month - It will be compared with current month.
*/
function validationDateInPast( year, month )
{
    var currentTime = new Date();
    //var currentYear = currentTime.getYear();
    var currentYear = year2digit();
    var currentMonth = currentTime.getMonth() + 1;
    currentYear = 1*currentYear;

    var inPast = (year < currentYear) || ( (year == currentYear) && (month < currentMonth) );

    return inPast;
}

/* Returns 2 digit year **/
function year2digit()
{
   RightNow = new Date();
   return /..$/.exec(RightNow.getYear())
}

////////////////////////////////////////////////////////////////////////


// check whether a card number begins with one of the supplied sequences of digits
function validationCardNumberStartsWith( cardNumber, allowedSequences ){
 var validStartSequence = false;

 for( var i = 0; i < allowedSequences.length; i++ ){
  var sequence = allowedSequences[i];
  if( cardNumber.indexOf( sequence ) == 0 ){
   validStartSequence = true;
  }
 }
 return validStartSequence;
}



// check whether a card number starts with a valid sequence of digits for its type
function validationCardNumberCheckStartSequence( cardNumber, cardType ){
 var digits = cardNumber.length;

 switch( cardType ){
  case "maestro" : return validationCardNumberStartsWith( cardNumber, ["4","5","6"] );
  case "visa_debit" : return validationCardNumberStartsWith( cardNumber, ["4"] );
  case "solo" : return validationCardNumberStartsWith( cardNumber, ["4","5","6"] );
  case "visa" : return validationCardNumberStartsWith( cardNumber, ["4"] );
  case "mastercard" : return validationCardNumberStartsWith( cardNumber, ["51","52","53","54","55"] );
 }

 return false;
}



// check whether a card number has no more than a specific number of digits
function validationCardNumberCheckLength( cardNumber ){
 var digits = cardNumber.length;

 if (digits >= 13 && digits <= 19){
  return true;
 }
 else{
  return false;
 }

}



// check whether a card number is valid for its type
function validationCardNumberCheck( cardNumber, cardType ){
 // check that the card number has an allowable number of digits

 var validLength = validationCardNumberCheckLength( cardNumber );
 if( !validLength ){ return false; }

 // TODO: SIVA IS DETERMINING IF THIS IS REQUIRED
 // check that the card number starts with an allowed sequence of digits
 //var validStartSequence = validationCardNumberCheckStartSequence( cardNumber, cardType );
 //if( !validStartSequence ){ return false; }

 // mod 10 check
 var numberLength = cardNumber.length;
 var oddOrEven = numberLength & 1;
 var sum = 0;
 for( var count = 0; count < numberLength; count++ ){
  var digit = parseInt( cardNumber.charAt( count ) );

  if( !((count & 1) ^ oddOrEven)){
   digit *= 2;
   if( digit > 9 ){ digit -= 9; }
  }
  sum += digit;
 }

 var validNumber = ( (sum % 10) == 0 );

 return validNumber;
}


// Rounds a number to two always decimal places
function roundTwoDecimals(n) {

  ans = n * 1000;
  ans = Math.round(ans /10) + "";
  while(ans.length < 3) {
   ans = "0" + ans;
  }
  len = ans.length;
  ans = ans.substring(0,len-2) + "." + ans.substring(len-2,len);
  return ans
}

/**
 * @return returns true if terms and condition check box is checked
 * else an alert box will be displayed to ask user to check the check box
 */
function paymentDetailsCheckTermsAgreed()
{
   // see if they've ticked the checkbox saying they've agreed
   var termsAndConditionsAgreed = $( "agreeTermAndCondition" ).checked;

   // show a message if they haven't agreed
   if( !termsAndConditionsAgreed )
   {
     var message = "";
     message = errorMsg.termsConditions;
     alert( message );
   }

   // only let them submit if they have agreed
   return termsAndConditionsAgreed;
}







//////////////////////////////////End of CPS functions//////////////////////////////////////////////////////


var bookGrey = 'cms-cps/ / /book_holiday_now_greyed.gif';
//comma delimited for all images to preload
//preloadimages(bookGrey);

function checkoutPaymentDetailsInitialize(){

 throbberInitialise( "SummaryTotalPriceThrobber" );

 // Update the card charges
 updateCharges();

 // Enable "Book Now" button
 if ($( "CheckoutPaymentDetailsBookNowButton" ) != null) {
  var buttonObj = $( "CheckoutPaymentDetailsBookNowButton" );
  buttonObj.canBeClicked = true;
  buttonObj.disabled = false;

  //enableButton("CheckoutPaymentDetailsBookNowButton", "/cms-cps/firstchoice/hugo/images/buttons/book_holiday_now.gif")
  //button.src = cms-cps/firstchoice/hugo/images/buttons/book_holiday_now.gif
 }
}

/**
 * This function sets up an object with properties on it to make it easier to read and maintain
 * logic where references to a specific client app is required.
 */
function setUpAppConfig( clientApp )
{
   appConfig.isNewHoliday               = isNewHoliday;
   appConfig.defaultDepositType         = "fullCost";
   appConfig.defaultSecurityCodeLength  = 3;
   appConfig.path                 = "hugo";
   appConfig.showPromotions       = true;
   appConfig.disableRedeemBtn     = true;
   appConfig.clearPromotionalCode = false;
   appConfig.updateCardCharges    = true;
   appConfig.isCheckIssueNumber   = true;
   appConfig.bookNowGreyedButton = "/hugo/images/buttons/book_holiday_now_greyed.gif" ;
}

function setSummaryPanelCollapsable( isCollapsable )
{
  appConfig.hasCollapsableSummaryPanel = isCollapsable;
}

/*
 * Initialises:
 * - Payment Events, Low Deposit events, Promotional Code event
 * - Setup the App config object
 * - Load the corresponding style_js.css file
 * -
 *
 */
function initialisePaymentEvents()
{
  setUpAppConfig( clientApp );

  loadStylesheet( "/cms-cps/firstchoice/" + appConfig.path + "/css/style_js.css", "screen, print" );
  setToDefaultSelection();

  //Make an ajax call to check for booking button
  checkBookingButton("CheckoutPaymentDetailsBookNowButton");

  initialisePromotionalCodeEvents();
  initialiseDepositEvents();
  initialiseCreditCardTypeEvents();

  /**Initialize throbber */
  throbberInitialise( "SummaryTotalPriceThrobber" );

  if( appConfig.hasCollapsableSummaryPanel )
  {
    initialiseSummaryPanelEvents();
  }
}

/*
 * Initialises the promotional code events for the page.  It attaches an onclick event to the promotional code
 * flag field.
 */
function initialisePromotionalCodeEvents()
{
  var promoCodeFlag = $( "promoCodeFlag" );

  // Don't need to check the client app code because the promotional code elements
  // won't and shouldn't exist.
  if( promoCodeFlag )
  {
    var promotionalCodeValidationContainer = $("PromotionalCodeValidationContainer");

    promotionalCodeValidationContainer.removeClassName("hidden");

    promoCodeFlag.style.display = "inline";
    promoCodeFlag.setAttribute("href", "JavaScript:void(0);");
    promoCodeFlag.onclick = function( e )
    {
      processPromoClickEvent( e );
    }

    var redeemButton = $( "redeemButton" );

    if( redeemButton )
    {
      redeemButton.onclick = function(e)
      {
        stopEventBubbling( e );

        return processRedeemButtonClickEvent( e );
      }
    }
  }
}

/*
 * Gets all the deposit options that have the CSS class 'depositOption'
 */
function getDepositOptions()
{
  return document.getElementsByClassName( "depositOption" );
}

/*
 * Get all the deposit option selectors (radio buttons)
 */
function getDepositOptionSelectors()
{
  return document.getElementsByClassName( "depositRadioOption" );
}

/*
 * Initialises the deposit events
 * - Sets the current selection according to the hover API (functions.js)
 * - Attaches the onclick event to elements to the deposit options
 * - Attaches hover events to the elements using the hoverEvent in hover API (functions.js)
 */
function initialiseDepositEvents()
{
  var depositOptions = getDepositOptions();

  if( depositOptions )
  {
    for( var i = 0, len = depositOptions.length; i < len; i++ )
    {
      var option   = depositOptions[i];
      var selector = getDepositSelector( option );

      // Does the current
      if( selector && selector.checked )
      {
        setHoverSelection( option, "input[type=radio]" );

        if( appConfig.isNewHoliday )
        {
          //updateTransAmtForDepositAmountChange( selector.value );

           //non-ajax: To set the selected radio button value to PaymentInfo object
           setSelectedOption( selector.value );

        }
      }

      // Add the onclick event
      initialiseDepositOnclickEvents( option );
    }

    initialiseHoverEvents();
  }
}

/*
 * We need to attach onclick events to the row and the input field in the row.
 *
 * @param element - Is the element we are attaching the onclick event to.
 */
function initialiseDepositOnclickEvents( element )
{
  element.onclick = function( event )
  {
    // We do not want the event to bubble up.
    stopEventBubbling( event );

     // If the element is selected do not process the onclick processing.
    if( !element.hasClassName( "selected" ) )
    {
      resetHoverSelections();

      // Set the selection based on an HTML Tag input type radio
      setHoverSelection( element, "input[type=radio]" );

      // Get a reference to the selector that is associated with the element.
      var selector = getDepositSelector( element );

      // Does the selector exist?
      if( selector )
      {
        // updateAmountPayable( selector.value );
        //Non-ajax: handler in cardCharges.js will be called when radio button is clicked
        handleDepositSelection( selector.value );
        //End Non-ajax

        if( appConfig.updateCardCharges )
        {
          updateChargesInDropDown();
        }
      }
    }
  };
}

/*
 * Get a reference to the low deposit selector.
 *
 * @param element - Is the selector (the radio button) we want to get a reference to.
 */
function getDepositSelector( element )
{
  var selector = element.down( "input[type=radio]" );

  return selector;
}

/*
 * Gets the value of the selected radio button.  It will
 */
function getDepositSelectedValue()
{
  var depositOptions = $$( ".depositRadioOption" );
  var selectedValue  = null;

  if( depositOptions )
  {
    for( var i = 0, len = depositOptions.length; i < len; i++ )
    {
      var option = depositOptions[i];

      if( option.checked )
      {
        selectedValue = option.value;
      }
    }
  }

  return selectedValue;
}

/*
 * Initialises the credit card type
 */
function initialiseCreditCardTypeEvents()
{
  if( appConfig.isNewHoliday )
  {
    var cardSelect = $$( ".cardSelector" );

    if( cardSelect && cardSelect.length == 1 )
    {
      // This will only return one value
      cardSelect = $( cardSelect[0] );

      cardSelect.onchange = function( event )
      {
        //updateCharges( cardSelect.value );
        //Non-ajax: : handler in cardCharges.js will be called when credit card drop down changes
        handleCardSelection(0);
        //
        changePayButton();
      };
    }
  }

  if( appConfig.updateCardCharges )
  {
     var options = $('payment_type_0').options;
     for(var i=0; i<options.length ; i++)
     {
        paymenttypeoptions.push(options[i].text);
     }
     updateChargesForDeposits();
     updateChargesInDropDown();


  }
}

/*
 * Process the promo onclick event
 *
 * @param event - Is the click event object associated
 */
function processPromoClickEvent( event )
{
  var fieldPromotionalCode               = $( "promotionalCode" );
  var promotionalCodeValidationContainer = $( "PromotionalCodeValidationContainer" );

  // Lets check to see if the promotional code container is showing?
  if ( !promotionalCodeValidationContainer.hasClassName( "show" ) )
  {
    Element.addClassName( promotionalCodeValidationContainer, "show" );

    fieldPromotionalCode.focus();
  }
  else
  {
    // Lets clear the value if the customer has decided not to enter a promo code.
    if ( fieldPromotionalCode )
    {
      fieldPromotionalCode.value = "";
    }

    // Lets clear any messages that may be showing so that when the container is shown again
    // it shows without the messages
    validationMessageClear( promotionalCodeValidationContainer );

    Element.removeClassName( promotionalCodeValidationContainer, "validationContainerInactive" );
    Element.removeClassName( promotionalCodeValidationContainer, "show" );

    var promoCodeFailed = $("promoCodeFailed");

    promoCodeFailed.hide();
  }

  return false;
}

/*
 * Initialises Summary Panel events.
 * It adds expand and collapse functionality to the sections of the summary panel.
 */
function initialiseSummaryPanelEvents()
{
  toggleConfig.toggleExpandClass = "toggleExpand";
  toggleConfig.toggleParentNode  = "summaryFloatingPanel";

  setTogglerExpandImage( "/cms-cps/firstchoice/" + appConfig.path + "/images/buttons/form/expand.gif" );
  setTogglerCollapseImage( "/cms-cps/firstchoice/" + appConfig.path + "/images/buttons/form/collapse.gif" );

  var summaryFloatingPanel = $( toggleConfig.toggleParentNode );
  var contentBlock         = summaryFloatingPanel.down( "div.contentBlock" );
  var summarySections      = contentBlock.getElementsByClassName( "SummarySection" );

  for( var i = 0, len = summarySections.length; i < len; i++ )
  {
    var section = summarySections[i];
    var h3      = section.down( 'h3' );

    if( h3 )
    {
      section.addClassName( "toggleOwner" );
      section.addClassName( toggleConfig.toggleExpandClass);

      h3.addClassName(  "toggler" );

      addLinkToHeaderSection( h3 );
      addToggleImageToHeaderSection( h3 );

      var siblings = h3.nextSiblings();

      if( siblings )
      {
        for( var j = 0, jLen = siblings.length; j < jLen; j++ )
        {
          var sibling = siblings[j];

          sibling.addClassName( "toggleChild" );
          sibling.hide();
        }
      }
    }
  }

  setIsMultiToggle( true );
  initialiseTogglers( "summaryFloatingPanel" );
}

/*
 * Adds a link to the header section of the summary panel.  The text for the header element is surrounded by
 * anchor tags.
 *
 * @param element - Is the element to add the link to.
 */
function addLinkToHeaderSection( element )
{
  if( element )
  {
    var link = element.down( "a" );

    if( !link )
    {
      link = document.createElement( "a" );

      var firstChild = element.firstChild;

      element.insertBefore( link, firstChild );
    }

    if( link )
    {
      var child     = element.firstChild;
      var textData  = "";

      while( child )
      {
        if( child.nodeType == 3 )
        {
          textData   = child.data;
          child.data = "";

          break;
        }

        child = child.nextSibling;
      }

      link.innerHTML = textData;
    }
  }
}

/*
 * Adds a toggle image to the parentElement.  A new img element is created and is added to the parent element.
 */
function addToggleImageToHeaderSection( parentElement )
{
  var img = document.createElement( "img" );

  /* We now need to create a prototype instance of the image so that
     we can add the toggleImage class name to it.  There is a bug with
     using setAttribute( "class", "toggleImage" ); that for some reason
     when we try and traverse the DOM to get the element(s) with that
     class it is not picked up.  Hooray for prototype!
   */

  img = $( img );

  img.setAttribute( "src", toggleConfig.togglerExpandImage );
  img.addClassName( "toggleImage" );

  var firstChild = parentElement.firstChild;

  parentElement.insertBefore( img, firstChild );
}
/**This function is to change the pay button label according to the card selected.*/
function changePayButton()
{
   var payButtonDescription = threeDCards.get(PaymentInfo.selectedCardType);
   if(payButtonDescription == "mastercardgroup" || payButtonDescription == "visagroup" || payButtonDescription == "americanexpressgroup")
   {
      $("confirmBookNowButton").innerHTML = '<input type="image" src="/cms-cps/firstchoice/hugo/images/buttons/proceed-to-payment-btn.gif" alt="Proceed to payment" id="CheckoutPaymentDetailsBookNowButton" title="Proceed to payment"/>';
   }
   else
   {
      $("confirmBookNowButton").innerHTML ='<input type="image" src="/cms-cps/firstchoice/hugo/images/buttons/book_holiday_now.gif" alt="Book this holiday now" id="CheckoutPaymentDetailsBookNowButton" title="Book this holiday now"/>';
   }
}

/* Function to populate the address details. */
function fillAddressDetails()
{
	if (jQuery("#confirmLeadPassengerAddress").attr("checked"))
	{
		jQuery("#street_address1").val(addressConstants.ADDRESSLINE1);
		jQuery("#street_address2").val(addressConstants.ADDRESSLINE2);
		jQuery("#street_address3").val(addressConstants.CITY);
		jQuery("#street_address4").val(addressConstants.COUNTY);
		jQuery("#payment_0_postCode").val(addressConstants.POST_CODE);
		if(jQuery("#country"))
		   jQuery("#country").val(addressConstants.COUNTRY_CODE);
	}
}

function toggleOverlayFalcon()
{
	var overlayZIndex = 99;
	  var zIndex = 100;
	  var prevOverlay;
	  var stickyOpened = false;
	  jQuery("a.stickyOwner").click(function(e){
	    var overlay = "#" + this.id + "Overlay";
		if (!stickyOpened)
		{
			prevOverlay = overlay;
		}
		if (prevOverlay != overlay)
		{
			jQuery(prevOverlay).hide();
			stickyOpened = false;
		}
		/*var pos = jQuery("#"+this.id).offset();
		var left = parseInt((1*pos.left-120),10);
		var top = parseInt((1*pos.top-460),10);*/
		jQuery(overlay).show();
		/*jQuery(overlay).css("left",left);
		jQuery(overlay).css("top",top);*/
		prevOverlay = overlay;
		stickyOpened = true;
		jQuery(overlay + ".genericOverlay").css("z-index",zIndex);
		zIndex++;

		if (jQuery(overlay).parent(".overlay") != null){
		  jQuery(overlay).parent(".overlay").css("z-index",overlayZIndex);
		  overlayZIndex++;
		}
	    return false;
	  });

	  jQuery("a.close").click(function(){
	    var overlay = this.id.replace("Close","Overlay");
	    jQuery("#" + overlay).hide();
	    return false;
	  });
}

function toggleHugoStickyOverlay()
{
	var overlayZIndex = 99;
	  var zIndex = 100;
	  var prevOverlay;
	  var stickyOpened = false;
	  jQuery("a.stickyOwner").click(function(e){
	    var overlay = "#" + this.id + "Overlay";
		if (!stickyOpened)
		{
			prevOverlay = overlay;
		}
		if (prevOverlay != overlay)
		{
			jQuery(prevOverlay).hide();
			stickyOpened = false;
		}
		/*var pos = jQuery("#"+this.id).offset();
		var left = parseInt((1*pos.left-120),10);
		var top = parseInt((1*pos.top-570),10);*/
		jQuery(overlay).show();
		/*jQuery(overlay).css("left",left);
		jQuery(overlay).css("top",top);*/
		prevOverlay = overlay;
		stickyOpened = true;
		jQuery(overlay + ".genericOverlay").css("z-index",zIndex);
		zIndex++;

		if (jQuery(overlay).parent(".overlay") != null){
		  jQuery(overlay).parent(".overlay").css("z-index",overlayZIndex);
		  overlayZIndex++;
		}
	    return false;
	  });

	  jQuery("a.close").click(function(){
	    var overlay = this.id.replace("Close","Overlay");
	    jQuery("#" + overlay).hide();
	    return false;
	  });
}
