export class TodoPresenter {
  constructor(todoModel, todoUi) {
    this.todoModel = todoModel
    this.todoUi = todoUi
    this.todoUi.setTodoPresenter(this)

    this.state = {
      ...this.todoModel.getState(),
      filteredItems: null,
      searchQuery: '',
    }

    this.infoMessages = {
      all: `
      <div class="info">
        <?xml version="1.0" encoding="utf-8"?>
        <svg class="info__image ${this.state.themeColor}" 
         width="50px" height="50px" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path class="info__image ${this.state.themeColor}" 
          data-theme d="M11 6L21 6.00072M11 12L21 12.0007M11 18L21 18.0007M3 
            11.9444L4.53846 13.5L8 10M3 5.94444L4.53846 7.5L8 4M4.5 18H4.51M5 18C5 
            18.2761 4.77614 18.5 4.5 18.5C4.22386 18.5 4 18.2761 4 18C4 17.7239 
            4.22386 17.5 4.5 17.5C4.77614 17.5 5 17.7239 5 18Z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h2 class="info__title">
          No tasks yet!
        </h2>
        <p class="info__text">
          Add your first task to get started
        </p>
      </div>
    `,
      active: `
      <div class="info">
        <?xml version="1.0" encoding="iso-8859-1"?>
        <!DOCTYPE>
        <svg 
        class="info__image ${this.state.themeColor}" 
        data-theme fill="currentColor" 
        version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
        width="50px" height="50px" 
        viewBox="0 0 342.508 342.508"
        xml:space="preserve">
        <g>
        <path class="info__image ${this.state.themeColor}" 
          data-theme d="M171.254,0C76.837,0,0.003,76.819,0.003,171.248c0,94.428,76.829,171.26,171.251,171.26
        \t\tc94.438,0,171.251-76.826,171.251-171.26C342.505,76.819,265.697,0,171.254,0z M245.371,136.161l-89.69,89.69
        \t\tc-2.693,2.69-6.242,4.048-9.758,4.048c-3.543,0-7.059-1.357-9.761-4.048l-39.007-39.007c-5.393-5.398-5.393-14.129,0-19.521
        \t\tc5.392-5.392,14.123-5.392,19.516,0l29.252,29.262l79.944-79.948c5.381-5.386,14.111-5.386,19.504,0
        \t\tC250.764,122.038,250.764,130.769,245.371,136.161z"/>
        </g>
        </svg>
        <h2 class="info__title">
          All tasks completed!
        </h2>
        <p class="info__text">
          Well done! You're doing great
        </p>
      </div>
    `,
      completed: `
      <div class="info">
        <?xml version="1.0" encoding="utf-8"?>
        <svg 
        class="info__image ${this.state.themeColor}" 
        data-theme 
        fill="currentColor" 
        width="50px" height="50px" 
        viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path class="info__image ${this.state.themeColor}" data-theme 
            d="M1377.882 1344 903.53 988.235v-592.94h112.942v536.47l429.176 
            321.77-67.765 90.465ZM960 0C430.645 0 0 430.645 0 960c0 529.242 430.645 
            960 960 960 529.242 0 960-430.758 960-960 0-529.355-430.758-960-960-960Z" 
            fill-rule="evenodd"
            />
        </svg>
        <h2 class="info__title">
          Not completed tasks
        </h2>
        <p class="info__text">
          Complete tasks to see them here 
        </p>
      </div>
    `,
      filtered: `
      <div class="info">
            <?xml version="1.0" encoding="utf-8"?>
      <svg class="info__image ${this.state.themeColor}" data-theme  fill="currentColor" width="50px" height="50px" viewBox="0 0 36 36"
           version="1.1" preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title>sad-face-solid</title>
        <path  d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm9,12.28a1.8,1.8,0,1,1-1.8-1.8A1.8,1.8,0,0,1,27,14.28Zm-15.55,1.8a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,11.41,16.08Zm14,7.53a1,1,0,0,1-1.6,1.2,7,7,0,0,0-11.31.13,1,1,0,1,1-1.63-1.16,9,9,0,0,1,14.54-.17Z"
              class="clr-i-solid clr-i-solid-path-1 info__image ${this.state.themeColor}" data-theme></path>
        <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
      </svg>
        <h2 class="info__title">
          Tasks not found (-_-)
        </h2>
      </div>
    `,
    }
  }

