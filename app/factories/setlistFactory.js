"use strict";

angular.module("theNumberLine").factory("setlistFactory", function ($q, $http) {

    // API call to PhishIn to get shows by date
    let getShowDataByDate = (date) => {
        return $q((resolve, reject) => {
            $http
                .get(`http://phish.in/api/v1/shows/${date}`)
                .then((shows) => {
                    resolve(shows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    //  API call to PhishIn to get shows by era
    let getEraData = (era) => {
        return $q((resolve, reject) => {
            $http
                .get(`http://phish.in/api/v1/eras/${era}`)
                .then((shows) => {
                    console.log('era', shows);

                    resolve(shows);
                });

        }).catch((error) => {
            // reject(error);  why is throwing a js hint error?
        });
    };

    // API call to PhishIn to get shows by Year
    let getShowByYear = (year) =>{
        return $q((resolve, reject) => {
            $http
                .get(`http://phish.in/api/v1/years/${year}`)
                .then((shows) => {
                    resolve(shows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getShowDataByDate, getEraData, getShowByYear };
});