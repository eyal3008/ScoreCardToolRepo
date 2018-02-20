'use strict';

MainApp.controller('1on1Controller', ['$scope', '$rootScope', '$location', '$http', '$filter', function($scope, $rootScope, $location, $http, $filter) {

// cast the name same as Infra
  var CastName = function(GivenName) {
      var NewName="";
      var name = GivenName.split(' ');

     for(var i = 0 ; i < name.length ; i++ ){

    NewName = NewName + name[i] + ".";
    }
    NewName =  NewName.substring(0, NewName.length - 1);

       return NewName.toLowerCase();
  }



    //get days per Month
    var ResponsivenessScore = 20;
    var QualityScore = 15;
    var TimelinessScore = 15;
    var OverallScore = 30;
    var ProfessionalismScore = 20;

    $http.get('catalogitem')
        .success(function(response) {
            $scope.catalogitems = response;
            console.log($scope.catalogitems)
        });


        $http.get('user?Role=engineer')
            .success(function(response) {
                $scope.UsersWithEngineerRole = response;
                console.log($scope.UsersWithEngineerRole)
            });

            // Caclulating the Security Requests
    $scope.CalcSecurity = function(AddedEngineer) {
      console.log(AddedEngineer);
            $scope.SecurityReady = false;
        $scope.SecurityTickets = [];
        console.log("Calculating Security")
        $http.get('/getSecurity')
            .success(function(response) {

                var array = response;
                var counterNewAccount = 0;
                var counterNewAST = 0;
                var counterSpecial = 0;
                var counterUT4RnD = 0;
                var counterTermination = 0;
                var counterModifyUser = 0;
                var counterSlab = 0;
                var counterAWS = 0;
                var counter = 0;
                if($rootScope.activeUser.user.Role == 'engineer'){
                var firstName = $rootScope.activeUser.user.Name.split(' ')[0];
                for (var i = 0; i < array.length; i++) {

                    if ((array[i]["Engineer"])
                        .includes(firstName)) {
                        counter++;

                        if (array[i]["Request Type"] == 'New User Creation Request') {
                            counterNewAccount++;
                            $scope.SecurityTickets.push("New User Creation Request");
                            console.log($scope.SecurityTickets)
                        }
                        if (((array[i]["Request Type"]) == 'Lab New User Request')) {
                            counterNewAST++;
                            $scope.SecurityTickets.push("Lab New User Request");
                            console.log($scope.SecurityTickets)
                        }
                        if ((array[i]["Request Type"]) == 'Special Request') {
                            counterSpecial++;
                            $scope.SecurityTickets.push("Special Request");
                            console.log($scope.SecurityTickets)
                        }
                        if (array[i]["Request Type"] == 'Lab UT Access Request') {
                            counterUT4RnD++;
                            $scope.SecurityTickets.push("Lab UT Access Request");
                            console.log($scope.SecurityTickets)
                        }
                        if ((array[i]["Request Type"]) == 'Delete User Request') {
                            counterTermination++;
                            $scope.SecurityTickets.push("Delete User Request");
                            console.log($scope.SecurityTickets)
                        }
                        if ((array[i]["Request Type"]) == 'Modify User Request') {
                            counterModifyUser++;
                            $scope.SecurityTickets.push("Modify User Request");
                            console.log($scope.SecurityTickets)
                        }
                        if ((array[i]["Request Type"]) == 'Slab Request') {
                            counterSlab++;
                            $scope.SecurityTickets.push("Special Request");
                            console.log($scope.SecurityTickets)
                        }
                        if ((array[i]["Request Type"]) == 'AWS Request') {
                            counterAWS++;
                            $scope.SecurityTickets.push("Special Request");
                            console.log($scope.SecurityTickets)
                        }
                    } else {
                        console.log("This is false!")
                    }
                }
                if($scope.SecurityTickets.length == 0){
                  console.log("this engineer has no security requests")
                  $scope.SecurityReady = true;
                }
                console.log($scope.SecurityTickets);
                while($scope.SecurityReady == false){

                  if($scope.SecurityTickets.length > 0){
                    $scope.SecurityReady = true;
                  }
                }
}
else if ($rootScope.activeUser.user.Role == 'Manager'){
  console.log("I am Manager")
    var CurrentEngineerInFunc = JSON.parse(AddedEngineer);
  console.log(CurrentEngineerInFunc.Name);
  var firstName = CurrentEngineerInFunc.Name.split(' ')[0];
  for (var i = 0; i < array.length; i++) {

      if ((array[i]["Engineer"])
          .includes(firstName)) {
          counter++;

          if (array[i]["Request Type"] == 'New User Creation Request') {
              counterNewAccount++;
              $scope.SecurityTickets.push("New User Creation Request");
              console.log($scope.SecurityTickets)
          }
          if (((array[i]["Request Type"]) == 'Lab New User Request')) {
              counterNewAST++;
              $scope.SecurityTickets.push("Lab New User Request");
              console.log($scope.SecurityTickets)
          }
          if ((array[i]["Request Type"]) == 'Special Request') {
              counterSpecial++;
              $scope.SecurityTickets.push("Special Request");
              console.log($scope.SecurityTickets)
          }
          if (array[i]["Request Type"] == 'Lab UT Access Request') {
              counterUT4RnD++;
              $scope.SecurityTickets.push("Lab UT Access Request");
              console.log($scope.SecurityTickets)
          }
          if ((array[i]["Request Type"]) == 'Delete User Request') {
              counterTermination++;
              $scope.SecurityTickets.push("Delete User Request");
              console.log($scope.SecurityTickets)
          }
          if ((array[i]["Request Type"]) == 'Modify User Request') {
              counterModifyUser++;
              $scope.SecurityTickets.push("Modify User Request");
              console.log($scope.SecurityTickets)
          }
          if ((array[i]["Request Type"]) == 'Slab Request') {
              counterSlab++;
              $scope.SecurityTickets.push("Special Request");
              console.log($scope.SecurityTickets)
          }
          if ((array[i]["Request Type"]) == 'AWS Request') {
              counterAWS++;
              $scope.SecurityTickets.push("Special Request");
              console.log($scope.SecurityTickets)
          }
      } else {
          console.log("This is false!")
      }
  }
  if($scope.SecurityTickets.length == 0){
    console.log("this engineer has no security requests")
    $scope.SecurityReady = true;
  }
  console.log($scope.SecurityTickets);
  while($scope.SecurityReady == false){

    if($scope.SecurityTickets.length > 0){
      $scope.SecurityReady = true;
    }
  }

}

            });
    };



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
        return n;
    }

    //CurrentMonth Global Variable

    var CurrentUserCurrentMonth = GetMonth($rootScope.activeUser.user.Name);

    function GetScheduleDay(SelectedMonth, SelectedYear, SelectedEngineer) {
      $scope.HoursReady = false;
        // build my object to get the days on queue
        var EngineerInfo = {
            "EngineerList": [SelectedEngineer],
            "Month": SelectedMonth,
            "Year": SelectedYear
        };
        console.log(EngineerInfo);
        $http.post('/GetLiveHours', EngineerInfo)
            .success(function(response) {
                console.log(response);
                // UpdateSchedule(response,SelectedMonth);

                $scope.currentHours = response[0].MonthlyDays;
                while($scope.HoursReady == false){

                  if($scope.currentHours.length > 0){
                    $scope.HoursReady = true;
                  }
                }
            });
    }

    var UpdateSchedule = function(NewSchedule, Month) {
       console.log(NewSchedule)
        $http.get('/Schedule?Engineer=' + $rootScope.activeUser.user.Name + '&Month=' + Month + '')
            .success(function(response) {
                console.log(response);
                if (response.length == 0) {
                    console.log("first time on schedule");

                    $http.post('/Schedule', NewSchedule)
                        .success(function(responseNew) {
                            console.log(responseNew);
                        });
                } else {
                    console.log(response);
                    var ID_temp = response[0]._id;
                    console.log(ID_temp);
                    console.log(NewSchedule);
                    $http.put('/Schedule/' + ID_temp, NewSchedule)
                        .success(function(responseNew) {
                            console.log(responseNew);
                        });
                }
            });

    }
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
    console.log(DatesArray);
    GetScheduleDay(DatesArray[2], DatesArray[3], $rootScope.activeUser.user.Name);


    var Parser = function(array, string, month, engineer) {
        var CatalogItemArray = [];

        for (var i = 0; i < array.length; i++) {
            if ((array[i]["ASSIGNEE_NAME"]) == engineer) {

                if ((array[i]["CLOSE_DATE"])
                    .substring(5, 7) == month) {
                    console.log("Found " + array[i]["TICKET_NUMBER"])

                    if ((array[i]["TICKET_NUMBER"])
                        .charAt(0) == string) {

                        CatalogItemArray.push(array[i]["CATALOG_ITEM"]);
                    }
                }
            }
        }
        return CatalogItemArray;
    }
    //function to retrieve QA
    function getMonthString(month) {
        return new Date(Date.parse(month + " 1, 2012"))
            .getMonth() + 1;
    }



    function UpdateOnDB(kpiData, Month, SelectedEngineer, kpi) {
        var Found = false;
        var firsttimescorecard = true;


        $http.get('/scorecard?Name=' + SelectedEngineer + '', {


            })
            .success(function(response) {


                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;
                console.log(KpiArray);
                var ID_temp = Selectedscorecard[0]._id;

                for (var i = 0; i < KpiArray.length; i++) {
                    if (KpiArray[i].Month == Month) {
                        Found = true;

                        console.log(KpiArray[i])
                        KpiArray[i][kpi] = parseFloat(kpiData)
                            .toFixed(2);

                    }
                }


                if (Found == true) {
                    Selectedscorecard[0].KPIs = KpiArray;
                    console.log(KpiArray);
                    console.log(Selectedscorecard);

                    $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                        .success(function(response) {
                            console.log(response);
                        });
                } else {
                    var NewScoreCard = {

                        "ScComment": " ",
                        "Rank": "0",
                        "Survey": "0",
                        "Resolution": "0",
                        "Qa": "0",
                        "Update": "0",
                        "Ftr": "0",
                        "Sr": "0",
                        "Im": "0",
                        "Month": Month
                    }

                    NewScoreCard[kpi] = kpiData;

                    Selectedscorecard[0].KPIs.push(NewScoreCard);
                    console.log(NewScoreCard);
                    console.log(Selectedscorecard);

                    $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                        .success(function(response) {
                            console.log(response);
                        });

                }
            });
    }


        function UpdateOnDBMulti(kpiData, Month, SelectedEngineer) {



            var Found = false;
            var firsttimescorecard = true;


            $http.get('/scorecard?Name=' + SelectedEngineer + '', {


                })
                .success(function(response) {
                  console.log(SelectedEngineer);

                    var Selectedscorecard = response;
                    console.log('scorecard is  ' + Selectedscorecard);
                    var KpiArray = Selectedscorecard[0].KPIs;
                    console.log(KpiArray);
                    var ID_temp = Selectedscorecard[0]._id;

                    for (var i = 0; i < KpiArray.length; i++) {
                        if (KpiArray[i].Month == Month) {
                            Found = true;


                            KpiArray[i][kpiData[0]] = parseFloat(kpiData[1])
                                .toFixed(2);
                                KpiArray[i][kpiData[2]] = parseFloat(kpiData[3])
                                    .toFixed(2);

                        }
                    }


                    if (Found == true) {
                        Selectedscorecard[0].KPIs = KpiArray;
                        console.log(KpiArray);
                        console.log(Selectedscorecard);

                        $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                            .success(function(response) {
                                console.log(response);
                            });
                    } else {
                        var NewScoreCard = {

                            "ScComment": " ",
                            "Rank": "0",
                            "Survey": "0",
                            "Resolution": "0",
                            "Qa": "0",
                            "Update": "0",
                           "Ftr": "0",
                            "Sr": "0",
                            "Im": "0",
                            "Month": Month
                        }

                        NewScoreCard[kpiData[0]] = parseFloat(kpiData[1])
                            .toFixed(2);
                            NewScoreCard[kpiData[2]] = parseFloat(kpiData[3])
                                .toFixed(2);


                        Selectedscorecard[0].KPIs.push(NewScoreCard);
                        console.log(NewScoreCard);
                        console.log(Selectedscorecard);

                        $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                            .success(function(response) {
                                console.log(response);
                            });

                    }
                });
        }

    $scope.Qa = function() {
      if($rootScope.activeUser.user.Role == "engineer")
      {
        var QaScore = 0;
        var CurrentMonth = GetMonth();
        var config = {
            params: {

                Month: CurrentMonth,
                UserId: $rootScope.activeUser.user.Name
            }
        }
        // get quality audits score
        $http.get('http://15.224.229.39:3001/audit', config)
            .success(function(response) {

                var sumscore = 0;
                var i = 0;
                for (i = 0; i < response.length; i++) {
                    sumscore = parseInt(response[i].Score) + sumscore;
                }
                console.log("Quality audit score " + sumscore)
                QaScore = sumscore / 4;
                UpdateOnDB(QaScore, CurrentMonth, $rootScope.activeUser.user.Name, "Qa");
            });
          }
          else if ($rootScope.activeUser.user.Role == "Manager"){
            for(var i = 0 ; i < $scope.UsersWithEngineerRole.length ; i ++){
            var QaScore = 0;
            var CurrentMonth = GetMonth();
            var config = {
                params: {

                    Month: CurrentMonth,
                    UserId:$scope.UsersWithEngineerRole[i].Name
                }
            }
            // get quality audits score
            $http.get('http://15.224.229.39:3001/audit', config)
                .success(function(response) {

                    var sumscore = 0;
                    var i = 0;
                    for (i = 0; i < response.length; i++) {
                        sumscore = parseInt(response[i].Score) + sumscore;
                    }
                    console.log("Quality audit score " + sumscore)
                    QaScore = sumscore / 4;
                    UpdateOnDB(QaScore, CurrentMonth, $scope.UsersWithEngineerRole[i].Name, "Qa");
                });
          }
        }
    }




    //UpdateOnDB(19,"May","Mohamad Massalha","Sr");
    //function to retrieve Closed tickets Ims
    function getMonthString(month) {
        return new Date(Date.parse(month + " 1, 2012"))
            .getMonth() + 1;
    }

    var CalculateEngineerClosedTickets = function(engineer, array) {

        var NewName = CastName(engineer);
        var EngineerTickets = array.filter(ticket => ticket.ASSIGNEE_NAME == NewName);

        var filteredArray = EngineerTickets.filter(function(item, pos) {
            return EngineerTickets.indexOf(item) == pos;
        });

        console.log(filteredArray);

        var EngineerClosedTickets = $filter('unique')(filteredArray, "TICKET_NUMBER");

        return EngineerClosedTickets;

    }

    var CalculateEngineerFtrAndRes = function(engineer, array) {

    var CurrentMonthInString = GetMonth();
        var Achieved_ftr = 0;
        var Achieved_res = 0;
        var resolved_counter = 0;
        var ftr_counter = 0;
        var NewName = CastName(engineer);
        var EngineerTickets = array.filter(ticket => ticket.ASSIGNEE_NAME == NewName);
        var filteredArray = EngineerTickets.filter(function(item, pos) {
            return EngineerTickets.indexOf(item) == pos;
        });

        console.log(filteredArray);

        //check Ftr or Res Flags

        for (var j = 0 ; j < filteredArray.length ; j++){
           if(filteredArray[j]["ACTIVITY_TYPE"] == "Resolved"){

        if (filteredArray[j]["BREACHED_FLAG"] != "Breached"){
              Achieved_res++;

              }
              resolved_counter ++;
            }
            else if (filteredArray[j]["ACTIVITY_TYPE"] == "First Technical Response" || filteredArray["ACTIVITY_TYPE"] == "FTR - Need More Info" ){
              if (filteredArray[j]["BREACHED_FLAG"] != "Breached"){
                    Achieved_ftr++;

                    }
              ftr_counter++;
            }
        }

        var FtrScore = 0;
        var ResScore = 0;


        if(ftr_counter == 0){
          FtrScore = 0;
        }
        else if (ftr_counter > 0){
        FtrScore =  (Achieved_ftr/ftr_counter);
      }


      if(resolved_counter == 0){
        ResScore = 0;
      }
      else if (resolved_counter > 0){
      ResScore = (Achieved_res/resolved_counter);
    }



        console.log(FtrScore*100 + "%");
        console.log(ResScore*100 + "%");
        $scope.FtrnResReady = true;
        var dataArray = ["Ftr",FtrScore*100,"Resolution",ResScore*100];
      UpdateOnDBMulti(dataArray, CurrentMonthInString,engineer);


    }



    var CalculateRanks = function(ResolvedItems) {

        var sum = 0;
        var j;
        var entry;
        for (var i = 0; i < ResolvedItems.length; i++) {

            for (j = 0; j < $scope.catalogitems.length; j++) {

                entry = $scope.catalogitems[j];

                if (entry.title == ResolvedItems[i]) {
                    console.log(parseFloat(entry.rank) + ' ' + ResolvedItems[i]);
                    sum += parseFloat(entry.rank);

                    break;

                }
            }

            if (j == $scope.catalogitems.length) {
                console.log('unrecognized');
                sum = sum + 2;
            }
        }
        console.log(sum);
        return sum;

    };

    var ImsPerDayfunc = function(days, ResolvedItems) {
        if (days != 0) {
            $scope.IMSPerDay = CalculateRanks(ResolvedItems) / days;
            $scope.totalIms = CalculateRanks(ResolvedItems);
        }
        if (days == 0) {
            $scope.IMSPerDay = 0;
            $scope.totalIms = 0;

        }
    };

    var SrsPerDayfunc = function(days, resolvedItems, securityItems) {
        if (days != 0) {
            console.log(securityItems);
            console.log(days);
            if(securityItems.length == 0){
              console.log("No secuirty");
            $scope.SrSPerDay = CalculateRanks(resolvedItems) / days;
}
else if (securityItems.length > 0){

    $scope.SrSPerDay = (CalculateRanks(resolvedItems) + CalculateRanks(securityItems)) / days;
    console.log($scope.SrSPerDay);
}
        }
        if (days == 0) {
          console.log("Days are 0");
            $scope.SrSPerDay = 0;

        }
    };




    $scope.CalcIms = function(AddedEngineer) {

        //parse month


var DaysOnQueue = 0;
var CurrentMonthInString = GetMonth();
var CurrentEngineersSchedule;
var CurrentMonth = getMonthString(CurrentMonthInString);
  var CurrentEngineer;
    if($rootScope.activeUser.user.Role == 'engineer'){
CurrentEngineer = $rootScope.activeUser.user.Name;
} else if($rootScope.activeUser.user.Role == 'Manager'){
  var CurrentEngineerInFunc = JSON.parse(AddedEngineer);
CurrentEngineer = CurrentEngineerInFunc.Name;
}
$scope.ImsPerDayReady = false;

        //     $http.get('/Schedule?Engineer='+CurrentEngineer+'&Month='+CurrentMonth+'')
        //         .success(function(EngineersSchedule) {
        //             console.log(EngineersSchedule);
        //           CurrentEngineersSchedule =  EngineersSchedule[0].MonthlyDays;
        //           for(var index = 0 ; index < CurrentEngineersSchedule.length ; index ++){
        //             DaysOnQueue = DaysOnQueue + parseFloat(CurrentEngineersSchedule[index].Dispatcher)
        //                  + parseFloat(CurrentEngineersSchedule[index].Support)
        //                 console.log(DaysOnQueue)
        //           }
        //
        // console.log(DaysOnQueue);
        //         });
        console.log($scope.currentHours);

        DaysOnQueue = $scope.currentHours[1].Dispatcher +
            $scope.currentHours[0].Support;
        console.log(DaysOnQueue)

        //cast name
        var engineernamecasted = CastName(CurrentEngineer);

        //get current date
        var DatesArray = GetDate();
        var i = 1;
        var testarray = [];

        //retrieve closed tickets for all engineers
        $http.get('/getclosedtickets')
            .success(function(response) {
                console.log(response)
                for (var i = 0; i < response.length; i++) {

                    if (response[i]["CLOSE_DATE"].substring(5, 7) == CurrentMonth)
                        testarray.push(response[i]);
                }



                var x = CalculateEngineerClosedTickets(CurrentEngineer, testarray);

                var ImArray = Parser(x, 'I', CurrentMonth, CastName(CurrentEngineer));
                //    var SrArray = Parser(x, 'S', CurrentMonth, CastName($rootScope.activeUser.user.Name));
                //calculate IMs per day


                ImsPerDayfunc((DaysOnQueue / 8), ImArray);
                console.log($scope.IMSPerDay);

                while($scope.ImsPerDayReady == false){

                                if($scope.IMSPerDay != null){
                                  $scope.ImsPerDayReady = true;
                                }
                              }
                //update Ims per day on DB, per scorecard
                //  UpdateImsPerDayOnDB($scope.IMSPerDay, SelectedMonth, $rootScope.activeUser.user.Name);
                console.log(CurrentMonthInString);
                UpdateOnDB($scope.IMSPerDay, CurrentMonthInString, CurrentEngineer, "Im")
                //UpdateOnDB($scope.SrSPerDay, CurrentMonthInString, $rootScope.activeUser.user.Name,"Sr")

            });
    }



    $scope.CalcSrs = function(AddedEngineer) {

        console.log("Calc SRs")

        var DaysOnQueue = 0;
        var CurrentMonthInString = GetMonth();
        var CurrentEngineersSchedule;
        var CurrentMonth = getMonthString(CurrentMonthInString);
        var CurrentEngineer;
        if($rootScope.activeUser.user.Role == 'engineer'){
       CurrentEngineer = $rootScope.activeUser.user.Name;

      } else if($rootScope.activeUser.user.Role == 'Manager'){
        console.log(AddedEngineer);
            var CurrentEngineerInFunc = JSON.parse(AddedEngineer);
        CurrentEngineer = CurrentEngineerInFunc.Name;
      }

      $scope.SrSPerDayReady = false;
        //     $http.get('/Schedule?Engineer='+CurrentEngineer+'&Month='+CurrentMonth+'')
        //         .success(function(EngineersSchedule) {
        //             console.log(EngineersSchedule);
        //           CurrentEngineersSchedule =  EngineersSchedule[0].MonthlyDays;
        //           for(var index = 0 ; index < CurrentEngineersSchedule.length ; index ++){
        //             DaysOnQueue = DaysOnQueue + parseFloat(CurrentEngineersSchedule[index].Dispatcher)
        //                  + parseFloat(CurrentEngineersSchedule[index].Support)
        //                 console.log(DaysOnQueue)
        //           }
        //
        // console.log(DaysOnQueue);
        //         });
       console.log($scope.currentHours);

        DaysOnQueue = $scope.currentHours[1].Dispatcher +
            $scope.currentHours[0].Support;
        console.log(DaysOnQueue)

        //cast name
        var engineernamecasted = CastName(CurrentEngineer);

        //get current date
        var DatesArray = GetDate();
        var i = 1;
        var testarray = [];

        //retrieve closed tickets for all engineers
        $http.get('/getclosedtickets')
            .success(function(response) {

                for (var i = 0; i < response.length; i++) {

                    if (response[i]["CLOSE_DATE"].substring(5, 7) == CurrentMonth)
                        testarray.push(response[i]);
                }


                $scope.closedticketsglobal = testarray;
                var x = CalculateEngineerClosedTickets(CurrentEngineer, testarray);

                var SrArray = Parser(x, 'S', CurrentMonth, CastName(CurrentEngineer));
                //calculate IMs per day

                console.log($scope.SecurityTickets);
                  console.log((DaysOnQueue / 8));
                SrsPerDayfunc((DaysOnQueue / 8), SrArray, $scope.SecurityTickets);
                console.log($scope.SrSPerDay);
                while($scope.SrSPerDayReady == false){

                  if($scope.SrSPerDay != null){
                    $scope.SrSPerDayReady = true;
                  }
                }



                //update Ims per day on DB, per scorecard
                //  UpdateImsPerDayOnDB($scope.IMSPerDay, SelectedMonth, $rootScope.activeUser.user.Name);
                console.log(CurrentMonthInString);

                UpdateOnDB($scope.SrSPerDay, CurrentMonthInString, CurrentEngineer, "Sr")

            });
    }




    //function to calculate survey

    //function to calculate SelectedMonth

    //function to calculate FTR + Resultion

    //calulcate SLO
    var ParserIndicators = function(array, string) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]["ticket_number"] == string) {

                if ((array[i]["ticket_number"])
                    .charAt(0) == 'S') {
                    if ((array[i]["slo_name"])
                        .charAt(10) == 'o') {
                        console.log('Target Resolution SLO Breach ' + array[i]["breached_flag"]);
                    }
                    if ((array[i]["slo_name"])
                        .charAt(10) == 'p') {
                        console.log('Target Response SLO Breach ' + array[i]["breached_flag"]);
                    }
                }

                if ((array[i]["ticket_number"])
                    .charAt(0) == 'I') {
                    if ((array[i]["slo_name"])
                        .charAt(0) == 'U') {
                        console.log('Update SLO Breach ' + array[i]["breached_flag"]);
                    }
                    if ((array[i]["slo_name"])
                        .charAt(0) == 'F') {
                        console.log('FTR SLO Breach ' + array[i]["breached_flag"]);
                    }
                    if ((array[i]["slo_name"])
                        .charAt(0) == 'R') {
                        console.log('Target resolution SLO Breach ' + array[i]["breached_flag"]);
                    }
                }

            }
        }
    }

    $scope.updateSlo = function(AddedEngineer) {

        var CurrentEngineer;
          if($rootScope.activeUser.user.Role == 'engineer'){
       CurrentEngineer = $rootScope.activeUser.user.Name;
    } else if($rootScope.activeUser.user.Role == 'Manager'){
      var CurrentEngineerInFunc = JSON.parse(AddedEngineer);
      CurrentEngineer = CurrentEngineerInFunc.Name;
    }
    $scope.UpdateSloReady = false;

        var StringYear = DatesArray[3].toString()
        var CurrentMonthInString = GetMonth();

        var monthOnReport = ( StringYear.substr(2, 3) + "-" + CurrentMonthInString.substr(0, 3))
        console.log(monthOnReport);
        $http.get('/ftpSlo')
            .success(function(response) {
                console.log(response);

                var NewName = CastName(CurrentEngineer);
                var EngineerTickets = response.filter(ticket => ticket.field2 == NewName);
                console.log(EngineerTickets);
                console.log(EngineerTickets[3][monthOnReport]);

                if (EngineerTickets[3][monthOnReport] == "") {
                    console.log("Null")
                    EngineerTickets[3][monthOnReport] = 0;

                    UpdateOnDB(EngineerTickets[3][monthOnReport], CurrentMonthInString, CurrentEngineer, "Update")

                } else {
                    $scope.UpdateSloReady = true;
                    UpdateOnDB(EngineerTickets[3][monthOnReport], CurrentMonthInString, CurrentEngineer, "Update")
                }
            });
    }
    //SLO End


    //Security Start


    //Security End




    //SLO function activation example -->   ParserIndicators(result, 'IM00002989');

    //Security activation example -->      SecurityRequest(result, 'Badir, Kassam');

    //Survey


    var CalcSurvey = function(engineer) {
        var totalsurvey;
        $scope.SurveyReady = false;
        var NewName = CastName(engineer);



        var BadTicketsArray = [];
        var BadTicket = {};
        var ResG = 0;
        var ResB = 0;
        var ProfG = 0;
        var ProfB = 0;
        var OverG = 0;
        var OverB = 0;
        var QualityG = 0;
        var QualityB = 0;
        var TimelinessG = 0;
        var TimelinessB = 0;

        $http.get('/ftpsurvey')
            .success(function(response) {


                for (var i = 0; i < response.length; i++) {
                    if (response[i]["Assignee Name"] == NewName) {


                        switch (response[i]["Question Name"]) {

                            case 'Resolution Timeliness':
                                if (parseInt(response[i]["Answer Rating"]) < 3) {
                                    TimelinessB++;


                                } else {
                                    TimelinessG++
                                }
                                break;

                            case 'Overall Support Experience':
                                if (parseInt(response[i]["Answer Rating"]) < 3) {
                                    OverB++;

                                } else {
                                    OverG++
                                }
                                break;

                            case 'Resolution Quality':
                                if (parseInt(response[i]["Answer Rating"]) < 3) {
                                    QualityB++;

                                } else {
                                    QualityG++
                                }
                                break;

                            case 'Engineer Professionalism':
                                if (parseInt(response[i]["Answer Rating"]) < 3) {

                                    ProfB++;

                                } else {

                                    ProfG++
                                }
                                break;

                            case 'Responsiveness':
                                if (parseInt(response[i]["Answer Rating"]) < 3) {
                                    ResB++;

                                } else {
                                    ResG++
                                }
                                break;
                        }
                    }
                }

                $scope.onesurvey = {
                    "Engineer": NewName,
                    "Month": CurrentUserCurrentMonth,
                    "mysurveys": [{
                        "ResponsivenessB": ResB,
                        "ResponsivenessG": ResG,
                        "OverallG": OverG,
                        "OverallB": OverB,
                        "ProfB": ProfB,
                        "ProfG": ProfG,
                        "QualityG": QualityG,
                        "QualityB": QualityB,
                        "TimelinessG": TimelinessG,
                        "TimelinessB": TimelinessB
                    }]
                };

                $http.post('/onesurvey', $scope.onesurvey)
                    .then(function(response) {


                        var SelectedSurvey = response;



                        var goodscore = (response.data.mysurveys[0]["TimelinessG"] * TimelinessScore) + (response.data.mysurveys[0]["QualityG"] * QualityScore) +
                            (response.data.mysurveys[0]["ProfG"] * ProfessionalismScore) + (response.data.mysurveys[0]["OverallG"] * OverallScore) + (response.data.mysurveys[0]["ResponsivenessG"] * ResponsivenessScore);

                        var badscore = (response.data.mysurveys[0]["TimelinessB"] * TimelinessScore) + (response.data.mysurveys[0]["QualityB"] * QualityScore) +
                            (response.data.mysurveys[0]["ProfB"] * ProfessionalismScore) + (response.data.mysurveys[0]["OverallB"] * OverallScore) + (response.data.mysurveys[0]["ResponsivenessB"] * ResponsivenessScore);



                       var SurveyScore = goodscore / (goodscore + badscore);
                           $scope.SurveyReady = true;
                        UpdateOnDB(SurveyScore * 100, CurrentUserCurrentMonth, engineer, "Survey")

                    });
            });

    }

    $scope.Calculatesurvey = function(AddedEngineer) {

  var CurrentEngineer;
          if($rootScope.activeUser.user.Role == 'engineer'){
       CurrentEngineer = $rootScope.activeUser.user.Name;
    } else if($rootScope.activeUser.user.Role == 'Manager'){
      var CurrentEngineerInFunc = JSON.parse(AddedEngineer);

      CurrentEngineer = CurrentEngineerInFunc.Name;
    }
        CalcSurvey(CurrentEngineer); //  your code here


    }



        $scope.FtrnRes = function (AddedEngineer){


          var CurrentEngineer;
            if($rootScope.activeUser.user.Role == 'engineer'){
              CurrentEngineer = $rootScope.activeUser.user.Name;
            } else if($rootScope.activeUser.user.Role == 'Manager'){
                var CurrentEngineerInFunc = JSON.parse(AddedEngineer);
                        CurrentEngineer = CurrentEngineerInFunc.Name;
                    }
                    $scope.FtrnResReady = false;

                  var CurrentMonthInString = GetMonth();
                  var CurrentEngineersSchedule;
                 var CurrentMonth = getMonthString(CurrentMonthInString);



                  //cast name
                  var engineernamecasted = CastName(CurrentEngineer);

                  //get current date
                  var DatesArray = GetDate();
                  var i = 1;
                  var testarray = [];

                  //retrieve closed tickets for all engineers
                  $http.get('/getclosedtickets')
                      .success(function(response) {

                          for (var i = 0; i < response.length; i++) {

                              if (response[i]["CLOSE_DATE"].substring(5, 7) == CurrentMonth)
                                  testarray.push(response[i]);
                          }


                          console.log("****  "+CurrentEngineer);
                           CalculateEngineerFtrAndRes(CurrentEngineer, testarray);



                          //UpdateOnDB($scope.SrSPerDay, CurrentMonthInString, $rootScope.activeUser.user.Name,"Sr")

                      });
        }



        }]);
