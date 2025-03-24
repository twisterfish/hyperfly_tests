/*
================================================================================================================================ 
= hyperfly API AJAX MODULE
================================================================================================================================
AUTHOR:  Edward Anderson
DATE:  08/15/2012

INPUT:	Accepts a JSON string formatted according to API specs
OUTPUT:	Will return a JSON string if successful - nothing if unsuccessful

DESCRIPTION:
	This is the javascript AJAX interface to the hyperfly API.  It is designed to interface with an external JSON api, in
	this case we are calling the hyperfly api installed at the Revolution.
	To use this module simply include it in your html in the head section and reference the calls to it.
*/

/* 
********************************************************************************************************************************
Globals
******************************************************************************************************************************** 
*/

/*
{"ver":"1.1.0","type":"getPlaylistCollection", "path":"model","collectionId":"60"}


var hyperflyURL = "http://etlapi.somedomain.com/";
{"ver":"0.1.0","type":"getCollections", "path":"model", "entityId":"56"}

*/
//var hyperflyURL = "https://hyperfly.somedomain.com/api/";

var hyperflyURL = "http://104.239.139.154/api/";

//var hyperflyURL = "http://50.56.234.186/ed_api/";




/* 
********************************************************************************************************************************
Here we go. This is the actual call to the hyperfly API. You must have properly formatted and valid JSON in your request .  
If you have ANYTHING out of place in your JSON text string, or you are an invalid user - the API WILL NOT RESPOND.  
This is for security purposes - you will get ignored if you don't know what you are doing.  

The hyperfly api documentation:  http://www.revolution.com/docs/json_api.html

ARGS: 
		1. requestingFormID : the ID of the form element you built to submit a request.
		2. requestingFormFieldID : the ID of the field in the form in which you populated your JSON request.
		3. responseElementID: the ID of the element you wish to populate with the response text (JSON)

******************************************************************************************************************************** 
*/
function hyperfly_api_call( requestingFormID, requestingFormFieldID, responseElementID  ){

	var postPayload;
	var postString;
	var ajaxRequest;

	if (requestingFormID === "getVersion"){
		postPayload = encodeURIComponent("{\"ver\": \"1.1.0\",\"path\": \"core\",\"type\": \"statusVersion\"}");//status message
		postString = "payload=" + postPayload;	
	}else{
		// clean up the input a bit
		requestingFormID = requestingFormID.trim();
		requestingFormFieldID = requestingFormFieldID.trim();
		responseElementID = responseElementID.trim();
		
		postPayload = encodeURIComponent(document.getElementById(requestingFormID).elements[requestingFormFieldID].value);
		postString = "payload=" + postPayload;
	}
	
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	}catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				
				alert("IE compatibility issue.");// Something went wrong
				return false;
			}
		}
	}
	
	// Create a function that will receive data sent from the server and load it into the element designated to receive the response.
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){				
			document.getElementById(responseElementID).innerHTML = ajaxRequest.responseText;
		}
	}

	ajaxRequest.open("POST", hyperflyURL, true);
	ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajaxRequest.send(postString); 

}


/* 
********************************************************************************************************************************
This is a test function to see if you have it configured correctly...  So you are not pointlessly trying to debug API calls.
ARGS: an element id you wish to replace with a status message.
******************************************************************************************************************************** 
*/

function hyperfly_getVersion( responseElementID ){
	
	hyperfly_api_call("getVersion",null,responseElementID);
	
}