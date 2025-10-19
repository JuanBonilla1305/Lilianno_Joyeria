import { useEffect, useState } from 'react';
import api from "../src/api";


export default function PanelAdmin(){
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/api/ventas'); // endpoint admin
        setVentas(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">Panel Administrador</h2>
      <div className="mt-4 grid gap-4">
        {ventas.length === 0 ? <p className="text-[var(--color-muted)]">No hay ventas registradas</p> :
          ventas.map(v => (
            <div key={v._id} className="card p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{v.productoNombre}</p>
                <p className="text-[var(--color-muted)]">Fecha: {new Date(v.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-[var(--color-primary)] font-bold"> ${v.total}</div>
            </div>
          ))
        }
      </div>
      <div className="mt-6">
        <button onClick={async () => {
            // ejemplo descarga de reporte: backend debe exponer /api/report?format=pdf
            const res = await api.get('/api/report?format=pdf', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reporte_ventas.pdf`);
            document.body.appendChild(link);
            link.click();
        }} className="btn-primary px-4 py-2 rounded">Generar reporte PDF</button>
      </div>
    </div>
  );
}
