"use strict";

angular.module("theNumberLine").factory("FbFactory", (FBUrl, $q, $http, authFactory) =>{
    
    // function that post the show "id" to firebase
    function addShow(id) {
        return $q((resolve, reject) =>{
            $http
                .post(`${FBUrl}/Shows.json`,
                JSON.stringify(id))
                .then(showData =>{
                    resolve(showData);
                });
        });
    }

    // function that gets users shows from firebase
    function getUserShows(){
        return $q((resolve, reject) =>{
            $http
                .get(`${FBUrl}/Shows.json?orderBy="userId"&equalTo="${authFactory.getCurrentUser()}"`)
                .then((data) =>{
                    console.log('data',data );
                    
                    resolve(data);
                })
                .catch((err) =>{
                    reject(err);
                });
        });
    }
    
    // function that deletes a show from the users collection 
    function deleteShow(id) {
        return $q((resolve, reject) =>{
            $http
                .delete(`${FBUrl}Shows/${id}.json`)
                .then((data) =>{
                    resolve(data);
                })
                .catch((err) =>{
                    reject(err);
                });
        });
    }
    return { addShow, deleteShow, getUserShows };
});

