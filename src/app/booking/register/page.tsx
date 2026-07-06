'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculatePrice } from '@/lib/pricing';
import { Shield, CreditCard, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const RegistrationForm = () => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const beds = searchParams.get('beds')?.split(',') || [];
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    identidade: '',
    endereco: '',
    filiacao: '',
    turismoId: '',
  });

  const pricing = calculatePrice({
    bedCount: beds.length,
    isFullRoom: false,
    days: 1,
    isHighSeason: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2 && agreed) setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('confirmed_title')}</h1>
        <p className="text-gray-600 mb-8">
          {t('confirmed_desc')}
        </p>
        <a href="/" className="bg-hostel-blue text-white px-8 py-3 rounded-full font-bold">{t('back_home')}</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">
            {step === 1 ? t('guest_data') : t('terms_payment')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('full_name')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border"
                      onChange={e => setFormData({...formData, nome: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('cpf')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('identity')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('tourism_id')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('parentage')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('address_label')}</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-hostel-red text-white py-4 rounded-xl font-bold text-lg">
                  {t('proceed_payment')}
                </button>
              </>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-hostel-blue" />
                    {t('terms_title')}
                  </h3>
                  <div className="text-sm text-gray-600 h-40 overflow-y-auto mb-4 p-2 bg-white border rounded">
                    <p className="mb-2 font-bold uppercase">{t('hostel_rules')}</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>{t('no_pets')}</li>
                      <li>{t('no_alcohol')}</li>
                      <li>{t('minors')}</li>
                      <li>{t('times')}</li>
                      <li>{t('cancellation')}</li>
                    </ul>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" required checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-5 h-5" />
                    <span className="text-sm font-medium">{t('agree_terms')}</span>
                  </label>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-hostel-blue" />
                    {t('online_payment')}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input placeholder={t('card_number')} className="w-full border-gray-300 rounded-lg p-3 border" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM/AA" className="w-full border-gray-300 rounded-lg p-3 border" />
                      <input placeholder="CVV" className="w-full border-gray-300 rounded-lg p-3 border" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-hostel-blue text-white py-4 rounded-xl font-bold text-lg">
                  {t('finish_payment')} (R$ {pricing.total})
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-xl mb-6 border-b pb-4">{t('order_summary')}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{beds.length} {t('beds_selected')}</span>
                <span>R$ {pricing.subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>{t('discounts')}</span>
                <span>- R$ {pricing.discount}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-2xl text-hostel-blue">
                <span>{t('total')}</span>
                <span>R$ {pricing.total}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {t('secure_payment')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div>{t('loading')}</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
