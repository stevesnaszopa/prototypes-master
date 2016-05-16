
var intCheck = /^[0-9]+$/;
var charCheck = /^[A-Za-z]+$/;
var spaceCheck = /^[ ] +$/;
var cardTypeText="";
var cardName = /^[a-zA-Z ]*$/;
/**
 ** Validates Expiry month
**/

function getMonth(id) {
	var month = new Date();
	var currentMonth = month.getMonth() <= 9 ? "0" + month.getMonth().toString() : month.getMonth().toString();
	var currentYear = month.getFullYear().toString();
	var expiryMonth = document.getElementById("FieldExpiryDateMonth");
	var expiryYear = document.getElementById("FieldExpiryDateYear");
	var checkMonth = expiryMonth.value;
	var checkYear = "20" + expiryYear.value;
	var inputField = document.getElementById("FieldExpiryDateYear");
	var inputValue = document.getElementById("FieldExpiryDateYear").value;
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "ml5px fleft";
	var addAlert = document.createElement("div");
	addAlert.className += " error-notify clear";

	if (inputField.parentNode.parentNode.children.length >= 2) {
		var next = inputField.parentNode.nextSibling;

		if(next){

			while (next.nodeType !== 1 || next.nodeType == 1) {
			if (createSpan.id == "validation-pass") {
				next.parentNode.removeChild(next.nextSibling);

				document.getElementsByClassName(" error-notify clear").style.display = "none";
			} else {

				var test = next.nextSibling;
				if (test) {

					test.parentNode.removeChild(test);
					var test2= inputField.parentNode.nextSibling.nextSibling;
					if(test2){

					test2.parentNode.removeChild(test2);
					}
				}

				 else {
				}

				next.parentNode.removeChild(next);

			}
			break;
		}

		}


		if(id === 'true'){
			return;
		}
		if (checkMonth <= currentMonth && checkYear == "20") {
			createSpan.id = "validation-fail";
			inputField.parentNode.parentNode.appendChild(createSpan);
			return false;
		} else if (checkMonth <= currentMonth && checkYear <= currentYear) {
			createSpan.id = "validation-fail";
				inputField.parentNode.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Has this card already expired ? The expiry date must be in the future');
				inputField.parentNode.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				return false;
		} else if (checkMonth >= currentMonth && checkYear == currentYear) {
			if (checkMonth == "" && checkYear >= currentYear) {
			createSpan.id = "validation-fail";
			inputField.parentNode.parentNode.appendChild(createSpan);
			return false;
			}else{
			createSpan.id = "validation-pass";
			inputField.parentNode.parentNode.appendChild(createSpan);
			}
		} else if (checkMonth >= currentMonth && checkYear <= currentYear) {
			createSpan.id = "validation-fail";
			inputField.parentNode.parentNode.appendChild(createSpan);
			return false;
		} else if (checkMonth >= currentMonth && checkYear >= currentYear) {
			if (checkMonth == "" && checkYear >= currentYear) {
			createSpan.id = "validation-fail";
			inputField.parentNode.parentNode.appendChild(createSpan);
			return false;
			}else{
			createSpan.id = "validation-pass";
			inputField.parentNode.parentNode.appendChild(createSpan);
			}
		} else if (checkMonth <= currentMonth && checkYear >= currentYear) {
			if (checkMonth == "" && checkYear > currentYear) {
			createSpan.id = "validation-fail";
			inputField.parentNode.parentNode.appendChild(createSpan);
			return false;
			}else{
			createSpan.id = "validation-pass";
			inputField.parentNode.parentNode.appendChild(createSpan);
			}
		}
	} else {
	}
	return true;
}

/**
 ** Common method to display tool tip
**/
function tooltip(id) {
	var toolTipid = id;
	if (toolTipid == "cvv") {
		var displayTooltip = document.getElementById("cvvDetails");
		displayTooltip.style.display = "block";
		displayTooltip.style.position = "relative";
		displayTooltip.style.left = "3px";
	} else if (toolTipid == "cardholderName") {
		var displayTooltip = document.getElementById("nameonCard");
		displayTooltip.style.display = "block";
		displayTooltip.style.position = "relative";
		displayTooltip.style.left = "3px";
	} else if (toolTipid == "master-card-stickey") {
		var displayTooltip = document.getElementById("master-card-stickey");
		displayTooltip.style.display = "block";
		displayTooltip.style.position = "relative";
		displayTooltip.style.left = "3px";
	} else if (toolTipid == "visa-card-stickey") {
		var displayTooltip = document.getElementById("visa-card-stickey");
		displayTooltip.style.display = "block";
		displayTooltip.style.position = "relative";
		displayTooltip.style.left = "3px";
	} else if (toolTipid == "american-express-stickey") {
		var displayTooltip = document
				.getElementById("american-express-stickey");
		displayTooltip.style.display = "block";
		displayTooltip.style.position = "relative";
		displayTooltip.style.left = "3px";
	}
}

