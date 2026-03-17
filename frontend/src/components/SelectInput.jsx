export default function SelectInput({ label, options, multiple = false, ...props }) {
  return (
    <label className="form-group">
      <span>{label}</span>
      <select className="input" multiple={multiple} {...props}>
        {!multiple && <option value="">Seleccione</option>}
        {options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
    </label>
  );
}
