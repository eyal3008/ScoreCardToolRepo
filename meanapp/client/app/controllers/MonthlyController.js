'use strict';

MainApp.controller('MonthlyController', ['$scope', '$rootScope', '$location', '$http', '$filter', function($scope, $rootScope, $location, $http, $filter) {

    var ResponsivenessScore = 20;
    var QualityScore = 15;
    var TimelinessScore = 15;
    var OverallScore = 30;
    var ProfessionalismScore = 20;

    $http.get('catalogitem')
        .success(function(response) {
            $scope.catalogitems = response;
        });


    //*********************************************************REview Graph- Redar chart*****************************************************//
    $scope.labels = ["IMs", "SRs", "QA", "Resolution", "update SLO", "FTR", "Survey"];
    var engineer = ["0", "0", "0", "0", "0", "0", "0"];
    var soc_avg = ["100", "100", "100", "100", "100", "100", "100"];
    var max = ["100", "100", "100", "100", "100", "100", "100"];
    $scope.data = [engineer, soc_avg, max];
    $scope.series = ["Engineer", "SOC Average", "MAX"];

    //***************************IMS per month bar chart : Constant data ********************

    $scope.IM_labels = ["Your Score", "SOC Average", "MAX Score"];
    $scope.colors = ["#46BFBD", "#f44e42", "#0bb884", "#FDB45C", "#00ADF9"];
    $scope.colors1 = ["#4169E1", "#8b0000", "#B8860B"];
    $scope.colors2 = ["#ffd39b", "#8b3a62", "#B8860B"];
    $scope.colors3 = ["#d3d3d3", "#97ffff", "#2f4f4f"];
    $scope.survey_col = ["#3CB371", "#FF0000"];
    $scope.status_color = ["#0000FF", "#800000"];

    $scope.Options = {
        title: {
            display: true

        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
       }],
            xAxes: [{
                ticks: {
                    fontColor: "black",

                    fontSize: 12

                }
             }]
        },
        height: "300px",
        responsive: true,
        maintainAspectRatio: false
    };

    $scope.Survey_Options = {
        title: {
            display: false

        },
        legend: {
            display: true,
            position: "bottom"
        },
        //height: auto,
        responsive: true,
        maintainAspectRatio: false
    };

    $scope.Status_Options = {
        title: {
            display: false

        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
       }],
            xAxes: [{
                ticks: {
                    fontColor: "black",

                    fontSize: 12

                }
           }]
        },
        //height: auto,
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.Spider_Options = {
        title: {
            display: false

        },
        legend: {
            display: false
        },
        responsive: true,
      //  height: auto,
        maintainAspectRatio: false
    };


    //******************* Initial Data **********************************************************

    //**************************************************************************
    var professionalism = 100;
    var responsiveness = 100;
    var resolution_quality = 100;
    var resolution_time = 100;
    var experience = 100;

    $scope.professionalism = professionalism;
    $scope.responsiveness = responsiveness;
    $scope.resolution_quality = resolution_quality;
    $scope.resolution_time = resolution_time;
    $scope.experience = experience;

    $scope.survey_data = [professionalism, responsiveness, resolution_quality, resolution_time, experience];
    $scope.survey_labels = ["Profession", "Responsive", "Quality", "Timelinees", "Experience "];
    //$scope.survey_series=[];

    $scope.labels_survey = ["Good Surveys", "Bad Surveys"];
    $scope.data_survey = [10, 2];
    $scope.labels_schedule = ["You", "SOC Average"];
    $scope.data_schedule = [20, 13];
    $scope.IM_data = [50, 50, 50];
    $scope.rank = 0;
    $scope.SR_data = [50, 50, 50];
    $scope.qa_data = [100, 100, 100];
    $scope.ftr_data = [100, 100, 100];
    $scope.updateslo_data = [100, 100, 100];
    $scope.resolution_data = [100, 100, 100];
    $scope.scorecardScore = 100;
    //$scope.status_data =
        //**************************************************************************************************************//
        $scope.ReadyScorecard = {};
    $scope.Months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];


//get list of the users from DB.
    $http.get('/user')
        .success(function(data) {

            $scope.engineerslist = data;

        });

