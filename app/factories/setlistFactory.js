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
    return { getShowDataByDate };
});