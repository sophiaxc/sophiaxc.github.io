let song, fperb, clap, lyrics, moving, capture, currlyric;
let arrview = 0;
let bpm = 120;
let framerater = 60;
let frameCount = 0;
let secCount = 0;
let lyricSets = [
  ["juice", "loose", "Goose", "news"],
  ["dough", "mo’", "glow", "flow"],
  ["cake", "wake", "Drake", "steak"],
  ["bread", "fed", "spread", "dread"],
  ["sauce", "boss", "gloss", "chaos"],
  ["cheese", "keys", "squeeze", "pleas"],
  ["cheddar", "better", "grater", "tender"]];
let lyricEmojiSet = [
  "🍹",
  "🍪",
  "🍰",
  "🥪",
  "🍝",
  "🧀",
  "🧀",
];
let lyricSetNum = 0;

let emojiDrops = [];
let numEmojiDrops = 5;

function preload() {
  song = loadSound("mp3/Juice_edit.mp3");
  clap = loadSound("mp3/clap.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  setBPM(bpm);
  //   capture = createCapture(VIDEO);
  //   capture.size(320, 240);

  //these are the song varr
  frameRate(framerater);
  fperb = (framerater * 60) / bpm;

  // Choose randomly a lyric set
  chooseLyricSet();
  for(var i = 0; i < numEmojiDrops; i++) {
    let emojiId = 'emoji_drop_'+i;
    let emojiDiv = $('<div id="emoji_drop_'+i+'" class="emoji_drop">'+lyricEmojiSet[lyricSetNum]+'</div>')
    $('body').append(emojiDiv);
    emojiDrops[i] = new EmojiDrop("#"+emojiId);
  }

  lyrics = [{ beat: 32, lyric: "Mirror, mirror on the wall"},
    {beat: 35, lyric: "Don't say it, ’cause I know I'm cute (Ooh, baby)"},
    {beat: 40, lyric: "Louis down to my drawers"},
    {beat: 43, lyric: "LV all on my shoes (Ooh, baby)"},
    {beat: 47, lyric: "I be drippin' so much sauce"},
    {beat: 51, lyric: "Gotta been lookin’ like RAGÚ (Ooh, baby)"},
    {beat: 55, lyric: "Lit up like a crystal ball"},
    {beat: 59, lyric: "That's cool, baby, so is you"},
    {beat: 62, lyric: "That's how I roll"},
    {beat: 65, lyric: "If I'm shiny, everybody gonna shine (Yeah, I'm goals)"},
    {beat: 73, lyric: "I was born like this, don't even gotta try (Now you know)"},
    {beat: 80, lyric: "I like chardonnay, get better over time (So you know)"},
    {beat: 89, lyric: "Heard you say I'm not the baddest, bitch, you lie"},
    {beat: 96, lyric: "Ain't my fault that I’m out here gettin’ VAR_LOOSE"},
    {beat: 102, lyric: "Gotta blame it on the VAR_GOOSE"},
    {beat: 106, lyric: "Gotta blame it on my VAR_JUICE, baby"},
    {beat: 112, lyric: "Ain't my fault that I’m out here makin' VAR_NEWS"},
    {beat: 119, lyric: "I'm the pudding in the proof"},
    {beat: 123, lyric: "Gotta blame it on my VAR_JUICE"},
    {beat: 127, lyric: "Ya-ya-ee, ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 136, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE"},
    {beat: 142, lyric: "Ya-ya-ee, ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 151, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE (Ooh, baby)"},
    {beat: 160, lyric: "No, I'm not a snack at all"},
    {beat: 164, lyric: "Look, baby, I’m the whole damn meal (Ooh, baby)"},
    {beat: 168, lyric: "Baby, you ain't bein' slick"},
    {beat: 171, lyric: "Don't dare try to cop a feel (Ooh, baby)"},
    {beat: 176, lyric: "The VAR_JUICE ain't worth the squeeze"},
    {beat: 180, lyric: "If the VAR_JUICE don't look like this (Like this, like this, like this)"},
    {beat: 185, lyric: "Hold up, n****, please Don't make me have to take your bitch (How I roll)"},
    {beat: 192, lyric: "If I'm shiny, everybody gonna shine (Yeah, I'm goals)"},
    {beat: 201, lyric: "I was born like this, don't even gotta try (Now you know)"},
    {beat: 208, lyric: "I like chardonnay, get better over time (So you know)"},
    {beat: 217, lyric: "Heard you say I'm not the baddest, bitch, you lie (You lie)"},
    {beat: 224, lyric: "Ain't my fault that I'm out here gettin' VAR_LOOSE"},
    {beat: 230, lyric: "Gotta blame it on the VAR_GOOSE"},
    {beat: 234, lyric: "Gotta blame it on my VAR_JUICE, baby"},
    {beat: 240, lyric: "Ain't my fault that I'm out here makin' VAR_NEWS"},
    {beat: 247, lyric: "I'm the pudding in the proof"},
    {beat: 251, lyric: "Gotta blame it on my VAR_JUICE"},
    {beat: 255, lyric: "Ya-ya-ee (Ya-ya-ee), ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 264, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE"},
    {beat: 270, lyric: "Ya-ya-ee (Ya-ya-ee), ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 279, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE (Alright)"},
    {beat: 288, lyric: "Ya-ya-ee Somebody come get this man"},
    {beat: 293, lyric: "I think he got lost in my DMs, what? My DMs, what?"},
    {beat: 303, lyric: "You better come get your man"},
    {beat: 309, lyric: "I think he wanna be way more than friends, what?"},
    {beat: 318, lyric: "More than friends. What you want me to say?"},
    {beat: 320, lyric: "It ain't my fault that I'm out here gettin' VAR_LOOSE"},
    {beat: 326, lyric: "Gotta blame it on the VAR_GOOSE"},
    {beat: 330, lyric: "Gotta blame it on my VAR_JUICE, baby"},
    {beat: 336, lyric: "Ain't my fault that I'm out here makin' VAR_NEWS"},
    {beat: 343, lyric: "I'm the pudding in the proof (Puddin' in the proof)"},
    {beat: 347, lyric: "Gotta blame it on my VAR_JUICE (Blame it on my VAR_JUICE)"},
    {beat: 356, lyric: "Ya-ya-ee (Yay-ya), ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 365, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE"},
    {beat: 371, lyric: "Ya-ya-ee (Ya-ya-ee), ya-ya-ee, ya-ya-ee, ya-ya-ee"},
    {beat: 380, lyric: "Blame it on my VAR_JUICE, blame it, blame it on my VAR_JUICE"}
  ];

  song.play();
}

function chooseLyricSet() {
  lyricSetNum = floor(random(lyricSets.length));
}

function processLyric(line){
  let lyricSet = lyricSets[lyricSetNum];
  line = line.replace("VAR_JUICE", lyricSet[0]);
  line = line.replace("VAR_JUICE", lyricSet[0]);
  line = line.replace("VAR_LOOSE", lyricSet[1]);
  line = line.replace("VAR_GOOSE", lyricSet[2]);
  line = line.replace("VAR_NEWS", lyricSet[3]);
  return line;
}

function draw() {
  //   image(capture, 0, 0, width, height);
  frameCount++;
  //   console.log(frameCount);

  beatCount();

  fill(255);
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER);
  textSize(32);
  textFont("Comic Sans MS");
  var textdisplay = text(currlyric, width / 2, height - 40);

  for(var i = 0; i < numEmojiDrops; i++) {
    emojiDrops[i].step();
    emojiDrops[i].render();
  }
}

function beatCount() {
  if (frameCount % round(fperb) == 0 && song.isPlaying()) {
    secCount++;
    console.log("beats = " + secCount);
    //console.log("arrviw = "+ arrview);
    if (secCount == lyrics[arrview].beat) {
      console.log(lyrics[arrview].lyric);
      //background(255);

      //timer stuff
      var textdelay = lyrics[arrview + 1].beat - lyrics[arrview].beat;
      console.log(textdelay);
      currlyric = processLyric(lyrics[arrview].lyric);
      console.log(currlyric);
      document.getElementById("text").innerText = currlyric;

      //this goes at the end!
      arrview++;
    }

    //clap.play();
  }
}

class EmojiDrop {
  constructor(idName){
    this.x = floor(random(100));
    this.y = 20;
    this.y_vel = 1 + floor(random(3)); 
    this.idName = idName;
  }

  render() {
    let emoji = $(this.idName);
    emoji.css('left', this.x+'vw');
    emoji.css('top', this.y+'vh');
  }

  step() {
    this.y = this.y + this.y_vel;
    if(this.y > 100) {
      this.y = -10;
      this.x = floor(random(100));
    }
  }
}
