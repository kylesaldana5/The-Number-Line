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
                console.log('whole dates', $scope.dateArr);
            });
            
            // push each date individually into array and use moments to get month
            $scope.dateArr.forEach(date =>{
                console.log('indiv', date );
                
            });
            
            
            // makes new array with just the year to use for the line graph
            $scope.yearArr = [];
            shows.forEach(show => {
                $scope.yearArr.push(show.date.slice(0,4));
            });
            
        });
    };
    
    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        getUserDates();
    });
    

    // Chart for what years youve seen phish the most / Line Graph
    // $scope.labels = ["1988", "1989", "1990", "1991", "1992", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2002", "2003", "2004", "2009","2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
    // $scope.series = $scope.yearArr;
    // $scope.data = [
    //     [ 100, 95, 90, 85, 80, 70, 60, 55, 50, 45, 40, 35 ,30, 25, 20, 15, 10, 5, 0]
    // ];
    // $scope.onClick = function (points, evt) {
    //     console.log(points, evt);
    // };
    // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    // $scope.options = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 id: 'y-axis-1',
    //                 type: 'linear',
    //                 display: true,
    //                 position: 'left'
    //             }
              
    //         ]
    //     }
    // };
    
    // Chart for what months youve seen phish the most / Doughnut Chart
      $scope.labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      $scope.data = [300, 500, 100];
});
