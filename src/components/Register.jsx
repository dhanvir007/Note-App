import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import './Register.css'
import { UserContext } from '../App'
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate()

    const { BASE_URL, setErrorMsg, errorMsg, } = useContext(UserContext)
    
    const [userInput, setUserInput] = useState({ username: "", email: "", mobile: "", password: "" })

    const handleChange = (e) => {
        setUserInput((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_URL + `api/user/register`, { ...userInput })
            const myData = response.data
            console.log(response.data)
            if (myData) {
                navigate('/login')

            } else {
                setErrorMsg("Invalid Credentail")
            }

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInput.username || !userInput.email || !userInput.mobile || !userInput.password) {
            setErrorMsg("All Feilds are Mandatory")
        } else {

            fetchRegister()
        }
    }



    return (
        <>
            <div className="forms">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div>
                        <label>Username : - </label>
                        <input type="text" name="username" value={userInput.username} onChange={handleChange} placeholder="Enter Username"></input>
                    </div>
                    <div>
                        <label>Email : - </label>
                        <input type="email" name="email" value={userInput.email} onChange={handleChange} placeholder="Enter Email"></input>
                    </div>
                    <div>
                        <label>Mobile No. : - </label>
                        <input type="number" name="mobile" value={userInput.mobile} onChange={handleChange} placeholder="Enter Mobile No."></input>
                    </div>
                    <div>
                        <label>Password : - </label>
                        <input type="password" name="password" value={userInput.password} onChange={handleChange} placeholder="Enter Password"></input>
                    </div>
                    {errorMsg && <p className="error" >{errorMsg}</p>}
                    <button type="submit">Register</button>
                    <div>
                        <hr />
                    </div>
                    <div>
                        <p>Already have an account.....<span onClick={() => navigate('/login')}>Login</span></p>
                        <p>@...Direct Login...@</p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Register;