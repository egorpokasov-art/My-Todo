export class TodoUi {
  itemLabelInitialHeight = '26px'

  maxLabelTextContentLength = 30

  initialTab = 'all'

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
    priorityList: '[data-js-todo-priority-list]',
    priorityRadio: '[data-js-todo-priority-radio]',
    tabsList: '[data-js-todo-tabs-list]',
    tabsToggleButton: '[data-js-todo-tabs-toggle-button]',
  }

  stateClasses = {
    isVisible: 'is-visible',
    isDisappearing: 'is-disappearing',
    isOpening: 'is-opening',
    isHidden: 'is-hidden',
    isActive: 'is-active',
    isSwiping: 'is-swiping',
  }

  constructor() {
    this.todoPresenter = null
    this.rootElement = document.querySelector(this.selectors.root)
    this.newTaskFormElement = this.rootElement.querySelector(this.selectors.newTaskForm)
    this.newTaskInputElement = this.rootElement.querySelector(this.selectors.newTaskInput)
    this.searchTaskFormElement = this.rootElement.querySelector(this.selectors.searchTaskForm)
    this.searchTaskInputElement = this.rootElement.querySelector(this.selectors.searchTaskInput)
    this.totalTasksElement = this.rootElement.querySelector(this.selectors.totalTasks)
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.deleteAllButton)
    this.listElement = this.rootElement.querySelector(this.selectors.list)
    this.emptyMessageElement = this.rootElement.querySelector(this.selectors.emptyMessage)
    this.priorityListElement = this.rootElement.querySelector(this.selectors.priorityList)
    this.priorityRadiosElements = this.rootElement.querySelectorAll(this.selectors.priorityRadio)
    this.tabsListElement = this.rootElement.querySelector(this.selectors.tabsList)
    this.tabsToggleButtonElements = document.querySelectorAll(this.selectors.tabsToggleButton)

    this.bindEvents()
  }

  setTodoPresenter(todoPresenter) {
    this.todoPresenter = todoPresenter
  }

  showPriorityColorIsChecked() {
    const currentPriorityColor = this.todoPresenter.getPriorityColor()

    this.priorityRadiosElements.forEach(radio => {
      if (radio.id === currentPriorityColor) {
        radio.checked = true
      }
    })
  }

  render(items) {
    this.listElement.innerHTML = items.map(({
      id,
      text,
      date,
      isChecked,
      isLabelWrap,
      priorityColor
    }) => `
          <li class="todo__item" data-js-todo-item data-id="${id}">
            <div class="todo__item-priority-marker is-${priorityColor}"></div>
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
              ${text}
            </label>
            <span class="todo__item-data" data-js-todo-item-data>
              ${date}
            </span>
            <button 
              class="todo__item-unwrap-button ${isLabelWrap ? '' : 'is-hidden'}" 
              type="button"
              data-js-todo-item-unwrap-button 
              ${isLabelWrap ? '' : 'tabindex="-1"'}
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
            c2.595,2.62,4.408,5.902,5.135,9.616C268.384,48.261,262.245,48.065,256,48.065z"
            />
            <path class="st0" fill="#fff" d="M256,178.335c-89.486,0-162.024-16.841-162.024-37.625l18.53,316.253C112.506,478.506,167.233,512,256,512
            c88.767,0,143.51-33.494,143.51-55.037l18.514-316.253C418.024,161.494,345.486,178.335,256,178.335z M158.588,421.682
            l-6.661-195.134c4.465,1.02,9.249,1.878,14.269,2.743l6.752,197.878C167.763,425.436,162.988,423.567,158.588,421.682z
            M217.176,436.98l-3.609-202.278c4.637,0.318,9.339,0.629,14.123,0.784l3.608,202.98C226.433,438.074,221.722,437.6,217.176,436.98
            z M294.824,436.98c-4.547,0.62-9.339,1.094-14.196,1.486l3.608-202.98c4.784-0.155,9.494-0.466,14.123-0.784L294.824,436.98z
            M353.412,421.682c-4.392,1.886-9.175,3.755-14.351,5.486l6.744-197.878c5.02-0.865,9.803-1.796,14.277-2.743L353.412,421.682z"
            />
            </g>
            </svg>
            </button>
          </li>
    `).join('')
  }

  displayTotalTasks(items) {
    this.totalTasksElement.textContent = items?.length
  }

  displayDeleteAllButton(areItemsEmpty) {
    this.deleteAllButtonElement.classList.toggle(this.stateClasses.isVisible, !areItemsEmpty)
  }

  manageInfo(infoMessage) {
    this.emptyMessageElement.textContent = infoMessage
  }

  animateLabelHeight(unwrapButton) {
    const item = unwrapButton.closest(this.selectors.item)
    const itemLabel = item.querySelector(this.selectors.itemLabel)

    itemLabel.classList.toggle(this.stateClasses.isOpening)

    if (itemLabel.classList.contains(this.stateClasses.isOpening)) {
      itemLabel.style.height = (itemLabel.scrollHeight + 'px')
    } else {
      itemLabel.style.height = this.itemLabelInitialHeight
    }
  }

  isNewTaskInputEmpty() {
    return this.newTaskInputElement.value?.length === 0
  }

  resetFieldAfterSubmit() {
    this.newTaskInputElement.value = ''
    this.newTaskInputElement.focus()
  }

  onNewTaskFormSubmit = (event) => {
    event.preventDefault()

    const value = this.newTaskInputElement.value
    const textFormatted = value.trim()
    const isLabelWrap = value.length > this.maxLabelTextContentLength ?? null

    this.todoPresenter.onNewTaskFormSubmit(textFormatted, isLabelWrap)

    this.resetFieldAfterSubmit()
  }

  onSearchTaskFormSubmit = (event) => {
    event.preventDefault()
  }

  onSearchTaskInput = ({target}) => {
    const searchQuery = target.value

    this.todoPresenter.onSearchTaskInput(searchQuery)
  }

  onDeleteItemButtonClick = ({target}) => {
    const isItemDeleteButtonElement = target.matches(this.selectors.itemDeleteButton)

    if (isItemDeleteButtonElement) {
      const item = target.closest(this.selectors.item)

      setTimeout(() => {
        this.todoPresenter.onDeleteItemButtonClick(item.dataset.id)
      }, 400)

      item.classList.add(this.stateClasses.isDisappearing)
    }
  }

  onUnwrapButtonClick = ({ target }) => {
    const isUnwrapButtonElement = target.matches(this.selectors.itemUnwrapButton)

    if (isUnwrapButtonElement) {
      this.animateLabelHeight(target)
    }
  }

  onTogglePriorityState = ({target}) => {
    const isRadioElement = target.matches(this.selectors.priorityRadio)

    if (isRadioElement) {
      this.todoPresenter.onTogglePriorityState(target.id)
      target.classList.add()
    }
  }

  onItemCheckboxChange = ({target}) => {
    const isCheckboxElement = target.matches(this.selectors.itemCheckbox)
    const currentTab = this.todoPresenter.getCurrentTab()

    if (!isCheckboxElement) return

    if (currentTab !== this.initialTab) {
      const item = target.closest(this.selectors.item)

      item.classList.add(this.stateClasses.isSwiping)

      setTimeout(() => this.todoPresenter.onItemCheckboxChange(target.id), 400)
    } else {
      this.todoPresenter.onItemCheckboxChange(target.id)
    }
  }

  onDeleteAllButtonClick = () => {
    this.todoPresenter.onDeleteAllButtonClick()
  }

  onTabClick = ({target}) => {
    const tabButtonElement = target.matches(this.selectors.tabsToggleButton)

    if (tabButtonElement) {
      this.todoPresenter.onTabClick(target.dataset.id)

      this.tabsToggleButtonElements.forEach(button => {
        button.classList.remove(this.stateClasses.isActive)
      })

      target.classList.add(this.stateClasses.isActive)
    }
  }

  onTabActive = () => {
    const currentTab = this.todoPresenter.getCurrentTab()
    this.tabsToggleButtonElements.forEach(button => {
      button.classList.remove(this.stateClasses.isActive)

      if (button.dataset.id === currentTab) {
        this.todoPresenter.onTabClick(currentTab)
        button.classList.add(this.stateClasses.isActive)
      }
    })
  }

  bindEvents() {
    this.newTaskFormElement.addEventListener('submit', this.onNewTaskFormSubmit)
    this.searchTaskFormElement.addEventListener('submit', this.onSearchTaskFormSubmit)
    this.searchTaskInputElement.addEventListener('input', this.onSearchTaskInput)
    this.listElement.addEventListener('change', this.onItemCheckboxChange)
    this.listElement.addEventListener('click', this.onUnwrapButtonClick)
    this.listElement.addEventListener('click', this.onDeleteItemButtonClick)
    this.priorityListElement.addEventListener('click', this.onTogglePriorityState)
    this.deleteAllButtonElement.addEventListener('click', this.onDeleteAllButtonClick)
    this.tabsListElement.addEventListener('click', this.onTabClick)
    document.addEventListener('DOMContentLoaded', () => this.todoPresenter.render())
    document.addEventListener('DOMContentLoaded', () => this.showPriorityColorIsChecked())
    document.addEventListener('DOMContentLoaded', () => this.onTabActive())
  }
}