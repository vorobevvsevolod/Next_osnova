'use server'
import { CategoriesGetAll } from "@/services/services";
import { ICategory } from "@/app/interfaces/ICategory.interface";
import Header from "@/app/ui/Header/header";
import HeaderTop from "@/app/ui/HeaderTop/headerTop";



const HeaderTopServer = async () => {
    let categories: ICategory[] = await CategoriesGetAll();
    return (
        <HeaderTop categories={categories} />
    );
};

export default HeaderTopServer;
