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
                        width={200}
                        height={120}
                        src="/img/carsPark6.png"
                        alt="Самосвалы"
                        className={styles.carsPark_left_img}
                    />
                    <span className={styles.carsPark_left_ygol}></span>
                    <h3 id="cars-park-samosval-title" className={styles.carsPark_left_title}>
                        Что включает наш парк
                    </h3>
                    <p className={styles.carsPark_left_subtitle}>
                        Общее количество самосвалов
                    </p>
                    <div className={styles.carsPark_left_count} aria-label="Количество самосвалов">
                        ????
                    </div>
                </div>
            </div>

            {/* Правый блок: категории и марки */}
            <div className={styles.carsPark_right}>
                {/* Категории самосвалов */}
                <div className={styles.carsPark_right_containerItem}>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/samosval12.webp"
                            alt="Трехосные самосвалы от 12 кубов"
                        />
                        <h4 className={styles.carsPark_right_item_title}>
                            Трехосные самосвалы <br /> от 12 кубов
                        </h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/samosval22.png"
                            alt="Трехосные самосвалы от 22 кубов"
                        />
                        <h4 className={styles.carsPark_right_item_title}>
                            Трехосные самосвалы <br /> от 22 кубов
                        </h4>
                    </article>
                    <article className={styles.carsPark_right_item}>
                        <Image
                            width={150}
                            height={100}
                            src="/img/samosval30.webp"
                            alt="Полуприцепы от 30 кубов"
                        />
                        <h4 className={styles.carsPark_right_item_title}>
                            Полуприцепы <br /> от 30 кубов
                        </h4>
                    </article>
                </div>

                {/* Марки самосвалов */}
                <div className={styles.carsPark_right_containerItemBrand}>
                    <h4 className={styles.carsPark_right_containerItemBrand_title}>
                        <span>Марки</span>
                    </h4>
                    <div className={styles.carsPark_right_containerItemBrand_item}>
                        <Image
                            width={140}
                            height={100}
                            src="/img/mercedes.png"
                            alt="Самосвалы Mercedes"
                        />
                    </div>
                    <div className={styles.carsPark_right_containerItemBrand_item}>
                        <Image
                            width={150}
                            height={120}
                            src="/img/scania.png"
                            alt="Самосвалы Scania"
                        />
                    </div>
                    <div className={styles.carsPark_right_containerItemBrand_item}>
                        <Image
                            width={140}
                            height={110}
                            src="/img/volvo.png"
                            alt="Самосвалы Volvo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarsParkSamosval;
