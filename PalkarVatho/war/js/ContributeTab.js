/**
 * 
 */
function checkAvailability(){
	
	var eWord=$.trim($("#ceEngWordId").val());
	eWord=eWord.toLowerCase();
	
	if(eWord.length==0){
		sAlert("Enter an English word to proceed");
		return;
	}
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	eWord : encodeURIComponent(eWord),
	    	action : "ceCheckAvail"
	    },

	    type: "GET",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		$("#ceEngWordId").val("");
	    		return;
	    	}
	    	
	    	var sWordArray=json.sWordArray;
	    	
	    	if(sWordArray==null || sWordArray.length==0){
	    		$("#ceCheckAvailDiv").html("This is a new word and currently does not exist in our dictionary. You can go ahead and add it.");
	    		$("span.ceInitHide").show();
	    		return;
	    	}
	     
	    	var sHtml="This word already exists. Below are the available results.</br><ul>";
	    	for(var i=0;i<sWordArray.length;i++){
	    		sHtml+= "<li>"+sWordArray[i]+"</li>";
	    	}
	    	sHtml+="</ul>";
	    	sHtml+= "If you have a new meaning you can go ahead and add it.";
	    	$("#ceCheckAvailDiv").html(sHtml);
	    	$("span.ceInitHide").show();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    }
	});
	
	
}

function saveWord(){
	var eWord=$.trim($("#ceEngWordId").val());
	eWord=eWord.toLowerCase();
	var sWord=$.trim($("#ceSWordId").val());
	sWord=sWord.toLowerCase();
	
	if(eWord.length==0){
		sAlert("Enter an English word");
		return;
	}
	if(sWord.length==0){
		sAlert("Enter a Sourashtra word");
		return;
	}
	if(sWord.length>500){
		sAlert("Sourashtra word length can be only 500 characters max");
		return;
	}
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	eWord : encodeURIComponent(eWord),
	    	sWord:	encodeURIComponent(sWord),
	    	action : "contributeWord"
	    },

	    type: "POST",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		return;
	    	}
	    	
	    	$("#saveDialog").dialog('open');
	    	clearContributeTab();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    }
	});
	
}

function clearContributeTab(){
	$("#ceCheckAvailDiv").html("");
	$("span.ceInitHide").hide();
	$("#ceEngWordId").val("");
	$("#ceSWordId").val("");
	
}
function ceEnterPress(event){
	if(event.keyCode == 13){
		checkAvailability();
	}
}