export interface MaterialsPropsInterface {
    params: Promise<{ category: string, material: string, type: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}