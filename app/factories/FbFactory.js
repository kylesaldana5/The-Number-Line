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
                .then(({data}) =>{
                    resolve(data);
                    
                })
                .catch((err) =>{
                    reject(err);
                });
        });
    }

    // function that gets users notes from firebase
    function getUserNotes() {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}/notes.json?orderBy="userId"&equalTo="${authFactory.getCurrentUser()}"`)
                .then(({ data }) => {
                    resolve(data);

                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
                    
                    
    // function that deletes a show from the users collection 
    function deleteShow(fbKey) {
        return $q((resolve, reject) =>{
            $http
                .delete(`${FBUrl}/Shows/${fbKey}.json`)
                .then((data) =>{
                    resolve(data);
                })
                .catch((err) =>{
                    reject(err);
                });
        });
    }

    // function that patches show note from the users collection 
    function addUserNote(noteObj) {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/notes.json`,
                JSON.stringify(noteObj))
                .then(showNote => {
                    resolve(showNote);
                })
                
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    return { addShow, deleteShow, getUserShows, addUserNote, getUserNotes  };
});

