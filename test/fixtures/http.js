"use strict";

var sinon = require('sinon');

exports.req = function() {
  var req = {};
  req.params = {};
  req.user = require("./user").instance;
  req.flash = sinon.spy();
  req.logout = sinon.spy();
  req.isAuthenticated = sinon.stub();
  return req;
};

exports.res = function() {
  var res = {};
  res.json = sinon.spy();
  res.render = sinon.spy();
  res.redirect = sinon.spy();
  res.status = sinon.stub().returns({
    json: res.json
  });
  return res;
};