/**
 ** To handle the AJAX response to for the AJAX request to get the card type based on the card number.
 *	It handles 	1. Issue Number Display
 *				2. Gift Card Handling
 *				3. To display Card type drop-down based on the response
 *				4. To adjust the payment method based on the AJAX response
**/
function showCardType(request) {
var cardNumber = document.getElementById("cardNumber").value;
	window.thCardTypeText = "";
	var dynamicCardtype = 'NA';
		var paymentMethodId;
	if ((request.readyState == 4) && (request.status == 200)) {
		window._idleSecondsCounter = 0;
		var respContains = request.responseText;
		var cardTypeDivs = $$('input[name=cardtype]');
		for ( var i = 0; i < cardTypeDivs.length; i++) {
			if (cardTypeDivs[i].checked) {
				paymentMethodId = cardTypeDivs[i].id;
			}
		}
		if(respContains == "Maestro" && (!cardNumber.startsWith(TUIGiftCardNumber))){

			respContains="Switch";
			paymentMethodId="debit";
		}
		else if(respContains == "Maestro" && (cardNumber.startsWith(TUIGiftCardNumber)))
		{
		respContains="Maestro";
		paymentMethodId="gift";
		}
		if (respContains != "NA" && respContains != "") {
			document.getElementById("card-img").className = respContains
					.toLowerCase();
			if (respContains.toLowerCase().indexOf("card") !== -1) {
				document.getElementById("card-desc").innerHTML = "(You've entered a "
						+ respContains + ")";
			} else {
				document.getElementById("card-desc").innerHTML = "(You've entered a "
						+ respContains + " card)";
			}


			dynamicCardtype = respContains.toUpperCase().replace(" ", "_");
			if(dynamicCardtype.indexOf('VISA') != -1){
				window.thCardTypeText = "Verified By Visa";
			} else if(dynamicCardtype.indexOf('MASTERCARD') != -1){
				window.thCardTypeText = "Mastercard SecureCode";
			} else if(dynamicCardtype.indexOf('AMERICAN_EXPRESS') != -1){
				window.thCardTypeText = "American Express SafeKey";
			}
			if (dynamicCardtype != 'SWITCH' || paymentMethodId == 'credit') {
				var cardTypeConfig = cardChargeMap.get(dynamicCardtype);
				if (cardTypeConfig != null) {
					var configEntries = cardTypeConfig.split(',');
					displayCreditCharges(configEntries[4].toLowerCase()
							+ "cardType");
				} else {
					displayCreditCharges("giftcardType");
				}
			}
			if(respContains=="Switch"){
				document.getElementById("card-desc").innerHTML = "(You've entered a Maestro card)";
				displayCreditCharges("debitcardType");
			}
			if(respContains=="Maestro"){
				document.getElementById("card-desc").innerHTML = "(You've entered a TUI Gift card)";
				displayCreditCharges("giftcardType");
			}
			var isIssueNumberEnabled = issueNumberDetailsMap
					.get(dynamicCardtype);
			if (isIssueNumberEnabled == 'true') {
				resetIssue();
				document.getElementById('issueNumber').style.display = 'block';
			} else {
				document.getElementById('issueNumber').style.display = 'none';
			}
			document.getElementById('payment_0_type').value = dynamicCardtype
					+ "|Dcard";
			document.getElementById('debitPaymentTypeCode').style.display = 'none';
			document.getElementById('creditPaymentTypeCode').style.display = 'none';
			document.getElementById('giftPaymentTypeCode').style.display = 'none';
		} else if (respContains == "NA") {
			document.getElementById("card-img").className = "";
			document.getElementById("card-desc").innerHTML = ""
			if (paymentMethodId == 'credit') {
				document.getElementById('debitPaymentTypeCode').style.display = 'none';
				document.getElementById('creditPaymentTypeCode').style.display = 'block';
				document.getElementById('giftPaymentTypeCode').style.display = 'none';
			} else if (paymentMethodId == 'debit') {
				document.getElementById('debitPaymentTypeCode').style.display = 'block';
				document.getElementById('creditPaymentTypeCode').style.display = 'none';
				document.getElementById('giftPaymentTypeCode').style.display = 'none';
			} else {
				document.getElementById('debitPaymentTypeCode').style.display = 'none';
				document.getElementById('creditPaymentTypeCode').style.display = 'none';
				document.getElementById('giftPaymentTypeCode').style.display = 'block';
			}
		}

	}


}

