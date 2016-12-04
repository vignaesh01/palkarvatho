/**
 * 
 */
function shTranslate() {
	var eWord = $.trim($("#shEngWordId").val());
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
			action : "shTranslate"
		},

		type : "GET",

		dataType : "json",

		success : function(json) {

			var sWordArray = json.sWordArray;

			if (sWordArray == null || sWordArray.length == 0) {
				$("#shSWordDescDiv").html("Sorry, No matching results found");
				return;
			}

			var sHtml = "Displaying result(s) for " + eWord + " :</br><ul>";
			for ( var i = 0; i < sWordArray.length; i++) {
				sHtml += "<li>" + sWordArray[i] + "</li>";
			}
			sHtml += "</ul>";

			$("#shSWordDescDiv").html(sHtml);

		},

		error : function(xhr, status) {
			$("#errorDialog").dialog('open');
		},
		complete : function(xhr, status) {
			$("#pDialog").dialog('close');
		}
	});

}
function shEnterPress(event){
	if(event.keyCode == 13){
		shTranslate();
	}
}