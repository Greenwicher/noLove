// variables
var $window = $(window), $animation, gardenCtx, gardenCanvas, $garden, garden, offsetX, offsetY;
var clientWidth = $window.width();
var clientHeight = $window.height();

$(function () {
	/* enable syntax highlighting
	 shouldn't use hljs.initHighlightingOnLoad() to bind the 
	 initHighlighting() with onLoad event or typewriter won't receive 
	 rendered html
	*/
	hljs.initHighlighting();

	/* start type the codes */
	adjustCodePosition();
	$("#code").typewriter();

	/* start the animation */
	setTimeout(function () {
		startButterflyAnimation();
	}, 60000);

	/* start the counter */

	var together = new Date();
	together.setFullYear(1992, 12, 22);
	together.setHours(8);
	together.setMinutes(0);
	together.setSeconds(0);
	together.setMilliseconds(0);
	timeElapse(together);
	// exec function every 500 milliseconds
	setInterval(function () {
		timeElapse(together);
	}, 1000);

    // setup garden
	$animation = $("#animation");
    gardenCanvas = $("#garden")[0];
	gardenCanvas.width = $animation.width();
    gardenCanvas.height = $animation.height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter"; // rendering mode
    garden = new Garden(gardenCtx, gardenCanvas);

	offsetX = $animation.width() / 2 + 20;
	offsetY = $animation.height() / 2 + 10;
	
	$("#content").css("width", $animation.width() + $("#code").width());
	$("#content").css("height", Math.max($animation.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

/* re-render the page when window size changes */
$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getButterflyPoint(angle) {
	var t = angle / Math.PI;
	// var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	// var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	var cost = Math.cos(t), sint = Math.sin(t);
	var equ = Math.exp(sint) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(-Math.PI / 24 + t / 12.0), 5);
	var x = 100 * cost * equ, y = -80 * sint * equ;
	return new Array(offsetX + x, offsetY + y);
}

function startButterflyAnimation() {
	var interval = 150;
	var angle = 5;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getButterflyPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 25) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), text = $ele.html(), progress = 0, maxSpeed = 95, minSpeed = 45, rand;
			$ele.html('');
			/* type sound */
			$audio = $("#sound")[0];
			/* random typing speed to make it more real */
			(function loop() {
			    setTimeout(function() {
			    	rand = Math.round(Math.random() * (maxSpeed - minSpeed)) + minSpeed
					var current = text.substr(progress, 1);
					progress = (current == '<' ? text.indexOf('>', progress) : progress) + 1;
					$ele.html(text.substr(0, progress) + ((progress & 1) && progress < text.length ? '_' : ''));
					if ($audio.ended || $audio.paused) $audio.play();
					if (progress < text.length) loop();  
			                else $audio.play();
			    }, rand);
			}());
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds"; 
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showHope();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 270);
	$('#words').css("left", $("#garden").position().left + 120);
}

function adjustCodePosition() {
	// alert($("#garden").height() + " " + $("#code").height());
	//$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showHope() {
	$('#hope').fadeIn(3000);
}
