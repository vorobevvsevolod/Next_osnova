// src/app/home/page.tsx
import { FC } from "react";
import { ICategory } from "@/app/interfaces/ICategory.interface";
import { CategoriesService } from "@/services/cartegories.service";

const Home: FC = async () => {
    let categories: ICategory[] = [];

    try {
        categories = await CategoriesService.getAll();
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
    }

    if (!Array.isArray(categories)) {
        return <div>Не удалось загрузить категории</div>;
    }

    return (
        <>
            {categories.map((category) => (
                <div key={category.id}>{category.id}</div>
            ))}
        </>
    );
};

export default Home;
