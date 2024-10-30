import axios from "axios";
import {ICategory} from "@/app/interfaces/ICategory.interface";

const API_URL = 'http://localhost:3500/';
axios.defaults.baseURL = API_URL;


export const CategoriesService = {
    async getAll(){
        const {data}  = await axios.get<ICategory[]>('/api/category')
        console.log(data.message);
        return data.message
    }
}


