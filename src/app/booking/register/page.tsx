'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculatePrice } from '@/lib/pricing';
import { Shield, CreditCard, CheckCircle } from 'lucide-react';

const RegistrationForm = () => {
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
    isFullRoom: false, // Simplificação para o MVP
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
        <h1 className="text-3xl font-bold mb-4">Reserva Confirmada!</h1>
        <p className="text-gray-600 mb-8">
          Enviamos os detalhes para o seu e-mail. Obrigado por escolher o Hostel Santa Teresa.
        </p>
        <a href="/" className="bg-hostel-blue text-white px-8 py-3 rounded-full font-bold">Voltar para o Início</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">
            {step === 1 ? 'Dados dos Hóspedes' : 'Termos e Pagamento'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border"
                      onChange={e => setFormData({...formData, nome: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CPF</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Identidade (RG)</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cadastro de Turismo</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Filiação</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Endereço Completo</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-3 border" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-hostel-red text-white py-4 rounded-xl font-bold text-lg">
                  Prosseguir para Pagamento
                </button>
              </>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-hostel-blue" />
                    Termos de Uso e Políticas
                  </h3>
                  <div className="text-sm text-gray-600 h-40 overflow-y-auto mb-4 p-2 bg-white border rounded">
                    <p className="mb-2 font-bold uppercase">Regras do Hostel:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Não é permitido pets.</li>
                      <li>Não é permitido bebidas alcoólicas ou drogas.</li>
                      <li>Menores de idade apenas com responsável legal.</li>
                      <li>Check-in: 14h | Check-out: 12h.</li>
                      <li>Cancelamento em cima da hora gera taxa.</li>
                    </ul>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" required checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-5 h-5" />
                    <span className="text-sm font-medium">Li e concordo com os termos acima</span>
                  </label>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-hostel-blue" />
                    Pagamento Online
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input placeholder="Número do Cartão" className="w-full border-gray-300 rounded-lg p-3 border" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM/AA" className="w-full border-gray-300 rounded-lg p-3 border" />
                      <input placeholder="CVV" className="w-full border-gray-300 rounded-lg p-3 border" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-hostel-blue text-white py-4 rounded-xl font-bold text-lg">
                  Finalizar Pagamento (R$ {pricing.total})
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-xl mb-6 border-b pb-4">Resumo da Reserva</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{beds.length} Cama(s)</span>
                <span>R$ {pricing.subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Descontos</span>
                <span>- R$ {pricing.discount}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-2xl text-hostel-blue">
                <span>Total</span>
                <span>R$ {pricing.total}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Pagamento processado de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
