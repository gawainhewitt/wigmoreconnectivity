//why am i getting away without having tone.start?

// need to get the images sorted properly

var radiusRatio = 2.5; // number that sets the radius relative to the screen
var radius; // variable to store the actual radius in
var backgroundColour = 'rgb(255,255,255)';
var playOnColour = '#6d6969';
var playOffColour = '#f2fa04';
var playButtonColour;
var buttonState = false;
var whichSound; // which of the samples?
var theSample; //current sample
var theImage; //current image
var theName;
var theVolume = -6;
const player = new Tone.Player().toDestination();
const toneWaveForm = new Tone.Waveform();
toneWaveForm.size = 128;
player.connect(toneWaveForm);
var buffer0;
var buffer1;
let perfImage0;
let perfImage1;
let imageToUse;
var interfaceState = 0; // 0 displays the text loading, 1 is a button, 2 is a visualisation of the sound, 3 is error loading sound to buffer
var usedSounds = new Array;
var cnvDimension;
var bufferToPlay = buffer1;
var imageToShow;
var lastBuffer;
var currentBuffer;
var numberOfSamples = 13;
let visualisationSize;
let hallImage;
let imageLoaded = false;
let playbuttonPosition;
let welcome = 0;
var nameToUse;
var titleToShow;
var nameToShow;
var titles = ["Physical Comp", "Rumble under the Sea", "Improvisation", "Sea Sound", " Walking song", "15th March", "Into each life some rain", "Take me to the sea", "With Nobody's Jig", "Untitled 1", "Untitled 2", "Untitled 3", "Down By The Bay"];
var names = ["Chamber Tots", "Chamber Tots", "Come and Create", "Come and Create", "Come And Create", "Music For Life", "Music For Life", "Music For Life", "Music For Life", "Out of the Ordinary", "Out of the Ordinary", "Out of the Ordinary", "Singing With Friends"];


function preload(){
    imageToShow = chooseSample();
    console.log(`image to show = ${imageToShow}`);
    hallImage = loadImage("/images/performanceZone7_small.png", () => {imageLoaded = true});
}

function setup() {  // setup p5

    let masterDiv = document.getElementById("container");
    let divPos = masterDiv.getBoundingClientRect(); //The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels.
    let masterLeft = divPos.left; // distance from left of screen to left edge of bounding box
    let masterRight = divPos.right; // distance from left of screen to the right edge of bounding box
    cnvDimension = masterRight - masterLeft; // size of div -however in some cases this is wrong, so i am now using css !important to set the size and sca;ing - but have kept this to work out size of other elements if needed
    playButtonColour = playOffColour;
    visualisationSize = height;

    console.log("canvas size = " + cnvDimension);

    noStroke(); // no stroke on the drawings

    let cnv = createCanvas(cnvDimension, cnvDimension); // create canvas - because i'm now using css size and !important this is really about the ratio between them, so the second number effects the shape. First number will be moved by CSS
    cnv.id('mycanvas'); // assign id to the canvas so i can style it - this is where the css dynamic sizing is applied
    cnv.parent('p5parent'); //put the canvas in a div with this id if needed - this also needs to be sized

    // *** add vanilla JS event listeners for touch which i want to use in place of the p5 ones as I believe that they are significantly faster
    let el = document.getElementById("p5parent");
    el.addEventListener("click", handleClick);
    // let el2 = document.getElementById("text");
    // el2.addEventListener("click", handleClick);

    setRadius();

    playbuttonPosition = {x: width/2, y: height/9};

    player.set(
        {
          "mute": false,
          "volume": 0,
          "autostart": false,
          "fadeIn": 0,
          "fadeOut": 0,
          "loop": false,
          "playbackRate": 1,
          "reverse": false,
          "onstop": reload
        }
      );
      welcomeScreen();
}

var rectangleX, rectangleY, rectangleWidth, rectangleHeight;

