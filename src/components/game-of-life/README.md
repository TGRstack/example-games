# Game of Life

The Game of Life is a two dimensional universe in which patterns evolve through time. It is one of the best examples in science of how a few simple rules can result in incredibly complex behaviour. It’s also incredibly cool and gorgeous to watch.

The Life universe is terrifically simple. A square grid contains cells that are either alive or dead. The behaviour of each cell is dependent only on the state of its eight immediate neighbours, according to the following rules:

## Rules

### Live cells

a live cell with zero or one live neighbours will die.
a live cell with two or three live neighbours will remain alive
a live cell with four or more live neighbours will die.

### Dead cells

a dead cell with exactly three live neighbours becomes alive
in all other cases a dead cell will stay dead.

## Features

- Game Controller
  - [x] start/stop loop at #-FPS
  - [x] reset game
  - [ ] alert on Extinction

- Game Style
  - [ ] wrapped world w/ UI (thick border and padding around pitri world)
  - [ ] toggle lifecycle states
    - [ ] corpses
    - [ ] seeds

- Game Setup
  - [ ] change board shape (H/W)
  - [ ] set starting positions
