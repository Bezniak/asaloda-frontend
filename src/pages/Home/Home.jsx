import React from 'react';
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";
import ProgramSelector from "../../components/ChooseProgram/ProgramSelector.jsx";
import HowItWorksContainer from "../../components/HowItWorks/HowItWorksContainer.jsx";
import WhyAsalodaFood from "../../components/WhyAsalodaFood/WhyAsalodaFood.jsx";
import DiscountsContainer from "../../components/Discounts/DiscountsContainer.jsx";
import WhichProgramToChoose from "../../components/WhichProgramToChoose/WhichProgramToChoose.jsx";
import FaqContainer from "../../components/FAQ/FAQContainer.jsx";
import SliderContainer from "../../components/Slider/SliderContainer.jsx";
import Delivery from "../../components/Delivery/Delivery.jsx";

const Home = () => {


    return (
        <div>
            <SliderContainer/>
            <HealthyFoodContainer/>
            <Ration/>
            <ProgramSelector/>
            <HowItWorksContainer/>
            <WhyAsalodaFood/>
            <DiscountsContainer/>
            <WhichProgramToChoose/>
            <FaqContainer/>
            <Delivery/>
        </div>
    );
};

export default Home;