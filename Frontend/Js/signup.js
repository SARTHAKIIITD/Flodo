document.querySelector('#signup-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  if(
  !name.value.trim() ||
  !username.value.trim() ||
  !email.value.trim() ||
  !password.value.trim()
  ){
    alert("All the fields are required to be filled");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // check email
  if (!emailRegex.test(email.value.trim())) {
    alert('Please enter a valid email address');
    return;
  }

  const specialCharacters = "@#$%^&*!~`- _+=()[]{}:;\"'<>,.?/\\|";
  //check username
  const containsSpecialCharacters = [...specialCharacters].some(char =>
    username.value.includes(char)
  );
  if (containsSpecialCharacters) {
    alert('Username must not contain special characters or spaces');
    return;
  }
  // Check name
  const nameContainsSpecialCharacters = [...specialCharacters].some(char =>
    name.value.includes(char)
  );

  if (nameContainsSpecialCharacters) {
    alert('name must not contain special characters or spaces');
    return;
  }

  const userData = {
    name: name.value.trim(),
    username: username.value.trim(),
    email: email.value.trim(),
    password : password.value,
  };

  try{
    const response =  await fetch(
      '/auth/signup',
      {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || 'Unable to create account');
    }
    alert(data.message);

    name.value = ``;
    username.value = ``;
    email.value = ``;
    password.value = ``;

  }
  catch(err){
    console.error('Unable to send data \n', err);
  }
});