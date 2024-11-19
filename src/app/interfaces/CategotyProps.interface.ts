import {ICategory} from "@/app/interfaces/ICategory.interface";
import {IWork} from "@/app/interfaces/Works/IWork.interface";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";
import {WorksCategoryInterface} from "@/app/interfaces/Works/WorksCategory.interface";

export interface CategoryProps{
    categories: ICategory[];
    works: IWork[];
    materials: IMaterial[];
    galleryWorks: IGalleryWorks[];
    information: WorksCategoryInterface;
    activeCategory: string;
}