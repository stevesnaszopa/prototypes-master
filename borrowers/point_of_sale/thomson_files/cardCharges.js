/** To allow card charge calculation can be done in more than one way. */
multiFormatCardChargeCalculation= false;

/**
 * returns multiFormatCardChargeCalculation value
 *
 * @return multiFormatCardChargeCalculation
 */
function isMultiFormatCardCharge()
{
  return multiFormatCardChargeCalculation;
}

/**
 * Sets multiFormatCardChargeCalculation to true or false. It should be called to set m
 *
 * @param booleanValue should be either true or false
 */
function setMultiFormatCardCharge(booleanValue)
{
  multiFormatCardChargeCalculation = booleanValue
}

/**
 ** Function for setting the selected deposit value
 ** into PaymentInfo object and update the values
 ** in UI according to selection made.
 ** @param selectedDepositType Selected deposit value, ex- LowDeposit, Deposit
**/
function handleDepositSelection(selectedDepositType)
{
   if(newHoliday == 'true')
   {
    //Set depositValue to PaymentInfo.depositType.
     PaymentInfo.depositType = trimSpaces((selectedDepositType));
      if ((PaymentInfo.totalTransactions != undefined || PaymentInfo.totalTransactions != null )&&  PaymentInfo.totalTransactions > 1)
         updatePaymentInfoForMultipleTransactions();
      else
        updatePaymentInfo();
     displayFieldsWithValuesForDeposit();
   }
}

/**
 ** Refreshes the PaymentInfo. A central function responsible for
 ** keeping data integrity of different amounts in
 ** in this payment for client side validation.
**/
function updatePaymentInfo()
{
   if(PaymentInfo.partialPaymentAmount == null || PaymentInfo.partialPaymentAmount == undefined)
   {
      PaymentInfo.selectedDepositAmount = (depositAmountsMap.get(PaymentInfo.depositType) != null) ? depositAmountsMap.get(PaymentInfo.depositType) : parseFloat(1*PaymentInfo.totalAmount  - 1*PaymentInfo.calculatedDiscount).toFixed(2);
   }
   else
   {
      PaymentInfo.selectedDepositAmount = (depositAmountsMap.get(PaymentInfo.depositType) != null) ? depositAmountsMap.get(PaymentInfo.depositType) : parseFloat(1*PaymentInfo.payableAmount  - 1*PaymentInfo.calculatedDiscount).toFixed(2);
   }
   calCardCharge  = calculateCardCharges(PaymentInfo.selectedDepositAmount);
   PaymentInfo.totalCardCharge = calCardCharge;
   PaymentInfo.calculatedPayableAmount = roundOff(1*PaymentInfo.selectedDepositAmount + 1*PaymentInfo.totalCardCharge , 2); //parseFloat(1*PaymentInfo.selectedDepositAmount + 1*PaymentInfo.totalCardCharge).toFixed(2);
   PaymentInfo.calculatedTotalAmount = roundOff((1*PaymentInfo.totalAmount - 1*PaymentInfo.calculatedDiscount) + 1*PaymentInfo.totalCardCharge , 2); //parseFloat((1*PaymentInfo.totalAmount - 1*PaymentInfo.calculatedDiscount) + 1*PaymentInfo.totalCardCharge).toFixed(2);
}

/**
 ** Refreshes the PaymentInfo for multiple transactions.
 ** A central function responsible for
 ** keeping data integrity of different amounts
 ** in this payment for client side validation.
**/
function updatePaymentInfoForMultipleTransactions()
{
   var calCardCharge = 0;
   var depositTypeConstant = "ADDITIONAL";
   /** Once manual segments go live the below condition should be removed**/
   if(manualSegments == 'true')
   {
	   depositTypeConstant = "partialDeposit";
   }
   for (var i = 0; i < PaymentInfo.totalTransactions; i++)
   {
      if (PaymentInfo.currentIndex == i)
      {
         if((PaymentInfo.partialPaymentAmount == null || PaymentInfo.partialPaymentAmount == undefined )&& !(PaymentInfo.depositType != null && PaymentInfo.depositType.equalsIgnoreCase(depositTypeConstant)))
         {
            PaymentInfo.selectedDepositAmount = (depositAmountsMap.get(PaymentInfo.depositType) != null) ? depositAmountsMap.get(PaymentInfo.depositType) : parseFloat(1*PaymentInfo.totalAmount  - 1*PaymentInfo.calculatedDiscount).toFixed(2);
         }
         else if(PaymentInfo.depositType.equalsIgnoreCase(depositTypeConstant))
         {
          PaymentInfo.selectedDepositAmount= totalAdditionalTransactionAmount();
         }
         else
         {
            PaymentInfo.selectedDepositAmount = (depositAmountsMap.get(PaymentInfo.depositType) != null) ? depositAmountsMap.get(PaymentInfo.depositType) : parseFloat(1*PaymentInfo.payableAmount  - 1*PaymentInfo.calculatedDiscount).toFixed(2);
         }
         if (!reverseCompleted && !reversalStatus)
         {
            PaymentInfo.totalCardCharge = addCardChargesForMultipleTransactions();
         }
         PaymentInfo.calculatedPayableAmount = parseFloat(1*PaymentInfo.selectedDepositAmount + 1*PaymentInfo.totalCardCharge).toFixed(2);
         PaymentInfo.calculatedTotalAmount = parseFloat((1*PaymentInfo.totalAmount - 1*PaymentInfo.calculatedDiscount) + 1*PaymentInfo.totalCardCharge).toFixed(2);
      }
   }
}

