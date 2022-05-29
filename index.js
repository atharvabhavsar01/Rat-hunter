//atharva bhavsar

import kaboom from "kaboom";

// initialize context
kaboom({
  font: "sink",
  background: [244, 194, 194],
});

// load assets

//sounds
loadSound("Cat-sound-meow", "sounds/Cat-sound-meow.mp3");
loadSound("game over", "sounds/game over.wav");
loadSound(
  "background music for game ",
  "sounds/background music for game .mp3"
);

//sprites

loadSprite("rat", "sprites/rat.png");
loadSprite("dog", "sprites/dog.png");
loadSprite("cat", "sprites/cat.png");

//define game const
let SPEED = 500;
let BSPEED = 2;
let SCORE = 0;
let backgroundMusic;
let bg = false;

let scoreTest;
//display9 score
const scoredisplay = () => {
  destroy(scoreTest);
  scoreTest = add([
    text("Score:" + SCORE),
    pos(width() - width() / 2, 21),
    scale(3),
    color(0, 0, 0),
  ]);
};

//1 cat
//2 rat
//3 dogs which are enemies

//background music

const playbg = () => {
  if (!bg) {
    backgroundMusic = play("background music for game ");
    bg = true;
  }
};

//adding cat
const player = add([
  sprite("cat"), // renders as a sprite
  pos(120, 80), // position in world
  area(), // has a collider
  scale(0.3),

  //body(),          // responds to physics and gravity
]);
//Adding events to player
//when you press key down
onKeyDown("left", () => {
  playbg();
  player.move(-SPEED, 0);
});

onKeyDown("right", () => {
  playbg();
  player.move(SPEED, 0);
});

onKeyDown("up", () => {
  playbg();
  player.move(0, -SPEED);
});

onKeyDown("down", () => {
  playbg();
  player.move(0, SPEED);
});

//Adding 8dogs on loop

setInterval(() => {
  for (let i = 0; i < 4; i++) {
    let x = rand(0, width());
    let y = height();

    let c = add([
      sprite("dog"), // renders as a sprite
      pos(x, y), // position in world
      area(), // has a collider
      scale(0.3),
      "dog",
      //body(),          // responds to physics and gravity
    ]);

    c.onUpdate(() => {
      c.moveTo(c.pos.x, c.pos.y - BSPEED);
    });
  }

  let x = rand(0, width());
  let y = height();

  //adding rats
  let c = add([sprite("rat"), pos(x, y), area(), scale(0.2), "rat"]);
  c.onUpdate(() => {
    c.moveTo(c.pos.x, c.pos.y - BSPEED);
  });
}, 4000);

player.onCollide("dog", () => {
  backgroundMusic.volume(0.2);
  play("game over");
  destroy(player);
  addKaboom(player.pos);
});
player.onCollide("rat", (rat) => {
  backgroundMusic.volume(0.2);
  play("Cat-sound-meow");
  destroy(rat);
  SCORE += 1;
  scoredisplay();
  wait(2, () => {
    backgroundMusic.volume(0.5);
  });
  // backgroundMusic.volume(1)
});

//displaying the score
scoredisplay();
