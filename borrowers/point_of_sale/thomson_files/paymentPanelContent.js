   var currencySymbol="£";
/*
*
*methods for payment panel display
*
/
/*
*/
function noPaymentMethodSelectedDisplay(index,transamt)
{

   var transamtText="Transaction Amount";
   var tottransamtText="Total amount charged in this transaction:";
   transamtalertText="Please enter a valid Transaction Amount";
  var noPaymentMethodSelectedDisplay='';
  noPaymentMethodSelectedDisplay ="<br clear='all'/><div id='cardRefundArea"+index+"' style='display:none;' class='refundCaption'></div>"+
                 "<div class='container_val transAmtStyle'>"+
                 "<br clear='all'/><div class='trans_amt'>"+transamtText+"</div>"+
                 "<input class='medium' type='hidden' name='payment_"+index+"_transamt' id='transamt_carry"+index+"' alt='"+transamtalert+"' value='"+transamt+"'>"+
                 "<input class='medium' type='text' id='transamt"+index+"' onblur='transamtHandler("+index+",currOption,this)' alt='"+transamtalert+"' value='"+transamt+"'></div>"+
                 "<div  class='container_val' id='cardCharges"+index+"'></div>"+
                 "<div  class='container_val topMargin1'><div class='trans_amt'>"+tottransamtText+"</div>"+
                 "<div class='tottransamt1  topMargin1' id='tottransamt"+index+"'>"+transamt+"</div>"+
                 "</div><br clear='all'/>"+
                 "<input type='hidden' class='c_total_amount' id='total_amount_"+index+"' name='payment_"+index+"_amountPaid' value='0.0'/>"+
                 "<div id='format"+index+"' class='blockcontain'></div>";

   return noPaymentMethodSelectedDisplay;
}



/***methods for payment panel display ***/
/*
 * This method contains default display content when page is loaded
 *
 *@params    index - index of this transaction
 *                  paymenttypeoptions- Payment methods applicable for this transaction
*/

function paymentTypeDropDownDisplay(index,paymenttypeoptions)
{
   var paymentTypeDropDown='';
   paymentTypeDropDown="<select id='payment_type_"+index+"' class='payment_type' name='payment_"+index+"_type' onchange='paymentPanelController(this,this.value,"+index+");'>"+
              "<option value=''>Please Select</option>"+paymenttypeoptions+"</select>\t<span class='buttonStyle' id='cancelDiv"+index+"'></span>";
   return paymentTypeDropDown;
}

/*
 * This method contains default display content when page is loaded
 *
 *@params    index - index of this transaction
 *                  paymenttypeoptions- Payment methods applicable for this transaction
*/
function paymentConfigDisplay(index,paymenttypeoptions)
{

   var transamtText="Transaction Amount";
   var tottransamtText="Total amount charged in this transaction:";
   transamtalertText="Please enter a valid Transaction Amount";
   var paymentConfiguration='';
     var paymentoptionsSelectbox=paymentTypeDropDownDisplay(index,paymenttypeoptions);

       paymentConfiguration+="<div id='paymentFor"+index+"'>"+
                 "<div id='transactionId_"+index+"'>"+
                 "<div class='container_val'><strong><span class='transText'>Transaction "+(Number(index)+1)+"</span></strong></div>"+
                  "<div id='paymentPanelTransaction' class='paymentPanelTransaction'>"+ //div for brac
                 "<div id='selectBox"+index+"' class='selectBox'> "+
                 paymentoptionsSelectbox+"</div>"+
                 "<div id='innerContainer"+index+"'>"+ //
                 "<div class='container_val transAmtStyle'>"+
                 "<br clear='all'/><div id='cardRefundArea"+index+"' style='display:none;' class='refundCaption'></div>"+

                 "<div class='trans_amt'>"+transamtText+"</div>"+
                 "<input class='medium' type='hidden' name='payment_"+index+"_transamt' id='transamt_carry"+index+"' alt='"+transamtalert+"' value=''>"+
                 "<input class='medium' type='text'  id='transamt"+index+"' onblur='transamtHandler("+index+",currOption,this)' alt='"+transamtalert+"' value='"+currencySymbol+"'></div>"+
                 "<div id='error0' class='datacashError' style='display:none'>"+responseMsg+"</div>"+
                 "<div  class='container_val' id='cardCharges"+index+"'></div>"+
                 "<div  class='container_val topMargin1'><div class='trans_amt'>"+tottransamtText+"</div>"+
                 "<div class='tottransamt1  topMargin1' id='tottransamt"+index+"'></div>"+
                 "</div><br clear='all'/>"+
                 "<div class='pinpadCardDets' id='pinpadCardDetails"+index+"'></div>"+ //div for PINPAD cardtype
                 "<div class='pinpadMsgDets' id='pinpadMsgDetails"+index+"'></div>"+ //div for PINPAD message
		 		 "<div id='pinpadCardNumber"+index+"' style='display:none;'></div>"+ //div for pinpad card number
                 "<input type='hidden' class='c_total_amount' id='total_amount_"+index+"' name='payment_"+index+"_amountPaid' value='0.0'/>"+
                 "<div id='format"+index+"' class='blockcontain'></div>"+
                 "</div>"+ //
                 " </div>"+ //end of div for brac
                 "</div></div><br clear='all'/>";
   return paymentConfiguration;
}

