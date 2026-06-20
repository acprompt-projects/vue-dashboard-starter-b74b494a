import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(STORAGE_KEY) || '')
  const user = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    loading.value = true
    error.value = ''
    try {
      // Stub: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 600))
      if (!email || !password) throw new Error('Email and password are required')
      if (password.length < 6) throw new Error('Invalid credentials')

      const fakeToken = btoa(`${email}:${Date.now()}`)
      const fakeUser = { id: 1, name: email.split('@')[0], email }

      token.value = fakeToken
      user.value = fakeUser
      localStorage.setItem(STORAGE_KEY, fakeToken)
      localStorage.setItem(USER_KEY, JSON.stringify(fakeUser))
      return true
    } catch (e) {
      error.value = e.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function signup(name, email, password) {
    loading.value = true
    error.value = ''
    try {
      // Stub: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 600))
      if (!name || !email || !password) throw new Error('All fields are required')
      if (password.length < 8) throw new Error('Password must be at least 8 characters')

      const fakeToken = btoa(`${email}:${Date.now()}`)
      const fakeUser = { id: Date.now(), name, email }

      token.value = fakeToken
      user.value = fakeUser
      localStorage.setItem(STORAGE_KEY, fakeToken)
      localStorage.setItem(USER_KEY, JSON.stringify(fakeUser))
      return true
    } catch (e) {
      error.value = e.message || 'Signup failed'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(USER_KEY)
  }

  function clearError() {
    error.value = ''
  }

  return { token, user, loading, error, isAuthenticated, login, signup, logout, clearError }
})