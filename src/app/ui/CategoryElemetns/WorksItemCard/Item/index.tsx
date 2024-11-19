'use client'
import styles from './style.module.scss';

import {IWork} from "@/app/interfaces/Works/IWork.interface";
import Link from "next/link";
import Image from "next/image";


const Item:React.FC<{work:IWork, activeCategoryUrl: string}> = (props) =>{
    return (
        <>
                <Link href={`/${props.activeCategoryUrl}/${props.work.url}`}>
                <div className={styles.item}>
                    <Image width={400} height={270} className={styles.item_img} src={`${process.env.NEXT_PUBLIC_API_URL}/${props.work.images[0].url}`} alt={props.work.title}/>

                    <div className={styles.item_contaierTitle}>
                        <h4 className={styles.item_contaierTitle_title}>{props.work.title}</h4>
                        <div className={styles.item_contaierTitle_subtitle}>{props.work.lastYear}</div>
                    </div>
                    <div className={styles.item_contaierTitle_price}>Ценa: <span>{(props.work.price === "смета") ? props.work.price : props.work.price + "р."}</span></div>

                </div>
            </Link>
        </>


    );

}
export default Item;