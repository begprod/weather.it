<template>
  <div class="weather-icon" :class="classObject">
    <div v-for="index in 10" :key="index"></div>
  </div>
</template>

<script setup lang="ts">
import { WeatherType } from '@/types';
import { computed } from 'vue';

interface IProps {
  type: keyof typeof WeatherType;
}

const props = defineProps<IProps>();

const classObject = computed(() => {
  switch (props.type) {
    case 'Clear':
      return 'weather-icon_clear';
    case 'Clouds':
      return 'weather-icon_clouds';
    case 'Thunderstorm':
      return 'weather-icon_thunder';
    case 'Tornado':
      return 'weather-icon_thunder';
    case 'Drizzle':
      return 'weather-icon_drizzle';
    case 'Rain':
      return 'weather-icon_rain';
    case 'Snow':
      return 'weather-icon_snow';
    case 'Smoke':
      return 'weather-icon_smoke';
    case 'Haze':
      return 'weather-icon_smoke';
    case 'Squall':
      return 'weather-icon_smoke';
    case 'Fog':
      return 'weather-icon_smoke';
    case 'Mist':
      return 'weather-icon_mist';
    case 'Dust':
      return 'weather-icon_dust';
    case 'Sand':
      return 'weather-icon_dust';
    case 'Ash':
      return 'weather-icon_dust';
    default:
      return 'icon_default';
  }
});
</script>

<style scoped>
.weather-icon {
  --white: #ffffff;
  --white-dim: #bfbfbf;
  --yellow-light: #ffeb3b;
  --yellow-dark: #e5c43b;
  --brown: #b2830e;
  --orange-light: #fb8c00;
  --orange: #ff6f00;
  --orange-dark: #ff5722;
  --blue-light: #7bd2f9;
  --blue: #65a9e9;
  --blue-dark: #53adfc;
  --gray-light: #8e8e8e;
  --gray: #5c5c5c;
  --gray-dark: #3f3f3f;

  position: relative;
  width: clamp(3.75rem, 9.77vw, 4.69rem);
  height: clamp(3.75rem, 9.77vw, 4.69rem);
  border-radius: 20px;

  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    content: '';
    position: absolute;
  }

  div {
    position: absolute;

    &:nth-child(1) {
      display: block;
      top: 23%;
      right: 23%;
      animation-delay: 2s;
    }

    &:nth-child(2) {
      display: block;
      top: 13%;
      right: 24%;
      animation-delay: 5s;
    }

    &:nth-child(3) {
      display: block;
      top: 14%;
      right: 25%;
      animation-delay: 4s;
    }

    &:nth-child(4) {
      display: block;
      top: 9%;
      right: 21%;
      animation-delay: 8s;
    }

    &:nth-child(5) {
      display: block;
      top: 17%;
      right: 6%;
      animation-delay: 7s;
    }

    &:nth-child(6) {
      display: block;
      top: 28%;
      right: 26%;
      animation-delay: 7s;
    }

    &:nth-child(7) {
      display: block;
      top: 23%;
      right: 18%;
      animation-delay: 7s;
    }

    &:nth-child(8) {
      display: block;
      top: 19%;
      right: 28%;
      animation-delay: 9s;
    }

    &:nth-child(9) {
      display: block;
      top: 3%;
      right: 8%;
      animation-delay: 1s;
    }

    &:nth-child(10) {
      display: block;
      top: 18%;
      right: 30%;
      animation-delay: 10s;
    }
  }
}

