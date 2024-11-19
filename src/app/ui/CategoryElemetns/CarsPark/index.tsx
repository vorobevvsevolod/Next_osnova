import React from "react";
// @ts-ignore
import styles from "./styles.module.scss";

const CarsPark:React.FC = () =>{
    return(
        <>

            <div className={styles.carsPark}>
                <div className={styles.carsPark_left_container}>
                    <div className={styles.carsPark_left}>
                        <img width={150} height={150} src="/img/excavator.png" alt="excavator" className={styles.carsPark_left_img}/>
                        <span className={styles.carsPark_left_ygol}></span>
                        <div className={styles.carsPark_left_title}>
                            ЧТО ВКЛЮЧАЕТ НАШ ПАРК
                        </div>
                        <div className={styles.carsPark_left_subtitle}>
                            Общее количество спецтехники
                        </div>
                        <div className={styles.carsPark_left_count}>
                            29
                        </div>
                    </div>
                </div>
                <div className={styles.carsPark_right}>
                    <div className={styles.carsPark_right_containerItem}>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark1.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>АСФАЛЬТОУКЛАДЧИКИ</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark2.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>КАТКИ <br/>АСФАЛЬТНЫЕ</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark3.webp" alt=""/>
                            <div className={styles.carsPark_right_item_title}>КАТКИ <br/>ГРУНТОВЫЕ</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark4.webp" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ДОРОЖНАЯ <br/>ФРЕЗА</div>
                        </div>
                    </div>
                    <div className={styles.carsPark_right_containerItem}>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark5.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ВИБРОПЛИТА</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={180} height={100} src="/img/carsPark6.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>САМОСВАЛЫ</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark7.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ЭКСКАВАТОРЫ</div>
                        </div>
                        <div className={styles.carsPark_right_item}>
                            <img width={150} height={100} src="/img/carsPark8.png" alt=""/>
                            <div className={styles.carsPark_right_item_title}>ПОГРУЗЧИКИ</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarsPark;