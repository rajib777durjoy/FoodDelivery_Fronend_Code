import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useNavigate } from 'react-router';
import Loading from '../../CustomeLoading/Loading';

const Protect = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
     return <Navigate to='/SignIn' replace={true} ></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default Protect;