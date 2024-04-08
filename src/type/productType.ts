export type ProductType = {
    name?: string,
    desc?: string,
    id?:number,
    price?:number |string,
    title?: string,
    image? : string,
    description?:string,
    qty?:number
}
export type SingleProductType = {
    name?: string,
    id?:number,
    price:number |string,
    title?: string,
    image? : string,
    description?:string,
}