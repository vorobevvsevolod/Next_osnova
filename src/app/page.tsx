'use server'
import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    GalleryWorksGetAll,
    MaterialsGetAll,
    WorksGetAll
} from "@/services/services";
import HomePageClient from "@/app/ui/HomePageClient/page";
import {OrganizationSchema} from "@/services/OrganizationSchema";
import React from "react";





export default async function Home() {
    const [categories, materials, works, deliveryLocationResponse, galleryWorks] = await Promise.all([
        CategoriesGetAll(),
        MaterialsGetAll(),
        WorksGetAll(),
        DeliveryLocationGetAll(),
        GalleryWorksGetAll()
    ]);

    return(
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(OrganizationSchema)}}
        />
        <HomePageClient works={works} categories={categories} galleryWorks={galleryWorks} materials={materials}
                        deliveryLocationResponse={deliveryLocationResponse}/>
        </>

    )
}