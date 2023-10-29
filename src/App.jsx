import { useState } from 'react';
import './App.css'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import { createContext } from 'react';
import Dashboard from './components/Dashboard';


export const UserContext = createContext();

const App = () => {



  const BASE_URL = 'http://localhost:5000/';

  const [userAuthToken, setUserAuthToken] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");



  return (
    <>
      <div className='App'>

        <UserContext.Provider
          value={{
            BASE_URL,
            userAuthToken,
            setUserAuthToken,
            errorMsg,
            setErrorMsg
          }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />}></Route>

              <Route path="/dashboard" element={
                userAuthToken ? <Dashboard /> : < Navigate to='/login' />}
              />

            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    </>
  )
}

export default App
