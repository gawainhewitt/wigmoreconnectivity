let boxOfficeImage;
let imageLoaded = false;
let performances, performancesOn, performancesOff, conversations, conversationsOn, conversationsOff, make, makeOn, makeOff, info, infoOn, infoOff;
let xPercent;
let yPercent;

function preload(){
    boxOfficeImage = loadImage("/images/HomePageMain.png");
    performancesOff = loadImage("/images/performances.png");
    conversationsOff = loadImage("/images/conversations.png");
    makeOff = loadImage("/images/makemusic.png");
    infoOff = loadImage("/images/info.png");
    performances = performancesOff;
    conversations = conversationsOff;
    make = makeOff;
    info = infoOff;
}

function setup() {  // setup p5

    let masterDiv = document.getElementById("container");
    let divPos = masterDiv.getBoundingClientRect(); //The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels.
    let masterLeft = divPos.left; // distance from left of screen to left edge of bounding box
    let masterRight = divPos.right; // distance from left of screen to the right edge of bounding box
    cnvDimension = masterRight - masterLeft; // size of div -however in some cases this is wrong, so i am now using css !important to set the size and sca;ing - but have kept this to work out size of other elements if needed

    console.log("canvas size = " + cnvDimension);

    let cnv = createCanvas(cnvDimension, cnvDimension); // create canvas - because i'm now using css size and !important this is really about the ratio between them, so the second number effects the shape. First number will be moved by CSS
    cnv.id('mycanvas'); // assign id to the canvas so i can style it - this is where the css dynamic sizing is applied
    cnv.parent('p5parent'); //put the canvas in a div with this id if needed - this also needs to be sized

    // *** add vanilla JS event listeners for touch which i want to use in place of the p5 ones as I believe that they are significantly faster
    let el = document.getElementById("p5parent");
    el.addEventListener("click", handleClick);

    performancesOn = loadImage("/images/performances_invert.png");
    conversationsOn = loadImage("/images/conversations_invert.png");
    makeOn = loadImage("/images/makemusic_invert.png");
    infoOn = loadImage("/images/info_invert.png");
    dimensions();
    refreshPage();
    boxOfficeImage = loadImage("/images/HomePageMain.png", () => {
        refreshPage()
    });
}

let perfX, perfY, perfWidth, perfHeight, convX, convY, convWidth, convHeight, makeX, makeY, makeWidth, makeHeight, infoX, infoY, infoWidth, infoHeight; //do this for all the options then use the variables for both mouseOver, dimensions and click

function refreshPage() {
    document.getElementsByTagName('body')[0].style.background = "grey";
    dimensions();
    imageMode(CORNER);
    image(performances, perfX, perfY, perfWidth, perfHeight);
    image(conversations, convX, convY, convWidth, convHeight);
    image(make, makeX, makeY, makeWidth, makeHeight);
    image(info, infoX, infoY, infoWidth, infoHeight);
    image(boxOfficeImage, 0, 0, width, height);
}

function windowResized() {

    let masterDiv = document.getElementById("container");
    let divPos = masterDiv.getBoundingClientRect(); //The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels.
    let masterLeft = divPos.left; // distance from left of screen to left edge of bounding box
    let masterRight = divPos.right; // distance from left of screen to the right edge of bounding box
    cnvDimension = masterRight - masterLeft; // size of div -however in some cases this is wrong, so i am now using css !important to set the size and sca;ing - but have kept this to work out size of other elements if needed
    resizeCanvas(cnvDimension, cnvDimension);
    dimensions();
    refreshPage();
}

function dimensions() {
    xPercent = width/100;
    yPercent = height/100;

    perfX = xPercent*35.1;
    perfY = yPercent*19.92;
    perfWidth = xPercent*18.49;
    perfHeight = yPercent*33.26;
    convX = xPercent*55.79;
    convY = yPercent*19.92;
    convWidth = xPercent*13;
    convHeight = yPercent*30.46;
    makeX = xPercent*74.94;
    makeY = yPercent*19.83;
    makeWidth = xPercent*14.9;
    makeHeight = yPercent*21.7;
    infoX = xPercent*10.43;
    infoY = yPercent*74.08;
    infoWidth = xPercent*15.66;
    infoHeight = yPercent*18.01;
}

function handleClick() {
    //performance
    if((mouseX > perfX) && (mouseX < perfX + perfWidth) && (mouseY > perfY) && (mouseY < perfY + perfHeight)){
        console.log("click");
        performances = performancesOn;
        refreshPage();
        setTimeout(() => {
            performances = performancesOff;
            refreshPage()
        }, 1000);
        window.location.href = "/performance.html";
    }else if((mouseX > convX) && (mouseX < convX + convWidth) && (mouseY > convY) && (mouseY < convY + convHeight)){
        console.log("click");
        conversations = conversationsOn;
        refreshPage();
        setTimeout(() => {
            conversations = conversationsOff;
            refreshPage()
        }, 1000);
        window.location.href = "/conversations.html";
    }else if((mouseX > makeX) && (mouseX < makeX + makeWidth) && (mouseY > makeY) && (mouseY < makeY + makeHeight)){
        console.log("click");
        make = makeOn;
        refreshPage();
        setTimeout(() => {
            make = makeOff;
            refreshPage()
        }, 1000);
        window.location.href = "/make.html";
    }else if((mouseX > infoX) && (mouseX < infoX + infoWidth) && (mouseY > infoY) && (mouseY < infoY + infoHeight)){
        console.log("click");
        info = infoOn;
        refreshPage();
        setTimeout(() => {
            info = infoOff;
            refreshPage()
        }, 1000);
        //window.location.href = "/info.html";
    }
    return false;
}
