import '../css/index.css'

function Login(){
  return(
    <>
    <div class="flex outer-container">
    <div class="flex banner">
      banner
    </div>
    <div class="flex outer-login-container">
      <div class="flex login-container">
        <h2>FloDo</h2>
        <div class="flex login">
          <h1>Welcome Back!</h1>
          <p>Don't have an account? <span id="create-account">Create a new account now,</span> <br /> its FREE Takes less than a minute.</p>
          <form id="login-form" className="flex" />
            <input type="text" id="username" class="login-inputs" placeholder="username" />
            <input type="password" id="password" class="login-inputs" placeholder="password" />
            <button id="login-btn">Login Now</button>
          {/* </form> */}
          <button id="login-with-google-btn" class="flex"><img src="./Assets/icons/google-logo.jpg" alt="google-logo" />&nbsp Login with Google</button>
          <p class="forget-pass">Forget password <span>Click here</span></p>
        </div>
      </div>
    </div>
  </div>
 </>
  );
}

export default Login