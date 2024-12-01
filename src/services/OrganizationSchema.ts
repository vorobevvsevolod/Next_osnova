import {Organization, WithContext} from "schema-dts";

export const OrganizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "СК Основа",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Липовая аллея 9",
        "addressLocality": "Санкт-Петербург",
        "postalCode": "190000",
        "addressCountry": "RU"
    },
    "image": '/img/logoWeb.png',
    "telephone": "+7 (921) 980-62-90",
    "email": "osnova-stroy@mail.ru",
    "url": process.env.DOMAIN,
    "logo": "/img/logoWeb.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 (921) 779-33-19",
        "contactType": "sales",
        "areaServed": "RU",
        "availableLanguage": ["ru"]
    },
    "description": "СК Основа — профессиональные услуги по дорожным и земляным работам в Санкт-Петербурге и Ленинградской области. Оперативность, качество и надежность.",
    "foundingDate": "2007",
    "keywords": "дорожные работы, земляные работы, благоустройство, строительство дорог, плодородный грунт, нерудные материалы",
};