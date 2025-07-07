import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ( { children } ) =>
{
    const [ token, setToken ] = useState( localStorage.getItem( "token" ) );
    const [ authUser, setAuthUser ] = useState( null );
    const [ onlineUsers, setOnlineUsers ] = useState( [] );
    const [ socket, setSocket ] = useState( null );

    const checkAuth = async () =>
    {
        try
        {
            const token =localStorage.getItem("token")
            const { data } = await axios.get( "/api/auth/check",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            } );

            if ( data.success )
            {
                setAuthUser( data.user );
                connectSocket( data.user );
            }
        } catch ( error )
        {
            toast.error( error.message );
        }
    };

    const login = async ( state, credentials ) =>
    {
        try
        {
            const { data } = await axios.post( `/api/auth/${ state }`, credentials );
            if ( data.success )
            {
                setAuthUser( data.userData );
                connectSocket( data.userData );
                // axios.defaults.headers.common["token"] = data.token;
                axios.defaults.headers.common[ "Authorization" ] = `Bearer ${ data.token }`;

                setToken( data.token );
                localStorage.setItem( "token", data.token );
                toast.success( data.message );
            } else
            {
                toast.error( data.message );
            }
        } catch ( error )
        {
            toast.error( error.message );
        }
    };

    const logout = async () =>
    {
        localStorage.removeItem( "token" );
        setToken( null );
        setAuthUser( null );
        setOnlineUsers( [] );
        axios.defaults.headers.common[ "token" ] = null;
        toast.success( "Logged out successfully" );
        if ( socket ) socket.disconnect();
    };

    const updateProfile = async ( body ) =>
    {
        console.log( "body:", body );
        try
        {
            const token = localStorage.getItem("token"); // or from your state
            const { data } = await axios.put( "/api/auth/update-profile", body, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                    // "Content-Type": "application/json" // optional, defaults to this for JSON
                }
            } );
            console.log( ( "data in frontend:", data ) );
            if ( data.success )
            {
                console.log( "success:", data.user );
                setAuthUser( data.user );
                toast.success( "Profile updated successfully" );
                return true;
            }
        } catch ( error )
        {
            console.log( error );
            toast.error( error.message );
            return false;
        }
        return false;
    };

    const connectSocket = ( userData ) =>
    {
        if ( !userData || socket?.connected ) return;
        const newSocket = io( backendUrl, {
            query: { userId: userData._id },
        } );
        newSocket.connect();
        setSocket( newSocket );
        newSocket.on( "getOnlineUsers", ( userIds ) =>
        {
            setOnlineUsers( userIds );
        } );
    };

    useEffect( () =>
    {
        if ( token )
        {
            axios.defaults.headers.common[ "token" ] = token;
            checkAuth();
        }
    }, [] );

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    );
};
