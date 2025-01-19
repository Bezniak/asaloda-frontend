import {animateScroll as scroll} from "react-scroll";

export function formatDate(dateString, locale) {
    const months = {
        ru: [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ],
        be: [
            "января", "лютага", "сакавіка", "красавіка", "мая", "чэрвеня",
            "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"
        ],
        en: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    };

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[locale][date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}


export const calculator = (data) => {
    return data.reduce((sum, current) => sum + current, 0)
}


export const handleClick = () => {
    // Smooth scroll to top using react-scroll
    scroll.scrollToTop({
        duration: 0, // Animation duration in milliseconds
        smooth: 'easeInOutQuad', // Animation type
    });
};