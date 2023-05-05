import React, { useContext } from 'react'
import axios from '../../../axiosConfig'
import { contextApi } from '../../../contextApi'
import { useNavigate } from 'react-router-dom'
export default function DeleteAlert({ changeCond }) {
     const valContext = useContext(contextApi)
     const nav=useNavigate()
     const deleteUser = async () => {
          try {
               debugger
                    const res = await axios.post('/deleteUser', { userId: valContext.userData._id });
                    const data = await res.data
                    if (data === 'delete the user') {
                         alert(data)
                         nav('/')
                         valContext.userDisconnect()
                    } else{
                          console.error(data)
                    }
               } catch (error) {
                    console.log(error);
               }
}          
  return (
       <div>
            <h2>ARE YOU SURE?</h2>
            <button onClick={() => { deleteUser(); changeCond() }}>yes</button>
            <button onClick={changeCond}>no</button>
    </div>
  )
}
