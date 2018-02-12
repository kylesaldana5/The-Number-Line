"use strict";

// controller to search the specific show by date
angular.module("theNumberLine").controller("searchSetlistCtrl", function ($scope, setlistFactory, FbFactory, $location) {

    // function that calls factory and gets shows by date(YYY-MM-DD)
    $scope.searchByDate = () => {
        setlistFactory.getShowDataByDate($scope.searchForShowByDate)
            .then((shows) => {
                $scope.songs = shows.data.data.tracks;
                $scope.venue = shows.data.data.venue;
                $scope.mustShowButton = true;
                $scope.showObject = {
                    showId: shows.data.data.id,
                    userId: firebase.auth().currentUser.uid
                };
            });
    };
    
    // need to figure out how to make this work with out searching for slug
    // function that calls factory and gets shows by venue 
    $scope.searchByVenue = () => {
        setlistFactory.getVenueData($scope.searchForShowByVenue)
            .then((shows) => {
            });
    };

    // function that call factory and gets shows by Era
    $scope.searchByEra = () => {
        setlistFactory.getEraData($scope.searchForShowByEra)
            .then((shows) => {
                $scope.eraDates = shows.data.data;
            });
    };

    //  function that call factory to get shows by Year
    $scope.rederictShowsByEra = (yearValue) =>{
        $location.url(`/setlists/${yearValue}`);      
    };
        
                

    // function that pass the user id to the firbase factory to save, passes show id to firebase to store for user
    $scope.addSeenShow = () => {
        FbFactory.addShow($scope.showObject);
    };
});


