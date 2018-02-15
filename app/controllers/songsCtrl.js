"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("songsCtrl", function ($scope, setlistFactory, trackFactory, FbFactory, $location, $window, $routeParams) {

    // gets users sorted shows from track factory
    $scope.sortedUserShows = trackFactory.track;

    // function that pushes users songs into a new arry
    let usersTracks = () => {
        // for each through the original data to get into the arr of tracks
        $scope.tracksArr = [];
        $scope.sortedUserShows.forEach(show => {
            // console.log('what is this', show.showData.data.tracks );

            $scope.tracksArr.push(show.showData.data.tracks);
            //  for each over the track arr and push individual tracks into new arr 
            $scope.indivSongArr = [];
            $scope.tracksArr.forEach(tracks => {
                tracks.forEach(track => {
                    $scope.indivSongArr.push(track.title);
                });
                $scope.countedSongs = _.countBy($scope.indivSongArr);

            });
        });
    };

    // method for the word cloud of songs
    
   
        

    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        usersTracks();
    });

});







