// gulpfile.js
const gulp = require('gulp');

// development mode?
devBuild = (process.env.NODE_ENV !== 'production'),

// folders
folder = {
  src: 'src/',
  build: 'build/'
}

gulp.task('test', () => {
  require('./TestClassAccount.js');
  console.log('It works!');
});
