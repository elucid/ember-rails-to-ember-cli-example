import Resolver from 'ember/resolver';

export default Resolver.extend({
  normalize: function(fullName) {
    var split = fullName.split(':', 2),
        type = split[0],
        name = split[1];

    Ember.assert("Tried to normalize a container name without a colon (:) in it. You probably tried to lookup a name that did not contain a type, a colon, and a name. A proper lookup name would be `view:post`.", split.length === 2);

    if (split.length > 1) {
      var modulePrefix = this.namespace.modulePrefix;
      var typePath = type + 's';
      var moduleName = Ember.String.dasherize(split[1].replace(/\./g, '/'));
      var modulePath = [modulePrefix, typePath, moduleName].join('/');

      // First, try to find the module where ember-cli would locate it.
      // If we succeed, use it.
      if (requirejs.entries[modulePath]) {
        return split[0] + ":" + moduleName;
      }
    }

    // We don't have a module, so fall back to finding item defined via the app namespace.
    if (type !== 'template') {
      var result = name;

      if (result.indexOf('.') > -1) {
        result = result.replace(/\.(.)/g, function(m) { return m.charAt(1).toUpperCase(); });
      }

      if (name.indexOf('_') > -1) {
        result = result.replace(/_(.)/g, function(m) { return m.charAt(1).toUpperCase(); });
      }

      return type + ':' + result;
    } else {
      return fullName;
    }
  }
});
