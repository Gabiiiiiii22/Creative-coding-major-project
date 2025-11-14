let song;
let fft;
let amplitude;
let isPlaying = false;

function setupAudio() {

    // Load music
    song = loadSound('data/music.mp3');

    // Create FFT analyzer for frequency analysis
    fft = new p5.FFT(0.8, 64);

    // Create amplitude analyzer for overall volume
    amplitude = new p5.Amplitude();

}

// Use if/elese to toggle play/pause for music when button is clicked and update text on the button too
function toggleMusic() {

    if (song.isPlaying()) {
        song.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = 'Play'; // Set text button to 'Play'
    } else {
        song.loop(); // Loop the music continuously
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = 'Pause'; // Set text button to 'Pause'
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
    let smallBlocks = grid.blocks.filter(b =>
        !b.isBar && b.rowSpan === 1 && b.colSpan === 1 // is not a bar AND 1 row wide AND 1 column wide
    ); 

    // Apply different movements based on color using for loop to loop through all the blocks
    for (let i = 0; i < smallBlocks.length; i++) {

        // // Blue 1×1 blocks: Bounce up/down with bass
        if (color === grid.colors.blue1 || color === grid.colors.blue2) {
            applyBounceEffect(block, bass, i);
        }

        // Red 1×1 blocks: Wave left/right with mid frequencies
        else if (color === grid.colors.red1 || color === grid.colors.red2) {
            applyWaveEffect(block, mid, i);
        }

        // Update smooth animation using lerp
        block.update();
    }
}

function applyBounceEffect(block, bass, index){
    // Map bass energy to bounce distance (0-30 pixels)
    let bounceAmount = map(bass, 0, 255, 0, 30);

    let offset = sin(frameCount * 0.1 + index) * bounceAmount;

    block.targetOffsetY = -abs(offset); // upward bounce
}

function applyWaveEffect(block, mid, index){
    // Map mid energy to wave distance (0-20 pixels)
    let waveAmount = map(mid, 0, 255, 0, 20);

    let offset = sin(frameCount * 0.08 + index * 0.5) * waveAmount;

    block.targetOffsetX = offset;
}

