import {CategoriesGetAll} from "@/services/services";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default async function Footer(){
    const categories = await CategoriesGetAll();
    const date = new Date();

    return(
        <footer className={styles.footer}>
                <div className={styles.footer_top}>

                    <nav className={styles.footer_top_nav} aria-label="Дополнительная навигация">
                        <Link href="/" className={styles.footer_top_nav_link}>
                            Главная
                        </Link>
                        <Link href="/galereya" className={styles.footer_top_nav_link}>
                            Галерея работ
                        </Link>
                        <Link href="/kontakty" className={styles.footer_top_nav_link}>
                            Контакты
                        </Link>
                    </nav>
                </div>

            <div className={styles.footer_bottom}>
                <div className={styles.footer_bottom_item}>
                    <div className={styles.footer_bottom_item_logo}>
                        <h2 className={styles.footer_bottom_item_logo_title}>СК ОСНОВА</h2>
                        <div className={styles.footer_bottom_item_logo_subTitle}>РАБОТАЕМ С 2007 ГОДА</div>

                        <div className={styles.footer_bottom_item_logo_text}>
                            ООО "СК "ОСНОВА" <br/>
                            Copyright © {date.getFullYear()}. <br/>
                            Копирование любых материалов <br/>
                            с сайта запрещено. <br/>
                        </div>

                    </div>
                </div>
                <div className={styles.footer_bottom_item}>
                    <div className={styles.footer_bottom_item_services_title}><span>услуги</span></div>

                    <ul className={styles.footer_bottom_item_services_ul}>
                        {
                            categories.map((item, index) => (
                                <li  key={index}>
                                    <Link
                                        className={styles.footer_bottom_item_services_ul_link} href={`/${item.id !== 4 && item.id !== 5 ? 'raboty' : 'materialy'}/${item.url}`}>{item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.footer_bottom_item}>
                    <div className={styles.footer_bottom_item_services_title}><span>Контакты</span></div>

                    <div className={styles.footer_bottom_item_contact_item}>
                        <div className={styles.footer_bottom_item_contact_item_title}>
                            <div className={styles.footer_bottom_item_contact_item_title_container}>
                                <Image width={18} height={18} src="/img/call.png" alt="call"/>
                                <span>Нерудные материалы:</span>
                            </div>

                            <a
                                className={styles.footer_bottom_item_contact_item_number}
                                href="tel:+79219806290"
                            >
                                +7 (921) 980-62-90
                            </a>
                        </div>

                        <div className={styles.footer_bottom_item_contact_item_title}>
                            <div className={styles.footer_bottom_item_contact_item_title_container}>
                                <Image width={18} height={18} src="/img/call.png" alt="call"/>
                                <span>Дорожные и земляные работы:</span>
                            </div>

                            <a
                                className={styles.footer_bottom_item_contact_item_number}
                                href="tel:+79217793319"
                            >
                                +7 (921) 779-33-19
                            </a>
                        </div>

                        <div className={styles.footer_bottom_item_contact_item_title}>
                            <div className={styles.footer_bottom_item_contact_item_title_container}>
                                <Image width={18} height={18} src="/img/email.png" alt="call"/>
                                <span>Электронная почта:</span>
                            </div>

                            <a
                                className={styles.footer_bottom_item_contact_item_number}
                                href="mailto:osnova-stroy@mail.ru"
                            >
                                osnova-stroy@mail.ru
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.footer_bottom_item}>
                    <Link href={'https://yandex.ru/profile/1258767703?no-distribution=1&view-state=mini&source=wizbiz_new_map_single'} style={{cursor: 'pointer'}}>
                        <Image src={'/img/mapFooter.png'} alt={'mapFooter'} width={220} height={160} className={styles.footer_bottom_item_map_img}/>

                        <p className={styles.footer_bottom_item_map_address}>
                            199106, Санкт-Петербург, <br/>
                            Липовая аллея, 9
                        </p>
                    </Link>
                </div>

            </div>
        </footer>
    )
}