
/**
 ** This method handles diplay of the 3D secure overlay based on the AJAX response.
 *	This method handles	1. Redirecting to Confirmation page
 *						2. Displaying the 3Ds secure overlay
 *						3. Displaying the error message
**/
function showThreeDOverlay(http_request) {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			document.getElementById("modal").style.visibility = "hidden";
			result = http_request.responseText;
			if (result.indexOf("ACSframe") == -1) {
				if (result.indexOf("ERROR_MESSAGE") == -1) {
					document.postPaymentForm.action = result;
					document.CheckoutPaymentDetailsForm.reset();
					document.postPaymentForm.submit();
				} else {
					var errorMsg = result.split(':');
					document.getElementById("errorMsg").style.display = "block";
					document.getElementById('errorMsg').innerHTML = "<p><strong>"
							+ errorMsg[1] + "</p></strong>";
					document.getElementById('errorMsg').className = "error-notify info-section clear padding10px mb20px";
					clearCardEntryElements();
				}
			} else {
				el = document.getElementById("overlay");
				el.style.visibility = (el.style.visibility == "visible") ? "hidden"
						: "visible";
				document.getElementById("modal").style.visibility = "visible";
				document.getElementById('overlay').innerHTML = result;
				bankRedirect();				
				var vernode = document.getElementById('thcardtypetext');
				if(vernode){
					vernode.innerHTML = window.thCardTypeText;
				}
			}
		} else {
			document.getElementById('errorMsg').innerHTML = "<h2>Payment failed. Please try again.</h2>";
		}
	}
	window.scrollTo(0, 0);
}


function removePassElemet(id)
{
	var Valpass = document.getElementById(id).nextSibling.nextSibling;

	if (Valpass) {
		Valpass.parentNode.removeChild(Valpass);
		Valpass = null;
	};
}

function clearCardEntryElements() {

	if( document.getElementById("tandc-info").checked ==true){
	
		document.getElementById("cardNumber").value = "";
		document.getElementById("cardholderName").value = "";
		document.getElementById("cvv").value = "";
	
		$('FieldExpiryDateMonth').selectedIndex = 0;
		$('FieldExpiryDateYear').selectedIndex  = 0;
		$('payment_type_debit').selectedIndex = 0;
		$('payment_type_credit').selectedIndex = 0;
	
		document.getElementById("card-img").className = "";
		document.getElementById("card-desc").innerHTML = "";
		document.getElementById('debitPaymentTypeCode').style.display = 'none';
		document.getElementById('creditPaymentTypeCode').style.display = 'none';
		document.getElementById('giftPaymentTypeCode').style.display = 'none';
		document.getElementById('issueNumber').style.display = 'none';
	
		var rootElement = document.getElementById('card-details-entry');
	
	
		removePassElemet("cardNumber");
		removePassElemet("cardholderName");
		removePassElemet("cvv");
		//removePassElemet("issueNumber");
	
		var ValpassEle = document.getElementById("FieldExpiryDateYear").parentNode.nextSibling;
	
		if (ValpassEle) {
			ValpassEle.parentNode.removeChild(ValpassEle);
		};
	}

}

/**
 ** This method submits the bank form present in the overlay and fills the overlay in the iframe.
**/
function bankRedirect() {
	document.bankform.target = "ACSframe";
	document.bankform.submit();
}

/**
 ** This method handles closing of the overlay.
**/
function closeOverlay() {
	document.getElementById("overlay").style.visibility = "hidden";	
	document.getElementById("errorMsg").style.display = "none";
	document.getElementById("modal").style.visibility = "hidden";
}


function validateRequiredField() {
	importantInfo_Validate() && contactAgreement_Validate();
	allnumeric("cardNumber");
	validateCVV("cvv");
	allCharacters("cardholderName");
	getMonth("FieldExpiryDateMonth");
	document.getElementById('errorMessageToolTip').style.display = "block";
}

function contactAgreement_Validate() {
	var tnc = document.getElementById("tandc-info");

	if (tnc.checked != true) {
/* 			alert("\nSorry, but to proceed with your booking you\nmust click checkbox to accept our \nTerms and conditions.\n"); */
		document.getElementById("tandc-info").focus();
		return false;
	}
	return true;
}

function importantInfo_Validate() {
	var tnc = document.getElementById("imp-info");

	if (tnc.checked != true) {
		/* alert("\nSorry, but to proceed with your booking you\nmust click checkbox to accept our \nImportant Information.\n"); */
		document.getElementById("imp-info").focus();
		return false;
	}
	return true;
}

window.datarules = window.datarules || {};

function popUpOverlay(that) {
	
	if(that){
		var $pop = jQuery(that);
		if($pop.hasClass('datapolicies')){
			var $DPNoverlay = jQuery('#DPNoverlay');
			//if(!isEmptyobj(window.datarules)){
				$chkboxes = $DPNoverlay.find('input[type="checkbox"]');
				$chkboxes.each(function(){
				// enable checkboxes which previously selected on click of ok
				if(!jQuery(this).is(":checked")){
					if(window.datarules.hasOwnProperty(this.name)){
						jQuery(this).attr('checked', true);
					}else{
						jQuery(this).removeAttr('checked');
					}
				}
				});
			//}
		}
	}

	document.getElementById("DPNoverlay").style.visibility = "visible";
	document.getElementById("modal").style.visibility = "visible";
	document.getElementById("dpn").style.visibility = "visible";
}

function isEmptyobj(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

function closeDPNOverlay() {
	document.getElementById("DPNoverlay").style.visibility = "hidden";
	document.getElementById("modal").style.visibility = "hidden";
	document.getElementById("dpn").style.visibility = "hidden";
}

function okButtonclick(that) {
	// get checkboxes count on click of ok button
	if(that){
		var $okbtn = jQuery(that);
		if($okbtn.hasClass("okbutton")){
			var $chkboxes = $okbtn.closest('#DPNoverlay').find('input[type="checkbox"]');
			$chkboxes.each(function(){
			  if(jQuery(this).is(":checked")){
				datarules[this.name] = this.id;				
			  }else{
				delete datarules[this.name];
			  }
			});			
		}
	}
	this.closeDPNOverlay();
	document.getElementById("commPref").style.display = "block";
}

function removeDiv() {
	document.getElementById("commPref").style.display = "none";
}

function updateFormElementFromCheckBox(checkBoxObj) {
	if (checkBoxObj.checked) {
		checkBoxObj.value = true;
	} else {
		checkBoxObj.value = false;
	}

}
