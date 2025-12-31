import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from '../../../firebase.config';
import useAxiosPublic from '../Hook/useAxiosPublic';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const provider = new GoogleAuthProvider();
    const GoogleSingIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const CreateNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const SignInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const SignOutUser = async () => {
        try {
            await signOut(auth);
            console.log('Sign out successful');
        } catch (err) {
            console.log('Sign out error', err);
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('currentUser::', currentUser);
            setuser(currentUser);
            if (currentUser?.email) {
                axiosPublic.post('/jwt_generate', { email: currentUser?.email })
                    .then(res => {
                        setLoading(false)
                        console.log('token generate message::', res.data.message)
                    }).catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
            } else {
                axiosPublic.post('/jwt_remove', {})
                    .then(res => {
                        setLoading(false)
                        console.log('token remove message:::', res.data.message)
                    }).catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const data = {
        GoogleSingIn,
        CreateNewUser,
        SignInUser,
        SignOutUser,
        user,
        loading,
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;