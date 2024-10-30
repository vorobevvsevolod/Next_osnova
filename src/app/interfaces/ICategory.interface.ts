import {ISubcategory} from "./ISubcategory.interface";

export interface ICategory {
    id: string;
    name: string;
    img: string,
    typeOfServiceId: number,
    sub: ISubcategory[];
}


