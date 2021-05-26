import { useSelector, useDispatch } from 'react-redux';
import { pizzaActions } from '../../../store/pizzaSlice';
import SelectBox from '../../UI/SelectBox';

const PizzaCrusts = ({ id }) => {
  const dispatch = useDispatch();
  const crusts = useSelector((state) => state.pizza.crusts);
  const pizzasData = useSelector((state) => state.pizza.dummyData);
  const pizza = pizzasData.find((pizza) => pizza.id === id);
  const crustHandler = (event) => {
    dispatch(pizzaActions.addCrust({ data: event.target.value, id }));
  };
  return (
    <SelectBox value={pizza.pizzaCrust} onChange={crustHandler}>
      {crusts.map((crust) => {
        return (
          <option selected={pizza.pizzaCrust ? 'true' : ''} value={crust}>
            {crust}
          </option>
        );
      })}
    </SelectBox>
  );
};
export default PizzaCrusts;
