'use strict';
MainApp.controller('ReportsController', ['$scope', '$http', function($scope, $http) {


  // Initial and static Values:

    $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.KPiLabel = [ "Quality Audit", "Resolution", "Surveys","FTR", "Update SLO"];
    $scope.SrImLabel = ["SR_perDay", "IM_PerDay"];


    $scope.EngineerSeries = [ "Quality Audit", "Resolution", "Surveys","FTR", "Update SLO"];
    $scope.EngineerSeries2 = ["SR_perDay", "IM_PerDay"];

    $scope.colors = ["#FF7F50", "#FFA500", "#7CFC00", "#20B2AA", "#8B008B", "#708090", "#D2691E", "#191970", "#696969"];
    $scope.table_thead =["Engineer Name","Rank","Survey","Resolution","Quality Audit","Update SLO","FTR","IMs Per Day","SRs Per Day","Days On Q"];

    $scope.searchdata = ''; // set the default search/filter term


    $scope.FTRtarget = 95;
    $scope.Updatetarget = 90;
    $scope.Resolutiontarget = 90;


    /*
    * Customization and configuration for the canva
    */
        $scope.options = {
            title: {
                display: true,
                text: 'All SOC Enginers'
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




    $scope.sort = {

      sortingOrder : 'engineer',
      reverse : false

          };
    /*
    *  Function that changing the icon according to the sort type
    */
    $scope.selectedCls2 = function (column) {
    if (column == $scope.sort.sortingOrder) {
        return ('fa fa-chevron-' + (($scope.sort.reverse) ? 'down' : 'up'));

                }
                else {
                    return 'fa fa-sort'
                }
            };
          /*
          *  Function that changing the sorting type when the user click  according to the sort type
          */
         $scope.changeSorting = function (column) {
                         var sort = $scope.sort;
                         if (sort.sortingOrder == column) {
                             sort.reverse = !$scope.sort.reverse;
                         } else {
                             sort.sortingOrder = column;
                             sort.reverse = false;
                         }
                     };




    var EngineerFlag = 0;
    /************************************************************************
    * Function that work when the user click on the Review Button and it will display
    * the Scorecard data in table and charts view from the Data base according to the month that the user chose.
    *************************************************************************/
    $scope.GetReport = function(Month) {
      var engineers = [];
      var ftr_data = [];
      var slo_data = [];
      var sr_per_day = [];
      var im_per_day = [];
      var qa = [];

      var res = [];;
      var survey = [];
      var days_q = [];
        //
        $http.get('/scorecard')
            .success(function(response) {
                $scope.Currentmonth = [];
                $scope.dataPerEngineer = [];
                $scope.dataPerKpi = [];
                var arr = [];
                var counter = 0;
                var flag = 1;
                var arr_sr_im=[];

                for (var i = 0; i < response.length; i++) {

                    var Selectedscorecard = response[i];


                    var KpiArray = Selectedscorecard.KPIs;
                    var name = Selectedscorecard.Name;
                    var flag = 1;

                    for (var j = 0; j < KpiArray.length; j++) {

                        if (KpiArray[j].Month == Month) {
                            
                            engineers[counter] = name;

                            sr_per_day[counter] = parseFloat(KpiArray[j].Sr);

                            im_per_day[counter] = parseFloat(KpiArray[j].Im);
                            survey[counter] = parseFloat(KpiArray[j].Survey);
                            res[counter] = parseFloat(KpiArray[j].Resolution) ;
                            ftr_data[counter] = parseFloat(KpiArray[j].Ftr);
                            slo_data[counter] = parseFloat(KpiArray[j].Update);
                            qa[counter] = parseFloat(KpiArray[j].Qa);
                            days_q[counter] = 20;
                            arr[counter] = [qa[counter],res[counter],survey[counter], ftr_data[counter], slo_data[counter]];
                            arr_sr_im[counter]=[sr_per_day[counter], im_per_day[counter]];
                            if (flag == 1) {
                                counter++;
                                flag = 0;

                            }


                            $scope.Currentmonth.push({ engineer: Selectedscorecard.Name, Rank: KpiArray[j].Rank, Survey: KpiArray[j].Survey, Resolution: KpiArray[j].Resolution, Qa: KpiArray[j].Qa, Update: KpiArray[j].Update, Ftr: KpiArray[j].Ftr, Sr: KpiArray[j].Sr, Im: KpiArray[j].Im, ScComment: KpiArray[j].ScComment });




                        }
                    }

                }
              // For the Charts functions

                $scope.dataPerKpi = arr;
                $scope.dataPerSrIm=arr_sr_im;

                $scope.dataPerEngineer = [ qa, res, survey, ftr_data, slo_data];
                $scope.SrImPerEngineer=[sr_per_day, im_per_day];

                $scope.EngineersLabels = engineers;

                $scope.KpiSeries = engineers;
                $scope.SrImSeries=engineers;


                $scope.Labels = $scope.KPiLabel;
                $scope.Labels2 = $scope.SrImLabel;

                $scope.Series = $scope.KpiSeries;
                $scope.Series2=$scope.SrImSeries;

                $scope.data = $scope.dataPerKpi;
                $scope.data2=$scope.dataPerSrIm;

            });

    }

    $scope.SwitchCharts = function() {
        if (EngineerFlag == 1) {
            $scope.Labels = $scope.KPiLabel;
            $scope.Labels2 = $scope.SrImLabel;

            $scope.Series = $scope.KpiSeries;
            $scope.Series2=$scope.SrImSeries;

            $scope.data = $scope.dataPerKpi;
            $scope.data2=$scope.dataPerSrIm;
            EngineerFlag = 0;
        } else {
            $scope.Labels = $scope.EngineersLabels;
            $scope.Labels2 = $scope.EngineersLabels;

            $scope.Series = $scope.EngineerSeries;// for the Kpis not inculded SR and IM
            $scope.Series2 = $scope.EngineerSeries2;//for the SR and IM chart

            $scope.data = $scope.dataPerEngineer;
            $scope.data2 = $scope.SrImPerEngineer;//for the SR and IM chart

            EngineerFlag = 1;
        }

    }

    /*****************************************************************************/
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };



}]);
