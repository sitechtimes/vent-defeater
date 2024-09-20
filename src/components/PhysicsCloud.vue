<template>
  <div class="w-[100vw] h-[100vh] overflow-hidden">
    <div ref="joe" class="hidden"></div>
    <div ref="skibidi" class="screen z-10" @click="addRandom" @mousemove="getMousePos">
      <span
        v-for="(data, word) in words"
        @mouseenter="cursor(1)"
        @mouseleave="cursor(0)"
        class="word absolute select-none origin-center border-black hover:border-2"
        :key="word"
        :id="String(word)"
        @click="big(word as string)"
        :style="`font-size:${data.count * 0.75 + 1.25}rem;`"
        >{{ word }}</span
      >
    </div>
    <marquee class="screen"><img src="https://media1.tenor.com/m/Spmi9HLHEz0AAAAd/despite-all-my-rage.gif" class="h-[100vh]" /></marquee>
    <div ref="pointer" id="pointer"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue';
import Matter from 'matter-js';
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
const Events = Matter.Events;

const joe = ref<HTMLDivElement | undefined>();
const skibidi = ref<HTMLDivElement | undefined>();

type Word = { count: number; width: number; height: number; area: number; shape: Matter.Body | undefined };

const words: Ref<{ [key: string]: Word }> = ref({
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Duis ut est in diam blandit condimentum a non neque.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Fusce pharetra tortor sit amet aliquet venenatis.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Suspendisse finibus felis quis risus porta, non mattis velit congue.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Morbi placerat arcu eu convallis feugiat.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Donec sed sapien interdum, blandit mi vitae, posuere nulla.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Cras scelerisque nibh at urna fermentum sagittis.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Nulla feugiat nisl quis massa gravida tempor.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Donec et ex nec dui blandit tristique.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Morbi ultricies purus at eros fringilla gravida.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Morbi pretium urna nec arcu elementum pharetra.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Nulla vel elit eu purus ultrices vestibulum a at diam.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Praesent ac dui hendrerit, dapibus dui iaculis, convallis tellus.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Sed in tellus vitae nunc ornare pharetra non ut diam.': { count: 0, width: 0, height: 0, area: 0, shape: undefined },
  'Nunc egestas mi ac urna maximus blandit.': { count: 0, width: 0, height: 0, area: 0, shape: undefined }
});
/* const funny = ``; // bee movie script and bible went here. rip
words.value[funny] = { count: 1, width: 0, height: 0, shape: undefined }; */

async function addRandom() {
  const id = String(Math.ceil(Math.random() * 100));
  if (!words.value[id]) {
    words.value[id] = { count: 0, width: 0, height: 0, area: 0, shape: undefined };
    await nextTick();
    const el = document.getElementById(id);
    if (!el) return;
    const word = el.id;
    const rect = el.getBoundingClientRect();
    words.value[word].width = rect.width;
    words.value[word].height = rect.height;
    add(id);
  }
  big(id);
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
const pointer: Ref<HTMLDivElement | undefined> = ref();

function getMousePos(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!pointer.value) return;
  pointer.value.style.left = mouseX + 'px';
  pointer.value.style.top = mouseY + 'px';
}

const cursor = (yes: number) => pointer.value && Object.assign(pointer.value.style, { width: `${yes + 1}em`, height: `${yes + 1}em` });

const engine = Engine.create();

engine.gravity.scale = 0;

function init() {
  if (!skibidi.value) return;
  Array.from(skibidi.value?.children).forEach((el) => {
    const word = el.id;
    const rect = el.getBoundingClientRect();
    words.value[word].width = rect.width;
    words.value[word].height = rect.height;
    add(word);
    big(word);
  });
  console.log(words.value);
}

let runner;