/*
 * This method contains hopla display content
 *
 *@params    hoplaIndex - index of this transaction
 *           paymenttypeoptionsHopla- Payment methods applicable for this transaction
*/

function paymentConfigHoplaDisplay(hoplaIndex,paymenttypeoptionsHopla)
{
   var paymentConfigHopla='';
   paymentConfigHopla+="<br clear='all'/><div class='hoplaTitle' ><strong>Post payment guarantee</strong></div><br/>"+
   "<div id='paymentFor"+hoplaIndex+"'>"+
        "<div id='paymentPanelTransaction' class='paymentPanelTransaction'>"+ //div for brac
   "<div id='selectBox"+hoplaIndex+"' class='selectBox'> "+
          "<select id='payment_type_"+hoplaIndex+"' class='payment_type' name='payment_"+hoplaIndex+"_type' onchange='selectedPaymentTypeHoplaDisplay(this,"+hoplaIndex+");'>"+
                     "<option value=''>Please Select</option>"+paymenttypeoptionsHopla+"</select>"+
    "</div>"+
    "<div class='container_val'>"+
    "<div class='container_val' id='cardCharges"+hoplaIndex+"'></div>"+
     "</div><br clear='all'/>"+
     "<div id='formatHopla' class='blockcontain'></div><br clear='all'/>"+
      "<div id='hoplaText"+hoplaIndex+"'><label class='font_normal'>Credit Card Charges May Apply</label></div>"+
      "<input type='hidden' class='c_total_amount' id='total_amount_"+hoplaIndex+"' name='payment_"+hoplaIndex+"_amountPaid' value='0.0'/>"+
      "</div>"+
     " </div>"+ //div for brac
      "</div><br/><br clear='all'/>";
   return paymentConfigHopla;
}

/*
 *Contains cash display for CP and CPNA
 *
 *
 *@params    selVal - Code of this payment method e.g- CA etc
 *                  selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *                  transVal- Index of this transaction
*/
 function cashConfigDisplay(selVal,selValEnumValue,transVal)
 {
     //Text to be displayed after "collectPayment" checkbox
    var cashacceptText="Cash Accepted";
    var cashConfiguration='';
    cashConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
       "<input type='hidden' value='"+selVal+"' name='payment_"+transVal+"_paymenttypecode' />"+
       "<div id='chkboxcontainer_"+transVal+"' class='checkbx_cont'>"+
       "<div class='chk_box'><input type='checkbox' id='chkbox"+transVal+"' onclick='collectPayment("+transVal+")'>"+
       "<span class='chk_box_val' id='chk_box_text'>"+cashacceptText+"</span>"+
       "</div><br clear='all'/>";

    return cashConfiguration;
 }

 /*
 *Contains save Only No Refund for BRAC
 *
 *
 *@params    selVal - Code of this payment method e.g- CA etc
 *                  selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *                  transVal- Index of this transaction
*/
 function saveOnlyNoRefundConfigDisplay(selVal,selValEnumValue,transVal,panelType)
 {
    //Text to be displayed after "collectPayment" checkbox
    var paymentacceptText="Payment Accepted";
    var saveOnlyNoRefundConfiguration='';
    saveOnlyNoRefundConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
       "<input type='hidden' value='"+selVal+"' name='payment_"+transVal+"_paymenttypecode' />"+
       "<div id='chkboxcontainer"+transVal+"' class='checkbx_cont'>"+
       "<div class='chk_box'>"+
       "<input type='checkbox' id='chkbox"+transVal+"' onclick='collectPayment("+transVal+")'>"+
       "<span class='chk_box_val' id='chk_box_text'>"+paymentacceptText+"</span>"+
       "<input type='hidden' name='payment_"+transVal+"_chargeAmount' class='cc_total_amount' id='payment_"+transVal+"_chargeIdAmount' value='0.0'/>"+
       "<input type='hidden' name='payment_"+transVal+"_datacashreference' id='payment_"+transVal+"_datacashreference' value=''/>"+
       "</div><br clear='all'/>";
    return saveOnlyNoRefundConfiguration;
 }


/*
 *Contains cheque display for CP ans CPNA
 *
 *
 *@params    selVal - Code of this payment method e.g- CA etc
 *                  selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *                  transVal- Index of this transaction
 */
 function chequeConfigDisplay(selVal,selValEnumValue,transVal)
 {
    //Text to be displayed after "collectPayment" checkbox
    var cheqacceptText="Cheque Accepted";
  var chequeConfiguration='';
    chequeConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
       "<input type='hidden' value='"+selVal+"'  name='payment_"+transVal+"_paymenttypecode' />"+
       "<div id='chkboxcontainer_"+transVal+"' class='checkbx_cont'>"+
       "<div class='chk_box'><input type='checkbox' id='chkbox"+transVal+"' onclick='collectPayment("+transVal+")'>"+
       "<span class='chk_box_val' >"+cheqacceptText+"</span>"+
       "</div><br clear='all'/>";
    return chequeConfiguration;
 }