/**
 ** Calculates the card charges for the all the transaction
 ** amount based on the style class applied to it.
 ** @return cardCharge Card charge for the amount sent in.
**/
function addCardChargesForMultipleTransactions()
{
   var cardChargesValue = 0;
   var cardChargeElements =  $$('.cc_total_amount');
   for (var i = 0; i < cardChargeElements.length; i++)
   {
      cardChargesValue = parseFloat(1*cardChargesValue + 1*cardChargeElements[i].value).toFixed(2);
   }
   PaymentInfo.totalCardCharge = cardChargesValue;
   return PaymentInfo.totalCardCharge;
}

/**
 ** Calculates the total amounts of  all the transactions for additional payment type.
 ** amount based on the style class applied to it.
 ** @return cardCharge Card charge for the amount sent in.
**/
function totalAdditionalTransactionAmount()
{
var totamtentered=0;
var totalTransactions = document.getElementById("paymentTrans").value;
for(var i=0;i<=PaymentInfo.totalTransactions;i++)
{
  if( $("transamt"+i)!= null && $("transamt"+i).value != "")
  {
    totamtentered = parseFloat($("transamt"+i).value)+$(totamtentered);
  }
}
   PaymentInfo.selectedDepositAmount = totamtentered;
   return PaymentInfo.selectedDepositAmount;
}

/**
 ** Calculates the card charges for the amount
 ** passed in as a parameter.
 ** @param amount Amount for which card charges to be calculated.
 ** @return cardCharge Card charge for the amount sent in.
**/
function calculateCardCharges(amount)
{
   /*if(!isMultiFormatCardCharge())
   {
     PaymentInfo.chargePercent = cardChargeMap.get(PaymentInfo.selectedCardType);
     var cardCharge = roundOff(((amount * PaymentInfo.chargePercent)/100),2);
     if (PaymentInfo.maxCardChargeAmount != null && PaymentInfo.maxCardChargeAmount != "")
     {
      cardCharge = (cardCharge > 1*PaymentInfo.maxCardChargeAmount) ? 1*PaymentInfo.maxCardChargeAmount : cardCharge;
     }
     return cardCharge;
   }
   else
   {
     //Calculate card charge in multiple ways(as applicable)
    return roundOff(calculateDotNetCardCharges(amount),2);
   }*/
   return roundOff(calculateDotNetCardCharges(amount),2);
}

/** Function for updating total amount based on the
 ** style class applied to it.
**/
function displayTotalAmounts(totalAmountClassName)
{
   //Display the total amounts with calculated total amount.
   var totAmts = $$('.'+totalAmountClassName);
   for(var i=0; i<totAmts.length; i++)
   {
       if (totAmts[i].innerHTML.indexOf(currencySymbol) != -1)
        totAmts[i].innerHTML = currencySymbol + formatDepositAmount(PaymentInfo.calculatedTotalAmount);
      else
        totAmts[i].innerHTML = formatDepositAmount(PaymentInfo.calculatedTotalAmount);
   }
}

/**
 ** Function for handling the selected card type value
 ** and update the values in UI according to selection made.
**/
function handleCardSelection(index)
{
   if(newHoliday == 'true')
   {
     var selectedCard;
     if ($("payment_type_"+index))
     {
      var selectedCardValue = $("payment_type_"+index).value;
      var selectedCardArray = selectedCardValue.split("|");
      selectedCard = (selectedCardArray!=""&&selectedCardArray) ? selectedCardArray[0] : null;
     }

     PaymentInfo.selectedCardType = selectedCard;
      if (PaymentInfo.totalTransactions != undefined || PaymentInfo.totalTransactions != null || PaymentInfo.totalTransactions > 1)
         updatePaymentInfoForMultipleTransactions();
      else
        updatePaymentInfo();
     displayFieldsWithValuesForCard();
   }
}

