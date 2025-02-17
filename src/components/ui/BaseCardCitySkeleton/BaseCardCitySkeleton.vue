<template>
  <div class="skeleton-card" data-test-id="skeleton-card-city">
    <div class="skeleton-card__inner">
      <div class="skeleton-card__column animate-pulse">
        <div class="skeleton-card__line skeleton-card__line_md" />
        <div class="skeleton-card__line skeleton-card__line_sm" />
      </div>
      <div class="skeleton-card__row animate-pulse">
        <div class="skeleton-card__line_square"></div>
      </div>
      <div class="skeleton-card__column animate-pulse">
        <div class="skeleton-card__line skeleton-card__line_md" />
        <div class="skeleton-card__line skeleton-card__line_md" />
        <div class="skeleton-card__line skeleton-card__line_md" />
      </div>
      <div class="skeleton-card__column animate-pulse">
        <div class="skeleton-card__line_square"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: clamp(1.25rem, 3.13vw, 2.5rem);
  background: var(--gray-400);
  background-color: #a5aab0;
  border-radius: 1.25rem;
  overflow: hidden;
}

.skeleton-card__inner {
  position: relative;
  z-index: 30;
}

.skeleton-card__row,
.skeleton-card__column {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skeleton-card__column {
  flex-direction: column;
}

.skeleton-card__line {
  border-radius: 0.25rem;
  background-color: var(--gray-300);
}

.skeleton-card__line_md {
  width: 50%;
  height: 1.25rem;
}

.skeleton-card__line_sm {
  width: 25%;
  height: 0.5rem;
}

.skeleton-card__line_square {
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.75rem;
  background-color: var(--gray-300);
}
</style>
