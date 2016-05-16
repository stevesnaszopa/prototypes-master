
var charCheck = /^[A-Za-z ]+$/;
var housenumCheck = /^[a-zA-Z0-9_\-\.]+$/;

function placeHolder(id,placeHolderId){
	document.getElementById(placeHolderId).style.display='none';
	document.getElementById(id).focus();
	
}

/**
 ** This method handles display of the additional address fields when customer opts to enter address manually.
**/
function showAddress(id){
	var getAddress =id;
	var hideAddress = document.getElementById("otherFields");
	var getLink =document.getElementById("showOtherFields");
	if(getAddress == "showOtherFields"){
		hideAddress.style.display ="block";
		getLink.style.display="none";
	}
	else{
		hideAddress.style.display ="none";
		getLink.style.display="block";
	}
}

/**
 ** This method validates the house number/Name in manual address providing scenario
**/
function housenameCheck(id){

	var inputField = document.getElementById("houseDetails1");
	var text = document.getElementById("houseDetails1").value;
	regex = /([a-zA-Z0-9_\-\047]+(_[-a-zA-Z0-9 ,\.\047]+)*)$/;
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";
	/* Error msg DIV*/
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";

	if (inputField.parentNode.children.length > 1) {
		var next = inputField.nextSibling;
		while (next && next.nodeType !== -1) {
			if (createSpan.id == "validation-pass") {
				next.parentNode.removeChild(next.nextSibling.nextSibling);
			}
			else {
				var test1 = next.nextSibling.nextSibling;
				if (test1) {
					test1.parentNode.removeChild(test1);
				}
				else {
				}
			}
			break;
		}
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;

			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the house num";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		}
	}
	else {
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;

			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the house num";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);

		}
	}
	return true;
}
/**
 ** This method validates the street line1
**/
function streetline1Check(id){

	var inputField = document.getElementById("StreetLine1");
	var text = document.getElementById("StreetLine1").value;
	regex = /([a-zA-Z0-9_\-\047]+(_[-a-zA-Z0-9 ,\.\047]+)*)$/;
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";
	/* Error msg DIV*/
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";

	if (inputField.parentNode.children.length > 1) {
		var next = inputField.nextSibling;
		while (next && next.nodeType !== -1) {
			if (createSpan.id == "validation-pass") {
				next.parentNode.removeChild(next.nextSibling.nextSibling);
			}
			else {
				var test1 = next.nextSibling.nextSibling;
				if (test1) {
					test1.parentNode.removeChild(test1);
				}
				else {
				}
			}
			break;
		}
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;

			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the street line 1";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		}
	}
	else {
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;

			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the street line 1";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);

		}
	}
	return true;
}

/**
 ** This method validates the street line2
**/
function streetline2Check(id){
	var inputField = document.getElementById("Streetline2");
	var text = document.getElementById("Streetline2").value;
	regex = /([a-zA-Z0-9_\-\047]+(_[-a-zA-Z0-9 ,\.\047]+)*)$/;
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";
	/* Error msg DIV*/
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";

	if (inputField.parentNode.children.length > 1) {
		var next = inputField.nextSibling;
		while (next && next.nodeType !== -1) {
			if (createSpan.id == "validation-pass") {	
		        next.parentNode.removeChild(next.nextSibling.nextSibling);
			}
			else {
				var test1 = next.nextSibling.nextSibling;
				if (test1) {
					test1.parentNode.removeChild(test1);
				}
				else {
				}
			}
			break;
		}
		
		if (inputField.value == "") {		
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);			
		}
		else{
			if ( !regex.test(text) ) {
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				inputField.value = text;

				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the street line 2";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
			else {
				createSpan.id = "validation-pass";
				inputField.parentNode.appendChild(createSpan);
			}
		}
	}
	else {
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
			return true;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);

		}
	}
	return true;
}


