import React from 'react';
import {useTranslation} from "react-i18next";

const PrivacyPolicy = () => {
    const {t} = useTranslation();


    return (
        <div className="container mx-auto">
            <h1 className="xs:text-2xl md:text-4xl text-left font-bold mb-10 mt-10 text-gray-500">
                {t("pp.pp")}
            </h1>
            <h2 className="text-1xl text-left font-semibold mb-4">
                {t("pp.applies_to")}
            </h2>
            <h3 className="text-xl text-left font-semibold mt-6 mb-2">
                {t("pp.definition_of_terms")}
            </h3>
            <p className="mb-2">
                {t("pp.basic_terms")}
            </p>

            <ul className="list-disc pl-5 mb-4 text-justify">
                <li>
                    {t("pp.website_administration")}
                </li>
                <li>
                    {t("pp.personal_data")}
                </li>
                <li>
                    {t("pp.processing_personal_data")}

                </li>
                <li>
                    {t("pp.confidentiality_personal_data")}
                </li>
                <li>
                    {t("pp.website_user")}
                </li>
                <li>
                    {t("pp.cookies")}
                </li>
                <li>
                    {t("pp.ip_address")}
                </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.general_provisions")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.website_constitutes")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.disagreement")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.applies_to_website")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.website_administration_check")}
                </li>
            </ul>


            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.subject_pp")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.sets_obligations")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.data_permitted")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.user_last_name")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.contact_telephone")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.delivery address")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.collects_statistics")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.information_not_specified")}
                </li>
            </ul>


            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.purpose_collecting")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.following_purposes")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.user_registered")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.establishing_feedback")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.determining_location")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.confirmation_accuracy")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.notifications_user")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.receiving_payments")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.effective_customer")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.product_updates")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.advertising_activities")}
                </li>
            </ul>


            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.methods")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.time_limitation")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.right_to_transfer")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.authorized_state")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.disclosure_data")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.necessary_organizational")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.necessary_measures")}
                </li>
            </ul>


            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.obligations")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.obliged_to")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.provide_information")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.supplement")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.administration_obliged")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.information_received")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.confidential_information")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.protect_the_confidentiality")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.request_appeal")}
                </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.liability")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.fulfill_obligations")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.held_liable")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.publicly_known")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.party_prior")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.disclosed_with")}
                </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.dispute")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.claim_in_court")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.recipient_claim")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.agreement_reached")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.current_legislation")}
                </li>
            </ul>


            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">
                {t("pp.additional")}
            </h3>
            <ul>
                <li className="mb-2 text-justify">
                    {t("pp.right_make")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.comes_into_force")}
                </li>
                <li className="mb-2 text-justify">
                    {t("pp.suggestions_questions")}
                </li>
            </ul>


        </div>
    );
};

export default PrivacyPolicy;