onMounted(() => {
  init();

  var render = Render.create({
    element: joe.value,
    engine: engine
  });

  // add all of the bodies to the world
  // Composite.add(engine.world, Bodies.rectangle(0, 1030, 10000, 60, { isStatic: true }));

  // run the renderer
  Render.run(render);

  // create runner
  runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
  Events.on(runner, 'afterUpdate', () => {
    Object.keys(words.value).forEach((word) => {
      const el = document.getElementById(word);
      if (!el) return;
      const wordData = words.value[word];
      if (!wordData.shape) return;
      const center = [wordData.shape.position.x, wordData.shape.position.y];
      el.style.left = center[0] + 'px';
      el.style.top = center[1] + 'px';
      el.style.transform = `rotate(${wordData.shape.angle}rad)`;
      // let bHole = Matter.Vector.create(window.innerWidth / 2 - center[0], window.innerHeight / 2 - center[1]);
      let bHole = Matter.Vector.create(mouseX - (center[0] + wordData.width / 2), mouseY - (center[1] + wordData.height / 2));
      bHole = Matter.Vector.normalise(bHole);
      bHole = Matter.Vector.mult(bHole, wordData.area * 0.000001);

      Matter.Body.applyForce(wordData.shape, wordData.shape.position, bHole);
    });
  });
});

let toAdd: { [key: string]: Matter.Body } = {};

async function big(word: string) {
  const wordData = words.value[word];
  wordData.count++;
  await nextTick();
  const rect = document.getElementById(word)?.getBoundingClientRect();
  if (!rect) return;
  wordData.width = rect.width;
  wordData.height = rect.height;
  wordData.area = rect.width * rect.height;
  if (!wordData.shape) return;
  const newShape = Bodies.rectangle(wordData.shape.position.x, wordData.shape.position.y, wordData.width, wordData.height, {
    angle: wordData.shape.angle,
    angularSpeed: wordData.shape.angularSpeed,
    angularVelocity: wordData.shape.angularVelocity,
    collisionFilter: wordData.shape.collisionFilter,
    density: wordData.shape.density,
    force: wordData.shape.force,
    friction: wordData.shape.friction,
    frictionAir: wordData.shape.frictionAir,
    frictionStatic: wordData.shape.frictionStatic,
    isSensor: wordData.shape.isSensor,
    isSleeping: wordData.shape.isSleeping,
    isStatic: wordData.shape.isStatic,
    label: wordData.shape.label,
    motion: wordData.shape.motion,
    plugin: wordData.shape.plugin,
    position: wordData.shape.position,
    render: wordData.shape.render,
    restitution: wordData.shape.restitution,
    sleepThreshold: wordData.shape.sleepThreshold,
    slop: wordData.shape.slop,
    speed: wordData.shape.speed,
    timeScale: wordData.shape.timeScale,
    torque: wordData.shape.torque,
    type: wordData.shape.type,
    velocity: wordData.shape.velocity
  });
  toAdd[word] = newShape;
  console.log(Composite.remove(engine.world, wordData.shape, true));
}

Events.on(engine.world, 'afterRemove', () => {
  console.log(toAdd);
  for (const word in toAdd) {
    if (Object.prototype.hasOwnProperty.call(toAdd, word)) {
      words.value[word].shape = toAdd[word];
      Composite.add(engine.world, words.value[word].shape);
      const body = words.value[word].shape;
      const vector = Matter.Vector.create(Math.random() * 10 - 5, Math.random() * 10 - 5);
      Matter.Body.setVelocity(body, vector);
    }
  }
  toAdd = {};
});

function add(word: string) {
  const wordData = words.value[word];

  let spawnX = 0;
  let spawnY = 0;

  const loc = Number(Math.random() < 0.5);
  if (Math.random() < 0.5) {
    spawnX = window.innerWidth * loc + (loc * 2 - 1) * wordData.width * 5;
    spawnY = window.innerHeight * Math.random();
  } else {
    spawnX = window.innerWidth * Math.random();
    spawnY = window.innerHeight * loc + (loc * 2 - 1) * wordData.height * 5;
  }

  const shape = Bodies.rectangle(spawnX, spawnY, wordData.width, wordData.height);
  shape.label = word;
  wordData.shape = shape;
  Composite.add(engine.world, wordData.shape);
}
</script>

<style scoped>
.screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: none;
}

.word {
  font-family: 'Comic Sans MS', 'Comic Sans', 'SUSE', sans-serif;
  max-width: 30vw;
}

#pointer {
  @apply bg-red-500;
  position: relative;
  left: -100vw;
  top: -100vh;
  width: 1em;
  height: 1em;
  transition-property: width, height;
  transition-duration: 100ms;
  transition-timing-function: ease-in;
  border-radius: 500px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 5;
}
</style>
