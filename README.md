# AChart Interpreter


## Introduction

AChart Interpreter (standing for Accessible Chart Interpreter) is a
screen reader for charts in SVG format. It provides a short textual
summary of a chart and the possibility to explore it interactively
using keyboard commands, speech, and textual output. The GUI version
of AChart Interpreter is a JavaScript application, which can run as a
standalone version (provided with this installation) as well as be
integrated into a web page.

In addition, AChart Interpreter contains a command-line tool called
AChart Summariser which outputs information about a given SVG chart as
markdown plain text to the console.



## Features

- Screen-reader-friendly text output shown in a panel next to the
  SVG chart.
- Optional output via speech synthesis independent of any running
  screen reader.
- Textual summary about title, axis labels, and data of a chart:
  - either within the Web application, or
  - in the terminal to stdout (using AChart Summariser).
- Navigation within a chart by data series and data points using
  keyboard or mouse.
- Synchronised highlighting of the selected chart object in both
  the SVG chart and the textual representation.
- Sorted output of data values.
- Comparison of a particular data point to others.
- Statistics for any data series.



## AChart Interpreter Online


The last stable release of AChart Interpreter (GUI version) can be used online at: <https://tugraz-isds.github.io/achart-interpreter>



## Local Installation & Setup


To install AChart Interpreter and AChart Summariser, the following commands are used:
```
git clone "<repo url>"
npm install
```



### AChart Interpreter

To build and run AChart Interpreter on the local machine, run:
```
npx gulp
```

The default browser should automatically open and load the application
including a list of sample SVG charts as well as a button to choose an
SVG file from your local machine. If not, launch a web browser of
choice and open the URL `http://localhost:3000`.

Once the GUI opens in the web browser, an SVG chart can be uploaded or
one of the sample SVG charts can be opened. The chart is displayed
visually in the Graphic Panel on the left. The Text Panel on the right
displays the textual representation of the chart extracted from the
SVG. Use the Tab / Shift+Tab keys or the virtual cursor of the screen
reader to navigate and Enter, Space, or the left mouse button to
activate a particular element.

Built-in speech is enabled by default. Each element is read aloud when
it gains focus. Speech output can be interrupted pressing any key or
clicking anywhere within AChart Intepreter's window.

To terminate the local web server running AChart Interpreter, press
CTRL+C in the terminal window.




### AChart Summariser

The command-line tool AChart Summariser can be built by running:
```
npx gulp AChartSummariserBuild
```

To run AChart Summariser, the following syntax is used:
```
node build/asummarise.js [--output OUTPUT-FILENAME] [--statistics] [--datapoints] [--version] [--help] [--input] SVG-FILENAME
```

Mandatory arguments:

    SVG-FILENAME               Specifies the SVG file to analyse. This argument can be
                               given either as the last command-line parameter or,
                               alternatively, at any position prepended by --input.


Optional arguments:

    --output OUTPUT-FILENAME   Writes the output to the specified plain text file.
                               If not specified, output is written to stdout.

    --statistics               Additionally outputs statistical information on each data series.

    --datapoints               Additionally outputs all the data points in the chart.

    --version                  Prints version information and exits.

    --help                     Prints this help message and exits.


All options are case-insensitive. If an argument contains space
characters, it should be enclosed in quotation marks (""). Filenames
may contain relative or absolute paths. If no path or relative path
is given, the current working directory is assumed.

For example:
```
node build/asummarise.js samples/achart-creator-bar.svg
```




## For Developers

All source files are located in the directory `src`. TypeScript files
are located in the `ts` subdirectory. Modules for the GUI version are
located in `ts/gui`, whereas those for Achart Summariser are located
in `ts/achart-summariser`. Modules used by both tools can be found in
`ts/common`.

After building the project, the `build` directory contains the
generated JavaScript files, as well as the basic HTML page of the
GUI. If AChart Summariser is built, the subdirectory
`achart-summariser` contains the specific modules for this
tool. The subdirectory `common` contains modules used by both tools.

The directory `samples` contains some sample SVG charts. These were
provided by Keith Andrews and by Doug Schepers, the developer of
Describler, which highly inspired AChart Interpreter. SVG files whose
names start with `achart-creator-` are sample charts generated using
the AChart Creator software.



## The Build System

To build the whole project (GUI version and AChart Summariser) without 
execution use:

```
npx gulp build
```

The default gulp task:
```
npx gulp run
```

Or just:
```
npx gulp
```
builds and runs AChart Interpreter using `Browsersync` and 
`gulp watch` for more convenient development.

```
npx gulp guiBuild
```
only builds AChart Interpreter (GUI version) without execution.

```
npx gulp AChartSummariserBuild
```
only builds AChart Summariser without execution.

The tasks may be modified and other tasks may be added in the
`gulpfile.js` located within the project's root directory.





## Creating Standalone Packages and Distributable Installers

### AChart Interpreter

`Electron` is used to create a standalone GUI version of AChart Interpreter.

It can be tested on the local machine by running:
```
npm run electron
```

To create an executable package containing AChart Interpreter, the command:
```
npm run create-package-PLATFORM
```
is used, where `PLATFORM` is one of:
* `all` - All platforms
* `linux` - Linux
* `mac` - Mac
* `win` - Windows

The package is created in the folder `packages/AChartInterpreter-PLATFORM`.
This task may take a few minutes to complete. The resulting package
is self-contained and the folder can be copied or relocated elsewhere.



To create a distributable installer, the command:
```
npm run create-installer-TYPE
```
is used, where `TYPE` is one of:
* `deb` - Debian, Ubuntu
* `rpm` - Redhat, Fedora, CentOS
* `dmg` - Mac
* `win` - Windows

The corresponding package must first have been built with `npm run
create-package-*`, as described above.
The installer is created in the folder `installers/PLATFORM`.
This task may take a few minutes to complete.  





### AChart Summariser

A standalone binary executable of AChart Summariser can be built
using `nexe` with the following command:
```
npx gulp AChartSummariserBinary [--target PLATFORM-ARCHITECTURE]
```


The option --target can be used to specify the build target. PLATFORM 
stands for the operating system and may be set, for instance, to 
windows, linux, or mac. ARCHITECTURE specifies the processor 
architecture and accepts x86 and x64. For a complete list of possible 
build targets, see:
<https://github.com/nexe/nexe/releases>.
If either of PLATFORM or ARCHITECTURE is omitted or if the option 
--target is not given, the respective parameter(s) of the build computer 
is/are used.

The resulting executable file is named `asummarise` (or, for Windows,
`asummarise.exe`) and is placed into the directory `binaries/TARGET`,
where TARGET corresponds to the specified build target or, if omitted,
to the platform and architecture of the build computer.

The executable file is self-contained and can be copied or relocated to
a different folder. It can be run like this:
```
./asummarise prices.svg
```



## Updating AChart Interpreter Online


GitHub Pages is used to host AChart Interpreter as online application. 
Once AChart Interpreter has been built successfully, this build can be 
published as new online version using the following command:
```
npx gulp publish
```

Please do so only after verifying that this build is stable and works as 
intended!

If you're running into authentication / permission problems, see the 
following:
<https://superuser.com/questions/1435950/git-gh-pages-deployment-permissions-error-permission-denied-publickey-fatal>



## Cleanup

To remove all temporary files (`build/*`, `node_modules/*`, 
`packages/*`, `installers/*`, `binaries/*`, `src/ts/build/*`):
```
npx gulp cleanall
```

To remove just all build files (`build/*`, `packages/*`, 
`installers/*`, `binaries/*`, `src/ts/build/*`):
```
npx gulp clean
```

