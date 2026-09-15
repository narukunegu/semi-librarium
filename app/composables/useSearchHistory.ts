import { ref } from 'vue'

const STORAGE_KEY = 'semi_librarium_search_history'
const DEFAULT_TAGS = ['Kinh Thánh', 'Thần học', 'Triết học', 'Giáo luật', 'Lịch sử']
const MAX_HISTORY = 4

export const useSearchHistory = () => {
  const history = ref<string[]>([])

  // Load from localStorage on client side immediately
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          history.value = parsed
        }
      }
    } catch (e) {
      console.error('Failed to load search history', e)
    }
  }

  const saveToStorage = (items: string[]) => {
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (e) {
        console.error('Failed to save search history', e)
      }
    }
  }

  const addSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    // Remove if already exists, then add to front
    const filtered = history.value.filter(
      (item) => item.toLowerCase() !== trimmed.toLowerCase()
    )
    const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY)
    history.value = updated
    saveToStorage(updated)
  }

  const clearHistory = () => {
    history.value = []
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    history,
    defaultTags: DEFAULT_TAGS,
    addSearch,
    clearHistory,
  }
}
