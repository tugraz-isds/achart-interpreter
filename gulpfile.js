const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const wp = require('webpack');
const wp_stream = require('webpack-stream');
const browser_sync = require('browser-sync').create()
const gh_pages = require('gh-pages');
const fs = require('fs');
const clean = require('gulp-clean');
const nexe = require("nexe");


const paths = {
  src: './src/',
  src_ts_all: './src/ts/**/',
  src_ts_common: './src/ts/common/',
  src_ts_gui: './src/ts/gui/',
  src_ts_summariser: './src/ts/achart-summariser/',
  ts_build: './src/ts/build/',
  ts_build_common: './src/ts/build/js/ts/common/',
  ts_build_achart_summariser: './src/ts/build/js/ts/achart-summariser/',
  ic_build: './src/icons/build/',
  build: './build/',
  samples: './samples/',
}

const files = {
  main_js: 'js/ts/gui/achart-interpreter.js',
  asummarise_js: 'js/ts/asummarise.js',
  asummarise_ts: 'ts/asummarise.ts',
  js: 'achart-interpreter.js',
  min_js: 'achart-interpreter.min.js'
}


function deleteBuilds()
{
  return gulp.src([paths.ts_build, paths.build, 'packages/',
      'installers/', 'binaries/'],
  {
    read: false,
    allowEmpty: true
  })
  .pipe(clean());
}


function deleteModules()
{
  return gulp.src('node_modules/', {read: false, allowEmpty: true})
      .pipe(clean());
}


async function samplesTxtList()
{
  // Generates a list of files in the samples directory, writes it to src/samples.txt
  let list_file = await fs.createWriteStream(paths.src + 'samples.txt');
  list_file.on('error', function(err) { console.error(err) });
  
  await fs.readdirSync(paths.samples).forEach(svg => {
      list_file.write(svg + '\n')
  });

  return list_file.end();
}


function tscAll()
{
  ts_sources = [paths.src_ts_all + '*.ts'];
  
  return tsc();
}


function tsc()
{
  const ts_result = gulp.src(paths.src + '**/*.ts')
      .pipe( ts.createProject(require('./tsconfig').compilerOptions)() );
  
  return merge([
      ts_result.dts.pipe( gulp.dest(paths.ts_build + 'd/') ),
      ts_result.js.pipe( gulp.dest(paths.ts_build + 'js/') )
  ]);
}


function webpack()
{
  return gulp.src(paths.ts_build + files.main_js)
      .pipe(wp_stream({
        output: { filename: files.js },
        plugins: [
          new wp.NoEmitOnErrorsPlugin()
        ],
        mode: 'development',
        devtool: 'source-map'
      }))
      .pipe(gulp.dest(paths.build));
}


function HTMLCopy()
{
  return gulp.src([paths.src + 'index.html'])
      .pipe(gulp.dest(paths.build))
      .pipe(browser_sync.stream());
}


function CSSCopy()
{
  return gulp.src([paths.src + '*.css'])
      .pipe(gulp.dest(paths.build))
      .pipe(browser_sync.stream());
}


function samplesTxtCopy()
{
  return gulp.src([paths.src + 'samples.txt'])
      .pipe(gulp.dest(paths.build))
      .pipe(browser_sync.stream());
}


function samplesCopy()
{
  return gulp.src([paths.samples + '**/*'], {base: './'})
      .pipe(gulp.dest(paths.build));
}


function AChartSummariserCopy()
{
  return gulp.src(
    [paths.ts_build_common + '*.js', paths.ts_build_achart_summariser + '*.js', paths.ts_build + files.asummarise_js],
    {base: paths.ts_build + 'js/ts'}
  )
      .pipe(gulp.dest(paths.build));
}


function server()
{
  browser_sync.init({
    files: [paths.build + 'index.html', paths.build + 'main.css', paths.build + 'samples.txt', paths.build + files.js],
    server: {
      index: 'index.html',
      baseDir: [paths.build, './'],
    }
  });
  gulp.watch([paths.src + 'ts/gui/*.*', paths.src + 'ts/common/*.*', paths.src + 'index.html', paths.src + 'main.css'], exports.build);
}


function guiPublishPages(cb)
{
  gh_pages.publish(paths.build,
    //src: ["samples/", "index.html", "main.css", "samples.txt", files.js]
  cb);
}


function nexeBuild(cb)
{
  
  const target_version = "12.9.1";
  
  let target = target_version;
  let target_dir = process.platform + "-" + process.arch;
  
  if ( (process.argv.length > 4) && (process.argv[3].toLowerCase() === "--target" ) )
  {
    target = process.argv[4];
    target_dir = target;
    
    if (target.indexOf(".") === -1)
    {
      target += "-" + target_version;
    }
  }
  else
  {
    console.info("No output target specified. Creating executable for host platform...");
  }
  
  nexe.compile(
  {
    input: "build/asummarise.js",
    output: "binaries/" + target_dir + "/asummarise",
    target: target
  });
  
  cb();
}


exports.clean = deleteBuilds;
exports.cleanall = gulp.series(deleteBuilds, deleteModules);

exports.build = gulp.series(samplesTxtList, tscAll, webpack, samplesCopy,
    samplesTxtCopy, HTMLCopy, CSSCopy, AChartSummariserCopy);
exports.guiBuild = gulp.series(samplesTxtList, tscAll, webpack, samplesCopy,
    samplesTxtCopy, HTMLCopy, CSSCopy);
exports.AChartSummariserBuild = gulp.series(tscAll, AChartSummariserCopy);

exports.AChartSummariserBinary = gulp.series(exports.AChartSummariserBuild, nexeBuild);

exports.publish = guiPublishPages;

exports.run = gulp.series(exports.guiBuild, server);
exports.default = exports.run;
