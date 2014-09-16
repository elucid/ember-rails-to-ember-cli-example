#= require jquery
#= require handlebars
#= require ember
#= require ember-data
#= require loader
#= require ember-resolver
#= require ./resolver
#= require_self
#= require es6_spike

Resolver = require('es6-spike/resolver').default

window.Es6Spike = Ember.Application.create
  modulePrefix: 'es6-spike'
  Resolver: Resolver
