import NavBar from './components/Header/Navbar';
import Menu from './components/Pizzas/Menu';
import Cart from './components/Cart/Cart';
import Customization from './components/Pizzas/Customization/Customization';
import classes from './App.module.css';

function App() {
  return (
    <div>
      <Customization />
      <div>
        <NavBar />
        <br></br>
        <div className={classes.row}>
          <div className={classes.columnLeft}>
            <Menu />
          </div>
          <div className={classes.columnRight}>
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
