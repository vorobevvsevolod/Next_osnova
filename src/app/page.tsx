"use server"
import categoryStyles from "@/app/(categoryPages)/categoryPages.module.scss";
import styles from "@/app/scss/home.module.scss"

import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    GalleryWorksGetAll,
    MaterialsGetAll,
    WorksGetAll
} from "@/services/services";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import React from "react";
import YandexMapMarsh from "@/app/ui/YandexMapMarsh";
import Link from "next/link";
import YandexMap from "@/app/ui/CategoryElemetns/YandexMap";
import Item from "@/app/ui/CategoryElemetns/WorksItemCard/Item";

export default async function Home() {
    const [categories, materials, works, deliveryLocationResponse, galleryWorks] = await Promise.all([
        CategoriesGetAll(),
        MaterialsGetAll(),
        WorksGetAll(),
        DeliveryLocationGetAll(),
        GalleryWorksGetAll()
    ]);



  return (
      <>
          <div className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки Плодородной земли!</div>

          <YandexMapMarsh materials={materials} categories={categories} activeCategory={"0"}
                          deliveryLocation={deliveryLocationResponse.locations as IDeliveryLocation[]}
                          materialFromLocation={deliveryLocationResponse.materialFromLocation as IMaterialFromLocation[]}/>
          <div style={{margin: "40px 0px 0px 0px"}} className={categoryStyles.categoryPages_titleCenter}>Дорожное
              строительство <br/>и поставка строительных материалов
          </div>

          {
              categories.length && categories.map(category => {
                  if (category.typeOfServiceId === 1)
                      if (works.length)
                          if (works.filter(work => work.categoryId === category.id).length >= 3)
                              return (
                                  <>
                                      <div className={categoryStyles.categoryPages_title}>{category.name}</div>
                                      <div className={styles.containerItem}>

                                          <div className={styles.containerItem_left}>
                                              <img
                                                  src={`${process.env.NEXT_PUBLIC_API_URL}/${works.filter(work => work.categoryId === category.id)[0]?.images[0].url}`}
                                                  alt=""/>
                                              <Link
                                                  href={`/raboty/${category.url}/${works.filter(work => work.categoryId === category.id)[0].url}`}
                                                  className={styles.containerItem_left_title}>{works.filter(work => work.categoryId === category.id)[0].title}
                                                  <img width={40} height={40} src="/img/back.svg" alt=""/>
                                              </Link>
                                          </div>
                                          <div className={styles.containerItem_right}>
                                              <div
                                                  className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_top}`}>
                                                  <img
                                                      className={`${styles.containerItem_right_item_top_img} ${styles.containerItem_right_item_img}`}
                                                      src={`${process.env.NEXT_PUBLIC_API_URL}/${works.filter(work => work.categoryId === category.id)[1].images[0].url}`}
                                                      alt=""/>
                                                  <Link
                                                      href={`/raboty/${category.url}/${works.filter(work => work.categoryId === category.id)[1].url}`}
                                                      className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[1].title}
                                                      <img className={styles.containerItem_right_item_title_img}
                                                           src="/img/back.svg" alt=""/>
                                                  </Link>
                                              </div>

                                              <div
                                                  className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_bottom}`}>
                                                  <img
                                                      className={`${styles.containerItem_right_item_bottom_img} ${styles.containerItem_right_item_img}`}
                                                      src={`${process.env.NEXT_PUBLIC_API_URL}/${works.filter(work => work.categoryId === category.id)[2].images[0].url}`}
                                                      alt=""/>
                                                  <Link
                                                      href={`/raboty/${category.url}/${works.filter(work => work.categoryId === category.id)[2].url}`}
                                                      className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[2].title}
                                                      <img className={styles.containerItem_right_item_title_img}
                                                           src="/img/back.svg" alt=""/>
                                                  </Link>
                                              </div>
                                          </div>

                                      </div>
                                  </>
                              ); else return (
                              <>
                                  <div className={categoryStyles.categoryPages_title}>{category.name}</div>
                                  <div className={styles.containerItem}>

                                      <div className={styles.containerItem_left}>
                                          <img
                                              src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[0].images[0].url}`}
                                              alt=""/>
                                          <Link
                                              href={`/works/${category.url}/${works.filter(work => work.categoryId === category.id)[0].url}`}
                                              className={styles.containerItem_left_title}>{works.filter(work => work.categoryId === category.id)[0].title}
                                              <img width={40} height={40} src="/img/back.svg" alt=""/>
                                          </Link>
                                      </div>
                                      <div className={styles.containerItem_right}>
                                          <div
                                              className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_top}`}>
                                              <img
                                                  className={`${styles.containerItem_right_item_top_img} ${styles.containerItem_right_item_img}`}
                                                  src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[1].images[0].url}`}
                                                  alt=""/>
                                              <Link
                                                  href={`/raboty/${category.url}/${works.filter(work => work.categoryId === category.id)[1].url}`}
                                                  className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[1].title}
                                                  <img className={styles.containerItem_right_item_title_img}
                                                       src="/img/back.svg" alt=""/>
                                              </Link>
                                          </div>

                                      </div>

                                  </div>
                              </>
                          )

              })
          }


          <div className={categoryStyles.categoryPages_title}>География наших работ</div>
          <YandexMap workId={0} galleryWorks={galleryWorks}
                     activeCategory={""}
                     categories={categories}/>

          {
              categories.length && categories.map(category=> {
                  if(category.typeOfServiceId === 2) {
                      // Создаем массив элементов, содержащих компоненты для каждого материала
                      const materialItems = materials
                          .filter(mat => mat.categoryId === category.id)
                          .map(material => {
                              if(material.sub.length){
                                  return material.sub.map(sub => (
                                      <div className={styles.containerItemCardSlider_item}>
                                          <Item  key={sub.id} work={{...sub, price: "от " + String(sub.Price_Up_To_100)}} activeCategoryUrl={"materialy/" + category.url + "/" + material.url}/>

                                      </div>
                                  ))
                              }else {
                                  return (
                                      <div className={styles.containerItemCardSlider_item}>
                                          <Item key={material.id}
                                                work={{...material, price: `от ${String(material.Price_Over_300)} до ${String(material.Price_Up_To_100)}`}}
                                                activeCategoryUrl={"materialy/" + category.url}/>

                                      </div>
                                  )
                              }

                          });

                      return (
                          <>
                              <div className={categoryStyles.categoryPages_title}>{category.name}</div>

                              <div className={styles.containerItemCardSlider}>
                                  {materialItems}
                              </div>
                          </>
                      );
                  }
                  return null;
              })
          }
      </>
  );
}
