<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Sign In</h1>
      <p class="subtitle">Welcome back. Enter your credentials to continue.</p>

      <div v-if="auth.error" class="alert alert-error">{{ auth.error }}</div>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="you@example.com"
            :class="{ invalid: errors.email }"
            @blur="validateEmail"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            :class="{ invalid: errors.password }"
            @blur="validatePassword"
          />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <button type="submit" class="btn-primary" :disabled="auth.loading">
          {{ auth.loading ? 'Signing in…' : 'Sign In' }}
        </button>
      </form>

      <p class="auth-link">
        Don't have an account? <router-link to="/signup">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })

function validateEmail() {
  errors.email = ''
  if (!form.email) { errors.email = 'Email is required'; return false }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Enter a valid email'; return false }
  return true
}

function validatePassword() {
  errors.password = ''
  if (!form.password) { errors.password = 'Password is required'; return false }
  if (form.password.length < 6) { errors.password = 'Must be at least 6 characters'; return false }
  return true
}

async function handleLogin() {
  auth.clearError()
  const valid = validateEmail() & validatePassword()
  if (!valid) return

  const ok = await auth.login(form.email, form.password)
  if (ok) router.push({ name: 'dashboard' })
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  padding: 1rem;
}
.auth-card {
  background: #fff;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
h1 { margin: 0 0 0.25rem; font-size: 1.5rem; color: #111827; }
.subtitle { color: #6b7280; margin: 0 0 1.5rem; font-size: 0.875rem; }
.alert-error {
  background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
  border-radius: 8px; padding: 0.625rem 0.875rem; margin-bottom: 1rem; font-size: 0.875rem;
}
.field { margin-bottom: 1rem; }
.field label { display: block; font-size: 0.8125rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem; }
.field input {
  width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #d1d5db; border-radius: 8px;
  font-size: 0.875rem; outline: none; transition: border-color 0.15s; box-sizing: border-box;
}
.field input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); }
.field input.invalid { border-color: #dc2626; }
.field-error { color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem; display: block; }
.btn-primary {
  width: 100%; padding: 0.7rem; background: #6366f1; color: #fff; border: none;
  border-radius: 8px; font-size: 0.9375rem; font-weight: 600; cursor: pointer;
  transition: background 0.15s; margin-top: 0.5rem;
}
.btn-primary:hover { background: #4f46e5; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-link { text-align: center; margin-top: 1.25rem; font-size: 0.8125rem; color: #6b7280; }
.auth-link a { color: #6366f1; text-decoration: none; font-weight: 600; }
</style>