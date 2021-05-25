import classes from './SelectBox.module.css';
const SelectBox = (props) => {
  return <select className={classes.prices}>{props.children}</select>;
};
export default SelectBox;
