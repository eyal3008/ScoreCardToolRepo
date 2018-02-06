'use strict';
MainApp.controller('SecurityController', ['$scope', '$http', function($scope, $http) {

    var refresh = function() {
        $http.get('/securityrequest')
            .success(function(response) {


                $scope.SecurityRequestList = response;
                console.log(JSON.stringify($scope.SecurityRequestList));
                //$scope.SecurityRequest =   $scope.SecurityRequestList[0];
            });
    };

    refresh();
    $scope.SendMail = function() {
        console.log($scope.FormUser);
        var obj = { "Email": $scope.FormUser.Email, "Login": $scope.FormUser.Login, "Password": $scope.FormUser.Password, "PositionName": $scope.FormUser.PositionName, "RequestType": $scope.FormUser.RequestType };

        $http.post('/SecurityRequest', obj)
            .success(function(response) {
                console.log(response);
                $scope.FormUser = "";
                refresh();
                $http.post('/SecurityMail/', obj)
                    .success(function(response) {
                        console.log(response);
                    });

            });

    }

}]);
