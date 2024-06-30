import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './18n';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Preloader} from "./components/Preloader/Preloader";
import {AuthProvider} from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <Suspense fallback={<Preloader/>}>
            <App/>
            <ToastContainer/>
        </Suspense>
    </AuthProvider>
)
