import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {ROUTES} from "./config/routes.js";
import NotFound from "./components/NotFound/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
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
import ProgramContainer from "./components/Program/ProgramContainer.jsx";
import AllOrdersForAdmin from "./components/AllOrdersForAdmin/AllOrdersForAdmin.jsx";
import MyOrders from "./components/MyOrders/MyOrders.jsx";
import MyOrder from "./components/MyOrders/MyOrder.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import {useTranslation} from "react-i18next";
import AboutUs from "./components/AboutUs/AboutUs.jsx";

const Layout = ({programName, userClickedProgram, setUserClickedProgram, changeProgramName}) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="flex-grow-1">
                <Outlet context={{programName, userClickedProgram, setUserClickedProgram, changeProgramName}}/>
            </div>
            <Footer/>
        </div>
    );
};

const App = () => {
    const {t} = useTranslation();

    const [userClickedProgram, setUserClickedProgram] = useState(t("ultra_light"));
    // const [userClickedProgram, setUserClickedProgram] = useState('Ультра легкость');

    const [programName, setProgramName] = useState([t("ultra_light"), t("light")]);
    // const [programName, setProgramName] = useState(['Ультра легкость', 'Легкость']);

    useEffect(() => {
        if (programName.length > 0) {
            setUserClickedProgram(programName[0]);
        }
    }, [programName]);

    const changeProgramName = (...newProgramName) => {
        setProgramName([...newProgramName]);
        setUserClickedProgram(newProgramName[0]);
    };

    const router = createBrowserRouter([
        {
            path: ROUTES.HOME,
            element: <Layout programName={programName} userClickedProgram={userClickedProgram}
                             setUserClickedProgram={setUserClickedProgram} changeProgramName={changeProgramName}/>,
            errorElement: <NotFound/>,
            children: [
                {
                    path: ROUTES.HOME,
                    element: <Home programName={programName} userClickedProgram={userClickedProgram}
                                   setUserClickedProgram={setUserClickedProgram} changeProgramName={changeProgramName}/>
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
                    element: <MyOrders/>
                },
                {
                    path: ROUTES.PROGRAM,
                    element: <ProgramContainer userClickedProgram={userClickedProgram}/>
                },
                {
                    path: ROUTES.ALL_ORDER,
                    element: <AllOrdersForAdmin/>
                },
                {
                    path: ROUTES.ORDER,
                    element: <MyOrder/>
                },
                {
                    path: ROUTES.PRIVACY_POLICY,
                    element: <PrivacyPolicy/>
                },
            ]
        },
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;