/*
 *For voucher display
 *
  *@params selVal - Code of this payment method e.g- CA etc
 *         selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *         transVal- Index of this transaction
 *         vocIndex-
*/
 function vouchConfigDisplay(selVal,selValEnumValue,transVal,vocIndex)
 {
    var addanothervocText="Add another voucher";
    var totalvouchervalueText="Total Voucher Value";
    var vouchercodeText="Voucher Code";
    var vouchervalueText="Voucher Value";
      //Text to be displayed after "collectPayment" checkbox
     var voucheracceptText="Voucher Accepted";
   var vouchConfiguration='';
   vouchConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
      "<input type='hidden' value='"+selVal+"'  name='payment_"+transVal+"_paymenttypecode' />"+
      "<div id='chkboxcontainer_"+transVal+"'  class='container_val'>"+
      "<div class='voucher_code'><span class='voucherText'>"+vouchercodeText+"</span><input type='hidden' name='payment_"+transVal+"_vocIndex' id='payment_"+transVal+"_vocIndex' value='0' />"+
      "<input class='medium voucherInput' type='text' alt='Enter a valid voucher series code.|Y|ALPHANUMERIC' id='payment_"+transVal+"_voucherCodes["+vocIndex[transVal]+"]' name='payment_"+transVal+"_voucherSeriesCodes["+vocIndex[transVal]+"]' maxLength='8' onblur='voucherCodeValid(this)'  alt='"+voucheralert+"'></div>"+
      "<div class='voucher_value'><span class='voucherText'>"+vouchervalueText+"</span>"+
      "<input class='medium voucherInputAmount' type='text' id='voucherAmount"+transVal+"_"+vocIndex[transVal]+"' value='"+currencySymbol+"' onfocus='checkPoundSymbol(this)' onblur='totalVoucherChange(this,"+transVal+")' maxLength='8' alt='Enter a valid voucher amount.|Y|AMOUNT_GBP'>"+
      "<input type='hidden' id='voucherCarry"+transVal+"_"+vocIndex[transVal]+"'  name='payment_"+transVal+"_amountsPaidByVouchers["+vocIndex[transVal]+"]' />"+
      "</div>"+

      "</div><div class='container_val' id='addanother"+transVal+"'></div>"+
      "<br clear='all'/><div class='addanother_voc'><a href='javascript:onchange=addAnotherValue("+transVal+");'>"+addanothervocText+"</a></div>"+
      "<br clear='all'/><div class='total_voucher'>"+totalvouchervalueText+"</div>"+
      "<div id='totalvaluechg"+transVal+"' class='font_normal total_voucher total_voucherVal'></div>"+
      "</div><br clear='all'/><div class='container_val'><div id='chkboxcontainer"+transVal+"' class='checkbx_cont'>"+
      "<div  class='chk_box'><input type='checkbox' id='chkbox"+transVal+"' onclick='collectPayment("+transVal+")'>"+
      "<span class='chk_box_val'>"+voucheracceptText+"</span></div>"+
      "</div><br clear='all'/>";
    return vouchConfiguration;
 }

/*
 * Adds another voucher details i.e voucher code and voucher value
 *
 *@params    voucherVal - index of transaction in which  voucher details should be added
 */
function addAnotherValue(voucherVal)
{
   var voucherConfigAdd = "";
   var vocValue = vocIndex[voucherVal]++;

   voucherConfigAdd += "<br clear='all'/><div class='voucher_code'><span class='voucherText'>"+vouchercode+"</span>"+
      "<input class='medium  voucherInput' type='text' maxLength='8' alt='Enter a valid voucher series code.|Y|ALPHANUMERIC' id='payment_"+voucherVal+"_voucherCodes["+(vocIndex[voucherVal]-1)+"]'  name='payment_"+voucherVal+"_voucherSeriesCodes["+(vocIndex[voucherVal]-1)+"]'' onblur='voucherCodeValid(this)' ></div>"+
      "<div class='voucher_value'><span class='voucherText'>"+vouchervalue+"</span><input class='medium  voucherInputAmount' type='text' id='voucherAmount"+voucherVal+"_"+(vocIndex[voucherVal]-1)+"'   value='"+currencySymbol+"'  onfocus='checkPoundSymbol(this)' onblur='totalVoucherChange(this,"+voucherVal+")' maxLength='8' alt='Enter a valid voucher amount.|Y|AMOUNT_GBP'>"+
     "<input class='medium' type='hidden' id='voucherCarry"+voucherVal+"_"+(vocIndex[voucherVal]-1)+"' name='payment_"+voucherVal+"_amountsPaidByVouchers["+(vocIndex[voucherVal]-1)+"]'  maxLength='8' alt='Enter a valid voucher amount.|Y|AMOUNT_GBP'>"+
      "</div>";
   //document.getElementById("addanother"+voucherVal).innerHTML=voucherConfigAdd;
   document.getElementById("payment_"+voucherVal+"_vocIndex").value=(vocIndex[voucherVal]-1);

   if (isAdd==false)
   {
        var newNode =   document.createElement("span");
        newNode.innerHTML = voucherConfigAdd;
        document.getElementById("addanother"+voucherVal).appendChild(newNode);
      //document.getElementById("addanother"+voucherVal).innerHTML+=voucherConfigAdd;

      //vocIndex[voucherVal] = vocIndex[voucherVal]+1;
   }else
   {
      var newNode =   document.createElement("span");
        newNode.innerHTML = voucherConfigAdd;
        document.getElementById("addanother"+voucherVal).appendChild(newNode);
       // vocIndex[voucherVal] = vocIndex[voucherVal]+1;
   }

     //document.getElementById("addanother"+voucherVal).innerHTML=voucherConfigAdd;

  //  dynamicFrame.location.replace("/thomson/page/shop/byo/booking/updatepaymenttype.page?voucherIndex="+vocValue+"&paymentIndex="+voucherVal);
   isAdd=false;
}

