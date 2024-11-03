import {useState} from 'react';
import classNames from 'classnames';
import {useTranslation} from "react-i18next";

const ProgramSelector = ({changeProgramName}) => {
    const {t} = useTranslation();
    // Состояние для отслеживания активной программы
    const [activeProgram, setActiveProgram] = useState(t("ultra_light"));
    // Функция для обработки кликов по кнопкам и изменения активной программы
    const handleProgramChange = (program, subProgram) => {
        setActiveProgram(program);
        changeProgramName(program, subProgram);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 mb-10 p-3'>
            <div className='mb-16 flex md:justify-center items-center flex-wrap xs:justify-center'>
                <h2 className='font-bold xs:text-base md:text-4xl'>
                    {t("choose_program")}
                </h2>
            </div>
            <div className="flex flex-wrap gap-5 justify-evenly items-center">
                <button
                    onClick={() => handleProgramChange(t("ultra_light"), t("light"))}
                    className={classNames(
                        'w-48 h-48 rounded p-3 transition flex flex-col justify-around',
                        activeProgram === t("ultra_light") ? 'bg-[var(--green)] text-white' : 'bg-green-100 hover:bg-[var(--green)]'
                    )}
                >
                    <img src="/slim-body.png" alt="slim-body" className='w-16 h-auto'/>
                    <p className={classNames('transition text-base text-left', activeProgram === t("ultra_light") && 'text-white')}>
                        {t("weight_loss")}
                    </p>
                </button>
                <button
                    onClick={() => handleProgramChange(t("balance"), t("active_balance"))}
                    className={classNames(
                        'w-48 h-48 rounded p-3 transition flex flex-col justify-around',
                        activeProgram === t("balance") ? 'bg-[var(--green)] text-white' : 'bg-green-100 hover:bg-[var(--green)]'
                    )}
                >
                    <img src="/weight-loss.png" alt="weight-loss" className='w-16 h-auto'/>
                    <p className={classNames('transition text-base text-left', activeProgram === t("balance") && 'text-white')}>
                        {t("keeping_in_shape")}
                    </p>
                </button>

                <button
                    onClick={() => handleProgramChange(t("dynamics"), t("dynamics_maxi"))}
                    className={classNames(
                        'w-48 h-48 rounded p-3 transition flex flex-col justify-around',
                        activeProgram === t("dynamics") ? 'bg-[var(--green)] text-white' : 'bg-green-100 hover:bg-[var(--green)]'
                    )}
                >
                    <img src="/muscle.png" alt="muscle" className='w-16 h-auto'/>
                    <p className={classNames('transition text-base text-left', activeProgram === t("dynamics") && 'text-white')}>
                        {t("mass_gain")}
                    </p>
                </button>

                {/*<button*/}
                {/*    onClick={() => handleProgramChange(t("drinks"))}*/}

                {/*    className={classNames(*/}
                {/*        'w-48 h-48 rounded p-3 transition flex flex-col justify-around',*/}
                {/*        activeProgram === t("drinks") ? 'bg-[var(--green)] text-white' : 'bg-green-100 hover:bg-[var(--green)]'*/}
                {/*    )}*/}
                {/*>*/}
                {/*    <img src="/juice.png" alt="juice" className='w-16 h-auto'/>*/}
                {/*    <p className={classNames('transition text-base text-left', activeProgram === t("drinks") && 'text-white')}>*/}
                {/*        {t("drinks")}*/}
                {/*    </p>*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default ProgramSelector;
