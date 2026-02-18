import { useState } from 'react'
import './App.css'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Signup from './signup/signup.jsx'
import Login from './login/login.jsx'
// import CreateTask from './CRUD/createTask.jsx'
import User from './dashboard/dashboard.jsx'
import UpdateTask from "./CRUD/updateTask.jsx"
import Protect from './Protect/protectFile.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
       
        <Route path='/registration' element={ <Signup/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}  />
        <Route path='/update/:id' element={<Protect Component={UpdateTask}/>}  />
        {/* <Route path='/create' element={<Protect Component={CreateTask}/>}  /> */}
        <Route path='/dashboard' element={<Protect Component={User}/>}  />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

