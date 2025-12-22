import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL:import.meta.env.VITE_HOSTING_URL,withCredentials:true
});

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;