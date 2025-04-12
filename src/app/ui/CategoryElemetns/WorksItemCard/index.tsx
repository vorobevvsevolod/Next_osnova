'use server'

import styles from './styles.module.scss';
import Item from "./Item";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import {IWork} from "@/app/interfaces/Works/IWork.interface";
import {ICategory} from "@/app/interfaces/ICategory.interface";


interface Props {
    work?: IWork;
    material?: IMaterial;
    works: IWork[];
    materials: IMaterial[];
    activeCategory: ICategory | undefined;
    materialUrl?: string;
    bottomMaterialCategory?: boolean;
}

const WorksItemCard: React.FC<Props> =  (props) =>{
    if(props.materials.length && props.works.length)
    return(
        <div className={styles.worksItem_container}>

            {
                 (props.activeCategory && props.activeCategory.typeOfServiceId === 1
                    ? <>

                        {
                            //Это raboty/category
                            props.work && props.work.id ?
                                props.works.filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id !== props.work?.id).map((workMap) => (
                                    <Item key={workMap.id}  work={workMap} activeCategoryUrl={props.activeCategory ? "raboty/" + props.activeCategory.url : 'unpaved_roads'}  />
                                ))
                            //Это raboty/category/work
                                : props.works.filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1')).map((workMap) => (
                                    <Item key={workMap.id} work={workMap} activeCategoryUrl={props.activeCategory ? "raboty/" + props.activeCategory.url : 'unpaved_roads'}/>
                                ))
                        }
                    </>
                    :<>
                        {
                            props.material?.id ? (
                                // это materialy/category/material
                                (props.material.sub && props.material.sub.length ) ?
                                    (
                                    props.bottomMaterialCategory ?

                                        (
                                            props.materials
                                                .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id !== props.material?.id)
                                                .map((matMap) => (
                                                        <Item key={matMap.id} work={{...matMap, price: `${matMap.sub.length ? `${Math.min(...matMap.sub.map(item => item.Price_Up_To_100))}:${Math.max(...matMap.sub.map(item => item.Price_Up_To_100))}`: matMap.Price_Up_To_100 }`}} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'}/>
                                                    )
                                                )
                                        )
                                        :
                                        (
                                            props.materials
                                                .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id === props.material?.id)
                                                .map((matMap) => (
                                                    matMap.sub.map(subMap => (
                                                        <Item key={subMap.id} work={{...subMap, price: `${String(subMap.Price_Up_To_100)}`}} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url + "/" + props.materialUrl : 'unpaved_roads'}/>
                                                    ))
                                                ))
                                        )

                                )


                            : (

                                    (props.material.categoryId ? (
                                        (
                                            props.material.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && !props.material.sub.length ? (
                                                props.materials
                                                    .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id !== props.material?.id)
                                                    .map((matMap) => {
                                                        if(props.activeCategory?.id === 4 ){
                                                            return (
                                                                <Item key={matMap.id} work={{...matMap, price: `${String(matMap.id === 26 ? matMap.Price_Over_300 : matMap.Price_Up_To_100)}`}} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'}/>
                                                            )
                                                        } else { return (
                                                            <Item
                                                                key={matMap.id}
                                                                work={{
                                                                    ...matMap,
                                                                    price: `${Math.min(...matMap.sub.map(item => item.Price_Up_To_100))}:${Math.max(...matMap.sub.map(item => item.Price_Up_To_100))}`
                                                                }}
                                                                activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'}
                                                            />
                                                        );
                                                    }
                                                    })
                                            ) : (
                                                props.materials
                                                .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id !== props.material?.id)
                                                .map((matMap) => {
                                                    return <Item key={matMap.id} work={{...matMap, price: `${String(matMap.Price_Over_300)}:${String(matMap.Price_Up_To_100)}`}} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'}/>;
                                                })
                                            )
                                        )

                                    ) : (
                                        props.materials
                                            .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1') && workFilter.id === props.material?.parentMaterialId)
                                            .map((matMap) => {

                                                if (matMap.sub && matMap.sub.length) {
                                                   return  matMap.sub.map(sub => {
                                                       if(sub.id !== props.material?.id) return  <Item key={sub.id} work={{...sub, price: `${String(sub.Price_Up_To_100)}`}} activeCategoryUrl={props.activeCategory ? `materialy/${props.activeCategory.url}/${matMap.url}/` : 'unpaved_roads'}/>
                                                   }
                                                    );
                                                }
                                            })
                                    ))
                                )
                            ) : (
                                // это materialy/category
                                props.materials
                                    .filter(workFilter => workFilter.categoryId === (props.activeCategory ? props.activeCategory.id : '1'))
                                    .map((matMap) => {
                                        if (matMap.sub.length) {
                                            // Если есть подкатегории
                                            let min = matMap.sub[0].Price_Up_To_100, max = 0;

                                            matMap.sub.forEach(subMap => {
                                                if (subMap.Price_Up_To_100 > max) max = subMap.Price_Up_To_100;
                                                if (subMap.Price_Up_To_100 < min) min = subMap.Price_Up_To_100;
                                            });

                                            return <Item key={matMap.id} work={{...matMap, price: `${String(min)}:${String(max)}`}} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'}/>;
                                        } else {
                                            // Если нет подкатегорий
                                            return <Item key={matMap.id} work={{...matMap, price: matMap.Price_Over_300 ?  `${String(matMap.Price_Over_300)}:${String(matMap.Price_Up_To_100)}` : `${matMap.Price_Up_To_100}` }} activeCategoryUrl={props.activeCategory ? "materialy/" + props.activeCategory.url : 'unpaved_roads'} />;
                                        }
                                    })
                            )
                        }

                    </>
                )
            }
        </div>
    );
}

export default WorksItemCard;