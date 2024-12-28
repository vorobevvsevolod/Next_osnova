'use client';
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {ICategory} from "@/app/interfaces/ICategory.interface";

interface props {
    categories: ICategory[];
}
const HeaderTop: React.FC<props> = (props) => {

    const [visibleHeaderMob, setVisibleHeaderMob] = React.useState(false);


    return (
        <section className={styles.headerSub} aria-label="Контактная информация и дополнительная навигация">
            <div className={styles.headerSub_logo}>
                <Link href={'/'} className={styles.headerSub_logo_container}>
                    <h1 className={styles.headerSub_logo_title}>СК ОСНОВА</h1>
                    <p className={styles.headerSub_logo_subTitle}>РАБОТАЕМ С 2007 ГОДА</p>
                </Link>
            </div>
            <div className={styles.headerSub_top}>
                <div className={styles.headerSub_top_left}>
                    <div className={styles.headerSub_top_left_title}>
                        ДОРОЖНОЕ СТРОИТЕЛЬСТВО И ПОСТАВКА НЕРУДНЫХ МАТЕРИАЛОВ
                    </div>
                    <div className={styles.headerSub_top_left_subtitle}>
                        <span>Время работы:</span> с 9:00 до 19:00
                    </div>
                </div>
                <div className={styles.headerSub_top_center}>
                    <div className={styles.headerSub_top_center_item}>
                        <div className={styles.headerSub_top_center_item_call}>
                            <Image width={20} height={20} src="/img/call.png" alt="call"/>
                            <span>Нерудные материалы:</span>
                        </div>
                        <a
                            className={styles.headerSub_top_center_item_call_number}
                            href="tel:+79219806290"
                        >
                            +7 (921) 980-62-90
                        </a>
                    </div>
                    <div className={styles.headerSub_top_center_item}>
                        <div className={styles.headerSub_top_center_item_call}>
                            <Image width={20} height={20} src="/img/call.png" alt="call"/>
                            <span>Дорожные и земляные работы:</span>
                        </div>
                        <a
                            className={styles.headerSub_top_center_item_call_number}
                            href="tel:+79217793319"
                        >
                            +7 (921) 779-33-19
                        </a>
                    </div>
                </div>
                <div className={styles.headerSub_top_right}>
                    <div className={styles.headerSub_top_right_title}>Электронная почта:</div>
                    <a
                        className={styles.headerSub_top_right_email}
                        href="mailto:osnova-stroy@mail.ru"
                    >
                        osnova-stroy@mail.ru
                    </a>
                </div>
            </div>
            <div className={styles.headerSub_bottom}>
                <nav className={styles.headerSub_bottom_nav} aria-label="Дополнительная навигация">
                    <Link href="/" className={styles.headerSub_bottom_nav_link}>
                        Главная
                    </Link>
                    <Link href="/galereya" className={styles.headerSub_bottom_nav_link}>
                        Галерея работ
                    </Link>
                    <Link href="/kontakty" className={styles.headerSub_bottom_nav_link}>
                        Контакты
                    </Link>
                </nav>

                <nav
                    className={`navBurger`}
                    onClick={() => setVisibleHeaderMob(!visibleHeaderMob)}
                >
                    <div className={`navT ${
                        visibleHeaderMob ? 'active' : ''
                    }`}>
                        <div className={'icon'}></div>
                    </div>
                </nav>


            </div>
            <div
                className={`${styles.headerSub_bottom_burgerModal_container} ${visibleHeaderMob ? styles.headerSub_bottom_burgerModal_container_show : styles.headerSub_bottom_burgerModal_container_noShow}`}
                onClick={() => setVisibleHeaderMob(!visibleHeaderMob)}
            >
                <nav
                    className={`${styles.headerSub_bottom_burgerModal} ${visibleHeaderMob ? styles.headerSub_bottom_burgerModal_show : styles.headerSub_bottom_burgerModal_noShow}`}>
                    <Link href={'/'} className={styles.headerSub_bottom_burgerModal_item}>Главная</Link>
                    {
                        props.categories.map((cat, index) => (
                            <Link key={cat.id}
                                  href={`${cat.id !== 4 && cat.id !== 5 ? '/raboty' : '/materialy'}/${cat.url}`}
                                  className={`${styles.headerSub_bottom_burgerModal_item} ${styles.headerSub_bottom_burgerModal_item_category}`}>{cat.name}</Link>
                        ))
                    }
                    <Link href={'/galereya'} className={styles.headerSub_bottom_burgerModal_item}>Галерея работ</Link>
                    <Link href={'/kontakty'} className={styles.headerSub_bottom_burgerModal_item}>Контакты</Link>
                </nav>
            </div>
        </section>
    );
};

export default HeaderTop;
