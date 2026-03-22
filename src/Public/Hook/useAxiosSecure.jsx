import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';

const instance = axios.create({
    baseURL: import.meta.env.VITE_HOSTING_URL, withCredentials: true
});
// const instance = axios.create({
//   baseURL:'http://localhost:5000',
//   withCredentials:true
// });


const useAxiosSecure = () => {
    const {SignOutUser}=useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const interceptor = instance.interceptors.response.use((response) => {
            return response;
        },(err) => {
            const status = err?.status;
            if (status === 403 || status === 401) {
                // signOut user here function //
                SignOutUser()
                navigate('/SignUp')
            }
            return Promise.reject(err);
        })

        return () => instance.interceptors.response.eject(interceptor)

    }, [])
    return instance;
};

export default useAxiosSecure;