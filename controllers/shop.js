const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
  // Product.fetchAll().then(e=>{
  //   const products = e[0] ;
  //
  //     }).catch(err=>{console.log(err);});
  // Product.fetchAll(products => {

  // });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findOne({ where: { id: prodId } }).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      if (products.length > 0) {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        });
      } else {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: [],
        });
      }
    });
};
//---------------------------------------adding to the cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let product;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return fetchedCart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      if (products.length > 0) {
        product = products[0];
        fetchedCart.addProduct(product, {
          through: { quantity: 1 + product.cartItems.quantity },
        });
      } else {
        Product.findOne({ where: { id: prodId } }).then((product) => {
          fetchedCart.addProduct(product, { through: { quantity: 1 } });
        });
      }
    })
    .then(() => res.redirect("/cart"));
};
//---------------deleting from the cart
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user.getCart().then((cart) => {
    cart
      .getProducts({ where: { id: prodId } })
      .then((product) => {
        return product[0].cartItems;
      })
      .then((cartItem) => {
        return cartItem.destroy();
      })
      .then((c) => {
        res.redirect("/cart");
      });
  });
};
//---------------------------------------------------------------------------------------
exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:[`products`]}).then(orders=>{

console.log(orders);

   })
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders:`:D`
  });
};

//--common syntax mistake happens here so take care
exports.postOrders = (req, res, next) => {
  console.log(`:))))))))`);
  req.user.getCart().then((cart) => {
    cart.getProducts().then((products) => {


      req.user.createOrder().then((order) => {

        order
          .addProducts(
            products.map((product) => {
              product.orderItems = {
                quantity: product.dataValues.cartItems.dataValues.quantity,
              };
              return product;
            })
          )

          .then((m) => res.redirect(`/orders`));
      });
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