function draw() {
    if (welcome == 2){
        document.getElementsByTagName('body')[0].style.background = "grey";
        document.getElementById("text").style.display = "none";
        rectangleX = width/2 - radius/2;
        rectangleY = ((height/11)*7.5);
        rectangleWidth = width/10*8;
        rectangleHeight = height/7;
        playbuttonPosition.x = width/2;
        playbuttonPosition.y = height/9;
        let picWidth = width/2.5;
        let picHeight = picWidth/1.5;
        let picX = width/2;
        let picY = (height/6) * 4.73;
        let visWidth = width/2.26;
        let x = (width/2) - visWidth/2;
        let y = (height/12) * 7.68;
        background(backgroundColour); // background
        imageMode(CORNER);
        image(hallImage, (width/20), (height/5), (width/20)*18, (height/5)*4);


        //imageMode(CENTER);
        if((interfaceState === 0)||(imageLoaded === false)){
            textSize(cnvDimension/15);
            fill(0);
            noStroke();
            stroke(0); //colour
            strokeWeight(4);
            fill(playOffColour);
            //ellipse(playbuttonPosition.x, playbuttonPosition.y, radius/1.8);
            rectMode(CENTER);
            rect(playbuttonPosition.x, playbuttonPosition.y, rectangleWidth, rectangleHeight);
            fill(0);
            textAlign(CENTER, CENTER);
            noStroke();
            text("Loading", playbuttonPosition.x, playbuttonPosition.y);
            stroke('#f2fa04'); //colour
            strokeWeight(10);
            line(x, y, x + visWidth, y);
        }else if(interfaceState === 1){
            stroke(0); //colour
            strokeWeight(4);
            fill(playButtonColour);
            //ellipse(playbuttonPosition.x, playbuttonPosition.y, radius/1.8);
            rectMode(CENTER);
            rect(playbuttonPosition.x, playbuttonPosition.y, rectangleWidth, rectangleHeight);
            fill(0);
            textAlign(CENTER, CENTER);
            noStroke();
            textSize(cnvDimension/15);
            text("Click To Play", playbuttonPosition.x, playbuttonPosition.y);
            imageMode(CENTER);
            image(imageToShow, picX, picY, picWidth, picHeight);
            textSize(cnvDimension/20);
            fill(0);
            noStroke();
            text(nameToShow, width/2, height/20*6);
            text(titleToShow, width/2, height/20*19.4);
            stroke('#f2fa04'); //colour
            strokeWeight(10);
            line(x, y, x + visWidth, y);
        }else if(interfaceState === 2){
            textSize(cnvDimension/20);
            fill(0);
            noStroke();
            text(nameToShow, width/2, height/20*6);
            text(titleToShow, width/2, height/20*19.4);
            stroke('#f2fa04'); //colour
            strokeWeight(10);
            imageMode(CENTER);
            image(imageToShow, picX, picY, picWidth, picHeight);
            let startX = x;
            let startY = y;
            let endX;
            let endY;
            let visualisation = toneWaveForm.getValue();
            for(let i = 0; i < visualisation.length-1; i++){
                startY = y + (visualisation[i]*visualisationSize);
                endX = startX + visWidth/visualisation.length;
                endY = y + (visualisation[i+1]*visualisationSize);
                line(startX, startY, endX, endY);
                startX = startX+(visWidth/visualisation.length);
            }
            stroke(0); //colour
            strokeWeight(4);
            fill(playButtonColour);
            rectMode(CENTER);
            rect(playbuttonPosition.x, playbuttonPosition.y, rectangleWidth, rectangleHeight);
            fill(0);
            textAlign(CENTER, CENTER);
            noStroke();
            textSize(cnvDimension/15);
            text("Click To Load Next Song", playbuttonPosition.x, playbuttonPosition.y);
        }else if(interfaceState === 3){
            noStroke();
            fill('rgb(255,0,0)');
            //ellipse(playbuttonPosition.x, playbuttonPosition.y, radius/1.8);
            rectMode(CENTER);
            rect(playbuttonPosition.x, playbuttonPosition.y, rectangleWidth, rectangleHeight);
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(cnvDimension/15);
            text("Error. Click to reload", playbuttonPosition.x, playbuttonPosition.y);
        }
    }
}

function welcomeScreen(){
    document.getElementsByTagName('body')[0].style.background = "white";
    if(welcome === 0){
        console.log("in welcome screen 1");
        document.getElementById("text").innerHTML = '<h2>Performance</h2><p>In this installation music made on learning and participation projects led by Wigmore Hall are performed on an imagined Wigmore Hall Stage. The images used to represent the pieces are a mixture of pictures made by participants, stills from online music sessions and photos used in workshops.<br></p><h4>Click to continue</h4>';
    }else if(welcome === 1){
        console.log("in welcome screen 2");
        document.getElementById("text").innerHTML = "<h2>To Play Installation:</h2><p>Click on the top bar to play a track. <br><br>When playing, click top bar again to load the next track. <br><br>Use the back button on your browser to return to the Box Office.<br><br></p><h4>Click to continue</h4>";
    }
}

function windowResized() {
    setRadius();
    let masterDiv = document.getElementById("container");
    let divPos = masterDiv.getBoundingClientRect(); //The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels.
    let masterLeft = divPos.left; // distance from left of screen to left edge of bounding box
    let masterRight = divPos.right; // distance from left of screen to the right edge of bounding box
    cnvDimension = masterRight - masterLeft; // size of div -however in some cases this is wrong, so i am now using css !important to set the size and sca;ing - but have kept this to work out size of other elements if needed
    visualisationSize = height;

    resizeCanvas(cnvDimension, cnvDimension);
  }

