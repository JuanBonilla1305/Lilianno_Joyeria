export default function Footer() {
  return (
    <footer className="bg-[var(--black)] text-[var(--white)] py-10 text-center mt-20">
      <p className="text-sm text-gray-300">
        © {new Date().getFullYear()} Lilianno Joyería · Elegancia en cada detalle.
      </p>
      <p className="mt-2 text-[var(--gold)] italic">Hecho con amor y brillo ✨</p>
    </footer>
  );
}
