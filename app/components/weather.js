/*
 * @Author: dctxf
 * @Date:   2017-02-09 13:51:38
 * @Last Modified by:   dctxf
 * @Last Modified time: 2017-02-09 17:38:07
 */

'use strict';
const request = require('request');
const xml2js = require('xml2js');

exports.get = function(url, callback) {
  request.get(url, function(err, res) {
    if (err) {
      callback('请求出错');
    } else {
      let parser = new xml2js.Parser();
      let weatherJSON;
      parser.parseString(res.body, function(err, result) {
        if (!err) {
          weatherJSON = result.Profiles.Weather[0];
          callback(weatherJSON);
        } else {
          callback('请求失败');
        }
      });
    }
  });
};