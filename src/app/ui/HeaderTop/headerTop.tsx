'use client';
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

const HeaderTop: React.FC = () => {
    return (
        <section className={styles.headerSub} aria-label="Контактная информация и дополнительная навигация">
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
                            <Image width={20} height={20} src="/img/call.png" alt="call" />
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
                            <Image width={20} height={20} src="/img/call.png" alt="call" />
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
                    <Link href="/galereya-rabot" className={styles.headerSub_bottom_nav_link}>
                        Галерея работ
                    </Link>
                    <Link href="/contact" className={styles.headerSub_bottom_nav_link}>
                        Контакты
                    </Link>
                </nav>
            </div>
        </section>
    );
};

export default HeaderTop;
