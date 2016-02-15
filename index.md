<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/idea.min.css">
<script type="text/javascript" src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Satisfy|Joti+One' rel='stylesheet' type='text/css'>
{{# javascripts.load }}
  jquery.js
  garden.js
  functions.js
{{/ javascripts.load }}

{{# stylesheets.load }}
  default.css
{{/ stylesheets.load}}
<style type="text/css">
    @font-face {
        font-family: digit;
        src: url({{urls.media}}/digital-7-mono.ttf) format(truetype);
    }
</style>
<a href="https://github.com/daisygao/noLove" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"></a>
<div id="content">
    <audio id="sound">
        <source src="{{urls.media}}/type.ogg" type="audio/ogg" />
        <source src="{{urls.media}}/type.mp3" type="audio/mpeg" />
        Your browser does not support HTML5 audio.
    </audio>
    <div id="code">

    /* I am a girl named Daisy. I don't have a boyfriend. */
    Girl i = new Girl("Daisy");
    Boy u = null;

    /* These are festivals that matter to college students:
       Valentine's Day, Qixi, Singles' Day, Christmas Eve, 
       New Year's Eve */
    Festival festivals[] = {...};

    /* When I am single... */
    while (u == null) { 
        // I pretend to ignore these days 
        for (Festival x : festivals) {
            i.ignoreFestival(x);
        }
        i.watchMovies(); // I watched 400 movies...
        i.cook();        // I made cupcakes and milk tea... 
        i.travel();      // I traveled on 3 continents
        // I push myself to grow during hard days
        i.grow();   
        // But I am still waiting for the special one
        i.wait();       
        // For I believe some day God will let u show up
        u = God.assignFor(i);   
    }
    /* If we met and happened to like each other */
    if (u.like(i) && i.like(u)) {   
        // We'd watch bad movies together and laugh hard    
        i.watchMoviesWith(u);
        // I'd cook your favorites
        i.cookFor(u);
        // We'd travel all around the world
        i.travelWith(u);
        // We'd grow older and wiser together
        i.growWith(u);
        // We'd love spending each festival together ever since
        for (Festival x : festivals) {
            i.enjoyFestivalWith(x, u);
        }
    }

</div>
    <div id="animation">
        <canvas id="garden"></canvas>
        <div id="words">
            <div id="messages">
                I have been waiting for you for 
                <div id="elapseClock"></div>
            </div>
            <div id="hope">
                Looking forward to seeing you.
                <div class="signature">- daisygao</div>
            </div>
        </div>
    </div>
</div>
<div id="copyright">
    Inspired by [Hackerzhou Love project][1].<br>
    Copyright © 2013 [Daisy Gao][2]
</div>

[1]: https://github.com/hackerzhou/Love "Hackerzhou Love Github project"
[2]: http://daisygao.com "Daisy Gao Homepage"
