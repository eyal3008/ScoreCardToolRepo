'use strict';
MainApp.controller('SurveysController', ['$scope', '$http', function($scope, $http) {

    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    var ResponsivenessScore = 20;
    var QualityScore = 15;
    var TimelinessScore = 15;
    var OverallScore = 30;
    var ProfessionalismScore = 20;

    var refresh = function() {
        $http.get('/Surveys')
            .success(function(response) {

                $scope.SurveysList = response;
                console.log(JSON.stringify($scope.SurveysList));
                //$scope.SecurityRequest =   $scope.SecurityRequestList[0];
            });
    };

    refresh();

    $scope.SubmitSurvey = function() {
        console.log($scope.FormUser);
        // var obj ={"Email":$scope.FormUser.Email, "Login":$scope.FormUser.Login, "Password":$scope.FormUser.Password, "PositionName":$scope.FormUser.PositionName, "RequestType":$scope.FormUser.RequestType};

        $http.post('/Surveys', $scope.FormUser)
            .success(function(response) {
                console.log(response);
                // $scope.FormUser = "";


                if ($scope.FormUser.Cause == "Engineer's actions") {
                    console.log("No changes to be made");
                    console.log($scope.FormUser);
                }
                // else if (true) {}
                else {

                    // for (var i = 0 ; i < affectedEngineers.length; i++){
                    //
                    // }
                    var affectedEngineers = $scope.FormUser.Engineer.split(';');
                    console.log(affectedEngineers);
                    console.log("Changes must be made");
                    var SelectedMonth = monthNames[$scope.FormUser.TicketClosureDate.getMonth()];
                    console.log(SelectedMonth);
                    for (var i = 0; i < affectedEngineers.length; i++) {

                        $http.get('onesurvey?Engineer=' + affectedEngineers[i] + '&Month=' + SelectedMonth + '')
                            .success(function(response) {
                                $scope.engineerSurvey = response[0];

                                console.log($scope.engineerSurvey.mysurveys[0].OverallB);
                                var engineerId = $scope.engineerSurvey._id;
                                console.log(engineerId);
                                $scope.updateEngineerSurvey = $scope.engineerSurvey;

                                if ($scope.FormUser.OverallSupportExperience < 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].OverallB--;
                                } else if ($scope.FormUser.OverallSupportExperience >= 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].OverallG--;
                                }

                                if ($scope.FormUser.ResolutionQuality < 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].QualityB--;
                                } else if ($scope.FormUser.ResolutionQuality >= 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].QualityG--;
                                }

                                if ($scope.FormUser.EngineerProfessionalism < 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].ProfB--;
                                } else if ($scope.FormUser.EngineerProfessionalism >= 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].ProfG--;
                                }

                                if ($scope.FormUser.Responsiveness < 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].ResponsivenessB--;
                                } else if ($scope.FormUser.Responsiveness >= 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].ResponsivenessG--;
                                }

                                if ($scope.FormUser.ResolutionTimeliness < 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].TimelinessB--;
                                } else if ($scope.FormUser.ResolutionTimeliness >= 3) {
                                    $scope.updateEngineerSurvey.mysurveys[0].TimelinessG--;
                                }

                                console.log($scope.updateEngineerSurvey);
                                $http.put('/onesurvey/' + engineerId, $scope.updateEngineerSurvey)
                                    .success(function(response) {

                                        var goodscore = (response.mysurveys[0].TimelinessG * TimelinessScore) + (response.mysurveys[0].QualityG * QualityScore) + (response.mysurveys[0].ProfG * ProfessionalismScore) + (response.mysurveys[0].OverallG * OverallScore) + (response.mysurveys[0].ResponsivenessG * ResponsivenessScore);
                                        var badscore = (response.mysurveys[0].TimelinessB * TimelinessScore) + (response.mysurveys[0].QualityB * QualityScore) + (response.mysurveys[0].ProfB * ProfessionalismScore) + (response.mysurveys[0].OverallB * OverallScore) + (response.mysurveys[0].ResponsivenessB * ResponsivenessScore);

                                        var SurveyScore = goodscore / (goodscore + badscore);

                                        console.log(affectedEngineers[i]);



                                        var temp = affectedEngineers[i].split(".");
                                        var newName = (temp[0] + " " + temp[1]);
                                        console.log(newName);

                                        $http.get('/scorecard?Name=' + newName + '', {


                                            })
                                            .success(function(response) {
                                                var Selectedscorecard = response;
                                                console.log('scorecard is  ' + Selectedscorecard);
                                                var KpiArray = Selectedscorecard[0].KPIs;
                                                console.log(KpiArray);
                                                var ID_temp = Selectedscorecard[0]._id;

                                                for (var i = 0; i < KpiArray.length; i++) {
                                                    if (KpiArray[i].Month == SelectedMonth) {

                                                        KpiArray[i].Survey = SurveyScore;
                                                    }
                                                }

                                                Selectedscorecard[0].KPIs = KpiArray;
                                                console.log(KpiArray);
                                                console.log(Selectedscorecard);

                                                $http.put('/scorecard/' + ID_temp, Selectedscorecard[0])
                                                    .success(function(response) {
                                                        console.log(response);
                                                    });


                                            });


                                        console.log(SurveyScore);

                                    });
                                console.log(response);
                            });
                    }
                }



            });

        //  refresh();
    }

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/Surveys/' + id)
            .success(function(response) {
                refresh();
            });
    };

    $scope.edit = function(id) {
        console.log('im on edit');
        $http.get('/Surveys/' + id)
            .success(function(response) {
                $scope.survey = response;
            });
    };

    $scope.update = function(id, data) {

        console.log(id);
        console.log(data);
        $http.put('/Surveys/' + id, data)
            .success(function(response) {
                refresh();
            })
    };


    var UpdateScoreCard = function(x, SelectedMonth, Newsurvey) {
        console.log(x);
        var temp = x.split(".");
        var newName = (temp[0] + " " + temp[1]);
        console.log(newName);

        $http.get('/scorecard?Name=' + newName + '', {


            })
            .success(function(response) {
                var Selectedscorecard = response;
                console.log('scorecard is  ' + Selectedscorecard);
                var KpiArray = Selectedscorecard[0].KPIs;
                console.log(KpiArray);
                var ID_temp = Selectedscorecard[0]._id;

                for (var i = 0; i < KpiArray.length; i++) {
                    if (KpiArray[i].Month == Month) {

                        KpiArray[i].Survey = Newsurvey;
                    }
                }

                Selectedscorecard[0].KPIs = KpiArray;
                console.log(KpiArray);
                console.log(Selectedscorecard);

                // $http.put('/scorecard/' + ID_temp,  Selectedscorecard[0]).success(function(response) {
                //   console.log(response);
                //   });


            });
    }


}]);
