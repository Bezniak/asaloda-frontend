import React from 'react';
import MainPhotoBlockContainer from "../../components/MainPhotoBlockContainer/MainPhotoBlockContainer.jsx";
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";

const Home = () => {


    return (
        <div>
            <MainPhotoBlockContainer/>
            <HealthyFoodContainer/>
            <Ration/>
        </div>
    );
};

export default Home;