import axios from 'axios'
import { toast } from 'react-toastify'

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    toast.info(response.data.message)
    return response;
}, (error)=>{
    try{
        const {response} = error // equal to error.reponse
        if(response.status=== 401 ){//unauthorized user
            localStorage.removeItem('ACCESS_TOKEN')
            toast.error("Session Timeout, Please login again")
        }else{
            toast.error(response.data.message)
        }
    }catch(e){
        toast.error(e)
    }

    throw error;
})

export default axiosClient