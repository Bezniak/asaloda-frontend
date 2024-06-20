import React from 'react';
import MainPhotoBlock from "../../components/MainPhotoBlock/MainPhotoBlock.jsx";
import Button from "../../components/Button/Button.jsx";

const Home = () => {

    const button = <Button content={'Выбрать программу'}/>

    return (
        <div>
            <MainPhotoBlock title={'Худей легко.'}
                            subTitle={'Худей со вкусом'}
                            description={'Программы диетического питания от 1000 Ккал для желающих сбросить вес'}
                            smallPhoto1={'/food1.png'}
                            smallPhoto2={'/food1.png'}
                            smallPhoto3={'/food1.png'}
                            bgColor={'#7ECA1D'}
                            bigPhoto={'/food2.jpg'}
                            button={button}
            />
            <MainPhotoBlock title={'Здоровое питание'}
                            subTitle={'на каждый день'}
                            description={'Доставка сбалансированных рационов питания в Гродно'}
                            smallPhoto1={'/food1.png'}
                            smallPhoto2={'/food1.png'}
                            smallPhoto3={'/food1.png'}
                            bgColor={'white'}
                            bigPhoto={'/food2.jpg'}
                            colorText={'black'}
                            button={<Button content={'Выбрать программу'} borderColor={'black'}/>}
            />
            <MainPhotoBlock title={'Питание для'}
                            subTitle={'набора массы'}
                            description={'Программа питания с повышенной калорийностью и высоким содержанием белка'}
                            smallPhoto1={'/food1.png'}
                            smallPhoto2={'/food1.png'}
                            smallPhoto3={'/food1.png'}
                            bgColor={'#FF7B27'}
                            bigPhoto={'/food2.jpg'}
                            button={button}
            />
        </div>
    );
};

export default Home;