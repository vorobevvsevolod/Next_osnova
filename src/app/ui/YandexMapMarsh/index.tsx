'use client'

import React from 'react';


// @ts-ignore
import styles from './styles.module.scss';
import {useSelector} from "react-redux";
import {ICategory} from "@/app/interfaces/ICategory.interface";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import Script from "next/script";


interface Props {
    activeCategory: string;
    categories: ICategory[];
    deliveryLocation: IDeliveryLocation[];
    materialFromLocation: IMaterialFromLocation[];
    materials: IMaterial[];
    material?: IMaterial;

}

const YandexMapMarsh: React.FC<Props> = (props) => {
    const [activeCategoryInner, setActiveCategoryInner] = React.useState<string | null>(null)
    const [loadYmaps, setLoadYmaps] = React.useState<boolean>(false)
    const [deliveryLocationsFilter, setDeliveryLocationsFilter] = React.useState<IDeliveryLocation[]>()
    const [selectedValue, setSelectedValue] = React.useState<number | null>(null);
    const [coordsDostavka, setCoordsDostavka] = React.useState<{x:number, y:number} | null>(null);
    const [lengthMarsh, setLengthMarsh] = React.useState<number | null>(null);
    const [price, setPrice] = React.useState<number | null>(0);
    const [selectedNumber, setSelectedNumber] = React.useState(12);
    const CountsKyb = [12, 20, 40, 60, 80, 100, 120];

    React.useEffect(() => {
        if(deliveryLocationsFilter?.length){
            const center: [number, number] = deliveryLocationsFilter.reduce((accumulator, loc) => {

                return [
                    accumulator[0] + parseFloat(loc.cordX),
                    accumulator[1] + parseFloat(loc.cordY)
                ];
            }, [0, 0]);

            if(loadYmaps){
                // @ts-ignore
                ymaps.ready(function () {

                    // @ts-ignore
                    var routePromises, myPlacemark, myMap = new ymaps.Map('map', {
                        center: [center[0] / deliveryLocationsFilter.length, center[1] / deliveryLocationsFilter.length],
                        zoom: 9,

                        controls: ['zoomControl', 'typeSelector']
                    });


                    deliveryLocationsFilter.map(del => {
                        // @ts-ignore
                        var myPlacemark = new ymaps.Placemark([del.cordX, del.cordY], {
                            iconCaption: del.name,
                        });
                        // @ts-ignore
                        myMap.geoObjects.add(myPlacemark);

                    })

                    myMap.events.add('click', function (e) {
                        var coords = e.get('coords');
                        // @ts-ignore
                        if (myPlacemark) {
                            myPlacemark.geometry.setCoordinates(coords);
                        } else {
                            // @ts-ignore
                            myPlacemark = new ymaps.Placemark([coords[0], coords[1]], {
                                iconCaption: "Точка доставки",

                            }, {
                                preset: 'islands#circleDotIcon',
                                iconColor: 'red'
                            });
                            myMap.geoObjects.add(myPlacemark);
                        }
                        setCoordsDostavka({x: coords[0], y: coords[1]});

                        document.getElementById('marsh')?.addEventListener('click', () => {
                            // @ts-ignore
                            if(!routePromises){
                                routePromises = deliveryLocationsFilter.map(del => {

                                    // @ts-ignore
                                    return ymaps.route([
                                        [del.cordX, del.cordY],
                                        [coords[0], coords[1]]
                                    ], {
                                        params: {
                                            reverseGeocoding: true // Включаем обратное геокодирование
                                        },
                                        mapStateAutoApply: true
                                        // @ts-ignore
                                    }).then(function (route) {
                                        return {route: route, length: parseFloat(route.getHumanLength().split('&')[0])}; // Получаем длину маршрута в км
                                    });
                                });
                                Promise.all(routePromises).then(function (routeLengths) {
                                    // Находим минимальную длину маршрута
                                    // @ts-ignore
                                    var shortestRoute = routeLengths.reduce((prev, current) => prev.length < current.length ? prev : current);
                                    if (shortestRoute && shortestRoute.route) {
                                        myMap.geoObjects.removeAll();
                                        myMap.geoObjects.add(shortestRoute.route);
                                        setLengthMarsh(shortestRoute.length)
                                    }
                                });
                            } else {
                                myMap.geoObjects.removeAll();

                                deliveryLocationsFilter.map(del => {
                                    // @ts-ignore
                                    var myPlacemark = new ymaps.Placemark([del.cordX, del.cordY], {
                                        iconCaption: del.name,
                                    });
                                    // @ts-ignore
                                    myMap.geoObjects.add(myPlacemark);

                                })
                                myMap.setCenter([center[0] / deliveryLocationsFilter.length, center[1] / deliveryLocationsFilter.length]);
                                myMap.setZoom(9);
                                routePromises = undefined;
                                myPlacemark = undefined;
                                setPrice(null);
                                setCoordsDostavka(null);
                                setLengthMarsh(null);
                            }

                        })
                    });
                });
            }
            // @ts-ignore


        }


    }, [deliveryLocationsFilter, loadYmaps]);

    React.useEffect(() => {
        if (props.categories.length && props.deliveryLocation.length && props.materialFromLocation.length) {
            setActiveCategoryInner(props.activeCategory);

            const deliveryLocationArray: IDeliveryLocation[] = [];

            props.materialFromLocation.forEach(mat => {

                    const deliveruLoc = props.deliveryLocation.find(del => del.id === mat.deliveryLocationId);
                    if (deliveruLoc) {
                        if (!deliveryLocationArray.some(del => del.id === deliveruLoc.id)) {
                            deliveryLocationArray.push(deliveruLoc);
                        }
                    }

            });

            setDeliveryLocationsFilter(deliveryLocationArray);
        }
    }, [props.activeCategory, props.categories, props.deliveryLocation, props.materialFromLocation]);

    React.useEffect(() =>{
        if(lengthMarsh && selectedValue && selectedNumber){
            const material = props.materials.find(mat => mat.id === selectedValue)
            if(material){
                setPrice(((lengthMarsh * 12 * (selectedNumber < 20 ? 20 : selectedNumber)) + selectedNumber * 700));
            }
        }
    },[lengthMarsh, selectedValue, selectedNumber])

    React.useEffect(() =>{
        if (props.material?.id)setSelectedValue(props.material.id)
        console.log(props.materials.filter(mat => mat.categoryId.toString() === '1'), props.materials);
    },[props.material])


    return (
        <div className={styles.yandexMap}>
            <Script
                src="https://api-maps.yandex.ru/2.1/?apikey=249118d0-45da-42f8-a1e8-83d9f5080248&lang=ru_RU"

                onReady={() => {
                    setLoadYmaps(true)
                }}
                strategy="afterInteractive"
            ></Script>
            <div className={styles.yandexMap_container}>
                <div id="map" className={styles.yandexMap_map}></div>
                <div className={styles.yandexMap_calculation}>
                    <div className={styles.yandexMap_title}><span>Калькулятор</span></div>
                    <div className={styles.yandexMap_calculation_container}>
                        <div className={styles.yandexMap_selectMaterial_title}>Выберите материал:</div>
                        <select className={styles.yandexMap_selectMaterial} value={selectedValue ? selectedValue : "Выберите материал"} onChange={(event) => setSelectedValue(Number( event.target.value))}>
                            <option value="Выберите материал">Выберите материал...</option>
                            {
                                props.materials.length && props.materials.filter(mat => mat.categoryId.toString() === activeCategoryInner).map((materialItem) => (
                                    <option className={styles.yandexMap_selectMaterial_option} key={materialItem.id} value={materialItem.id}>
                                        {materialItem.title}
                                    </option>
                                ))
                            }
                        </select>

                        <div className={styles.yandexMap_selectMaterial_title}>Выберите куб/м3:</div>
                        <div className={styles.yandexMap_kybSelect}>
                            {CountsKyb.map((number) => (
                                <div
                                    key={number}
                                    className={`${styles.yandexMap_kybSelect_item} ${selectedNumber === number ? styles.yandexMap_kybSelect_item_active : styles.yandexMap_kybSelect_item_def}`}
                                    onClick={() => setSelectedNumber(number)}
                                >
                                    <span>{number}</span>
                                </div>
                            ))}
                        </div>
                        {lengthMarsh ? <div className={styles.yandexMap_data}>Длина маршрута: <span>{lengthMarsh}</span> км</div> : <></>}
                    </div>
                    <div className={styles.yandexMap_price}>Цена: <span>{price ? price.toLocaleString() : 0}</span> руб</div>
                    <button
                        id="marsh"
                        className={`${styles.yandexMap_buttonCalculation} ${
                            coordsDostavka && selectedValue
                                ? styles.yandexMap_buttonCalculation_active
                                : styles.yandexMap_buttonCalculation_def
                        }`}
                    >
                        {
                            coordsDostavka ? (
                                price ? (
                                    "Сбросить маршрут"
                                ) : (
                                    selectedValue ? (
                                        "Рассчитать стоимость доставки"
                                    ) : (
                                        "Выберите материал"
                                    )
                                )
                            ) : (
                                "Выберете точку доставки"
                            )
                        }
                    </button>
                </div>
            </div>

        </div>
    );
};

export default YandexMapMarsh;
