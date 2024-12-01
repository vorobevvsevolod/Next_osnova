export interface INeed {
    title: string,
    description: string,
    workId?: number,
    materialId?: number,
    list: [
        {
            id: string,
            name: string,
            description: string,
        }
    ]
}