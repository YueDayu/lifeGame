(function() {
  'use strict';

  gameLife(window);

  var widthInput = $('#width');
  var heightInput = $('#height');
  var rateInput = $('#rate');
  var densityInput = $('#density');
  var reloadBtn = $('#reload');
  var pauseBtn = $('#pause');

  var setInfo = function() {
    var gameInfo = window.gameInfo();
    widthInput.val(gameInfo.width);
    heightInput.val(gameInfo.height);
    rateInput.val(gameInfo.rate);
    densityInput.val(gameInfo.density);
  };

  var getInfo = function() {
    return {
      width: Number(widthInput.val()),
      height: Number(heightInput.val()),
      rate: Number(rateInput.val()),
      density: Number(densityInput.val())
    }
  };

  window.lifeGame('show', 100, 100, 10, 100, 0.5);
  setInfo();
  reloadBtn.click(function() {
    var info = getInfo();
    window.reloadGame(info.width, info.height, info.rate, info.density);
    setInfo();
  });

  pauseBtn.click(function() {
    if (run.gameInfo().isStart) {
      window.gameControl.stop();
      pauseBtn.html('继续');
    } else {
      window.gameControl.start();
      pauseBtn.html('暂停');
    }
  });
})();
