
# angular-components

  Bootstrap components into angular modules

## Installation

    $ component install notablemind/angular-components

## API

### module.exports(require, name)

#### require

The function with which to require components

#### name

The name of the component to require and angularify

### module.exports.register(name, component)

#### name

The name of the component (angular module)

#### component

Object, defining how the angular module is to be initialized.

##### directive: obj; used as

    mod.directive(name, function(){
      return comp.directive
    });

##### filter: fn; used as

    mod.directive(name, comp.filter)

##### directives: obj; `{name: config, ...}`
##### filters: obj; `{name: fn}`

## License

  MIT
