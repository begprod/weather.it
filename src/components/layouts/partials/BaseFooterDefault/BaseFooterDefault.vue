<template>
  <footer class="footer">
    <p>
      Crafted with <span class="footer__heart">❤</span> by
      <a href="https://github.com/begprod" class="link" tabindex="-1">Andrej Aratov</a>
    </p>
    <p>
      <a
        class="link footer__link"
        href="https://github.com/begprod/weather.it#install-application-on-your-device"
        target="_blank"
        rel="noreferrer"
        tabindex="-1"
      >
        <span>Install app on device instructions</span>
        <ExternalLink class="icon icon_base" />
      </a>
    </p>
    <p data-test-id="app-version">v{{ version }}</p>
  </footer>
</template>

<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next';

interface IProps {
  version: string;
}

defineProps<IProps>();
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: clamp(4rem, 6.25vw, 8rem);
  padding-bottom: clamp(4rem, 6.25vw, 8rem);
  font-size: var(--typo-size-sm);
  color: var(--color-typo-primary);

  p {
    margin: 0;
  }
}

.footer__link {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.footer__heart {
  color: var(--color-typo-alert);
}
</style>
