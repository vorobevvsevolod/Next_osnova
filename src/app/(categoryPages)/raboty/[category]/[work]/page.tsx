'use server'
import {CategoriesGetAll, GalleryWorksGetAll, MaterialsGetAll, WorksGetAll, WorksGetById} from "@/services/services";
import dynamic from "next/dynamic";
import {Metadata, ResolvingMetadata} from "next";
const WorksItemCard = dynamic(() => import("@/app/ui/CategoryElemetns/WorksItemCard"));
const YandexMap = dynamic(() => import("@/app/ui/CategoryElemetns/YandexMap"));
import React from "react";
import styles from './styles.module.scss';
import categoryStyles from "../../../categoryPages.module.scss";
import ImagesTitleBlock from "@/app/ui/ImagesTitleBlock";
import {WorksPropsInterface} from "@/app/interfaces/Works/WorksProps.interface";
import {WorksCategory} from "@/app/(categoryPages)/WorksCategory";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {BreadcrumbList, Product, Service, WithContext} from "schema-dts";
import {OrganizationSchema} from "@/services/OrganizationSchema";



export async function generateStaticParams() {
    const worksList = await WorksGetAll();
    return WorksCategory.flatMap(category =>
        worksList
            .filter(work => work.categoryId === category.id)
            .map(work => ({
                category: category.slug,
                work: work.url,
            }))
    );
}

export async function generateMetadata(
    { params, searchParams }: WorksPropsInterface,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {category, work } = (await params);
    const worksList = await WorksGetAll();
    const workFind = worksList.find(wo => wo.url === work);

    return {
        title: workFind?.seoTitle ? workFind.seoTitle + " от компании «СК Основа» с доставкой недорого в СПб и области - без посредников" : null,
        description: workFind?.seoDescription,
        openGraph: {
            images: [`${process.env.NEXT_PUBLIC_API_URL}/${workFind?.images[0].url}`],
            locale: 'ru_RU'
        },
    }
}

export default async function WorkPageServer(props: WorksPropsInterface) {
    try {
        const params = await props.params;

        const [categories, materials, works, galleryWorks] = await Promise.all([
            CategoriesGetAll(),
            MaterialsGetAll(),
            WorksGetAll(),
            GalleryWorksGetAll(),
        ]);
        const activeCategory = categories.find(cat => cat.url === params.category);
        const work = works.find(work => work.url === params.work);


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
                    item: `${process.env.DOMAIN}/raboty/${params.category}`,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: work?.title || 'Работа',
                    item: `${process.env.DOMAIN}/raboty/${params.category}`,
                }
            ],
        };





        if(work?.id){
            const jsonLdServer: WithContext<Product> = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": work.title,
                "description": work.seoDescription,
                "image": work.images[0].url,
                "brand": {
                    "@type": "Brand",
                    "name": "СК Основа"
                },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "RUB", // Валюта
                    "price": work.price.split(';').length !== 1 ? Number(work.price.split(';')[0]) : work.price.split('-').length !== 1 ? Number(work.price.split('-')[0])  : 500,
                    "url": `${process.env.DOMAIN}/raboty/${activeCategory?.url}/${work?.url}`,
                    "availability": "https://schema.org/InStock"
                }
            };

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
                        <Link href={`/raboty/${activeCategory?.url}`}
                              className={categoryStyles.categoryPages_bread_link}>{activeCategory?.name}</Link>
                        <span>/</span>

                        <span
                            className={`${categoryStyles.categoryPages_bread_link_last} ${categoryStyles.categoryPages_bread_link}`}>{work.title}</span>
                    </div>


                    {work && <ImagesTitleBlock images={work.images} title={work.title} titleDesc={work.descriptionTitle}
                                               lastYear={work.lastYear} category={'raboty'}/>}


                    {
                        activeCategory?.id === 1 ?
                            <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности строительства</h2>
                            : activeCategory?.id === 2 ?
                                <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности работы</h2>
                                : activeCategory?.id === 3 ?
                                    <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности
                                        благоустройства</h2> : ""
                    }

                    <div className={categoryStyles.categoryPages_text}>
                        {work.features}
                    </div>
                    <h2 className={categoryStyles.categoryPages_title}>Стоимость</h2>


                    <table className={styles.workItem_priceTable}>
                        <thead>
                        <tr>
                            <td className={styles.workItem_priceTable_head}>Наименование</td>
                            <td className={styles.workItem_priceTable_head}>Стоимость руб./м2</td>
                        </tr>
                        </thead>
                        <tbody className={styles.workItem_priceTable_body}>
                        <tr>
                            <td className={styles.workItem_priceTable_body_title}>{work.priceDescription}</td>
                            <td className={styles.workItem_priceTable_body_subtitle}>
                                {work.price === "смета" ?
                                    <strong
                                        className={styles.workItem_priceTable_price}> смета </strong> : activeCategory?.id === 1 ? <>от <strong
                                        className={styles.workItem_priceTable_price}>{work.price} </strong> (в
                                        зависимости от толщины слоя дорожной одежды)</> : <>от <strong
                                        className={styles.workItem_priceTable_price}>{work.price} </strong> </>}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div className={styles.workItem_priceFactor}>
                        {
                            work?.need?.list.length ?
                                <>
                                    <h2 className={categoryStyles.categoryPages_title}>{work.need.title}</h2>
                                    <div className={categoryStyles.categoryPages_subTitle}>
                                        {work.need.description}
                                    </div>
                                    <div className={styles.workItem_need}>
                                        {
                                            work.need.list.map((list, index) => (
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

                    <h2 className={categoryStyles.categoryPages_title}>География работ</h2>

                    <YandexMap workId={work.id} galleryWorks={galleryWorks}
                               activeCategory={(activeCategory ? activeCategory.id.toString() : '1')}
                               categories={categories}/>
                    {
                        work.description ? <div className={categoryStyles.categoryPages_description}>
                            {work.description}
                        </div> : <></>
                    }


                    <div className={styles.workItem_priceFactor}>
                        {
                            work.priceFactor.list.length ?
                                <>
                                    <h2 className={categoryStyles.categoryPages_title}> На цену строительства влияют
                                        несколько факторов:</h2>
                                    {
                                        work.priceFactor.list.map((list, index) => {
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

                    <h2 className={categoryStyles.categoryPages_title}>Быстрое и недорогое строительство</h2>
                    <div className={categoryStyles.categoryPages_subTitle}>
                        СК «Основа» — компания, которой доверяют. Мы работаем с 2007 года, за это время показали себя
                        как надежный и ответственный партнер и поставщик нерудных материалов. Сделать заявку на расчет
                        стоимости асфальтовой дороги, площадки, парковки вы всегда можете онлайн или по телефону.
                        Построенные нами дороги ежедневно выдерживают большие нагрузки, без проблем переносят любые
                        погодные изменения, долго не нуждаются в ремонте благодаря тщательному соблюдению строгих
                        стандартов качества материалов и технологий укладки асфальта.
                    </div>

                    <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды работ:</h2>
                    <WorksItemCard materials={materials} works={works} work={work} activeCategory={activeCategory}/>
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





