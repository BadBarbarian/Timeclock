(function(){
    var events = new Firebase("https://hawk-timeclock.firebaseio.com/events");

    var currentUser;
    authUser();

    events.on("value", function(snapshot) 
    {
        var data = snapshot.val();
        var list = [];

        for (var key in data) 
        {
            if (data.hasOwnProperty(key)) 
            {
                time = data[key].time ? data[key].time : '';
                type = data[key].type ? data[key].type : '';
                user = data[key].user ? data[key].user : '';

                if (user.length > 0) 
                {
                    list.push({
                        time: time,
                        type: type,
                        user: user
                    })
                }
            }
        }

        refreshUI(list);
    });

})();

function authUser()
{
    var ref = new Firebase("https://hawk-timeclock.firebaseio.com/");
    var users = new Firebase("https://hawk-timeclock.firebaseio.com/users");

    var authData = ref.getAuth();

    // Check to make sure a user is logged in
    if (authData) {

        var userId = authData.uid;
        ref.child("users/" + userId).once("value", setCurrentUser);
    }
    else // If not, return to login screen
    {
        window.location = "login.html";
    }
}

function setCurrentUser(snapshot)
{
    var user = snapshot.val();
    if (!user)
    {
        console.log("ERROR: No user object for uid %s!", userId);
        return;
    }

    currentUser = user;

    var user = currentUser ? currentUser.firstName : "Unknown";
    document.getElementById("userName").innerHTML = "Hello, " + user + "!";

    console.log(currentUser.permissions);
    if (currentUser.permissions == 1)
    {
        console.log("Current user has 1 permission");
    }
    else
    {
        console.log("Current user has more than 1 permission")
    }
}

function checkPermission()
{

}

function clockIn()
{
    var events = new Firebase("https://hawk-timeclock.firebaseio.com/events");
    var clockinTime = new Date().getTime();

    document.getElementById("text_out").innerHTML = "Clocked In: " + clockinTime;

    events.push({
     time: clockinTime,
     type: 1,
     user: currentUser.userName
 });
}

function clockOut()
{
    var events = new Firebase("https://hawk-timeclock.firebaseio.com/events");
    var clockOutTime = new Date().getTime();

    document.getElementById("text_out").innerHTML = "Clocked Out: " + clockOutTime;

    events.push({
        time: clockOutTime,
        type: 2,
        user: currentUser.userName
    });
}

function refreshUI(list) 
{
    var lis = '';
    for (var i = list.length - 1; i > list.length - 4; i--) 
    {
        if(list[i].user === currentUser.userName)
        {
            lis += "<li> User " + list[i].user + " " + eventType(list[i].type) + " on " + list[i].time + "</li>";
        }
    };
    document.getElementById("pastEvents").innerHTML = lis;
}

function eventType(type)
{
    if (type === 1)
    {
        type = "clocked in";
        return type;
    }
    else
    {
        type = "clocked out";
        return type;
    }
};

function logOut()
{
    ref.unauth();
    window.location = "login.html";
}