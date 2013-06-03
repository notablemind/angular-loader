
var angular = require('angularjs');

var registered = {};
var register = function (name, component) {
  var mod = registered[name] = angular.module(name, component.deps);
  if (component.directive) {
    mod.directive(name, function(){
      return component.directive;
    });
  }
  if (component.filter) {
    mod.filter(name, component.filter);
  }
  if (component.directives) {
    var keys = Object.keys(component.directives);
    keys.forEach(function(name) {
      mod.directive(name, function(){
        return component.directives[name];
      });
    });
  }
  if (component.filters) {
    var keys = Object.keys(component.filters);
    keys.forEach(function(name) {
      mod.filter(name, component.filters[name]);
    });
  }
};

var getAll = function getAll(require, name) {
  if (registered[name]) return;
  registered[name] = true;
  var comp;
  try {
    comp = require(name);
  } catch (e) {
    console.log('Failed to load angular component: ' + name);
    return;
  }
  for (var i=0; i<comp.deps.length; i++) {
    getAll(require, comp.deps[i]);
  }
  register(name, comp);
};

module.exports = getAll;
module.exports.register = register;
