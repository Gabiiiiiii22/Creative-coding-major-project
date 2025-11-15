# Boogie Woogie – Interactive Individual Animation (INPUT-INTERACTION)

## Interactions

**Mouse movement**
- Slowly move your mouse across the canvas.
- Blocks near the cursor *brighten and glow*, as if lights in the city are responding to your presence.
- The closer the mouse is to a block, the stronger the highlight.

**Keyboard**
- Press **`T`** to toggle the **train animation**:
- A vertical column moves from left to right across the artwork.
- Blocks in the active column are overlaid with a warm red tint, suggesting a train of light travelling across the city grid.
- Press **`T`** again to return to this mode.

## My individual approach to animate base on group code

Our group agreed on a shared base: a Mondrian-like reinterpretation of **Sydney’s street and network**, constructed from a 32×32 grid and loaded from a **blocks.csv** file. Each block’s row, column, span and colour defined there and the original group code rendered a static artwork.

For my individual version, I focused on **interaction** as the driver of animation:

- I treat the viewer’s **mouse** as a moving source of energy that “wakes up” nearby blocks through brightness and subtle colour shifts.
- I use a **keyboard-triggered mode** (`T` key) to simulate a symbolic **train line** that moves across the grid, aligning with our reference to Sydney’s transport network.

Conceptually, my animation explores how **urban light and motion are co-created by people’s movement and by infrastructure**. Instead of adding random or time-only changes, I wanted the animation to feel like a live, responsive city. 

## Animated properties and how they diffrent from my group members

In my individual version, I animate the following properties:

**Local brightness / glow**
- Each block calculates its distance to the mouse.
- Within a certain radius, the block’s colour is blended towards white, creating a **proximity-based glow**.
- This makes the grid feel like it is breathing with the viewer’s movement.

**Colour accent along a moving column**
- When train mode is active, a column index advances over time.
- Blocks overlapping this column are blended toward a **warm red highlight**, suggesting a train of illuminated windows passing through the city.

In our group, we discussed ensuring that each member’s animation was distinct. While others considered:

- **Rutwijia**:used scatter,pulse and disappear time to animate
- **Sawita**:used sound to move blocks
- **Gina**:plan to do the dynamic by randomly changing the size and colors using noise function

My emphasis is on:

- **Proximity-based glow**:controlled by mouse movement.
- **column-based “train” sweep**:triggered by the keyboard.

This combination of **spatial interaction** (mouse) and **mode switching** (keyboard) makes my version visually and distinct from team-mates who may focus on different visual properties or drivers.

## Technical explanation of how the animation works

### Base code

- The sketch uses **p5.js** and loads `data/blocks.csv` in `preload()`.
- `LayoutGrid` creates a 32×32 grid and stores all `Block` objects.
- Each `Block` holds its grid position, span, and base colour, and is responsible for drawing itself. 

### Mouse-based glow

In my modified `Block.display()` method:

- I compute the block’s **pixel coordinates** (x, y, w, h) from its row/column and the current `cellSize`.
- I calculate the **distance `d` from the mouse** to the block’s centre.
- If `d` is within a certain radius, I derive a value `t` from `0` to `1` (closer = larger `t`).
- I blend (`lerpColor`) the block’s base colour towards white using `t`, creating a **smooth falloff**:
   - Far from the mouse: show near the original colour  
   - Close to the mouse: show close to white / glowing

### Keyboard-triggered train animation

In `sketch.js`:

- I store a global `animationMode` (`'idle'` or `'train'`) and a `trainProgress` value.
- In `keyPressed()`, pressing **`T`** toggles `animationMode`:
- When entering `'train'`, `trainProgress` is reset.
- In each `draw()` frame, if `animationMode === 'train'`:
  - `trainProgress` is increased slightly,
  - the **active column index** is computed as `floor(trainProgress) % grid.cols`,
  - this `activeCol` is passed into `grid.display()`.

In `Block.display()`, the block checks:

- Whether it overlaps the active column (i.e. whether its horizontal span covers `activeCol`),
- If so, its current colour (after mouse-based glow) is blended toward a warm red.

This yields a **moving vertical band** that interacts with the underlying composition and with the mouse glow.

## Changes I made to the group code

Compared to the original group code, I:

**Extended the Block class**
- Added extra parameters to `display(cellSize, mode, activeCol)` to support animation.
- Implemented distance-based brightness changes and train-column highlighting.

**Updated LayoutGrid.display()**
- Now forwards `mode` and `activeCol` to each block to coordinate the animation across the entire grid.

**Added animation state to sketch.js**
- Global variables: `animationMode` and `trainProgress`.
- Modified `draw()` to compute the active column when in train mode.
- Added a `keyPressed()` function to toggle modes with the `T` key.

The CSV data structure, color palette, and core grid logic remain consistent with the group’s shared foundation.

## Inspirations and references

My animation is informed by:

**Piet Mondrian’s *Broadway Boogie Woogie***  

The original painting suggests rhythm, movement, and music through its grid of coloured blocks. I was inspired by how a static composition can still imply motion and tempo.

![Piet_Mondrian Broadway_Boogie_Woogie](https://github.com/user-attachments/assets/16990ae7-5b40-4c9a-a337-4fffdcc1bc47)


**Sydney and global metro and railway maps**  

The vertical and horizontal blocks echo train lines and city blocks. The moving column of light is a simplified, abstract representation of a train travelling across a network.

<img width="1194" height="844" alt="image" src="https://github.com/user-attachments/assets/02b0b2d3-5326-4a1e-92c4-f0788642ab5d" />

**Forest of Resonating Lamp** 

I Inspired by teamLab’s Forest of Resonating Lamps, where light ripples outward as viewers move. These pieces treat human presence as energy that activates the environment, a concept I translated into a distance-based glow around the 
cursor

<img width="1920" height="1279" alt="image" src="https://github.com/user-attachments/assets/4f847c52-5267-4458-84bb-d642c6bef9d6" />


## External tools and techniques

- The project uses **p5.js** reference.
- The interaction patterns (mouse-driven distance, keyboard toggles) built using standard p5.js functions such as `dist()`, `lerpColor()`, `keyPressed()`, and global mouse variables.
- The idea of using **distance-based colour interpolation** is a common technique in generative art and interactive visualisation, adapted here specifically to fit our Mondrian-inspired, Sydney-based composition.
