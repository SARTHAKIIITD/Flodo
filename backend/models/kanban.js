class Kanban{
  constructor(name, userId, status = 'todo', id = null){
    this.name = name,
    this.userId = userId,
    this.status = status,
    this.id = id
  }
}

module.exports = Kanban;