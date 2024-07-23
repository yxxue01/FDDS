import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import {useEffect, useState} from "react";

export default function UserLayout() {
  const {user, token, setUser, setToken} = useStateContext();
  const [fetch, setFetch] = useState(false)

  if (!token) {
    // setUser(null)
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    if(!fetch && token)
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)  
         setFetch(true)
      })
  }, [token, user])

  return (
    <div id="defaultLayout">
        <Outlet/>
    </div>
  )
}
