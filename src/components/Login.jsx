import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useContext, useState } from 'react'
import { UserContext } from '../App'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const {BASE_URL , setUserAuthToken,errorMsg,setErrorMsg } = useContext(UserContext)

    const [userInput, setUserInput] = useState({ email: "", password: "" })

    const handleInput = (e) =>{
          setUserInput((prev) =>({
            ...prev ,[e.target.name] : e.target.value 
          }))

         
    
    }
    const bodyLoad = () =>{
        localStorage.clear()
    }

    const fetchLogin = async () =>{
        try {
                const response = await axios.post(BASE_URL + `api/user/login`,{...userInput})
                if(response) {
                    const Token = await response.data
                    localStorage.setItem('Token' ,Token)
                    setUserAuthToken(Token)
                    console.log(Token);
                     navigate('/dashboard')
           
                    
                }else {
                     setErrorMsg("Invalid Crendentail")
                }
                
            } catch (error) {
                  setErrorMsg(error)
            }
    }

    const handleSubmit = (e) =>{
                e.preventDefault();
                if(!userInput.email){
                    setErrorMsg("Email is required")
                } else if(!userInput.password){
                    setErrorMsg("Password is required")
                } else{
                    
                    fetchLogin()
                }
    }

    const handleClick = () =>{
        navigate('/register')
        localStorage.clear()
    }
     
  
    return (
        <div className="forms" onLoad={bodyLoad}>
            <form onSubmit={handleSubmit} >
                <h1>Login</h1>
                <div>
                    <label>Email : - </label>
                    <input type="email" name="email" value={userInput.email} onChange={handleInput}></input>
                </div>
                <div>
                    <label>Password : - </label>
                    <input type="password" name="password" value={userInput.password} onChange={handleInput}></input>
                </div>
                {errorMsg && <p className="error">{errorMsg}</p>}
                 
                <button type="submit">Submit</button>
                <div>
                    <hr />
                </div>
                <div>
                    <p>Already has & account.....<span onClick={handleClick}>Register</span></p>
                    <p>@...Register First...@</p>
                </div>
            </form>
        </div>

    )
}

export default Login;