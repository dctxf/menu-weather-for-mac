/*
 * @Author: dctxf
 * @Date:   2017-02-08 15:24:54
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-02-08 17:58:15
 */
'use strict';
const path = require('path');
const request = require('request');
const electron = require('electron');
const xml2js = require('xml2js');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const config = require('./config');
const menu = require('./components/menu');

let trayIcon = null;

// const appIcon = new Tray('./assets/logo.jpg');
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
// let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		title: 'menu weather'
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/*app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});*/

app.on('ready', () => {
	// mainWindow = createMainWindow();
	app.setName(config.APP_NAME);
	app.dock.setIcon(path.join(__dirname, config.LOGO))
	menu();
	let img = path.join(__dirname, config.ICON);
	trayIcon = new Tray(img);
	trayIcon.setTitle(config.APP_NAME);
	trayIcon.setToolTip(config.APP_NAME);
	request.get(config.WEATHER, function(err, res, req) {
		if (err) {

		} else {
			let parser = new xml2js.Parser();
			let weatherJSON;
			parser.parseString(res.body, function(err, result) {
				if (!err) {
					weatherJSON = result.Profiles.Weather[0];
					let weather = weatherJSON.city + ' ' + weatherJSON.status1 + ' ' + weatherJSON.temperature1 + weatherJSON.temperature2 + '度';
					trayIcon.setTitle(weather);
				}
			});

		}
	});
	/*const contextMenu = Menu.buildFromTemplate([{
		label: 'Item1',
		type: 'radio'
	}, {
		label: 'Item2',
		type: 'radio'
	}, {
		label: 'Item3',
		type: 'radio',
		checked: true
	}, {
		label: 'Item4',
		type: 'radio'
	}]);
	trayIcon.setContextMenu(contextMenu);*/
});