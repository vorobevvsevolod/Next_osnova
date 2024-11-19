
// @ts-ignore
import styles from "./style.module.scss";
import Link from "next/link";


const HeaderTop:React.FC = () => {
    return(
        <div className={styles.hesderSub}>
        <div className={styles.hesderSub_top}>
        <div className={styles.hesderSub_top_left}>
        <div className={styles.hesderSub_top_left_title}>ДОРОЖНОЕ СТРОИТЕЛЬСТВО И ПОСТАВКА НЕРУДНЫХ МАТЕРИАЛОВ</div>
    <div className={styles.hesderSub_top_left_subtitle}> <span>Время работы:</span> с 9:00 до 19:00</div>
    </div>
    <div className={styles.hesderSub_top_center}>
    <div className={styles.hesderSub_top_center_item}>
    <div className={styles.hesderSub_top_center_item_call}>
    <img width={20} height={20} src="/img/call.png" alt="call"/>
        <span>Нерудные материалы:</span>
    </div>
    <a className={styles.hesderSub_top_center_item_call_number} href="tel:+79219806290">+7 (921) 980-62-90</a>
    </div>
    <div className={styles.hesderSub_top_center_item}>
    <div className={styles.hesderSub_top_center_item_call}>
    <img width={20} height={20} src="/img/call.png" alt="call"/>
        <span>Дорожные и земляные работы:</span>
    </div>
    <a className={styles.hesderSub_top_center_item_call_number} href="tel:+79217793319">+7 (921) 779-33-19</a>
    </div>
    </div>
    <div className={styles.hesderSub_top_right}>
    <div className={styles.hesderSub_top_right_title}>Электронная почта:</div>
    <a className={styles.hesderSub_top_right_email} href='mailto:info@osnovaspb.ru'>info@osnovaspb.ru</a>
    </div>
    </div>
    <div className={styles.hesderSub_bottom}>
    <div className={styles.hesderSub_bottom_nav}>
    <Link href='/' className={styles.hesderSub_bottom_nav_link}>
        Главная
        </Link>
        <Link href='/gallery_works' className={styles.hesderSub_bottom_nav_link}>
        Галерея работ
    </Link>
    <Link href='/contact' className={styles.hesderSub_bottom_nav_link}>
        Контакты
        </Link>


        </div>
        </div>
        </div>
);
}

export default HeaderTop;