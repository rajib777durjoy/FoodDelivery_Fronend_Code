import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Loading from '../../CustomeLoading/Loading';

const Protect = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const navigate = useNavigate()
    if(loading){
      return <Loading></Loading> 
    }
    if(!user || !user?.email){
     return navigate('/SignUp')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default Protect;