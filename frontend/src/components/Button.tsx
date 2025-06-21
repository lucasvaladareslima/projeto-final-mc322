export default function Button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-2 text-lg bg-sky-300 text-black rounded-xl hover:bg-sky-400 transition cursor-pointer"
    >
      {label}
    </button>
  );
}
