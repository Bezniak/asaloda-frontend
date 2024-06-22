import React from 'react';
import MainPhotoBlockContainer from "../../components/MainPhotoBlockContainer/MainPhotoBlockContainer.jsx";
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";
import ProgramSelector from "../../components/ChooseProgram/ProgramSelector.jsx";

const Home = () => {


    return (
        <div>
            <MainPhotoBlockContainer/>
            <HealthyFoodContainer/>
            <Ration/>
            <ProgramSelector/>
        </div>
    );
};

export default Home;