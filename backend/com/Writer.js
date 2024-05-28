import fs from 'fs';
import path from 'path';
const productsFilePath = path.join(process.cwd(), './com/products.js');
const writeProductsToFile = (products) => {
    const content = `const products = ${JSON.stringify(products, null, 2)};\n\nexport default products;`;
    fs.writeFileSync(productsFilePath, content, 'utf-8');
};

export default writeProductsToFile;