import { ICategory } from "@/app/interfaces/ICategory.interface";
import {IMaterial} from "@/app/interfaces/Materials/IMaterial.interface";
import {IDeliveryLocation} from "@/app/interfaces/Materials/IDeliveryLocation.interface";
import {IMaterialFromLocation} from "@/app/interfaces/Materials/IMaterialFromLlocation.interface";
import {IWork} from "@/app/interfaces/Works/IWork.interface";
import {IGalleryWorks} from "@/app/interfaces/Works/IGalleryWorks.interface";

interface DeliveryLocationResponse {
    locations: IDeliveryLocation[];
    materialFromLocation: IMaterialFromLocation[];
}

export async function CategoriesGetAll(): Promise<ICategory[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}


export async function MaterialsGetAll(): Promise<IMaterial[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/materials`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching materials: ", error);
        throw error;
    }
}

export async function MaterialsGetById(id:string): Promise<IMaterial> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/materials/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching materials: ", error);
        throw error;
    }
}

export async function DeliveryLocationGetAll(): Promise<DeliveryLocationResponse> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/deliverylocation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return {
            locations: data.message.locations,
            materialFromLocation: data.message.materialFromLocation
        };

    } catch (error) {
        console.error("Error fetching deliveryLocation: ", error);
        throw error;
    }
}

export async function WorksGetById(id: number): Promise<IWork> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/works/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching deliveryLocation: ", error);
        throw error;
    }
}

export async function WorksGetAll(): Promise<IWork[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/works`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching deliveryLocation: ", error);
        throw error;
    }
}

export async function GalleryWorksGetAll(): Promise<IGalleryWorks[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/galleryworks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error("Error fetching deliveryLocation: ", error);
        throw error;
    }
}
