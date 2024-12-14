'use client';
import styles from './style.module.scss';

import { IWork } from "@/app/interfaces/Works/IWork.interface";
import Link from "next/link";
import Image from "next/image";

const Item: React.FC<{ work: IWork; activeCategoryUrl: string }> = (props) => {
    const { work, activeCategoryUrl } = props;
    const workUrl = `${process.env.NEXT_PUBLIC_API_URL}/${work.images[0].url}`;

    return (
        <article className={styles.item}>
            {/* Ссылка на детальную страницу */}
                {/* Изображение объекта */}
                <Image
                    width={400}
                    height={270}
                    className={styles.item_img}
                    src={workUrl}
                    alt={`Изображение работы: ${work.title}`}
                    loading="lazy"
                />

                {/* Информация о работе */}
                <div className={styles.item_contaierTitle}>
                    {/* Заголовок работы */}
                    <h3 className={styles.item_contaierTitle_title}>
                        {work.title}
                    </h3>
                    <p className={styles.item_contaierTitle_subtitle}>
                        {work.lastYear}
                    </p>
                </div>

                {/* Цена работы */}
                <div className={styles.item_contaierTitle_price}>
                <b className={styles.item_contaierTitle_price_title}>Цена:</b> {
                    work.price === "смета" ? <span>{work.price}</span>
                        : (
                            work.price.split(";").length !== 1
                            ? <>от <span>{work.price.split(";")[0]}</span>р; от <span>{work.price.split(";")[1]}</span>р</>
                            : work.price.split(":").length !== 1 ?  <>от <span>{work.price.split(":")[0]}</span>р до <span>{work.price.split(":")[1]}</span>р</> :
                                    (
                                        work.price.split("-").length !== 1 ? <>от <span>{work.price.split("-")[0]}</span>р до <span>{work.price.split("-")[1]}</span>р</> : <>от <span>{work.price}</span>р</>
                                    )
                        )
                }
                </div>

                <Link className={styles.item_contaierTitle_link} href={`/${activeCategoryUrl}/${work.url}`} aria-label={`Подробнее о ${work.title}`}><span>Подробнее</span></Link>
        </article>
    );
};

export default Item;
