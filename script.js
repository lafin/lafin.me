var context = null;
if ('webkitAudioContext' in window) {
    context = new window.webkitAudioContext();
} else if ('AudioContext' in window) {
    context = new window.AudioContext();
} else {
    throw 'Audio api not support';
}

var Player = function (url) {
    function playSound(buffer) {
        analyser.fftSize = 2048;
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyser);
        source.connect(context.destination);
        source.start(0);
        play();
    }

    this.getVisualisationData = function () {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        return array;
    };

    var analyser = context.createAnalyser(),
        request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            playSound(buffer);
        }, console.error);
    };
    request.send();

    return this;
};

var Visualiser = function (id) {
    var width = 1024,
        height = 300,
        ctx,
        gradient;

    var canvas = document.getElementById(id);
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#ff0000');
    gradient.addColorStop(0.75, '#ff0000');
    gradient.addColorStop(0.25, '#ff0000');
    gradient.addColorStop(0, '#e74c3c');

    this.draw = function (data) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = gradient;
        for (var i = 0, len = data.length; i < len; i += 1) {
            var value = data[i];
            ctx.fillRect(i * 3, height - value, 1, height);
        }
        return this;
    };
};

var visualiser = new Visualiser('visualiser');
var player = new Player('sound.mp3');

function play() {
    visualiser.draw(player.getVisualisationData());
    requestAnimationFrame(play);
}