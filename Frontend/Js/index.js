// const API_URL = 'https://flodo.onrender.com';

const createAccountBtn = document.querySelector('#create-account');
createAccountBtn.addEventListener("click", () => {
  window.location.href =`/signup`;
});

document.querySelector('#login-form').addEventListener('submit', async(e) =>{
  e.preventDefault();
  
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');

  if(
  !username.value.trim() ||
  !password.value.trim()
  ){
    alert("All the fields are required to be filled");
    return;
  }
  //check username
  const specialCharacters = "@#$%^&*!~`- _+=()[]{}:;\"'<>,.?/\\|";
  const containsSpecialCharacters = [...specialCharacters].some(char =>
    username.value.includes(char)
  );
  if (containsSpecialCharacters) {
    alert('Username must not contain special characters or spaces');
    return;
  }

  try{
    const response = await fetch(`/auth/login`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();
    if(!response.ok){
      alert(data.message);
      throw new Error('Unable to login');
    }
    
    if(data.message === 'true') {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    }
    else{
      alert(data.message);
    }
    username.value = ``;
    password.value = ``;
  }
  catch(err){
    console.error(`Something went wrong${err}`);
  }

});