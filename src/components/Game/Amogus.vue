<template>
  <div>
    <svg v-show="position" class="amogus" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M133.316 30C158.5 30 172.748 42.9312 185.105 64.5263C195.5 64.5263 203 81 203 90.4211C203 101.501 194.5 116.316 185.105 116.316V220.526H141.947V186H116.053V220.526H72.8947V186H47V90.4211H72.8947V64.5263C72.8947 48 96 30 133.316 30Z"
        :fill="color"
      />
      <path
        d="M185.105 64.5263C172.748 42.9312 158.5 30 133.316 30C96 30 72.8947 48 72.8947 64.5263V90.4211M185.105 64.5263C195.5 64.5263 203 81 203 90.4211C203 101.501 194.5 116.316 185.105 116.316M185.105 64.5263H116.053C107.5 64.5263 98.7895 79.4962 98.7895 90.4211C98.7895 100 106.5 116.316 116.053 116.316H185.105M185.105 116.316V220.526H141.947V186M141.947 186C149.697 184.646 153.374 182.55 159.211 177.368M141.947 186H116.053V220.526H72.8947V186M72.8947 186H47V90.4211H72.8947M72.8947 186V90.4211"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M203 90.4211C203 81 195.5 64.5263 185.105 64.5263H116.053C107.5 64.5263 98.7895 79.4962 98.7895 90.4211C98.7895 100 106.5 116.316 116.053 116.316H185.105C194.5 116.316 203 101.501 203 90.4211Z"
        fill="#CAF5FF"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg v-show="!position" class="amogus" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M133.316 36C158.5 36 172.748 48.9312 185.105 70.5263C195.5 70.5263 203 87 203 96.4211C203 107.501 194.5 122.316 185.105 122.316V220.526H141.947V186H116.053V220.526H72.8947V186H47V96.4211H72.8947V70.5263C72.8947 54 96 36 133.316 36Z"
        :fill="color"
      />
      <path
        d="M185.105 70.5263C172.748 48.9312 158.5 36 133.316 36C96 36 72.8947 54 72.8947 70.5263V96.4211M185.105 70.5263C195.5 70.5263 203 87 203 96.4211C203 107.501 194.5 122.316 185.105 122.316M185.105 70.5263H116.053C107.5 70.5263 98.7895 85.4962 98.7895 96.4211C98.7895 106 106.5 122.316 116.053 122.316H185.105M185.105 122.316V220.526H141.947V186M141.947 186C149.697 184.646 153.374 182.55 159.211 177.368M141.947 186H116.053V220.526H72.8947V186M72.8947 186H47V96.4211H72.8947M72.8947 186V96.4211"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M203 96.4211C203 87 195.5 70.5263 185.105 70.5263H116.053C107.5 70.5263 98.7895 85.4962 98.7895 96.4211C98.7895 106 106.5 122.316 116.053 122.316H185.105C194.5 122.316 203 107.501 203 96.4211Z"
        fill="#CAF5FF"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { delay, getRandomInt } from "@/utils/functions";
import { onMounted, ref } from "vue";

type Props = {
  color: string;
};

const props = defineProps<Props>();

const position = ref(0);

onMounted(() => bop());

async function bop() {
  while (true) {
    position.value = 0;
    await delay(getRandomInt(200, 400));
    position.value = 1;
    await delay(getRandomInt(500, 700));
  }
}
</script>

<style lang="scss" scoped>
.amogus {
  width: 14rem;
  height: 14rem;
}

@media (max-width: 1200px) {
  .amogus {
    width: 10rem;
    height: 10rem;
  }
}
</style>
