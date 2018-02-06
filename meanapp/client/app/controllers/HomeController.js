MainApp.controller('HomeController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

  var fullName = $rootScope.activeUser.user.Name.split(' ');
  $scope.firstName = fullName[0];

  var GetDate = function() {

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
          dd = '0' + dd
      }
      if (mm < 10) {
          mm = '0' + mm
      }
      today = mm + '/' + dd + '/' + yyyy;
      var arrayofdates = [today, dd, mm, yyyy];
      return arrayofdates;
  }

  var DatesArray = GetDate();
//   console.log(DatesArray);
// GetScheduleDay(DatesArray[2],DatesArray[3],$rootScope.activeUser.user.Name);

    function GetMonth() {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var d = new Date();
        var n = month[d.getMonth()];
        console.log("Month "+n);
        return n;
    }

            var CurrentUserCurrentMonth = GetMonth();

    var fullName = $rootScope.activeUser.user.Name.split(' ');

    $scope.firstName = fullName[0];

    $scope.FTRtarget = 0.95;
    $scope.Updatetarget = 0.90;
    $scope.Resolutiontarget = 0.90;

    if ($rootScope.activeUser.user.Role == "engineer") {
        $http.get('/scorecard?Name=' + $rootScope.activeUser.user.Name + '')
            .success(function(response) {
              if(response.length != 0){
                var currentscore = response[0];
                if (response.lenth == 0) {
                    console.log("No Data");
                }
                for (var i = 0; i < currentscore.KPIs.length; i++) {
                    if (currentscore.KPIs[i].Month == GetMonth()) {

                        $scope.curentscorecard = currentscore.KPIs[i];
                    } else {
                        console.log("could not find month")

                    }
                }
}
else{
 console.log("this is first time logging in")
 var InitScoreCard = {
"Name":$rootScope.activeUser.user.Name ,
"KPIs": [
{
"ScComment": " ",
"Rank": "0",
"Survey": "0",
"Resolution": "0",
"Qa": "0",
"Update": "0",
"Ftr": "0",
"Sr": "0",
"Im": "0",
"Month": CurrentUserCurrentMonth
}
]
}
 $http.post('/scorecard', InitScoreCard)
     .success(function(response) {
         console.log(response);
     });
}
            });
    }// end of the basic Engineer function.

// Manager access :
    if ($rootScope.activeUser.user.Role != "engineer") {
        $http.get('/scorecard/' + '')
            .success(function(response) {
              var counter=0;
              var engineer_name=[];
              var engineer_kpis=[];
              var place=[];
              $scope.scorecardData=[];


              for (var j = 0 ; j <response.length; j++){
              if(response.length != 0){
              //var scoreCard = response[i];
              var currentscore = response[j];
              // var engineer_name[counter]=currentscore.Name;
              // console.log(" Engineer Name: "+currentscore.Name);
              // counter++;
              //$scope.names=enginer
              console.log("the score is "+currentscore);
                if (currentscore.lenth == 0) {
                    console.log("No Data");
                    console.log("the score is "+currentscore);
                }
                for (var i = 0; i < currentscore.KPIs.length; i++) {
                    if (currentscore.KPIs[i].Month == GetMonth()) {
//                  $scope.Currentmonth.push({ engineer: Selectedscorecard.Name, Rank: KpiArray[j].Rank, Survey: KpiArray[j].Survey, Resolution: KpiArray[j].Resolution, Qa: KpiArray[j].Qa, Update: KpiArray[j].Update, Ftr: KpiArray[j].Ftr, Sr: KpiArray[j].Sr, Im: KpiArray[j].Im, ScComment: KpiArray[j].ScComment });

                        //$scope.curentscorecard = currentscore.KPIs[i];// the score card of the cuurent month
                         engineer_kpis=currentscore.KPIs[i];
                         engineer_name=currentscore.Name;
                           counter++;
                           place=counter
                        $scope.scorecardData.push({place:counter,engineer:engineer_name,KPIs:engineer_kpis});
                        //console.log(" Engineer Name: "+currentscore.Name);

                    } else {
                        console.log("could not find month")

                      }
                    }
                  }
                }

                console.log("Manger will see:"+ $scope.scorecardData);
});
}

}]);
