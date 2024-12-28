'use server'
import {
    CategoriesGetAll,
    GalleryWorksGetAll,
} from "@/services/services";
import {OrganizationSchema} from "@/services/OrganizationSchema";
import React from "react";
import GalleryWorksClient from "@/app/(MainPage)/galereya/ClientPage";

import categoryStyles from '../../(categoryPages)/categoryPages.module.scss';
import Contacts from "@/app/(MainPage)/kontakty/ClientPage";



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

            <Contacts/>
        </>

    )
}