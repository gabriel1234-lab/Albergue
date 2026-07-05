import Link from 'next/link';
import { Bed, Users, TrendingUp, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Camas Ocupadas', value: '142 / 230', icon: <Bed className="text-blue-500" /> },
    { label: 'Check-ins Hoje', value: '18', icon: <Users className="text-green-500" /> },
    { label: 'Receita Mensal', value: 'R$ 45.200', icon: <TrendingUp className="text-purple-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
           <Link href="/admin/rooms" className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50">
             <Bed size={20}/> Quartos
           </Link>
           <Link href="/admin/pricing" className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50">
             <TrendingUp size={20}/> Preços
           </Link>
           <Link href="/admin/employees" className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50">
             <Settings size={20}/> Equipe
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
              <span className="text-gray-500 font-medium">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-bold">Últimas Reservas</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Hóspede</th>
              <th className="px-6 py-4">Cama(s)</th>
              <th className="px-6 py-4">Check-in</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">Hóspede {i}</td>
                <td className="px-6 py-4 text-gray-600">B0{i}, B1{i}</td>
                <td className="px-6 py-4 text-gray-600">20/05/2024</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">Confirmada</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
