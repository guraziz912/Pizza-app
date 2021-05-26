import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pizzaActions } from '../../../store/pizzaSlice';
import CheckBox from '../../UI/CheckBox';
import { Button, Modal } from 'react-bootstrap';
import classes from './Customization.module.css';
import constants from '../../../utils/constants';
import PizzaSizes from '../Pizza/PizzaSizes';

const Customization = () => {
  const vegToppingsInPizza = useSelector((state) => state.pizza.vegToppings);
  const [vegToppingState, setVegToppingState] = useState({
    Capsicum: false,
    Jalepenos: false,
    Mushrooms: false,
    Corn: false,
  });
  // const [nonVegpizzaTopping, setVegPizzaTopping] = useState([]);
  const [nonVegToppingState, setNonVegToppingState] = useState({
    'Chicken Tikka': false,
    'Chicken Keema': false,
    'Peri Peri Chicken': false,
  });
  const cart = useSelector((state) => state.cart.cartItems);
  const customiseId = useSelector((state) => state.pizza.customizePizzaId);
  let cartItem = null;
  if (cart) {
    cartItem = cart.find((item) => item.id === customiseId);
  }

  useEffect(() => {
    if (cartItem) {
      if (cartItem.vegTopping) {
        for (const i of vegToppingsInPizza) {
          if (cartItem.vegTopping.includes(i.name)) {
            setVegToppingState((prevState) => {
              return { ...prevState, [i.name]: true };
            });
          }
        }
      }
    } else {
      setVegToppingState({
        Capsicum: false,
        Jalepenos: false,
        Mushrooms: false,
        Corn: false,
      });
    }
  }, [cartItem, vegToppingsInPizza]);
  const distpatch = useDispatch();
  const show = useSelector((state) => state.pizza.showCustomization);
  const vegToppings = useSelector((state) => state.pizza.vegToppings);
  const nonVegToppings = useSelector((state) => state.pizza.nonVegToppings);

  const formHandler = (event) => {
    event.preventDefault();
  };
  const resetToppingHandler = () => {
    setVegToppingState({
      Capsicum: false,
      Jalepenos: false,
      Mushrooms: false,
      Corn: false,
    });
    setNonVegToppingState({
      'Chicken Tikka': false,
      'Chicken Keema': false,
      'Peri Peri Chicken': false,
    });
  };
  const handleClose = () => distpatch(pizzaActions.closeModal());
  const addCustomizationHandler = (event) => {
    distpatch(pizzaActions.selectTopping(event.target));

    setVegToppingState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={() => {
          resetToppingHandler();
          handleClose();
        }}
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
              <PizzaSizes id={customiseId} />
            </div>
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
          <Button variant="light" onClick={resetToppingHandler}>
            Reset Toppings
          </Button>
          <Button variant={constants.closeBttnVarient} onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={constants.addToCartBttnVarient}
            onClick={() => {
              resetToppingHandler();
              handleClose();
            }}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default Customization;
