(function() {
  'use strict';
  var space = new SpaceCustomize(24, 'devipfksz');
  var domain = space.domain;
  var currentURL = location.href;

  // アプリの画面で読み込まないように変更
  if (!(currentURL.indexOf('https://' + domain + '/k/#/') === 0 || currentURL === 'https://' + domain + '/k/')) {
    return;
  }

  space.events(function() {
    console.log(space.getSpaceBody());
  }, true);

})();
