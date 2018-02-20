'use strict';
MainApp.controller('YearlyController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

  /***************************************************************************
  /*                The Static variables for the Charts
  /*****************************************************************************/
  $scope.colors = ['#45b7cd', '#ff6384', '#1835CA'];
  $scope.labels = ["November","December", "January", "February", "March", "April", "May", "June", "July", "August", "September","October" ]; // the months
  $scope.KPIs_labels = ["Surveys", "Resolution", "Quality Audit", "FTR", "SLO"];


  $scope.series = ['Engineer Score', 'Team Average Score', 'Max Score'];
  $scope.series_1 = ['Engineer Score', 'SOC Average', 'Goal']; // include the goal
  $scope.rank_series = ['Engineer Score']; // include the max score
  $scope.KPIs = ['Surveys', 'Resolution', 'Quality Audit', 'FTR', 'SLO'];
  $scope.days = ['Engineer Score ', 'SOC Average '];
  $scope.FlagMax=false;
  $scope.FlagAvg=false;

//
//
// //read the max :


      /***************************************************************************
      /*                      Initial data for the Engineer Score
      /*****************************************************************************/


      // if ($rootScope.activeUser.user.Role != "engineer")
      // {

        $scope.init =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.im_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.sr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.resolution_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.surveys_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.qa_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.rank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.ftr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.slo_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.status_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var init_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var avg = [0.3,0.4,0.4,0.3,0.2,1,0, 0, 0, 0, 0, 0];
        var max = [4,5,5,4,3,2,0, 0, 0, 0, 0, 0];

        $scope.status_data = [init_data, init_data];
        $scope.IM_data= [init_data,avg,max];
        $scope.SR_data = [init_data,init_data,init_data];
        $scope.surveys_data = [init_data,init_data,init_data];
        $scope.Res_data = [init_data,init_data,init_data];
        $scope.QA_data = [init_data,init_data,init_data];
        $scope.rank_data = [$scope.rank];
        $scope.Total_data = [init_data, init_data, init_data];//Rank
        $scope.days_data = [init_data, init_data];// need to read data from Scorecard
        $scope.ftr_data = [init_data,init_data,init_data];
        $scope.slo_data =[init_data,init_data,init_data];

      // }
      // else
      // {
      //   console.log("in else");
      //
      //         // var name = $rootScope.activeUser.user.Name;
      //         // console.log(name);
      //       //  $scope.ReadEngineerData($rootScope.activeUser.user.Name);
      // }







          /***************************************************************************
          /*                      Function to be build:
          /* the MAx Score and the Average score Yearly
          /*****************************************************************************/

          var days = [10, 20, 20, 10, 15, 24, 24, 20, 12, 0, 0, 0];//engineer demo data for days in Q
          var SocInQ = [20, 25, 25, 24, 23, 22, 24, 25, 15, 0, 0, 0];// Soc average in Q- demo data



        $http.get('/tickets_target/')
      .success(function(response) {
        if(response.length==0)
        {
            console.log("Need to go to the Configurations ");
        }
        else
        {
          $scope.FTRtarget = response[0].Ftr;
          $scope.Updatetarget =response[0].UpdateSlo;
          $scope.Resolutiontarget = response[0].Resolution;
          $scope.Survey=response[0].Survey;
          $scope.Qa=response[0].Qa;
        }

        $scope.Surveys_goal=[];
        $scope.Res_goal=[];
        $scope.QA_goal=[];
        $scope.total_goal=[];
        $scope.ftr_goal=[];
        $scope.slo_goal=[];
        $scope.total_months=12;

        for (var i=0 ; i<$scope.total_months; i++){
          $scope.Surveys_goal[i] = $scope.Survey;
          $scope.Res_goal[i] = $scope.Resolutiontarget;
          $scope.QA_goal[i] = $scope.Qa;
          // $scope.total_goal[i] = 90;
          $scope.ftr_goal[i] = $scope.FTRtarget;
          $scope.slo_goal[i] = $scope.Updatetarget;
        }

        $scope.status_goal = [$scope.Survey, $scope.Resolutiontarget, $scope.Qa, $scope.FTRtarget, $scope.Updatetarget]; // the target
        $scope.target_data = $scope.status_goal;
  });// end of reading the targets

    $scope.readScore=function()
    {
      console.log("readScore function");
      if ($rootScope.activeUser.user.Role == 'engineer') {

      var name = $rootScope.activeUser.user.Name;
      console.log(name);
      $scope.ReadEngineerData(name);
      }
  }

        /***************************************************************************
        /*                      The Function section
        /*****************************************************************************/

        /***************************************************************************
        /*      Get the Engineer list from the user database
        /*****************************************************************************/
        $http.get('/user')
            .success(function(data) {

                $scope.engineerslist = data;

            });

            /***************************************************************************
            /*      getting the Engineer score - chosen by the manager
            /*****************************************************************************/
            $scope.getYearlyReprots = function(SelectedEngineer) {
              console.log("get Yearly ")

                var CurrentEngineer = JSON.parse(SelectedEngineer);
                var name=CurrentEngineer.Name;
                $scope.ReadEngineerData(name);


        }

        $scope.getMaxScore=function()
        {

            console.log("in flag max =0 ");
          $http.get('/maxscore').success(function(response) {

            $scope.maxIm   =[0,0,0,0,0,0,0,0,0,0,0,0];//Initial
            $scope.maxSr =[0,0,0,0,0,0,0,0,0,0,0,0];
            $scope.maxQA=[0,0,0,0,0,0,0,0,0,0,0,0];
            $scope.maxFtr =[0,0,0,0,0,0,0,0,0,0,0,0];
            $scope.maxUpdateSlo =[0,0,0,0,0,0,0,0,0,0,0,0];
            $scope.maxResolution =[0,0,0,0,0,0,0,0,0,0,0,0];

            var counter=0;
            var place=0;

                  var selectmaxscore = response;
                  console.log(selectmaxscore);
                  for(var i=0;i<selectmaxscore.length;i++){
                  console.log("the Max score is = "+selectmaxscore[i]);
                  switch(selectmaxscore[i].Month)
                  {

                    case "November":
                    place=0;
                    break;
                    case "December":
                    place=1;
                    break;
                    case "January":
                    place=2;
                    break;
                    case "February":
                    place=3;
                    break;
                    case "March":
                    place=4;
                    break;
                    case "April":
                    place=5;
                    break;
                    case "May":
                    place=6;
                    break;
                    case "June":
                    place=7;
                    break;
                    case "July":
                    place=8;
                    break;
                    case "August":
                    place=9;
                    break;
                    case "September":
                    place=10;
                    break;
                    case "October":
                    place=11;
                    break;
                  }

                  $scope.maxIm[place] = parseFloat(selectmaxscore[i].maxIm.score);
                  //console.log($scope.maxIm);
                  $scope.maxSr[place] = parseFloat(selectmaxscore[i].maxSr.score);
                  $scope.maxQA[place] = parseFloat(selectmaxscore[i].maxQA.score);
                  $scope.maxFtr[place] = parseFloat(selectmaxscore[i].maxFtr.score);
                  $scope.maxUpdateSlo[place] = parseFloat(selectmaxscore[i].maxUpdateSlo.score);
                  $scope.maxResolution[place] = parseFloat(selectmaxscore[i].maxResolution.score);

                  counter++;
                  if(counter == selectmaxscore.length)
                  {
                    console.log($scope.maxIm);
                    $scope.FlagMax=true;

                  }

                }



              });


          }

        $scope.getAvgScore=function()
        {

            console.log("In avg");

          $http.get('/averagescore').success(function(response) {
                console.log("getting the avg from the DB");

                  $scope.avgIm=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgSr=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgQA=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgDaysInQ=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgResolution=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgFtr=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgUpdateSlo=[0,0,0,0,0,0,0,0,0,0,0,0];
                  $scope.avgSurvey=[0,0,0,0,0,0,0,0,0,0,0,0];

                  var selectavgscore = response;
                  var counter=0;
                  var place=0;
                  for(var i=0;i<selectavgscore.length;i++){
                      console.log("the Max score is = "+selectavgscore[i]);
                      switch(selectavgscore[i].Month)
                      {

                        case "November":
                        place=0;
                        break;
                        case "December":
                        place=1;
                        break;
                        case "January":
                        place=2;
                        break;
                        case "February":
                        place=3;
                        break;
                        case "March":
                        place=4;
                        break;
                        case "April":
                        place=5;
                        break;
                        case "May":
                        place=6;
                        break;
                        case "June":
                        place=7;
                        break;
                        case "July":
                        place=8;
                        break;
                        case "August":
                        place=9;
                        break;
                        case "September":
                        place=10;
                        break;
                        case "October":
                        place=11;
                        break;
                      }
                  $scope.avgIm[place] = parseFloat(selectavgscore[i].avgIm);
                  $scope.avgDaysInQ[place] = parseFloat(selectavgscore[i].avgDaysInQ);
                  $scope.avgSr[place] = parseFloat(selectavgscore[i].avgSr);
                  $scope.avgQA[place] = parseFloat(selectavgscore[i].avgQa);
                  $scope.avgResolution[place] = parseFloat(selectavgscore[i].avgResolution);
                  $scope.avgFtr[place] = parseFloat(selectavgscore[i].avgFtr); ;
                  $scope.avgUpdateSlo[place] = parseFloat(selectavgscore[i].avgUpdate);
                  $scope.avgSurvey[place]= parseFloat(selectavgscore[i].avgSurvey);
                  if (place==3)
                  {
                  console.log(selectavgscore[i].Month);
                  console.log($scope.avgIm[place]);
                  console.log(parseFloat(selectavgscore[i].avgIm));

                  }
                  counter++;
                  if(counter == selectavgscore.length)
                  {

                    console.log($scope.avgIm);
                    console.log( $scope.avgSr);
                    console.log($scope.avgResolution);
                    console.log($scope.avgFtr);
                    $scope.FlagAvg=true;
                  }

                }

              });


          }

        /***************************************************************************
          Reading the Engineer Score from the SCorecard Database and
          calculating the yearly average for the Engineer
        /*****************************************************************************/
        $scope.ReadEngineerData=function(name)
        {

          console.log("read Data")

          $scope.im_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.sr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.resolution_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.surveys_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.qa_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.rank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.ftr_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.slo_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.status_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

          console.log("in read func ");
          console.log("ReadEngineerData Function");
          $http.get('/scorecard?Name=' + name + '', {})
              .success(function(response) {

          console.log("calc Engineer Score ");


          $scope.ftr_avg = 0;
          $scope.slo_avg = 0;
          $scope.survey_avg = 0;
          $scope.qa_avg = 0;
          $scope.res_avg = 0;
          var place=0;
          var Selectedscorecard = response;
          console.log('scorecard is  ' + Selectedscorecard);
          var KpiArray = Selectedscorecard[0].KPIs;
          var counter=0;
          console.log("len " + KpiArray.length);
          var len= KpiArray.length;
          for (var i = 0; i < KpiArray.length; i++) {
            switch(KpiArray[i].Month)
            {

              case "November":
              place=0;
              break;
              case "December":
              place=1;
              break;
              case "January":
              place=2;
              break;
              case "February":
              place=3;

              break;
              case "March":
              place=4;
              break;
              case "April":
              place=5;
              break;
              case "May":
              place=6;
              break;
              case "June":
              place=7;
              break;
              case "July":
              place=8;
              break;
              case "August":
              place=9;
              break;
              case "September":
              place=10;
              break;
              case "October":
              place=11;
              break;
            }

            $scope.im_score[place] = parseFloat(KpiArray[i].Im);
            if(place==3){

            console.log("im score in Febreyary " + $scope.im_score[place]);
          }
            $scope.sr_score[place] = parseFloat(KpiArray[i].Sr);
            $scope.surveys_score[place] = parseFloat(KpiArray[i].Survey);
          //  $scope.days_score[place] = parseFloat(KpiArray[i].daysInQ);
            $scope.survey_avg += $scope.surveys_score[place];
            $scope.resolution_score[place] = parseFloat(KpiArray[i].Resolution);
            $scope.res_avg += $scope.resolution_score[place];
            $scope.qa_score[place] = parseFloat(KpiArray[i].Qa);
            $scope.qa_avg += $scope.qa_score[place];
            $scope.rank[place] = KpiArray[i].Rank;
            $scope.ftr_score[place] = parseFloat(KpiArray[i].Ftr);
            $scope.ftr_avg += $scope.ftr_score[i];
            $scope.slo_score[place] = parseFloat(KpiArray[i].Update);
            $scope.slo_avg += $scope.slo_score[place];

              $scope.setChartsData(len);

          }

          });


        }

        $scope.setChartsData=function(len)
        {
          console.log("Set the Data ");
          $scope.IM_data = [$scope.im_score,$scope.avgIm,$scope.maxIm];
          console.log($scope.IM_data);
          $scope.SR_data = [$scope.sr_score,$scope.avgSr,$scope.maxSr];

          $scope.surveys_data = [$scope.surveys_score,$scope.avgSurvey, $scope.Surveys_goal];
          $scope.Res_data = [$scope.resolution_score,$scope.avgResolution, $scope.Res_goal];
          $scope.QA_data = [$scope.qa_score,$scope.avgQA, $scope.QA_goal];
          $scope.rank_data = [$scope.rank];
          $scope.ftr_data = [$scope.ftr_score,$scope.avgFtr, $scope.ftr_goal];
          $scope.slo_data = [$scope.slo_score,$scope.avgUpdateSlo, $scope.slo_goal];

          // the yearly Average of the Engineer perfromance
          $scope.status_score[0] = $scope.survey_avg / len;
          $scope.status_score[1] = $scope.res_avg / len;
          $scope.status_score[2] = $scope.qa_avg / len;
          $scope.status_score[3] = $scope.ftr_avg /len;
          $scope.status_score[4] = $scope.slo_avg / len;
          $scope.status_data = [$scope.status_score,$scope.status_goal];



        }
        /*
          Charts Customaizations :
        */


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
    /*      Calc the status average according to the KpiArray.length
    /*****************************************************************************/

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

}]);
