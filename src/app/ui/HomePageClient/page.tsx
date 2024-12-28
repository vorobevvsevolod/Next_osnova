'use client'
import categoryStyles from "@/app/(categoryPages)/categoryPages.module.scss";
import styles from "@/app/scss/home.module.scss";

import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import React from "react";
import YandexMapMarsh from "@/app/ui/YandexMapMarsh";
import Link from "next/link";
import YandexMap from "@/app/ui/CategoryElemetns/YandexMap";
import Item from "@/app/ui/CategoryElemetns/WorksItemCard/Item";

// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ICategory} from "@/app/interfaces/ICategory.interface";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import {IWork} from "@/app/interfaces/Works/IWork.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";
import ImagesTitleBlock from "@/app/ui/ImagesTitleBlock";
import {IPriceFactor} from "@/app/interfaces/IPriceFactor.interface";
import {INeed} from "@/app/interfaces/INeed.interface";
import {IImages} from "@/app/interfaces/IImages.interface";

interface Props {
    categories: ICategory[],
    materials: IMaterial[],
    works:IWork[],
    deliveryLocationResponse: {
        locations: IDeliveryLocation[],
        materialFromLocation: IMaterialFromLocation[]
    },
    galleryWorks: IGalleryWorks[],
}

export default function HomePageClient(props: Props) {
    const getWorksForCategory = React.useCallback(
        (categoryId: number) => props.works.filter(work => work.categoryId === categoryId),
        [props.works]
    );

    const getMaterialsForCategory = React.useCallback(
        (categoryId: number) => props.materials.filter(mat => mat.categoryId === categoryId),
        [props.materials]
    );

    const [vyvozSnega, setVyvozSnega] = React.useState<IWork | undefined>(undefined);

    React.useEffect(() => {
        if (props.works.length) {
            const work = props.works.find(work => work.id === 17);
            setVyvozSnega(work);
        }
    }, [props.works]);

    return (
        <div>

            {/*Зимой*/}
                <h2 className={categoryStyles.categoryPages_title}>Ваш надежный партнер в борьбе со снегом!</h2>
            {
                  vyvozSnega?.id ?
                    <>
                        <ImagesTitleBlock images={vyvozSnega.images} title={vyvozSnega.title}
                                          titleDesc={vyvozSnega.descriptionTitle}
                                          lastYear={vyvozSnega.lastYear} category={'raboty'}/>

                        <h4 className={categoryStyles.categoryPages_litleTitle}>Особенности
                            благоустройства
                        </h4>

                        <div className={categoryStyles.categoryPages_text}>
                            {vyvozSnega.features}
                        </div>

                        <h4 className={categoryStyles.categoryPages_title}>Стоимость </h4>

                        <table className={categoryStyles.categoryPages_priceTable}>
                            <thead>
                            <tr>
                                <td className={categoryStyles.categoryPages_priceTable_head}>Наименование</td>
                                <td className={categoryStyles.categoryPages_priceTable_head}>Стоимость руб./м2</td>
                            </tr>
                            </thead>
                            <tbody className={categoryStyles.categoryPages_priceTable_body}>
                            <tr>
                                <td className={categoryStyles.categoryPages_priceTable_body_title}>{vyvozSnega.priceDescription.split(";")[0]}</td>
                                <td className={categoryStyles.categoryPages_priceTable_body_subtitle}>
                                    <>от <strong
                                        className={categoryStyles.categoryPages_priceTable_price}>{vyvozSnega.price.split(";")[0]}</strong>р </>
                                </td>
                            </tr>

                            <tr>
                                <td className={categoryStyles.categoryPages_priceTable_body_title}>{vyvozSnega.priceDescription.split(";")[1]}</td>
                                <td className={categoryStyles.categoryPages_priceTable_body_subtitle}>
                                    <>от <strong
                                        className={categoryStyles.categoryPages_priceTable_price}>{vyvozSnega.price.split(";")[1]}</strong>р </>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <Link href={'/raboty/blagoustrojstvo/vyvoz-i-uborka-snega'} className={categoryStyles.categoryPages_btnLink}> <span className={categoryStyles.categoryPages_btnLink_text}>Перейти на страницу</span></Link>

                    </> : <></>
            }


            {/*Летом*/}
            {/*<h1 className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки Плодородной земли!</h1>*/}
            {/*<YandexMapMarsh*/}
            {/*    materials={props.materials}*/}
            {/*    categories={props.categories}*/}
            {/*    activeCategory={"4"}*/}
            {/*    deliveryLocation={props.deliveryLocationResponse.locations as IDeliveryLocation[]}*/}
            {/*    materialFromLocation={props.deliveryLocationResponse.materialFromLocation as IMaterialFromLocation[]}*/}
            {/*/>*/}

            {/* Заголовок для раздела дорожного строительства */}
            <h2 style={{margin: "40px 0px 0px 0px", color: '#6e6e6e'}} className={categoryStyles.categoryPages_titleCenter}>
                Дорожное строительство <br/> и поставка строительных материалов
            </h2>

            {/* Рендерим работы для каждой категории */}
            {props.categories && props.categories?.length && props.categories.map(category => {
                if (category.typeOfServiceId === 1) {
                    const filteredWorks = getWorksForCategory(category.id);

                    if (filteredWorks.length >= 3) {
                        return (
                            <div key={category.id}>
                                <h2 className={categoryStyles.categoryPages_title}><
                                    Link
                                    href={`/raboty/${category.url}`}
                                    className={styles.TitleCategory}
                                >
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                        <p className={styles.TitleCategory_text}>{category.name}</p>
                                        <img width={40} height={40} src="/img/back.svg" alt=""/>
                                    </div>

                                </Link>
                                </h2>
                                <div className={styles.containerItem}>
                                    <div className={styles.containerItem_left}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${filteredWorks[0]?.images[0].url}`}
                                            alt=""
                                        />
                                        <h3>
                                            <Link
                                                href={`/raboty/${category.url}/${filteredWorks[0].url}`}
                                                className={styles.containerItem_left_title}
                                            >
                                                {filteredWorks[0].title}
                                                <img width={40} height={40} src="/img/back.svg" alt=""/>
                                            </Link>
                                        </h3>

                                    </div>
                                    <div className={styles.containerItem_right}>
                                        {filteredWorks && filteredWorks?.length && filteredWorks.slice(1, 3).map((work, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.containerItem_right_item} ${index === 0 ? styles.containerItem_right_item_top : styles.containerItem_right_item_bottom} `}
                                            >
                                                <img
                                                    className={`${styles.containerItem_right_item_img} ${index === 0 ? styles.containerItem_right_item_top : styles.containerItem_right_item_bottom}`}
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${work.images[0].url}`}
                                                    alt=""
                                                />
                                                <h3>
                                                    <Link
                                                        href={`/raboty/${category.url}/${work.url}`}
                                                        className={styles.containerItem_right_item_title}
                                                    >

                                                        {work.title}
                                                        <img className={styles.containerItem_right_item_title_img}
                                                             src="/img/back.svg" alt=""/>
                                                    </Link>
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <>
                                <h3 className={categoryStyles.categoryPages_title}>{category.name}</h3>
                                <div className={styles.containerItem}>
                                    {filteredWorks && filteredWorks?.length && filteredWorks.slice(0, 2).map((work, index) => (
                                        <div key={index}
                                             className={index === 0 ? styles.containerItem_left : styles.containerItem_right}>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${work.images[0].url}`}
                                                alt=""
                                            />
                                            <h4>
                                                <Link
                                                    href={`/raboty/${category.url}/${work.url}`}
                                                    className={index === 0 ? styles.containerItem_left_title : styles.containerItem_right_item_title}
                                                >
                                                    {work.title}
                                                    <img width={40} height={40} src="/img/back.svg" alt=""/>
                                                </Link>
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    }
                }
                return null;
            })}

            <h2 className={categoryStyles.categoryPages_title}>География наших работ</h2>
            <YandexMap
                workId={0}
                galleryWorks={props.galleryWorks}
                activeCategory={''}
                categories={props.categories}
            />

            {/* Рендерим материалы для каждой категории с подкатегориями */}
            {props.categories && props.categories?.length && props.categories.map((category) => {
                if (category.typeOfServiceId === 2) {
                    const filteredMaterials = getMaterialsForCategory(category.id);

                    const sliderSettings = {
                        speed: 500, // Скорость анимации
                        slidesToShow: 3, // Количество слайдов на экране
                        slidesToScroll: 3, // Прокрутка по 1 слайду
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        className: styles.sliderItem,
                        responsive: [
                            {
                                breakpoint: 900, // Для экранов меньше 1024px
                                settings: {
                                    slidesToShow: 2, // Показываем 2 слайда
                                    slidesToScroll: 2,
                                },
                            },
                            {
                                breakpoint: 640, // Для экранов меньше 640px
                                settings: {
                                    slidesToShow: 1, // Показываем 1 слайд
                                    slidesToScroll: 1,
                                },
                            },
                        ],
                    };

                    return (
                        <div key={category.id}>
                            <h2 className={categoryStyles.categoryPages_title} style={{marginTop: '50px'}}><
                                Link
                                href={`/materialy/${category.url}`}
                                className={styles.TitleCategory}
                            >
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <p className={styles.TitleCategory_text}>{category.name}</p>
                                    <img width={40} height={40} src="/img/back.svg" alt=""/>
                                </div>
                            </Link>
                            </h2>

                            <Slider {...sliderSettings}>
                                {filteredMaterials && filteredMaterials?.length && filteredMaterials.map((material) => {
                                    if (material.sub.length) {
                                        return material.sub.map((sub) => (
                                                <Item
                                                    work={{...sub, price: String(sub.Price_Up_To_100)}}
                                                    activeCategoryUrl={`materialy/${category.url}/${material.url}`}
                                                    height={'550px'}
                                                    key={material.id}
                                                />
                                        ));
                                    } else {
                                        return (
                                                <Item
                                                    work={{
                                                        ...material,
                                                        price: material.Price_Over_300 ? `${String(material.Price_Over_300)}:${String(material.Price_Up_To_100)}` : String(material.Price_Up_To_100),
                                                    }}
                                                    activeCategoryUrl={`materialy/${category.url}`}
                                                    height={'550px'}
                                                    key={material.id}
                                                />
                                        );
                                    }
                                })}
                            </Slider>
                        </div>
                    )
                        ;
                }
                return null;
            })}
        </div>
    );
}
