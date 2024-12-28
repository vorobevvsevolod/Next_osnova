import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const CarsParkSamosval: React.FC = () => {
    return (
        <section className={styles.carsPark} aria-labelledby="cars-park-samosval-title">
            {/* Левый блок: информация о парке */}
            <div className={styles.carsPark_left_container}>
                <div className={styles.carsPark_left}>

                    <Image
                        width={150}
                        height={150}
                        src="/img/excavator.png"
                        alt="Экскаватор - иконка для обозначения спецтехники"
                        className={styles.carsPark_left_img}
                    />
                    {/*<Image*/}
                    {/*    width={200}*/}
                    {/*    height={120}*/}
                    {/*    src="/img/carsPark6.png"*/}
                    {/*    alt="Самосвалы"*/}
                    {/*    className={styles.carsPark_left_img}*/}
                    {/*/>*/}
                    <span className={styles.carsPark_left_ygol}></span>
                    <h3 id="cars-park-samosval-title" className={styles.carsPark_left_title}>
                        Что включает наш парк
                    </h3>
                    <p className={styles.carsPark_left_subtitle}>
                        Общее количество самосвалов
                    </p>
                    <div className={styles.carsPark_left_count} aria-label="Количество самосвалов">
                        11
                    </div>
                </div>
            </div>

            {/* Правый блок: категории и марки */}
            <div className={styles.carsPark_right}>
                <article className={styles.carsPark_right_item}>
                    <Image
                        width={150}
                        height={100}
                        src="/img/carsPark6.png"
                        alt="Катки грунтовые"
                    />
                    <h4 className={styles.carsPark_right_item_title}>САМОСВАЛЫ <br /> от 20 кубов</h4>
                </article>

            </div>
        </section>
    );
};

export default CarsParkSamosval;
