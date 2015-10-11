/**
 * Created by Yue Dayu on 2015/9/27.
 */

var gameLife = function (global) {
  'use strict';

  var size = 10;
  var width = 100;
  var height = 100;
  var showMap;
  var calculationMap;
  var canvas, context;
  var lineColor = '#bbb',
    lineWidth = 2;
  var lifeColor = '#000',
    deadColor = '#fff',
    wallColor = '#aaa';
  var burn = 3,
    stay = 2;
  var time = 100;
  var lifeRate = 0.5;
  var isStart = false;
  var gameLoop;
  var container;

  /*
   * judge
   */
  var judge = function (x, y) {
    if (showMap[x][y] == 2) return 2;
    var sum = 0;
    for (var dx = -2; dx <= 2; dx++) {
      if (dx === 0) continue;
      sum += (showMap[(x + dx + height) % height][(y + width) % width] == 1);
    }
    for (var dy = -2; dy <= 2; dy++) {
      if (dy === 0) continue;
      sum += (showMap[(x + height) % height][(y + dy + width) % width] == 1);
    }
    if (sum === burn) {
      return 1;
    } else if (sum != stay) {
      return 0;
    } else {
      return showMap[x][y];
    }
  };

  /*
   * next step
   */
  var nextStep = function () {
    for (var x = 0; x < height; x++) {
      for (var y = 0; y < width; y++) {
        calculationMap[x][y] = judge(x, y);
      }
    }
    var temp = false;
    for (x = 0; x < height; x++) {
      for (y = 0; y < width; y++) {
        temp = showMap[x][y];
        showMap[x][y] = calculationMap[x][y];
        calculationMap[x][y] = temp;
      }
    }
  };

  /*
   * random map
   */
  var randomMap = function () {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        showMap[i][j] = Boolean(Math.random() < lifeRate) ? 1 : 0;
      }
    }
  };

  /*
   * draw cells
   */
  var render = function () {
    context.save();
    context.fillStyle = lifeColor;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        context.beginPath();
        context.rect(j * size + lineWidth / 2, i * size + lineWidth / 2, size - lineWidth, size - lineWidth);
        if (showMap[i][j] === calculationMap[i][j]) continue;
        if (showMap[i][j] == 1) {
          context.fill();
        }
      }
    }
    context.fillStyle = deadColor;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        context.beginPath();
        context.rect(j * size + lineWidth / 2, i * size + lineWidth / 2, size - lineWidth, size - lineWidth);
        if (showMap[i][j] === calculationMap[i][j]) continue;
        if (showMap[i][j] == 0) {
          context.fill();
        }
      }
    }
    context.fillStyle = wallColor;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        context.beginPath();
        context.rect(j * size + lineWidth / 2, i * size + lineWidth / 2, size - lineWidth, size - lineWidth);
        if (showMap[i][j] === calculationMap[i][j]) continue;
        if (showMap[i][j] == 2) {
          context.fill();
        }
      }
    }
    context.restore();
  };

  /*
   * draw the lines.
   */
  var drawGrid = function () {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    for (var i = 0; i <= width; i++) {
      context.moveTo(i * size, 0);
      context.lineTo(i * size, height * size);
    }
    for (i = 0; i <= height; i++) {
      context.moveTo(0, i * size);
      context.lineTo(width * size, i * size);
    }
    context.stroke();
  };

  /*
   * start!
   */
  var start = function () {
    if (isStart) return;
    isStart = true;
    gameLoop = setInterval(function () {
      nextStep();
      render();
    }, time);
  };

  /*
   * Stop!
   */
  var stop = function () {
    if (isStart) {
      clearInterval(gameLoop);
    }
    isStart = false;
  };

  /*
   * init the arrays
   */
  var initArray = function (x, y) {
    showMap = new Array(y);
    calculationMap = new Array(y);
    for (var i = 0; i < y; i++) {
      showMap[i] = new Array(x);
      calculationMap[i] = new Array(x);
      for (var j = 0; j < x; j++) {
        showMap[i][j] = 0;
        calculationMap[i][j] = 1;
      }
    }
  };

  /*
   * param: (id, width, height, size, time, rate), (id, width), (id) or ()
   */
  var init = function () {
    if (arguments.length === 2) {
      width = height = arguments[1];
    } else if (arguments.length >= 3) {
      width = arguments[1];
      height = arguments[2];
      size = arguments[3];
      time = arguments[4];
      lifeRate = arguments[5];
    }
    initArray(width, height);
    if (arguments.length != 0) {
      container = document.getElementById(arguments[0]);
    }
    canvas = document.createElement('canvas');
    canvas.width = width * size;
    canvas.height = height * size;
    container.appendChild(canvas);
    context = canvas.getContext('2d');
    drawGrid();
    randomMap();
    render();
    start();
    $(canvas).mousedown(function (event) {
      var y = Math.floor((event.offsetX) / 10);
      var x = Math.floor((event.offsetY) / 10);
      calculationMap[x][y] = showMap[x][y];
      if (showMap[x][y] != 1) {
        showMap[x][y] = 2 - showMap[x][y];
      } else {
        showMap[x][y] = 2;
      }
      render();
    });
  };

  /*
   * reload
   */
  var reload = function (x, y, n_time, n_rate) {
    stop();
    if (x > 0 && x <= 150) {
      width = x;
    }
    if (y > 0 && y <= 150) {
      height = y;
    }
    if (n_time > 0 && n_time <= 30) {
      time = 1000 / n_time;
    }
    if (n_rate >= 0 && n_rate <= 1) {
      lifeRate = n_rate;
    }
    container.removeChild(canvas);
    init();
  };

  global.lifeGame = init;
  global.reloadGame = reload;
  global.gameInfo = function () {
    return {
      width: width,
      height: height,
      rate: Math.round(1000 / time),
      density: lifeRate,
      isStart: isStart,
      size: size,
      lifeColor: lifeColor,
      deadColor: deadColor,
      wallColor: wallColor
    }
  };
  global.gameControl = {
    stop: stop,
    start: start
  };

  global.__testOnly__ = {
    initArray: initArray,
    judge: judge,
    randomMap: randomMap,
    oneStep: nextStep,
    getCalculationMap: function() {
      return calculationMap;
    },
    getShowMap: function() {
      return showMap;
    },
    setWidth: function(x) {
      width = x;
    },
    setHeight: function(y) {
      height = y;
    },
    setShowMap: function(x, y, val) {
      showMap[x][y] = val;
    },
    setLifeRate: function (rate) {
      lifeRate = rate;
    },
    getCanvasContext: function () {
      return context;
    },
    getCanvas: function () {
      return canvas;
    }
  };
};
