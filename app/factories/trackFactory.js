"use strict";

angular.module("theNumberLine").factory("trackFactory", function() {
    let sortedUserShows = {};
    sortedUserShows.track = [];

    sortedUserShows.addList = (userShowsArr) => {
        sortedUserShows.track = userShowsArr;
    };
    return sortedUserShows;

});