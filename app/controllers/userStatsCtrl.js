"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("userStatsCtrl", function ($scope, setlistFactory, FbFactory, $location, $routeParams) {


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

                // push each date individually into array and use moments to get month for pie char       
                $scope.momentMonthsArr = [];
                $scope.dateArr.forEach(date => {
                    let month = moment(date).format("MMM");
                    $scope.momentMonthsArr.push(month);

                });

                // use lo dash to combine arrays into obj then use obj.val / obj.key to push into seperate arr to pass into month pie char
                let countMomentMonths = _.countBy($scope.momentMonthsArr);
                let keyMonths = Object.keys(countMomentMonths);
                let timesInMonth = Object.values(countMomentMonths);

                // Chart for what months youve seen phish the most / Doughnut Chart
                $scope.pieLabels = keyMonths;
                $scope.pieData = timesInMonth;




                // makes new array with just the year to use for the line graph
                $scope.yearArr = [];
                shows.forEach(show => {
                    $scope.yearArr.push(show.date.slice(0, 4));
                    let countYears = _.countBy($scope.yearArr);
                    let keyYears = Object.keys(countYears);
                    let timesInYear = Object.values(countYears);

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

                // makes new array with just the days of the week / for bar graph 
                $scope.dayArr = [];
                $scope.dateArr.forEach(date =>{
                    let week = moment(date).format('dddd');
                    $scope.dayArr.push(week); 
                });
                
                 // use lo dash to combine arrays into obj then use obj.val / obj.key to push into seperate arr to pass into week bar char
                let countDay = _.countBy($scope.dayArr);
                let keyDay = Object.keys(countDay);
                let timesInDay = Object.values(countDay);

                 // Chart for what days youve seen phish the most / Bar Chart
                $scope.colors = ['#DCDCDC'];

                $scope.barLabels = keyDay;
                $scope.barData = [
                    timesInDay
                ];
                $scope.barDatasetOverride = [
                    {
                        label: "Bar chart",
                        borderWidth: 1,
                        type: 'bar'
                    }
                ];
                
                
            });
    };

    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        getUserDates();
    });





});