/* Clear */
.weather-icon_clear {
  background: linear-gradient(to top right, #ff5722 0%, #fb8c00 100%);
  box-shadow: 1px 1px 30px var(--orange);

  &::before {
    top: -5%;
    right: -5%;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background: linear-gradient(to bottom left, #ffeb3b 0%, #fb8c00 90%);
    box-shadow: 1px 1px 30px var(--orange-dark);
    opacity: 1;
    animation: floating 5s infinite;
  }

  &::after {
    top: 30%;
    right: 40%;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--white);
    opacity: 0.2;
    animation: floating-around 7s infinite;
  }
}

/* Clouds */
.weather-icon_clouds {
  background: linear-gradient(to top right, #7bd2f9 0%, #65a9e9 100%);
  box-shadow: 1px 1px 30px var(--blue-dark);

  &::before {
    top: 5px;
    right: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--gray-light);
    opacity: 1;
    animation: move 6s infinite linear;
  }

  &::after {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--gray-light);
    opacity: 1;
    animation: move 4s infinite linear;
  }
}

/* Drizzle */
.weather-icon_drizzle {
  background: linear-gradient(to top right, #bfbfbf 0%, #8e8e8e 100%);
  box-shadow: 1px 1px 30px var(--gray-light);

  &::after {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--gray);
    opacity: 1;
    animation: move 4s infinite linear;
  }

  div {
    display: none;
    width: 2px;
    height: 5px;
    border-radius: 0px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: fall 3s infinite linear;
  }
}

/* Rain */
.weather-icon_rain {
  background: linear-gradient(to top right, #8e8e8e 0%, #5c5c5c 100%);
  box-shadow: 1px 1px 30px var(--gray-dark);

  div {
    display: none;
    width: 2px;
    height: 7px;
    border-radius: 0px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: fall 3s infinite linear;
  }

  &::before {
    top: 5px;
    right: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 1;
    animation: move 6s infinite linear;
  }

  &::after {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--gray-light);
    box-shadow: 1px 1px 30px var(--gray);
    opacity: 1;
    animation: move 4s infinite linear;
  }
}

/* Thunder */
.weather-icon_thunder {
  background: linear-gradient(to top right, #8e8e8e 0%, #5c5c5c 100%);
  box-shadow: 1px 1px 30px var(--gray-dark);

  div {
    display: none;
    width: 2px;
    height: 7px;
    border-radius: 0px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: fall 3s infinite linear;
  }

  &::before {
    top: 5px;
    right: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--gray-light);
    box-shadow: 1px 1px 30px var(--gray-light);
    opacity: 1;
    animation:
      move 6s infinite linear,
      flash 2s infinite;
  }

  &::after {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--gray-light);
    box-shadow: 1px 1px 30px var(--gray-light);
    opacity: 1;
    animation:
      move 4s infinite linear,
      flash 1s infinite linear;
  }
}

/* Snow */
.weather-icon_snow {
  background: linear-gradient(to top right, #8e8e8e 0%, #bfbfbf 100%);
  box-shadow: 1px 1px 30px var(--white-dim);

  &::before {
    top: 5px;
    right: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 1;
    animation: move 6s infinite linear;
  }

  &::after {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 1;
    animation: move 4s infinite linear;
  }

  div {
    display: none;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: var(--white);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: fall 4s infinite linear;
  }
}

/* Smoke */
.weather-icon_smoke {
  background: linear-gradient(to top right, #8e8e8e 0%, #5c5c5c 100%);
  box-shadow: 1px 1px 30px var(--gray-dark);

  div {
    display: none;
    width: 20px;
    height: 5px;
    border-radius: 30px;
    background: var(--gray-light);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: slide 3s infinite linear;

    &:nth-child(1) {
      display: block;
      top: 55%;
      right: 30%;
      animation-delay: 5s;
    }

    &:nth-child(2) {
      display: block;
      top: 33%;
      right: 60%;
      animation-delay: 5s;
    }

    &:nth-child(3) {
      display: block;
      top: 30%;
      right: 2%;
      animation-delay: 10s;
    }

    &:nth-child(4) {
      display: block;
      top: 80%;
      right: 50%;
      animation-delay: 4s;
    }

    &:nth-child(5) {
      display: block;
      top: 50%;
      right: 72%;
      animation-delay: 6s;
    }

    &:nth-child(6) {
      display: block;
      top: 72%;
      right: 60%;
      animation-delay: 8s;
    }

    &:nth-child(7) {
      display: block;
      top: 10%;
      right: 61%;
      animation-delay: 8s;
    }
    &:nth-child(8) {
      display: block;
      top: 60%;
      right: 22%;
      animation-delay: 5s;
    }

    &:nth-child(9) {
      display: block;
      top: 35%;
      right: 70%;
      animation-delay: 3s;
    }

    &:nth-child(10) {
      display: block;
      top: 29%;
      right: 24%;
      animation-delay: 9s;
    }
  }
}

/* Dust */
.weather-icon_dust {
  background: linear-gradient(to top right, #e5c43b 0%, #b2830e 100%);
  box-shadow: 1px 1px 30px var(--brown);

  div {
    display: none;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: var(--brown);
    box-shadow: 1px 1px 30px var(--yellow-dark);
    opacity: 0;
    animation: slide 3s infinite linear;

    &:nth-child(1) {
      display: block;
      top: 53%;
      right: 62%;
      animation-delay: 3s;
    }

    &:nth-child(2) {
      display: block;
      top: 54%;
      right: 52%;
      animation-delay: 10s;
    }

    &:nth-child(3) {
      display: block;
      top: 51%;
      right: 48%;
      animation-delay: 7s;
    }

    &:nth-child(4) {
      display: block;
      top: 14%;
      right: 53%;
      animation-delay: 6s;
    }

    &:nth-child(5) {
      display: block;
      top: 46%;
      right: 18%;
      animation-delay: 6s;
    }

    &:nth-child(6) {
      display: block;
      top: 55%;
      right: 28%;
      animation-delay: 1s;
    }

    &:nth-child(7) {
      display: block;
      top: 8%;
      right: 59%;
      animation-delay: 1s;
    }

    &:nth-child(8) {
      display: block;
      top: 6%;
      right: 49%;
      animation-delay: 7s;
    }

    &:nth-child(9) {
      display: block;
      top: 30%;
      right: 20%;
      animation-delay: 3s;
    }

    &:nth-child(10) {
      display: block;
      top: 41%;
      right: 29%;
      animation-delay: 9s;
    }
  }
}

/* Mist */
.weather-icon_mist {
  background: linear-gradient(to top right, #5c5c5c 0%, #bfbfbf 100%);
  box-shadow: 1px 1px 30px var(--gray-dark);

  div {
    display: none;
    width: 30px;
    height: 10px;
    border-radius: 30px;
    background: var(--white-dim);
    box-shadow: 1px 1px 30px var(--white-dim);
    opacity: 0;
    animation: slide 3s infinite linear;

    &:nth-child(1) {
      display: block;
      top: 24%;
      right: 44%;
      animation-delay: 7s;
    }

    &:nth-child(2) {
      display: block;
      top: 25%;
      right: 15%;
      animation-delay: 6s;
    }

    &:nth-child(3) {
      display: block;
      top: 33%;
      right: 5%;
      animation-delay: 1s;
    }

    &:nth-child(4) {
      display: block;
      top: 38%;
      right: 51%;
      animation-delay: 5s;
    }

    &:nth-child(5) {
      display: block;
      top: 67%;
      right: 76%;
      animation-delay: 5s;
    }

    &:nth-child(6) {
      display: block;
      top: 18%;
      right: 11%;
      animation-delay: 3s;
    }

    &:nth-child(7) {
      display: block;
      top: 14%;
      right: 71%;
      animation-delay: 5s;
    }

    &:nth-child(8) {
      display: block;
      top: 66%;
      right: 80%;
      animation-delay: 3s;
    }

    &:nth-child(9) {
      display: block;
      top: 33%;
      right: 56%;
      animation-delay: 1s;
    }

    &:nth-child(10) {
      display: block;
      top: 57%;
      right: 76%;
      animation-delay: 9s;
    }
  }
}
</style>
