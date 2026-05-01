import { TodoTask } from './todo-task.js'

export class TodoModel {
  storage = {
    items: {
      key: 'todo-items',
      validate: (parsedData) => Array.isArray(parsedData) ? parsedData : [],
      defaultValue: [],
      logError: () => console.error('todo items parse error'),
    },
    currentTab: {
      key: 'todo-current-tab-button',
      validate: (parsedData) => typeof parsedData === "string" ? parsedData : null,
      defaultValue: 'all',
      logError: () => console.error('todo current tab parse error'),
    },
    priorityColor: {
      key: 'todo-priority-color',
      validate: (parsedData) => typeof parsedData === "string" ? parsedData : null,
      defaultValue: 'green',
      logError: () => console.error('todo priority color parse error'),
    },
  }

  constructor() {
    this.state = {
      items: this.getFromLocalStorage(
        this.storage.items.key,
        this.storage.items
      ),
      currentTab: this.getFromLocalStorage(
        this.storage.currentTab.key,
        this.storage.currentTab
      ),
      priorityColor: this.getFromLocalStorage(
        this.storage.priorityColor.key,
        this.storage.priorityColor
      ),
    }
  }

  getFromLocalStorage(key, prop) {
    const rawData = localStorage.getItem(key)

    if (!rawData) {
      return prop.defaultValue
    }

    try {
      const parsedData = JSON.parse(rawData)

      return prop.validate(parsedData)
    } catch {
      prop.logError()
      return prop.defaultValue
    }
  }

  saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  addItem(text, isLabelWrap, priorityColor) {
    this.state.items.push(
      new TodoTask(text, isLabelWrap, priorityColor)
    )
    this.saveToLocalStorage(this.storage.items.key, this.state.items)
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter(item => item.id !== id)
    this.saveToLocalStorage(this.storage.items.key, this.state.items)
  }

  toggleCheckedState(id) {
    this.state.items = this.state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        }
      }

      return item
    })
    this.saveToLocalStorage(this.storage.items.key, this.state.items)
  }

  togglePinnedState(id) {
    this.state.items = this.state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isPinned: !item.isPinned,
        }
      }

      return item
    })
    this.saveToLocalStorage(this.storage.items.key, this.state.items)
  }

  togglePriorityState(priorityColor) {
    this.state.priorityColor = priorityColor
    this.saveToLocalStorage(this.storage.priorityColor.key, this.state.priorityColor)
  }

  toggleCurrentTabState = (currentTab) => {
    this.state.currentTab = currentTab
    this.saveToLocalStorage(this.storage.currentTab.key, this.state.currentTab)
  }

  getState() {
    return this.state
  }

  resetItemsState() {
    this.state.items = []
  }
}

// localStorageKeys = {
//   items: 'todo-items',
//   activeItems: 'todo-active-items',
//   completedItems: 'todo-completed-items',
//   currentTabButton: 'todo-current-tab-button',
//   priorityColor: 'todo-priority-color'
// }
