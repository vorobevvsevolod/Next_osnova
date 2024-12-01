'use server'
import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    GalleryWorksGetAll,
    MaterialsGetAll,
    WorksGetAll
} from "@/services/services";
import dynamic from "next/dynamic";
import {Metadata, ResolvingMetadata} from "next";
const WorksItemCard = dynamic(() => import("@/app/ui/CategoryElemetns/WorksItemCard"));
import React from "react";
import styles from './styles.module.scss';
import categoryStyles from "../../../categoryPages.module.scss";
import ImagesTitleBlock from "@/app/ui/ImagesTitleBlock";
import YandexMapMarsh from "@/app/ui/YandexMapMarsh";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {MaterialsPropsInterface} from "@/app/interfaces/Materials/MaterialsProps.interface";
import {WorksCategory} from "@/app/(categoryPages)/WorksCategory";
import {MaterialsCategory} from "@/app/(categoryPages)/MaterialsCategory";
import Link from "next/link";
import CarsPark from "@/app/ui/CategoryElemetns/CarsPark";
import CarsParkSamosval from "@/app/ui/CategoryElemetns/CarsParkSamosval";
import {BreadcrumbList, Offer, Product, WithContext} from "schema-dts";
import {OrganizationSchema} from "@/services/OrganizationSchema";


export async function generateStaticParams() {
    const materialList = await MaterialsGetAll();
    return MaterialsCategory.flatMap(category =>
        materialList
            .filter(material => material.categoryId === category.id)
            .map(material => ({
                category: category.slug,
                material: material.url,
            }))
    );
}


export async function generateMetadata(
    { params, searchParams }: MaterialsPropsInterface,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {category, material } = (await params)
    const materials = await MaterialsGetAll();
    const materialFind = materials.find(mat => mat.url === material)
    return {
        title: materialFind?.seoTitle,
        description: materialFind?.seoDescription ,
        openGraph: {
            images: [`${process.env.NEXT_PUBLIC_API_URL}/${materialFind?.images[0].url}`],
            locale: 'ru_RU'
        },
    }
}

