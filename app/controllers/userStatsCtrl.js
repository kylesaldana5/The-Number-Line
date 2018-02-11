"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("userStatsCtrl", function ($scope, setlistFactory, FbFactory, $location, $routeParams) {
    
    
    // function to get users dates from firebase
    let getUserDates = () =>{
        FbFactory.getUserShows()
        .then((data) =>{
            
            // makes new array with all dates
            $scope.dateArr = [];
            let shows = Object.values(data);
            shows.forEach(show =>{
                $scope.dateArr.push(show.date);
                // console.log('is this updating', $scope.dateArr );
                
            });
            
            // push each date individually into array and use moments to get month for pie char       
            $scope.momentMonthsArr = [];
            $scope.dateArr.forEach(date =>{
                let month = moment(date).format("MMM");
                $scope.momentMonthsArr.push(month);
                // console.log('moment months', $scope.momentMonthsArr );
                
            });
            
            // use lo dash to combine arrays into obj then use obj.val to push into seperate arr to pash into month pie char
            let countMomentMonths = _.countBy($scope.momentMonthsArr);
            let keyMonths = Object.keys(countMomentMonths);
            let timesInMonth = Object.values(countMomentMonths);
            // console.log('please work', countMomentMonths);            
            // console.log('keyMonths', keyMonths );
            // console.log('timesInMonth', timesInMonth);
            
            // Chart for what months youve seen phish the most / Doughnut Chart
            $scope.pieLabels = keyMonths;
            $scope.pieData = timesInMonth;
            
                
            

            // makes new array with just the year to use for the line graph
            $scope.yearArr = [];
            shows.forEach(show => {
            $scope.yearArr.push(show.date.slice(0,4));
            let countYears = _.countBy($scope.yearArr);
            let keyYears = Object.keys(countYears);
            let timesInYear = Object.values(countYears);
            // console.log('please work', countYears);
            // console.log('keyMonths', keyYears);
            // console.log('timesInMonth', timesInYear);
                
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