//function to round a number
    function round(num) {
        return Math.floor(num * 10) / 10;
    }
    //============================== Refresh ===================================
    var refresh = function() {
        $http.get('/1on1')
            .success(function(response) {
                $scope.oneonone = response;
            });
    };

    //============================== Calculate Ranks Per Catalog ===============


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


    //============================== Calculate Ims Per Day =====================


    var ImsPerDayfunc = function(days, ResolvedItems) {

        $scope.IMSPerDay = CalculateRanks(ResolvedItems) / days;
        $scope.totalIms = CalculateRanks(ResolvedItems);
    };

    //============================== Calculate SRs Per Day =====================

    var SrsPerDayfunc = function(days, resolvedItems, securityItems) {
        $scope.SrSPerDay = (CalculateRanks(resolvedItems) + CalculateRanks(securityItems)) / days;

    };

    //============================== Calculate surveys =====================

    var CalculteSurvey = function(Month, User) {

        $http.get('/onesurvey?Engineer=' + User + '&Month=' + Month + '')
            .success(function(response) {
                console.log(response);

            });
    }

    //============================== Function to retrieve the monthly scorecard of an engineer =====================

    $scope.LookUp = function(SelectedEngineer, SelectedMonth) {

//


        var CurrentEngineer = JSON.parse(SelectedEngineer);

        getMaxScore(SelectedMonth);
        getAvgScore(SelectedMonth);

        $http.get('/scorecard?Name=' + CurrentEngineer.Name + '', {})
            .success(function(response) {

                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;

                for (var i = 0; i < KpiArray.length; i++) {

                    if (KpiArray[i].Month == SelectedMonth) {

                        $scope.ftr = KpiArray[i].Ftr;
                        $scope.survey = parseFloat(KpiArray[i].Survey)*100;
                        $scope.ims = KpiArray[i].Im;
                        $scope.srs = KpiArray[i].Sr;
                        $scope.qa = KpiArray[i].Qa;
                        $scope.resolution = KpiArray[i].Resolution;
                        $scope.rank = KpiArray[i].Rank;
                        $scope.updateslo = KpiArray[i].Update;

                        var im_score = parseInt($scope.ims);
                        var sr_score = parseInt($scope.srs);
                        var res_score = parseFloat($scope.resolution);
                        var updateslo_score = parseFloat($scope.updateslo);
                        var ftr_score = parseFloat($scope.ftr);
                        var survey_score = ($scope.survey);

                        $scope.ftr = ftr_score;
                        $scope.updateslo = updateslo_score;
                        $scope.resolution = res_score;

                        console.log('ftr ' + ftr_score);
                        var qa_score = $scope.qa;


                        console.log("getting data");
                        // data for the charts
                        $scope.IM_data = [im_score, $scope.avgIm, $scope.maxIm];
                        $scope.SR_data = [sr_score, $scope.avgSr, $scope.maxSr];
                        $scope.qa_data = [qa_score, $scope.avgQA, $scope.maxQA];
                        $scope.ftr_data = [ftr_score, $scope.avgFtr, $scope.maxFtr];
                        $scope.updateslo_data = [updateslo_score, $scope.avgUpdateSlo, $scope.maxUpdateSlo];
                        $scope.resolution_data = [res_score, $scope.avgResolution, $scope.maxResolution];

                      // for the status charts :
                        engineer = [im_score, sr_score, qa_score, res_score, updateslo_score, ftr_score, survey_score];
                        console.log("the status is " + engineer);
                        $scope.maxstatus = [$scope.maxIm, $scope.maxSr, $scope.maxQA, $scope.maxResolution, $scope.maxUpdateSlo, $scope.maxFtr, 100];
                        $scope.avgstatus = [$scope.avgIm, $scope.avgSr, $scope.avgQA, $scope.avgResolution, $scope.avgUpdateSlo, $scope.avgFtr, 100];

                        $scope.data = [engineer, $scope.avgstatus, $scope.maxstatus];// data to the charts


                    }
                }
            });

    }

    //============================== Calculate Max Score =====================

    var getMaxScore = function(month) {
        $http.get('/maxscore?Month=' + month + '')
            .success(function(response) {

                console.log("get max score function ");
                var selectmaxscore = response;
                console.log(selectmaxscore);
                $scope.maxIm = parseFloat(selectmaxscore[0].maxIm.score);
                console.log($scope.maxIm);
                $scope.maxSr = parseFloat(selectmaxscore[0].maxSr.score);
                $scope.maxQA = parseFloat(selectmaxscore[0].maxQA.score);
                $scope.maxFtr = parseFloat(selectmaxscore[0].maxFtr.score) * 100;
                $scope.maxUpdateSlo = parseFloat(selectmaxscore[0].maxUpdataSlo.score) * 100;
                $scope.maxResolution = parseFloat(selectmaxscore[0].maxResolution.score) * 100;


            });
    }

        //============================== Calculate Average Score =====================
    var getAvgScore = function(month) {
        $http.get('/averagescore?Month=' + month + '', {})
            .success(function(response) {

                console.log("get avg score function ");
                var selectavgscore = response;
                console.log(selectavgscore);
                var avgKpi = selectavgscore[0].AverageScore;
                console.log(avgKpi);
                $scope.avgIm = parseFloat(avgKpi[0].Im);
                $scope.avgSr = parseFloat(avgKpi[0].Sr);
                $scope.avgQA = parseFloat(avgKpi[0].Qa);
                $scope.avgResolution = parseFloat(avgKpi[0].Resolution);
                $scope.avgFtr = parseFloat(avgKpi[0].Ftr) ;
                $scope.avgUpdateSlo = parseFloat(avgKpi[0].Update);
                $scope.avgSurvey = parseFloat(avgKpi[0].Survey) ;



            });
    }




    /*********************************************************************
     *
     *
     *
     *********************************************************************/

    $scope.LookUpEngineer = function(SelectedMonth) {

        //  CalculteSurvey("May","Mohamad Massalha");

        console.log("im here ");


        //  var CurrentEngineer =$rootScope.activeUser.user.Name;
        console.log($rootScope.activeUser.user.Name);
        $http.get('/scorecard?Name=' + $rootScope.activeUser.user.Name + '', {})
            .success(function(response) {

                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;

                for (var i = 0; i < KpiArray.length; i++) {

                    if (KpiArray[i].Month == SelectedMonth) {

                        $scope.ftr = KpiArray[i].Ftr;
                        $scope.survey = KpiArray[i].Survey;
                        $scope.ims = KpiArray[i].Im;
                        $scope.srs = KpiArray[i].Sr;
                        $scope.qa = KpiArray[i].Qa;
                        $scope.resolution = KpiArray[i].Resolution;
                        $scope.rank = KpiArray[i].Rank;
                        $scope.updateslo = KpiArray[i].Update;

                        var im_score = parseFloat($scope.ims);
                        var sr_score = parseFloat($scope.srs);
                        var res_score = parseFloat($scope.resolution);
                        var updateslo_score = parseFloat($scope.updateslo);
                        var ftr_score = parseFloat($scope.ftr);
                        var survey_score = parseFloat($scope.survey);
                        $scope.survey = survey_score;

                        $scope.ftr = ftr_score;
                        $scope.updateslo = updateslo_score;
                        $scope.resolution = res_score;

                        var qa_score = $scope.qa;
                        var im_avg = 80;
                        var Max = 100;
                        var sr_avg = 100;
                        var max_sr = 120;


                        console.log("getting data");
                        $scope.IM_data = [im_score, im_avg, $scope.maxIm];
                        $scope.SR_data = [sr_score, sr_avg, $scope.maxSr];
                        $scope.qa_data = [qa_score, 95, $scope.maxQA];
                        $scope.ftr_data = [ftr_score, 90, $scope.maxFtr];
                        $scope.updateslo_data = [updateslo_score, 90, $scope.maxUpdataSlo];
                        $scope.resolution_data = [res_score, 90, $scope.maxResolution];
                        console.log("ok");
                        engineer = [im_score, sr_score, qa_score, res_score, updateslo_score, ftr_score, survey_score];
                        console.log("the status is " + engineer);
                        $scope.maxstatus = [$scope.maxIm, $scope.maxSr, $scope.maxQA, $scope.maxResolutio, $scope.maxUpdataSlo, $scope.maxFtr, 100];
                        $scope.data = [engineer, soc_avg, $scope.maxstatus];



                    }
                }
            });

    }


  //=== function to cast the name from Mohamad Massalha to mohamad.massalha =========
    var CastName = function(Name) {
        var name = Name.split(' ');
        var NewName = (name[0] + '.' + name[1]);
        return NewName.toLowerCase();

    }

