import constants from '../../../utils/constants';
import PizzaSizes from './PizzaSizes';
import PizzaCrusts from './PizzaCrusts';
import { useDispatch, useSelector } from 'react-redux';
import { pizzaActions } from '../../../store/pizzaSlice';
import { cartActions } from '../../../store/cartSlice';
import Button from 'react-bootstrap/Button';
import Counter from '../../UI/Counter';
import classes from './Pizza.module.css';
const Pizza = (props) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    image,
    description,
    quantity,
    basePrice,
    topping,
  } = props.item;
  const handleShow = (id) => dispatch(pizzaActions.showModal(id));
  const addToCartHandler = () => {
    dispatch(pizzaActions.quantityIncrease(id)); //quantity handler
    const cartItem = {
      ...props.item,
      quantity: props.item.quantity + 1,
    };
    dispatch(cartActions.addToCart(cartItem));
  };
  const removeToCartHandler = () => {
    dispatch(pizzaActions.quantityDecrease(id));
    dispatch(cartActions.removeFromCart(id));
  };
  const handleClose = () => dispatch(pizzaActions.closeModal());
  let customisationText = ' ';
  for (let i = 0; i < topping.length; i++) {
    customisationText += topping[i] + ', ';
  }

  const isCart = props.type === 'cart';
  return (
    <div>
      <div className={classes.box}>
        <span>
          <img className={classes.img} alt={name} src={image}></img>
        </span>

        <div className={classes.descriptionBox}>
          <span className={classes.name}>{name}</span>
          <span>{description}</span>
          <span>Base Price :{basePrice}</span>
        </div>
        {isCart && <div>{customisationText}</div>}

        {!isCart && (
          <div className={classes.containerSelectBox}>
            <div>
              <p>{constants.sizes}</p>
              <PizzaSizes />
            </div>
            <div>
              <p>{constants.crusts}</p>
              <PizzaCrusts />
            </div>
          </div>
        )}
        <div className={classes.bttn}>
          {!isCart && (
            <Button
              onClick={() => {
                handleShow(id);
              }}
              variant="light"
            >
              Customizations
            </Button>
          )}

          {quantity >= 1 ? (
            <Counter
              onDecrease={removeToCartHandler}
              onIncrease={addToCartHandler}
              quantity={quantity}
            />
          ) : (
            <Button
              variant="outline-success"
              onClick={() => {
                addToCartHandler();
                handleClose();
              }}
            >
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Pizza;
