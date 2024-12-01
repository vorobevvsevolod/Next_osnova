import {IPriceFactor} from "../IPriceFactor.interface";
import {INeed} from "../INeed.interface";
import {IImages} from "../IImages.interface";
import {IMaterialProperties} from "@/app/interfaces/IMaterialProperties.interface";

export interface IMaterial {
    id: number,
    title: string,
    descriptionTitle: string,
    description: string,
    lastYear: string,
    features: string,
    slogan: string,
    Price_Over_300: number,
    Price_Up_To_300: number,
    Price_Up_To_100: number,
    priceDescription: string,
    categoryId: number,
    priceFactor: IPriceFactor,
    need: INeed,
    materialProperties: IMaterialProperties,
    images: IImages[],
    parentMaterialId: number | null,
    seoTitle: string,
    seoDescription: string,
    sub: IMaterial[],
    url:string;
}