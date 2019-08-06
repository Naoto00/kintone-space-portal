/*
The MIT License (MIT)

Copyright (c) 2019 Naoto00.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function() {
  'use strict';
  // スペースポータルのクラス名
  var CONFIG = {
    portalBodyId: 'contents-body-ocean', // ボディ
    ntfClass: 'gaia-argoui-page-space-show-left', // お知らせ
    threadClass: 'gaia-argoui-space-threadlistwidget', // スレッド
    appClass: 'gaia-argoui-space-applistwidget', // アプリ
    peopleClass: 'gaia-argoui-space-peoplelistwidget', // ピープル
    linkClass: 'gaia-argoui-space-relatedlinklistwidget', // 関連リンク
    spaceBodyClass: 'gaia-argoui-space-spacelayout-body', // スペースボディ
    rightBodyClass: 'gaia-argoui-page-space-show-right' // スペースの右側
  };

  window.SpaceCustomize = window.SpaceCustomize || {};

  /**
   * SpaceCustomize のインスタンス
   *
   * @param {Integer} spaceId
   * @param {String} domain
   */
  window.SpaceCustomize = function(spaceId, domain) {
    this.spaceId = spaceId;
    this.domain = domain + '.cybozu.com';
    this.spaceURL = 'https://' + this.domain + '/k/#/space/' + this.spaceId;
    this.setSpaceId = function(newID) {
      this.spaceId = newID;
    };
    this.getSpaceId = function() {
      return this.spaceId;
    };

    /**
     * イベントの定義
     *
     * @param {*} main
     * @param {*} deleteFlag
     */
    this.events = function(main, deleteFlag) {
      // ポータル body を取得
      var body = document.getElementById(CONFIG.portalBodyId);
      var self = this;
      // お知らせ、スレッド、アプリ、ピープルのウィジェットを監視
      var observer = new MutationObserver(function(MutationRecords) {
        // 各ウィジェット削除
        var $targetElm = document.getElementsByClassName(CONFIG.ntfClass);
        if (!$targetElm.length) return;
        if (deleteFlag) {
          self.deleteNtf();
          self.deleteThread();
          self.deleteApp();
          self.deletePeople();
        }
        // 関連リンクのみ描画タイミングが遅いので、別で監視
        var $bo = document.getElementsByClassName(CONFIG.rightBodyClass);
        observerLink.observe($bo[0], options);
        observer.disconnect();
      });
      // observer オプション定義
      var options = {
        childList: true
      };
      // 関連リンクのウィジェットを監視
      var observerLink = new MutationObserver(function(MutationRecord) {
        // 関連リンクウィジェット削除
        var $targetElm = document.getElementsByClassName(CONFIG.linkClass);
        if (!$targetElm.length) return;
        if (deleteFlag) {
          self.deleteLink();
        }
        // コールバック関数実行
        main();
        observerLink.disconnect();
      });

      // 対象のスペース URL で監視開始
      if (location.href === this.spaceURL) {
        observer.observe(body, options);
      }

      // ハッシュ値変更もバインド
      window.onhashchange = function() {
        if (location.href !== self.spaceURL) return;
        observer.observe(body, options);
      };
    };

    this.deleteNtf = function() {
      var $ntfDiv = document.getElementsByClassName(CONFIG.ntfClass);
      if ($ntfDiv.length) {
        $ntfDiv[0].parentNode.removeChild($ntfDiv[0]);
      }
    };
    this.getNtfWidget = function() {
      var $ntfDiv = document.getElementsByClassName(CONFIG.ntfClass);
      return $ntfDiv[0];
    };

    this.deleteThread = function() {
      var $threadDiv = document.getElementsByClassName(CONFIG.threadClass);
      if ($threadDiv.length) {
        $threadDiv[0].parentNode.removeChild($threadDiv[0]);
      }
    };
    this.getThreadWidget = function() {
      var $threadDiv = document.getElementsByClassName(CONFIG.threadClass);
      return $threadDiv[0];
    };

    this.deleteApp = function() {
      var $appDiv = document.getElementsByClassName(CONFIG.appClass);
      if ($appDiv.length) {
        $appDiv[0].parentNode.removeChild($appDiv[0]);
      }
    };
    this.getAppWidget = function() {
      var $appDiv = document.getElementsByClassName(CONFIG.appClass);
      return $appDiv[0];
    };

    this.deletePeople = function() {
      var $peopleDiv = document.getElementsByClassName(CONFIG.peopleClass);
      if ($peopleDiv.length) {
        $peopleDiv[0].parentNode.removeChild($peopleDiv[0]);
      }
    };
    this.getPeopleWidget = function() {
      var $peopleDiv = document.getElementsByClassName(CONFIG.peopleClass);
      return $peopleDiv[0];
    };

    this.deleteLink = function() {
      var $linkDiv = document.getElementsByClassName(CONFIG.linkClass);
      if ($linkDiv.length) {
        $linkDiv[0].parentNode.removeChild($linkDiv[0]);
      }
    };
    this.getLinkWidget = function() {
      var $linkDiv = document.getElementsByClassName(CONFIG.linkClass);
      return $linkDiv[0];
    };

    this.deleteAll = function() {
      this.deleteNtf();
      this.deleteThread();
      this.deleteApp();
      this.deletePeople();
      this.deleteLink();
    };

    this.getSpaceBody = function() {
      var $spaceBody = document.getElementsByClassName(CONFIG.spaceBodyClass);
      return $spaceBody[0];
    };
  };

})();