function setRadius() {
    if(height > width){
        radius = width/radiusRatio;
    }else{
        radius = height/radiusRatio;
    }
}

function handleClick() {
    if(welcome === 2){
        if(interfaceState === 1){
            // let d = dist(mouseX, mouseY, playbuttonPosition.x, playbuttonPosition.y);
            // if (d < radius/2) {
            let clickX = playbuttonPosition.x - rectangleWidth/2;
            let clickY = playbuttonPosition.y - rectangleHeight/2;
            if((mouseX > clickX) && (mouseX < clickX + rectangleWidth) && (mouseY > clickY) && (mouseY < clickY + rectangleHeight)){
                buttonPressed();
                buttonState = true;
                playButtonColour = playOnColour;
            }
        }else if(interfaceState === 2){
            // let d = dist(mouseX, mouseY, playbuttonPosition.x, playbuttonPosition.y);
            // if (d < radius/2) {
            let clickX = playbuttonPosition.x - rectangleWidth/2;
            let clickY = playbuttonPosition.y - rectangleHeight/2;
            if((mouseX > clickX) && (mouseX < clickX + rectangleWidth) && (mouseY > clickY) && (mouseY < clickY + rectangleHeight)){
                buttonPressed();
                buttonState = true;
                playButtonColour = playOffColour;
            }
        }else if(interfaceState === 3){
                console.log("network click");
                interfaceState = 0;
                assignSoundToPlayer();
        }
        // if((mouseX > width/5) && (mouseX < width/5*4) && (mouseY > height/20*18.6) && (mouseY < height)){
        //     window.location.href = "/index.html";
        // }
    }else{
        welcome = welcome +1;
        console.log(`welcome - ${welcome}`)
        welcomeScreen();
    }
}

function buttonPressed() {
    if(interfaceState === 1){
        player.start();
        lastBuffer = currentBuffer;
        console.log(`lastBuffer = ${lastBuffer}`);
        console.log("click");
        interfaceState = 2;
        chooseSample();
    }else{
        player.stop();
        interfaceState = 1;
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min +1) ) + min;
  }

function chooseSample(){
    console.log(`usedSounds = ${usedSounds}`);
    if (usedSounds.length === numberOfSamples){
        console.log(`array full`);
        usedSounds = [];
    }

    do{
        whichSound = getRndInteger(1, numberOfSamples);
    }while(haveWeUsedSound(whichSound));

    usedSounds.push(whichSound);
    console.log(`whichSound = ${whichSound}`);
    theSample = `perf${whichSound}.mp3`;
    theImage = `perf${whichSound}.png`;
    theName = whichSound;
    console.log(`theSample = ${theSample}`);
    console.log(`usedSounds = ${usedSounds}`);

    assignSoundToPlayer();
    return `perf${whichSound}.png`;
}

function haveWeUsedSound(comparer) {
    for(var i=0; i < usedSounds.length; i++) {
        if(usedSounds[i] === comparer){
            return true;
        }
    }
    return false;
};

function assignSoundToPlayer() {
    if(bufferToPlay === buffer1){
        perfImage0 = loadImage(`/images/${theImage}`, () => {imageToUse = perfImage0});
        nameToUse = theName;
        buffer0 = new Tone.ToneAudioBuffer(`/sounds/${theSample}`, () => {
            console.log("buffer 0 loaded");
            bufferToPlay = buffer0;
            currentBuffer = 0;
            console.log(`currentBuffer = ${currentBuffer}`);
            if (interfaceState === 0){
                reload();
            }
        },
        () => {
            interfaceState = 3;
            console.log(`interfaceState = ${interfaceState}`)
        });

    }else{
        perfImage1 = loadImage(`/images/${theImage}`, () => {imageToUse = perfImage1});
        nameToUse = theName;
        buffer1 = new Tone.ToneAudioBuffer(`/sounds/${theSample}`, () => {
            console.log("buffer 1 loaded");
            bufferToPlay = buffer1;
            currentBuffer = 1;
            console.log(`currentBuffer = ${currentBuffer}`);
            if (interfaceState === 0){
                reload();
            }
        },
        () => {
            interfaceState = 3;
            console.log(`interfaceState = ${interfaceState}`)
        });
    }
}

function reload() {
    console.log(`in reload`);
    if(lastBuffer !== currentBuffer){
        player.buffer = bufferToPlay.get();
        imageToShow = imageToUse;
        titleToShow = titles[nameToUse-1];
        nameToShow = names[nameToUse-1];
        interfaceState = 1;
    }else{
        interfaceState = 0;
    }
    // buffer0.dispose();
    // chooseSample();
}


// if(lastBuffer === 0){
//     imageToUse = perfImage0;
// }else{
//     imageToUse = perfImage1;
// }
