<template>
  <div class="avatar" :class="[`avatar--${size}`, { 'avatar--bordered': bordered }]">
    <img v-if="src" :src="src" :alt="alt" @error="hasError = true" />
    <span v-if="!src || hasError" class="avatar__initials">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  name: '',
  size: 'md',
  bordered: false
})

const hasError = ref(false)

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  flex-shrink: 0;
}
.avatar--sm { width: 28px; height: 28px; font-size: 0.7rem; }
.avatar--md { width: 36px; height: 36px; font-size: 0.8rem; }
.avatar--lg { width: 48px; height: 48px; font-size: 1rem; }
.avatar--xl { width: 64px; height: 64px; font-size: 1.3rem; }
.avatar--bordered { border: 2px solid #e2e8f0; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar__initials { line-height: 1; }
</style>