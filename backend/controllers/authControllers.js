const userModel = require('../models/userModel');

const signup = (req, res) => {
  const {name, username, email, password} = req.body;
  if(
    !name.trim() ||
    !username.trim() ||
    !email.trim() ||
    !password.trim()
  ){
    return res.status(400).json({
      message : 'All the fields are required to be filled'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // check email
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      message: 'email must not contain special characters'
    });
  }

  const specialCharacters = "@#$%^&*!~`- _+=()[]{}:;\"'<>,.?/\\|";
  //check username
  const containsSpecialCharacters = [...specialCharacters].some(char =>
    username.includes(char)
  );

  if (containsSpecialCharacters) {
    return res.status(400).json({
      message: 'username must not contain special characters'
    });
  }
  // Check name
  const nameContainsSpecialCharacters = [...specialCharacters].some(char =>
    name.includes(char)
  );

  if (nameContainsSpecialCharacters) {
    return res.status(400).json({
      message: 'name must not contain special characters'
    });
  }
  
  userModel.insertUser(
    name,
    username,
    email,
    password,
    (err, result) => {
      if(err){
        console.log(`Insertion error\n${err}`);
        return res.status(500).json({
          message: 'Unexpected sever error'
        });
      }
      console.log(`new user created with ID:${result.insertId}`);
      return res.status(201).json({
        message: 'User created successfully!'
      });
    }
  );
};

module.exports = {
  signup,
};