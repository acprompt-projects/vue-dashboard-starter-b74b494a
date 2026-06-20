<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="closeOnOverlay && $emit('update:modelValue', false)">
        <div class="modal" :class="[`modal--${size}`]" role="dialog" aria-modal="true">
          <div v-if="title || $slots.header" class="modal__header">
            <slot name="header"><h3 class="modal__title">{{ title }}</h3></slot>
            <button class="modal__close" aria-label="Close" @click="$emit('update:modelValue', false)">&times;</button>
          </div>
          <div class="modal__body"><slot /></div>
          <div v-if="$slots.footer" class="modal__footer"><slot name="footer" /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * @example
 * <Modal v-model="showDialog" title="Confirm Action" size="md">
 *   <p>Are you sure?</p>
 *   <template #footer>
 *     <Button variant="ghost" @click="showDialog = false">Cancel</Button>
 *     <Button variant="primary" @click="confirm">Confirm</Button>
 *   </template>
 * </Modal>
 */
import { watch, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closeOnOverlay: true
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) emit('update:modelValue', false)
}

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

if (typeof window !== 'undefined') window.addEventListener('keydown', handleKeydown)
onUnmounted(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex;
  align-items: center; justify-content: center; z-index: 1000; padding: 16px;
}
.modal {
  background: #fff; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  max-height: 90vh; display: flex; flex-direction: column; width: 100%;
}
.modal--sm { max-width: 380px; }
.modal--md { max-width: 520px; }
.modal--lg { max-width: 720px; }
.modal--xl { max-width: 960px; }
.modal__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #e5e7eb;
}
.modal__title { margin: 0; font-size: 1.05rem; font-weight: 600; color: #111827; }
.modal__close {
  background: none; border: none; font-size: 1.4rem; cursor: pointer;
  color: #6b7280; padding: 0 4px; line-height: 1;
}
.modal__close:hover { color: #111827; }
.modal__body { padding: 20px; overflow-y: auto; flex: 1; }
.modal__footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 20px; border-top: 1px solid #e5e7eb;
}
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-active .modal, .modal-leave-active .modal { transition: transform 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal { transform: scale(0.95) translateY(10px); }
.modal-leave-to .modal { transform: scale(0.95) translateY(10px); }
</style>