module.exports = function (grunt) {
    grunt.initConfig({
        "angular-builder": {
            options: {
                mainModule: "theNumberLine",
                externalModules: ["ngRoute", "chart.js", 'nvd3', "ngMap"]
            },
            app: {
                src: "./app/**/*.js",
                dest: "./dist/project.js"
            }
        },
        jshint: {
            options: {
                predef: ["document", "console", "firebase", "moment", "_" ],
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
        }
    });

    require("matchdep")
        .filterDev("grunt-*")
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask("default", ["jshint", "sass", "angular-builder", "watch"]);
};