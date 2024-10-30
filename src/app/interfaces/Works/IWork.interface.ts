import {IPriceFactor} from "../IPriceFactor.interface";
import {INeed} from "../INeed.interface";
import {IImages} from "../IImages.interface";

export interface IWork {
    id: number,
    title: string,
    descriptionTitle: string,
    description: string,
    lastYear: string,
    features: string,
    slogan: string,
    price: string,
    priceDescription: string,
    categoryId: string,
    priceFactor: IPriceFactor,
    need: INeed,
    images: IImages[],
}