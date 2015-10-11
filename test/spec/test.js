/* global describe, it */

(function () {
  'use strict';

  var testGlobal = {};
  gameLife(testGlobal);
  describe('Game logic test: game_logic.js', function () {
    describe('set map size', function () {
      it('init and resize the map', function () {
        for (var x = 3; x <= 5; x++) {
          for (var y = 3; y <= 5; y++) {
            testGlobal.__testOnly__.initArray(x, y);
            testGlobal.__testOnly__.setWidth(x);
            testGlobal.__testOnly__.setHeight(y);
            var showMap = testGlobal.__testOnly__.getShowMap();
            var calculationMap = testGlobal.__testOnly__.getCalculationMap();
            var gameInfo = testGlobal.gameInfo();
            gameInfo.width.should.equal(x);
            gameInfo.height.should.equal(y);
            showMap.should.have.length(y);
            calculationMap.should.have.length(y);
            for (var i = 0; i < y; i++) {
              showMap[i].should.have.length(x);
              calculationMap[i].should.have.length(x);
            }
          }
        }
      });
    });
    describe('cell judge test', function () {
      before(function() {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
      });
    });
  });
})();
