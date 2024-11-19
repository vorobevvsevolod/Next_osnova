export interface WorksPropsInterface {
    params: Promise<{ category: string, work: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}