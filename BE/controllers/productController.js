import { products } from "../datamock/products";
console.log(products);

function getAllProducts(req, res){
    const {
        name,
        minPrice,
        maxPrice,
        category,
        page = 1,
        limit = 6,
    } = req.query;

    const minPriceNumber = parseFloat(minPrice) || 0;
    const maxPriceNumber = parseFloat(maxPrice) || Infinity;
    const pageNumber = parseInt(page, 6) || 1;
    const limitNumber = parseInt(limit, 6) || 6;

    let fillterProduct = products;
    if(name){
        fillterProduct = fillterProduct.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
    }
    if(category){
        fillterProduct = fillterProduct.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }
    fillterProduct = fillterProduct.filter((product) => product.price>=minPriceNumber && product.price<=maxPriceNumber)

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const panigateProduct = fillterProduct.slice(startIndex, endIndex)

    res.json({
        page: pageNumber,
        limit: limitNumber,
        total: fillterProduct.length,
        products: panigateProduct,
    })
}

function createProduct(req, res){
    const {name, price} = req.body;
    if (!name || !price){
        return res.status(400).json({message:"name &price is not required"});
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description: "",
        category: "",
    }
    products.push(newProduct)//;
    res.json(newProduct)
}

function getProductById(req, res){
    const {id} = req.params;

    const product = products.find((p) => p.id == id);
    if(!product){
        return res.status(404).json({message: "Product not found"})
    } else {
        res.json(product)
    }  
}

function updateProduct(req, res){
    const {id} = req.params;

    const product = products.find((p) => p.id == id);
    if(!product){
        return res.status(404).json({message: "Product not found"})}

    const {name, price} = req.body;
    if(name) product.name = name;
    if(price) product.price = price;

    res.json(product)
}

function deleteProduct(req, res){
    const {id} = req.params;
    const productIndex = products.findIndex((p) => p.id == id);
    if(productIndex == -1){
        return res.status(404).json({message: "Product not found"})
    }
    products.splice(productIndex, 1)
    res.json({message: "Product deleted"})
}


export { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct }