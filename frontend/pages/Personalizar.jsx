import { useState } from 'react';
import api from "../src/api";


export default function Personalizar(){
  const [form, setForm] = useState({ nombre:'', color:'Oro', material:'Oro', peso: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // endpoint ejemplo -> /api/personalizados (implementar en backend si no existe)
      await api.post('/api/personalizar', form);
      alert('Pedido de personalización enviado');
      setForm({ nombre:'', color:'Oro', material:'Oro', peso: '' });
    } catch (err) {
      console.error(err);
      alert('Error al enviar petición');
    }
  };

  return (
    <div className="max-w-2xl mx-auto card p-8">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">Personaliza tu Joya</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Nombre o descripción" className="w-full p-3 rounded bg-gray-900"/>
        <div className="flex gap-4">
          <select value={form.color} onChange={e=>setForm({...form,color:e.target.value})} className="p-3 rounded bg-gray-900">
            <option>Oro</option>
            <option>Plateado</option>
            <option>Rosado</option>
          </select>
          <select value={form.material} onChange={e=>setForm({...form,material:e.target.value})} className="p-3 rounded bg-gray-900">
            <option>Oro 18k</option>
            <option>Plata</option>
            <option>Acero</option>
          </select>
          <input value={form.peso} onChange={e=>setForm({...form,peso:e.target.value})} placeholder="Peso (g)" className="p-3 rounded bg-gray-900"/>
        </div>
        <button className="btn-primary px-6 py-2 rounded-xl">Enviar Pedido</button>
      </form>
    </div>
  );
}
