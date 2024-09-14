<template>
  <div>
    <div ref="joe" class=""></div>
    <div ref="skibidi">
      <span
        v-for="(data, word) in words"
        class="absolute select-none cursor-pointer origin-center border-2 border-black"
        :key="word"
        :id="String(word)"
        @click="big(word as string)"
        :style="`font-size:${data.count * 0.75 + 1}rem;`"
        >{{ word }}</span
      >
    </div>
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

type Word = { count: number; width: number; height: number; shape: Matter.Body | undefined };

const words: Ref<{ [key: string]: Word }> = ref({
  trump: { count: 5, width: 0, height: 0, shape: undefined },
  biden: { count: 3, width: 0, height: 0, shape: undefined },
  skibidi: { count: 1, width: 0, height: 0, shape: undefined }
});

const engine = Engine.create();

function init() {
  if (!skibidi.value) return;
  Array.from(skibidi.value?.children).forEach((el) => {
    const word = el.innerHTML;
    const rect = el.getBoundingClientRect();
    console.log(word, rect);
    words.value[word].width = rect.width;
    words.value[word].height = rect.height;
    add(word);
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
  Composite.add(engine.world, Bodies.rectangle(0, 600, 10000, 60, { isStatic: true }));

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
      el.style.left = wordData.shape.position.x - wordData.width / 2 + 'px';
      el.style.top = wordData.shape.position.y - wordData.height / 2 + 'px';
      el.style.transform = `rotate(${wordData.shape.angle}rad)`;
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
  console.log(wordData.width);
  console.log(wordData.height);
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
  const shape = Bodies.rectangle(window.innerWidth / 2, 200, wordData.width, wordData.height);
  shape.label = word;
  wordData.shape = shape;
  Composite.add(engine.world, wordData.shape);
}
</script>

<style scoped></style>
