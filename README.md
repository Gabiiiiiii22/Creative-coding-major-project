# Sydney Boogie Woogie - Interactive Audio Visualization
An audio-reactive animation of Piet Mondrian's "Broadway Boogie Woogie" (1942-43) reimagined as "Sydney Boogie Woogie". This interactive artwork transforms the static geometric composition into a dynamic, music-driven experience featuring a vintage vinyl record player interface.

## How to Interact with the Work

1. **Load the page** - The artwork will appear centered on screen with a vintage vinyl record player at the bottom (half-visible)
2. **Click on the tonearm** (the needle arm on the right side of the record player) to start the music
3. **Watch the blocks dance** - Different colored blocks respond to different frequencies in the music:
   - **Blue blocks**: Bounce with bass frequencies (even-numbered blocks bounce vertically, odd-numbered blocks bounce horizontally)
   - **Red blocks**: Pulse in size with mid-range frequencies
   - **Grey blocks**: Wave horizontally with treble frequencies
   - **Yellow bars and other structure**: Remain static as the structural grid
4. **Adjust the volume** - Use the vertical slider on the left side (labeled "Vol")
5. **Click the tonearm again** to stop the music

### Visual Feedback
- **Hover over the tonearm**: It will scale slightly (1.05×) and the text changes from black to blue (#0351A0)
- **When music plays**:
  - The vinyl record spins continuously (3-second rotation)
  - The tonearm rotates down (-7°) and moves toward the record (+30px) to mimic the actual interaction of the record player
  - The text changes from "Click to Play" to "Click to Stop"
  - All 1×1 colored blocks animate in sync with the music
- **When music stops**: All animations reset and blocks return to their original positions

## Responsive Design
- The canvas automatically adjusts to your screen size (200px minimum, 900px maximum)
- The vinyl turntable remains fixed at the bottom, showing only the top half


---


## Animation Approach

### Audio-Driven Animation
I chose **audio** as the primary driver for my individual code. The animation analyzes the music in real-time using p5.sound's FFT (Fast Fourier Transform) to extract frequency data and map it to visual properties.

### Animated Properties

#### 1. **Blue Blocks (Bass-Driven)**
- **Frequency**: Bass (low frequencies)
- **Animation**: Alternating directional bounce
  - Even-numbered blocks: Vertical bounce (0-10px upward)
  - Odd-numbered blocks: Horizontal bounce (0-15px side-to-side)
- **Purpose**: Mixed directional movement creates visual complexity and rhythm variation

#### 2. **Red Blocks (Mid-Driven)**
- **Frequency**: Mid-range frequencies
- **Animation**: Scale pulsing (1.0× to 1.3× size)
- **Purpose**: Size changes rather than position, resulting in a more lively animation when combines with other elements

#### 3. **Grey Blocks (Treble-Driven)**
- **Frequency**: Treble (high frequencies)
- **Animation**: Horizontal wave motion (0-20px)
- **Purpose**: Smooth movement that contrasts with the sharp bounces

#### 4. **Yellow Bars and other stucture**
- **Animation**: None - static structural elements
- **Purpose**: Maintain the original Mondrian grid structure as a stable reference point


---


## Technical Explanation

### Core Technologies
- **p5.js**: Canvas rendering and animation framework
- **p5.sound**: Audio analysis and playback
- **CSS**: Layout, positioning, and visual effects
- **HTML5**: Structure and semantic markup

### Audio Analysis System

#### 1. **FFT (Fast Fourier Transform)**
- Analyzes audio in real-time to extract frequency data
- `0.8` smoothing factor for stable readings
- `64` bins for frequency resolution

#### 2. **Frequency Bands and Mapping Energy to Movement**
- Converts audio energy (0-255) to pixel displacement (0-10px)
- Uses `sin()` wave for smooth, periodic motion
- `frameCount` ensures continuous animation

### Animation Techniques
#### 1. **Smooth Interpolation (lerp)**
- Gradually moves blocks toward target positions
- `0.2` interpolation factor creates smooth, organic motion
- Prevents jarring instant jumps

#### 2. **Phase Offset**
- Creates unique phase for each block
- Prevents synchronized movement that seems stiff
- Creates wave-like propagation across the canvas


---


### External Techniques Used

#### 1. **CSS Transform for Vertical Slider**
- **Source**: Standard CSS transform technique
- **How**: Rotates the slider 90° counterclockwise to appear vertical to go along with the record player at the bottom of the screen

#### 2. **CSS translateY for Half-Visible Turntable**
- **Source**: Common CSS layout technique

#### 3. **CSS Animations with @keyframes**
- **Source**: CSS animation specification
- **Why**: Smooth, performant spinning animation for vinyl


---


## Major Changes from Group Code

1. **Added audio analysis system** - Integrated p5.sound FFT for frequency detection
2. **Implemented animation functions** - Created four distinct animation types mapped to frequencies
3. **Built vinyl player interface** - Custom HTML/CSS turntable with functional controls
4. **Added smooth interpolation** - Used lerp() for natural movement instead of instant changes
5. **Responsive canvas sizing** - Recalculated available space for the artwork after accounting for UI elements
6. **Separated animation logic** - Created dedicated interaction.js for audio-reactive code


---


##  Music Track
The project uses ["Jazz Background Music"](https://pixabay.com/music/traditional-jazz-jazz-background-music-426859/) by Tatamusic
