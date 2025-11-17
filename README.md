# Creative-coding-major-project

# **Sydney Boogie Woogie (Individual Animation)**

*(Rutwija Pawar - rpaw0280)*
*(Unit: IDEA9103 / Creative Coding)*

---

## **1. Instructions for Interaction**

This work does not require user interaction to trigger the animation.
The animation is **fully time-based** and plays automatically.

### ✦ How to experience the work:

* Open the webpage (index.html) in any modern browser.
* The artwork appears **immediately for 1 second** (start delay).
* After this brief pause, the animation plays automatically:

  1. Blocks scatter outward
  2. Blocks pulse colour-by-colour
  3. Blocks smoothly return home
  4. **After an additional pause**, blocks disappear randomly

* The viewer simply sits back and watches the animation unfold.

Total duration: 12–15 seconds depending on delay settings.

---

## **2. My Individual Animation Approach**

For my individual animation, I chose to animate the grid using **time-based animation**, because this gives me full control over timing, pacing, rhythm, and the sequence of visual effects.

My animation focuses on:

### ✦ Scatter movement

Blocks first move away from their grid positions using pseudo-random target points.

### ✦ Colour-based pulsing

Each colour group pulses one by one using a sine wave (`sin()`).

### ✦ Smooth return

All blocks animate back to their original layout using `lerp()` for beautiful easing.

### ✦ Delayed disappearance

After returning home, the composition pauses briefly and then the blocks start disappearing **instantly and randomly**, creating a surprising ending.

This forms a complete narrative:
**Order → Chaos → Rhythm → Order → Dissolve**

---

## **3. What Makes My Animation Unique**

To ensure my design differed from my group members, I focused on:

### ✦ **Instant Random Disappearance**

Instead of:

* changing colours
* scaling blocks
* rotating blocks
* or revealing segments

I focused on creating a **fast-ending vanish effect** where each block disappears unpredictably after a timed pause. This gives the piece a sharp, dramatic ending that none of our group members are using.

###  ✦ **Timed Pause Before Final Effect**

My animation+6 **intentionally pauses** fully assembled before disappearing, heightening anticipation.

---

## **4. Inspirational References**

### ✦ **Conceptual Link to Sydney**

This animation is not only based on Mondrian’s geometric language but also mirrors the rhythm of Sydney itself.

* The **scatter** phase evokes the *morning movement of people spreading across the city.*
* The **pulsing colours** reflect *Sydney’s energetic cultural heartbeat.*
* The **return phase** aligns with the *quiet recentering of the city toward evening.*
* The **final disappearance** suggests the *calm, near-silent state the city enters late at night.*

### ✦ **Scatter / Motion Inspiration**

* Piet Mondrian’s *Boogie Woogie* rhythmic compositions
* Natural “explosion” scatter patterns
* Generative design behaviours

### ✦ **Animation Technique References**

* p5.js pseudo-randomness:
  [https://p5js.org/reference/p5/random/](https://p5js.org/reference/p5/random/)

* lerp-based motion:
  [https://p5js.org/reference/#/p5/lerp](https://p5js.org/reference/#/p5/lerp)

* Sinusoidal pulsing animation:
  [https://www.youtube.com/watch?v=ktPnruyC6cc](https://www.youtube.com/watch?v=ktPnruyC6cc)

* References for the functions code and alpha transparency: https://p5js.org/reference/


These references influenced my timing, my pulse animation, and my fade/disappear technique.

---

## **5. Technical Explanation**

My individual code uses **time-based animation**, driven primarily by:

### ✦  `millis()`

Used to schedule:

* scatter duration
* pulse duration
* return duration
* disappearance timing
* start delay

### ✦  `lerp()`

Smoothly animates block positions between:

* original grid position → scatter position
* scatter position → return home

This allows fluid, natural movement.

### ✦ Pseudo-random scatter targets

I created a deterministic scatter effect using:

```js
let scatterRow = (block.row + block.col * 7.3) % 28;
let scatterCol = (block.col + block.row * 5.7) % 28;
```

This avoids true randomness (which moves unpredictably each refresh) but still *looks* random.

### ✦  `sin()` pulsing

Each colour pulses according to:

```js
block.scale = sin((sequenceT % 1) * TWO_PI) * 0.3 + 1;
```

This gives it a “breathing” effect.

### ✦  Instant disappearance (opacity = 0)

I used alpha transparency to instantly remove blocks:

```js
if (t > disappearTime) {
    if (random() < 0.03) block.opacity = 0;
}
```

This creates a sudden vanish effect.

---

## **6. Changes I Made to the Group Code**

I made several modifications:

### ✦  Added a **1-second start delay**

Allows viewer to see the artwork before animation.

### ✦  Implemented a **scatter behaviour**

I incorporated the pseudo random maths techniques which was not included in our base code which helped me scatter the blocks randomly.

### ✦  Introduced **colour-sequenced pulsing**

One colour pulses at a time.

### ✦  Modified return logic

Ensures blocks return smoothly before final phase.

### ✦  Added **timed pause before disappearance**

Blocks do NOT vanish during movement.

### ✦  Added **instant random disappearance**

Unique final effect.

---

## **7. External Techniques Used**

I used several standard p5.js techniques :

### Tools:

* p5.js timing (`millis()`)
* lerp interpolation
* alpha transparency
* sine wave pulsing

### Why I used them:

These tools gave me precise control over movement, timing, rhythm, and transitions in my animation allowing me to build a multi-phase animation.

### External source references:

* Transparency tutorial (p5 alpha):
  [https://www.youtube.com/watch?v=G4LljVjX9VY](https://www.youtube.com/watch?v=G4LljVjX9VY)
* p5.js sin-based pulse:
  [https://www.youtube.com/watch?v=ktPnruyC6cc](https://www.youtube.com/watch?v=ktPnruyC6cc)
* lerp animation:
  [https://www.youtube.com/watch?v=jO1zYLo1z6E](https://www.youtube.com/watch?v=jO1zYLo1z6E)

---

