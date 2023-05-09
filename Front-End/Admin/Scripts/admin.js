$(".nav").click(function () {
    $("#mySidenav").css('width', '70px');
    $("#main").css('margin-left', '70px');
    $(".logo").css('visibility', 'hidden');
    $(".logo span").css('visibility', 'visible');
    $(".logo span").css('margin-left', '-10px');
    $(".icon-a").css('visibility', 'hidden');
    $(".icons").css('visibility', 'visible');
    $(".icons").css('margin-left', '-8px');
    $(".nav").css('display', 'none');
    $(".nav2").css('display', 'block');
});

$(".nav2").click(function () {
    $("#mySidenav").css('width', '300px');
    $("#main").css('margin-left', '300px');
    $(".logo").css('visibility', 'visible');
    $(".icon-a").css('visibility', 'visible');
    $(".icons").css('visibility', 'visible');
    $(".nav").css('display', 'block');
    $(".nav2").css('display', 'none');
});





let DashboardPage = document.getElementById("Dashboard--page")
let UsersPage = document.getElementById("Users--page")
let LogsPage = document.getElementById("Logs--page")
let FeedbackPage = document.getElementById("Feedback--page")




// when page load first show Dasboard Page
goToDashboardPage();

function goToDashboardPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Dashboard";
    document.getElementById("headingOfPage2").innerHTML = "☰ Dashboard";
    DashboardPage.style.display="block";
    UsersPage.style.display="none";
    LogsPage.style.display="none";
    FeedbackPage.style.display="none";

    
}






function goToUserPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Users Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Users Details";
    DashboardPage.style.display="none";
    UsersPage.style.display="block";
    LogsPage.style.display="none";
    FeedbackPage.style.display="none";

  
}


function goToLogsPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Activity Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Activity Details";
    DashboardPage.style.display="none";
    UsersPage.style.display="none";
    LogsPage.style.display="block";
    FeedbackPage.style.display="none";

    
}






async function goToFeedbackPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Feedback Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Feedback Details";
    DashboardPage.style.display="none";
    UsersPage.style.display="none";
    LogsPage.style.display="none";
    FeedbackPage.style.display="block";

   
}


function goToHomePage(){
    location.href = '../index.html'  
}