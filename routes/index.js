module.exports = function(app, standardText, languages) {

  function page(title, data) {
    data = data || {};
    data.pageTitle = title;
    return function(req, res) {
      res.render(title + '.html', data);
    };
  }

  app.get('/settings', page('settings'));

  app.get('/', function(req, res) {
    res.redirect('/' + req.localeInfo.lang + '/v' + app.locals.version);
  });

  app.get('/skills/:code', function(req, res) {
    res.redirect('/' + req.localeInfo.lang + '/skills/' + req.params.code + '/v');
  });

  app.get('/skills/:code/:version', function(req, res) {
    try {
      var indexes = req.params.code.split('.');
      var strand = indexes[0];
      var competency = indexes[1];
      var skill = indexes[2];
      var isWrongVersion = req.params.version === ('v' + app.locals.version) ? false : req.params.version;

      res.render('skill.html', {
        wrongVersion: isWrongVersion,
        code: strand + '.' + competency + '.' + skill,
        strand: standardText[strand - 1].strand,
        competency: standardText[strand - 1].competencies[competency - 1].competency,
        skillText: standardText[strand - 1].competencies[competency - 1].skills[skill - 1].skill
      });
    } catch(err) {
      res.send('Oops not found.');
    }
  });

  app.get('/languages', function(req, res) {
    res.render('languages.html', {
      languages: languages
    });
  });

  app.get('/v' + app.locals.version, page('index', {
    standardText: standardText
  }));

};
