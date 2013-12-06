var express = require('express');
var Habitat = require('habitat');
var nunjucks = require('nunjucks');
var routes = require('./routes');
var path = require('path');
var i18n = require('webmaker-i18n');

Habitat.load();

var app = express();
var env = new Habitat();
var optimize = env.get('OPTIMIZE');

var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/src'), {
  autoescape: true
});
var cacheSettings = optimize ? { maxAge: '31556952000' } : undefined; // one year;
var standardText = require('./data/standard.json');

nunjucksEnv.express(app);

app.use(i18n.middleware({
  supported_languages: env.get('SUPPORTED_LANGS'),
  default_lang: 'en-US',
  mappings: env.get('LANG_MAPPINGS'),
  translation_directory: path.resolve(__dirname, 'locale')
}));

app.locals({
  version: standardText.version,
  OPTIMIZE: env.get('OPTIMIZE'),
  languages: i18n.getSupportLanguages()
});

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/dist', cacheSettings));
app.use(express.static(__dirname + '/public', cacheSettings));
app.use('/bower_components', express.static(__dirname + '/bower_components', cacheSettings));

app.use(app.router);

routes(app, standardText.text);

app.listen(env.get('PORT'), function () {
  console.log('Now listening on http://localhost:%d', env.get('PORT'));
});
