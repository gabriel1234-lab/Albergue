'use client';

import { useState } from 'react';
import { UserPlus, Shield } from 'lucide-react';

export default function EmployeesManagement() {
  const [employees, setEmployees] = useState([
    { name: 'Ricardo Santos', role: 'Administrador', email: 'ricardo@hostel.com' },
    { name: 'Maria Souza', role: 'Funcionário', email: 'maria@hostel.com' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Gerenciar Equipe</h1>
        <button className="bg-hostel-blue text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
          <UserPlus size={20} /> Novo Membro
        </button>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold border-b">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Cargo</th>
              <th className="px-6 py-4">E-mail</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{emp.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${emp.role === 'Administrador' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {emp.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                <td className="px-6 py-4">
                  <button className="text-hostel-blue hover:underline font-bold text-sm">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
