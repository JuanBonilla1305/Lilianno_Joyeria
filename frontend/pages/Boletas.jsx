import { useEffect, useRef, useState } from "react";

const IFRAME_ID = "gestek-technova-summit-2026-boletas";
const IFRAME_SRC =
  "https://gestekeventost.dpdns.org/embed/technova-summit-2026/boletas?fid=" +
  IFRAME_ID;

export default function Boletas() {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    function handleMessage(e) {
      const d = e.data;
      if (!d || d.gestek !== "alto" || d.fid !== IFRAME_ID) return;
      setHeight(d.alto);
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-24">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-6 text-center">
        Boletas
      </h1>
      <iframe
        ref={iframeRef}
        id={IFRAME_ID}
        src={IFRAME_SRC}
        title="Boletas / tickets — Evento"
        height={height}
        loading="lazy"
        scrolling="no"
        style={{ width: "100%", border: 0, display: "block", overflow: "hidden" }}
      />
    </section>
  );
}
