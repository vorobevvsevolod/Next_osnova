import YandexMap from "@/app/ui/CategoryElemetns/YandexMap";
import React from "react";
import {ICategory} from "@/app/interfaces/ICategory.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";
import categoryStyles from "@/app/(categoryPages)/categoryPages.module.scss";

interface Props{
    categories: ICategory[],
    galleryWorks: IGalleryWorks[],
}


export default function GalleryWorksClient(props: Props) {

    return (
        <>
            <h2 className={categoryStyles.categoryPages_title}>Наши работы!</h2>
            <YandexMap
                workId={0}
                galleryWorks={props.galleryWorks}
                activeCategory={''}
                categories={props.categories}
            />
        </>

    )
}