import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from '../../../firebase.config';
import useAxiosPublic from '../Hook/useAxiosPublic';
import socket from '../../Socket.js';
import { useDispatch } from 'react-redux';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const dispatch = useDispatch()
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

        const handleConnect = () => {
            console.log(" Connected to server");
            console.log("My socket id:", socket.id);
        };

        const handleDisconnect = () => {
            console.log(" Disconnected from server");
        };
        const handleNotification = ({ message }) => {
            console.log('notification message:', message)
            alert(message)
        }


        socket.on("connect", handleConnect);
        socket.on('order-assigned', handleNotification)
        socket.on("disconnect", handleDisconnect);


        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('currentUser::', currentUser);
            setuser(currentUser);
            // dispatch(setuser(currentUser))
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

        // / tracking location  function ///
        const watchId = navigator.geolocation.watchPosition((pos) => {
            // socket.emit('send_location', ({ lat: pos.coords.latitude, lng: pos.coords.longitude, user_id: 15 }))
        },
            (err) => console.error(err),
            { enableHighAccuracy: true, maximumAge: 1000 }
        );

        return () => {
            unsubscribe();
            socket.off("connect", handleConnect);
            socket.off('order-assigned', handleNotification)
            // socket.off('send_location')
            socket.off("disconnect", handleDisconnect);
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    useEffect(() => {
        if (user?.email) {
            socket.emit('currentuser', { email: user.email });
        }
        return () => {
            socket.off('currentuser')
        }
    }, [user]);


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