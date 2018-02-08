"use strict";

// controller to display all the shows a user has added
angular.module("theNumberLine").controller("userShowsCtrl", function ($scope, setlistFactory, $q, FbFactory, $location, $routeParams, authFactory) {

    // function that gets user saved shows
    $scope.userShows = () => {
        FbFactory.getUserShows()
            .then((shows) => {

                //  turning shows into an arr of arrays that have fb id and other show info
                let userArry = Object.entries(shows);
                let userPromises = [];

                // making an arr of promises 
                userArry.forEach(showId => {
                    userPromises.push(setlistFactory.getShowById(showId[1].showId));
                });
                // excutes all promises
                $q.all(userPromises)
                    .then((data) => {
                        let finalArr = [];
                        // lopping over data and user array to make an object with showdata and fbId 
                        for (let i = 0; i < userArry.length; i++) {
                            for (let j = 0; j < data.length; j++) {

                                if (userArry[i][1].showId === data[j].data.data.id) {
                                    let newObj = {
                                        fbItemKey: userArry[i][0],
                                        showData: data[j].data
                                    };
                                    // push data into a new array
                                    finalArr.push(newObj);
                                }

                            }

                        }
                        $scope.sortedUserShows = finalArr;
                        console.log('sorted shows', $scope.sortedUserShows.fbItemKey);

                    });

            });
    };

    // function that deletes a users show from firebase
    $scope.removeShow = () =>{
        FbFactory.deleteShow($scope.sortedUserShows.fbItemKey);
    };

});




