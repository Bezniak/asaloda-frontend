import React from 'react';
import MainPhotoBlockContainer from "../../components/MainPhotoBlockContainer/MainPhotoBlockContainer.jsx";
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";
import ProgramSelector from "../../components/ChooseProgram/ProgramSelector.jsx";
import HowItWorksContainer from "../../components/HowItWorks/HowItWorksContainer.jsx";
import WhyAsalodaFood from "../../components/WhyAsalodaFood/WhyAsalodaFood.jsx";

const Home = () => {


    return (
        <div>
            <MainPhotoBlockContainer/>
            <HealthyFoodContainer/>
            <Ration/>
            <ProgramSelector/>
            <HowItWorksContainer/>
            <WhyAsalodaFood/>
        </div>
    );
};

export default Home;