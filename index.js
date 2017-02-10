/*
 * @Author: dctxf
 * @Date:   2017-02-08 15:24:54
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-02-10 11:27:38
 */
'use strict';
const path = require('path');
const electron = require('electron');

const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
const config = require('./config');
const menu = require('./components/menu');
const weather = require('./components/weather');

let trayIcon = null;

// const appIcon = new Tray('./assets/logo.jpg');
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

app.setName(config.APP_NAME);
// app.dock.setIcon(path.join(__dirname, config.LOGO));
app.dock.hide();


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

function setTitle() {
	weather.get(config.WEATHER, function(res) {
		let weather;
		if (typeof res === 'object') {
			weather = res.city + ' ' + res.status1 + ' ' + res.temperature1 + res.temperature2 + '℃';
		} else {
			weather = res;
		}
		trayIcon.setTitle(weather);
		// console.log('time is setted');
	});
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

app.on('will-finish-launching', () => {
	// mainWindow = createMainWindow();
	/*app set*/
	menu();

});

app.on('ready', () => {
	/*tray set*/
	let img = path.join(__dirname, config.ICON);
	trayIcon = new Tray(img);
	trayIcon.setTitle(config.APP_NAME);
	trayIcon.setToolTip(config.APP_NAME);
	setTitle();
	let timer = setInterval(setTitle, 1000 * 60 * 60 * 6);
	const contextMenu = Menu.buildFromTemplate([
		/*{
				label: '详细天气',
				type: 'normal'
			},*/
		{
			label: '⌘ 退出',
			type: 'normal',
			role: 'quit'
		}
	]);
	trayIcon.setContextMenu(contextMenu);
	// contextMenu.insert(0, contextMenu);
});