/**
 ** This method validates the street line2
**/
function townorcityCheck(id){
	var inputField = document.getElementById("townorcity");
	var text = document.getElementById("townorcity").value;
	regex = /([a-zA-Z]+(_[a-zA-Z]+)*)$/;
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";

	/* Error msg DIV*/
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";

	if (inputField.parentNode.children.length > 1) {
		var next = inputField.nextSibling;
		while (next && next.nodeType !== -1) {
			if (createSpan.id == "validation-pass") {
				next.parentNode.removeChild(next.nextSibling.nextSibling);
			}
			else {
				var test1 = next.nextSibling.nextSibling;
				if (test1) {
					test1.parentNode.removeChild(test1);
				}
				else {
				}
			}
			break;
		}
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;
			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the town/city";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		}
	}
	else {
		if (!regex.test(text) || inputField.value == "") {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = text;

			createMsgSpan.id = "error-msg";
			createMsgSpan.innerHTML="Please enter the town/city";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
		else {
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);

		}
	}
	return true;
}

/**
 ** This method validates the county in manual address providing scenario
**/

function testCounty(id) {
	var getNameValue = id;
    regex = /([a-zA-Z]+(_[a-zA-Z]+)*)$/;
	if (getNameValue = "county") {
		var inputField = document.getElementById("county");
		var inputValue = document.getElementById("county").value;
		var inputClass = document.getElementsByClassName("county");
		var createSpan = document.createElement('span');
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "";
		var createMsgSpan = document.createElement('div');
		createMsgSpan.innerHTML = "";
		createMsgSpan.id = " ";
		createMsgSpan.className += "";
		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== -1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling.nextSibling);
				} else {
					var test = next.nextSibling.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
					}
				}
				break;
			}
			if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;

					createMsgSpan.id = "error-msg";
					createMsgSpan.innerHTML="Please enter the county";
					inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
					return false;

				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.value = "";
				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the county";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		} else {
			if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;
					return false;
				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				inputField.value = inputValue;

				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the county";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		}
	} else {
	}
	return true;
}

/**
 ** This method validates the Post Code in manual address providing scenario
**/
function testPostCode(id) {
	var inputField = document.getElementById("postalCode");
	var newPostCode = checkPostCode(document.getElementById('postalCode').value);
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";
	if (inputField.parentNode.children.length > 2) {
		var next = inputField.nextSibling;
		while (next && next.nodeType !== -1) {
			if (createSpan.id == "validation-pass") {
				next.parentNode.removeChild(next.nextSibling.nextSibling);
			}
			else {
				/* next.parentNode.removeChild(next.nextSibling); */
				var test = next.nextSibling.nextSibling;
				if (test) {
					test.parentNode.removeChild(test);
				}
				else {
				}
			}
			break;
		}
		if (newPostCode) {
			document.getElementById('postalCode').value = newPostCode;
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		}
		else {
			createSpan.id = "validation-fail";
			inputField.value = '';
			createMsgSpan.id = "postcode-error-msg";
			createMsgSpan.innerHTML="Please enter the postcode";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
	}
	else {
		if (newPostCode) {
			document.getElementById('postalCode').value = newPostCode;
			createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		}
		else {
			createSpan.id = "validation-fail";
			inputField.parentNode.appendChild(createSpan);
			inputField.value = '';
			createMsgSpan.id = "postcode-error-msg";
			createMsgSpan.innerHTML="Please enter the postcode";
			inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
			return false;
		}
	}
	return true;
}

/**
 ** This method validates Surname in manual address providing scenario
**/
function checkName(id) {
	var getNameValue = id;
	regex = /([a-zA-Z]+(_[a-zA-Z]+)*)$/;
	if (getNameValue = "surName") {
		var inputField = document.getElementById("surName");
		var inputValue = document.getElementById("surName").value;
		var inputClass = document.getElementsByClassName("surname");
		var createSpan = document.createElement('span');
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "";
		var createMsgSpan = document.createElement('div');
		createMsgSpan.innerHTML = "";
		createMsgSpan.id = " ";
		createMsgSpan.className += "";
		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== -1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
				} else {
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
						next.parentNode.removeChild(next);
					}
				}
				break;
			}
			if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;
					createMsgSpan.id = "error-msg";
					createMsgSpan.innerHTML="Please enter the surname";
					inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
					return false;

				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.value = inputValue;
				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the surname";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		} else {
			if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;

					createMsgSpan.id = "error-msg";
					createMsgSpan.innerHTML="Please enter the surname";
					inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
					return false;
				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				inputField.value = inputValue;

				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the surname";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		}
	} else {
	}
	return true;
}

