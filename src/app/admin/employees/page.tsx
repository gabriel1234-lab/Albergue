'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function EmployeesManagement() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [employees, setEmployees] = useState([
    { name: 'Ricardo Santos', role: 'administrator', email: 'ricardo@hostel.com' },
    { name: 'Maria Souza', role: 'employee', email: 'maria@hostel.com' },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold">{t('manage_team')}</h1>
        <button className="bg-hostel-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <UserPlus size={20} /> {t('new_member')}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold border-b">
              <tr>
                <th className="px-6 py-4">{t('name')}</th>
                <th className="px-6 py-4">{t('role')}</th>
                <th className="px-6 py-4">{t('email')}</th>
                <th className="px-6 py-4">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${emp.role === 'administrator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {t(emp.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{emp.email}</td>
                  <td className="px-6 py-4">
                    <button className="text-hostel-blue hover:underline font-black text-xs uppercase tracking-widest">{t('edit')}</button>
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
