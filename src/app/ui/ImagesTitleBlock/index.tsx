'use client'
import React from "react";
import styles from './style.module.scss';
import Slider from "../Slider";
import {IImages} from "@/app/interfaces/IImages.interface";
import Image from "next/image";

const ImagesTitleBlock: React.FC<{images: IImages[], title: string, lastYear: string, titleDesc: string, price?: number, category:string}> = (props) =>{

    const textDescList = React.useMemo(() => {
        if (props.price) {
            const [title, subpoints] = props.titleDesc.split(':').map(part => part.trim());
            return {
                title,
                subPoints: subpoints.split(';').map(sub => sub.trim()),
            };
        }
        return null;
    }, [props.titleDesc, props.price]);
    return(
     <div className={styles.images_container}>
         <div className={styles.images_containerSliderBack}>
             {
                 props.images.length === 1 ? (

                     props.category === 'raboty' ?
                     <div className={styles.images_containerSlider}>
                         <Image fill={true} className={styles.images_img} src={`${process.env.NEXT_PUBLIC_API_URL}/${props.images[0].url}`} alt="1"/>
                         <div className={styles.images_containerSlider_number}>
                             <Image width={30} height={30} src="/img/call.png" alt="call"/>
                             <div className={styles.images_containerSlider_number_containerTitle}>
                                 <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                                 <a href='tel:+79217793319'>+7 (921) 779-33-19</a>
                             </div>
                         </div>
                     </div>
                         :
                     props.category === 'materialy' ?
                         <div className={styles.images_containerSlider}>
                             <Image width={600} height={350} className={styles.images_img} src={`${props.images[0].url}`} alt="12"/>
                             <div className={styles.images_containerSlider_number}>
                                 <Image width={30} height={30} src="/img/call.png" alt="call"/>
                                 <div className={styles.images_containerSlider_number_containerTitle}>
                                     <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                                     <a href='tel:+79219806290'>+7 (921) 980-62-90</a>
                                 </div>
                             </div>
                         </div> : <></>
                     ) : (

                     props.category === 'raboty' ?
                         <div className={styles.images_containerSlider}>
                             <Slider images={props.images} work={true}/>
                             <div className={styles.images_containerSlider_number}>
                                 <Image width={30} height={30} src="/img/call.png" alt="call"/>
                                 <div className={styles.images_containerSlider_number_containerTitle}>
                                     <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                                     <a href='tel:+79217793319'>+7 (921) 779-33-19</a>
                                 </div>
                             </div>
                         </div>
                         :
                         props.category === 'materialy' ?
                             <div className={styles.images_containerSlider}>
                                 <Slider images={props.images} work={true}/>
                                 <div className={styles.images_containerSlider_number}>
                                     <Image width={30} height={30} src="/img/call.png" alt="call"/>
                                     <div className={styles.images_containerSlider_number_containerTitle}>
                                         <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                                         <a href='tel:+79219806290'>+7 (921) 980-62-90</a>
                                     </div>
                                 </div>
                             </div> : <></>
                 )
             }

             <span className={styles.images_img_back}></span>
         </div>
         <div className={styles.images_TitleDesc_container}>
             <h1 className={`${styles.images_TitleDesc_title} ${styles.images_TitleDesc_title_desktop}`}>{props.title}</h1>

             <div className={styles.images_TitleDesc}>
                 <div className={styles.images_TitleDesc_container}>

                     {
                         props.price
                             ? <div className={styles.images_TitleDesc_desc_containerDescPrice}>
                                 <h1 className={`${styles.images_TitleDesc_title} ${styles.images_TitleDesc_title_mobile}`}>{props.title}</h1>
                                 <div className={styles.images_TitleDesc_desc_price}>
                                     <span>Цена: </span>
                                     от {props.price} руб/м3
                                 </div>

                                 {textDescList?.title &&
                                     <div>

                                         <div className={styles.images_TitleDesc_desc_title}>{textDescList.title}</div>
                                         {textDescList.subPoints.map((subpoint, index) => (
                                             <div className={styles.images_TitleDesc_desc_title_list} key={index}>
                                                 <Image width={23} height={23} src="/img/rostok.png" alt="rostor"/>
                                                 {subpoint}
                                             </div>
                                         ))}
                                     </div>}
                             </div>
                             : <div className={styles.images_TitleDesc_desc_containerDesc}>
                             <h1 className={`${styles.images_TitleDesc_title} ${styles.images_TitleDesc_title_mobile}`}>{props.title}</h1>
                                 <div className={styles.images_TitleDesc_desc_text}>{props.titleDesc}</div>
                             </div>
                     }


                     <div className={styles.images_TitleDesc_YearContainer}>
                     <Image width={40} height={40} src="/img/впрошломгоду.png" alt="впрошломгоду"/>
                         <span className={styles.images_TitleDesc_YearContainer_text}>{props.lastYear}</span>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
}

export default ImagesTitleBlock;
