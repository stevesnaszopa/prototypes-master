/**
* This function is used to validate the partially or
* not entered transaction amount field.
* @param index The transaction index
* @return true/false
*/
function checkTransactionAmountBeforeFieldValidation(index)
{
   if (document.getElementById("transamt"+index))
   {
      if(document.getElementById("transamt"+index).value == currencySymbol || document.getElementById("transamt"+index).value == '')
      {
         SetCursorToTextEnd(document.getElementById("transamt"+index));
         return false;
      }
   }
   return true;
}
/*This file contains functions related Validation of payment panel *
 */
/* Used to validate fields in payment methods */
function validatePaymentFields(inputObj)
{
   thisObjType=inputObj.id.split("_")[2];

   //get unique method  identifier for this payment method
   var temp=(inputObj.id).split("_");
   var uniqueIdentifier=temp[0]+"_"+temp[1];
   var transVal=temp[1];
   var paymentType=document.getElementById("payment_type_"+temp[1]).value;
   if (checkTransactionAmountBeforeFieldValidation(transVal))
   {
   if($('payment_'+transVal+'_cardNumberId') && (maskedCardNumber != $('payment_'+transVal+'_cardNumberId').value || transVal!=0))
   {
    // Card number (method: Card,CNP)
   if(thisObjType=='cardNumberId'&&inputObj.value!='')
   {
      if(paymentType.indexOf("AMERICAN_EXPRESS")>=0)
      {
         Pat1 = /^[0-9]{15}$/;
      }
      else
      {
            Pat1 = /^[0-9]{16,20}$/;
      }
      inputObj.value = removeAllSpaces(inputObj.value)
      obj_value = inputObj.value
      if (!Pat1.test(obj_value))
      {
             return setFocus('Please enter a valid card number.',inputObj)
      }
   }
   }

    //Name on card (method: Card,CNP)
    if(thisObjType=='nameOnCardId'&&inputObj.value!='')
    {
             var Pat1 = /^[-a-zA-Z&@ \"\',\.\x27]*$/;
             if (!Pat1.test(inputObj.value)) { return setFocus('Please enter a valid name.' , inputObj) }
    }

    //post code (method: Card,CNP)
    if(thisObjType=='postCodeId'&&inputObj.value!='')
    {

       obj_value = inputObj.value.toUpperCase();
       Pat1 = /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXYU0-9]?[ABEHMNPRVWXY0-9]? {0,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/;
       if (!Pat1.test(obj_value))
       {
         return clearAndFocus('We cannot validate the post code you have entered. Please check and re-enter. ',inputObj);
       }
    }

    if($('payment_'+transVal+'_securityCodeId') && (maskedCvv != $('payment_'+transVal+'_securityCodeId').value || transVal!=0))
    {
     //Security code (method: Card,CNP)
    if(thisObjType=='securityCodeId'&&inputObj.value!='')
    {
        // method=document.getElementById("payment_"+transVal+"_paymenttypecode").value;
        // securityCodeLength=document.getElementById(method+"_securityCodeLength").value;
       if (paymentType!='')
       {
         var cardtype= paymentType.split("|")[0];
         var securityCodeLength=document.getElementById(cardtype+"_securityCodeLength").value
         Pat1 = /^[0-9 ]*$/;
         if(paymentType.indexOf("AMERICAN_EXPRESS")>=0 && inputObj.value.length != securityCodeLength)
         {
             return clearAndFocus('Please enter a valid security number (the '+securityCodeLength+' digit code above the card number on the front of your card)', inputObj);
         }
         else if( (inputObj.value.length != securityCodeLength)  || (!Pat1.test(inputObj.value)) )
         {
             return clearAndFocus('Please enter a valid security number (the last '+securityCodeLength+' digits in the signature strip on the reverse of your card)',inputObj)
         }
       }
    }
    }

    //Start date
   if(thisObjType=='startDateId'&&inputObj.value!='')
   {
       //ddmm
     var val=document.getElementById(inputObj.id).value;
     var datePattern=/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-9]|2[0-9])$/;
     if(!val.match(datePattern))
     {
          return clearAndFocus('Please enter date in mmyy format only',inputObj)
     }
   }

    //Expiry date
   if(thisObjType=='expiryDateId'&&inputObj.value!='')
   {
      //ddmm
     var val=document.getElementById(inputObj.id).value;
     checkStartDate(expiryDateObj);
   }

    //Voucher no.  (method: Voucher)
    if(thisObjType=='voucherId' &&inputObj.value!='')
    {
        if(inputObj.value.length != 8)
        {
           return clearAndFocus('Please enter voucher no length as 8',inputObj)
        }
        else
        {

        }
    }

     //Name on cheque  (method:  Cheque  )
    if(thisObjType=='nameOnChequeId' &&inputObj.value!='')
    {
             var Pat1 = /^[-a-zA-Z&@ \"\',\.\x27]*$/;
             if (!Pat1.test(inputObj.value)) { return setFocus('Please enter a valid name.' , inputObj) }
    }
   }
}

function voucherCodeValid(vcode)
{
      var temp=(vcode.id).split("_");
      var uniqueIdentifier=temp[0]+"_"+temp[1];
      var transVal=temp[1];
      if (checkTransactionAmountBeforeFieldValidation(transVal))
      {
         if(vcode.value.length != 8&&vcode.value!='')
         {
            alert("Please enter voucher code length as 8");
            vcode.focus();
            return;
         }
         var pat = "";
         var valSet = vcode.getAttribute("alt").split("|");
         var alertMsg = valSet[0];
         var type = valSet[1];
         if (type = "ALPHANUMERIC")
         {
             pat = /^[-a-zA-Z0-9 \\\/.,]*$/;
         }
         else if (type = "NUMERIC")
         {
            pat = /^[0-9{.}]*$/;
         }
         var voucherCodeValue = vcode.value;

         if (voucherCodeValue!='')
         {
            if (voucherCodeValue.match(pat))
            {
               //do the work
            }
            else
            {
               alert(alertMsg);
               vcode.value='';
               vcode.focus();
            }
         }
      }
}

function checkPaymentTypes(hotelElem, flightElem)
{
   if (document.getElementById('paymentTrans'))
   {
      var paymentFlag = false;
      var totalPayments = Number(document.getElementById('paymentTrans').value);
      for (var i = 0; i < totalPayments; i++)
      {
         if (document.getElementById('chkbox'+i) && document.getElementById('chkbox'+i).checked)
         {
            paymentFlag = true;
            break;
         }
      }
      if (paymentFlag)
      {
         alert ("Discounts are not applicable once payment done.");
         if (hotelElem)
         {
             hotelElem.value = '';
             hotelElem.focus();
         }
         if (flightElem)
         {
             flightElem.value = '';
             flightElem.focus();
         }
         return false;
      }
   }
   return true;
}
///////////////////////////////////////////////End of input field pattern ////////////////////////////////////////////////////////////////////////////

