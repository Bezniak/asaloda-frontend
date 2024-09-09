import React from 'react';
import Slider from "./Slider.jsx";

const SliderContainer = ({scrollToProgram}) => {

    return (
        <div>
            <Slider scrollToProgram={scrollToProgram}/>
        </div>
    );
};

export default SliderContainer;
