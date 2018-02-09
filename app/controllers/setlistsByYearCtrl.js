"use strict";

// controller to get all years of a specific Era then break the years down into what shows were played that year
angular.module("theNumberLine").controller("setlistsByYearCtrl", function ($scope, setlistFactory, FbFactory, $location, $routeParams) {

    // grabs the route params and sets it to get shows for that year
    let yearId = $routeParams.yearValue;

    // function tha calls factoy to display the shows for the year the user clicked on via Era
    let showYear = () => {
        setlistFactory.getShowByYear(yearId)
            .then((shows) => {
                $scope.shows = shows.data.data;
                console.log('shows', $scope.shows);

            });
    };
     

    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        showYear();
    });

    // function that will get show detials for the paticular show that year
    $scope.showsThisYear = (years) => {
        setlistFactory.getShowDataByDate(years)
            .then((shows) => {
                $scope.songs = shows.data.data.tracks;
                $scope.venue = shows.data.data.venue;
                $scope.date = shows.data.data.date;
                // $scope.mustShowButton = true;
                $scope.showObject = {
                    showId: shows.data.data.id,
                    date: $scope.date,
                    userId: firebase.auth().currentUser.uid
                };
            });
    };

    // function that pass the user id to the firbase factory to save, passes show id to firebase to store for user
    $scope.addSeenShow = () => {
        FbFactory.addShow($scope.showObject);
    };
    
        
});


