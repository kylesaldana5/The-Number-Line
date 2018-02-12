"use strict";

angular.module("theNumberLine").controller("loginCtrl", function ($scope, $window, authFactory) {
    
    // function that fires of google login 
    $scope.login = () =>{
        authFactory.googleLogin()
            .then((user) => {
                $window.location.href = '#!/setlists';
            });
    };


});