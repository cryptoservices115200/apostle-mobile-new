

<!-- Sorry, -->
after installing module node_modules\react-native-draggable-gridview\src\index.tsx
please change this charactor of this module for this project.
: line 442
height: self.cellSize, => height: 16, 
: line 497
height: top + self.numRows * self.cellSize + bottom, => height: top + self.numRows * 18 + bottom,
: line 138
const y = Math.floor(i / numColumns) * cellSize => const y = Math.floor(i / numColumns) * 18
: line 268
const s = cellSize / 2 => const s = 18 / 2
: line 184
const max = cellSize * numRows - frame.height + top + bottom => const max = 18 * numRows - frame.height + top + bottom
: line 335
let row = Math.floor((y + cellSize / 2) / cellSize) => let row = Math.floor((y + 18 / 2) / 18)