//=========== Main Calculate Function =================
// 1) Calculates survey for engineer
// 2) Calculates QA
// 3) Calculates Closed tickets per engineer
    $scope.Calculate = function(Engineer, Month) {

        var eng = JSON.parse(Engineer);
        console.log(CastName(eng.Name));
        var CurrentEngineer = CastName(eng.Name);
        console.log(CurrentEngineer + ' ' + Month);
        //
        // $http.get('/onesurvey?Engineer=' + CurrentEngineer + '&Month=' + Month + '')
        //     .success(function(response) {
        //         var SelectedSurvey = response[0];
        //
        //
        //
        //         var goodscore = (response[0].mysurveys[0]["TimelinessG"] * TimelinessScore) + (response[0].mysurveys[0]["QualityG"] * QualityScore) +
        //             (response[0].mysurveys[0]["ProfG"] * ProfessionalismScore) + (response[0].mysurveys[0]["OverallG"] * OverallScore) + (response[0].mysurveys[0]["ResponsivenessG"] * ResponsivenessScore);
        //
        //         var badscore = (response[0].mysurveys[0]["TimelinessB"] * TimelinessScore) + (response[0].mysurveys[0]["QualityB"] * QualityScore) +
        //             (response[0].mysurveys[0]["ProfB"] * ProfessionalismScore) + (response[0].mysurveys[0]["OverallB"] * OverallScore) + (response[0].mysurveys[0]["ResponsivenessB"] * ResponsivenessScore);
        //
        //
        //
        //         var SurveyScore = goodscore / (goodscore + badscore);
        //
        //         console.log(goodscore);
        //         console.log(badscore);
        //         console.log(SurveyScore);
        //
        //     });
        $scope.IMSPerDay = 0;
        $scope.SrSPerDay = 0;

        var config = {
            params: {

                Month: Month,
                UserId: eng.Name
            }
        }
        console.log(Month + " " + eng.Name)

        // get quality audits score
        $http.get('http://15.224.229.39:3001/audit', config)
            .success(function(response) {
              console.log(response)
                var sumscore = 0;
                var i = 0;
                for (i = 0; i < response.length; i++) {
                    sumscore = parseInt(response[i].Score) + sumscore;
                }
                console.log("Quality audit score " + sumscore)

            });
            //calculates closed tickets
      //  CalcPerEngineer(eng.Name);
    }



      //========update the monthly scorecard for one engineer in a specific month ====
    var UpdateScoreCard = function(SelectedEngineer, newScoreCard) {



        var CurrentEngineer = JSON.parse(SelectedEngineer);

        $http.get('/scorecard?Name=' + CurrentEngineer.Name + '', {


            })
            .success(function(response) {
                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;
                console.log(KpiArray);
                var ID_temp = Selectedscorecard[0]._id;

                KpiArray.push(newScoreCard);

                Selectedscorecard[0].KPIs = KpiArray;


                $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                    .success(function(response) {
                        console.log(response);
                    });

            });
    }

