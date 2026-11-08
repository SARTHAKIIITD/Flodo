class User{
  constructor(name, username, email, password, role = 'user', id = null){
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role; 
  }
}

module.exports = User;