const User = require('../models/user');
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
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
  // ================== HASHING PASSWORD ==============
  const hashedPassword = await bcrypt.hash(password, 12);

  // ==================================================
  const user = new User(
    name.trim(),
    username.trim(),
    email.trim(),
    hashedPassword
  );

  userRepository.insertUser(
    user,
    (err, result) => {
      if(err){
        console.log(`Insertion error\n${err}`);
        return res.status(500).json({
          message: 'Unexpected sever error'
        });
      }
      user.id = result.insertId;
      console.log(`new user created with ID: ${result.insertId}`);
      return res.status(201).json({
        message : 'User is created successfully',
      });
    }
  );
};

const login = async (req, res) => {
  const{username, password} = req.body;
  //check username
  const specialCharacters = "@#$%^&*!~`- _+=()[]{}:;\"'<>,.?/\\|";
  const containsSpecialCharacters = [...specialCharacters].some(char =>
    username.includes(char)
  );
  if (containsSpecialCharacters) {
    return res.status(400).json({
      message : "Username must not contain special characters or spaces"
    });
  }

  userRepository.checkUser(
    username,
    async (err,result) => {
      // Database error
      if(err){
        console.log(`Error while checking credentials for ${username}\n${err}`);
        return res.status(500).json({
          message : 'Something went wrong',
        }
        );
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      // Wrong password
      if (!isMatch) {
        console.log("Password is correct!");
        return res.status(400).json({
          message: 'incorrect password',
        });
      } 
      // Successful login
      console.log(`ID: ${result[0].id} login successfully`);
      return res.status(200).json({
        message : 'true',
        user : result[0],
      });
    }
  );
};

module.exports = {
  signup,
  login,
};