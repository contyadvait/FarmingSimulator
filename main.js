/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Farming Simulator for Sprig
@author: advaitconty
@tags: []
@addedOn: 2024-00-00
*/

const player = "P"
const crop = "C"
const water = "W"
const tool = "T"
const empty = "."
const grass = "G"
var crops = 0
let wheat = "Wheat: "
var showText = true

setLegend(
  [ player, bitmap`
1.11............
..11............
.....1..........
......1.........
.......1........
.4444441........
.4777741........
.4777741........
.4777741........
.444444444444...
.444444444444...
.400004444444...
.400004444444...
.400004444004...
..0000....00....
................` ],
  [ crop, bitmap`
................
........6..F..6.
.....6.F6F66.6..
.....6.F66F66...
.....6F666F66...
.....6666F6F66..
.....66F6F6F6...
.....6F6F6F6....
.....66666F6....
....FF666.......
....6FF6........
...6666F........
...F66..........
................
................
................` ],
  [ water, bitmap`
................
................
................
.......7........
......777.......
.....77777......
.....77777......
....7777777.....
...777777777....
...777777777....
...777777777....
....7777777.....
.....77777......
......777.......
................
................` ],
  [ tool, bitmap`
................
.........111....
........1...1...
.............1..
..............1.
..............1.
..............1.
......111.....1.
....CC1111...1..
...CCCC..11.1...
..CCCCC...11....
.CCCC...........
.CCC............
.CC.............
................
................` ],
  [ grass, bitmap`
................
................
................
................
................
................
................
................
.....D..........
...D.4...D......
...4.D...4......
....4.D.D.......
....D.4.D.......
.....4D4........
................
................` ]
)

setSolids([player, crop, water, grass])

const grid = [
  [player, empty, empty, crop, crop],
  [empty, empty, empty, empty, crop],
  [crop, water, crop, empty, empty],
  [empty, empty, crop, tool, empty],
  [empty, empty, empty, empty, empty]
]

setMap(map`
P.......W..
........W..
.CG.....W..
.CCC....W..
.CGG....W..
.GC.....W..
........W..
........W..
........W..
........W..
...........
...........`)

if (showText == true) {
  addText("WSAD to move", {x: 3, y: 11})
}

onInput("w", () => {
  const players = getFirst(player)
  const destinationTile = getTile(player.x, player.y - 1)

  // Check if the destination tile contains any solid sprites
  if (destinationTile.some(sprite => setSolids.includes(sprite.type))) {
    crops = crops + 1
  } else {
    // No collision, move the player up
    players.y -= 1
  }
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  getAll("WSAD to move").forEach(text => {
    text.visible = false; // Hide the text element
  })
  addText(wheat.concat(crops.toString()), {x: 3, y: 15, family: "Arial"})
})