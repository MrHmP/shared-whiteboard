(function () {
	/* Canvas */

	var canvas = document.getElementById('drawCanvas');
	var ctx = canvas.getContext('2d');
	var color = document.querySelector(':checked').getAttribute('data-color');

	canvas.width = Math.min(document.documentElement.clientWidth, window.innerWidth || 300);
	canvas.height = Math.min(document.documentElement.clientHeight, window.innerHeight || 300);

	ctx.strokeStyle = color;
	ctx.lineWidth = '3';
	ctx.lineCap = ctx.lineJoin = 'round';

	/* Mouse and touch events */

	document.getElementById('colorSwatch').addEventListener('click', function () {
		color = document.querySelector(':checked').getAttribute('data-color');
	}, false);

	var isTouchSupported = 'ontouchstart' in window;
	var isPointerSupported = navigator.pointerEnabled;
	var isMSPointerSupported = navigator.msPointerEnabled;

	var downEvent = isTouchSupported ? 'touchstart' : (isPointerSupported ? 'pointerdown' : (isMSPointerSupported ? 'MSPointerDown' : 'mousedown'));
	var moveEvent = isTouchSupported ? 'touchmove' : (isPointerSupported ? 'pointermove' : (isMSPointerSupported ? 'MSPointerMove' : 'mousemove'));
	var upEvent = isTouchSupported ? 'touchend' : (isPointerSupported ? 'pointerup' : (isMSPointerSupported ? 'MSPointerUp' : 'mouseup'));

	canvas.addEventListener(downEvent, startDraw, false);
	canvas.addEventListener(moveEvent, draw, false);
	canvas.addEventListener(upEvent, endDraw, false);

	// Web socket connection initialiser

	const ws = new WebSocket('ws://localhost:9898/');
	ws.onopen = function () {
		console.log('WebSocket Client Connected');
		ws.send('Hi this is web client.');
	};
	
	ws.onmessage = function (e) {
		console.log("Received: '" + e.data + "'");
	};

	function publish(data) {
		console.log(`Channel : ${channel} , message: ${JSON.stringify(data)}`);
		ws.send(`Channel : ${channel} , message: ${JSON.stringify(data)}`);
	}

	/* Draw on canvas */

	function drawOnCanvas(color, plots) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(plots[0].x, plots[0].y);

		for (var i = 1; i < plots.length; i++) {
			ctx.lineTo(plots[i].x, plots[i].y);
		}
		ctx.stroke();
	}

	function drawFromStream(message) {
		if (!message || message.plots.length < 1) return;
		drawOnCanvas(message.color, message.plots);
	}

	// Get Older and Past Drawings!
	if (drawHistory) {
		pubnub.history({
			channel: channel,
			count: 50,
			callback: function (messages) {
				pubnub.each(messages[0], drawFromStream);
			}
		});
	}
	var isActive = false;
	var plots = [];

	function draw(e) {
		e.preventDefault();
		if (!isActive) return;

		var x = isTouchSupported ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft);
		var y = isTouchSupported ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);

		plots.push({ x: (x << 0), y: (y << 0) });

		drawOnCanvas(color, plots);
	}

	function startDraw(e) {
		e.preventDefault();
		isActive = true;
	}

	function endDraw(e) {
		e.preventDefault();
		isActive = false;

		publish({
			color: color,
			plots: plots
		});

		plots = [];
	}
})();
