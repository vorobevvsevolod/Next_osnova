'use client';
import styles from "./styles.module.scss";
import Link from "next/link";
import { ICategory } from "@/app/interfaces/ICategory.interface";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
    categories: ICategory[]; // Определяем тип пропса
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
    const [showSubcategories, setShowSubcategories] = React.useState<string | null>(null);
    const [selectCategory, setSelectCategory] = React.useState<string>("");
    const [activeCategory, setActiveCategory] = React.useState<string>("");

    const pathname = usePathname();

    useEffect(() => {
        setActiveCategory("");
        const pathParts = pathname.split("/");
        const categoryName = pathParts[2]; // Получаем имя категории из URL
        const category = categories.find((cat) => cat.url === categoryName);
        if (category) {
            setActiveCategory(category.id.toString());
        }
    }, [pathname]);

    const сhangeExtantion = (str: string): string => {
        const parts = str.split(".");
        parts[parts.length - 1] = "gif";
        return parts.join(".");
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Логотип */}
                <Link href="/">
                    <div className={styles.header__logo}>
                        <div>
                            <h1>СК Основа</h1>
                            <p>Путь качества в каждой горсти</p>
                        </div>
                    </div>
                </Link>

                {/* Навигация */}
                <nav className={styles.header_left} aria-label="Главная навигация">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`${styles.link} ${
                                selectCategory === category.id.toString() || activeCategory === category.id.toString()
                                    ? styles.link_active
                                    : ""
                            }`}
                            onMouseEnter={() => setShowSubcategories(category.id.toString())}
                            onMouseLeave={() => setShowSubcategories(null)}
                        >
                            {/* Картинка категории */}
                            {(showSubcategories === category.id.toString() || selectCategory === category.id.toString() || category.id.toString() === activeCategory) ? (
                                <Link
                                    href={`/${category.typeOfServiceId === 1 ? "raboty/" + category.url : "materialy/" + category.url}`}
                                >
                                    <div className={styles.header_left_img}>
                                        <Image
                                            width={80}
                                            height={80}
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${сhangeExtantion(category.img)}`}
                                            alt={category.name}
                                        />
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    href={`/${category.typeOfServiceId === 1 ? "raboty/" + category.url : "materialy/" + category.url}`}
                                >
                                    <div>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${category.img}`}
                                            alt={category.name}
                                        />
                                    </div>
                                    <span>{category.name}</span>
                                </Link>
                            )}

                            {/* Подкатегории */}
                            {showSubcategories === category.id.toString() && (
                                <div className={styles.subcategories}>
                                    {category.sub.map((subcategory) => (
                                        <Link
                                            key={subcategory.idSub}
                                            href={`/${
                                                category.typeOfServiceId === 1
                                                    ? "raboty/" + category.url + "/" + subcategory.url
                                                    : "materialy/" + category.url + "/" + subcategory.url
                                            }`}
                                            className={styles.subcategory}
                                        >
                                            {subcategory.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
