import classes from './SelectBox.module.css';
const SelectBox = (props) => {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className={classes.prices}
    >
      {props.children}
    </select>
  );
};
export default SelectBox;
