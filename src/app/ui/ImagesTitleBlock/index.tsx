'use client'
import React from "react";
import styles from './style.module.scss';
import Slider from "../Slider";
import {IImages} from "@/app/interfaces/IImages.interface";

const ImagesTitleBlock: React.FC<{images: IImages[], title: string, lastYear: string, titleDesc: string, price?: number}> = (props) =>{

    const [textDescList, setTextDescList] = React.useState<{title:string, subPoints: string[]}>()
    React.useEffect(() =>{
        if (props.price) {
            const lines = props.titleDesc.split(':');
            const title = lines[0].trim();
            const subpoints = lines[1].split(";");

            setTextDescList({title: title, subPoints: subpoints})

        }
    },[props.price])
    return(
     <div className={styles.images_container}>
         <div>
             {props.images.length !== 1 ? <div className={styles.images_containerSlider}>

                 <Slider images={props.images}/>
                 <div className={styles.images_containerSlider_number}>
                     <img width={30} height={30} src="/img/call.png" alt="call"/>
                     <div className={styles.images_containerSlider_number_containerTitle}>
                         <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                         <span>+7 (921) 779-33-19</span>
                     </div>
                 </div>
             </div> :
                 <div className={styles.images_containerSlider}>
                     <img className={styles.images_img} src={props.images[0].url} alt="1"/>
                     <div className={styles.images_containerSlider_number}>
                         <img width={30} height={30} src="/img/call.png" alt="call"/>
                         <div className={styles.images_containerSlider_number_containerTitle}>
                             <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                             <span>+7 (921) 980-62-90</span>
                         </div>
                     </div>
                 </div>}

             <span className={styles.images_img_back}></span>
         </div>
         <div className={styles.images_TitleDesc_container}>
             <div className={styles.images_TitleDesc_title}>{props.title}</div>

             <div className={styles.images_TitleDesc}>
                 <div className={styles.images_TitleDesc_container}>

                     {
                         props.price
                             ? <div className={styles.images_TitleDesc_desc_containerDescPrice}>

                                 <div className={styles.images_TitleDesc_desc_price}>
                                     <span>Цена: </span>
                                     от {props.price} руб/м3
                                 </div>

                                 {textDescList?.title &&  <div>
	                                 <div className={styles.images_TitleDesc_desc_title}>{textDescList.title}</div>
                                         {textDescList.subPoints.map((subpoint, index) => (
                                             <div className={styles.images_TitleDesc_desc_title_list} key={index}>
                                                 <img width={23} height={23} src="/img/rostok.png" alt="rostor"/>
                                                 {subpoint}
                                             </div>
                                         ))}
                                 </div>}
                             </div>
                             : <div className={styles.images_TitleDesc_desc_containerDesc}>
                                 <div className={styles.images_TitleDesc_desc_text}>{props.titleDesc}</div>
                             </div>
                     }


                     <div className={styles.images_TitleDesc_YearContainer}>
                         <img width={40} height={40} src="/img/впрошломгоду.png" alt="впрошломгоду"/>
                         <span className={styles.images_TitleDesc_YearContainer_text}>{props.lastYear}</span>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
}

export default ImagesTitleBlock;
