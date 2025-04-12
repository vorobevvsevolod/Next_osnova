'use client'
import React from 'react';
import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';
// @ts-ignore
import styles from './styles.module.scss';
import {ICategory} from "@/app/interfaces/ICategory.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";
import {ISubcategory} from "@/app/interfaces/ISubcategory.interface";
import Slider from "@/app/ui/Slider";
import Image from "next/image";

interface Props {
    categories: ICategory[];
    activeCategory: string;
    galleryWorks: IGalleryWorks[];
    workId?: number;
}

const YandexMap:React.FC<Props> = (props) => {

    const [galleryWorksFilter, setGalleryWorksFilter] = React.useState<IGalleryWorks[]>(props.galleryWorks);

    const [centerCord, setCenterCord] = React.useState<{cordX: number, cordY: number}>({
        cordX: 0,
        cordY: 0
    })
    const [zoomMapDef, setZoomMapDef] = React.useState<number>(0);
    const [zoomMap, setZoomMap] = React.useState<number>(0);

    const [activeCategoryInner, setActiveCategoryInner] = React.useState<string | null>(null)

    const [activeSubCategory, setActiveSubCategory] = React.useState<number | null>(null)
    const [activeSubCategoryHover, setActiveSubCategoryHover] = React.useState<number | null>(null)
    const [subCategoriesArray, setSubCategoriesArray] = React.useState<ISubcategory[]>([])
    const [showArrayPoints, setShowArrayPoints] = React.useState<boolean>(false)

    const [activePoint, setActivePoint] = React.useState<number>();
    const [activePointItem, setActivePointItem] = React.useState<IGalleryWorks>();
    const [activePointWithActiveCategory, setActivePointWithActiveCategory] = React.useState<number>(0);

    interface Coordinates {
        cordX: number;
        cordY: number;
    }

    const smoothChangeCenterCord = (start: Coordinates, end: Coordinates, startZoom: number, endZoom: number, duration: number) => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const newX = start.cordX + (end.cordX - start.cordX) * easeInOutQuad(progress / duration);
            const newY = start.cordY + (end.cordY - start.cordY) * easeInOutQuad(progress / duration);
            const newZoom = startZoom * Math.pow((endZoom / startZoom), easeInOutQuad(progress / duration));

            setCenterCord({ cordX: newX, cordY: newY });
            setZoomMap(newZoom);
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };
    const calculationCenterCardDefualt = (): {cordX: number, cordY:number} =>{

    const filteredWorks = activeCategoryInner !== null ?  props.galleryWorks.filter(work => work.categoryId === Number(activeCategoryInner)) : props.galleryWorks;

        const center: [number, number] = filteredWorks.reduce((accumulator, work) => {

            return [
                accumulator[0] + parseFloat(work.cordX),
                accumulator[1] + parseFloat(work.cordY)
            ];
        }, [0, 0]);

        return {
            cordX: (center[0] / filteredWorks.length) ,
            cordY: (center[1] / filteredWorks.length)
        }
    }

    React.useEffect(() => {
        if( zoomMapDef){
            if (activeCategoryInner !== null && props.categories.length) {
                const categories = props.categories;

                const NoSubCategories = categories.find(cat => cat.id.toString() === activeCategoryInner)?.sub.map(noSub => {
                    return{
                        ...noSub,
                        count: props.galleryWorks.filter(gall => gall.workId === noSub.idSub && gall.categoryId.toString() === activeCategoryInner).length
                    }
                }) || [];
                NoSubCategories.sort((a, b) => b.count - a.count);
                setSubCategoriesArray(NoSubCategories);
                const filteredWorks = props.galleryWorks.filter(work => work.categoryId === Number(activeCategoryInner));
                setGalleryWorksFilter(filteredWorks);
                console.log(zoomMap);
                smoothChangeCenterCord({cordX: 59.9343, cordY: 30.3351}, calculationCenterCardDefualt(), zoomMap, zoomMap, 1000);
                setCenterCord({cordX: 59.9343, cordY: 30.3351})
            } else {
                const subCategoriesNew:ISubcategory[] = [];
                props.categories.forEach(cat => {
                    if(cat.typeOfServiceId === 1)
                        cat.sub.forEach(catS => {
                            subCategoriesNew.push(catS);
                        });
                });
                const FilterSubCat = subCategoriesNew.map(noFilter => ({
                    ...noFilter,
                    count: props.galleryWorks.filter(gall => gall.workId === noFilter.idSub).length
                }));
                FilterSubCat.sort((a, b) => b.count - a.count);
                setSubCategoriesArray(FilterSubCat);
                console.log(FilterSubCat);
                setGalleryWorksFilter(props.galleryWorks);
            }
        }

    }, [activeCategoryInner, props.galleryWorks, props.workId, props.categories, zoomMapDef]);

    React.useEffect(() => {
        if(zoomMapDef)
        if (activePoint) {
            const activeWork = galleryWorksFilter.find(gal => gal.id === activePoint);
            setActivePointItem(activeWork);
            const cordX = Number(activeWork?.cordX);
            const cordY = Number(activeWork?.cordY);
            smoothChangeCenterCord(calculationCenterCardDefualt(), {cordX, cordY}, zoomMap, 12, 1000);
        } else {
            smoothChangeCenterCord(centerCord, calculationCenterCardDefualt(), zoomMap, zoomMapDef, 1000);
        }
    }, [activePoint, zoomMapDef])

    React.useEffect(() => {
        if(props.activeCategory) setActiveCategoryInner(props.activeCategory);

    }, [props.activeCategory])

    React.useEffect(() => {
        if (props.workId) {
            setActiveSubCategory(props.workId);
        }
    },[props.workId])

    React.useEffect(() => {
        if (window.innerWidth < 450) {
            setZoomMapDef(7.8);
            setZoomMap(7.8);
        } else if (window.innerWidth < 550) {
            setZoomMapDef(8);
            setZoomMap(8);
        } else if (window.innerWidth < 730) {
            setZoomMapDef(8.3);
            setZoomMap(8.3);
        } else if (window.innerWidth > 1200) {
            setZoomMapDef(8.7);
            setZoomMap(8.7);
        } else {
            setZoomMapDef(8.5);
            setZoomMap(8.5);
        }
    },[])



         return (
        <div className={styles.yandexMap}>
            <div  className={styles.yandexMap_tabsCategories_container}>
                <div className={styles.yandexMap_tabsCategories}>

                    <div
                        className={`${styles.yandexMap_tabsCategories_item} ${(activeCategoryInner === null) ? styles.yandexMap_tabsCategories_item_firstActive : ""}`}
                        onClick={() => {
                            setActiveCategoryInner(null);
                            setActiveSubCategory(null)
                        }}>
                        Все
                    </div>
                    {
                        props.categories && props.categories.map((category, index) => {
                            if (category.typeOfServiceId === 1)
                                return (
                                    <div
                                        className={`${styles.yandexMap_tabsCategories_item} ${category.id.toString() === activeCategoryInner ? styles.yandexMap_tabsCategories_item_active : ""}`}
                                        key={index}
                                        onClick={() => setActiveCategoryInner(category.id.toString())}>

                                        {category.name}
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
                <div className={styles.yandexMap_container}>
                    {
                        zoomMap ?
                            <YMaps>
                                <Map
                                    key={`1`}
                                    defaultState={{center: [59.9343, 30.3351], zoom: zoomMap, controls: ["zoomControl"]}}
                                    state={{
                                        center: [centerCord.cordX ? centerCord.cordX : 59.9343, centerCord.cordY ? centerCord.cordY : 30.3351],
                                        zoom: zoomMap
                                    }}
                                    modules={["control.ZoomControl"]}
                                    className={styles.yandexMap_map}
                                >
                                    {galleryWorksFilter.map(galleryWork => (
                                        <Placemark
                                            key={galleryWork.id}
                                            geometry={[Number(galleryWork.cordX), Number(galleryWork.cordY)]}
                                            properties={{
                                                iconCaption: galleryWork.title,
                                            }}
                                            options={
                                                {
                                                    iconColor: (
                                                        (!activePointWithActiveCategory && activePoint === galleryWork.id) ||
                                                        (!activePointWithActiveCategory && !activePoint && !activeSubCategory && activeSubCategoryHover !== null && galleryWork.workId === subCategoriesArray[activeSubCategoryHover].idSub) ||
                                                        (!activePoint && activeSubCategory && !activePointWithActiveCategory && galleryWork.workId === activeSubCategory) ||
                                                        (activePointWithActiveCategory && galleryWork.id == activePointWithActiveCategory)
                                                    ) ? '#ff0000' : '#14a414'
                                                }

                                            }
                                            //'#ff0000' : '#14a414'
                                            onClick={() => {
                                                setActivePoint(galleryWork.id)
                                                setActiveSubCategory(galleryWork.workId)

                                            }}
                                        />
                                    ))}
                                </Map>
                            </YMaps> : <></>
                    }

                    <div className={styles.yandexMap_list}>
                        <div className={styles.yandexMap_containerList}>
                            {
                                subCategoriesArray.length && subCategoriesArray.map((Subcategory, index) => (
                                    <div className={
                                        `${styles.yandexMap_list_item} ${(activeSubCategory === Subcategory.idSub && activePoint) ? styles.yandexMap_list_item_fullMobile : ''}
                             ${((activeSubCategoryHover === index && index === 0) || (index === 0 && Subcategory.idSub === activeSubCategory))
                                            ? styles.yandexMap_list_item_activFirst
                                            : ((activeSubCategoryHover === subCategoriesArray.length - 1 && activeSubCategoryHover === index) || (Subcategory.idSub === activeSubCategory && index === subCategoriesArray.length - 1))
                                                ? styles.yandexMap_list_item_activLast
                                                : ((activeSubCategoryHover !== null && index !== 0 && activeSubCategoryHover === index) || (Subcategory.idSub === activeSubCategory))
                                                    ? styles.yandexMap_list_item_activ
                                                    : ((activeSubCategoryHover !== null && index === activeSubCategoryHover - 1) ||
                                                        (activeSubCategory && index === subCategoriesArray.findIndex(sub => sub.idSub === activeSubCategory) - 1))
                                                        ? styles.yandexMap_list_item_borderLeftDown
                                                        : ((activeSubCategoryHover !== null && index === activeSubCategoryHover + 1) ||
                                                            (activeSubCategory && index === subCategoriesArray.findIndex(sub => sub.idSub === activeSubCategory) + 1))
                                                            ? styles.yandexMap_list_item_borderLeftUp
                                                            : styles.yandexMap_list_item_defualt
                                        } ${activeSubCategory === Subcategory.idSub ? styles.yandexMap_list_item_open : ""}`}
                                         style={{
                                             height: `${!activePoint && activeSubCategory === Subcategory.idSub ? String(galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub).length * 45 + 50 + "px")
                                                 : activePoint && activeSubCategory === Subcategory.idSub ? "440px" : ""}`
                                         }}
                                         key={Subcategory.idSub}

                                         onMouseEnter={() => {
                                             if (!showArrayPoints) {
                                                 setActiveSubCategoryHover(index)
                                             }

                                         }}
                                         onMouseLeave={() => {
                                             if (!showArrayPoints) setActiveSubCategoryHover(null)
                                         }}
                                         onClick={() => {
                                             if (!showArrayPoints || activeSubCategory !== Subcategory.idSub) {
                                                 setShowArrayPoints(true)
                                                 setActiveSubCategory(Subcategory.idSub)
                                             }
                                             setActiveSubCategoryHover(null)
                                             if (activePoint && !activeSubCategory) setActivePoint(0);

                                             if (activePoint && activeSubCategory && Subcategory.idSub !== activeSubCategory) {
                                                 setActivePoint(0)
                                             }
                                         }}
                                    >
                                        <div className={styles.yandexMap_list_item_open_ContainerTitle}>
                                            <div className={`${styles.yandexMap_list_item_open_ContainerTitle_Title}`}>
                                                {activePoint && Subcategory.idSub === activeSubCategory ? activePointItem?.title :
                                                    (activeSubCategory !== Subcategory.idSub) ?
                                                        <>
                                                            <div
                                                                className={styles.yandexMap_list_item_title}>{Subcategory.title}</div>
                                                            <div
                                                                className={styles.yandexMap_list_item_open_ContainerTitle_count}>
                                                                <div
                                                                    className={styles.yandexMap_list_item_open_ContainerTitle_count_number}>{galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub).length}</div>
                                                            </div>
                                                        </>
                                                        : Subcategory.title}
                                            </div>

                                            {
                                                activePoint && Subcategory.idSub === activeSubCategory
                                                    ? <Image width={35} height={35}
                                                             className={styles.yandexMap_list_item_open_ContainerTitle_img_back}
                                                             src="/img/back.svg" alt="close"
                                                             onClick={() => {
                                                                 setActivePoint(0)
                                                             }}/>
                                                    : activeSubCategory === Subcategory.idSub ?
                                                        <Image width={35} height={35}
                                                               className={styles.yandexMap_list_item_open_ContainerTitle_img}
                                                               src="/img/close.svg" alt="close"
                                                               onClick={() => {
                                                                   setShowArrayPoints(false)
                                                                   setActivePoint(0)
                                                                   setActiveSubCategory(null)
                                                               }}/> : ""
                                            }

                                        </div>
                                        {
                                            (activeSubCategory === Subcategory.idSub) &&
                                            <div className={styles.yandexMap_ListPoints_container}>
                                                {!activePoint ?
                                                    <div className={styles.yandexMap_ListPoints}>
                                                        {
                                                            galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub).map(gallery => (
                                                                <div className={styles.yandexMap_ListPoints_item}
                                                                     onMouseEnter={() => {
                                                                         setActivePointWithActiveCategory(gallery.id);
                                                                     }}
                                                                     onMouseLeave={() => {
                                                                         setActivePointWithActiveCategory(0)
                                                                     }}
                                                                     onClick={() => {
                                                                         setActivePoint(gallery.id)
                                                                         setActivePointWithActiveCategory(0);
                                                                     }}
                                                                     key={`${gallery.id}_item`}
                                                                > {gallery.title}</div>
                                                            ))
                                                        }
                                                    </div>
                                                    : <div className={styles.yandexMap_fullItem}>
                                                        <div className={styles.yandexMap_fullItem_slider}>
                                                            <Slider
                                                                images={activePointItem?.img ? activePointItem?.img : []}/>
                                                        </div>
                                                        <div className={styles.yandexMap_fullItem_work}>
                                                            Вид работы:
                                                            <span>{Subcategory.title}</span>
                                                        </div>
                                                        <div className={styles.yandexMap_fullItem_scopeWork}>
                                                            Обьем Работы:
                                                            <span>{activePointItem?.scopeWork}</span>
                                                        </div>
                                                        <div className={styles.yandexMap_fullItem_subtitle}>
                                                            {activePointItem?.subTitle}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            );

            }

            export default React.memo(YandexMap) ;
