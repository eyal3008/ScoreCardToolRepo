'use strict';
MainApp.controller('YearlyController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {


    if ($rootScope.activeUser.user.Role == 'engineer') {
        $http.get('/scorecard?Name=' + $rootScope.activeUser.user.Name + '', {})
            .success(function(response) {


                //var temp_survey;
                var ftr_avg = 0;
                var slo_avg = 0;
                var survey_avg = 0;
                var qa_avg = 0;
                var res_avg = 0;


                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;

                console.log("len " + KpiArray.length);
                for (var i = 0; i < KpiArray.length; i++) {
                    im_score[i] = parseInt(KpiArray[i].Im);
                    sr_score[i] = parseInt(KpiArray[i].Sr);

                    surveys_score[i] = parseFloat(KpiArray[i].Survey);
                    survey_avg += surveys_score[i];

                    resolution_score[i] = parseFloat(KpiArray[i].Resolution);
                    res_avg += resolution_score[i];

                    qa_score[i] = parseFloat(KpiArray[i].Qa);
                    qa_avg += qa_score[i];



                    rank[i] = KpiArray[i].Rank;

                    ftr_score[i] = parseFloat(KpiArray[i].Ftr);
                    ftr_avg += ftr_score[i];



                    slo_score[i] = parseFloat(KpiArray[i].Update);
                    slo_avg += slo_score[i];



                }

                $scope.IM_data = [im_score, SocAverage, Max];
                $scope.SR_data = [sr_score, SocAverage, Max];
                $scope.surveys_data = [surveys_score, SocAverage, Surveys_goal];
                $scope.Res_data = [resolution_score, SocAverage, Res_goal];
                $scope.QA_data = [qa_score, SocAverage, QA_goal];
                $scope.rank_data = [rank];
                $scope.ftr_data = [ftr_score, SocAverage, ftr_goal];
                $scope.ftr_data = [ftr_score, SocAverage, ftr_goal];
                $scope.slo_data = [slo_score, SocAverage, slo_goal];


                status[0] = survey_avg / KpiArray.length;
                status[1] = res_avg / KpiArray.length;
                status[2] = qa_avg / KpiArray.length;
                status[3] = ftr_avg / KpiArray.length;
                status[4] = slo_avg / KpiArray.length;
                $scope.status_data = [status, status_goal];

                console.log("status arr is " + status);
            });
    }

    // for the status chart
    $scope.datasetOverride = [
        {
            label: "KPIs",
            borderWidth: 1,
            type: 'bar'
     },
        {
            label: "Goal",
            borderWidth: 3,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            type: 'line'
     }
   ];

    $scope.Options = {
        title: {
            display: true
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };

    $scope.IM_Options = {
        title: {
            display: true,
            text: 'IMs Per day'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false

    };
    // the options for the SR per day chart
    $scope.SR_Options = {
        title: {
            display: true,
            text: 'SRs Per day'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.Surveys_Options = {
        title: {
            display: true,
            text: 'Surveys'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.days_Options = {
        title: {
            display: true,
            text: 'Days In Q'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.Res_Options = {
        title: {
            display: true,
            text: 'Resolution'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false // to the chart resize
    };
    $scope.QA_Options = {
        title: {
            display: true,
            text: 'Quality Audit'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.Total_Options = {
        title: {
            display: true,
            text: 'Total Score'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.FTR_Options = {
        title: {
            display: true,
            text: 'FTR'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.SLO_Options = {
        title: {
            display: true,
            text: 'Update SLO'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.status_Options = {
        title: {
            display: true,
            text: 'Current Status'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    $scope.target_Options = {
        title: {
            display: true,
            text: 'The Target'
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
         }]
        },
        responsive: true,
        maintainAspectRatio: false
    };


    $scope.Rank_Options = {
        title: {
            display: true,
            text: 'Rank'
        },
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    reverse: true,
                },
                display: true,

     }]
        },
        elements: {
            line: {
                fill: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    /***************************************************************************
    /*                      Initial data for the Engneer Score
    /*****************************************************************************/
    var score = [65, 100, 80, 45, 100, 55, 40, 0, 0, 0, 0, 0];
    var im_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var resolution_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var surveys_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var qa_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var rank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ftr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var slo_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var status = [0, 0, 0, 0, 0, 0];


    /***************************************************************************
    /*                      Function to be build:
    /* the MAx Score and the Average score Yearly
    /*****************************************************************************/
    var Max = [100, 150, 130, 90, 200, 85, 70, 0, 0, 0, 0, 0];
    var SocAverage = [80, 120, 100, 80, 140, 70, 60, 0, 0, 0, 0, 0];

    /***************************************************************************
    /*                   Read the goals - need to be from the DB
    /*****************************************************************************/

    var Surveys_goal = [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95];
    var Res_goal = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90];
    var QA_goal = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90];
    var total_goal = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90];
    var ftr_goal = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90];
    var slo_goal = [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85];


    var status_goal = [95, 90, 90, 90, 85, 90]; // the target
    $scope.target = [95, 90, 90, 90, 85, 90];

    var days = [10, 20, 20, 10, 15, 24, 24, 20, 12, 0, 0, 0];
    var SocInQ = [20, 25, 25, 24, 23, 22, 24, 25, 15, 0, 0, 0];
    $scope.colors = ['#45b7cd', '#ff6384', '#1835CA'];
    $scope.labels = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November"]; // the months
    $scope.KPIs_labels = ["Surveys", "Resolution", "Quality Audit", "FTR", "SLO", "Total Score"];


    $scope.series = ['Engineer Score', 'SOC Average', 'Max']; // include the max score
    $scope.series_1 = ['Engineer Score', 'SOC Average', 'Goal']; // include the goal
    $scope.rank_series = ['Engineer Score']; // include the max score
    $scope.KPIs = ['Surveys', 'Resolution', 'Quality Audit', 'FTR', 'SLO', 'Total Score'];
    $scope.days = ['Engineer SCore ', 'SOC Average '];
    $scope.status_data = [status, status_goal];
    $scope.IM_data = [im_score, SocAverage, Max];
    $scope.SR_data = [sr_score, SocAverage, Max];
    $scope.Res_data = [resolution_score, SocAverage, Res_goal];
    $scope.surveys_data = [surveys_score, SocAverage, Surveys_goal];
    $scope.QA_data = [qa_score, SocAverage, QA_goal];
    $scope.Total_data = [score, SocAverage, total_goal];
    $scope.ftr_data = [ftr_score, SocAverage, ftr_goal];
    $scope.slo_data = [slo_score, SocAverage, slo_goal];
    $scope.rank_data = [rank];
    $scope.days_data = [days, SocInQ];

    /***************************************************************************
    /*                      The Function section
    /*****************************************************************************/

    /***************************************************************************
    /*      Get the Engineer list from the user database
    /*****************************************************************************/
    $http.get('/user')
        .success(function(data) {

            $scope.engineerslist = data;
            //$scope.question = "";
        });

    $scope.getYearlyReprots = function(SelectedEngineer) {
        if ($rootScope.activeUser.user.Role != "engineer") {

            var CurrentEngineer = JSON.parse(SelectedEngineer);
            $http.get('/scorecard?Name=' + CurrentEngineer.Name + '', {})
                .success(function(response) {

                    //var temp_survey;
                    var ftr_avg = 0;
                    var slo_avg = 0;
                    var survey_avg = 0;
                    var qa_avg = 0;
                    var res_avg = 0;


                    var Selectedscorecard = response;
                    console.log('scorecard is  ' + Selectedscorecard);
                    var KpiArray = Selectedscorecard[0].KPIs;

                    console.log("len " + KpiArray.length);
                    for (var i = 0; i < KpiArray.length; i++) {
                        im_score[i] = parseInt(KpiArray[i].Im);
                        sr_score[i] = parseInt(KpiArray[i].Sr);

                        surveys_score[i] = parseFloat(KpiArray[i].Survey);
                        survey_avg += surveys_score[i];

                        resolution_score[i] = parseFloat(KpiArray[i].Resolution);
                        res_avg += resolution_score[i];

                        qa_score[i] = parseFloat(KpiArray[i].Qa);
                        qa_avg += qa_score[i];



                        rank[i] = KpiArray[i].Rank;

                        ftr_score[i] = parseFloat(KpiArray[i].Ftr);
                        ftr_avg += ftr_score[i];



                        slo_score[i] = parseFloat(KpiArray[i].Update);
                        slo_avg += slo_score[i];



                    }

                    $scope.IM_data = [im_score, SocAverage, Max];
                    $scope.SR_data = [sr_score, SocAverage, Max];
                    $scope.surveys_data = [surveys_score, SocAverage, Surveys_goal];
                    $scope.Res_data = [resolution_score, SocAverage, Res_goal];
                    $scope.QA_data = [qa_score, SocAverage, QA_goal];
                    $scope.rank_data = [rank];
                    $scope.ftr_data = [ftr_score, SocAverage, ftr_goal];
                    $scope.ftr_data = [ftr_score, SocAverage, ftr_goal];
                    $scope.slo_data = [slo_score, SocAverage, slo_goal];


                    status[0] = survey_avg / KpiArray.length;
                    status[1] = res_avg / KpiArray.length;
                    status[2] = qa_avg / KpiArray.length;
                    status[3] = ftr_avg / KpiArray.length;
                    status[4] = slo_avg / KpiArray.length;
                    $scope.status_data = [status, status_goal];

                    console.log("status arr is " + status);
                });

        }
    }
    /***************************************************************************
    /*      Calc the status average according to the KpiArray.length
    /*****************************************************************************/




    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };



}]);
