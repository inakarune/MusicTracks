var cart = function(req, res){
  let cart = req.signedCookies.cart;
  console.log('/cart: ', cart)
  if(!cart){
    res.send([]);
  } 
  res.send(cart);
};

var cart_item = function(req, res){
    console.log('cart.params', req.query)
  let title = req.query.title;
  req.query.piece = 1;
  let cart = req.signedCookies.cart || [];
  
  if(!cart.length){
    cart.push(req.query);
  } else {
    for(let i = 0; i < cart.length; i++){
      if(cart[i].title !== title) {
        cart.push(req.query);
      }
    }
  }

  res.cookie('cart', cart, { signed: true });
  res.redirect('/cart');
};

var cart_delete = function(req, res){console.log('cart delete::::::', req.query)
  let title = req.query.title;
  let cart = req.signedCookies.cart || [];

  if(cart.length){
    for(let i = 0; i < cart.length; i++){
      if(cart[i].title === title){
        cart.splice(i, 1);
      }
    }
  }

  res.cookie('cart', cart, { signed: true });
  res.redirect('/cart');
};

module.exports = {
  cart: cart,
  cart_item: cart_item,
  cart_delete: cart_delete
};
