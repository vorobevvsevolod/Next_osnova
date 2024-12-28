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
import styles from '../../../../workItem.module.scss';
import categoryStyles from "../../../../categoryPages.module.scss";
import ImagesTitleBlock from "@/app/ui/ImagesTitleBlock";
import YandexMapMarsh from "@/app/ui/YandexMapMarsh";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {MaterialsPropsInterface} from "@/app/interfaces/Materials/MaterialsProps.interface";
import {MaterialsCategory} from "@/app/(categoryPages)/MaterialsCategory";
import Link from "next/link";
import CarsPark from "@/app/ui/CategoryElemetns/CarsPark";
import CarsParkSamosval from "@/app/ui/CategoryElemetns/CarsParkSamosval";
import {BreadcrumbList, Product, WithContext} from "schema-dts";
import {OrganizationSchema} from "@/services/OrganizationSchema";

export async function generateStaticParams() {
    const materialList = await MaterialsGetAll();

    return MaterialsCategory.flatMap(category =>
        materialList
            .filter(material => material.categoryId === category.id)
            .flatMap(material =>
                material.sub.map(matSub => ({
                    category: category.slug,
                    material: material.url,
                    type: matSub.url
                }))
            )
    ).filter(Boolean);
}


export async function generateMetadata(
    { params, searchParams }: MaterialsPropsInterface,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {category, material, type } = (await params)
    const materials = await MaterialsGetAll();

    const materialFind = materials.find(work => work.url === material)?.sub.find(mat => mat.url === type);

    return {
        title: materialFind?.seoTitle,
        description: materialFind?.seoDescription,
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
        const material = materials.find(work => work.url === params.material)?.sub.find(mat => mat.url === params.type);

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
                    name: materials.find(work => work.url === params.material)?.title || 'Материал',
                    item: `${process.env.DOMAIN}/materialy/${params.category}/${params.material}`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name:material?.title  || 'Тип',
                    item: `${process.env.DOMAIN}/materialy/${params.category}/${params.material}/${material?.url}`,
                }
            ],
        };


        const jsonLdServer: WithContext<Product> = {
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
                "price": material?.Price_Up_To_100,
                "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material?.url}`,
                "availability": "https://schema.org/InStock"
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
                        <Link
                            href={`/materialy/${activeCategory?.url}/${materials.find(work => work.url === params.material)?.url}`}
                            className={categoryStyles.categoryPages_bread_link}>{materials.find(work => work.url === params.material)?.title}</Link>

                        <span>/</span>
                        <span
                            className={`${categoryStyles.categoryPages_bread_link_last} ${categoryStyles.categoryPages_bread_link}`}>{material.title}</span>
                    </div>

                    {material && <ImagesTitleBlock images={material.images} title={material.title}
                                                   titleDesc={material.descriptionTitle} lastYear={material.lastYear}
                                                   price={material.Price_Over_300 ? material.Price_Over_300 : material?.sub ? Math.min(...material.sub.map(sub => sub.Price_Up_To_100)) : material.Price_Up_To_100}
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
                                    <div className={styles.workItem_properties}>
                                        {
                                            material.materialProperties.list.map((list, index) => {
                                                const text = list.name.split(':');
                                                return (
                                                    <div className={styles.workItem_properties_item} key={list.id}>
                                                        <div className={styles.workItem_properties_item_index}>0{index + 1}</div>
                                                        <div className={styles.workItem_properties_item_title}> <span>{text[0]}</span></div>
                                                        <div className={styles.workItem_properties_item_text}>{text[1]}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                                : <></>
                        }

                    </div>
                    {
                        material.categoryId && material.sub && material.sub.length ? (
                            <>
                                <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                                <WorksItemCard works={works} material={material} materials={materials}
                                               activeCategory={activeCategory}/>
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

                    {
                        material.description ? <div className={categoryStyles.categoryPages_description}>
                            {material.description}
                        </div> : <></>
                    }

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
                        material.categoryId && !material.sub.length ? <>
                            <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                            <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                           works={works}/>
                        </> : <></>
                    }
                    {
                        (!material.categoryId && !material.sub) && (
                            <>
                                <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                                <WorksItemCard activeCategory={activeCategory} materials={materials} material={material}
                                               works={works}/>
                            </>
                        )
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





