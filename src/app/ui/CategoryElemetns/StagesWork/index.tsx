import React from "react";
import {inspect} from "util";
// @ts-ignore
import stylesCategory from "../../../(categoryPages)/categoryPages.module.scss";
// @ts-ignore
import styles from "./styles.module.scss"

const StagesWork:React.FC<{title: string, subTitle: string, stages: {title: string, text: string, img: string}[]}> =(props) =>{
    return(
      <div className={stylesCategory.stagesWork_container}>
            <h1 className={stylesCategory.categoryPages_title}>{props.title}</h1>
            <div className={stylesCategory.categoryPages_subTitle}>{props.subTitle}</div>

          {
              props.stages.length ?
                  props.stages.map((stage, index) => {
                      const adjustedIndex = index + 1; // Добавляем 1 к индексу
                      if (adjustedIndex % 2 === 1) return (
                          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowRight}`} key={index}>
                              <div className={styles.stagesWork_item_TitleText}>
                                  <div className={styles.stagesWork_item_TitleText_title_container}>
                                      <div className={styles.stagesWork_item_TitleText_title}><span>0{adjustedIndex}</span></div>
                                      <span className={styles.stagesWork_item_TitleText_title_back}></span>
                                      <div className={styles.stagesWork_item_TitleText_title_subtitle}>{stage.title}</div>
                                  </div>
                                  <div className={styles.stagesWork_item_TitleText_text}>
                                      {stage.text}
                                  </div>
                              </div>

                              <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusRight}`} src={stage.img} alt="" />
                          </div>
                      ); else return (
                          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowLeft}`} key={index}>
                              <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusLeft}`} src={stage.img} alt="" />
                              <div className={styles.stagesWork_item_TitleText}>
                                  <div className={styles.stagesWork_item_TitleText_title_container}>
                                      <div className={styles.stagesWork_item_TitleText_title}><span>0{adjustedIndex}</span></div>
                                      <span className={styles.stagesWork_item_TitleText_title_back}></span>
                                      <div className={styles.stagesWork_item_TitleText_title_subtitle}>{stage.title}</div>
                                  </div>
                                  <div className={styles.stagesWork_item_TitleText_text}>
                                      {stage.text}
                                  </div>
                              </div>
                          </div>
                      )
                  })
                  : <></>
          }

      </div>
    );
}

export default StagesWork;