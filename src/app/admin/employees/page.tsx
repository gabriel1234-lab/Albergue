'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function EmployeesManagement() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  // Mock list of 10 employees
  const [employees, setEmployees] = useState([
    { id: 'ST001', name: 'Ricardo Santos', room: '101' },
    { id: 'ST002', name: 'Maria Souza', room: '102' },
    { id: 'ST003', name: 'John Doe', room: '103' },
    { id: 'ST004', name: 'Ana Oliveira', room: '201' },
    { id: 'ST005', name: 'Carlos Lima', room: '202' },
    { id: 'ST006', name: 'Juliana Silva', room: '203' },
    { id: 'ST007', name: 'Pedro Costa', room: '301' },
    { id: 'ST008', name: 'Fernanda Rocha', room: '302' },
    { id: 'ST009', name: 'Lucas Mendes', room: '303' },
    { id: 'ST010', name: 'Beatriz Santos', room: '401' },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const updateRoom = (id: string, room: string) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, room } : emp));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold">{t('manage_team')}</h1>
        <button className="bg-hostel-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-all">
          <UserPlus size={20} /> {t('new_member')}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-black tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">{t('staff_id')}</th>
                <th className="px-6 py-5">{t('name')}</th>
                <th className="px-6 py-5">{t('assign_room')}</th>
                <th className="px-6 py-5">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-gray-400">#{emp.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={emp.room}
                      onChange={(e) => updateRoom(emp.id, e.target.value)}
                      placeholder="Ex: 101"
                      className="w-24 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-hostel-blue outline-none font-bold text-hostel-blue"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert(t('save_config'))}
                      className="text-hostel-blue hover:text-hostel-red transition-colors p-2 rounded-lg hover:bg-gray-100"
                    >
                      <Save size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
