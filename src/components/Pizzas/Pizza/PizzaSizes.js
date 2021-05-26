import { useDispatch, useSelector } from 'react-redux';
import { pizzaActions } from '../../../store/pizzaSlice';
import SelectBox from '../../UI/SelectBox';

const PizzaSizes = ({ id }) => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.pizza.sizes);

  const pizzasData = useSelector((state) => state.pizza.dummyData);

  const pizza = pizzasData.find((pizza) => pizza.id === id);
  const sizeHandler = (event) => {
    dispatch(pizzaActions.addSize({ data: event.target.value, id }));
  };
  console.log('size', pizza.pizzaSize);
  return (
    <SelectBox value={pizza.pizzaSize} onChange={sizeHandler}>
      {sizes.map((size) => {
        return (
          <option selected={pizza.pizzaSize ? true : false} value={size}>
            {size} &emsp;
          </option>
        );
      })}
    </SelectBox>
  );
};
export default PizzaSizes;
