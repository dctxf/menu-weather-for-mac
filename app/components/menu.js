/*
 * @Author: dctxf
 * @Date:   2017-02-08 15:23:28
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-02-08 17:09:51
 */

'use strict';
const path = require('path');
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;

module.exports = function() {
  const template = [{
    role: 'help',
    submenu: [{
      label: '联系作者',
      click() {
        require('electron').shell.openExternal('https://dctxf.com')
      }
    }]
  }]
  if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [{
          role: 'about'
        }]
      })
      /*  // Edit menu.
      template[1].submenu.push({
          type: 'separator'
        }, {
          label: 'Speech',
          submenu: [{
            role: 'startspeaking'
          }, {
            role: 'stopspeaking'
          }]
        })
        // Window menu.
      template[3].submenu = [{
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: 'Zoom',
        role: 'zoom'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        role: 'front'
      }]*/
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);



}