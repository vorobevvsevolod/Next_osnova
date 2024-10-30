export interface INeed {
    title: string,
    description: string,
    workId: number,
    list: [
        {
            id: string,
            name: string,
            description: string,
        }
    ]
}