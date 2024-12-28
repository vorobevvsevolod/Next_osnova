import React from "react";
// @ts-ignore
import styles from './styles.module.scss';
import {IImages} from "@/app/interfaces/IImages.interface";
import {IImagesGalleryWorks} from "@/app/interfaces/Works/IImagesGalleryWorks.interface";
import Image from "next/image";
const Slider:React.FC<{images: IImages[] | IImagesGalleryWorks[], work?: boolean}> = (props) =>{
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
    };


    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? props.images.length - 1 : prevIndex - 1));
    };

    React.useEffect(() => {
        if(props.images.length){
            setCurrentIndex(0)
            const interval = setInterval(goToNextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [props.images.length, props.images]);

    return (
        <div className={styles.slider}>
            {
                props.images.length &&
                <>
                    {<Image width={600} height={450} className={`${styles.slider_img} ${ props.work ? styles.slider_img_borderWork : styles.slider_img_borderDef}`}
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${props.images[currentIndex]?.url}`}
                          alt={`Slide ${currentIndex + 1}`}/>}
                    <div className={styles.slider_conrainer}>
	                    <Image width={35} height={35} className={styles.slider_prevBtn} src="/img/arrowSlider.png" alt="arrowSlider" onClick={goToPrevSlide}/>
                            <div className={styles.slider_containerPoints}>
                                {props.images.map((img, index) => (
                                    <div key={index}
                                         className={`${styles.slider_containerPoints_point} ${index === currentIndex ? styles.slider_containerPoints_point_active :""}`}
                                         onClick={() => setCurrentIndex(index)}></div>
                                ))}
                            </div>


	                    <Image width={35} height={35} src="/img/arrowSlider.png" alt="arrowSlider" className={styles.slider_nextBtn} onClick={goToNextSlide}/>
                    </div>

                </>
            }
        </div>
    );
}

export default Slider;