/*
 *Contains card display for CP
 *
 *@params selVal - Code of this payment method e.g- CA etc
 *        selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *        transVal- Index of this transaction
*/
 function cardConfigDisplay(selVal,selValEnumValue,transVal)
 {

     //Text to be displayed after "collectPayment" checkbox
    var cardacceptText="Card Payment Accepted";
    var cardConfiguration='';
   cardConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
   "<input type='hidden' value='"+selVal+"'   name='payment_"+transVal+"_paymenttypecode' />"+
   "<div id='chkboxcontainer_"+transVal+"' class='checkbx_cont'>"+
   "<div class='chk_box'><input type='checkbox' id='chkbox"+transVal+"' onclick='collectPayment("+transVal+")'>"+
   "<span class='chk_box_val'>"+cardacceptText+"</span></div><br/>"+
   "<input name='payment_"+transVal+"_cardCharge' type='hidden' id='cardChargeAmount_"+transVal+"' name='cardChargeAmount_"+transVal+"'>"+
   "<input name='payment_"+transVal+"_cardLevyPercentage' type='hidden' id='cardLevyCharge_"+transVal+"' value='0.0'><br clear='all'/>";

   return cardConfiguration;
 }

 function pinPadCardConfigDisplay(selVal,selValEnumValue,transVal)
 {
    var pinpadPopup = '<div id="pinPadCard"><div class="rowDiv headerTitle" id="header.title'+transVal+'">&nbsp;</div>'+
       '<div class="rowDiv statusMsg" id="header.message'+transVal+'"></div><div class="rowDiv">&nbsp;</div>'+
       '<div class="rowDiv" id="pinPadReference'+transVal+'">&nbsp;</div><div class="rowDiv">&nbsp;</div>'+
       '<div class="rowDiv"><input type="hidden" value='+selValEnumValue+' name="payment_'+transVal+'_paymentmethod" />'+
       '<input type="hidden" value='+selVal+' name="payment_'+transVal+'_paymenttypecode"/>'+
       '<input type="hidden" name="payment_'+transVal+'_referenceNumber" id="payment_'+transVal+'_referenceNumber">'+
       '<input type="hidden" name="cardType'+transVal+'" id="cardType'+transVal+'"/></div></div>';
	return pinpadPopup;
 }

   /*
 *Contains
 *
 *
 *@params selVal - Code of this payment method e.g- CA etc
 *         selValEnumValue- Contains enum value like PDQ,Card etc , sent from server
 *         transVal- Index of this transaction
 *        securityCodeLength-
 *
*/
   /* For CNP */
