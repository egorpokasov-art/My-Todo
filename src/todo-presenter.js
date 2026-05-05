export class TodoPresenter {
  infoMessages = {
    all: 'There are no tasks yet',
    active: 'There are no active tasks',
    completed: 'There are no completed tasks',
    filtered: 'Tasks not found',
  }

  constructor(todoModel, todoUi) {
    this.todoModel = todoModel
    this.todoUi = todoUi
    this.todoUi.setTodoPresenter(this)

    this.state = {
      ...this.todoModel.getState(),
      filteredItems: null,
      searchQuery: '',
    }
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

  filter(sortedItems) {
    const isSearchQueryEmpty = this.state.searchQuery.trim().length === 0

    if (!isSearchQueryEmpty) {
      const queryFormatted = this.state.searchQuery.trim().toLowerCase()

      this.state.filteredItems = sortedItems.filter(({text}) => {
        const textFormatted = text.trim().toLowerCase()

        return textFormatted.includes(queryFormatted)
      })

      // this.state.filteredItems?.length === 0 ?
      //   this.resetFilter() :
      //   this.state.filteredItems

      this.render()
    } else {
      this.resetFilter()
      this.render()
    }
  }

  resetFilter() {
    this.state.filteredItems = null
    this.state.searchQuery = ''
  }

  resetItemsState() {
    this.todoModel.resetItemsState()
    this.updateState()
    this.state.filteredItems = null
    this.render()
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
    this.updateState()
    this.render()
    this.todoModel.toggleAnimateState()
  }

  onSearchTaskInput = (searchQuery) => {
    this.state.searchQuery = searchQuery
    const sortedItems = this.sortItemsByCategories(this.state.currentTab)

    this.filter(sortedItems)
  }

  onDeleteItemButtonClick = (id) => {
    this.todoModel.deleteItem(id)
    this.updateState()
    this.filter(this.state.items)
    this.render()
  }

  onItemCheckboxChange = (id) => {
    this.todoModel.toggleCheckedState(id)
    this.updateState()

    this.render()
  }

  onTogglePriorityState = (priorityColor) => {
    this.todoModel.togglePriorityState(priorityColor)
    this.updateState()
  }

  onToggleColorTheme = (themeColor) => {
    this.todoModel.toggleColorTheme(themeColor)
    this.updateState()
  }

  onDeleteAllButtonClick = () => {
    this.resetItemsState()
  }

  onTabClick = (currentTab) => {
    this.todoModel.toggleCurrentTabState(currentTab)
    this.updateState()
    this.render()
  }
}