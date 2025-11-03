let grid;
let colorManager;

console.log('p5.js version:', p5.VERSION); // check p5.js version

function preload() {
    //put the csv files here :))))
}

function setup() {
    colorManager = new ColorManager();

    let artWorkSize = min(windowWidth, windowHeight) - 40;
    createCanvas(artWorkSize, artWorkSize);
    console.log('canvas size',artWorkSize); // see the artwork size

    grid = new LayoutGrid(32, 32, colorManager.getAllColors()); // create new grid set to 32 rows and columns to match the modified reference artwork

}


function draw() {
    grid.addBlock(1,2,1,1,'blue2'); // test blue box
    grid.addBlock(5,4,1,1,'red1'); // test red box

    grid.display();
}

function windowResized() {
  grid.handleResize();
}