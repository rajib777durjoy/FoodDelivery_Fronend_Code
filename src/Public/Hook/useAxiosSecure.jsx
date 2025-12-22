import axios from 'axios';
import React, { useEffect } from 'react';

const instance = axios.create({
    baseURL: import.meta.env.VITE_HOSTING_URL, withCredentials: true
});

const useAxiosSecure = () => {
    useEffect(() => {
        const interceptor = instance.interceptors.response.use((response) => {
            return response;
        }, (err) => {
            const status = err?.response?.status;
            if (status === 403 || status === 401) {
                // signOut user here function //
            }
            return Promise.reject(err);
        })

        return () => instance.interceptors.response.eject(interceptor)

    }, [])
    return instance;
};

export default useAxiosSecure;