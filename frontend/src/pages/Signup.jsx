import '../css/signup.css'
function Signup(){
  return(
    <>
    <div className="outer-container flex">
    <div className="inner-container">
      <h1>Sign Up</h1][]>
      <p>create an account or <span>login in</span></p>
      <form id="signup-form" className="flex" />
        <label for="#name">Name</label>
        <input id="name" className="text-input" type="text" />
        <label for="#username">Username</label>
        <input id="username" className="text-input" type="text" />
        <label for="#email">Email address</label>
        <input id="email" className="text-input" type="text" />
        <label for="#password">Password</label>
        <input id="password" className="text-input" type="password" />
        <span /><input id="advertisements" type="checkbox" />
        <label for="advertisements" />I do not want to receive emails with advertising, news, suggestions or marketing promotions
          {/* </span></label>   */}
        <button id="sign-up-btn">Sign up</button>
      {/* </form> */}
      <p>By signing up to create an account, you are accepting our terms of service and privacy policy</p>
    </div>
  </div>
  </>
  );
}

export default Signup