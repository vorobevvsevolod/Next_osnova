'use server'
import { CategoriesGetAll } from "@/services/services";
import { ICategory } from "@/app/interfaces/ICategory.interface";
import Header from "@/app/ui/Header/header";



const HeaderServer = async () => {
    let categories: ICategory[] = await CategoriesGetAll();
    return (
        <div>
            <Header categories={categories} />
        </div>
    );
};

export default HeaderServer;
