define(['jquery', 'list'], function($, List) {
  var $languageList = $('#list-of-languages');
  var $emptyMessage = $('#empty-message');

  if ($languageList.length) {
    var langs = new List('list-of-languages', {
      valueNames: [ 'localized-name', 'alternate-names' ]
    });
    $('#language-search').on('keyup', function() {
      var results = langs.search(this.value);
      if(!results.length) {
        $emptyMessage.show();
      } else {
        $emptyMessage.hide();
      }
    });
  }
});
