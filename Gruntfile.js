module.exports = function (grunt) {
  var SERVER_PORT = 8000;
  var RELOAD_PORT = 35729;
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    devserver: {
      server: {},
      options: {
        port: SERVER_PORT,
        base: ".",
      },
      tasks: ["build"],
    },
    watch: {
      js: {
        files: ["js/**/*.js", "index.html", "styles/**/*.scss", "assets/**"],
        options: { livereload: true },
        tasks: ["build"],
      },
    },
    // Combines dependency .js to one .js file
    "depend-concat": {
      /*
            @depends /path/to/dependency.js
        */
      depends_doctag: {
        options: {
          method: {
            type: "doctag",
            tag: "depends",
          },
        },
        src: ["js/**/*.js"],
        dest: "build/<%= pkg.name %>.js",
      },
    },
    // creates *.min.js
    terser: {
      your_target: {
        src: ["build/<%= pkg.name %>.js"],
        dest: "dist/js/<%= pkg.name %>.min.js",
      },
    },
    copy: {
      css: {
        expand: true,
        src: ["style/css/**", "dist/**"],
        flatten: true,
        dest: "dist/",
      },
      public: {
        expand: true,
        src: ["public/*"],
        flatten: true,
        dest: "dist/",
      },
    },
    processhtml: {
      dist: { files: { "dist/index.html": ["index.html"] } },
    },
    "gh-pages": {
      options: {
        base: "dist",
        branch: "main",
      },
      src: ["**"],
    },
  });

  grunt.loadNpmTasks("grunt-devserver");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-terser");
  grunt.loadNpmTasks("grunt-depend-concat");

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks("grunt-gh-pages");

  grunt.registerTask("build", ["depend-concat"]);
  grunt.registerTask("dist", [
    "build",
    "terser",
    "sass",
    "processhtml",
    "copy",
  ]);

  grunt.registerTask("github", ["dist", "gh-pages"]);
};
