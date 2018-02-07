"use strict";

// controller to get all years of a specific Era then break the years down into what shows were played that year
angular.module("theNumberLine").controller("setlistsByYearCtrl", function ($scope, setlistFactory, $location, $routeParams) {

    // grabs the route params and sets it to get shows for that year
    let yearId = $routeParams.yearValue;
    
    // function tha calls factoy to display the shows for the year the user clicked on via Era
        $scope.showYear = () => {
            setlistFactory.getShowByYear(yearId)
                .then((shows) =>{
                    $scope.shows = shows.data.data;
                });
        };    
    // function that will get show detials for the paticular show that year
        $scope.showsThisYear = (details) =>{
            setlistFactory.getShowDataByDate(details)
                .then((details) =>{
                    $scope.songs = details.data.data.tracks;
                    $scope.venue = details.data.data.venue;
                    $scope.mustShowButton = true;
                    $scope.showObject = {
                        showId: details.data.data.id,
                        userId: firebase.auth().currentUser.uid
                    };
                    
                });
        };
});