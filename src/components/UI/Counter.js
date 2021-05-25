import classes from './Counter.module.css';
const Counter = (props) => {
  return (
    <div className={classes.counter}>
      <button onClick={props.onDecrease}>
        <i class="fas fa-trash"></i>
      </button>
      <label>{props.quantity}</label>
      <button onClick={props.onIncrease}>
        <i class="fas fa-plus"></i>
      </button>
    </div>
  );
};
export default Counter;
