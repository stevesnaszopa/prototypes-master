/**
 ** This method handles
 *		1. Displaying of payment method
 *		2. Displaying the final Amount
 *		3. Card Type drop down toggling based on the condition
**/
function displayCreditCharges(id) {
	var getId = id;
	var getDiv = document.getElementById(id);
	var divClass = document.getElementsByClassName("paycard-details");
	var debitSection = document.getElementById("debitcardType");
	var creditSection = document.getElementById("creditcardType");
	var zopaSection = document.getElementById("zopabutton");
	var creditCharges= document.getElementById("creditCardCharges");
	var debitCharges = document.getElementById("debitCardCharges");
	var zopaCharges = document.getElementById("zopaCharges");

	//Reset to the default value
	document.getElementById('payment_type_credit').value = "PleaseSelect";
	document.getElementById('payment_type_debit').value = "PleaseSelect";

	//CREDIT CARD SELECTION
	if (getId == 'creditcardType') {
		creditSection.className += " highlighted-div";
		debitSection.className = "paycard-details";
		zopaSection.className = "paycard-details";
		showRightPayment("credit");

	}
	//DEBIT CARD SELECTION
	else if (getId == 'debitcardType') {
		debitSection.className += " highlighted-div";
		creditSection.className = "paycard-details";
		zopaSection.className = "paycard-details";
		showRightPayment("debit");
	}
	//ZOPA SELECTION
	else if (getId == 'zopabutton') {
		zopaSection.className += " highlighted-div";
		creditSection.className = "paycard-details";
		debitSection.className = "paycard-details";
		showRightPayment("zopa");
	}
}


//SHOW HIDE CARD FORM / CALCULATOR
function showRightPayment(id){
	// DO THIS NEXT
	var calculatorbox = document.getElementById("calculatorbox");
	var cardpaymentbox = document.getElementById("cardpaymentbox");

	if(id === "credit"){
		cardpaymentbox.style.display = 'block';
		calculatorbox.style.display = 'none';
	}
	else if(id === "debit"){
		cardpaymentbox.style.display = 'block';
		calculatorbox.style.display = 'none';
	}
	else if(id === "zopa"){
		cardpaymentbox.style.display = 'none';
		calculatorbox.style.display = 'block';
	}

};

/*
This method handles
	1. Displaying of important information
	2. This method toggle depends upon the user click the header
*/
	var get_mod_value=1;
	function displayImportantInfo(id){
		var getId = document.getElementById(id);
		var mod_value = get_mod_value%2;
		get_mod_value++;
		if(mod_value==1){
			getId.className = "item-content";
			important_infosection.className = "item open";
		}
		if(mod_value==0){
			getId.className = "disNone";
			important_infosection.className = "item";
		}
	}
/* displayImportantInfo function- end */

/*
This method handles
	1. Displaying of tootltip information - total price
	2. This method using while mouseover and mouse out showing total price
*/
		function totalprice_displayTooltipInfo_mouseover(id){
			var displayTooltip = document.getElementById(id);
			//displayTooltip.style= "display: block; position: relative; float: right;";
			//displayTooltip.className="tooltip_visible";
			displayTooltip.style.display = "block";
		}
		/*displayTooltipInfo_mouseover - end */

		function totalprice_displayTooltipInfo_mouseout(id){
			var displayTooltip = document.getElementById(id);
			displayTooltip.style.display = "none";
		}
		/*displayTooltipInfo_mouseout - end */

/*Method end*/

/*
This method handles
	1. Displaying of tootltip information
	2. This method using while mouseover and mouse out showing card and security code information
*/
	function displayTooltipInfo_mouseover(id){
		var displayTooltip = document.getElementById(id);
		//displayTooltip.style= "display: block; position: relative; left: 3px;";
		displayTooltip.style.display = "block";
	}
	/*displayTooltipInfo_mouseover - end */

	function displayTooltipInfo_mouseout(id){
		var displayTooltip = document.getElementById(id);
		displayTooltip.style.display = "none";
	}
	/*displayTooltipInfo_mouseout - end */

/*Method end*/

	/*
	This method handles
		1. Hidden of alert message content
	*/
		function closeAlertMsg(id){
			document.getElementById(id).style.display="none";
		}
		/*closeAlertMsg method - end*/