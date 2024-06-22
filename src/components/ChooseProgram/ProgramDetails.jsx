import React, {useState} from 'react';
import axios from 'axios';

const ProgramDetails = ({selectedProgram}) => {
    const [programData, setProgramData] = useState(null);

    React.useEffect(() => {
        if (selectedProgram) {
            axios.get(`http://your-strapi-url/programs/${selectedProgram}`)
                .then(response => {
                    setProgramData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }
    }, [selectedProgram]);

    return (
        <div>
            <div>
                <h2>{programData?.title}</h2>
                <p>{programData?.description}</p>
            </div>
        </div>
    );
};

export default ProgramDetails;