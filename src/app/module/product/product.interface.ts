// name (string): The name of the bike.
// brand (string): The manufacturer or brand of the bike.
// price (number): Price of the bike.
// category (string): Type of bike (e.g., Mountain, Road, Hybrid, Electric). Use enum with exact values (Mountain, Road, Hybrid, Electric).
// description (string): A brief description of the bike.
// quantity (number): Quantity of the bike available.
// inStock (boolean): Indicates if the bike is in stock.

export type Tproduct = {
    name:string
    brand:string
    price:number
    category:string
    quantity:number
    inStock:boolean
    description:string
}