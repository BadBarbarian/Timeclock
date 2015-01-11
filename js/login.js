function userLogin()
{
	var ref = new Firebase("https://hawk-timeclock.firebaseio.com/");
	var email = $("#email").val();
	var password = $("#password").val();

	// Checking for blank fields.
	if( email =='' || password =='')
	{
		$('input[type="text"],input[type="password"]').css("border","2px solid red");
		$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
	}
	else 
	{
		$('input[type="text"],input[type="password"]').css("border","");
		$('input[type="text"],input[type="password"]').css("box-shadow","");
		
		ref.authWithPassword(
		{
		  email    : email,
		  password : password
		}, 
		function(error, authData) 
		{
		  if (error) 
		  {
		    console.log("Login Failed!", error);
		  } 
		  else 
		  {
		    console.log("Authenticated successfully with payload:", authData);
		    window.location = "index.html";
		  }
		});
	}
}


