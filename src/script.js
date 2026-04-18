class Todo {
  selectors = {
    root: '[data-js-todo]',
    newTaskForm: '[data-js-todo-new-task-form]',
    newTaskInput: '[data-js-todo-new-task-input]',
    searchTaskForm: '[data-js-todo-search-task-form]',
    searchTaskInput: '[data-js-todo-search-task-input]',
    totalTasks: '[data-js-todo-total-tasks]',
    deleteAllButton: '[data-js-todo-delete-all-button]',
    list: '[data-js-todo-list]',
    item: '[data-js-todo-item]',
    itemCheckbox: '[data-js-todo-item-checkbox]',
    itemLabel: '[data-js-todo-item-label]',
    itemUnwrapButton: '[data-js-todo-item-unwrap-button]',
    itemDeleteButton: '[data-js-todo-item-delete-button]',
    itemData: '[data-js-todo-item-data]',
    emptyMessage: '[data-js-todo-empty-message]',
  }

  stateClasses = {
    isVisible: 'is-visible',
    isDisappearing: 'is-disappearing',
    isOpening: 'is-opening',
  }

  itemLabelInitialHeight = '24px'

  localStorageKey = 'todo-items'

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.newTaskFormElement = this.rootElement.querySelector(this.selectors.newTaskForm)
    this.newTaskInputElement = this.rootElement.querySelector(this.selectors.newTaskInput)
    this.searchTaskFormElement = this.rootElement.querySelector(this.selectors.searchTaskForm)
    this.searchTaskInputElement = this.rootElement.querySelector(this.selectors.searchTaskInput)
    this.totalTasksElement = this.rootElement.querySelector(this.selectors.totalTasks)
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.deleteAllButton)
    this.listElement = this.rootElement.querySelector(this.selectors.list)
    this.emptyMessageElement = this.rootElement.querySelector(this.selectors.emptyMessage)

    this.state = {
      items: this.getItemsFromLocalStorage(),
      filteredItems: null,
      searchQuery: '',
    }

    this.bindEvents()
    this.updateItems()
  }

  getItemsFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey)

    if (!rawData) return []

    try {
      const parsedData = JSON.parse(rawData)

      return Array.isArray(parsedData) ? parsedData : []
    } catch {
      console.error('todo items parse error')
      return []
    }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.items))
  }

  render() {
    const items = this.state.filteredItems ?? this.state.items

    console.log(this.state)

    this.listElement.innerHTML = items.map(({ id, title, isChecked }) => `
      <li class="todo__item" data-js-todo-item>
        <input
          type="checkbox"
          id="${id}"
          class="todo__item-checkbox"
          data-js-todo-item-checkbox
          ${isChecked ? 'checked' : ''}
        />
        <label
          for="${id}"
          class="todo__item-label"
          data-js-todo-item-label
        >
          ${title}
        </label>
        <span class="todo__item-data" data-js-todo-item-data>
          Дата
        </span>
        <button 
          class="todo__item-unwrap-button" 
          type="button"
          data-js-todo-item-unwrap-button
        >
          <?xml version="1.0" encoding="utf-8"?>
          <svg
            width="20px" height="20px" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 
              16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 
              10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 
              9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 
              9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"
            />
          </svg>
        </button>
        <button
          class="todo__item-delete-button"
          type="button"
          data-js-todo-item-delete-button
        >
          <svg height="18px" width="18px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
               viewBox="-150 -150 800 800"  xml:space="preserve">
            <g>
              <path class="st0" fill="#fff" d="M308.229,51.853C308,23.183,284.751,0.017,256,0c-28.734,0.017-52,23.183-52.228,51.853
                c-63.821,9.2-109.796,33.323-109.796,49.845v16.718c0,20.784,72.538,37.625,162.024,37.625c89.486,0,162.024-16.841,162.024-37.625
                v-16.718C418.024,85.176,372.049,61.053,308.229,51.853z M256,48.065c-6.245,0-12.376,0.196-18.433,0.498
                c0.735-3.715,2.547-6.996,5.144-9.616c3.445-3.437,8.049-5.494,13.289-5.51c5.257,0.017,9.845,2.073,13.306,5.51
                c2.595,2.62,4.408,5.902,5.135,9.616C268.384,48.261,262.245,48.065,256,48.065z"/>
              <path class="st0" fill="#fff" d="M256,178.335c-89.486,0-162.024-16.841-162.024-37.625l18.53,316.253C112.506,478.506,167.233,512,256,512
                c88.767,0,143.51-33.494,143.51-55.037l18.514-316.253C418.024,161.494,345.486,178.335,256,178.335z M158.588,421.682
                l-6.661-195.134c4.465,1.02,9.249,1.878,14.269,2.743l6.752,197.878C167.763,425.436,162.988,423.567,158.588,421.682z
                 M217.176,436.98l-3.609-202.278c4.637,0.318,9.339,0.629,14.123,0.784l3.608,202.98C226.433,438.074,221.722,437.6,217.176,436.98
                z M294.824,436.98c-4.547,0.62-9.339,1.094-14.196,1.486l3.608-202.98c4.784-0.155,9.494-0.466,14.123-0.784L294.824,436.98z
                 M353.412,421.682c-4.392,1.886-9.175,3.755-14.351,5.486l6.744-197.878c5.02-0.865,9.803-1.796,14.277-2.743L353.412,421.682z"/>
            </g>
          </svg>
        </button>
      </li>
    `).join('')
  }

  displayTotalTasks() {
    this.totalTasksElement.textContent = this.state.items?.length
  }

  toggleDeleteAllButtonState() {
    this.deleteAllButtonElement.classList.toggle(
      this.stateClasses.isVisible,
      this.state.items?.length > 0
    )
  }

  manageInfo() {
    const areItemsEmpty = this.state.items?.length === 0
    const areFilteredItemsEmpty = this.state.filteredItems?.length === 0

    this.emptyMessageElement.textContent = areItemsEmpty ? 'There are no tasks yet' :
      areFilteredItemsEmpty ? 'Tasks not found' : ''
  }

  updateItems() {
    this.render()
    this.displayTotalTasks()
    this.toggleDeleteAllButtonState()
    this.manageInfo()
  }

  // getItemDate() {
  //   const date = new Date()
  // }

  addItem(title) {
    this.state.items.push({
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      // date: ,
      isChecked: false,
    })
    this.updateItems()
    this.saveItemsToLocalStorage()
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter(item => item.id !== id)

    if (this.state.filteredItems) {
      this.state.filteredItems = this.state.filteredItems.filter(item => item.id !== id)
    }
    this.updateItems()
    this.saveItemsToLocalStorage()
  }

  toggleCheckboxState(id) {
    const toggleState = (items) => {
      if (!items) return null

      items = items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isChecked: !item.isChecked,
          }
        }

        return item
      })

      return items
    }

    this.state.items = toggleState(this.state.items)
    this.state.filteredItems = toggleState(this.state.filteredItems)
    this.saveItemsToLocalStorage()
  }

  // animateLabelHeight() {
  //
  // }

  filter(searchQuery) {
    const queryFormatted = searchQuery.toLowerCase()

    this.state.searchQuery = queryFormatted

    this.state.filteredItems = this.state.items.filter(item => {
      const titleFormatted = item.title.toLowerCase()

      if (titleFormatted.includes(queryFormatted)) {
        return item
      }
    })
    this.updateItems()
    this.saveItemsToLocalStorage()
  }

  resetFilter() {
    this.state.filteredItems = null
    this.state.searchQuery = ''
    this.updateItems()
    this.saveItemsToLocalStorage()
  }

  onNewTaskFormSubmit = (event) => {
    event.preventDefault()

    if (this.newTaskInputElement.value.trim().length > 0) {
      this.addItem(this.newTaskInputElement.value)
      this.newTaskInputElement.value = ''
      this.newTaskInputElement.focus()
    }
  }

  onSearchTaskFormSubmit = (event) => {
    event.preventDefault()
  }

  onSearchTaskInput = ({ target }) => {
    const value = target.value

    value.length > 0 ? this.filter(value) : this.resetFilter()
  }

  onDeleteItemButtonClick = ({ target }) => {
    const isItemDeleteButton = target.matches(this.selectors.itemDeleteButton)
    const item = target.closest(this.selectors.item)
    const itemCheckbox = item.querySelector(this.selectors.itemCheckbox)

    if (isItemDeleteButton) {
      item.classList.add(this.stateClasses.isDisappearing)

      setTimeout(() => {
        this.deleteItem(itemCheckbox.id)
      }, 400)
    }
  }

  onItemCheckboxChange = ({ target }) => {
    const isItemCheckbox = target.matches(this.selectors.itemCheckbox)
    const item = target.closest(this.selectors.item)
    const itemCheckbox = item.querySelector(this.selectors.itemCheckbox)
    // const itemLabel = item.querySelector(this.selectors.itemLabel)

    if (isItemCheckbox) {
      this.toggleCheckboxState(itemCheckbox.id)
    }

    // if (!itemCheckbox.checked) {
    //   itemLabel.classList.remove(this.stateClasses.isLineThrow)
    // } else {
    //   setTimeout(() => {
    //     itemLabel.classList.add(this.stateClasses.isLineThrow)
    //   }, 450)
    // }
  }

  onUnwrapButtonClick = ({ target }) => {
    if (target.matches(this.selectors.itemUnwrapButton)) {
      const item = target.closest(this.selectors.item)
      const itemLabel = item.querySelector(this.selectors.itemLabel)
      const itemUnwrapButton = item.querySelector(this.selectors.itemUnwrapButton)

      itemLabel.classList.toggle(this.stateClasses.isOpening)

      if (itemLabel.classList.contains(this.stateClasses.isOpening)) {
        itemLabel.style.height = (itemLabel.scrollHeight + 'px')
      } else {
        itemLabel.style.height = this.itemLabelInitialHeight
      }

      // if (getComputedStyle(itemLabel).height >= '24px') {
      //   itemUnwrapButton.style.display = 'none'
      // }
    }
  }


  onDeleteAllButtonClick = () => {
    this.state.items = []
    this.resetFilter()
    this.updateItems()
    this.saveItemsToLocalStorage()
  }

  bindEvents() {
    this.newTaskFormElement.addEventListener('submit', this.onNewTaskFormSubmit)
    this.searchTaskFormElement.addEventListener('submit', this.onSearchTaskFormSubmit)
    this.searchTaskInputElement.addEventListener('input', this.onSearchTaskInput)
    this.listElement.addEventListener('change', this.onItemCheckboxChange)
    this.listElement.addEventListener('click', this.onUnwrapButtonClick)
    this.listElement.addEventListener('click', this.onDeleteItemButtonClick)
    this.deleteAllButtonElement.addEventListener('click', this.onDeleteAllButtonClick)
  }
}

new Todo()