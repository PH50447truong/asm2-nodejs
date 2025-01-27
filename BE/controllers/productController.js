import { products } from "../datamock/products";
console.log(products);

function getAllProducts(req, res){
    const {
        name,
        image,
        minPrice,
        maxPrice,
        category,
        page = 1,
        limit = 9,
    } = req.query;

    const minPriceNumber = parseFloat(minPrice) || 0;
    const maxPriceNumber = parseFloat(maxPrice) || Infinity;
    const pageNumber = parseInt(page, 9) || 1;
    const limitNumber = parseInt(limit, 9) || 9;

    let fillterProduct = products;
    if(name){
        fillterProduct = fillterProduct.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
    }
    if(image){
        fillterProduct = fillterProduct.filter((product) => product.image.toLowerCase().includes(image.toLowerCase()))
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
    const {name, price, image} = req.body;
    if (!name || !price || !image){
        return res.status(400).json({message:"name & price & image is not required"});
    }

    const newProduct = {
        id: products.length + 1,
        name,
        image,
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

    const {name, price, image} = req.body;
    if(name) product.name = name;
    if(image) product.image = image;
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