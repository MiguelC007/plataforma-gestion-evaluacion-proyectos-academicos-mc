export default function ScoreInput({ label, min, max, value, onChange }) {
  return (
    <label className="form-group small">
      <span>{label}</span>
      <input className="input" type="number" min={min} max={max} value={value} onChange={onChange} />
    </label>
  );
}
