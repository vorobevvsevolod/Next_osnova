'use server'
import {
    CategoriesGetAll,
    GalleryWorksGetAll,
} from "@/services/services";
import {OrganizationSchema} from "@/services/OrganizationSchema";
import React from "react";
import GalleryWorksClient from "@/app/(MainPage)/galereya/ClientPage";

import categoryStyles from '../../(categoryPages)/categoryPages.module.scss';



export default async function Home() {
    const [categories, galleryWorks] = await Promise.all([
        CategoriesGetAll(),
        GalleryWorksGetAll()
    ]);

    return(
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(OrganizationSchema)}}
            />

            <GalleryWorksClient galleryWorks={galleryWorks} categories={categories} />
        </>

    )
}