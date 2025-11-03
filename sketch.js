let grid;

function preload() {
    //put the csv files here :)
}

function setup() {
    colorManager = new ColorManager();

    let artWorkSize = min(windowWidth, windowHeight) - 40;
    createCanvas(artWorkSize, artWorkSize);

    grid = new LayoutGrid(32, 32, colorManager.getAllColors()); // set to 32 rows and columns to match the modified reference artwork

}

function draw() {
    grid.addBlock(1,2,1,1,'blue2'); // test blue box

    grid.display();
}

function windowResized() {
  grid.handleResize();
}