import React from 'react';
import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {ROUTES} from "./config/routes.js";
import NotFound from "./components/NotFound/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Partnership from "./components/Partnership/Partnership.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import DiscountsContainer from "./components/Discounts/DiscountsContainer.jsx";
import FaqContainer from "./components/FAQ/FAQContainer.jsx";
import PaymentDeliveryContainer from "./components/PaymentDelivery/PaymentDeliveryContainer.jsx";
import ReviewsContainer from "./components/Reviews/ReviewsContainer.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Contacts from "./components/Contacts/Contacts.jsx";
import MyOrder from "./components/MyOrder/MyOrder.jsx";
import ProgramContainer from "./components/Program/ProgramContainer.jsx";

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="flex-grow-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home/>
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFound/>
            },
            {
                path: ROUTES.DISCOUNTS,
                element: <DiscountsContainer/>
            },
            {
                path: ROUTES.REVIEWS,
                element: <ReviewsContainer/>
            },
            {
                path: ROUTES.PAYMENT_DELIVERY,
                element: <PaymentDeliveryContainer/>
            },
            {
                path: ROUTES.FAQ,
                element: <FaqContainer/>
            },
            {
                path: ROUTES.ABOUTUS,
                element: <AboutUs/>
            },
            {
                path: ROUTES.PARTNERSHIP,
                element: <Partnership/>
            },
            {
                path: ROUTES.LOGIN,
                element: <Login/>
            },
            {
                path: ROUTES.REGISTER,
                element: <Register/>
            },
            {
                path: ROUTES.CONTACTS,
                element: <Contacts/>
            },
            {
                path: ROUTES.MY_ORDER,
                element: <MyOrder/>
            },
            {
                path: ROUTES.PROGRAM,
                element: <ProgramContainer/>
            },
        ]
    },
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;
