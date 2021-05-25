import Pizza from './Pizza/Pizza';
import { useSelector } from 'react-redux';
import classes from './Menu.module.css';

const Menu = () => {
  const dummyData = useSelector((state) => state.pizza.dummyData);
  return (
    <div className={classes.menu}>
      {dummyData.map((pizza) => {
        return (
          <div>
            <div>
              <Pizza id={pizza.id} key={pizza.id} item={pizza} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
