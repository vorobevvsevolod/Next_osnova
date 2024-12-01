'use server'
import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    GalleryWorksGetAll,
    MaterialsGetAll,
    WorksGetAll
} from "@/services/services";
import HomePageClient from "@/app/ui/HomePageClient/page";





export default async function Home() {
    const [categories, materials, works, deliveryLocationResponse, galleryWorks] = await Promise.all([
        CategoriesGetAll(),
        MaterialsGetAll(),
        WorksGetAll(),
        DeliveryLocationGetAll(),
        GalleryWorksGetAll()
    ]);

    return (
        <HomePageClient works={works} categories={categories} galleryWorks={galleryWorks} materials={materials} deliveryLocationResponse={deliveryLocationResponse}/>
    )
}