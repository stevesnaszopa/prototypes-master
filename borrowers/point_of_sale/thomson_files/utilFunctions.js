/************************************************************************************************************************************/
////////////////////////////////////////////////General and Util functions//////////////////////////////////////////////////////////////////////////////
//This function rounds off a decimal floating point number to the specified number of
// digits after the decimal point.
function roundOff(amount,digits)
{
	// The precision is explicitly mentioned so as to ensure the multiplication yeilds a predictive result.
	var scaledAmount = (amount*Math.pow(10,digits)).toPrecision(lengthOf(amount));
	var roundedAmount = Math.round(scaledAmount);
	var unscaledAmount = roundedAmount/100;
	return parseFloat(unscaledAmount).toFixed(digits);
}

//This function gives the length of a decimal number without counting the decimal point "."
// Example: lengthOf(12.45)= 4
function lengthOf(amount)
{
return stripChars((amount).toString(),".").length
}

//Strips the characters passed through the function.
function stripChars(s, bag)
{
   var i;
   var returnString = "";
   // Search through string's characters one by one.
   // If character is not in bag, append to returnString.
   for (i = 0; i < s.length; i++)
   {
      // Check that current character isn't whitespace.
      var c = s.charAt(i);
      if (bag.indexOf(c) == -1) returnString += c;
   }
   return returnString;
}

/**
 * Trims space and Strips only first char from the string
 * @param value
 * @returns string after removing first char
 */
function stripFirstChar(value)
{
	value = (trimSpaces(value)).substring(1);
	return value;
}

  //Auto Completion of surnames
function autoCompletion(passengerCountBasedOnRooms, startAutoCompletion)
{
   if (document.getElementById("passengerCount"))
   {
      var passengerCountBasedOnRooms = document.getElementById("passengerCount").value
   }
   if(document.getElementById('autoCheck['+startAutoCompletion+']').checked) {
      for(index=startAutoCompletion; index<(startAutoCompletion+passengerCountBasedOnRooms-1); index++)
      {
         if (document.getElementById('lastname_'+index))
         {
         document.getElementById('lastname_'+index).value = document.getElementById('lastname_0').value;
      }
   }
}
}

function unCheck()
{
   if(document.getElementById('autoCheck[1]'))
   {
      document.getElementById('autoCheck[1]').checked = false;
   }
}

/* Clear the text in the field and set Focus to that field and show message */
function clearAndFocus(alertmessage,obj)
{
   alert(alertmessage)
   obj.value='';
   obj.focus();
   return false;
}

/* Set Focus to field and show message */
function setFocus(alertmessage,obj)
{
   alert(alertmessage)
   obj.focus();
   return;
}

/* Remove all spaces in value */
function removeAllSpaces(objval)
{
   RESpace = /\s/ig;
  objval = objval.replace(RESpace, '');
  return objval
}

/*  Trim spaces from start and end of string   */
function trimSpaces(objval)
{
  // Remove Space at start
  RESpace = /^\s*/i;
  objval = objval.replace(RESpace, '');
  // Remove Space at end
  RESpace = /\s*$/i;
  objval = objval.replace(RESpace, '');
  return objval;
}
function ClearField(obj) {
if (obj.value != '') {
 obj.value = '';
 obj.select()
 obj.onfocus = null;
 }
}

function SetCursorToTextEnd(textObj)
{
  if (textObj != null && textObj.value.length > 0)
  {
     if (textObj.createTextRange)
     {
        var FieldRange = textObj.createTextRange();
        FieldRange.moveStart('character', textObj.value.length);
        FieldRange.collapse();
        FieldRange.select();
     }
  }
}

/** If the element exists set value to it.
* This function is applicable for <input> tags only.
* @param id- id of the element
         value - value to be set to element
*/
function setValueForInput(id , value)
{
  if(document.getElementById(id))
  {
         document.getElementById(id).value = value;
  }
}


function disableField(id , value)
{
  if(document.getElementById(id))
  {
         document.getElementById(id).disabled = value;
  }
}

function getInputValue(id)
{
  if(document.getElementById(id))
  {
      return(document.getElementById(id).value);
  }
}

/**
 * Closes main window in Internet Explorer(6 and 7) browsers.
 * This function does not work in other browsers like FF
 *  */
function closeMainWindow()
{
	//Added to avoid any alert on closing the window
   window.open('','_parent','');
   window.close();
}


function openTitlePopup(whichLayer)
{
	if (document.getElementById(whichLayer))
	{
		var style2 = document.getElementById(whichLayer).style;
		style2.display = "block";
	}
}

function closeTitlePopup(whichLayer)
{
	if (document.getElementById(whichLayer))
	{
		var style2 = document.getElementById(whichLayer).style;
		style2.display = "none";
	}
}
//////////////////////////////////////////// End of util functions ///////////////////////////////////////////////////////////////////////
/************************************************************************************************************************************/