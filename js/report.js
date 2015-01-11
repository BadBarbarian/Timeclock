function printReport()
{
	var checkFrom = $("#from").val();
	var checkTo = $("#to").val();


	if( checkFrom == '' || checkTo == '')
	{

		$('input[type="text"]').css("border","2px solid red");
		$('input[type="text"]').css("box-shadow","0 0 3px red");

	}

	else
	{
		var fromValue = new Date($("#from").val());
		var toValue = new Date($("#to").val());

		toValue.setHours(23,59,59,999);

		var startDate = fromValue.getTime();
		var endDate = toValue.getTime();

		var events = new Firebase("https://hawk-timeclock.firebaseio.com/events");

		console.log(startDate);
		console.log(endDate);

		events.orderByChild("time")
		.startAt(startDate)
		.endAt(endDate)
		.once("value", function(snap){
			console.log('messages in range', snap.val());
		});
	}

}

function generateData()
{
	startDate = new Date(2014,11,1); // December 1, 2014
	endDate = new Date(2015,0,31); // December 31, 2014

	for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1))
	{
		if (isWeekday(startDate))
		{
			console.log(d);
			console.log(currentUser.userName);
		}
		else
		{
			console.log("---------------------------");
		}
	}

	console.log("Start Date: " + startDate); // Thu Jan 01 2015 00:00:00 GMT-0600 (Central Standard Time)
	console.log("End Date: " + endDate); // Wed Dec 31 2014 00:00:00 GMT-0600 (Central Standard Time)
	console.log("Loop Date: " + d); // Thu Jan 01 2015 00:00:00 GMT-0600 (Central Standard Time)
}

function isWeekday(date)
{
	var day =  date.getDay();
	return day != 0 && day != 6;
}

(function(){
    var ref = new Firebase("https://hawk-timeclock.firebaseio.com/");
    var users = new Firebase("https://hawk-timeclock.firebaseio.com/users");
    var events = new Firebase("https://hawk-timeclock.firebaseio.com/events");

    var authData = ref.getAuth();
    var currentUser;

    // Check to make sure a user is logged in
    if (authData) {
    	console.log("Success!");
        var userId = authData.uid;
        ref.child("users/" + userId).once("value", setCurrentUser);
    }
    else // If not, return to login screen
    {
        window.location = "login.html";
    }

})();