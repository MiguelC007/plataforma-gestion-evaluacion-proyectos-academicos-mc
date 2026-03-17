export default function FormInput({ label, ...props }) {
  return (
    <label className="form-group">
      <span>{label}</span>
      <input className="input" {...props} />
    </label>
  );
}
