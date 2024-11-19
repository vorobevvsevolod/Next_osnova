import {ISubcategory} from "./ISubcategory.interface";

export interface ICategory {
    id: number;
    name: string;
    img: string;
    url:string;
    typeOfServiceId: number;
    sub: ISubcategory[];
}


