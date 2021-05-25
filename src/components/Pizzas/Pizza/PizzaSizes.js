import { useSelector } from 'react-redux';
import SelectBox from '../../UI/SelectBox';

const PizzaSizes = () => {
  const sizes = useSelector((state) => state.pizza.sizes);
  const prices = useSelector((state) => state.pizza.prices);
  return (
    <SelectBox>
      {sizes.map((size) => {
        return (
          <option value={size}>
            {size} &emsp;
            {prices[size]}
          </option>
        );
      })}
    </SelectBox>
  );
};
export default PizzaSizes;
