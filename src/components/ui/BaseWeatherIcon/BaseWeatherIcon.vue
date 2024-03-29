<template>
  <div class="weather-icon" :class="classObject">
    <div v-for="index in 10" :key="index"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WeatherType } from '@/types';

interface IProps {
  type: string;
}

const props = defineProps<IProps>();

const classObject = computed(() => {
  switch (props.type) {
    case WeatherType.Clear:
      return 'weather-icon_clear';
    case WeatherType.Clouds:
      return 'weather-icon_clouds';
    case WeatherType.Thunderstorm:
      return 'weather-icon_thunder';
    case WeatherType.Tornado:
      return 'weather-icon_thunder';
    case WeatherType.Drizzle:
      return 'weather-icon_drizzle';
    case WeatherType.Rain:
      return 'weather-icon_rain';
    case WeatherType.Snow:
      return 'weather-icon_snow';
    case WeatherType.Smoke:
      return 'weather-icon_smoke';
    case WeatherType.Haze:
      return 'weather-icon_smoke';
    case WeatherType.Squall:
      return 'weather-icon_smoke';
    case WeatherType.Fog:
      return 'weather-icon_smoke';
    case WeatherType.Mist:
      return 'weather-icon_mist';
    case WeatherType.Dust:
      return 'weather-icon_dust';
    case WeatherType.Sand:
      return 'weather-icon_dust';
    case WeatherType.Ash:
      return 'weather-icon_dust';
    default:
      return 'icon_default';
  }
});
</script>

<style scoped lang="scss">
@use 'sass:math';

$white: #ffffff;
$dimWhite: #bfbfbf;
$lightYellow: #ffeb3b;
$darkYellow: #e5c43b;
$brown: #b2830e;
$lightOrange: #fb8c00;
$orange: #ff6f00;
$darkOrange: #ff5722;
$lightBlue: #7bd2f9;
$blue: #65a9e9;
$darkBlue: #53adfc;
$lightGray: #8e8e8e;
$gray: #5c5c5c;
$darkGray: #3f3f3f;

$iconBase: (
  'position': relative,
  'width': 75px,
  'height': 75px,
  'border-radius': 20px,
);

