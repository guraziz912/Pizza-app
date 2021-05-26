import './CheckBox.css';

const CheckBox = ({ label, input, onChange, checked }) => {
  return (
    <div>
      <div>{input.name}</div>
      <div>
        <label htmlFor={input.id}>
          <img alt={input.name} src={label} />
        </label>
        <br></br>
        <input
          type="checkbox"
          {...input}
          onChange={onChange}
          checked={checked}
        />
      </div>
    </div>
  );
};
export default CheckBox;