export default async function MaterialPageServer(props: MaterialsPropsInterface) {
    try {
        const params = await props.params;

        const [categories, materials, works, deliveryLocationResponse] = await Promise.all([
            CategoriesGetAll(),
            MaterialsGetAll(),
            WorksGetAll(),
            DeliveryLocationGetAll()
        ]);
        const activeCategory = categories.find(cat => cat.url === params.category);
        const material = materials.find(work => work.url === params.material);


        const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Главная',
                    item: process.env.DOMAIN,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: activeCategory?.name || 'Категория',
                    item: `${process.env.DOMAIN}/materialy/${params.category}`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: material?.title || 'Материал',
                    item: `${process.env.DOMAIN}/materialy/${params.category}/${material?.url}`,
                }
            ],
        };

        let jsonLdServer :WithContext<Product> | null  = null;

        if(activeCategory?.id === 4) {
            jsonLdServer = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": material?.title,
                "description": material?.seoDescription,
                "image": material?.images[0].url,
                "brand": {
                    "@type": "Brand",
                    "name": "СК Основа"
                },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "RUB", // Валюта
                    "price": material?.Price_Over_300,
                    "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material?.url}`,
                    "availability": "https://schema.org/InStock"
                }
            }
        }

        if(activeCategory?.id === 5) {
            if(!material?.sub.length) {
                jsonLdServer = {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": material?.title,
                    "description": material?.seoDescription,
                    "image": material?.images[0].url,
                    "brand": {
                        "@type": "Brand",
                        "name": "СК Основа"
                    },
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "RUB",
                        "price": material?.Price_Up_To_100,
                        "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material?.url}`,
                        "availability": "https://schema.org/InStock"
                    }
                }
            } else {
                const offers : Offer[] = material.sub.map(sub => ({
                        "@type": "Offer",
                        "name": sub.title,
                        "description": sub.seoDescription,
                        "price": sub.Price_Up_To_100,
                        "priceCurrency": "RUB",
                        "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material.url}/${sub.url}`,
                        "availability": "https://schema.org/InStock"

                    }));

                jsonLdServer = {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": material?.title,
                    "description": material?.seoDescription,
                    "image": material?.images[0].url,
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "RUB",
                        "highPrice":  Math.max(...material.sub
                            .flatMap(item => item.Price_Up_To_100)
                        ),

                        "lowPrice": Math.min(...material.sub
                            .flatMap(item =>  item.Price_Up_To_100)
                        ),
                        "offerCount": offers.length,
                        "offers": offers
                    }
                }
            }

        }





        if(material?.id){
            return (
                <div className={styles.workItem_container}>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdBreadcrumbList)}}
                    />

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdServer)}}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(OrganizationSchema)}}
                    />
                    <div className={categoryStyles.categoryPages_bread}>
                        <Link href="/" className={categoryStyles.categoryPages_bread_link}>Главная</Link>
                        <span>/</span>
                        <Link href={`/materialy/${activeCategory?.url}`}
                              className={categoryStyles.categoryPages_bread_link}>{activeCategory?.name}</Link>
                        <span>/</span>

                        <span
                            className={`${categoryStyles.categoryPages_bread_link_last} ${categoryStyles.categoryPages_bread_link}`}>{material.title}</span>
                    </div>


                    {material && <ImagesTitleBlock images={material.images} title={material.title}
                                                   titleDesc={material.descriptionTitle} lastYear={material.lastYear}
                                                   price={material.Price_Over_300 ? material.Price_Over_300 : material?.sub.length ? Math.min(...material.sub.map(sub => sub.Price_Up_To_100)) : material.Price_Up_To_100}
                                                   category={'materialy'}/>}
                    <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности материала</h2>
                    <div className={categoryStyles.categoryPages_text}>
                        {material.features}
                    </div>

                    <div className={styles.workItem_priceFactor}>
                        {
                            material.materialProperties.list.length ?
                                <>
                                    <h2 className={categoryStyles.categoryPages_title}> Свойства материала</h2>
                                    {
                                        material.materialProperties.list.map((list, index) => {
                                            const text = list.name.split(':');
                                            return (
                                                <div className={styles.workItem_priceFactor_item} key={list.id}>
                                                    <img width={30} height={30} src="/img/rostok.png" alt="rostok"/>
                                                    <div className={styles.workItem_need_item_text}>
                                                        <span>{text[0]}:</span>{text[1]}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                : <></>
                        }

                    </div>
                    {
                        material.categoryId && material.sub && material.sub.length ? (
                            <>
                                <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                                <WorksItemCard works={works} material={material} materials={materials}
                                               activeCategory={activeCategory} materialUrl={material.url}/>
                            </>
                        ) : <></>
                    }


                    {material.categoryId && !material.sub.length ? <>
                        <h1 className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки!</h1>

                        <YandexMapMarsh materials={materials} categories={categories}
                                        activeCategory={activeCategory ? activeCategory.id.toString() : '1'}
                                        deliveryLocation={deliveryLocationResponse.locations as IDeliveryLocation[]}
                                        materialFromLocation={deliveryLocationResponse.materialFromLocation as IMaterialFromLocation[]}/>
                    </> : ""}
                    <h2 className={categoryStyles.categoryPages_title}>Минимальный заказ от 12 кубов!</h2>

                    <div className={categoryStyles.categoryPages_descriptionMin}>
                        Это означает, что
                        при заказе меньшего
                        количества продукции цена будет несколько выше или вовсе отказано в доставке. Возможно,
                        целесообразным будет заказать самосвал
                        на несколько домохозяйств.
                    </div>

                    <div className={styles.workItem_priceFactor}>
                        {
                            material?.need?.list.length ?
                                <>
                                    <h2 className={categoryStyles.categoryPages_title}>{material.need.title}</h2>
                                    <div className={categoryStyles.categoryPages_subTitle}>
                                        {material.need.description}
                                    </div>
                                    <div className={styles.workItem_need}>
                                        {
                                            material.need.list.map((list, index) => (
                                                <div className={styles.workItem_need_item} key={list.id}>
                                                    <img width={30} height={30} src="/img/rostok.png" alt="rostok"/>
                                                    <div className={styles.workItem_need_item_text}>
                                                        <span>{list.name}:</span>{list.description}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                                : <></>
                        }

                    </div>


                    <div className={styles.workItem_priceFactor}>
                        {
                            material.priceFactor.list.length ?
                                <>
                                    <h2 className={categoryStyles.categoryPages_title}> На цену строительства влияют
                                        несколько факторов:</h2>
                                    {
                                        material.priceFactor.list.map((list, index) => (
                                            <div className={styles.workItem_priceFactor_item} key={list.id}>
                                                <img width={30} height={30} src="/img/rostok.png" alt="rostok"/>
                                                <div className={styles.workItem_priceFactor_item_text}>{list.name}</div>
                                            </div>
                                        ))
                                    }
                                </>
                                : <></>
                        }
                    </div>


                    <h2 className={categoryStyles.categoryPages_title}>Быстрая и недорогая доставка материалов</h2>
                    <div className={categoryStyles.categoryPages_subTitle}>
                        СК «Основа» — компания, которой доверяют. Мы работаем с 2007 года, за это время показали себя
                        как надежный и ответственный партнер и поставщик нерудных материалов. Сделать заявку на расчет
                        стоимости асфальтовой дороги, площадки, парковки вы всегда можете онлайн или по телефону.
                        Построенные нами дороги ежедневно выдерживают большие нагрузки, без проблем переносят любые
                        погодные изменения, долго не нуждаются в ремонте благодаря тщательному соблюдению строгих
                        стандартов качества материалов и технологий укладки асфальта.
                    </div>
                    <h2 className={categoryStyles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
                    <div className={categoryStyles.categoryPages_subTitle}>В нашей компании есть собственный автопарк,
                        за
                        счет чего все работы можно выполнять своими силами. Это позволяет гарантировать клиенту
                        конкурентные
                        цены в сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества.
                    </div>
                    <CarsParkSamosval/>
                    {
                        material.categoryId && !material.sub.length && material.categoryId === 4 ? <>
                            <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                            <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                           works={works}/>
                        </> : <></>
                    }

                    {
                        material.categoryId && !material.sub.length && material.categoryId === 5 ? <>
                            <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды нерудных
                                материалов:</h2>
                            <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                           works={works}/>
                        </> : <></>
                    }
                    {
                        (!material.categoryId && !material.sub.length) ? (
                            <>
                                <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                                <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                               works={works}/>
                            </>
                        ) : <></>
                    }

                    {
                        (material.categoryId && material.sub.length) ? (
                            <>
                                <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды нерудных
                                    материалов:</h2>
                                <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                               works={works} bottomMaterialCategory={true}/>
                            </>
                        ) : <></>
                    }

                </div>
            );
        } else {
            return (
                <div>ппц</div>
            )
        }


    } catch (error) {
        console.log("Error fetching data:", error);
        return <div>Error loading data. Please try again later.</div>;
    }
};





