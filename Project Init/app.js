var fs = require('fs'),
	https = require('https'),
	url = require('url'),
	exec = require('child_process').exec,
	packageJsonUrl = 'https://gist.githubusercontent.com/Gerhard-Kanzler/503fffb6a0e6bf8ffaea/raw/package.json',
	gulpJsonUrl = 'https://gist.githubusercontent.com/Gerhard-Kanzler/503fffb6a0e6bf8ffaea/raw/gulpfile.js',
	scriptJsonUrl = 'https://gist.githubusercontent.com/Gerhard-Kanzler/503fffb6a0e6bf8ffaea/raw/script.js',
	fontGeneratorUrl = 'https://raw.githubusercontent.com/Gerhard-Kanzler/boilerplate/master/Webfonts/font-generator.php',
	fontLoaderUrl = 'https://raw.githubusercontent.com/Gerhard-Kanzler/boilerplate/master/Webfonts/webfonts.js',
	isStarted = false,
	folderCreate = false;
fs.exists( 'package.json', function( exist ){
	if( !exist ){
		console.log('-> Install Packages ');
		installPackages();
	}else{
		fs.exists( 'node_modules', function( exist ){
			if( !exist ){
				isStarted = true;
				console.log('-> Install Modules');
				exec('npm install', function(error, stdout, err) {
					console.log(stdout);
					console.log( err );
					isStarted = false;
					startGulp();
				});
			}
		});
}
});

fs.exists( 'gulpfile.js', function( exist ){
	if( !exist ){
		console.log('-> Install Gulpfile ');
		installGulp();
	}else{
		startGulp();
	}
});

// Load packages.json and install packages
function installPackages(){
	var file = fs.createWriteStream( __dirname + '/package.json'),
		downloadOptions = {
			hostname: url.parse(packageJsonUrl).host,
			port: 443,
			path: url.parse(packageJsonUrl).pathname,
			method: 'GET'
		};

	// Download Package.json and Install
	var urlReq = https.request( downloadOptions, function(res) {
		res.on('data', function(data) {
			file.write(data);
			//now npm install on package...
			exec('npm install', function(error, stdout, err) {
				console.log(stdout);
				console.log( err );
			});
		}).on('end', function( d ) {
			file.end();
			console.log('-> Packages installed');
			createFolderStructure();
		});
	});
	urlReq.end();
}

// Create "Default" Folder Structure
function createFolderStructure(){
	if( folderCreate ){
		return;
	}else{
		folderCreate = true;
	}
	console.log('-> Creating Folder Structure');
	var path = require('path');

	fs.mkdirParent = function (dirPath, mode, callback) {
		//Call the standard fs.mkdir
		fs.mkdir(dirPath, mode, function (error) {
			//When it fail in this way, do the custom steps
			if (error && error.errno === 34) {
				//Create all the parents recursively
				fs.mkdirParent(path.dirname(dirPath), mode, callback);
				//And then the directory
				fs.mkdirParent(dirPath, mode, callback);
			}
			//Manually run the callback since we used our own callback to do all these
			callback && callback(error);
		});
	};

	fs.mkdirParent(__dirname + '/static/js/min');
	fs.mkdirParent(__dirname + '/static/css/min');
	fs.mkdirParent(__dirname + '/static/css/fonts');
	fs.mkdirParent(__dirname + '/static/css/fonts');
	fs.mkdirParent(__dirname + '/static/img');
	fs.mkdirParent(__dirname + '/static/img/min');
	fs.mkdirParent(__dirname + '/static/fonts');


	fs.exists('static/js/script.js', function( exist ){
		if( !exist ){
			var file = fs.createWriteStream( __dirname + '/static/js/script.js'),
				downloadOptions = {
					hostname: url.parse(scriptJsonUrl).host,
					port: 443,
					path: url.parse(scriptJsonUrl).pathname,
					method: 'GET'
				};

			// Download Package.json and Install
			var urlReq = https.request( downloadOptions, function(res) {
				res.on('data', function(data) {
					file.write(data);
				}).on('end', function( d ) {
					file.end();
					console.log('-> Packages installed');
					createFolderStructure();
				});
			});
			urlReq.end();
		}
	});
	fs.exists('static/css/fonts/font-generator.php', function( exist ){
		if( !exist ){
			var file = fs.createWriteStream( __dirname + 'static/css/fonts/font-generator.php'),
				downloadOptions = {
					hostname: url.parse(fontGeneratorUrl).host,
					port: 443,
					path: url.parse(fontGeneratorUrl).pathname,
					method: 'GET'
				};

			// Download Package.json and Install
			var urlReq = https.request( downloadOptions, function(res) {
				res.on('data', function(data) {
					file.write(data);
					//now npm install on package...
				}).on('end', function( d ) {
					file.end();
					console.log('-> font-generator.php installed');
					createFolderStructure();
				});
			});
			urlReq.end();
		}
	});
	fs.exists('static/js/webfonts.js', function( exist ){
		if( !exist ){
			var file = fs.createWriteStream( __dirname + 'static/js/webfonts.js'),
				downloadOptions = {
					hostname: url.parse(fontLoaderUrl).host,
					port: 443,
					path: url.parse(fontLoaderUrl).pathname,
					method: 'GET'
				};

			// Download Package.json and Install
			var urlReq = https.request( downloadOptions, function(res) {
				res.on('data', function(data) {
					file.write(data);
				}).on('end', function( d ) {
					file.end();
					console.log('-> webfonts.js installed');
					createFolderStructure();
				});
			});
			urlReq.end();
		}
	});

	startGulp();
}

// Start Gulp
function installGulp(){
	var file = fs.createWriteStream( __dirname + '/gulpfile.js'),
		downloadOptions = {
			hostname: url.parse(gulpJsonUrl).host,
			port: 443,
			path: url.parse(gulpJsonUrl).pathname,
			method: 'GET'
		};

	// Download Package.json and Install
	var urlReq = https.request( downloadOptions, function(res) {
		res.on('data', function(data) {
			file.write(data);
			// start Gulp
			createFolderStructure();
		}).on('end', function( d ) {
			file.end();
			console.log('-> Gulpfile installed');
		});
	});
	urlReq.end();
}
function startGulp(){
	if( isStarted ){
		return;
	}else{
		isStarted = true;
	}
	fs.readFile('gulpfile.js', function( err, data ){
		if( err ){
			console.log('-> Install Gulp');
			installGulp();
		}else{
			console.log('-> Now you can start Gulp (cls: gulp)');
			/*exec('gulp', function(error, stdout, err) {
				console.log(stdout);
				console.log( err );
			});*/
		}
	});
}