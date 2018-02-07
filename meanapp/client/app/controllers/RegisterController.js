'use strict';
angular.module('RegisterController', ['fileModelDirective'])
.
controller('RegisterController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http, uploadFile) {

//creating the targets database in case there is nothing:

$http.get('/survey_targets/').success(function(response)
{
  if(response.length==0)
  {
      $scope.CreateSurveyInDB();
  }
  else {
    $scope.surveytList=response[0];
    console.log($scope.surveytList);
  }
});


$http.get('/tickets_target/')
    .success(function(response) {
      if(response.length==0)
      {
          $scope.CreateTargetInDB();
      }
      else
      {
        $scope.targetList=response[0];
        console.log($scope.targetList);
      }
});


  $scope.CreateSurveyInDB=function(){

    $scope.surveytList={
      "Responsiveness":"20",
      "Quality":"15",
      "Timeliness":"15",
      "Overall":"30",
      "Professionalism":"20"

    }
    $http.post('/survey_targets/',$scope.surveytList).success(function(response)
     {         console.log("Init the New target"+  $scope.surveytList)

          });
  }


// init the Targets Database
$scope.CreateTargetInDB=function()
{
  $scope.targetList = {

      "Survey": "96",
      "Ftr": "99",
      "Resolution": "95",
      "Qa": "92",
      "UpdateSlo": "90"

  }
  $http.post('/tickets_target/',$scope.targetList).success(function(response)
   {         console.log("Init the New target"+  $scope.targetList)

        });
    }



    $scope.IsVisible = false;
    $scope.targetIsVisible = false;
   $scope.surveyIsVisible=false;

    $scope.ShowHide = function() {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    $http.get('/catalogitem')
        .success(function(response) {
            $scope.CiListFromDb = response;

        });

        $scope.modifySurvey= function(){

        $scope.modifySurveyField = true;
        $scope.viewSurveyField = true;
      };


        $scope.updateSurvey= function(newTarget){
          $scope.modifySurveyField = false;
          $scope.viewSurveyField = false;

          //console.log($scope.survey);
          for(var i=0;i<newTarget.length;i++){
          if(newTarget[i].targetName=="Professionalism")
            $scope.surveytList.Professionalism=newTarget[i].value;
          if(newTarget[i].targetName=="Responsiveness")
            $scope.surveytList.Responsiveness=newTarget[i].value;
          if(newTarget[i].targetName=="Resolution Quality")
          $scope.surveytList.Quality=newTarget[i].value;
          if(newTarget[i].targetName=="Resolution Timeliness")
            $scope.surveytList.Timeliness=newTarget[i].value;
          if(newTarget[i].targetName=="Overall support Experience")
          $scope.surveytList.Overall=newTarget[i].value;
        }
          $http.put('/survey_targets/' +   $scope.SurveyId, $scope.surveytList)
              .success(function(response) {
                console.log(response);
              });
        }

        $scope.modify = function(){

        $scope.modifyField = true;
        $scope.viewField = true;
      };
      $scope.updateTargets= function(newTarget){
        $scope.modifyField = false;
        $scope.viewField = false;

        console.log($scope.targetList);
        for (var i=0;i<newTarget.length;i++){
        if(newTarget[i].targetName=="FTR SLO")
          $scope.targetList.Ftr=newTarget[i].value;
        if(newTarget[i].targetName=="Survey")
          $scope.targetList.Survey=newTarget[i].value;
        if(newTarget[i].targetName=="Update SLO")
        $scope.targetList.UpdateSlo=newTarget[i].value;
        if(newTarget[i].targetName=="Quality Audit")
          $scope.targetList.Qa=newTarget[i].value;
        if(newTarget[i].targetName=="Resolution")
        $scope.targetList.Resolution=newTarget[i].value;
      }
        $http.put('/tickets_target/' + $scope.TargetId, $scope.targetList)
            .success(function(response) {
              console.log(response);
            });

      };


      $scope.ShowHideSurveyList=function()
      {
          $scope.surveyIsVisible = $scope.surveyIsVisible ? false : true;
      }

      $http.get('/survey_targets')
          .success(function(response) {
            // var survey= response;
            if(response.length>0){
            $scope.SurveyId=response[0]._id;
            $scope.survey=[];

              $scope.survey.push({targetName:"Professionalism", value:response[0].Professionalism});
              $scope.survey.push({targetName:"Responsiveness",value:response[0].Responsiveness});
              $scope.survey.push({targetName:"Resolution Quality",value:response[0].Quality});
              $scope.survey.push({targetName:"Resolution Timeliness",value:response[0].Timeliness});
              $scope.survey.push({targetName:"Overall support Experience",value:response[0].Overall});
              console.log("the Survey targets from the DB: "+  $scope.survey);
            }
      });


        /**********************************************************************
        *
        ***********************************************************************/

        $scope.ShowHideTargetList = function() {
            //If DIV is visible it will be hidden and vice versa.
            $scope.targetIsVisible = $scope.targetIsVisible ? false : true;
        }
        $http.get('/tickets_target')
            .success(function(response) {
              var targetList= response;
              $scope.TargetId=targetList[0]._id;
              $scope.target=[];

                $scope.target.push({targetName:"Quality Audit", value:targetList[0].Qa});
                $scope.target.push({targetName:"Resolution",value:targetList[0].Resolution});
                $scope.target.push({targetName:"Update SLO",value:targetList[0].UpdateSlo});
                $scope.target.push({targetName:"FTR SLO",value:targetList[0].Ftr});
                $scope.target.push({targetName:"Survey",value:targetList[0].Survey});
                console.log("the targets from the DB: "+  $scope.target);
        });



    var UpdateCiList = function(CatalogItemObject) {

        $http.get('/catalogitem', {
                params: {
                    title: CatalogItemObject.title
                }

            })
            .success(function(response) {
                if (response.length != 0) {
                    console.log(response);
                    $http.put('/catalogitem/' + response[0]._id, CatalogItemObject)
                        .success(function(response) {

                        });
                } else if (response.length == 0) {
                    $http.post('/catalogitem', CatalogItemObject)
                        .success(function(response) {
                            console.log(response);
                        });
                }
            });
    }

    var upload = function(file) {

        console.log('im on upload');
        var fd = new FormData(); // a way that formData is introduced is as <key>:<value>. example:  "name": "David"
        fd.append('myfile', file.upload); //the <key> here is "myfile" that is passed here and it comes from index.html
        // the <value> here is file.upload
        //file.upload comes from index.html
        //the "file" is the object and the "upload" is the actual file that is attached to the object
        return $http.post('/upload', fd, { //http post request to the server, so now we could save that file
                // the /upload route will be created in the server
                transformRequest: angular.identity, //to remove the serialised data that had been done by angular
                headers: { 'Content-Type': undefined }

            })
            .success(function(response) {
                $scope.CiUploadedList = response.message;
                console.log(response.message);
                for (var i = 0; i < $scope.CiUploadedList.length; i++) {
                    UpdateCiList($scope.CiUploadedList[i]);
                }
            });

    };



    $scope.Submit = function() {
        console.log('on submit');
        // console.log($scope.file);
        $scope.uploading = true;
        upload($scope.file)
            .then(function(data) {
                console.log('on upload');
                if (data.data.success) {
                    $scope.uploading = false;
                    $scope.alert = 'alert alert-success';
                    $scope.message = data.data.message;
                    $scope.file = {};
                } else {
                    $scope.uploading = false;
                    $scope.alert = 'alert alert-danger';
                    $scope.message = data.data.message;
                    $scope.file = {};
                }
            });
    };

    var refresh = function() {
        $http.get('/user')
            .success(function(response) {


                $scope.userlist = response;
                $scope.user = $scope.userlist[0];
            });
        $http.get('/catalogitem')
            .success(function(response) {


                $scope.CIList = response;


            });
            $http.get('/tickets_target')
                .success(function(response) {


                    $scope.TargetList = response;


                });
                $http.get('/survey_targets')
                    .success(function(response) {


                        $scope.SurveyList = response;


                    });
    };

    refresh();


    $scope.register = function() {
        console.log($scope.FormUser);
        $http.post('/user', $scope.FormUser)
            .success(function(response) {
                console.log(response);
                $scope.FormUser = "";
                refresh();
            });
    };


    $scope.CiRegister = function() {
        console.log("adding new Catalog Item ");
        console.log($scope.Ci);
        $http.post('/catalogitem', $scope.Ci)
            .success(function(response) {
                console.log(response);
                $scope.Ci = "";
                refresh();
            });
    };
    // Function for adding tickets targets
    $scope.TicketsTargetRegister = function() {
      console.log("adding new target ");
        console.log($scope.target);
        $http.post('/tickets_target', $scope.target)
            .success(function(response) {
                console.log(response);
                $scope.target= "";
                refresh();
            });
    }

    // Function for adding tickets targets
    // $scope.SurveyTargetRegister = function() {
    //
    //     $http.post('/survey_targets', $scope.survey)
    //         .success(function(response) {
    //             console.log(response);
    //             $scope.survey= "";
    //             refresh();
    //         });
    // }


    //============================== Remove ===================================

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/user/' + id)
            .success(function(response) {
                refresh();
            });
    };

    $scope.CiRemove = function(id) {
        console.log(id);
        $http.delete('/catalogitem/' + id)
            .success(function(response) {
                refresh();
            });
    };

    $scope.TicketTargetRemove = function(id) {
        console.log("In target remove");
        $http.delete('/tickets_target/'+ id)
            .success(function(response) {
                refresh();
            });
    };
    // $scope.SurveyTargetRemove = function(id) {
    //   //console.log("In target remove");
    //     $http.delete('/survey_targets/'+ id)
    //         .success(function(response) {
    //             refresh();
    //         });
    // };
    //============================== Edit ===================================

    $scope.edit = function(id) {


        $http.get('/user/' + id)
            .success(function(response) {
                $scope.user = response;


            });

    };

    $scope.CiEdit = function(id) {


        $http.get('/catalogitem/' + id)
            .success(function(response) {
                $scope.Ci = response;


            });

    };
    $scope.TicketTargetEdit = function(id) {
        console.log("In target Edit");

        $http.get('/tickets_target/'+ id)
            .success(function(response) {
                $scope.target = response;


            });

    };
    // $scope.SurveyTargetEdit = function(id) {
    //
    //     $http.get('/survey_targets/'+ id)
    //         .success(function(response) {
    //             $scope.survey = response;
    //
    //
    //         });
    //
    // };

    //============================== Update ===================================

    $scope.update = function(id, data) {

        console.log(id);
        console.log(data);

        $http.put('/user/' + id, data)
            .success(function(response) {
                refresh();
            })
    };

    $scope.CiUpdate = function(id, data) {

        console.log(id);
        console.log(data);

        $http.put('/catalogitem/' + id, data)
            .success(function(response) {
                refresh();
            })
    };

    $scope.TicketTargetUpdate = function(id, data) {
  console.log("In target Update");
        console.log(id);
        console.log(data);

        $http.put('/tickets_target/' + id, data)
            .success(function(response) {
                refresh();
            })
    };

  //   $scope.SurveyTargetUpdate = function(id, data) {
  // //console.log("In target Update");
  //       console.log(id);
  //       console.log(data);
  //
  //       $http.put('/survey_targets/' + id, data)
  //           .success(function(response) {
  //               refresh();
  //           })
  //   };
    $scope.deselect = function() {
        $scope.user = "";
        $scope.Ci = "";
        $scope.target="";
      //  $scope.survey="";
    }



}]);
