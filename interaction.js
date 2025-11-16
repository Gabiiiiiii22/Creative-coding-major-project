let song;
let fft;
let amplitude;
let isPlaying = false;


function setupAudio() {
    song = loadSound('data/music.mp3', musicLoaded);
}

function musicLoaded() {
    console.log('Music loaded');
    fft = new p5.FFT(0.8, 64);
    amplitude = new p5.Amplitude();
}

// Use if/elese to toggle play/pause for music when button is clicked and update text on the button too
function toggleMusic() {

    if (song.isPlaying()) {
        song.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = '🔉 Start Boogie Woogie'; // Set text button to 'Play'
    } else {
        song.loop(); // Loop the music continuously
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = '🔇 Stop Boogie Woogie'; // Set text button to 'Pause'
    }
}

// Function to apply audio effects to 1×1 blocks only (Blue, red, or gray)
// to be callesalled every frame in draw()
function applyAudioToSmallBlocks(grid) {

    // If music not playing, reset all animations
    if (!isPlaying) {
        for (let block of grid.blocks) {
            block.resetTransform();
        }
        return;
    }

    // Analyze audio frequencies and volume
    let spectrum = fft.analyze();
    let volume = amplitude.getLevel();
    let bass = fft.getEnergy("bass"); // use with blue blocks
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");

    // Get all 1×1 blocks
    let smallBlocks = grid.blocks.filter(b => // use filter function from p5.js to filter the blocks base on the conditions I want
        !b.isBar && b.rowSpan === 1 && b.colSpan === 1 // is not a bar AND 1 row wide AND 1 column wide
    ); 

    // Apply different movements based on color using for loop to loop through all the blocks
    for (let i = 0; i < smallBlocks.length; i++) {
        let block = smallBlocks[i];
        let color = block.color;

        // // Blue 1×1 blocks: Bounce up/down with bass
        
        if (color === grid.colors.blue1 || color === grid.colors.blue2) {
            // Even numbered blocks (0, 2, 4...) bounce vertically
            // Odd numbered blocks (1, 3, 5...) bounce horizontally
            if (i % 2 === 0) {
                applyBounceUpDown(block, bass, i); // Vertical
            } else {
                applyBounceLeftRight(block, bass, i);   // Horizontal
            }
        }

        // Red 1×1 blocks: Wave left/right with mid frequencies
        else if (color === grid.colors.red) {
            applyPulseEffect(block, mid, i);
        }

        // Grey 1×1 blocks: Pulse with treble
        else if (color === grid.colors.grey) {
            applyWaveEffect(block, treble, i);
        }

        // Update smooth animation using lerp
        block.update();
    }
}

// Bouce effect for blue blocks (up-down)
function applyBounceUpDown(block, bass, index){
    // Map bass energy to bounce distance (0-30 pixels)
    let bounceAmount = map(bass, 0, 255, 0, 30); // if base 0, no bounce. If base loud (255), bouce 30 pixels

    let offset = sin(frameCount * 0.17 + index) * bounceAmount;

    block.targetOffsetY = -abs(offset); // upward bounce
    block.targetOffsetX = 0; // No horizontal movement
}

// Bouce effect for blue blocks (left-right)
function applyBounceLeftRight(block, bass, index){
    // Map bass energy to bounce distance (0-15 pixels)
    let bounceAmount = map(bass, 0, 255, 0, 15); // if base 0, no bounce. If base loud (255), bouce 15 pixels

    let offset = sin(frameCount * 0.1 + index) * bounceAmount;

    block.targetOffsetX = offset;
    block.targetOffsetY = 0; // No vertical movement
}

// Wave effect for grey blocks
function applyWaveEffect(block, mid, index){
    // Map mid energy to wave distance (0-20 pixels)
    let waveAmount = map(mid, 0, 255, 0, 20);

    let offset = sin(frameCount * 0.1 + index) * waveAmount;

    block.targetOffsetX = offset;
}

// Pulse effect for red blocks
function applyPulseEffect(block, treble, index) {
    let pulseAmount = map(treble, 0, 255, 1, 1.3);
    let scale = 1 + sin(frameCount * 0.1 + index) * (pulseAmount - 1);
    
    block.scaleX = scale;
    block.scaleY = scale;
    block.targetOffsetX = 0;
    block.targetOffsetY = 0;
}
