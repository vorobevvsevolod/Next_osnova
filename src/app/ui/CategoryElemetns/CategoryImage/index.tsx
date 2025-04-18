import React from "react";
// @ts-ignore
import styles from './style.module.scss';
import Image from "next/image";
const CategoryImage: React.FC<{imgURL: string}> = (props) =>{
    return(
     <div className={styles.images_container}>
         <Image width={880} height={550} className={styles.images_img} src={props.imgURL} alt="дорожноестроительство"/>
         <span className={styles.images_img_back}></span>
         <div className={styles.images_year}>
             <div className={styles.images_year_container}>
                 <span>Работаем с 2007г</span>
             </div>
         </div>
     </div>
    )
}

export default CategoryImage;
