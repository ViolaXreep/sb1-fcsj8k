import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { X, Bitcoin, Download, Mail, RefreshCw } from 'lucide-react';
import { useCryptoPrice } from '../hooks/useCryptoPrice';

const DogeCoinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H9h4.5a2.5 2.5 0 0 1 0 5H9" />
  </svg>
);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: {
    title: string;
    price: {
      basic: number;
      withStems: number;
    };
    audioUrl: string;
  };
}

const DOGECOIN_ADDRESS = "DJDC3Jvy2wrmsk2fyrMY6DRMQ6t5g7ejvB";

export default function PaymentModal({ isOpen, onClose, beat }: PaymentModalProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [includeStems, setIncludeStems] = useState(false);
  const { dogePrice, isLoading, hasError, getDogeAmount } = useCryptoPrice();

  if (!isOpen) return null;

  const currentPrice = includeStems ? beat.price.withStems : beat.price.basic;
  const dogePriceUSD = currentPrice - 5; // $5 discount for DOGE payments
  const dogeAmount = getDogeAmount(dogePriceUSD);

  const handleDownload = async () => {
    const response = await fetch(beat.audioUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${beat.title}${includeStems ? '_with_stems' : ''}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setShowEmailPrompt(true);
  };

  const handleEmailDelivery = async () => {
    alert(`Beat${includeStems ? ' and stems' : ''} will be sent to ${email}`);
    setShowEmailPrompt(false);
    onClose();
  };

  const handleCryptoPayment = (type: 'bitcoin' | 'dogecoin') => {
    if (type === 'dogecoin') {
      navigator.clipboard.writeText(DOGECOIN_ADDRESS);
      alert(`Dogecoin address copied to clipboard: ${DOGECOIN_ADDRESS}\nPlease send ${dogeAmount.toFixed(2)} DOGE to complete your purchase.`);
      setIsPaid(true);
    } else {
      alert('Bitcoin payment implementation would go here');
    }
  };

  if (isPaid) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold text-zinc-100 mb-6">Download Your Beat</h3>
          
          {!showEmailPrompt ? (
            <div className="space-y-4">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 py-3 rounded-lg transition-all"
              >
                <Download className="w-5 h-5" />
                Download {beat.title}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-400">Would you like a copy sent to your email?</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEmailDelivery}
                  className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 py-2 rounded-lg"
                >
                  Send to Email
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 py-2 rounded-lg"
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-zinc-100">Purchase {beat.title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-800/50 p-4 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeStems"
                checked={includeStems}
                onChange={(e) => setIncludeStems(e.target.checked)}
                className="rounded border-zinc-600 text-yellow-500 focus:ring-yellow-500"
              />
              <label htmlFor="includeStems" className="text-zinc-400">
                Include Stems (+$10)
              </label>
            </div>
            <div>
              <p className="text-zinc-400 mb-2">Amount to pay:</p>
              <p className="text-2xl font-bold text-zinc-100">${currentPrice}</p>
              <div className="flex items-center gap-2 mt-1">
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 text-zinc-500 animate-spin" />
                ) : hasError ? (
                  <span className="text-sm text-red-400">Using fallback DOGE price</span>
                ) : (
                  <p className="text-sm text-zinc-500">
                    DOGE Price: ${dogePriceUSD} ({dogeAmount.toFixed(2)} DOGE)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b border-zinc-800 pb-4">
              <p className="text-sm text-zinc-400 mb-2">Pay with PayPal:</p>
              <PayPalButtons 
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: currentPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    setIsPaid(true);
                  });
                }}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">Pay with Crypto (Save $5):</p>
              
              <button
                onClick={() => handleCryptoPayment('bitcoin')}
                className="w-full flex items-center justify-center gap-2 bg-[#F7931A]/10 hover:bg-[#F7931A]/20 text-[#F7931A] py-3 rounded-lg transition-all"
              >
                <Bitcoin className="w-5 h-5" />
                Pay with Bitcoin
              </button>

              <button
                onClick={() => handleCryptoPayment('dogecoin')}
                className="w-full flex items-center justify-center gap-2 bg-[#C2A633]/10 hover:bg-[#C2A633]/20 text-[#C2A633] py-3 rounded-lg transition-all"
                disabled={isLoading}
              >
                <DogeCoinIcon />
                Pay with Dogecoin
                {isLoading && <RefreshCw className="w-4 h-4 animate-spin ml-2" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-500 text-center">
            By purchasing, you agree to our terms of service and licensing agreement.
          </p>
        </div>
      </div>
    </div>
  );
}