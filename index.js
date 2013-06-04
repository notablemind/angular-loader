
var angular = require('angularjs');

var registered = {};
var register = function (name, component) {
  if (registered[name]) return;
  registered[name] = true;
  var deps = component.deps ? Object.keys(component.deps) : [];
  for (var i=0; i<deps.length; i++) {
    register(deps[i], component.deps[deps[i]]);
  }
  var mod = registered[name] = angular.module(name, deps);
  if (component.directive) {
    mod.directive(name, component.directive);
  }
  if (component.filter) {
    mod.filter(name, component.filter);
  }
  if (component.directives) {
    var keys = Object.keys(component.directives);
    keys.forEach(function(name) {
      mod.directive(name, component.directives[name]);
    });
  }
  if (component.filters) {
    var keys = Object.keys(component.filters);
    keys.forEach(function(name) {
      mod.filter(name, component.filters[name]);
    });
  }
};

module.exports = register;

