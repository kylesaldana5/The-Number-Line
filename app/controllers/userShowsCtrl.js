"use strict";

// controller to display all the shows a user has added
angular.module("theNumberLine").controller("userShowsCtrl", function ($scope, setlistFactory, FbFactory, $location, $routeParams){

    // function that gets user saved shows
        $scope.userShows = () =>{
            FbFactory.getUserShows()
                .then((shows) =>{

                });
        };
});