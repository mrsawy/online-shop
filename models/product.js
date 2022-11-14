const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const Product = sequelize.define(`products`, {
  title: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  imageUrl:Sequelize.STRING
});

module.exports = Product;


//console.log(`7ms`);

// const fs = require("fs");
// const path = require("path");

// const Cart = require("./cart");
// const pool = require(`../util/database`);

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return pool.pool1.execute(
//       `insert INTO node_complete.products (title,description,imageUrl,price) values(?,?,?,?)`,
//       [this.title, this.description, this.imageUrl, this.price]
//     );
//   }

//   static deleteById(id) {
//     getProductsFromFile((products) => {
//       const product = products.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll() {
//     return pool.pool1.execute(`SELECT * FROM node_complete.products`);
//   }

//   static findById(id) {
//     return pool.pool1.execute(
//       `SELECT * FROM node_complete.products where id =?`,
//       [id]
//     );

//   }
// };
