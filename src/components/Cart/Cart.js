import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import emptyCart from '../../assets/emptyCart.png';
import Pizza from '../Pizzas/Pizza/Pizza';
import classes from '../Cart/Cart.module.css';
const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  return (
    <Fragment>
      <Card className={classes.cart}>
        <h2 className={classes.header}>Cart</h2>
        {cart.length === 0 && (
          <img className={classes.cartEmpty} alt="cartEmpty" src={emptyCart} />
        )}
        {cart.length > 0 &&
          cart.map((item) => {
            return <Pizza className={classes.items} type="cart" item={item} />;
          })}
      </Card>
    </Fragment>
  );
};
export default Cart;
