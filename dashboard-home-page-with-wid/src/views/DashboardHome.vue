<template>
  <div class="dashboard-home">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <button class="refresh-btn" :disabled="loading" @click="refresh">
        {{ loading ? 'Loading…' : '↻ Refresh' }}
      </button>
    </header>

    <p v-if="error" class="error-msg">Error: {{ error }}</p>

    <section class="stat-grid">
      <div
        v-for="(stat, key) in stats"
        :key="key"
        class="stat-card"
        :class="{ 'stat-card--negative': stat.change < 0 }"
      >
        <div class="stat-card__icon">{{ stat.icon }}</div>
        <div class="stat-card__body">
          <span class="stat-card__label">{{ stat.label }}</span>
          <span class="stat-card__value">
            {{ stat.prefix }}{{ stat.value.toLocaleString() }}{{ stat.suffix || '' }}
          </span>
          <span class="stat-card__change">
            {{ stat.change > 0 ? '▲' : '▼' }} {{ Math.abs(stat.change) }}%
          </span>
        </div>
      </div>
    </section>

    <div class="dashboard-grid">
      <section class="chart-area">
        <h2>Revenue Overview</h2>
        <div class="chart-placeholder">
          <span class="chart-placeholder__icon">📊</span>
          <p>Chart component mounts here</p>
        </div>
      </section>

      <section class="activity-area">
        <h2>Recent Activity</h2>
        <ul class="activity-list" v-if="recentActivity.length">
          <li v-for="item in recentActivity" :key="item.id" class="activity-item">
            <span class="activity-item__badge" :class="'activity-item__badge--' + item.type">
              {{ item.type[0].toUpperCase() }}
            </span>
            <div class="activity-item__content">
              <strong>{{ item.user }}</strong> {{ item.action }}
            </div>
            <span class="activity-item__time">{{ item.time }}</span>
          </li>
        </ul>
        <p v-else class="empty-msg">No recent activity</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'

const { stats, recentActivity, loading, error, fetchStats, fetchActivity, refresh } = useDashboardData()

onMounted(() => {
  fetchStats()
  fetchActivity()
})
</script>

<style scoped>
.dashboard-home { padding: 24px; max-width: 1200px; margin: 0 auto; }
.dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.dashboard-header h1 { margin: 0; font-size: 1.75rem; color: #1e293b; }
.refresh-btn { padding: 8px 16px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.875rem; }
.refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.error-msg { color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 16px; }

.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; display: flex; align-items: center; gap: 16px; transition: box-shadow 0.2s; }
.stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.stat-card--negative .stat-card__change { color: #dc2626; }
.stat-card__icon { font-size: 2rem; }
.stat-card__body { display: flex; flex-direction: column; gap: 2px; }
.stat-card__label { font-size: 0.8125rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-card__value { font-size: 1.5rem; font-weight: 700; color: #0f172a; }
.stat-card__change { font-size: 0.8125rem; font-weight: 600; color: #16a34a; }

.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 768px) { .dashboard-grid { grid-template-columns: 1fr; } }

.chart-area, .activity-area { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; }
.chart-area h2, .activity-area h2 { margin: 0 0 16px; font-size: 1.125rem; color: #1e293b; }
.chart-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 260px; background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 8px; color: #94a3b8; }
.chart-placeholder__icon { font-size: 3rem; margin-bottom: 8px; }

.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.activity-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 8px; background: #f8fafc; }
.activity-item__badge { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #fff; flex-shrink: 0; }
.activity-item__badge--order { background: #3b82f6; }
.activity-item__badge--upgrade { background: #8b5cf6; }
.activity-item__badge--support { background: #f59e0b; }
.activity-item__badge--signup { background: #10b981; }
.activity-item__content { flex: 1; font-size: 0.875rem; color: #334155; }
.activity-item__time { font-size: 0.75rem; color: #94a3b8; white-space: nowrap; }
.empty-msg { color: #94a3b8; font-style: italic; }
</style>