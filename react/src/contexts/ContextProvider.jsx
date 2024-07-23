import {createContext, useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";


const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  addition1: null,
  addition2: null,
  setAddition1: () =>{},
  setAddition2: () =>{},
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, _setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

  const [addition1, _setAddition1] = useState()
  const [addition2, _setAddition2] = useState() 

  const setAddition1 = (data)=>{
    _setAddition1(data)
  }

  const setAddition2 = (data)=>{
    _setAddition2(data)
  }

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      toast.info('User logged out')
    }
  }
  
  const setUser = (user) =>{
    if(user===null)
      _setUser(null)
    else
      _setUser({
        'id':user.id,
        'email':user.email,
        'roles':user.roles,
        'profile':user.profile
      })
  }

  const setNotification = (message,options) => {
    toast(message,options)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
      addition1,
      addition2,
      setAddition1,
      setAddition2,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
