"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("userStatsCtrl", function ($scope, setlistFactory, trackFactory, FbFactory, $location, $routeParams) {

    // gets users sorted shows from track factory
    $scope.sortedUserShows = trackFactory.track;
    console.log('stats users show', $scope.sortedUserShows );
    
    // function to get users dates from firebase
    let getUserDates = () => {
        FbFactory.getUserShows()
            .then((data) => {

                // makes new array with all dates
                $scope.dateArr = [];
                let shows = Object.values(data);
                shows.forEach(show => {
                    $scope.dateArr.push(show.date);

                });                   
                
                // makes new array with just the year to use for the line graph
                $scope.yearArr = [];
                shows.forEach(show => {
                    $scope.yearArr.push(show.date.slice(0, 4));
                    $scope.seenThisManyTimes = _.size($scope.yearArr);
                    $scope.countYears = _.countBy($scope.yearArr);
                    let keyYears = Object.keys($scope.countYears);
                    let timesInYear = Object.values($scope.countYears);
                    timesInYear.push(0);

                    // Chart for what years youve seen phish the most / Line Graph
                    $scope.labels = keyYears;
                    $scope.series = ['Series A'];
                    $scope.data = [
                        timesInYear
                    ];
                    $scope.onClick = function (points, evt) {
                        console.log(points, evt);
                    };
                    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                    $scope.options = {
                        scales: {
                            yAxes: [
                                {
                                    id: 'y-axis-1',
                                    type: 'linear',
                                    display: true,
                                    position: 'left'
                                }
                            ]
                        }
                    };


                });




            });
    };


    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        getUserDates();
    });





});
