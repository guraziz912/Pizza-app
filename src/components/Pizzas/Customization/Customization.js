import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pizzaActions } from '../../../store/pizzaSlice';
import CheckBox from '../../UI/CheckBox';
import { Button, Modal } from 'react-bootstrap';
import classes from './Customization.module.css';
import constants from '../../../utils/constants';

const Customization = () => {
  const [pizzaTopping, setPizzaTopping] = useState([]);
  const [vegToppingState, setVegToppingState] = useState({
    Capsicum: false,
    Jalepenos: false,
    Mushrooms: false,
    Corn: false,
  });

  const cart = useSelector((state) => state.cart.cartItems);
  const customiseId = useSelector((state) => state.pizza.customizePizzaId);
  const pizzaInCart = cart.find((pizza) => pizza.id === customiseId);

  useEffect(() => {
    if (pizzaInCart) {
      setPizzaTopping(pizzaInCart.topping);
    }
  }, [pizzaInCart, customiseId]);

  useEffect(() => {
    if (pizzaTopping.length > 0) {
      if (pizzaTopping.includes('Capsicum')) {
        setVegToppingState((prevState) => {
          return { ...prevState, Capsicum: true };
        });
      }
      if (pizzaTopping.includes('Jalepenos')) {
        setVegToppingState((prevState) => {
          return { ...prevState, Jalepenos: true };
        });
      }
      if (pizzaTopping.includes('Corn')) {
        setVegToppingState((prevState) => {
          return { ...prevState, Corn: true };
        });
      }
      if (pizzaTopping.includes('Mushrooms')) {
        setVegToppingState((prevState) => {
          return { ...prevState, Mushrooms: true };
        });
      }
    }
  }, [pizzaTopping, customiseId]);
  const distpatch = useDispatch();
  const show = useSelector((state) => state.pizza.showCustomization);
  const vegToppings = useSelector((state) => state.pizza.vegToppings);
  const nonVegToppings = useSelector((state) => state.pizza.nonVegToppings);

  const formHandler = (event) => {
    event.preventDefault();
  };

  const handleClose = () => distpatch(pizzaActions.closeModal());
  const addCustomizationHandler = (event) => {
    distpatch(pizzaActions.selectTopping(event.target));
  };

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size={constants.modalSize}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{constants.customization}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{constants.vegTopping}</h3>
          <form onSubmit={formHandler}>
            <div className={classes.toppings}>
              {vegToppings.map((toppingData) => {
                return (
                  <ul>
                    <li>
                      <CheckBox
                        label={toppingData.url}
                        input={{
                          id: toppingData.id,
                          name: toppingData.name,
                          value: toppingData.name,
                        }}
                        checked={vegToppingState[toppingData.name]}
                        onChange={addCustomizationHandler}
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
            <h3>{constants.nonVegTopping}</h3>
            <div className={classes.toppings}>
              {nonVegToppings.map((topping) => {
                return (
                  <ul>
                    <li>
                      <CheckBox
                        label={topping.url}
                        input={{
                          id: topping.id,
                          name: topping.name,
                        }}
                        onChange={addCustomizationHandler}
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={constants.closeBttnVarient} onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={constants.addToCartBttnVarient}
            onClick={handleClose}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default Customization;
