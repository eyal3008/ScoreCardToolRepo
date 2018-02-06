'use strict';

MainApp.controller('LoginController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

    $scope.login = function() {

        $http.post('/login', $scope.loginForm)
            .success(function(response) {


                if (!!response.success) {
                    $rootScope.activeUser = response;
                  

                    $location.path('/home');
                } else {

                    $scope.couldnotlogin = response;

                }


            });
    }
}]);
