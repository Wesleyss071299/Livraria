import { dbQuery, dbQueryFirst } from "../services/db"


export type Product = {
    id: number;
    name: string;
    price: number;
}

const insertProduct = async(product: Product) => {
    await dbQuery(`INSERT INTO product (name, price) VALUES(?, ?)`, [product.name, product.price])
    let final = await dbQuery(`SELECT seq AS Id from sqlite_sequence WHERE name = 'product'`);
    return getProduct(final[0].Id);
}

const updateProduct = async(product: Product) => {
    await dbQuery(`UPDATE product SET name = ?, price = ? WHERE id = ?`, [product.name, product.price, product.id])
    return getProduct(product.id);
}

const listProduct = async() =>{
    const final = await dbQuery(`SELECT * FROM product`);
    return final as Product[];
} 

const getProduct = async(id: number) =>{
    const final = await dbQueryFirst(`SELECT * FROM product WHERE id = ?`, [id]);
    return final as Product | undefined
} 

const deleteProduct = async(id: number) =>{
     await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id]);
} 


export const productModel = {
    insertProduct,
    listProduct,
    getProduct,
    deleteProduct,
    updateProduct
}