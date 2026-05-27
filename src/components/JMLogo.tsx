export default function JMLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Jain Mobile Logo"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
