import {IPriceFactor} from "../IPriceFactor.interface";
import {INeed} from "../INeed.interface";
import {IImages} from "../IImages.interface";

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
    categoryId: string,
    priceFactor: IPriceFactor,
    need: INeed,
    images: IImages[],
    parentMaterialId: number | null,
    sub: IMaterial[]
}