function cnpcardConfigDisplay(selVal,selValEnumValue,transVal,securityCodeLength,requiredFields_startYear,requiredFields_expiryYear)
{
    dispCardText='';
    if(selVal.indexOf('AMERICAN_EXPRESS') ==0)
    {
       dispCardText = "the "+securityCodeLength+" digit code above <br/> the card number on the front of your card";
    }
    else
    {
       dispCardText = "last "+securityCodeLength+" digits in the <br/>signature strip on the<br/> reverse of your card";
    }

     //Text to be displayed after "collectPayment" checkbox
    var cardacceptText="Card Payment Accepted";
    var cardacceptText_AO="Card Accepted";
    var cnpcardConfiguration='';
    cnpcardConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
       "<input type='hidden' value='"+selVal+"'   name='payment_"+transVal+"_paymenttypecode' />"+
       "<input type='hidden' value='selVal'  name=''payment_"+transVal+"_paymentmethod' /><div id='card_payment'>"+
              "<div class='cnpCardLeftSection' >"+
           "<dl class='hangleft'>"+
              "<dt>Card Number</dt>"+
              "<dd>"+
                 "<input type='text' class='large uniform' alt='Your card number is required to complete your booking. Please enter your card number. |Y|CARDNO|PaymentCardType' maxlength='20' id='payment_"+transVal+"_cardNumberId' name='payment_"+transVal+"_cardNumber' value='' onblur='validatePaymentFields(this)' autocomplete='off'/>"+
                   "<span class='mandatoryitem star'>*</span>"+
                "</dd>"+
                "<input type='hidden' alt='payment_"+transVal+"_cardNumberId|Y|LUHN|payment_"+transVal+"_cardNumberId'/>" +
            "<dt>Name on Card</dt> "+
            "<dd >"+
                "<input type='text' class='medium uniform' alt='The name on your card is required to complete your booking. Please enter the name on your card. |Y|NAME' maxlength='25' id='payment_"+transVal+"_nameOnCardId' name='payment_"+transVal+"_nameOnCard' value='' onblur='validatePaymentFields(this)' autocomplete='off'/>"+
                "<span class='mandatoryitem star'>*</span>"+
            "</dd>"+
            "<dt><span id='postcodeText"+transVal+"'  class='smalltext1'>Postcode of billing <br/>address for this card</span></dt>"+
            "<dd >"+
                "<input type='text' class='medium uniform' alt='We cannot validate the payment card post code you have entered. Please check and re-enter.|Y|POSTCODE' maxlength='8' id='payment_"+transVal+"_postCodeId' name='payment_"+transVal+"_postCode' value='' onblur='validatePaymentFields(this)' autocomplete='off'/>"+
              "<span id='postcodemandatory"+transVal+"'class='mandatoryitem star'>*</span>"+
            "</dd>"+
            "<dt><span id='authcodeText0'  class='smalltext1' style='display:none'>AuthCode</span></dt>"+
           "<dd>"+
           "<input type='text' class='medium' maxlength='25' id='payment_0_authCodeId' name='payment_0_referenceNumber' value='' style='display:none' autocomplete='off'/>"+
           "</dd>"+
           "<dt></dt><dd></dd>"+
           "</dl>"+
           "</div>"+
           "<div class='cnpCardRightSection' >"+
           "<dl id='hangrightList"+transVal+"' class='hangright'>"+
               "<dt>Expiry Date</dt>"+
               "<dd class='smallMargin'> <select class='date_field uniform' alt='Please select expiry date for your card|Y|CARDDATE|EXPIRY|payment_"+transVal+"_expiryYear|????' id='payment_"+transVal+"_expiryMonthId'  name='payment_"+transVal+"_expiryMonth'>"+
                     "<option value=''>MM</option>"+
                    "<option value='01'>01</option>"+
                    "<option value='02'>02</option>"+
                    "<option value='03'>03</option>"+
                    "<option value='04'>04</option>"+
                    "<option value='05'>05</option>"+
                    "<option value='06'>06</option>"+
                    "<option value='07'>07</option>"+
                    "<option value='08'>08</option>"+
                    "<option value='09'>09</option>"+
                    "<option value='10'>10</option>"+
                    "<option value='11'>11</option>"+
                    "<option value='12'>12</option>"+
                    "</select>"+
                    "<select class='date_field uniform' id='payment_"+transVal+"_expiryYear' name='payment_"+transVal+"_expiryYear'>"+
                     requiredFields_expiryYear+
                    "</select><span class='mandatoryitem star lessMargin'>*</span>"+
                    "</dd>"+
                      "<dt class='extraheight'>Security code<br/>"+
                "<span id='securityCodeHelp"+transVal+"' class='smalltext'>("+dispCardText+")</span>"+
            "</dt>"+
            "<dd class='extraheight'>"+
                "<input type='text' class='small' alt='The "+ securityCodeLength +" digit security number is required to complete your booking. This can be found to the right on the reverse of your card. Please enter your "+ securityCodeLength  +"digit security number.|Y|SECURITY|PaymentCardType' maxlength='4' id='payment_"+transVal+"_securityCodeId'  name='payment_"+transVal+"_securityCode' value='' onblur='validatePaymentFields(this)' autocomplete='off'/><span class='star'>*</span>"+
            "</dd>"+
           "</dl>"+
           "</div>"+
           "<br clear='all'/><div style='display:none;'  id='debitcards"+transVal+"'>"+
            "<p>For Maestro / Solo Card users only - Please enter the issue number of your card.</p>"+

            "<dl class='hangleft debitCardLeftpart'>";
              if (document.getElementById(selVal+"_issueNo") && document.getElementById(selVal+"_issueNo").value == "true")
         {
                cnpcardConfiguration+="<dt><label>Issue Number</label></dt>"+
                "<dd class='issueStyle'>"+
                "<input type='text' class='small issueNoInput uniform' alt='Issue Number|N|NUMERIC' maxlength='2' id='IssueNumberInput' name='payment_"+transVal+"_issueNumber' value='' autocomplete='off'/>"+
            " </dd>";
               }
           cnpcardConfiguration+="</dl>"+
           "<dl class='validFromhangright debitCardRightpart'>";
             if (document.getElementById(selVal+"_startDateRequired") && document.getElementById(selVal+"_startDateRequired").value == "true")
            {
            cnpcardConfiguration+="<dt>Valid From</dt>"+
            "<dd class='startDate'><select class='date_field' alt='Valid from date|N|START|StartYear|????' id='StartMonth' name='payment_"+transVal+"_startMonth'>"+
                    "<option value=''>MM</option>"+
                    "<option value='01'>01</option>"+
                    "<option value='02'>02</option>"+
                    "<option value='03'>03</option>"+
                    "<option value='04'>04</option>"+
                    "<option value='05'>05</option>"+
                    "<option value='06'>06</option>"+
                    "<option value='07'>07</option>"+
                    "<option value='08'>08</option>"+
                    "<option value='09'>09</option>"+
                    "<option value='10'>10</option>"+
                    "<option value='11'>11</option>"+
                    "<option value='12'>12</option>"+
                "</select>"+
                 "<select class='date_field debitLeftmargin' id='StartYear' name='payment_"+transVal+"_startYear'>"+
                     requiredFields_startYear+
                  "</select></dd>";
             }
           cnpcardConfiguration+="</dl> "+
     "</div> "+
   "</div>"+ //End of card_payment div

        "<div style='display:block;' id='chkboxcontainer"+transVal+"'  name='chkboxcontainer'  class='checkbx_cont'>"+
       " <input name='payment_"+transVal+"_cardCharge' type='hidden' id='cardChargeAmount_"+transVal+"' name='cardChargeAmount_"+transVal+"'><input name='payment_"+transVal+"_cardLevyPercentage' type='hidden' id='cardLevyCharge_"+transVal+"' value='0.0'><br clear='all'/>"+
           "</div></div>";
/**********End of for Card CNP and CPNA*********/

      return cnpcardConfiguration;
   }


