import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="full-center">
      <div className="card" style={{ textAlign: 'center', maxWidth: 420 }}>
        <h2 style={{ marginBottom: 8 }}>Page not found</h2>
        <p className="hint" style={{ marginBottom: 16 }}>The page you are looking for does not exist.</p>
        <Link href="/admin/dashboard" className="btn btn-p">Go to Dashboard</Link>
      </div>
    </div>
  );
}
