import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    MaterialsGetAll,
    WorksGetAll
} from "@/services/services";
import dynamic from "next/dynamic";
import {MaterialsCategory} from '../../MaterialsCategory';
import {Metadata, ResolvingMetadata} from "next";
import styles from "../../categoryPages.module.scss";
const WorksItemCard = dynamic(() => import("@/app/ui/CategoryElemetns/WorksItemCard"));
const CarsPark = dynamic(() => import("@/app/ui/CategoryElemetns/CarsPark"));
import React from "react";
import ImagesTitleBlock from "@/app/ui/ImagesTitleBlock";
import categoryStyles from "@/app/(categoryPages)/categoryPages.module.scss";
const YandexMapMarsh = dynamic(() => import("@/app/ui/YandexMapMarsh"));
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {MaterialsPropsInterface} from "@/app/interfaces/Materials/MaterialsProps.interface";
import Link from "next/link";
import CarsParkSamosval from "@/app/ui/CategoryElemetns/CarsParkSamosval";
import {BreadcrumbList, Product, Service, WithContext} from "schema-dts";
import {OrganizationSchema} from "@/services/OrganizationSchema";


export async function generateStaticParams() {
    return MaterialsCategory.flatMap(category => {
        return {
            category: category.slug,
        }
    })
}


export async function generateMetadata(
    { params, searchParams }: MaterialsPropsInterface,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {category } = (await params)
    const filteredInfo = MaterialsCategory.filter(inf => inf.slug === category);

    return {
        title: filteredInfo[0]?.seoTitle ? filteredInfo[0].seoTitle: category,
        description: filteredInfo[0]?.seoDescription ? filteredInfo[0].seoDescription : "",
        openGraph: {
            images: [`${filteredInfo[0].imgUrl}`],
        },
    }
}

