"use strict";

// controller to get all years of a specific Era then break the years down into what shows were played that year
angular.module("theNumberLine").controller("setlistsByYearCtrl", function ($scope, setlistFactory, FbFactory, $location, $routeParams, $window) {

    // grabs the route params and sets it to get shows for that year
    let yearId = $routeParams.yearValue;

    // function tha calls factoy to display the shows for the year the user clicked on via Era
    let showYear = () => {
        setlistFactory.getShowByYear(yearId)
            .then((shows) => {
                $scope.shows = shows.data.data;
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
                $scope.showId = shows.data.data.id;
                $scope.venue = shows.data.data.venue;
                $scope.date = shows.data.data.date;
                $scope.location = shows.data.data.venue.location;
                console.log('is this the location?', $scope.venue.name);
                
                // $scope.mustShowButton = true
                $scope.showObject = {
                    showId: shows.data.data.id,
                    date: $scope.date,
                    userId: firebase.auth().currentUser.uid,
                    venue: $scope.venue.name,
                    location: $scope.location
                };
            });
    };



    // function that pass the user id to the firbase factory to save, passes show id to firebase to store for user
    $scope.addSeenShow = (showId) => {
        console.log('show Id', showId);

        // function that gets users shows to compare against the already saved shows
        FbFactory.getUserShows()
            .then((shows) => {

                let userIdArr = [];
                let newArr = Object.values(shows);
                // condtional if user has never added a show to be able to add 
                if (newArr.length > 0) {

                    for (let i = 0; i < newArr.length; i++) {
                        
                        if (newArr[i].showId === showId) {
                            $window.alert("you've already added this show");
                            // stops the lop so users shows arnt added expontionally
                            return;
                        }
                    }

                    FbFactory.addShow($scope.showObject);

                }
                else FbFactory.addShow($scope.showObject);

            });


    };


});