/**
 ** Ajax call to get the card type based on the Card number
**/
function displayCardType() {
	var inputField = document.getElementById("cardNumber");
	var url = "/cps/CardTypeFinderServlet?token="+ token + tomcatInstance;
	parameterString= "cardNumber="+inputField.value+"&token="+ token + tomcatInstance;
	var request = new Ajax.Request(url, {
		method : "POST",
		parameters : parameterString,
		datatype : "text",
		onSuccess : showCardType
	});
}

/**
 ** Method to validate issue number is a in future or not
**/
function validationDateInFuture(year, month) {
	var currentTime = new Date();
	var currentYear = year2digit();
	var currentMonth = currentTime.getMonth() + 1;
	currentYear = 1 * currentYear;

	var inFuture = (year > currentYear)
			|| ((year == currentYear) && (month > currentMonth));
	return inFuture;
}

/**
 ** Validates Card Number
**/
function allnumeric(id) {
	var captureId = id;
	if (captureId = "cardNumber") {
		var inputField = document.getElementById("cardNumber");
		var inputValue = document.getElementById("cardNumber").value;
		var inputClass = document.getElementsByClassName("ccnumber");
		var createSpan = document.createElement('span');
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "ml5px";

		var addAlert = document.createElement("div");
		addAlert.className += " error-notify clear";

		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== 1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
					document.getElementsByClassName(" error-notify clear").style.display = "none";
				} else {
					next.parentNode.removeChild(next.nextSibling);
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue.match(intCheck) && !inputValue.match(charCheck)) {
				if (inputValue.length > 14 && parseInt(inputValue) != 0) {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				} else {
					createSpan.id = "validation-fail";
					if (parseInt(inputValue) != 0) {
						var newAlert = document
								.createTextNode('Card Number must be of 15 or 16 digits.');
					} else {
						var newAlert = document
								.createTextNode('Invalid Card Number');
					}
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}
			} else {

				if (inputValue.length == 0){
				createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var newAlert = document
							.createTextNode('Card Number field cannot be empty !');
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}else{

					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var newAlert = document
							.createTextNode('Card Number cannot be characters !');
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}
			}

		} else {
			if (inputValue.match(intCheck) && !inputValue.match(charCheck)) {
				if (inputValue.length > 14 && parseInt(inputValue) != 0) {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				} else {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var addAlert = document.createElement("div");
					addAlert.className += " error-notify clear";
					if (parseInt(inputValue) != 0) {
						var newAlert = document
								.createTextNode('Card Number must be of 15 or 16 digits.');
					} else {
						var newAlert = document
								.createTextNode('Invalid Card Number');
					}
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}
			} else {
				if (inputValue.length == 0){
			createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Card Number field cannot be empty !');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				return false;
			}else{

				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Card Number cannot be characters !');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
						}
				return false;
			}
		}
	}
	return true;
}

