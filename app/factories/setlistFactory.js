"use strict";

angular.module("theNumberLine").factory("setlistFactory", function ($q, $http) {

    // API call to PhishIn to get shows by date
    let getShowDataByDate = (date) => {
        return $q((resolve, reject) => {
            $http
                .get(`https://phish.in/api/v1/shows/${date}`)
                .then((shows) => {
                    resolve(shows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    //  API call to PhishIn to get shows by venue
    let getVenueData = (venue) => {
        return $q((resolve, reject) => {
            $http
                .get(`https://phish.in/api/v1/venues/${venue}`)
                .then((shows) => {
                    resolve(shows);
                });

        }).catch((error) => {
            // reject(error); why is this throwing js hint error
        });
    };

    //  API call to PhishIn to get shows by era
    let getEraData = (era) => {
        return $q((resolve, reject) => {
            $http
                .get(`https://phish.in/api/v1/eras/${era}`)
                .then((shows) => {
                    resolve(shows);
                });

        }).catch((error) => {
            // reject(error);  why is this throwing js hint error?
        });
    };

    // API call to PhishIn to get shows by Year
    let getShowByYear = (year) =>{
        return $q((resolve, reject) => {
            $http
                .get(`https://phish.in/api/v1/years/${year}`)
                .then((shows) => {
                    resolve(shows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // API call to PhishIn to get shows by Id
    let getShowById = (id) => {
        return $q((resolve, reject) => {
            $http
                .get(`https://phish.in/api/v1/shows/${id}`)
                .then((shows) => {
                    resolve(shows);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getShowDataByDate, getEraData, getVenueData, getShowByYear, getShowById  };
});