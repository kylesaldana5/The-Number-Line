"use strict";

angular.module("theNumberLine").controller("navbarCtrl", function ($scope, $location, $window) {
    
    $scope.navItems = [
        {
            name: "Search Shows",
            url: "#!/setlist"
        }
    ];

});