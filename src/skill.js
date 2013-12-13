define([
  'jquery',
  'makeapi',
  'templates',
  'nunjucks',
  'masonry',
  'imagesloaded'
],
function($, Make, templates, nunjucks, Masonry, imagesLoaded) {
  var make = new Make({
    apiURL: 'https://makeapi.webmaker.org'
  });

  make
    .sortByField('likes')
    .limit(10)
    .then(function(err, data) {
      var html = nunjucks.render('src/makes-default/makes-default.html', {
        makes: data
      });
      $('#make-results').html(html);
      var masonry = new Masonry('#make-results', {
        gutter: 10
      });
      // imagesLoaded('.make', function() {
      //   var masonry = new Masonry('#make-results', {
      //     gutter: 10
      //   });
      // });
    });
});
