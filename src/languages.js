define(['jquery', 'list', 'fuzzySearch'], function($, List, Fuzzy) {
  var $currentLang = $('#current-language');
  var $languageList = $('#list-of-languages');
  var $languageSearch = $('#language-search');
  var $emptyMessage = $('#empty-message');
  var fuzzy = new Fuzzy({
    threshold: 1
  });
  var langs = new List('list-of-languages', {
    valueNames: ['localized-name', 'english-name'],
    plugins: [fuzzy]
  });

  $currentLang.on('click', function() {
    var offset = $currentLang.position();

    if ($languageList.is(':visible')) {
      $languageList.fadeOut(100);
      return;
    }

    $languageList.css({
      top: ( offset.top - 18 )+ 'px',
      left: ( offset.left + $currentLang.width() + 25 ) + 'px',
    }).fadeIn(100);

    $languageSearch.val('');
    langs.search();

    $(document).on('mousedown', function hideLanguageList() {
      $languageList.fadeOut(100);
      $(document).off('mousedown', hideLanguageList);
    });

  });

  $languageList.on('mousedown', function(e) {
    e.stopPropagation();
  });

  if ($languageList.length) {
    $languageSearch.on('keyup', function(e) {
      var $firstResult;
      if (e.which === 13) {
        $firstResult = $languageList.find('li > a:first-child');
        if ($firstResult.length) {
          $(this).val($firstResult.find('.localized-name').data('hint'));
          window.location = $firstResult[0].href;
          return;
        } else {
          return;
        }
      }
      langs.fuzzySearch.search(this.value);
      if (!langs.visibleItems.length) {
        $emptyMessage.show();
      } else {
        $emptyMessage.hide();
      }
    });
  }
});