function giftCardConfigDisplay(selVal,selValEnumValue,transVal,securityCodeLength)
{
    dispCardText='';
    dispCardText = "last "+securityCodeLength+" digits in the <br/>signature strip on the<br/> reverse of your card";

    var cnpGiftCardConfiguration='';
    cnpGiftCardConfiguration+="<input type='hidden' value='"+selValEnumValue+"' name='payment_"+transVal+"_paymentmethod' />"+
       "<input type='hidden' value='"+selVal+"'   name='payment_"+transVal+"_paymenttypecode' />"+
       "<input type='hidden' value='selVal'  name=''payment_"+transVal+"_paymentmethod' /><div id='card_payment'>"+
              "<div class='cnpCardLeftSection' >"+
           "<dl class='hangleft'>"+
              "<dt>Card Number</dt>"+
              "<dd>"+
                 "<input type='text' class='large uniform' alt='Your card number is required to complete your booking. Please enter your card number. |Y|CARDNO|PaymentCardType' maxlength='20' id='payment_"+transVal+"_cardNumberId' name='payment_"+transVal+"_cardNumber' value='' onblur='validatePaymentFields(this)'/>"+
                   "<span class='mandatoryitem star'>*</span>"+
                "</dd>"+
                "<input type='hidden' alt='payment_"+transVal+"_cardNumberId|Y|LUHN|payment_"+transVal+"_cardNumberId'/>" +
           "</dl>"+
           "</div>"+
           "<div class='cnpCardRightSection' >"+
           "<dl id='hangrightList"+transVal+"' class='hangright'>"+
              "<dt class='extraheight'>Security code<br/>"+
                "<span id='securityCodeHelp"+transVal+"' class='smalltext'>("+dispCardText+")</span>"+
            "</dt>"+
            "<dd class='extraheight'>"+
                "<input type='text' class='small' alt='The "+ securityCodeLength +" digit security number is required to complete your booking. This can be found to the right on the reverse of your card. Please enter your "+ securityCodeLength  +"digit security number.|Y|SECURITY|PaymentCardType' maxlength='4' id='payment_"+transVal+"_securityCodeId'  name='payment_"+transVal+"_securityCode' value='' onblur='validatePaymentFields(this)'/><span class='star'>*</span>"+
            "</dd>"+
           "</dl>"+
           "</div>"+
     "</div> "+
   "</div>"+ //End of card_payment div

   "<div style='display:block;' id='chkboxcontainer"+transVal+"'  name='chkboxcontainer'  class='checkbx_cont'>"+
   " <input name='payment_"+transVal+"_cardCharge' type='hidden' id='cardChargeAmount_"+transVal+"' name='cardChargeAmount_"+transVal+"'><input name='payment_"+transVal+"_cardLevyPercentage' type='hidden' id='cardLevyCharge_"+transVal+"' value='0.0'><br clear='all'/>"+
   "</div></div>";
/**********End of for Card CNP and CPNA*********/

      return cnpGiftCardConfiguration;


}

  /*
 *Contains
 *
 *
 *@params    transVal -
 *
 *
*/
function accumlatedAmtContent(transVal)
{
   amountpaidText="Amount Paid";
   amountstilldueText="Amount still due";
   totalamountdueText="Total Amount due";
      var accumlatedAmtDisp = "<div id='totamthide"+transVal+"' class='summary_cont'>"+
           "<div class='summary_val'>"+amountpaidText+"</div>"+
           "<div class='summary_val_txt'>"+
           "<input  type='hidden' id='totamtpaid_carry'  name='payment_totamtpaid' value=''/>"+
           "<input class='medium' type='text' id='totamtpaid'  value='"+currencySymbol+"'/>"+
           "</div>"+
           "</div><div  class='summary_cont'><div class='summary_val'>"+amountstilldueText+"</div>"+
           "<div class='summary_val_txt'><input class='medium' type='text' id='amtstilltxt' name='payment_amtstilltxt' value='"+currencySymbol+"'/></div>"+
           "</div><div class='summary_cont'><div class='summary_val'>"+totalamountdueText+"</div>"+
           "<div class='summary_val_txt'><input class='medium' type='text' id='totamtduetxt' name='payment_totamtduetxt' value='"+currencySymbol+"'/></div>"+
           "</div></div><br clear=all/>";
      return  accumlatedAmtDisp;
}

