<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Palkar Vatho</title>
<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    boolean isAdmin=false;
    if (user != null) {
      request.setAttribute("user", user);
      isAdmin=userService.isUserAdmin();
      }

%>
 <link rel="stylesheet" href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/themes/excite-bike/jquery-ui.min.css" />
 <link rel="stylesheet" href="/css/Homepage.css"/>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
 <script src="/js/Homepage.js"></script>
  <script>
  $(function(){
  
  $("button,a[id$=Btn]").button();
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  $(".pDialog").dialog({
      autoOpen: false,
      modal: true,
      show: {
        effect: "slide",
        direction : "up",
        duration : "slow"
      },
      hide: {
        effect: "explode",
        duration : "slow"
      }
    });
   
   $(".okDialog").dialog({
      autoOpen: false,
      modal: true,
      show: {
        effect: "slide",
        direction : "up",
        duration : "slow"
      },
      hide: {
        effect: "explode",
        duration : "slow"
      },
      buttons: {
        Ok : function() {
          $( this ).dialog( "close" );
        }
      }
      
    });
    
     $(".sAlertDialog").dialog({
      autoOpen: false,
      modal: true,
	  height: 200,
      show: {
        effect: "slide",
        direction : "up",
        duration : "slow"
      },
      hide: {
        effect: "explode",
        duration : "slow"
      },
      buttons: {
        Ok : function() {
          $( this ).dialog( "close" );
        }
      }
      
    });
    
  
  });
  
  </script>
</head>
<body>
<table align="center" width="90%">
<!-- Header row starts -->
<tr>
<td>
<div class="loginContainer">
<table width="100%"><tr><td>
<div align="left" style="display:inline"><h1 style="font-family:Georgia Bold Italic;color:#f7f7f7">palkar vatho</h1></div>
</td><td>
<div align="right">
<%if(request.getAttribute("user")==null){ %>
<a id="SignInBtn" href="<%= userService.createLoginURL(request.getRequestURI())%>">Sign in</a>
<%}else{ %>
<font color="#f7f7f7">Logged in as <%=user.getNickname()%>&nbsp;&nbsp;</font>
<a id="SignOutBtn" href="<%= userService.createLogoutURL(request.getRequestURI()) %>">Sign out</a>
<%} %>
</div>
</td>
</tr>
<tr><td colspan="2">
<p style="font-family:Georgia Bold Italic;color:#f7f7f7"> 
An online English-Sourashtra dictionary or translator where anyone can contribute collaboratively.
</p>
</td></tr>
</table>
</div>

</td>
</tr>
<!-- Header row ends -->
<!-- Content row starts -->
<tr><td>
<div id="tabs">
  <ul>
    <li><a href="#searchTab">Search</a></li>
    <li><a href="#contibuteTab">Contribute a word</a></li>
    <%if(isAdmin){ %>
    <li><a href="#correctionsTab">Corrections</a></li>
    <%} %>
    <li><a href="#aboutTab">About us</a></li>
 </ul>
  <div id="searchTab">
    <jsp:include page="/palkarvatho/SearchTab.html"></jsp:include>
  </div>
   <div id="contibuteTab">
    <jsp:include page="/palkarvatho/ContributeTab.html"></jsp:include>
  </div>
  <%if(isAdmin){ %>
     <div id="correctionsTab">
    <jsp:include page="/palkarvatho/CorrectionsTab.html"></jsp:include>
  </div>
  <%} %>
  <div id="aboutTab">
    <jsp:include page="/palkarvatho/AboutUsTab.html"></jsp:include>
  </div>
</div>




</td></tr>
<!-- Content row ends -->
<!-- Footer row starts -->
<tr><td>
&nbsp;
</td></tr>
<!-- Footer row ends -->
</table>
<!-- Dialogs -->
<div id="pDialog" class="pDialog" title="Processing" style="display:none">Processing data...</div>
<div id="saveDialog" class="okDialog" title="Success" style="display:none">Saved Successfully!!!</div>
<div id="ceSignInDialog" class="okDialog" title="Sign In" style="display:none">Sign in to contribute a word</div>
<div id="errorDialog" class="okDialog" title="Error" style="display:none">Sorry, there was a problem! Please try again after sometime</div>
<div id="sAlertDiv" class="sAlertDialog" title="Alert" style="display:none"></div>


</body>
</html>