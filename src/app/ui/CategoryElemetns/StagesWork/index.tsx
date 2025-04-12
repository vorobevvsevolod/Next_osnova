'use client'
import React from "react";
// @ts-ignore
import stylesCategory from "../../../(categoryPages)/categoryPages.module.scss";
// @ts-ignore
import styles from "./styles.module.scss";
import Image from "next/image";

interface Stage {
    title: string;
    text: string;
    img: string;
}

const StagesWork: React.FC<{
    title: string;
    subTitle: string;
    stages: Stage[];
}> = (props) => {

    const [activeItem, setActiveItem] = React.useState({
        active: true,
        index: 0
    })

    return (
        <section className={stylesCategory.stagesWork_container} aria-labelledby="stages-work-title">
            {/* Заголовок секции */}
            <h2 id="stages-work-title" className={stylesCategory.categoryPages_title}>
                {props.title}
            </h2>
            <p className={stylesCategory.categoryPages_subTitle}>
                {props.subTitle}
            </p>

            {/* Этапы работы */}
            {props.stages.length > 0 ? (
                props.stages.map((stage, index) => {
                    const adjustedIndex = index + 1; // Начинаем счет с 1
                    const isOdd = adjustedIndex % 2 === 1;

                    return (
                        <article
                            className={`${styles.stagesWork_item} ${isOdd ? styles.stagesWork_item_shadowRight : styles.stagesWork_item_shadowLeft}`}
                            key={index}
                            onClick={() => {
                                if(activeItem.active && activeItem.index === index) {
                                    setActiveItem({active: false, index: 0});
                                } else setActiveItem({active: true, index: index})
                            }}
                        >
                            {isOdd ? (
                                <>
                                    <div className={styles.stagesWork_item_TitleText}>
                                        <div className={styles.stagesWork_item_TitleText_title_container}>
                                            <div className={styles.stagesWork_item_TitleText_title}>
                                                <span>0{adjustedIndex}</span>
                                            </div>
                                            <span className={styles.stagesWork_item_TitleText_title_back}></span>
                                            <h2 className={styles.stagesWork_item_TitleText_title_subtitle}>
                                                {stage.title}
                                            </h2>
                                        </div>
                                        <p className={styles.stagesWork_item_TitleText_text}>
                                            {stage.text}
                                        </p>
                                    </div>
                                    <Image
                                        width={300}
                                        height={200}
                                        className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusRight} ${(activeItem.index === index && activeItem.active) ? styles.stagesWork_item_img_active : ''}`}
                                        src={stage.img}
                                        alt={`Этап ${adjustedIndex}: ${stage.title}`}
                                    />
                                    <div
                                        className={`${styles.stagesWork_item_clickMe} ${(activeItem.index === index && activeItem.active) ? styles.stagesWork_item_clickMe_none : ''}`}>Нажми
                                        на меня!
                                    </div>

                                </>
                            ) : (
                                <>
                                    <Image
                                        width={300}
                                        height={200}
                                        className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusLeft} ${(activeItem.index === index && activeItem.active) ? styles.stagesWork_item_img_active : ''}`}
                                        src={stage.img}
                                        alt={`Этап ${adjustedIndex}: ${stage.title}`}
                                    />
                                    <div className={styles.stagesWork_item_TitleText}>
                                        <div className={styles.stagesWork_item_TitleText_title_container}>
                                            <div className={styles.stagesWork_item_TitleText_title}>
                                                <span>0{adjustedIndex}</span>
                                            </div>
                                            <span className={styles.stagesWork_item_TitleText_title_back}></span>
                                            <h2 className={styles.stagesWork_item_TitleText_title_subtitle}>
                                                {stage.title}
                                            </h2>
                                        </div>
                                        <p className={styles.stagesWork_item_TitleText_text}>
                                            {stage.text}
                                        </p>
                                    </div>

                                    <div className={`${styles.stagesWork_item_clickMe} ${(activeItem.index === index && activeItem.active) ? styles.stagesWork_item_clickMe_none : ''}`} >Нажми на меня!</div>
                                </>
                            )}
                        </article>
                    );
                })
            ) : (
                <p className={styles.stagesWork_empty}>Этапы работы пока отсутствуют.</p>
            )}
        </section>
    );
};

export default StagesWork;
