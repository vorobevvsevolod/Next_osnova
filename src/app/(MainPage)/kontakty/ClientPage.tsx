import React from "react";
import styles from './styles.module.scss'
import categoryStyles from "@/app/(categoryPages)/categoryPages.module.scss";
import Image from "next/image";


export default function Contacts() {

    return (
        <div className={styles.contacts}>
            <h2 className={categoryStyles.categoryPages_title}>Контакты</h2>
            <h2 className={styles.contacts_title}>Доставка осуществляется 24 часа в сутки.</h2>
            <p className={styles.contacts_text}>Компания ООО «СК Основа» на строительном рынке работает уже больше 13 лет, за это время мы реализовали множество проектов с целью сделать автомобильные дороги качественнее и комфортнее.</p>

            <div className={styles.contacts_container}>

                <div className={styles.contacts_container_item}>
                    <div className={styles.contacts_container_item_title}>Контакты</div>

                    <div className={styles.contacts_container_item_title_list}>
                        <div className={styles.contacts_container_item_title_list_title}>
                            <div className={styles.contacts_container_item_title_list_title_container}>
                                <Image className={styles.contacts_container_item_title_list_title_icon} width={25} height={25} src="/img/call.png" alt="call"/>
                                <span>Нерудные материалы:</span>
                            </div>

                            <a
                                className={styles.contacts_container_item_title_list_number}
                                href="tel:+79219806290"
                            >
                                +7 (921) 980-62-90
                            </a>
                        </div>

                        <div className={styles.contacts_container_item_title_list_title}>
                            <div className={styles.contacts_container_item_title_list_title_container}>
                                <Image className={styles.contacts_container_item_title_list_title_icon} width={25} height={25} src="/img/call.png" alt="call"/>
                                <span>Дорожные и земляные работы:</span>
                            </div>

                            <a
                                className={styles.contacts_container_item_title_list_number}
                                href="tel:+79217793319"
                            >
                                +7 (921) 779-33-19
                            </a>
                        </div>

                        <div className={styles.contacts_container_item_title_list_title}>
                            <div className={styles.contacts_container_item_title_list_title_container}>
                                <Image className={styles.contacts_container_item_title_list_title_icon} width={25} height={25} src="/img/call.png" alt="call"/>
                                <span>Тел./факс (с 10:00 до 17:00):</span>
                            </div>

                            <a
                                className={styles.contacts_container_item_title_list_number}
                                href="tel:+79217793319"
                            >
                                +7 (812) 703-04-64
                            </a>
                        </div>

                        <div className={styles.contacts_container_item_title_list_title}>
                            <div className={styles.contacts_container_item_title_list_title_container}>
                                <Image className={styles.contacts_container_item_title_list_title_icon} width={25} height={25} src="/img/email.png" alt="call"/>
                                <span>Электронная почта:</span>
                            </div>

                            <a
                                className={styles.contacts_container_item_title_list_number}
                                href="mailto:osnova-stroy@mail.ru"
                            >
                                osnova-stroy@mail.ru
                            </a>
                        </div>

                        <div className={styles.contacts_container_item_title_list_title}>
                            <div className={styles.contacts_container_item_title_list_title_container}>
                                <Image className={styles.contacts_container_item_title_list_title_icon} width={25} height={25} src="/img/building.png" alt="call"/>
                                <span>Адрес:</span>
                            </div>

                            <a
                                className={styles.contacts_container_item_title_list_number}
                                href="mailto:osnova-stroy@mail.ru"
                            >
                                Санкт-Петербург, Липовая аллея, 9
                            </a>

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Image className={styles.contacts_container_item_map} width={700} height={350}
                                       src={'/img/mapContact.png'} alt={'map'}/>
                            </div>
                        </div>


                    </div>
                </div>

                <div className={styles.contacts_container_item}>
                    <div className={styles.contacts_container_item_title}>Реквизиты</div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>Наименование:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            ООО «СК ОСНОВА»
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>ИНН:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            7801594359
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>КПП:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            780101001
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>ОГРН:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            1137847038779
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>Р/с:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            40702810555070003717
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>ОКПО:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            47986409
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>К/с:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            30101810500000000653
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>БИК:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            044030653
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>ИНН:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            7801594359
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>Банк:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            Северо-Западный Банк ОАО "Сбербанк России", г. Санкт-Петербург
                        </p>
                    </div>

                    <div className={styles.contacts_container_item_title_listRekv_title}>
                        <div className={styles.contacts_container_item_title_listRekv_title_container}>
                            <span>ОКАТО:</span>
                        </div>
                        <p className={styles.contacts_container_item_title_listRekv_title_number}>
                            40263563000
                        </p>
                    </div>

                </div>

            </div>
        </div>

    )
}