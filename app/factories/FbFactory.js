"use strict";

angular.module("theNumberLine").factory("FbFactory", (FBUrl, $q, $http) =>{
    
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
 
    return { addShow };
});

