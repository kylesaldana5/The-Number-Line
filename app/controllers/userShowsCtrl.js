"use strict";

// controller to display all the shows a user has added
angular.module("theNumberLine").controller("userShowsCtrl", function ($scope, setlistFactory, $q, FbFactory, trackFactory, $location, $routeParams, $route, $window, authFactory) {



    // function that gets user saved shows
    let userShows = () => {

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
                        console.log('shows',$scope.sortedUserShows );
                        
                        // sending users sorted shows to track factory to pass to stats ctrl
                        trackFactory.addList($scope.sortedUserShows);
                        
                    });

            });
    };

    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        userShows();
    });

    // for addNote function gives child scope to the object.. must have for ng-if to work
    $scope.userNote = {
        note: null
    };

    // function that allows user to add and edit a note about the show
    $scope.addNote = (fbItemKey, showId) => {
        
        let newNote = {
            userId: firebase.auth().currentUser.uid,
            showId: showId,
            note: $scope.userNote.note
        };
        FbFactory.addUserNote(newNote);
        $window.alert("Success! You've added a note");
    };

    // function that deletes a users show from firebase
    $scope.removeShow = (key) => {
        FbFactory.deleteShow(key)
        .then(() =>{
            $route.reload("#!/user");
        })
            .catch((err) => {
                console.log('err', err);

            });
            $window.alert("Success! You've removed this show form your list");
          
    };

    // function to show user shows when clicked on date /venue 
    $scope.showDetails = (fbItemKey) => {
        
        $scope.selectedShow = fbItemKey;
        
    };

});










