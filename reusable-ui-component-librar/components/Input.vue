<template>
  <div class="input-group" :class="{ 'input-group--error': !!error }">
    <label v-if="label" :for="inputId" class="input-group__label">{{ label }}</label>
    <div class="input-group__wrapper">
      <span v-if="$slots.prefix" class="input-group__prefix"><slot name="prefix" /></span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input-group__field"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <span v-if="$slots.suffix" class="input-group__suffix"><slot name="suffix" /></span>
    </div>
    <span v-if="error" class="input-group__error">{{ error }}</span>
    <span v-else-if="hint" class="input-group__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * @example
 * <Input v-model="email" label="Email" type="email" placeholder="you@example.com" />
 * <Input v-model="password" label="Password" type="password" :error="errors.password" />
 */
import { computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  hint: ''
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => `input-${props.label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 6)}`)
</script>

<style scoped>
.input-group { display: flex; flex-direction: column; gap: 4px; }
.input-group__label { font-size: 0.8rem; font-weight: 500; color: #374151; }
.input-group__wrapper {
  display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 6px;
  background: #fff; transition: border-color 0.15s;
}
.input-group__wrapper:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.input-group--error .input-group__wrapper { border-color: #ef4444; }
.input-group--error .input-group__wrapper:focus-within { box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
.input-group__field {
  flex: 1; border: none; outline: none; padding: 8px 12px; font-size: 0.875rem;
  font-family: inherit; background: transparent; color: #111827; min-width: 0;
}
.input-group__field::placeholder { color: #9ca3af; }
.input-group__field:disabled { opacity: 0.5; cursor: not-allowed; }
.input-group__prefix, .input-group__suffix { padding: 0 8px; color: #6b7280; display: flex; align-items: center; }
.input-group__error { font-size: 0.75rem; color: #ef4444; }
.input-group__hint { font-size: 0.75rem; color: #6b7280; }
</style>