/**
 ** This method validates the first name of the user in manual address providing scenario
**/
function checkFName(id) {
	var getInputValue = id;
	regex = /([a-zA-Z]+(_[a-zA-Z]+)*)$/;
	if (getInputValue = "firstName") {
		var inputField = document.getElementById("firstName");
		var inputValue = document.getElementById("firstName").value;
		var inputClass = document.getElementsByClassName("firstname");
		var createSpan = document.createElement('span');
		getInputValue.trim();
		createSpan.innerHTML = "";
		createSpan.id = " ";
		createSpan.className += "";
		var createMsgSpan = document.createElement('div');
		createMsgSpan.innerHTML = "";
		createMsgSpan.id = " ";
		createMsgSpan.className += "";
		if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== -1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
				} else {
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
						next.parentNode.removeChild(next);
					}
				}
				break;
			}
				if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;

					createMsgSpan.id = "error-msg";
					createMsgSpan.innerHTML="Please enter the first name";
					inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
					return false;

				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.value = inputValue;
				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the first name";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		} else {
			if (inputValue.match(regex)) {
				if (inputValue.length == null || inputValue.length == " ") {
					createSpan.id = "validation-fail";
					inputField.parentNode.appendChild(createSpan);
					inputField.value = inputValue;
					return false;
				} else {
					createSpan.id = "validation-pass";
					inputField.parentNode.appendChild(createSpan);
				}
			} else {
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				inputField.value = inputValue;

				createMsgSpan.id = "error-msg";
				createMsgSpan.innerHTML="Please enter the first name";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
		}
	}
	return true;
}

/**
 ** This method validates the TITLE
**/
function checkTitle() {
	var inputField = document.getElementById("styled-select");
	var inputValue = document.getElementById("title").value;
	var inputClass = document.getElementsByClassName("title");
	var createSpan = document.createElement('span');
	createSpan.innerHTML = "";
	createSpan.id = " ";
	createSpan.className += "";
	var createMsgSpan = document.createElement('div');
	createMsgSpan.innerHTML = "";
	createMsgSpan.id = " ";
	createMsgSpan.className += "";
	if (inputField.parentNode.children.length > 1) {
			var next = inputField.nextSibling;
			while (next && next.nodeType !== -1) {
				if (createSpan.id == "validation-pass") {
					next.parentNode.removeChild(next.nextSibling);
				} else {
					var test = next.nextSibling;
					if (test) {
						test.parentNode.removeChild(test);
					} else {
						next.parentNode.removeChild(next);
					}
				}
				break;
			}
	if (inputValue === "Miss" || inputValue === "Mr" || inputValue === "Ms" ||   inputValue === "Mrs" ||
		  inputValue === "Dr" ||  inputValue === "Prof" ||  inputValue === "Rev") {
		 	createSpan.id = "validation-pass";
			inputField.parentNode.appendChild(createSpan);
		  }
		else {
				createSpan.id = "validation-fail";
				inputField.parentNode.appendChild(createSpan);
				createMsgSpan.id = "title-error-msg";
				createMsgSpan.innerHTML="Please select a title";
				inputField.parentNode.appendChild(createSpan).appendChild(createMsgSpan);
				return false;
			}
			}
	return true;
		}

