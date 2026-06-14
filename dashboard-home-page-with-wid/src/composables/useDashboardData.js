import { ref, readonly } from 'vue'

const cache = new Map()
const listeners = new Set()

function notify() {
  listeners.forEach(fn => fn())
}

export function useDashboardData() {
  const loading = ref(false)
  const error = ref(null)

  const stats = ref({
    revenue: { label: 'Revenue', value: 0, change: 0, prefix: '$', icon: '💰' },
    users: { label: 'Users', value: 0, change: 0, prefix: '', icon: '👥' },
    orders: { label: 'Orders', value: 0, change: 0, prefix: '', icon: '📦' },
    growth: { label: 'Growth', value: 0, change: 0, suffix: '%', icon: '📈' }
  })

  const recentActivity = ref([])

  async function fetchStats() {
    if (cache.has('stats')) {
      stats.value = cache.get('stats')
      return
    }
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 600))
      const data = {
        revenue: { label: 'Revenue', value: 84232, change: 12.5, prefix: '$', icon: '💰' },
        users: { label: 'Users', value: 14302, change: 8.3, prefix: '', icon: '👥' },
        orders: { label: 'Orders', value: 1248, change: -2.1, prefix: '', icon: '📦' },
        growth: { label: 'Growth', value: 23.4, change: 4.7, suffix: '%', icon: '📈' }
      }
      cache.set('stats', data)
      stats.value = data
    } catch (e) {
      error.value = e.message || 'Failed to fetch stats'
    } finally {
      loading.value = false
      notify()
    }
  }

  async function fetchActivity() {
    if (cache.has('activity')) {
      recentActivity.value = cache.get('activity')
      return
    }
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 400))
      const data = [
        { id: 1, user: 'Alice Martin', action: 'placed order #4521', time: '2 min ago', type: 'order' },
        { id: 2, user: 'Bob Chen', action: 'upgraded to Pro plan', time: '15 min ago', type: 'upgrade' },
        { id: 3, user: 'Carol Davis', action: 'submitted a support ticket', time: '32 min ago', type: 'support' },
        { id: 4, user: 'Dan Wilson', action: 'registered a new account', time: '1 hr ago', type: 'signup' },
        { id: 5, user: 'Eve Park', action: 'placed order #4519', time: '2 hr ago', type: 'order' }
      ]
      cache.set('activity', data)
      recentActivity.value = data
    } catch (e) {
      error.value = e.message || 'Failed to fetch activity'
    } finally {
      loading.value = false
      notify()
    }
  }

  async function refresh() {
    cache.clear()
    await Promise.all([fetchStats(), fetchActivity()])
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    stats,
    recentActivity,
    fetchStats,
    fetchActivity,
    refresh
  }
}