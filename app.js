//--requiered imports .
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require(`./util/database`);
const Product = require(`./models/product`);
const User = require(`./models/user`);
const Cart = require(`./models/cart`);
const CartItem = require(`./models/cartItem`);
const Order = require(`./models/order`);
const OrderItem = require(`./models/orderItem`);
//------------------------------------------------------------------

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//--attaching the userId to the request to use it b3den

app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//------------ROUTERS-------------//
app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

//-----setting the relations between the models (TABLES) ;
Product.belongsTo(User, { constraints: true, onDelete: `CASCADE` });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });


//-------------------------------------------------------------------

//{force:true}

//------------sync the models together at first --- //
sequelize
  .sync({force:true})
  .then(() => {
    return User.findOne({ where: { id: 1 } });
  })
  .then((user) => {
    if (!user) {
       User.create({ firstName: `ahmed`, email: `mrsawy@sego` }).then(u=>{
        u.createOrder();
        u.createCart();
        return u;
       });

    } else {
      return user;
    }
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });
