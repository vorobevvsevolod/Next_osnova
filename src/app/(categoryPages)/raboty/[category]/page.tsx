'use server';
import { CategoriesGetAll, GalleryWorksGetAll, MaterialsGetAll, WorksGetAll } from "@/services/services";
import dynamic from "next/dynamic";
import { WorksCategory } from '../../WorksCategory';
import { Metadata, ResolvingMetadata } from "next";
import styles from "@/app/(categoryPages)/categoryPages.module.scss";
import React from "react";
import { MaterialsCategory } from "@/app/(categoryPages)/MaterialsCategory";
import {WorksPropsInterface} from "@/app/interfaces/Works/WorksProps.interface";

const CategoryImage = dynamic(() => import("@/app/ui/CategoryElemetns/CategoryImage"));
const WorksItemCard = dynamic(() => import("@/app/ui/CategoryElemetns/WorksItemCard"));
const StagesWork = dynamic(() => import("@/app/ui/CategoryElemetns/StagesWork"));
const CarsPark = dynamic(() => import("@/app/ui/CategoryElemetns/CarsPark"));
const YandexMap = dynamic(() => import("@/app/ui/CategoryElemetns/YandexMap"));



export async function generateStaticParams() {
    return WorksCategory.flatMap(category => {
        return {
            category: category.slug,
        }
    })
}

export async function generateMetadata(
    { params, searchParams }: WorksPropsInterface,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {category } = (await params)
    const filteredInfo = WorksCategory.filter(inf => inf.slug === category);

    return {
        title: filteredInfo[0]?.descriptionTitle ? filteredInfo[0].descriptionTitle + " с доставкой недорого в СПб и области - без посредников" : category,
        description: filteredInfo[0]?.descriptionText ? filteredInfo[0].descriptionText  : "",
        openGraph: {
            images: ['/some-specific-page-image.jpg'],
        },
    }
}

export default async function SlugWorksServer(props: WorksPropsInterface) {
    try {
        const params = await props.params;
        const infoCategory = WorksCategory.filter(inf => inf.slug === params.category)[0];
        const [categories, materials, works, galleryWorks] = await Promise.all([
            CategoriesGetAll(),
            MaterialsGetAll(),
            WorksGetAll(),
            GalleryWorksGetAll(),
        ]);
        const activeCategory = categories.find(cat => cat.url === params.category);
        return (
            <div>
                <h2 className={styles.categoryPages_title}>{infoCategory.title}: <span>{infoCategory.subTitle}</span>
                </h2>
                <CategoryImage imgURL={infoCategory.imgUrl}/>

                <h1 className={styles.categoryPages_litleTitle}>{infoCategory.descriptionTitle}</h1>
                <div className={styles.categoryPages_text}>
                    {infoCategory.descriptionText}
                </div>
                <h1 className={styles.categoryPages_titleCenter}>{infoCategory.titleCenter}</h1>
                <WorksItemCard activeCategory={activeCategory}
                               works={works} materials={materials}/>

                {
                    infoCategory.slug === 'road_construction' ?
                        <StagesWork title={"Технология и этапы строительства дороги"}
                                    subTitle={"При строительстве дорог мы следуем этапам технологии."}
                                    stages={[{
                                        title: "Выемка грунта под основание дороги.",
                                        text: "Проводимые работы зависят от типа местности. Они могут включать в себя выкорчевывание, осушение, проведение дренажа (закрытого или открытого). Если предполагается укладка асфальта, то необходимо оборудование ливневого дренажа.",
                                        img: "/img/road1.jpg"
                                    },
                                        {
                                            title: "Уплотнение основания дороги и укладка геотекстиля.",
                                            text: "После выемки почвы уплотняем основу с помощью грунтового виброкатка. Сверху на ставшей плотной почве расстилаем гкотекстильное полотно, чтобы помешать перемешиванию дорожных слоев.",
                                            img: "/img/road2.jpg"
                                        },
                                        {
                                            title: "Устройство дорожной одежды.",
                                            text: "Этот этап включает в себя поочередную укладку следующих слоев: песка, щебенки и асфальта. Ширина каждого слоя зависит от предназначения дороги. Все материалы, используемые в строительстве, мы берем из собственных карьеров и доставляем на автотранспорте нашей компании. Подобный подход к делу обеспечивает нам первенство в области дорожного строительства.",
                                            img: "/img/road3.jpg"
                                        },
                                        {
                                            title: "Благоустройство обочин.",
                                            text: "На этой стадии производим насыпку обочин из асфальтовой крошки. Затем озеленяем обочины.",
                                            img: "/img/road4.jpg"
                                        }]}/> :
                        infoCategory.slug === 'earthworks' ?
                            <StagesWork title={"Технология и этапы земляных работ"}
                                        subTitle={"Изначально есть три основные группы работ:"}
                                        stages={[{
                                            title: "Подготовительные",
                                            text: "Сюда входит разработка площадки, другие запланированные работы.",
                                            img: "/img/earth1.jpg"
                                        },
                                            {
                                                title: "Основные",
                                                text: "В этом разделе – рытье котлованов и траншей, перемещение грунта, вывоз, уплотнение.",
                                                img: "/img/earth2.jpg"
                                            },
                                            {
                                                title: "Вспомогательные",
                                                text: "Это достаточно объемный раздел, сюда могут войти и работы по благоустройству, и другие – все что потребуется в процессе строительства и обустройства площадок, территория, террас, крыш и т. д.",
                                                img: "/img/earth3.jpg"
                                            }]}/> :
                            infoCategory.slug === 'landscaping' ?
                                <StagesWork title={"Технология и этапы благоустройства территории"}
                                            subTitle={"Изначально есть 4 основных групп работ:"}
                                            stages={[{
                                                title: "Очистка и подготовка участка",
                                                text: "Уборка строймусора и лишней растительности: Мы проводим ручную и механизированную очистку территории от строительных отходов, растений и деревьев. Разработка и подготовка грунта: В случае необходимости, мы производим выбор и обработку грунта, включая пробуривание скважин и траншей, а также уплотнение участка..",
                                                img: "/img/earth1.jpg"
                                            },
                                                {
                                                    title: "Обеспечение дренажа и ливневой канализации",
                                                    text: "Установка элементов ливневой канализации: Мы разрабатываем и устанавливаем системы ливневой канализации для защиты участка от намокания и заболачивания. Выполнение дренажных работ: Особое внимание уделяется дренажным системам для предотвращения подтопления участка во время дождей и таяния снега.",
                                                    img: "/img/landscaping2.jpeg"
                                                },
                                                {
                                                    title: "Подготовка к ландшафтным работам",
                                                    text: "Формирование насыпей и выравнивание участка: Мы осуществляем выравнивание поверхности песком, щебнем или грунтом, сглаживание неровностей и подготовку к последующим ландшафтным работам. Асфальтирование или мощение дорожек и площадок: Проводится укладка асфальта, брусчатки или тротуарной плитки для создания удобных подъездных дорог, тротуаров и парковочных мест.",
                                                    img: "/img/landscaping3.jpeg"
                                                },
                                                {
                                                    title: "Оформление и ландшафтные работы",
                                                    text: "Установка заборов и ограждений: Мы устанавливаем заборы и ограждения из различных материалов, таких как металл, профнастил или кирпич, для обозначения границ участка и обеспечения безопасности. Ландшафтные работы и озеленение: На этом этапе происходит озеленение территории, высадка газонов, цветников, деревьев, а также создание живых изгородей для придания участку живописного вида.",
                                                    img: "/img/landscaping4.jpeg"
                                                }]}/> :
                                <></>
                }


                <h2 className={styles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
                <div className={styles.categoryPages_subTitle}>В нашей компании есть собственный автопарк, за счет чего
                    все работы можно выполнять своими силами. Это позволяет гарантировать клиенту конкурентные цены в
                    сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества:
                </div>
                <CarsPark/>

                <h2 className={styles.categoryPages_title}>География наших работ </h2>
                <YandexMap categories={categories} galleryWorks={galleryWorks}
                           activeCategory={(activeCategory ? activeCategory.id.toString() : '1')}/>


            </div>
        );

    } catch (error) {
        console.log("Error fetching data:", error);
        return <div>Error loading data. Please try again later.</div>;
    }
};





