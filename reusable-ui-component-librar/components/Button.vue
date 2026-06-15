<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading, 'btn--disabled': disabled }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn__spinner" />
    <span v-if="$slots.icon && !loading" class="btn__icon"><slot name="icon" /></span>
    <span class="btn__label"><slot /></span>
  </button>
</template>

<script setup lang="ts">
/**
 * @example
 * <Button variant="primary" @click="save">Save</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button variant="danger" :loading="deleting">Delete</Button>
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<style scoped>
.btn {
  display: inline-flex; align-items: center; gap: 6px; border: none; border-radius: 6px;
  font-weight: 500; cursor: pointer; transition: all 0.15s ease; font-family: inherit;
}
.btn--sm { padding: 4px 10px; font-size: 0.8rem; }
.btn--md { padding: 8px 16px; font-size: 0.875rem; }
.btn--lg { padding: 12px 24px; font-size: 1rem; }
.btn--primary { background: #6366f1; color: #fff; }
.btn--primary:hover:not(:disabled) { background: #4f46e5; }
.btn--secondary { background: #e2e8f0; color: #1e293b; }
.btn--secondary:hover:not(:disabled) { background: #cbd5e1; }
.btn--outline { background: transparent; color: #6366f1; border: 1px solid #6366f1; }
.btn--outline:hover:not(:disabled) { background: #eef2ff; }
.btn--ghost { background: transparent; color: #475569; }
.btn--ghost:hover:not(:disabled) { background: #f1f5f9; }
.btn--danger { background: #ef4444; color: #fff; }
.btn--danger:hover:not(:disabled) { background: #dc2626; }
.btn--disabled, .btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn--loading { pointer-events: none; }
.btn__spinner {
  width: 14px; height: 14px; border: 2px solid currentColor; border-top-color: transparent;
  border-radius: 50%; animation: spin 0.6s linear infinite;
}
.btn__icon { display: flex; align-items: center; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>