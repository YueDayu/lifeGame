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
      it('show maps should be 0s and calculate map should be 1s', function () {
        testGlobal.__testOnly__.initArray(10, 10);
        testGlobal.__testOnly__.setWidth(10);
        testGlobal.__testOnly__.setHeight(10);
        var info = testGlobal.gameInfo();
        var showMap = testGlobal.__testOnly__.getShowMap();
        var calculationMap = testGlobal.__testOnly__.getCalculationMap();
        for (var i = 0; i < info.width; i++) {
          for (var j = 0; j < info.height; j++) {
            assert.equal(showMap[i][j], 0);
            assert.equal(calculationMap[i][j], 1);
          }
        }
      });
    });
    describe('judge function', function () {
      it('wall cell', function () {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
        testGlobal.__testOnly__.setHeight(5);
        for (var i = 0; i < 100; i++) {
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              testGlobal.__testOnly__.setShowMap(x, y, Math.random() < 0.4 ? 0 : 1);
            }
          }
          testGlobal.__testOnly__.setShowMap(2, 2, 2);
          testGlobal.__testOnly__.judge(2, 2).should.equal(2);
        }
      });
      it('stay', function () {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
        testGlobal.__testOnly__.setHeight(5);
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            if (x == 2 || y == 2) continue;
            testGlobal.__testOnly__.setShowMap(x, y, Math.random() < 0.4 ? 0 : 1);
          }
        }
        testGlobal.__testOnly__.setShowMap(1, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 1, 1);
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(1);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);
      });
      it('life', function () {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
        testGlobal.__testOnly__.setHeight(5);
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            if (x == 2 || y == 2) continue;
            testGlobal.__testOnly__.setShowMap(x, y, Math.random() < 0.4 ? 0 : 1);
          }
        }
        testGlobal.__testOnly__.setShowMap(1, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 1, 1);
        testGlobal.__testOnly__.setShowMap(3, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(1);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(1);
      });
      it('dead', function () {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
        testGlobal.__testOnly__.setHeight(5);
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            if (x == 2 || y == 2) continue;
            testGlobal.__testOnly__.setShowMap(x, y, Math.random() < 0.4 ? 0 : 1);
          }
        }
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);

        testGlobal.__testOnly__.setShowMap(1, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);

        testGlobal.__testOnly__.setShowMap(1, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 1, 1);
        testGlobal.__testOnly__.setShowMap(3, 2, 1);
        testGlobal.__testOnly__.setShowMap(4, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(0);
      });
      it('edge loop', function () {
        testGlobal.__testOnly__.initArray(4, 4);
        testGlobal.__testOnly__.setWidth(4);
        testGlobal.__testOnly__.setHeight(4);
        testGlobal.__testOnly__.setShowMap(1, 2, 1);
        testGlobal.__testOnly__.setShowMap(2, 0, 1);
        testGlobal.__testOnly__.setShowMap(2, 2, 1);
        testGlobal.__testOnly__.judge(2, 2).should.equal(1);
        testGlobal.__testOnly__.setShowMap(2, 2, 0);
        testGlobal.__testOnly__.judge(2, 2).should.equal(1);
      });
    });
    describe('one step test', function () {
      before(function () {
        testGlobal.__testOnly__.initArray(5, 5);
        testGlobal.__testOnly__.setWidth(5);
        testGlobal.__testOnly__.setHeight(5);
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            testGlobal.__testOnly__.setShowMap(x, y, Math.random() < 0.4 ? 0 : 1);
          }
        }
      });
      it('step test', function () {
        var map = testGlobal.__testOnly__.getShowMap();
        var map1 =  $.extend(true, {}, map);
        testGlobal.__testOnly__.oneStep();
        var map2 = testGlobal.__testOnly__.getCalculationMap();
        for (var x = 0; x < 5; x++) {
          for (var y = 0; y < 5; y++) {
            map1[x][y].should.equal(map2[x][y]);
          }
        }
      });
    });
    describe('life rate test', function () {
      before(function () {
        testGlobal.__testOnly__.initArray(100, 100);
        testGlobal.__testOnly__.setWidth(100);
        testGlobal.__testOnly__.setHeight(100);
      });
      it('life rate random', function () {
        for (var i = 0; i <= 1; i += 0.1) {
          testGlobal.__testOnly__.setLifeRate(i);
          for (var x = 0; x < 100; x++) {
            for (var y = 0; y < 100; y++) {
              testGlobal.__testOnly__.setShowMap(x, y, 0);
            }
          }
          testGlobal.__testOnly__.randomMap();
          var showMap = testGlobal.__testOnly__.getShowMap();
          var num = 0;
          for (var x = 0; x < 100; x++) {
            for (var y = 0; y < 100; y++) {
              if (showMap[x][y] == 1) {
                num++;
              }
            }
          }
          expect(Math.abs(i - num / 10000)).to.be.below(0.02);
        }
      });
    });
    describe('render test', function () {
      before(function () {
        testGlobal.lifeGame('show', 100, 100, 10, 100, 0.5);
        testGlobal.gameControl.stop();
      });
      it('render test', function () {
        var showMap = testGlobal.__testOnly__.getShowMap();
        var context = testGlobal.__testOnly__.getCanvasContext();
        var canvas = testGlobal.__testOnly__.getCanvas();
        var surface = context.getImageData(0, 0, canvas.width, canvas.height);
        var info = testGlobal.gameInfo();
        for (var i = 0; i < 100; i++) {
          for (var j = 0; j < 100; j++) {
            var color = surface.data[((i * info.size + info.size / 2) * surface.width * 4) + ((j * info.size + info.size / 2) * 4)];
            if (color == 0) {
              showMap[i][j].should.equal(1);
            } else {
              showMap[i][j].should.equal(0);
            }
          }
        }
      });
      it('reload render test', function () {
        testGlobal.reloadGame(20, 20, 10, 0.5);
        testGlobal.gameControl.stop();
        var showMap = testGlobal.__testOnly__.getShowMap();
        var context = testGlobal.__testOnly__.getCanvasContext();
        var canvas = testGlobal.__testOnly__.getCanvas();
        var surface = context.getImageData(0, 0, canvas.width, canvas.height);
        var info = testGlobal.gameInfo();
        for (var i = 0; i < 20; i++) {
          for (var j = 0; j < 20; j++) {
            var color = surface.data[((i * info.size + info.size / 2) * surface.width * 4) + ((j * info.size + info.size / 2) * 4)];
            if (color == 0) {
              showMap[i][j].should.equal(1);
            } else {
              showMap[i][j].should.equal(0);
            }
          }
        }
        //document.getElementById('show').removeChild(canvas);
      });
    });
    describe('game control test', function () {
      it('start and stop test', function () {
        testGlobal.gameControl.start();
        testGlobal.gameInfo().isStart.should.equal(true);
        testGlobal.gameControl.start();
        testGlobal.gameInfo().isStart.should.equal(true);
        testGlobal.gameControl.stop();
        testGlobal.gameInfo().isStart.should.equal(false);
        testGlobal.gameControl.stop();
        testGlobal.gameInfo().isStart.should.equal(false);
      });
      it('reload data test', function () {
        testGlobal.reloadGame(10, 10, 10, 0.5);
        var info = testGlobal.gameInfo();
        info.width.should.equal(10);
        info.height.should.equal(10);
        info.rate.should.equal(10);
        info.density.should.equal(0.5);
        testGlobal.reloadGame(-1, -1, -1, -1);
        info = testGlobal.gameInfo();
        info.width.should.equal(10);
        info.height.should.equal(10);
        info.rate.should.equal(10);
        info.density.should.equal(0.5);
        testGlobal.reloadGame(151, 151, 50, 1.5);
        info = testGlobal.gameInfo();
        info.width.should.equal(10);
        info.height.should.equal(10);
        info.rate.should.equal(10);
        info.density.should.equal(0.5);
      });
    });
  });
})();
