// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import { greet } from './hello_world/hello_world';
import env from './env';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

var btn = document.getElementById('clickMe');

var Client = require('ssh2').Client;
// the function thats called when you click the button
function doFunction(){
	//creating a ssh client
	var conn = new Client();

	//start the reboot process
	conn.on('ready', function() {
		conn.exec('uptime',function(err,stream){
			//account for errors
			if(err) throw err;
			//log the reboot
			conn.exec('2/EQvWeWTGohwE7+ki8ju7VADi4IMz0neY3c04Md1u4=',function(err,stream){
				console.log('pw entered');
			});
			console.log('completed the reboot');
			conn.end();
		});
	}).connect({
		host: 'go.pluricorp.com',
   	 	port: 22,
    	username: 'pi',
    	password: '2/EQvWeWTGohwE7+ki8ju7VADi4IMz0neY3c04Md1u4=',
	});
	//give the user a result
	window.alert("restart completed");
};

btn.onclick = doFunction;

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read('package.json', 'json');

const osMap = {
  win32: 'Windows',
  darwin: 'macOS',
  linux: 'Linux',
};

document.querySelector('#greet').innerHTML = greet();
document.querySelector('#os').innerHTML = osMap[process.platform];
document.querySelector('#author').innerHTML = manifest.author;
document.querySelector('#env').innerHTML = env.name;
document.querySelector('#electron-version').innerHTML = process.versions.electron;