import { useSelector } from 'react-redux';
import SelectBox from '../../UI/SelectBox';

const PizzaCrusts = () => {
  const crusts = useSelector((state) => state.pizza.crusts);
  return (
    <SelectBox>
      {crusts.map((crust) => {
        return <option value={crust}>{crust}</option>;
      })}
    </SelectBox>
  );
};
export default PizzaCrusts;
