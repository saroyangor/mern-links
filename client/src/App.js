import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import 'materialize-css'

const App = () => {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuth
        }}>
            <BrowserRouter>
                { isAuth && <Navbar/> }
                <div className='container'>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App