/**
 ** Function for updating the deposit amounts for all the
 ** deposit options. This is done as per the style class applied
 ** to the input radio element.
**/
function displayAllDepositOptionsWithCardCharge()
{
   var depositTypes = $$('input.deposit');
   var deposCardChargeDivs =  $$('.depositAmount');
   var depositAmount = null;
   var cardCharge = null;
   for(var i=0; i<depositTypes.length; i++)
   {
      depositAmount = parseFloat(depositAmountsMap.get((depositTypes[i].value))).toFixed(2);
      cardCharge = parseFloat(calculateCardCharges(depositAmount)).toFixed(2);
      var depositAmountForFormatting = parseFloat(1*depositAmount + 1*cardCharge).toFixed(2);
      if (deposCardChargeDivs[i].innerHTML.indexOf(currencySymbol) != -1)
        deposCardChargeDivs[i].innerHTML = currencySymbol + formatDepositAmount(depositAmountForFormatting);
    else
        deposCardChargeDivs[i].innerHTML = formatDepositAmount(depositAmountForFormatting);
   }
}

/**
 ** Creates a map object for holding the objects
 ** in JS and as well the objects from JSP.
**/
function Map()
{
   var object = new Array();
   this.put = function(key, value)
   {
      object[key] = value;
   };

   this.get = function(key)
   {
      var item = object[key];
      if(item==undefined)
      {
         return null;
      }
      return item;
   };
}

String.prototype.equalsIgnoreCase = function(newString){
  if(stripChars(this.toLowerCase(),"") == stripChars(newString.toLowerCase(),"")){
    return true;
  }
  return false;
}

/**
 ** Function for handling the selected card type value
 ** and update the values in UI according to selection made.
**/
function handleDotNetCardSelection(index)
{
   if(newHoliday == 'true')
   {
     var selectedCard;
     if ($("payment_type_"+index))
     {
      var selectedCardValue = $("payment_type_"+index).value;
      var selectedCardArray = selectedCardValue.split("|");
      selectedCard = (selectedCardArray!=""&&selectedCardArray) ? selectedCardArray[0] : null;
      PaymentInfo.selectedCardType = selectedCard;
     }
    updateDotNetPaymentInfo();
    displayFieldsWithValuesForCard();
   }


}

/**
 ** Refreshes the PaymentInfo. A central function responsible for
 ** keeping data integrity of different amounts in
 ** in this payment for client side validation.
**/
function updateDotNetPaymentInfo ()
{
   calCardCharge  = calculateDotNetCardCharges(PaymentInfo.totalAmount);
   PaymentInfo.totalCardCharge = calCardCharge;
   PaymentInfo.calculatedPayableAmount = parseFloat(1*PaymentInfo.payableAmount+1*PaymentInfo.totalCardCharge).toFixed(2);
  PaymentInfo.calculatedTotalAmount = parseFloat((1*PaymentInfo.totalAmount )+( 1*PaymentInfo.totalCardCharge)).toFixed(2);
}

/**
 ** Calculates the card charges for the amount
 ** passed in as a parameter.
 ** @param amount Amount for which card charges to be calculated.
 ** @return cardCharge Card charge for the amount sent in.
**/
function calculateDotNetCardCharges(amount)
{
    return calculateSelectedCardCharge(amount, PaymentInfo.selectedCardType);
}

/**
 ** Calculates the card charge for the amount, selected card.
 **
 ** @param amount the transaction amount.
 ** @param selectedCard the selected card.
 **
 ** @return the calculated card charge.
**/
function calculateSelectedCardCharge(amount, selectedCardType)
{
  var applicableCharges= new Array();
  var cardCharge=0.0;

  if (cardChargeMap.get(selectedCardType) == null || cardChargeMap.get(selectedCardType) == "" ||cardChargeMap.get(selectedCardType) == 0)
  {
     return parseFloat(cardCharge);
  }

    applicableCharges = cardChargeMap.get(selectedCardType).split(",");


    if(applicableCharges!=null)
    {
     if(applicableCharges[0] > 0.0)
      {
      cardCharge = parseFloat(amount * (applicableCharges[0]/100));
    }
       if (parseFloat(applicableCharges[1]) > 0.0 && parseFloat(cardCharge) < parseFloat(applicableCharges[1]))
      {
        cardCharge = parseFloat(applicableCharges[1]);
      }
      if (parseFloat(applicableCharges[2]) > 0.0 && parseFloat(cardCharge) > parseFloat(applicableCharges[2]))
      {
         cardCharge = parseFloat(applicableCharges[2]);
      }
    }
    return cardCharge.toFixed(2);
}

/**
 ** Retrives the  Min,Max, IssueRequired for the amount
 ** passed in as a parameter.
 ** @param cardName CardName for which Min,Max, IssueRequired  to be calculated.
 ** @return cardDetailsInfo CardDetailsInfo for the cardName sent in.
**/
function getCardDetails(cardName)
{
  return cardDetails.get(cardName);
}
function toggleOverlay()
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
	var pos = jQuery("#"+this.id).offset();
	var left = parseInt((1*pos.left-75),10);
	var top = parseInt((1*pos.top+20),10);
	jQuery(overlay).show();
	jQuery(overlay).css("left",left);
	jQuery(overlay).css("top",top);
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
