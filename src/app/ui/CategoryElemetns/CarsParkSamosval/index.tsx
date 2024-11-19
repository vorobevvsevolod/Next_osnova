import React from "react";
// @ts-ignore
import styles from "./styles.module.scss";

const CarsParkSamosval:React.FC = () =>{
    return(
        <>

            <div className={styles.carsPark}>
                <div className={styles.carsPark_left_container}>
                    <div className={styles.carsPark_left}>
                        <img width={200} height={120} src="/img/carsPark6.png" alt="samosval" className={styles.carsPark_left_img}/>
                        <span className={styles.carsPark_left_ygol}></span>
                        <div className={styles.carsPark_left_title}>
                            ЧТО ВКЛЮЧАЕТ НАШ ПАРК
                        </div>
                        <div className={styles.carsPark_left_subtitle}>
                            Общее количество самосвалов
                        </div>
                        <div className={styles.carsPark_left_count}>
                            ????
                        </div>
                    </div>
                </div>
                <div className={styles.carsPark_right}>
                    <div className={styles.carsPark_right_containerItem}>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/samosval12.webp" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ТРЕХОСНЫЕ САМОСВАЛЫ <br/> ОТ 12 кубов
                            </div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/samosval22.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ТРЕХОСНЫЕ САМОСВАЛЫ <br/> ОТ 22 кубов
                            </div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/samosval30.webp" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ПОЛУПРИЦЕПЫ <br/> ОТ 30 кубов
                            </div>
                        </div>
                    </div>
                    <div className={styles.carsPark_right_containerItemBrand}>
                        <div className={styles.carsPark_right_containerItemBrand_title}><span>Марки</span> </div>
                        <div className={styles.carsPark_right_containerItemBrand_item}>
                            <img width={140} height={100} src="/img/mercedes.png" alt=""/>
                        </div>
                        <div className={styles.carsPark_right_containerItemBrand_item}>
                            <img width={150} height={120} src="/img/scania.png" alt=""/>
                        </div>
                        <div className={styles.carsPark_right_containerItemBrand_item}>
                            <img width={140} height={110} src="/img/volvo.png" alt=""/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CarsParkSamosval;