export default async function SlugMaterialsServer(props: MaterialsPropsInterface) {
    try {
        const params = await props.params;
        const infoCategory = MaterialsCategory.filter(inf => inf.slug === params.category)[0];
        const [categories, materials, works, deliveryLocationResponse] = await Promise.all([
            CategoriesGetAll(),
            MaterialsGetAll(),
            WorksGetAll(),
            DeliveryLocationGetAll()
        ]);
        const activeCategory = categories.find(cat => cat.url === params.category);

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
                }
            ],
        };

        let offers: any[] = [];

        if(activeCategory?.id === 4) {
            offers = materials
                .filter(material => material.categoryId === activeCategory?.id )
                .map(material => ({
                    "@type": "Offer",
                    "name": material.title,
                    "description": material.seoDescription,
                    "price": material.Price_Over_300  ,
                    "priceCurrency": "RUB",
                    "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material.url}`,
                    "availability": "https://schema.org/InStock"
                }));
        }

        if(activeCategory?.id === 5) {
            offers = materials
                .filter(material => material.categoryId === activeCategory?.id && (material.sub.length > 0 || (activeCategory?.id === 5 && !material.sub.length) ))
                .map(material => ({
                    "@type": "Offer",
                    "name": material.title,
                    "description": material.seoDescription,
                    "price":  (material.Price_Up_To_100 === null && material.sub.length)
                            ? Math.min(...material.sub.map(sub => sub.Price_Up_To_100))
                            : material.Price_Up_To_100,
                    "priceCurrency": "RUB",
                    "url": `${process.env.DOMAIN}/materialy/${activeCategory?.url}/${material.url}`,
                    "availability": "https://schema.org/InStock"
                }));
        }


        const jsonLdServer: WithContext<Product> = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": infoCategory.title,
            "description": infoCategory.seoDescription,
            "image": infoCategory.imgUrl,
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "RUB",
                "highPrice": activeCategory?.id === 4
                    ? Math.max(...materials
                        .filter(item => item.Price_Over_300 !== null)
                        .map(item => item.Price_Up_To_100))
                    : Math.max(...materials
                        .filter(item => item.sub.length > 0)
                        .flatMap(item => item.sub.map(sub => sub.Price_Up_To_100))
                    ),

                "lowPrice": activeCategory?.id === 4
                    ? Math.min(...materials
                        .filter(item => item.Price_Over_300 !== null)
                        .map(item => item.Price_Over_300))
                    : Math.min(...materials
                        .filter(item => item.sub.length > 0)
                        .flatMap(item => item.sub.map(sub => sub.Price_Up_To_100))
                    ),
                "offerCount": offers.length,
                "offers": offers,
            }
        }
        return (
            <div>
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
                <ImagesTitleBlock images={[{url: infoCategory.imgUrl, id: "1", workId: "1"}]}
                                  title={infoCategory.title} lastYear={infoCategory.lastYear}
                                  titleDesc={infoCategory.titleDesc}
                                  price={infoCategory.price} category={'materialy'}/>

                <h3 className={categoryStyles.categoryPages_litleTitle}>{infoCategory.subTitle}</h3>

                <div className={categoryStyles.categoryPages_text}>
                    {infoCategory.subTitleText}
                    {infoCategory.seoTitle}
                </div>

                <h2 className={categoryStyles.categoryPages_titleCenter}>{infoCategory.titleCenter} </h2>
                {categories.length ?
                    <WorksItemCard activeCategory={activeCategory} works={works} materials={materials}/> : ""}


                <h2 className={categoryStyles.categoryPages_titleCenter}>{infoCategory.titleCenter}</h2>

                {
                    params.category === 'plodorodnaya-zemlya' ? <table className={styles.categoryPages_priceTable}>
                            <thead>
                            <tr>
                                <td className={styles.categoryPages_priceTable_head}>Вид грунта</td>
                                <td className={styles.categoryPages_priceTable_head}>ЦЕНА ЗА КУБ ОТ 300 М3</td>
                                <td className={styles.categoryPages_priceTable_head}>ЦЕНА ЗА КУБ ДО 300 М3</td>
                                <td className={styles.categoryPages_priceTable_head}>ЦЕНА ЗА КУБ от 12 ДО 100 М3</td>
                            </tr>
                            </thead>
                            <tbody className={styles.categoryPages_priceTable_body}>
                            {
                                materials.length && materials.filter(mat => mat.categoryId === (activeCategory ? activeCategory.id : 4)).map(material => (
                                    <tr key={material.id} className={styles.categoryPages_priceTable_tr}>

                                        <td className={styles.categoryPages_priceTable_body_subtitle}>
                                            <Link
                                                href={activeCategory?.url + "/" + material.url}>{material.priceDescription}</Link>
                                        </td>
                                        <td className={styles.categoryPages_priceTable_body_title}>от <strong className={styles.categoryPages_priceTable_price}>{material.Price_Over_300}</strong>  руб.</td>
                                        <td className={styles.categoryPages_priceTable_body_title}>от  <strong className={styles.categoryPages_priceTable_price}>{material.Price_Up_To_300} </strong> руб.</td>
                                        <td className={styles.categoryPages_priceTable_body_title}>от <strong className={styles.categoryPages_priceTable_price}> {material.Price_Up_To_100} </strong> руб.</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table> :
                        params.category === 'nerudnye-materialy' ? <table className={styles.categoryPages_priceTable}>
                            <thead>
                            <tr>
                                <td className={styles.categoryPages_priceTable_head}>Вид материала</td>
                                <td className={styles.categoryPages_priceTable_head}>ЦЕНА ЗА КУБ/М3</td>

                            </tr>
                            </thead>
                            <tbody className={styles.categoryPages_priceTable_body}>
                            {
                                activeCategory?.id && materials.length && materials
                                    .filter(mat => mat.categoryId === (activeCategory ? activeCategory.id : 4))
                                    .map(material => (
                                        material.sub.map(subMaterial => (
                                            <tr key={subMaterial.id}>
                                                <td className={styles.categoryPages_priceTable_body_subtitle}><Link
                                                    href={`${activeCategory?.url}/${material.url}/${subMaterial.url}`}>{subMaterial.priceDescription}</Link>
                                                </td>
                                                <td className={styles.categoryPages_priceTable_body_title}>от {subMaterial.Price_Up_To_100} руб.</td>
                                            </tr>
                                        ))
                                    ))
                            }
                            </tbody>
                        </table> : <></>
                }
                <h2 className={categoryStyles.categoryPages_title}>Минимальный заказ от 12 кубов!</h2>
                <div className={categoryStyles.categoryPages_descriptionMin}>
                    Это означает, что
                    при заказе меньшего
                    количества продукции цена будет несколько выше или вовсе отказано в доставке. Возможно,
                    целесообразным будет заказать самосвал
                    на несколько домохозяйств.
                </div>
                <h2 className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки!</h2>
                <YandexMapMarsh materials={materials} categories={categories}
                                activeCategory={activeCategory ? activeCategory.id.toString() : '1'}
                                deliveryLocation={deliveryLocationResponse.locations as IDeliveryLocation[]}
                                materialFromLocation={deliveryLocationResponse.materialFromLocation as IMaterialFromLocation[]}/>


                <h2 className={categoryStyles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
                <div className={categoryStyles.categoryPages_subTitle}>В нашей компании есть собственный автопарк, за
                    счет чего все работы можно выполнять своими силами. Это позволяет гарантировать клиенту конкурентные
                    цены в сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества.
                </div>
                <CarsParkSamosval/>
            </div>
        );

    } catch (error) {
        console.log("Error fetching data:", error);
        return <div>Error loading data. Please try again later.</div>;
    }
};





