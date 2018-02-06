'use strict';
angular.module('RegisterController', ['fileModelDirective'])
.
controller('RegisterController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http, uploadFile) {

//creating the targets database in case there is nothing:


$http.get('/tickets_target/')
    .success(function(response) {
      if(response.length==0)
      {
          $scope.CreateTargetInDB();
      }
});


$scope.CreateTargetInDB=function()
{
  var NewTarget = {

      "Survey": "96",
      "Ftr": "99",
      "Resolution": "95",
      "Qa": "92",
      "UpdateSlo": "90"

  }
  $http.post('/tickets_target/',NewTarget).success(function(response)
   {
          console.log("Init the New target"+NewTarget)

        });

    }

// SurveyTargetRead();

//reading the surevey target or create a new one if there is not.
// var SurveyTargetRead = function() {
    //
    // $http.get('/survey_targets/')
    //     .success(function(response) {
    //       console.log("In read func ");
    //       var surveytarget=response;
    //       //
    //       if(surveytarget.length==0)
    //       {
    //         console.log("Empty ");
    //
    //         //create a new target in DB
    //
    //        surveytarget.ResponsivenessScore="20";
    //         surveytarget.QualityScore= "15";
    //         surveytarget.TimelinessScore="15";
    //         surveytarget.ProfessionalismScore="20";
    //         surveytarget.OverallScore="30";
    //
    //         $http.post('/survey_targets/',surveytarget).success(function(response) {
    //
    //           refresh();
    //
    //        });
    //      }
    //       else
    //       {
    //         console.log("Im not empty");
    //
    //       }
    //         //console.log(response);
    //         //$scope.survey= "";
    //         //refresh();
    //     });
// }


    $scope.IsVisible = false;
    $scope.targetIsVisible = false;
  //  $scope.surveyIsVisible=false;

    $scope.ShowHide = function() {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    $http.get('/catalogitem')
        .success(function(response) {
            $scope.CiListFromDb = response;

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
                
                $scope.TargetListFromDb = targetList;
        });


        //    });

            // $scope.ShowHideSurveyList = function() {
            //     //If DIV is visible it will be hidden and vice versa.
            //     $scope.surveyIsVisible = $scope.surveyIsVisible ? false : true;
            // }
            // $http.get('/survey_targets')
            //     .success(function(response) {
            //         $scope.SurveyListFromDb = response;
            //
            //     });

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
