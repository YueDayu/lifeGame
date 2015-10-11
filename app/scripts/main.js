(function() {
  'use strict';

  var run = {};
  gameLife(run);

  var width_input = $('#width');
  var height_input = $('#height');
  var rate_input = $('#rate');
  var density_input = $('#density');
  var reload_btn = $('#reload');
  var pause_btn = $('#pause');

  var setInfo = function() {
    var gameInfo = run.gameInfo();
    width_input.val(gameInfo.width);
    height_input.val(gameInfo.height);
    rate_input.val(gameInfo.rate);
    density_input.val(gameInfo.density);
  };

  var getInfo = function() {
    return {
      width: Number(width_input.val()),
      height: Number(height_input.val()),
      rate: Number(rate_input.val()),
      density: Number(density_input.val())
    }
  };

  run.lifeGame('show', 100, 100, 10, 100, 0.5);
  setInfo();
  reload_btn.click(function() {
    var info = getInfo();
    run.reloadGame(info.width, info.height, info.rate, info.density);
    setInfo();
  });

  pause_btn.click(function() {
    if (run.gameInfo().isStart) {
      run.gameControl.stop();
      pause_btn.html('继续');
    } else {
      run.gameControl.start();
      pause_btn.html('暂停');
    }
  });
})();
