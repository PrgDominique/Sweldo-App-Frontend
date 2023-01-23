
const Register = () => {
    return <div>
        <form>
            <label htmlFor="lname">
                Last Name:
            </label>
            <input type="text" name="lname" />
            <label htmlFor="fname">
                First Name:
               <input type="text" name="fname"/>
            </label>
            <label htmlFor="email">
                E-mail:
                <input type="email" name="email" id="" />
            </label>
            <label htmlFor="password">Password:
            <input type="password" />
            </label>
             <label htmlFor="password">Confirmed Password:
            <input type="password" />
            </label>
            <input type="submit" value="Register" />
        </form>
    </div>
  }
  
  export default Register
  