var cart = function(req, res){
  var cart = req.signedCookies.cart;

  if(!cart){
    res.send([]);
  } 
  res.send(cart);
};

var cart_item = function(req, res){
  var title = req.query.title;
  req.query.piece = 1;
  var cart = req.signedCookies.cart || [];
  
  if(!cart.length){
    cart.push(req.query);
  } else {
    for(var i = 0; i < cart.length; i++){
      if(cart[i].title !== title) {
        cart.push(req.query);
      }
    }
  }

  res.cookie('cart', cart, { signed: true });
  res.redirect('/cart');
};

var cart_delete = function(req, res){
  var title = req.query.title;
  var cart = req.signedCookies.cart || [];

  if(cart.length){
    for(var i = 0; i < cart.length; i++){
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