$clear: (
  'background': linear-gradient(to top right, $darkOrange 0%, #fb8c00 100%),
  'box-shadow': 1px 1px 30px $orange,
);

$clouds: (
  'background': linear-gradient(to top right, $lightBlue 0%, $blue 100%),
  'box-shadow': 1px 1px 30px $darkBlue,
);

$drizzle: (
  'background': linear-gradient(to top right, $dimWhite 0%, $lightGray 100%),
  'box-shadow': 1px 1px 30px $lightGray,
);

$rain: (
  'background': linear-gradient(to top right, $lightGray 0%, $gray 100%),
  'box-shadow': 1px 1px 30px $darkGray,
);

$thunder: (
  'background': linear-gradient(to top right, $lightGray 0%, $gray 100%),
  'box-shadow': 1px 1px 30px $darkGray,
);

$snow: (
  'background': linear-gradient(to top right, $lightGray 0%, $dimWhite 100%),
  'box-shadow': 1px 1px 30px $dimWhite,
);

$mist: (
  'background': linear-gradient(to top right, $gray 0%, $dimWhite 100%),
  'box-shadow': 1px 1px 30px $darkGray,
);

$smoke: (
  'background': linear-gradient(to top right, $lightGray 0%, $gray 100%),
  'box-shadow': 1px 1px 30px $darkGray,
);

$dust: (
  'background': linear-gradient(to top right, $darkYellow 0%, $brown 100%),
  'box-shadow': 1px 1px 30px $brown,
);

@mixin weatherElement(
  $top,
  $right,
  $width,
  $height,
  $borderRadius,
  $background,
  $boxShadow,
  $opacity,
  $animation
) {
  top: $top;
  right: $right;
  width: $width;
  height: $height;
  border-radius: $borderRadius;
  background: $background;
  box-shadow: $boxShadow;
  opacity: $opacity;
  animation: $animation;
}

@mixin weatherParticle(
  $width,
  $height,
  $background,
  $borderRadius,
  $boxShadow,
  $opacity,
  $animation
) {
  display: none;
  width: $width;
  height: $height;
  border-radius: $borderRadius;
  background: $background;
  box-shadow: $boxShadow;
  opacity: $opacity;
  animation: $animation;
}

@mixin particlesAnimation($particlesNumber, $top: 30, $right: 30) {
  @for $i from 1 through $particlesNumber {
    div:nth-child(#{$i}) {
      display: block;
      top: math.random(math.div($top, 1)) * 1%;
      right: math.random(math.div($right, 1)) * 1%;
      animation-delay: math.random(math.div(10, 1)) * 1s;
    }
  }
}

.weather-icon {
  @each $name, $value in $iconBase {
    #{$name}: $value;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

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
  }

  @include particlesAnimation(10);

  &_clear {
    @each $name, $value in $clear {
      #{$name}: $value;
    }

    &::before {
      @include weatherElement(
        -5%,
        -5%,
        25px,
        25px,
        100%,
        linear-gradient(to bottom left, $lightYellow 0%, $lightOrange 90%),
        1px 1px 30px $darkOrange,
        1,
        floating 5s infinite
      );
    }

    &::after {
      @include weatherElement(
        30%,
        40%,
        10px,
        10px,
        100%,
        $white,
        1px 1px 30px $white,
        0.2,
        floating-around 7s infinite
      );
    }
  }

  &_clouds {
    @each $name, $value in $clouds {
      #{$name}: $value;
    }

    &::before {
      @include weatherElement(
        5px,
        -5px,
        30px,
        10px,
        10px,
        $white,
        1px 1px 30px $lightGray,
        1,
        move 6s infinite linear
      );
    }

    &::after {
      @include weatherElement(
        10px,
        10px,
        30px,
        10px,
        10px,
        $white,
        1px 1px 30px $lightGray,
        1,
        move 4s infinite linear
      );
    }
  }

  &_drizzle {
    @each $name, $value in $drizzle {
      #{$name}: $value;
    }

    &::after {
      @include weatherElement(
        10px,
        10px,
        30px,
        10px,
        10px,
        $dimWhite,
        1px 1px 30px $gray,
        1,
        move 4s infinite linear
      );
    }

    div {
      @include weatherParticle(
        2px,
        5px,
        $dimWhite,
        0px,
        1px 1px 30px $dimWhite,
        0,
        fall 3s infinite linear
      );
    }
  }

  &_rain {
    @each $name, $value in $rain {
      #{$name}: $value;
    }

    &::before {
      @include weatherElement(
        5px,
        -5px,
        30px,
        10px,
        10px,
        $dimWhite,
        1px 1px 30px $dimWhite,
        1,
        move 6s infinite linear
      );
    }

    &::after {
      @include weatherElement(
        10px,
        10px,
        30px,
        10px,
        10px,
        $lightGray,
        1px 1px 30px $gray,
        1,
        move 4s infinite linear
      );
    }

    div {
      @include weatherParticle(
        2px,
        7px,
        $dimWhite,
        0px,
        1px 1px 30px $dimWhite,
        0,
        fall 3s infinite linear
      );
    }
  }

  &_thunder {
    @each$name, $value in $thunder {
      #{$name}: $value;
    }

    &::before {
      @include weatherElement(
        5px,
        -5px,
        30px,
        10px,
        10px,
        $lightGray,
        1px 1px 30px $lightGray,
        1,
        (move 6s infinite linear, flash 2s infinite)
      );
    }

    &::after {
      @include weatherElement(
        10px,
        10px,
        30px,
        10px,
        10px,
        $lightGray,
        1px 1px 30px $lightGray,
        1,
        (move 4s infinite linear, flash 1s infinite linear)
      );
    }

    div {
      @include weatherParticle(
        2px,
        7px,
        $dimWhite,
        0px,
        1px 1px 30px $dimWhite,
        0,
        fall 3s infinite linear
      );
    }
  }

  &_snow {
    @each $name, $value in $snow {
      #{$name}: $value;
    }

    &::before {
      @include weatherElement(
        5px,
        -5px,
        30px,
        10px,
        10px,
        $white,
        1px 1px 30px $dimWhite,
        1,
        move 6s infinite linear
      );
    }

    &::after {
      @include weatherElement(
        10px,
        10px,
        30px,
        10px,
        10px,
        $white,
        1px 1px 30px $dimWhite,
        1,
        move 4s infinite linear
      );
    }

    div {
      @include weatherParticle(
        5px,
        5px,
        $white,
        100%,
        1px 1px 30px $dimWhite,
        0,
        fall 4s infinite linear
      );
    }
  }

  &_smoke {
    @each $name, $value in $smoke {
      #{$name}: $value;
    }

    div {
      @include weatherParticle(
        20px,
        5px,
        $lightGray,
        30px,
        1px 1px 30px $dimWhite,
        0,
        slide 3s infinite linear
      );
    }

    @include particlesAnimation(10, 80, 80);
  }

  &_dust {
    @each$name, $value in $dust {
      #{$name}: $value;
    }

    div {
      @include weatherParticle(
        5px,
        5px,
        $brown,
        100%,
        1px 1px 30px $darkYellow,
        0,
        slide 3s infinite linear
      );
    }

    @include particlesAnimation(10, 80, 80);
  }

  &_mist {
    @each $name, $value in $mist {
      #{$name}: $value;
    }

    div {
      @include weatherParticle(
        30px,
        10px,
        $dimWhite,
        30px,
        1px 1px 30px $dimWhite,
        0,
        slide 3s infinite linear
      );
    }

    @include particlesAnimation(10, 80, 80);
  }
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes floating-around {
  0% {
    transform: translate(0) scale(1);
  }
  50% {
    transform: translateY(10px) translateX(10px) scale(1.2);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes move {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(10px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes fall {
  10% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
    transform: translate(-10px, 30px);
  }
  100% {
    transform: translate(-25px, 70px);
  }
}

@keyframes flash {
  48% {
    background-color: rgb(99, 99, 99);
  }
  50% {
    background-color: #fff;
  }
  55% {
    background-color: rgb(82, 82, 82);
  }
  57% {
    background-color: #fff;
  }
}

@keyframes slide {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(30px);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}
</style>
