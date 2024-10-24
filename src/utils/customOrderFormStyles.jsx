export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        padding: '10px',
        border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`,
        boxShadow: state.isFocused ? '0 0 0 1px #7ECA1D' : provided.boxShadow,
        '&:hover': {
            border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`,
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#7ECA1D'  // Зеленый для выбранного элемента
            : state.isFocused
                ? '#7ECA1D'  // Зеленый для фокуса
                : state.isActive
                    ? '#7ECA1D'  // Зеленый при нажатии и удержании
                    : provided.backgroundColor,
        color: state.isSelected || state.isFocused || state.isActive
            ? '#fff'  // Белый текст для выбранного, фокуса или при удержании
            : provided.color,
        '&:active': {
            backgroundColor: '#7ECA1D',  // Зеленый для состояния active (нажатие мыши)
        },
    }),
    menu: (provided) => ({
        ...provided,
        padding: '12px',
    }),
};