  updateStateAndRender() {
    this.state = {
      ...this.state,
      ...this.todoModel.getState(),
    }

    if (!this.isSearchQueryEmpty()) {
      this.filter()
    }

    this.render()
  }

  updateState() {
    this.state = {
      ...this.state,
      ...this.todoModel.getState(),
    }
  }

  sortItemsByCategories(currentTab) {
    switch (currentTab) {
      case 'active':
        return this.state.items.filter(item => !item.isChecked)
      case 'completed':
        return this.state.items.filter(item => item.isChecked)
      default:
        return this.state.items
    }
  }

  displayTotalTasks() {
    this.todoUi.displayTotalTasks(this.state.items)
  }

  displayDeleteAllButton() {
    const areItemsEmpty = this.state.items?.length === 0

    this.todoUi.displayDeleteAllButton(areItemsEmpty)
  }

  getInfoMessage(currentTab) {
    const sortedItems = this.sortItemsByCategories(currentTab)?.length === 0
    const areFilteredItemsEmpty = this.state.filteredItems?.length === 0

    return sortedItems
      ? this.infoMessages[currentTab]
      : areFilteredItemsEmpty
        ? this.infoMessages.filtered
        : ''
  }

  getPriorityColor() {
    return this.state.priorityColor
  }

  getColorTheme() {
    return this.state.themeColor
  }

  getCurrentTab() {
    return this.state.currentTab
  }

  isSearchQueryEmpty() {
    return this.state.searchQuery.trim().length === 0
  }

  // toggleFilteredCheckedState(id) {
  //   if (this.isSearchQueryEmpty()) return
  //
  //   this.state.filteredItems =
  //     this.sortItemsByCategories(this.state.currentTab).map(item => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         isChecked: !item.isChecked,
  //       }
  //     }
  //
  //     return item
  //   })
  // }

  render() {
    let items =
      this.state.filteredItems ?? this.sortItemsByCategories(this.state.currentTab)

    const reversedItems = [...items].reverse()

    const infoMessage = this.getInfoMessage(this.state.currentTab)

    this.todoUi.manageInfo(infoMessage)
    this.todoUi.render(reversedItems)
    this.displayDeleteAllButton()
    this.displayTotalTasks()
  }

  filter() {
    const isSearchQueryEmpty = this.state.searchQuery.trim().length === 0
    const sortedItems = this.sortItemsByCategories(this.state.currentTab)

    if (!isSearchQueryEmpty) {
      const queryFormatted = this.state.searchQuery.trim().toLowerCase()

      this.state.filteredItems = sortedItems.filter(({text}) => {
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

  resetItemsState() {
    this.todoModel.resetItemsState()
    this.state.filteredItems = null
    this.updateStateAndRender()
  }

  onNewTaskFormSubmit = (text, isLabelWrap) => {
    if (this.todoUi.isNewTaskInputEmpty()) {
      return
    }

    this.todoModel.addItem(
      text,
      isLabelWrap,
      this.state.priorityColor,
      this.state.themeColor
    )
    this.updateStateAndRender()
    // this.filter()
    // this.render()
    this.todoModel.toggleAnimateState()
  }

  onSearchTaskInput = (searchQuery) => {
    this.state.searchQuery = searchQuery
    this.filter()
    this.render()
  }

  onDeleteItemButtonClick = (id) => {
    this.todoModel.deleteItem(id)
    this.updateStateAndRender()
  }

  onItemCheckboxChange = (id) => {
    this.todoModel.toggleCheckedState(id)
    this.updateStateAndRender()
  }

  onTogglePriorityState = (priorityColor) => {
    this.todoModel.togglePriorityState(priorityColor)
    this.updateStateAndRender()
  }

  onToggleColorTheme = (themeColor) => {
    this.todoModel.toggleColorTheme(themeColor)
    // this.state.items.length === 0 ?
    //   this.updateState() :
      this.updateStateAndRender()
  }

  onDeleteAllButtonClick = () => {
    this.resetItemsState()
  }

  onTabClick = (currentTab) => {
    this.todoModel.toggleCurrentTabState(currentTab)
    this.updateStateAndRender()
  }
}