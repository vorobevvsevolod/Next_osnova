'use client'
import styles from './styles.module.scss'
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const SliderPartner : React.FC = () => {
    const sliderSettings = {
        speed: 500, // Скорость анимации
        slidesToShow: 4, // Количество слайдов на экране
        slidesToScroll: 2, // Прокрутка по 1 слайду
        dots: true,
        autoplay: true,
        arrows: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024, // Для экранов меньше 1024px
                settings: {
                    slidesToShow: 2, // Показываем 2 слайда
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640, // Для экранов меньше 640px
                settings: {
                    slidesToShow: 1, // Показываем 1 слайд
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className={styles.sliderPartner}>
        <h2 className={styles.sliderPartner_title}>Наши клиенты и партнеры</h2>

            <Slider {...sliderSettings}>

                <div className={styles.sliderPartner_slide}>
                    <Image width={200} height={60} src={'/img/logo-01.jpg'} alt={'logo-01'}/>
                </div>

                <div className={styles.sliderPartner_slide}>
                    <Image width={200} height={60}  src={'/img/logo-02.jpeg'} alt={'logo-02'}/>
                </div>

                <div className={styles.sliderPartner_slide}>
                    <Image width={200} height={60}  src={'/img/logo-03.png'} alt={'logo-03'}/>
                </div>

                <div className={styles.sliderPartner_slide}>
                    <Image width={200} height={60}  src={'/img/logo-04.png'} alt={'logo-04'}/>
                </div>

            </Slider>
        </div>
    )
}

export default SliderPartner