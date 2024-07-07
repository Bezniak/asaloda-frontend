import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";

const Program = () => {
    const id = useParams().id;
    const {data, loading, error} = useFetchAllData(`/programs/${id}?populate=*`);

    console.log(data)

    return (
        <div className='w-full h-80vh' style={{backgroundColor: `${data.attributes.bg_color}`}}>
            <div>

            </div>
        </div>
    );
};

export default Program;