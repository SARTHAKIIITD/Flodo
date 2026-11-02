const path = require('path');
const frontendPath = path.join(__dirname,'../../Frontend/Pages');

const login = (req, res) => {
  res.status(200).sendFile(
    path.join(frontendPath, '../../index.html')
  );
};

const signup = (req, res) => {
  res.status(200).sendFile(
    path.join(frontendPath, 'signup.html')
  );
};

const dashboard = (req, res) => {
  res.status(200).sendFile(
    path.join(frontendPath, 'dashboard.html')
  );
};
const error404 = (req, res) => {
  res.status(404).sendFile(
    path.join(frontendPath, '/error404.html')
  );
};

module.exports = {
  login,
  signup,
  dashboard,
  error404,
};