//=========== helper function to parse excel files ==========
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


    //=========== returns calculated closed tickets per engineer =========
    var CalcPerEngineer = function(engineer, array) {
        var NewName = CastName(engineer);
        var EngineerTickets = array.filter(ticket => ticket.ASSIGNEE_NAME == NewName);

        var filteredArray = EngineerTickets.filter(function(item, pos) {
            return EngineerTickets.indexOf(item) == pos;
        });

        console.log(filteredArray);

        var EngineerClosedTickets = $filter('unique')(filteredArray, "TICKET_NUMBER");

        // console.log(KassamArray);

        // var NewName = CastName(engineer);
        // var Monthnow = "10";
        // console.log(NewName);
        //   $http.get('/Ticket?ASSIGNEE_NAME='+NewName+'&'+'CLOSE_DATE__regex=/^'+ Monthnow +'/i').success(function(response) {
        //
        // console.log(response);
        // console.log(response.length);
        //
        //
        // var ImArray =  Parser(response, 'I', '10', NewName);
        //
        // ImsPerDayfunc(10, ImArray);
        //  console.log(NewName + " " + $scope.IMSPerDay);
        //
        //   });
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

        var NewName = CastName(engineer);
        var EngineerTickets = array.filter(ticket => ticket.ASSIGNEE_NAME == NewName);

        var filteredArray = EngineerTickets.filter(function(item, pos) {
            return EngineerTickets.indexOf(item) == pos;
        });

        console.log(filteredArray);

        // var EngineerClosedTickets = $filter('unique')(filteredArray, "TICKET_NUMBER");
  var EngineerFTR = EngineerClosedTickets.filter(ticket => ticket.ACTIVITY_TYPE == "First Technical Response");
  var EngineerResolution = EngineerClosedTickets.filter(ticket => ticket.ACTIVITY_TYPE == "Resolved");

//need to go over the array and check if breached or not.

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



    function getMonthString(month) {
        return new Date(Date.parse(month + " 1, 2012"))
            .getMonth() + 1;
    }

    function GetTimeZone(Engineer) {

        $http.get('user?Name' + Engineer + '')
            .success(function(response) {
                console.log(response);
            });
    }





//======== Main function to calulcate scorecard of an engineer ==========
// 1) Calculates survey for engineer
// 2) Calculates QA
// 3) Calculates Closed tickets per engineer
    $scope.calculatePerDay = function(AddedEngineer, SelectedMonth) {

        //parse month
        var CurrentEngineersSchedule;
        var CurrentMonth = getMonthString(SelectedMonth);
        var CurrentEngineer = JSON.parse(AddedEngineer);

        $http.get('/Schedule?Engineer='+CurrentEngineer.Name+'&Month='+CurrentMonth+'')
            .success(function(EngineersSchedule) {
                console.log(EngineersSchedule);
                CurrentEngineersSchedule[0].MonthlyDays = EngineersSchedule;
    console.log(EngineersSchedule);
            });
        //cast name
        var engineernamecasted = CastName(CurrentEngineer.Name);

        //get current date
        var DatesArray = GetDate();
        var i = 1;
        var testarray = [];

        //retrieve closed tickets for all engineers
        $http.get('/getclosedtickets')
            .success(function(response) {
                console.log(response)
                console.log(response[0]["CLOSE_DATE"].substring(5, 7));
                for (var i = 0; i < response.length; i++) {

                    if (response[i]["CLOSE_DATE"].substring(5, 7) == CurrentMonth)
                        testarray.push(response[i]);
                }
                console.log(testarray.length);

                for (var m = 0; m < $scope.engineerslist.length; m++) {
                    console.log($scope.engineerslist[m].Name);
                    var x = CalculateEngineerClosedTickets($scope.engineerslist[m].Name, testarray);
                    console.log(x);
                    var ImArray = Parser(x, 'I', CurrentMonth, CastName($scope.engineerslist[m].Name));

                    //calculate IMs per day


                    ImsPerDayfunc(18.31, ImArray);
                    console.log(+" " + $scope.IMSPerDay);

                    //update Ims per day on DB, per scorecard
                    UpdateImsPerDayOnDB($scope.IMSPerDay, SelectedMonth, $scope.engineerslist[m].Name);
                }
            });
    }

    //============== function to update the ims per day on a specific scorecard
    function UpdateImsPerDayOnDB(Imsperday, Month, SelectedEngineer) {
var Found = false;


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
                        KpiArray[i].Im = parseFloat(Imsperday)
                            .toFixed(2);
                    }
                }
if (Found == true)
{
                Selectedscorecard[0].KPIs = KpiArray;
                console.log(KpiArray);
                console.log(Selectedscorecard);

                $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                    .success(function(response) {
                        console.log(response);
                    });
}
else{
  Selectedscorecard[0].KPIs = KpiArray;
  console.log(KpiArray);
  console.log(Selectedscorecard);

  $http.post('/scorecard', Selectedscorecard[0])
      .success(function(response) {
          console.log(response);
      });

}
            });
    }
        }]);
