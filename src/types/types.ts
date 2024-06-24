
export interface IProduct{
    id:number,
    name:string,
    image:string,
    category:string,
    price:number,
    priceFilter:string,
    amount:number,
    totalPrice:number,
    rating:number
}

export interface IComment{
    id:number | undefined,
    nameFor:string | undefined,
    name:string,
    text:string,
    rating:number
}