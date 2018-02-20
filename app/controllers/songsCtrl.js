"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("songsCtrl", function ($scope, setlistFactory, trackFactory, FbFactory, $interval, $location, $window, $routeParams) {

    // gets users sorted shows from track factory
    $scope.sortedUserShows = trackFactory.track;

    // find the length to display how many shows a user has seen
    $scope.amountOfShows = $scope.sortedUserShows.length;
    
    // function that pushes users songs into a new arry
    let usersTracks = () => {
        // for each through the original data to get into the arr of tracks
        $scope.tracksArr = [];
        $scope.sortedUserShows.forEach(show => {
            $scope.tracksArr.push(show.showData.data.tracks);
            //  for each over the track arr and push individual tracks into new arr 
            $scope.indivSongArr = [];
            $scope.tracksArr.forEach(tracks => {
                tracks.forEach(track => {
                    $scope.indivSongArr.push(track.title);

                    // put all tracks into an obj with there keys being how many times you have seen that song
                    $scope.countedSongs = _.countBy($scope.indivSongArr);
                    
                });

                    // count most seen song in obj to display in DOM    FIGURE OUT WHY IT DISPLAY ONLY ON SECOND TIME COMING TO THE PAGE??!!
                    $scope.mostSeenSong = _.maxBy(_.keys($scope.countedSongs), function (o) { return $scope.countedSongs[o]; });
                });
                // push counted obj into array so order by can be used in the ng-reapet
                $scope.countedSongsArr = Object.entries($scope.countedSongs);
                // console.log('arr', $scope.countedSongsArr);
            });
    };



    // function that pushes all users venues into a new arry
    let usersVenue = () =>{
        $scope.venueArr = [];
        $scope.sortedUserShows.forEach(venue =>{
            $scope.venueArr.push(venue.showData.data.venue);
            
            // for each over the venue data and push each individual venue into new arr 
            $scope.indivVenueArr = [];
            $scope.venueArr.forEach(venue =>{
                $scope.indivVenueArr.push(venue.name);

                // put all venues into an obj with there keys being how many times you have been to that venue
                $scope.countedVenue = _.countBy($scope.indivVenueArr);
                
            });
            // count most seen venues in obj to display in DOM
            $scope.mostSeenVenue = _.maxBy(_.keys($scope.countedVenue), function (o) {return $scope.countedVenue[o]; });
        });
    };

   
    // function that takes users back to their seen shows page
    $scope.seeShows= () =>{
        $location.url('/user'); 
    };

    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        usersTracks();
        usersVenue();
    });

});