/**
 ** Validates Security code
**/
function validateCVV(id) {
	var getId = id;

	if (captureId = "cvv") {
		var displayTooltip = document.getElementById("cvvDetails");
		displayTooltip.style.display = "none";
		var inputField1 = document.getElementById("cvv");
		var inputValue1 = document.getElementById("cvv").value;
		var inputClass1 = document
				.getElementsByClassName("payment_0_securityCode");
		var createSpan1 = document.createElement('span');
		createSpan1.innerHTML = "";
		createSpan1.id = " ";
		createSpan1.className += "";

		var addAlert1 = document.createElement("div");
		addAlert1.className += " error-notify clear";
		window.cardTypeText
		if(window.cardTypeText == "American Express"){

			if (inputField1.parentNode.children.length > 1) {
			var next = inputField1.nextSibling;
			while (next && next.nodeType !== 1) {
				if (createSpan1.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
					document.getElementsByClassName(" error-notify clear").style.display = "none";
				} else {
					next.parentNode.removeChild(next.nextSibling);
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue1.match(intCheck) && !inputValue1.match(charCheck)) {
				if (inputValue1.length > 3) {
					createSpan1.id = "validation-pass";
					inputField1.parentNode.appendChild(createSpan1);
				} else {
					createSpan1.id = "validation-fail";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid. The security code should be 4 digits long');
					inputField1.parentNode.appendChild(createSpan1);
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
				}
			} else {
				if(inputValue1.length == 0){
					createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('Please enter a security code');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}else{
				createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('The security code you have entered is invalid. The security code should be 4 digits long');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}

			}
		} else {
			if (inputValue1.match(intCheck) && !inputValue1.match(charCheck)) {
				if (inputValue1.length > 3) {
					createSpan1.id = "validation-pass";
					inputField1.parentNode.appendChild(createSpan1);
				} else {
					createSpan1.id = "validation-fail";
					inputField1.parentNode.appendChild(createSpan1);
					var addAlert1 = document.createElement("div");
					addAlert1.className += " error-notify clear";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid. The security code should be 4 digits long');
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
				}
			} else {
				if(inputValue1.length == 0){
					createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('Please enter a security code');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}else{
				createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document
						.createTextNode('The security code you have entered is invalid. The security code should be 4 digits long');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}
			}
		}

		}else{
		if (inputField1.parentNode.children.length > 1) {
			var next = inputField1.nextSibling;
			while (next && next.nodeType !== 1) {
				if (createSpan1.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
					document.getElementsByClassName(" error-notify clear").style.display = "none";
				} else {
					next.parentNode.removeChild(next.nextSibling);
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue1.match(intCheck) && !inputValue1.match(charCheck)) {

				if(window.cardTypeText == ""){
					if (inputValue1.length > 2) {
					createSpan1.id = "validation-pass";
					inputField1.parentNode.appendChild(createSpan1);
				} else {
					createSpan1.id = "validation-fail";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid.');
					inputField1.parentNode.appendChild(createSpan1);
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
				}
				}else{
				if (inputValue1.length == 3) {
					createSpan1.id = "validation-pass";
					inputField1.parentNode.appendChild(createSpan1);
				} else {
					createSpan1.id = "validation-fail";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid. The security code should be 3 digits long');
					inputField1.parentNode.appendChild(createSpan1);
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
				}
				}


			} else {



				if(inputValue1.length == 0){
					createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('Please enter a security code');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}else{
					if(window.cardTypeText == ""){
					createSpan1.id = "validation-fail";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid');
					inputField1.parentNode.appendChild(createSpan1);
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
					}else{
					createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('The security code you have entered is invalid. The security code should be 3 digits long');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
					}

				}

			}
		} else {
			if (inputValue1.match(intCheck) && !inputValue1.match(charCheck)) {
				if(window.cardTypeText == ""){
					if (inputValue1.length > 2) {
					createSpan1.id = "validation-pass";
					inputField1.parentNode.appendChild(createSpan1);
				} else {
					createSpan1.id = "validation-fail";
					var newAlert1 = document
							.createTextNode('The security code you have entered is invalid');
					inputField1.parentNode.appendChild(createSpan1);
					inputField1.parentNode.appendChild(addAlert1).appendChild(
							newAlert1);
					inputField1.value = "";
					return false;
				}
				}else{
					if (inputValue1.length == 3) {
						createSpan1.id = "validation-pass";
						inputField1.parentNode.appendChild(createSpan1);
					} else {
						createSpan1.id = "validation-fail";
						inputField1.parentNode.appendChild(createSpan1);
						var addAlert1 = document.createElement("div");
						addAlert1.className += " error-notify clear";
						var newAlert1 = document
								.createTextNode('The security code you have entered is invalid. The security code should be 3 digits long');
						inputField1.parentNode.appendChild(addAlert1).appendChild(
								newAlert1);
						inputField1.value = "";
						return false;
					}
				}

			} else {
				if(inputValue1.length == 0){
					createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document.createTextNode('Please enter a security code');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}else{
				createSpan1.id = "validation-fail";
				inputField1.parentNode.appendChild(createSpan1);
				var newAlert1 = document
						.createTextNode(' The security code you have entered is invalid');
				inputField1.parentNode.appendChild(addAlert1).appendChild(
						newAlert1);
				inputField1.value = "";
				return false;
				}
			}
		}
		}
	}
	return true;
}

/**
 ** Validates Card holder name
**/
function allCharacters(id) {
	var thisId = id;
	if (thisId = "cardholderName") {
		var displayTooltip = document.getElementById("nameonCard");
		displayTooltip.style.display = "none";
		var inputField = document.getElementById("cardholderName");
		var inputValue = document.getElementById("cardholderName").value;
		var inputClass = document.getElementsByClassName("name_on_card");
		var createSpan = document.createElement('span');
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "";

		var addAlert = document.createElement("div");
		addAlert.className += " error-notify clear";

		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== 1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
					document.getElementsByClassName(" error-notify clear").style.display = "none";
				} else {
					next.parentNode.removeChild(next.nextSibling);
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue.match(cardName)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					var newAlert = document
							.createTextNode('Name on card field cannot be empty');
					inputField.parentNode.appendChild(createSpan);
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					inputField.value = "";
					return false;

				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {

				if (inputValue.length == 0){
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Please enter the name as it appears on the card');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				inputField.value = "";
				return false;
					}else{
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Name of the card holder must be characters only');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				inputField.value = "";
				return false;
				}
			}
		} else {
			if (inputValue.match(cardName)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var addAlert = document.createElement("div");
					addAlert.className += " error-notify clear";
					var newAlert = document
							.createTextNode('Name on card field cannot be empty');
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					inputField.value = "";
					return false;
				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				if (inputValue.length == 0){
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Please enter the name as it appears on the card');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				inputField.value = "";
				return false;
					}else{
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Name of the card holder must be characters only');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
				inputField.value = "";
				return false;
				}
			}
		}
	}
	return true;
}

/**
 ** To display issue number text box for configured card types
**/
function checkIssueNumberEnabled(cardType) {
	var card = cardType.split('|');
	var isIssueNumberEnabled = issueNumberDetailsMap.get(card[0].replace(/^\s+|\s+$/g, ''));
	if (isIssueNumberEnabled == 'true') {
		resetIssue();
		document.getElementById('issueNumber').style.display = 'block';
	} else {
		document.getElementById('issueNumber').style.display = 'none';
	}
}

/*
Function to reset the issue field
*/
function resetIssue() {
var issueField = document.getElementById("issuenum");
var issueParent = issueField.parentNode;
issueField.value = "";
var childNodes = issueParent.children;
if(childNodes.length >1) {
	for(var i=childNodes.length-1; i>0; i--) {
		childNodes[i].parentNode.removeChild(childNodes[i]);
	}

}
}

/**
 ** Validates issue number
**/
function validateISSUE(id) {
	var captureId = id;
	if (captureId = "issuenum") {
		var inputField = document.getElementById("issuenum");
		var inputValue = document.getElementById("issuenum").value;
		var inputClass = document.getElementsByClassName("ccnumber");
		var createSpan = document.createElement('span');
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "ml5px";

		var addAlert = document.createElement("div");
		addAlert.className += " error-notify clear";

		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== 1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
					document.getElementsByClassName(" error-notify clear").style.display = "none";
				} else {
					next.parentNode.removeChild(next.nextSibling);
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue.match(intCheck) && !inputValue.match(charCheck)) {
				if (inputValue.length > 1 && parseInt(inputValue) != 0) {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				} else {
					createSpan.id = "validation-fail";
					if (parseInt(inputValue) != 0) {
						var newAlert = document
								.createTextNode('Issue number must be of 2 digits.');
					} else {
						var newAlert = document
								.createTextNode('Invalid Issue Number');
					}
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}
			} else {

				if (inputValue.length == 0){

				}else{

					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var newAlert = document
							.createTextNode('Issue number cannot be characters !');
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);

				}
					return false;
			}

		} else {
			if (inputValue.match(intCheck) && !inputValue.match(charCheck)) {
				if (inputValue.length > 1 && parseInt(inputValue) != 0) {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				} else {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					var addAlert = document.createElement("div");
					addAlert.className += " error-notify clear";
					if (parseInt(inputValue) != 0) {
						var newAlert = document
								.createTextNode('Issue number must be of 2 digits.');
					} else {
						var newAlert = document
								.createTextNode('Invalid Issue Number');
					}
					inputField.parentNode.appendChild(addAlert).appendChild(
							newAlert);
					return false;
				}
			} else {
				if (inputValue.length == 0){

			}else{

				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				var newAlert = document
						.createTextNode('Issue number cannot be characters !');
				inputField.parentNode.appendChild(addAlert).appendChild(
						newAlert);
						}
						return false;
			}
		}
	}
	return true;
}