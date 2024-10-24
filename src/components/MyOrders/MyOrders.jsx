import React from 'react';
import dayjs from 'dayjs';
import {useAuth} from "../../context/AuthContext.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {ROUTES} from "../../config/routes.js";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const MyOrders = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {data, loading, error} = useFetchAllData(`/orders?filters[user][id][$eq]=${user?.id}&populate=*`);

    if (loading) return <Preloader/>;
    if (error) return <div className="text-center mt-8 text-red-500"> {t("error")}: {error.message}</div>;

    return (
        <div className="xs:p-3 md:p-6 mx-auto mt-10">
            <h1 className="md:text-4xl xs:text-2xl font-bold mb-6 text-left">
                {t("my_orders")}
            </h1>
            {data?.length === 0 ? (
                <div className="md:text-4xl xs:text-2xl text-center text-gray-500">
                    {t("no_orders")}
                </div>
            ) : (
                data?.map((order) => (
                    <NavLink to={`${ROUTES.ORDER.replace(":id", order.id)}`} key={order.id}>
                        <div className="bg-white shadow-lg rounded-lg p-3 mb-10">
                            <h2 className="text-2xl font-semibold mb-4 text-left">{t("single_order")} № {order.id}</h2>
                            <div className="flex xs:flex-col lg:flex-row lg:justify-between ">
                                <div className="flex flex-col items-start xs:text-base md:text-2xl">
                                    <p>
                                        <span className="font-bold">
                                            {t("program")}:
                                        </span>
                                        {order.attributes.programName}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            {t("delivery_address")}:
                                        </span>
                                        {order.attributes.address}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            {t("time_delivery")}:
                                        </span>
                                        {order.attributes.deliveryTime}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            {t("program_start_date")}:
                                        </span>
                                        {dayjs(order.attributes.startDate).format('DD.MM.YYYY')}
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col lg:justify-end lg:items-end xs:items-start xs:text-base md:text-2xl">
                                    <p>
                                        <span className="font-bold">
                                            {t("program_cost")}:
                                        </span>
                                        {order.attributes.totalPrice} BYN
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            {t("duration")}:
                                        </span>
                                        {order.attributes.duration} {t("days")}
                                    </p>
                                    {order.attributes.excludeSaturday && (
                                        <p>
                                            <span className="font-bold">
                                                {t("saturday_is_excluded")}:
                                            </span>
                                            {t("yes")}
                                        </p>
                                    )}
                                    {order.attributes.excludeSunday && (
                                        <p>
                                            <span className="font-bold">
                                                {t("sunday_is_excluded")}:
                                            </span>
                                            {t("yes")}
                                        </p>
                                    )}
                                    {order.attributes.promoCode && (
                                        <p>
                                            <span className="font-bold">
                                                {t("promo_code")}:
                                            </span>
                                            {order.attributes.promoCode}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </NavLink>

                ))
            )}
        </div>
    );
};

export default MyOrders;