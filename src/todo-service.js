import { TodoTask } from './todo-task.js'

export class TodoService {
  localStorageKeys = {
    items: 'todo-items',
    activeItems: 'todo-active-items',
    completedItems: 'todo-completed-items',
    currentTabButton: 'todo-current-tab-button',
    priorityColor: 'todo-priority-color'
  }

  sortParams = {
    isChecked: true,
    isPinned: true,
  }

  infoMessages = {
    all: 'there are no tasks yet',
    active: 'there are no active tasks',
    completed: 'there are no completed tasks',
    filtered: 'tasks not found',
  }

  initialCurrentTab = 'all'

  initialPriorityColor = 'green'

  constructor() {
    this.state = {
      items: this.getDataFromLocalStorage(this.localStorageKeys.items),
      activeItems: this.getDataFromLocalStorage(this.localStorageKeys.activeItems),
      completedItems: this.getDataFromLocalStorage(this.localStorageKeys.completedItems),
      filteredItems: null,
      searchQuery: '',
      // currentTab: this.getDataFromLocalStorage(this.localStorageKeys.currentTabButton) ?? this.initialCurrentTab,
      priorityColor: this.getDataFromLocalStorage(this.localStorageKeys.priorityColor) ?? this.initialPriorityColor,
    }

    this.tabsCategoryItems = {
      all: this.state.items,
      active: this.state.activeItems,
      completed: this.state.completedItems,
    }
  }

  getDataFromLocalStorage(key) {
    const rawData = localStorage.getItem(key)

    if (!rawData) {
      return null
    }

    if (key.includes('items')) {
      try {
        const parsedData = JSON.parse(rawData)

        return Array.isArray(parsedData) ? parsedData : []
      } catch {
        console.error('items parse error')
        return []
      }
    } else {
      try {
        return JSON.parse(rawData)
      } catch {
        console.error('data parse error')
        return null
      }
    }
  }

  saveDataToLocalStorage(key, prop) {
    localStorage.setItem(key, JSON.stringify(prop))
  }

  addItem(text) {
    this.state.items.push(new TodoTask(text, this.state.priorityColor))
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter(item => item.id !== id)
  }

  toggleCheckedState(id) {
    this.state.items = this.state.items.map(item => {
      return {
        ...item,
        isChecked: !item.isChecked,
      }
    })
  }

  togglePinnedState(id) {
    this.state.items = this.state.items.map(item => {
      return {
        ...item,
        isPinned: !item.isPinned,
      }
    })
  }

  toddlePriorityColor(radioId) {
    this.state.priorityColor = radioId
  }

  sortItemsByCategories(tabsCategoryItems, sortParam) {
    tabsCategoryItems = this.state.items.filter(item => item[sortParam])
  }

  filter(tabsCategoryItems) {
    const isSearchQueryEmpty = this.state.searchQuery.trim().length === 0

    if (isSearchQueryEmpty) {
      const queryFormatted = this.state.searchQuery.trim().toLowerCase()

      this.state.filteredItems = tabsCategoryItems.filter(({ text }) => {
        const textFormatted = text.trim().toLowerCase()

        return textFormatted.includes(queryFormatted)
      })
    } else {
      this.resetFilter()
    }
  }

  resetFilter() {
    this.state.filteredItems = null
    this.state.searchQuery = ''
  }

  getInfoMessage(currentTab) {
    const areItemsEmpty = this.tabsCategoryItems[currentTab]?.length === 0
    const areFilteredItemsEmpty = this.state.filteredItems?.length === 0

    return areItemsEmpty
      ? this.infoMessages[currentTab]
      : areFilteredItemsEmpty
        ? this.infoMessages.filtered
        : ''

  }
}