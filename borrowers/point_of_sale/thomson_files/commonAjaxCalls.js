/*
 * Base Ajax update function used for all Ajax calls.
 *
 * @param servlet - Is the servlet to interact with.
 * @param params - Are the parameters to send to the server.
 * @param successCallBackFunction - Is the call back function to call when the server side processing has
 * completed successfully.
 */
function performAjaxUpdate(servlet, params, successCallBackFunction)
{
  var url = "/cps/" + servlet + "?";

  if( params )
  {
    url = url + params + "&";
  }

  url = url + "token=" + token;
  url = uncache( url );
  url = url + tomcatInstance;

  var request = new Ajax.Request( url, {method:"GET", onSuccess:successCallBackFunction} );
}

/*
 * Base Ajax update function used for all Ajax calls.
 *
 * @param servlet - Is the servlet to interact with.
 * @param params - Are the parameters to send to the server.
 * @param successCallBackFunction - Is the call back function to call when the server side processing has
 * completed successfully.
 */
function performJQueryAjaxUpdate(servlet, params, successCallBackFunction)
{
  var url = "/cps/" + servlet + "?";

  if( params )
  {
    url = url + params + "&";
  }

  url = url + "token=" + token;
  url = uncache( url );
  url = url + tomcatInstance;

  var request = jQuery.ajax({url:url, type:'get', success:successCallBackFunction});
}


/** Prevents browsers from caching requests
*/
function uncache(url)
{
   var d = new Date();
   var time = d.getTime();
   var newUrl;
   if (url.indexOf("?") != -1)
      newUrl = url + "&time="+time;
   else
      newUrl = url + "?time="+time;

   return newUrl;
}


/*********************************Booking button common ajax call ********************************/

var bookingButtonId = null;
/**
 *  Check for the booking button, if present make an ajax call to check to show or hide it as applicable
 *
 *  @param payButtonId should be passed by respective brands
 **/
function checkBookingButton(bookingButton)
{
   bookingButtonId = bookingButton;
   if($(bookingButtonId))
   {
     performAjaxUpdate( "ConfirmBookingServlet", null, responseShowConfirmBooking );
   }
}

function responseShowConfirmBooking(request)
{
  if((request.readyState == 4) && (request.status == 200))
  {
     var result = request.responseText;
     var checkoutPaymentDetailsBookNowButton = $(bookingButtonId);
     if(checkoutPaymentDetailsBookNowButton)
     {
       if( result == "true" )
       {
         checkoutPaymentDetailsBookNowButton.show();
       }
       else
       {
         checkoutPaymentDetailsBookNowButton.hide();
       }
     }
  }
}
/**********************************************************************************************************/