requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    main: '../src/main',
    nunjucks: 'nunjucks/browser/nunjucks',
    templates: '../templates',
    jquery: 'jquery/jquery',
    list: 'listjs/dist/list.min'
  }
});

require([
  'jquery'
], function(
  $
) {

  // BASELINE

  var $baseline = $('section');

  window.addEventListener('keypress', function(e) {
    if (e.which === 98) {
      if ($baseline.hasClass('baseline')) {
        $baseline.removeClass('baseline');
      } else {
        $baseline.addClass('baseline');
      }
    }
  }, false);

  // Print button
  $('.download-btn').on('click', function(e) {
    e.preventDefault();
    window.print();
  });

  // Tooltips
  $('section.strand').each(function(iSection, section) {
    var $h2 = $(section).find('h2');
    $h2.addClass('hint--left');
    $h2.attr('data-hint', 'Strand ' + (iSection + 1));
    $(section).find('article').each(function(iCompetency, article) {
      var $h3 = $(article).find('h3');
      $h3.addClass('hint--left');
      $h3.attr('data-hint', 'Competency ' + (iSection + 1) + '.' + (iCompetency + 1));
      // $(article).find('li').each(function(iSkill, skill) {
      //   $(skill).addClass('hint--left');
      //   $(skill).attr('data-hint', 'Skill ' + (iSection + 1) + '.' + (iCompetency + 1) + '.' + (iSkill + 1));
      // });
    });
  });

  $('a[href*=#]:not([href=#])').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 100
    }, 900, 'swing', function() {
      window.location.hash = target;
    });
  });

  var header = document.querySelector('header');
  var joinBadge = document.querySelector('.join-badge-container');

  if (header && joinBadge) {
    $(window).scroll(function(e) {
      var scrollTop = document.body.scrollTop;
      if (scrollTop > 60) {
        header.classList.remove('white');
      } else {
        header.classList.add('white');
      }
      if (scrollTop > 500) {
        joinBadge.classList.add('show');
      } else {
        joinBadge.classList.remove('show');
      }
    });
  }

  var page = $('#require-js').data('page');
  if (page) {
    require(['../' + page]);
  }

});
