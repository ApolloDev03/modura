export default function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="loader">
      <span className="spinner" />
      <span>{text}</span>
    </div>
  );
}
