const createAccountBtn = document.querySelector('#create-account');
createAccountBtn.addEventListener("click", () => {
  window.location.href = "/signup";
});

document.querySelector('#login-form').addEventListener('submit', async(e) =>{
  e.preventDefault();
  try{
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    const response = await fetch('auth/login',{
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





// if(!response.ok) throws an error before you can handle the server's message properly. Also, 'Unable to login' || data.message always evaluates to 'Unable to login'.

// data is declared inside try, so you cannot access it inside catch.

// data.message.length >= 2 is unnecessary if your backend sends 'true' for successful login.