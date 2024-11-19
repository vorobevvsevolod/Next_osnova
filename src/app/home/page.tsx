
import { FC } from "react";
import { ICategory } from "@/app/interfaces/ICategory.interface";
import {
    CategoriesGetAll,
    DeliveryLocationGetAll,
    GalleryWorksGetAll,
    MaterialsGetAll, WorksGetById
} from "@/services/services";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import Image from "next/image";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";
import {IWork} from "@/app/interfaces/Works/IWork.interface";


const Home: FC = async () => {



    const categories: ICategory[] = await CategoriesGetAll();
    const work: IWork = await WorksGetById(2);
    const galleryWorks: IGalleryWorks[] = await GalleryWorksGetAll();
    const materials: IMaterial[] = await MaterialsGetAll();
    const deliveryLocation: { locations: IDeliveryLocation[], materialFromLocation: IMaterialFromLocation[]} = await DeliveryLocationGetAll();

    if (!categories.length) {
        return <div>Не удалось загрузить категории</div>;
    }

    return (
        <>
            <strong>{work.title}</strong>

            {galleryWorks.map((work) => (
                <div key={work.id}>{work.title}</div>
            ))}


            {deliveryLocation.locations.map((local) => (
                <div key={local.id}>{local.name}</div>
            ))}

            {categories.map((category) => (
                <div key={category.id}>{category.id}</div>
            ))}

            {materials.map((material) => (
                <Image width={300} height={300} src={`${process.env.API_URL}/${material.images[0].url}`} alt={'123'}/>
            ))}
        </>
    );
};

export default Home;
