import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const CarsPark: React.FC = () => {
    return (
        <section className={styles.carsPark} aria-labelledby="cars-park-title">
            {/* Левый блок с описанием */}
            <div className={styles.carsPark_left_container}>
                <div className={styles.carsPark_left}>
                    <Image
                        width={150}
                        height={150}
                        src="/img/excavator.png"
                        alt="Экскаватор - иконка для обозначения спецтехники"
                        className={styles.carsPark_left_img}
                    />
                    <span className={styles.carsPark_left_ygol}></span>
                    <h3 id="cars-park-title" className={styles.carsPark_left_title}>
                        Что включает наш парк
                    </h3>
                    <p className={styles.carsPark_left_subtitle}>
                        Общее количество спецтехники
                    </p>
                    <div className={styles.carsPark_left_count} aria-label="Общее количество техники">
                        29
                    </div>
                </div>
            </div>

            {/* Правый блок с элементами */}
            <div className={styles.carsPark_right}>
                    {/* Элементы спецтехники */}
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark1.png"
                            alt="Асфальтоукладчики"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Асфальтоукладчики</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark2.png"
                            alt="Катки асфальтные"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Катки<br />Асфальтные</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark3.webp"
                            alt="Катки грунтовые"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Катки<br />Грунтовые</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark4.webp"
                            alt="Дорожная фреза"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Дорожная<br />Фреза</h4>
                    </article>

                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark5.png"
                            alt="Виброплита"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Виброплита</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={180}
                            height={100}
                            src="/img/carsPark6.png"
                            alt="Самосвалы"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Самосвалы</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark7.png"
                            alt="Экскаваторы"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Экскаваторы</h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/carsPark8.png"
                            alt="Погрузчики"
                        />
                        <h4 className={styles.carsPark_right_item_title}>Погрузчики</h4>
                    </article>
            </div>
        </section>
    );
};

export default CarsPark;
