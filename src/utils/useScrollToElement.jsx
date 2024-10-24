import {useRef} from 'react';

const useScrollToElement = () => {
    const elementRef = useRef(null);

    const scrollToElement = () => {
        if (elementRef.current) {
            elementRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return [elementRef, scrollToElement];
};

export default useScrollToElement;