/** This function contains display content for card charge. This section is applicable
* for card payments of CP, CNP and CPNA
*@param  index-represents index of this transaction
*        cardChargeAmt- card charge amount to be displayed in this section
*
*/
function cardChargeSectionConfig(index,cardChargeAmt)
{
    var cardCharges ="<div class='trans_amt' id='cardChargesText'>Card Charges"+
    "<input type='hidden' class='cc_total_amount' name='payment_"+index+"_chargeAmount' id='payment_"+index+"_chargeIdAmount'/></div>"+
    "<div class='tottransamt' id='cardChargePercentage"+index+"'>"+currencySymbol+parseFloat(cardChargeAmt).toFixed(2)+"</div>";

    return cardCharges;
}

/* This function contains display content for auth code. This section is applicable
* for card payments of CP only.
*@param index- represents index of this transaction
*/
function authCodeDisplayConfig(index)
{
    var authCodeText = "Auth code";
    var cardReference = "";
    cardReference = "<div class='trans_amt'>" + authCodeText + "</div>"+
    "<input class='medium' type='text' maxLength='25' id='cardref"+ index +"' name='payment_"+index+"_referenceNumber' alt='Enter a valid cardreference Number.|Y|ALPHANUMERICONLY' value=''/>";
    return cardReference;
 }

/** Functions related to pinpad content display starts here **/

/**
 ** Function to display the initial rendering of pinpad section with the transaction number in the dynamic text area.
 ** @param transactionNumber - The transaction number returned from DLL and which needs to be displayed in the
 **							   dynamic text area and the same needs to be entered into the pinpad device.
 **/
function pinpadInitialDisplay(transactionNumber)
{
	var pinpadNumberDisplay = "<div class='colDiv marginTopTwo'>PIN pad number:</div> "+
		"<div class='colDiv headerTitle marginLefttwentyfive'>"+transactionNumber+"</div>";
	return pinpadNumberDisplay;
}

/**
 ** Function to render the cancel div. The cancel div content will vary based on the screen that got displayed at that time.
 ** @param disableAttributeSetter - Attribute which helps in deciding whether the cancel button in claim area should be disabled or not.
 ** @param status - The status attribute that helps the function in deciding what content should be rendered in the cancel div area.
 **/
function renderCancelDiv(disableAttributeSetter, status)
{
	var cancelDivHtml = "";
	if (status == "claim")
	{
		if (disableAttributeSetter != null && disableAttributeSetter)
			cancelDivHtml = '<input type="button" name="stop" value="Cancel" disabled="disabled" onclick="javascript:doStopButton();"/>';
		else
			cancelDivHtml = '<input type="button" name="stop" value="Cancel" onclick="javascript:doStopButton();"/>';
	}
	else if (status == "referToIssuer")
	{
		cancelDivHtml = '<div class="rowDiv"><div class="colDiv floatLeft">'+
			'<input type="button" name="cardIssuerAccepted" value="Continue" onclick="javascript:checkReferToIssuer();"/></div>'+
			'<div class="colDiv floatRight" style="margin-right:150px;"><input type="button" name="cancel" value="Cancel" onclick="javascript:doStopButton();"/></div></div>';
	}
	return cancelDivHtml;
}

/**
 ** This function helps to render the reversal confirmation section of pinpad in the dynamic text area.
 ** @param trans_Index - The transaction index in which the user is working on.
 **/
function pinpadPaymentReverseConfirmation(trans_Index)
{
	var paymentReversalConfirmHtml = '<dl id="pinpadDisp" class="pinpadDisp"><dt id="acc_CardChargeText">Card charge '+ currencySymbol +'&nbsp;</dt>'+
		'<dd><input type="text" name="cardCharge'+trans_Index+'" id="cardCharge'+trans_Index+'" disabled="true"/>'+
		'<input type="hidden" class="cc_total_amount" name="payment_'+trans_Index+'_chargeAmount" id="payment_'+trans_Index+'_chargeIdAmount"/></dd>'+
		'<dt id="acc_totalAmountText">Total amount '+ currencySymbol +'</dt>'+
		'<dd><input type="text" name="totalAmount'+trans_Index+'" id="totalAmount'+trans_Index+'" disabled="true"/></dd>'+
		'<dt id="acc_transNoText">Transaction no.</dt>'+
		'<dd><input type="text" name="transactionNo'+trans_Index+'" id="transactionNo'+trans_Index+'" disabled="true"/></dd>'+
		'</dl>';
	return paymentReversalConfirmHtml;
}

/**
 ** This function helps to render the reversal section of pinpad in the dynamic text area.
 ** @param trans_Index - The transaction index in which the user is working on.
 **/
