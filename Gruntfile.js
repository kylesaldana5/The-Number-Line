module.exports = function (grunt) {
    grunt.initConfig({
        "angular-builder": {
            options: {
                mainModule: "theNumberLine",
                externalModules: ["ngRoute", "chart.js", 'nvd3', "d3", "ngMap"]
            },
            app: {
                src: "./app/**/*.js",
                dest: "./dist/project.js"
            }
        },
        jshint: {
            options: {
                predef: ["document", "console", "firebase", "d3", "moment", "_", "cloud" ],
                esnext: true,
                globalstrict: true,
                globals: { angular: true }
            },
            files: ["./app/**/*.js"]
        },
        sass: {
            dist: {
                files: {
                    "./css/main.css": "./sass/main.scss"
                }
            }
        },
        watch: {
            javascripts: {
                files: ["./app/**/*.js"],
                tasks: ["jshint", "angular-builder"]
            },
            sass: {
                files: ["./sass/**/*.scss"],
                tasks: ["sass"]
            }
        },
        clean:{
            options: {force: true },
            public: ['../public']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: "../",
                    src: [
                        "index.html",
                        "css/**/*.css",
                        "partials/**/*.html",
                        "node_modules/jquery/dist/jquery.min.js",
                        "node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "node_modules/popper.js/dist/popper.min.js",
                        "node_modules/angular/angular.min.js",
                        "node_modules/angular-route/angular-route.min.js",
                        "node_modules/ngmap/build/scripts/ng-map.min.js",
                        "node_modules/chart.js/dist/Chart.min.js",
                        "node_modules/angular-chart.js/dist/angular-chart.min.js",
                        "node_modules\angular-moment\angular-moment.min.js",
                        "node_modules/firebase/firebase.js",
                        "node_modules\lodash\lodash.min.js",
                        "app/**/*.js"
                    ],
                    dest: "../public/"
                }]
            }
        }
    });

    require("matchdep")
        .filterDev("grunt-*")
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask("default", ["jshint", "sass", "angular-builder", "watch"]);
    grunt.registerTask('deploy', ['sass', 'copy']);
    grunt.registerTask('cleanit', ['clean']);
};