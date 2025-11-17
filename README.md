# Creative-coding-major-project
# Sydney Boogie Woogie: Flowing Embossed Texture Animation  
**Individual Project｜Gina Wang**

---

## Interaction Instructions
- The animation starts automatically once the webpage loads.  
- Each color block displays a subtle flowing embossed texture, simulating the tactile surface and lighting of oil paint.  
- No mouse or keyboard input is required.  
- Each page refresh generates a new random seed, producing a slightly different texture pattern every time.

---

## Concept & Creative Approach

My creative idea has two main directions:

### 1.Simulating the Texture of Oil Painting  
I wanted to transform our group’s flat, geometric composition into a surface that feels hand-painted.  
To achieve this, I used **Perlin noise** to create randomized variations of light and shade within each block.  
Each block consists of many small rectangles whose brightness is controlled by noise values,  
producing the illusion of thick paint strokes and layered pigment.  
This subtle movement makes the image feel alive, as if soft light is slowly shifting across a canvas.

### 2.Extending Mondrian’s Urban Rhythm Concept  
Piet Mondrian’s *Broadway Boogie Woogie* represents the rhythm and vitality of New York City streets through tiny, pulsing color blocks.  
As MoMA’s description notes:  
> *“These tiny, blinking blocks of color create a vital and pulsing rhythm, an optical vibration that jumps from intersection to intersection like traffic on the streets of New York.”*  
([Museum of Modern Art – *Broadway Boogie Woogie*](https://www.moma.org/collection/works/78682))  

In our group project, we reinterpreted this idea as **Sydney Boogie Woogie**,  
rearranging the blocks based on Sydney’s urban map to express our own city’s rhythm.  

In my individual version, I added a finer, pixel-based texture inside each block to symbolize the continuous flow of people and energy through the city.  
Each refresh represents a new moment: a new set of people, movements, and lights,  
just like the ever-changing intersections of Sydney.

---

## Animation Method  
**Chosen Technique:** `Perlin Noise and Randomness`

- Implemented using **p5.js**.  
- Each block is subdivided into tiny rectangles (2×2 pixels).  
- The brightness of each rectangle is determined by the Perlin noise function `noise(x * scale, y * scale, t * speed)`.  
- The time offset `zoff` increases continuously, making the noise pattern flow smoothly.  
- The result is a gentle, organic motion — like a breathing texture on the canvas.

### Key Parameters
```js
const PIX = 2;             // Texture pixel size
const GRAIN_REZ = 0.08;    // Noise density (smaller = rougher texture)
const GRAIN_BINS = 6;      // Brightness quantization levels
const GRAIN_CONTRAST = 24; // Brightness contrast intensity
const Z_SPEED = 0.05;      // Flowing speed
```

## Inspirations & References

- **Museum of Modern Art (MoMA)** – Piet Mondrian, *Broadway Boogie Woogie*  
  [https://www.moma.org/collection/works/78682](https://www.moma.org/collection/works/78682)  
 

- **Gorilla Sun Blog**  
  *“Perlin Noise Surface Textures and Scrolling Tricks”*  
  [https://www.gorillasun.de/blog/perlin-noise-surface-textures-and-scrolling-tricks/](https://www.gorillasun.de/blog/perlin-noise-surface-textures-and-scrolling-tricks/)  
  Inspired my use of noise quantization to create tactile, embossed visual textures.

## Technical Explanation

- The `Block` class draws each cell using small rectangles controlled by Perlin noise values.  
- `noise(x, y, t)` produces continuous, smooth randomness in brightness.  
- Quantized noise creates visible “grain” patterns, resembling real world material texture.  
- The time offset (`zoff`) moves gradually, animating the texture over time.  
- No geometric changes occur, all motion happens within the surface.

## Tools & References

- **Library:** [p5.js](https://p5js.org)  
- **Function:** [p5.js noise() Reference](https://p5js.org/reference/#/p5/noise)  
- **External Inspiration:** Gorilla Sun (2023) – *Perlin Noise Surface Textures and Scrolling Tricks*  

## AI Acknowledgement

I used ChatGPT (GPT-5) to help me debug and improve my code.  
It helped me fix small errors (like color bugs and parameter issues), explain why some parts didn’t work, and suggest how to make the animation smoother using noise functions.  
I also used it to get feedback on code comments and README formatting. 