export class TodoTask {
  constructor(text, isLabelWrap, priorityColor, themeColor) {
    this.id = crypto?.randomUUID() ?? Date.now().toString()
    this.text = text
    this.date = this.#getDate()
    this.priorityColor = priorityColor
    this.themeColor = themeColor
    this.isChecked = false
    this.isPinned = false
    this.isLabelWrap = isLabelWrap
    this.animation = true
  }

  #getDate() {
    const date = new Date()
    const month = date.toLocaleString('en', { month: "short" })
    const weekday = date.toLocaleString('en', { weekday: "short" })
    const day = date.toLocaleString('en', { day: "2-digit" })
    const time = date.toLocaleString('ru-RU', { hour: "2-digit", minute: "2-digit" })

    return `${weekday}, ${month} ${day} at ${time}`
  }
}