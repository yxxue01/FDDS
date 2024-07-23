import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client"
import Loading from "../components/Loading";

export default function PublicLayout() {
  const {setAddition1, setAddition2, addition1, addition2, user, setUser, token} = useStateContext()
  const [fetch, setFetch] = useState(false)
  const [loading, setLoading] = useState(false);



  useEffect(()=>{
      if(!fetch)
          getResource()
      console.log(user)
  },[addition1,addition2,user, token])
  
  const getResource = async()=>{
    setLoading(true)
    const [data1, data2, user] = await Promise.all([
        axiosClient.get('discovery/family'),
        axiosClient.get('discovery/species'),
        // axiosClient.get('/user')
    ]);
    setAddition1(data1.data.data)
    setAddition2(data2.data.data)
    // setUser(user.data)
    setFetch(true)
    setLoading(false)
}


  return (
    <div id="guestLayout">
      {loading && <Loading />}
      <Outlet />
    </div>
  );
}
