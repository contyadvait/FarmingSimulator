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
const emptiness = "E"
const grass = "G"
var crops = 0
let wheat = "Wheat: "
var showText = true
let timer = 1
let timerT = "Timer: "
var playing = false
var timerStart = false
var timerText = ""
setLegend(
  [ player, bitmap`
.LL.............
.LL.LL..........
....LL..........
.......1........
........1.......
........1.......
.1......1.......
.1...1..1.......
D1..11111.......
4DDDDDD444444444
344444DDDDDD4666
30000044444DDD66
3000004444444444
4000004444440004
4000004444440004
.00000......000.` ],
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
................` ],
  [ emptiness, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ]
)

setSolids([player, water, grass, tool])
setPushables({[water]: [player]})

const grid = [
  [player, empty, empty, crop, crop],
  [empty, empty, empty, empty, crop],
  [crop, water, crop, empty, empty],
  [empty, empty, crop, tool, empty],
  [empty, empty, empty, empty, empty]
]

const level1 = map`
...........W
.P.........W
...........W
...........W
...........W
...........W
...........W
...........W
...........W
...........W
...........W
...........W`
const endScreen = map`
.......
.......
WWCPCWW
.......
.......
.......`

setMap(level1)

function startTimer() {
  if (timer != 0) {
    timer -= 1
    timerText = timerT.concat(timer.toString())
  } else {
  setMap(endScreen)
    addText("Game over!", { x: 5, y:3 , family: "Arial" });
  }
}

for(let i = 0; i < 20; i++){
    addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "C")
    addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "G")
}

onInput("w", () => {
    const player = getFirst("P");
    const destinationTile = getTile(player.x, player.y - 1);

    console.log("Sprites on Destination Tile:", destinationTile);

    const wheatSprites = destinationTile.filter(sprite => sprite.type === "C");

    if (wheatSprites.length > 0) {
        console.log("Wheat sprite found! Changing sprite type...");

        wheatSprites.forEach(wheatSprite => {
            wheatSprite.type = "E";
          crops = crops + 1;
        });

        console.log("Wheat sprite type changed.");
    }

    player.y -= 1;
});



onInput("a", () => {
    const player = getFirst("P");
    const destinationTile = getTile(player.x - 1, player.y);

    console.log("Sprites on Destination Tile:", destinationTile);

    const wheatSprites = destinationTile.filter(sprite => sprite.type === "C");

    if (wheatSprites.length > 0) {
        console.log("Wheat sprite found! Changing sprite type...");

        wheatSprites.forEach(wheatSprite => {
            wheatSprite.type = "E";
          crops = crops + 1;
        });

        console.log("Wheat sprite type changed.");
    }

    player.x -= 1;
});

onInput("s", () => {
    const player = getFirst("P");
    const destinationTile = getTile(player.x, player.y + 1);

    console.log("Sprites on Destination Tile:", destinationTile);

    const wheatSprites = destinationTile.filter(sprite => sprite.type === "C");

    if (wheatSprites.length > 0) {
        console.log("Wheat sprite found! Changing sprite type...");

        wheatSprites.forEach(wheatSprite => {
            wheatSprite.type = "E";
          crops = crops + 1;
        });

        console.log("Wheat sprite type changed.");
    }

    player.y += 1;
});

onInput("d", () => {
    const player = getFirst("P");
    const destinationTile = getTile(player.x + 1, player.y);

    console.log("Sprites on Destination Tile:", destinationTile);

    const wheatSprites = destinationTile.filter(sprite => sprite.type === "C");

    if (wheatSprites.length > 0) {
        console.log("Wheat sprite found! Changing sprite type...");

        wheatSprites.forEach(wheatSprite => {
            wheatSprite.type = "E";
            crops = crops + 1;
        });

        console.log("Wheat sprite type changed.");
    }

    player.x += 1;
});

afterInput(() => {
  if (timerStart == false) {
    setInterval(startTimer, 1000)
    timerStart = true
  }
  addText(timerText, { x: 3, y: 13, family: "Arial" });
  if (timer != 0) {
    timerText = timerT.concat(timer.toString())
    addText(wheat.concat(crops.toString()), { x: 3, y: 15, family: "Arial" });
  } else {
    timerText = ""
    addText("", { x: 3, y: 13, family: "Arial" });
  }
});
