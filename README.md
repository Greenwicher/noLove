### Intro

A HTML5 page using codes to express the author's feelings of not having a boyfriend. The codes appear in a typewritter kindof fashion (with sound). Then a butterfly is drawn on the canvas made of flower pedals. It is quite dreamy. A timer then emerges saying that how many seconds the author's been waiting for true love to show up. This work is inspired by [Hackerzhou](https://github.com/hackerzhou)'s [love page](http://hackerzhou.me/love).

<i class="icon-eye-open"></i> [No-Love Page][0]

[<img src="https://raw.github.com/daisygao/noLove/master/assets/media/nolove-screenshot.png" class="img-polaroid">][0]

### Markdown Code and Syntax Highlighting

I use the [markdown][1] language for code rendering under [ruhoh][2] framework. For syntax highlighting, I use [highlight.js][3]. So basically, I just need to write down my codes like coding in a normal text editor. Markdown framework will turn them into the format that highlight.js would recognize and render. You can check out my index.md for the source code.

To enable the highlighting, you should include the following lines in the html:
	
	<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/idea.min.css">
	<script type="text/javascript" src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>

and the following in the javascript file:
	
	hljs.initHighlighting();


### jQuery Typewriter Effect

I use a self-called closure <code>loop()</code> function together with <code>setTimeOut()</code> to achive a random interval typing effect, which is more close to real-life scenarios.

	/* random typing speed to make it more real */
	(function loop() {
	    setTimeout(function() {
	    	rand = Math.round(Math.random() * (maxSpeed - minSpeed)) + minSpeed
			var current = text.substr(progress, 1);
			progress = (current == '<' ? text.indexOf('>', progress) : progress) + 1;
			$ele.html(text.substr(0, progress) + ((progress & 1) && progress < text.length ? '_' : ''));
			if ($audio.ended || $audio.paused) $audio.play();
			if (progress < text.length) loop();  
			else $audio.pause();
	    }, rand);
	}());

### HTML5 Audio

HTML5 has many new elements added such as audio, video, article and etc. I use <code>&lt;audio&gt;</code> to store the typing sound:
	
	<audio id="sound">
	    <source src="pathto/type.ogg" type="audio/ogg" />
	    <source src="pathto/type.mp3" type="audio/mpeg" />
	    Your browser does not support HTML5 audio.
	</audio>

Note that some browser only supports .ogg format like firefox, so it's better to include audio files in both .mp3 and .ogg formats. An online mp3 to ogg converter can be found [here](http://audio.online-convert.com/convert-to-ogg). More detailed usage of HTML5 audio can be found [here][4].

jQuery is then used to extract the audio object and perform methods like <code>play(), pause()</code> or extract attribute such as <code>paused, ended</code>. More properties of audio can be found in [w3schools audio][5].

	/* type sound */
	$audio = $("#sound")[0];

	if ($audio.ended || $audio.paused) $audio.play();
	if (progress < text.length) loop();  
	else $audio.pause();

Note that <code>$("#sound")</code> only retrieves the jQuery object, whose first element is the DOM audio object that we can use. It's the same with canvas in next section.

### HTML5 Canvas

Canvas is new element in HTML5 to enable drawing a bitmap-based image. It temporarily only supports 2D drawing. All the drawing process is done on some context acquired by calling:
	
	gardenCanvas = $("#garden")[0];
	gardenCanvas.width = $animation.width();
    gardenCanvas.height = $animation.height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter"; // rendering mode

More details can be found in [w3schools canvas][6] and [wiki canvas][7].

### Flower Effect

It's mainly completed by the garden.js library which renders Pedals for each Bloom in the Garden object. I modify the following parts to change the color, grow speed and radius of the flower bloom:
	
	Garden.options = {
        petalCount: {
            min: 8,
            max: 20
        },
        petalStretch: {
            min: 0.1,
            max: 5
        },
        growFactor: {
            min: 0.1,
            max: 1
        },
        bloomRadius: {
            min: 8,
            max: 12
        },
        density: 15,
        growSpeed: 1000 / 60,
        color: {
			rmin: 128,
			rmax: 220,
			gmin: 0,
			gmax: 128,
			bmin: 220,
			bmax: 255,
            opacity: 0.1
        },
        tanAngle: 60
    };


### Draw a Butterfly

[Butterfly Curve][8]:

<img src="https://raw.github.com/daisygao/noLove/master/assets/media/butterfly.png" class="img-polaroid">

<code>getButterflyPoint()</code> function is used to retrieve the current position on the curve. The position vector is pushed to bloom array of the Garden object and is rendered by calling <code>garden.render()</code> continuously using <code>setInterval()</code>.

### Cute Fonts
The digits in the timer are loaded by defining a new font using [font-face][9]:
	
	<style type="text/css">
		@font-face {
			font-family: digit;
			src: url(pathto/digital-7-mono.ttf) format(truetype);
		}
		#elapseClock .digit{
			font-family: digit, 'Joti One';
		}
	</style>

'Joti One' is defined by calling [Google Fonts][10]:
	
	<link href='http://fonts.googleapis.com/css?family=Satisfy|Joti+One' rel='stylesheet' type='text/css'>


### Minify the Scripts

Minifying javascript and CSS before publishing is a good habit, because:

- It will reduce the loading speed of you page.
- It kindof protects your codes being copied by others.

I use online minifying tools for such tasks:

- [CSS Minifier][11]
- [JavaScript Minifier][12]

### Dev Tools

For front-end development, I use [Sublime Text 2](http://www.sublimetext.com/). Love its auto-complete feature. 
For task management, I use [Wunderlist](https://www.wunderlist.com). The sub-task feature and notes feature saved me so much time.

### In the End
I built this [No-Love page][0] to get a basic understanding of HTML5 and I was moved to cry after seeing how beautiful the page turned out to be. Hope you enjoy it as much as I do =)

[0]: http://daisygao.com/nolove "No Love Page"
[1]: http://daringfireball.net/projects/markdown/ "Markdown Language"
[2]: http://ruhoh.com/ "Ruhoh Static Blog Generator"
[3]: https://github.com/isagalaev/highlight.js "Highlight.js Github"
[4]: http://www.htmlgoodies.com/primers/html/article.php/3920991/HTML5-Primer-How-To-Use-the-Audio-Tag.htm "How to Use HTML5 Audio Tag"
[5]: http://www.w3schools.com/html/html5_audio.asp "HTML5 Audio Properties"
[6]: http://www.w3schools.com/html/html5_canvas.asp "HTML5 Canvas Properties"
[7]: http://en.wikipedia.org/wiki/Canvas_element "HTML5 Canvas Wiki"
[8]: http://www.geometryatlas.com/entries/321 "Butterfly Curve"
[9]: http://www.w3schools.com/cssref/css3_pr_font-face_rule.asp "font-face Properties"
[10]: http://www.google.com/fonts/ "Google Fonts"
[11]: http://cssminifier.com/ "CSS Minifier"
[12]: http://javascript-minifier.com/ "JavaScript Minifier"