function pinpadPaymentReversal(trans_Index)
{
	var paymentReversal = '<dl id="pinpadDisp" class="pinpadDisp"><dt id="acc_CardChargeText">Card charge '+ currencySymbol +'&nbsp;</dt>'+
		'<dd><input type="text" name="cardCharge'+trans_Index+'" id="cardCharge'+trans_Index+'" disabled="true"/>'+
		'<input type="hidden" class="cc_total_amount" name="payment_'+trans_Index+'_chargeAmount" id="payment_'+trans_Index+'_chargeIdAmount"/></dd>'+
		'<dt id="acc_totalAmountText">Total amount '+ currencySymbol +'</dt>'+
		'<dd><input type="text" name="totalAmount'+trans_Index+'" id="totalAmount'+trans_Index+'" disabled="true"/></dd>'+
		'<dt id="acc_totalAmountText">Transaction no.</dt>'+
		'<dd><input type="text" name="transactionNo'+trans_Index+'" id="transactionNo'+trans_Index+'" disabled="true"/>'+
		'<input type="hidden" value="" name="payment_cardType'+trans_Index+'" id="cardType'+trans_Index+'"/></dd></dl>';
	return paymentReversal;
}

/**
 ** This function helps to render the payment success section of pinpad in the dynamic text area.
 ** @param trans_Index - The transaction index in which the user is working on.
 **/
function pinpadPaymentSuccess(trans_Index)
{
	var paymentSuccess = '<dl id="pinpadDisp" class="pinpadDisp"><dt id="acc_CardChargeText">Card charge'+ currencySymbol +' &nbsp;</dt>'+
		'<dd><input type="text" name="cardCharge'+trans_Index+'" id="cardCharge'+trans_Index+'" disabled="true"/>'+
		'<input type="hidden" class="cc_total_amount" name="payment_'+trans_Index+'_chargeAmount" id="payment_'+trans_Index+'_chargeIdAmount"/>'+
		'<input type="hidden" name="payment_cardType'+trans_Index+'" id="cardType'+trans_Index+'"/>'+
		'<input type="hidden" class="c_total_amount" name="total_amount_'+trans_Index+'" id="total_amount_'+trans_Index+'"/>'+
		'<input type="hidden" id="transamt_carry'+trans_Index+'" name="payment_'+trans_Index+'_transamt"/></dd>'+
		'<dt id="acc_totalAmountText">Total amount '+ currencySymbol +'</dt>'+
		'<dd><input type="text" name="acc_totalAmount'+trans_Index+'" id="acc_totalAmount'+trans_Index+'" disabled="true"/></dd>'+
		'<dt id="acc_totalAmountText">Transaction no.</dt>'+
		'<dd><input type="text" name="transactionNo'+trans_Index+'" id="transactionNo'+trans_Index+'" disabled="true"/>'+
		'</dd></dl>';
	return paymentSuccess;
}

/**
 ** This function helps to render the hidden field section of pinpad for the xml content returned by DLL in the dynamic text area.
 ** The customer and shop XMLs returned from DLL are put into respective hidden fields for later usage by client application.
 ** @param trans_Index - The transaction index in which the user is working on.
 **/
function printContents(trans_Index)
{
	var printContentsHtml = '<input type="hidden" name="payment_merchantCopy'+trans_Index+'" id="merchantCopy'+trans_Index+'"/>'+
		'<input type="hidden" name="payment_customerCopy'+trans_Index+'" id="customerCopy'+trans_Index+'"/>';
	return printContentsHtml;
}

/**
 ** Function to display the initial rendering of refund pinpad section in the dynamic text area.
 ** @param trans_Index - The transaction index in which the user is working on.
 **/
function refundDisplay(trans_Index)
{
	var refundContent = '<dl id="pinpadDisp" class="pinpadDisp"><dt id="refundText">Transaction no.</dt>'+
		'<dd><input type="text" name="transactionNo'+trans_Index+'" id="transactionNo'+trans_Index+'" disabled="true"/></dd></dl>';
	return refundContent;
}
/**/
function pinpadReferToIssuer(trans_Index)
{
	var cardIssuerAcceptance = '<dl id="pinpadDisp" class="pinpadDisp"><dt id="acc_CardChargeText">Card charge'+ currencySymbol +' &nbsp;</dt>'+
		'<dd><input type="text" name="cardCharge'+trans_Index+'" id="cardCharge'+trans_Index+'" disabled="true"/>'+
		'<input type="hidden" class="cc_total_amount" name="payment_'+trans_Index+'_chargeAmount" id="payment_'+trans_Index+'_chargeIdAmount"/>'+
		'<input type="hidden" name="payment_cardType'+trans_Index+'" id="cardType'+trans_Index+'"/>'+
		'<input type="hidden" class="c_total_amount" name="total_amount_'+trans_Index+'" id="total_amount_'+trans_Index+'"/>'+
		'<input type="hidden" id="transamt_carry'+trans_Index+'" name="payment_'+trans_Index+'_transamt"/></dd>'+
		'<dt id="acc_totalAmountText">Total amount '+ currencySymbol +'</dt>'+
		'<dd><input type="text" name="acc_totalAmount'+trans_Index+'" id="acc_totalAmount'+trans_Index+'" disabled="true"/></dd>'+
		'<dt id="acc_totalAmountText">Card issuer auth no.</dt>'+
		'<dd><input type="text" name="cardIssuerAuthNo'+trans_Index+'" id="cardIssuerAuthNo'+trans_Index+'" value=""/>'+
		'</dd></dl><div class="rowDiv" id="referToIssuerCancelDiv'+trans_Index+'"></div>';
	return cardIssuerAcceptance;
}

/** Functions related to pinpad content display ends here **/
