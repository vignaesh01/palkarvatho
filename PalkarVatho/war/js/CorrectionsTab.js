/**
 * Admin only js file 
 */
function cnSearch(){

	var eWord = $.trim($("#cnEngWordId").val());
	eWord=eWord.toLowerCase();
	if (eWord.length == 0) {
		sAlert("Enter an English word to proceed");
		return;
	}
	$("#pDialog").dialog('open');
	$.ajax({
		url : "./palkarvatho",
		data : {
			eWord : encodeURIComponent(eWord),
			action : "cnSearch"
		},

		type : "GET",

		dataType : "json",

		success : function(json) {
			
			if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		$("#cnEngWordId").val("");
	    		return;
	    	}
			var sWordArray = json.sWordArray;
			var pIdArray=json.pIdArray;
			
			if (pIdArray == null || pIdArray.length == 0) {
				$("#cnDiv").html("Sorry, No matching results found");
				return;
			}

			var sHtml = "Displaying result(s) for " + eWord 
			+ "&nbsp; <a href='#' onclick=\"editEWord(\'"+eWord+"\',\'"+pIdArray+"\')\"> Edit </a>"
			+ "&nbsp; <a href='#' onclick=\"deleteEWord(\'"+eWord+"\',\'"+pIdArray+"\')\"> Delete </a>"
			+" </br></br><table cellspacing='5' cellpadding='20'>";
			
			for ( var i = 0; i < pIdArray.length; i++) {
				sHtml+="<tr>";
				sHtml += "<td>" + sWordArray[i] + "</td>";
				sHtml+="<td><a href='#' onclick=\"editSWord(\'"+eWord+"\',\'"+sWordArray[i]+"\',"+pIdArray[i]+")\"> Edit </a></td>";
				sHtml+="<td><a href='#' onclick=\"deleteSWord(\'"+eWord+"\',\'"+sWordArray[i]+"\',"+pIdArray[i]+")\"> Delete </a></td>";
				sHtml+="</tr>";
			}
			sHtml += "</table>";

			$("#cnDiv").html(sHtml);

		},

		error : function(xhr, status) {
			$("#errorDialog").dialog('open');
		},
		complete : function(xhr, status) {
			$("#pDialog").dialog('close');
		}
	});
}

function editSWord(eWord,sWord,pId){
	$("#cnSEditPid").val(pId);
	$("#cnSEditEWordSpan").html(eWord);
	$("#cnSEditOSWordSpan").html(sWord);
	$("#editSWordDialog").dialog('open');
	
}
function editEWord(eWord,pId){
	alert(eWord +" : "+pId);
	$("#cnEEditPid").val(pId);
	$("#cnEEditOEWordSpan").html(eWord);
	$("#editEWordDialog").dialog('open');
	
}
function saveEditSWord(){

	var newSWord=$.trim($("#cnSEditNSWordId").val());
	newSWord=newSWord.toLowerCase();
	
	if(newSWord.length==0){
		sAlert("Enter a Sourashtra word");
		return;
	}
	
	if(newSWord.length>500){
		sAlert("Sourashtra word length can be only 500 characters max");
		return;
	}
	
	
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	pId : $("#cnSEditPid").val(),
	    	newSWord:	encodeURIComponent(newSWord),
	    	action : "saveEditSWord"
	    },

	    type: "POST",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		return;
	    	}
	    	
	    	$("#saveDialog").dialog('open');
	    	clearCnEditSWord();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    	
	    }
	});
	
	
}
function saveEditEWord(){

	var newEWord=$.trim($("#cnEEditNEWordId").val());
	newEWord=newEWord.toLowerCase();
	
	if(newEWord.length==0){
		sAlert("Enter an English word");
		return;
	}
	
	if(newEWord.length>500){
		sAlert("English word length can be only 500 characters max");
		return;
	}
	
	
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	pId : $("#cnEEditPid").val(),
	    	newEWord:	encodeURIComponent(newEWord),
	    	action : "saveEditEWord"
	    },

	    type: "POST",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		return;
	    	}
	    	
	    	$("#saveDialog").dialog('open');
	    	clearCnEditEWord();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    	
	    }
	});
	
	
}
function clearCnEditSWord(){
	$("#cnSEditPid").val("");
	$("#cnSEditEWordSpan").html("");
	$("#cnSEditOSWordSpan").html("");
	$("#cnSEditNSWordId").val("");
	$("#editSWordDialog").dialog('close');
}
function clearCnEditEWord(){
	$("#cnEEditPid").val("");
	$("#cnEEditOEWordSpan").html("");
	$("#cnEEditNEWordId").val("");
	$("#editEWordDialog").dialog('close');
}
function deleteSWord(eWord,sWord,pId){
	$("#cnSDeletePid").val(pId);
	$("#delWord").html(sWord);
	$("#deleteSWordDialog").dialog('open');
}
function deleteEWord(eWord,pId){
	$("#cnEDeletePid").val(pId);
	$("#delEWord").html(eWord);
	$("#deleteEWordDialog").dialog('open');
}
function saveSWordDelete(){
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	pId : $("#cnSDeletePid").val(),
	    	action : "saveSWordDelete"
	    },

	    type: "POST",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		return;
	    	}
	    	
	    	$("#saveDialog").dialog('open');
	    	clearSWordDelete();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    	
	    }
	});
}
function saveEWordDelete(){
	$("#pDialog").dialog('open');
	$.ajax({
	    url: "./palkarvatho",
	    data: {
	    	pId : $("#cnEDeletePid").val(),
	    	action : "saveEWordDelete"
	    },

	    type: "POST",

	    dataType : "json",

	    success: function( json ) {
	    	if(json.isUser==false){
	    		$("#ceSignInDialog").dialog('open');
	    		return;
	    	}
	    	
	    	$("#saveDialog").dialog('open');
	    	clearEWordDelete();
	    	
	    },

	    error: function( xhr, status ) {
	    	$("#errorDialog").dialog('open');
	    },
	    complete: function( xhr, status ) {
	    	$("#pDialog").dialog('close');
	    	
	    }
	});
}
function clearSWordDelete(){
	$("#cnSDeletePid").val("");
	$("#delWord").html("");
	$("#deleteSWordDialog").dialog('close');
}
function clearEWordDelete(){
	$("#cnEDeletePid").val("");
	$("#delEWord").html("");
	$("#deleteEWordDialog").dialog('close');
}
function cnEnterPress(event){
	if(event.keyCode == 13){
		cnSearch();
	}
}