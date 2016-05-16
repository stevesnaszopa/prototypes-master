updateChargesForDeposits();
/*
 * Updates the card charge amounts for each of the deposit types.
 */
function updateChargesForDeposits()
{
  var depositTypes = $$('input[name=depositType]');
  var deposCardChargeDivs =  $$('#creditCardChargeAmt');
  var depositAmount = $$('#depositAmt');
  var cardCharge = null;
  var check_length=3;
  for(var i=0; i<check_length; i++)
  {
	  
	  if(depositTypes[i]!= null){
		    depositAmount = (depositTypes[i].value)?depositAmountsMap.get(depositTypes[i].value): depositAmountsMap.get("fullCost");
		    cardCharge = calculateCardCharge(depositAmount);
		    cardCharge = parseFloat(depositAmount) + parseFloat(cardCharge);
		    document.getElementById("creditCardChargeAmt_"+depositTypes[i].value+"").innerHTML =parseFloat(cardCharge).toFixed(2);
		    	//if(deposCardChargeDivs[i]){
		    		//deposCardChargeDivs[i].innerHTML = parseFloat(cardCharge).toFixed(2);
		    	//}
	  }
  }
}

/**
 ** This method calculates the card charge for the deposit amount.
**/
function calculateCardCharge(amount)
{
  var applicableCharges= new Array();
  var cardCharge=0.0;

    applicableCharges = configurableCardCharge.split(",");


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
 ** Refreshes the PaymentInfo. A central function responsible for
 ** keeping data integrity of different amounts in
 ** in this payment for client side validation.
**/
function updatePaymentInfo(selectedDepositType)
{
PaymentInfo.depositType = trimSpaces((selectedDepositType));
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

   var totalCharge = parseFloat(PaymentInfo.selectedDepositAmount) + parseFloat(calCardCharge);
   document.getElementById("creditCardChargeFinalAmt").innerHTML = totalCharge.toFixed(2);
   document.getElementById("debitCardFinalAmt").innerHTML = parseFloat(PaymentInfo.selectedDepositAmount).toFixed(2);
   document.getElementById("giftCardFinalAmt").innerHTML = parseFloat(PaymentInfo.selectedDepositAmount).toFixed(2);
}

/**
 ** This method sets the default deposit option and payment method on load of the payment page.
**/
function setDefaultDepositOption(){

/**
 ** To fix DE27682 , Onload of the page empty the security code value
**/
document.getElementById("cvv").value = "";
	

	if(isNewHoliday == 'false'){
		document.CheckoutPaymentDetailsForm.reset();
	}
	displayCreditCharges('debitcardType');
	if(depositAmountsMap.get('lowDeposit') != null){
		updatePaymentInfo('lowDeposit');
		selectedpaymentMode('quarter-amt');
	}else if(depositAmountsMap.get('deposit') != null){
		updatePaymentInfo('deposit');
		selectedpaymentMode('half-amt');
	}else{
		updatePaymentInfo('fullCost');
		selectedpaymentMode('full-amt');
	}
}