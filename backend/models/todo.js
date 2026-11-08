class Todo{
  constructor(name, userId, isCompleted = false, id = null){
    this.name = name;
    this.userId = userId;
    this.isCompleted = isCompleted;
    this.id = id;
  }
}

module.exports = Todo;