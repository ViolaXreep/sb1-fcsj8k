import { useState, useEffect } from 'react';

interface CryptoPrice {
  price: number;
  error: boolean;
  loading: boolean;
}

const FALLBACK_DOGE_PRICE = 0.15; // Fallback price in USD

export function useCryptoPrice() {
  const [dogeState, setDogeState] = useState<CryptoPrice>({
    price: FALLBACK_DOGE_PRICE,
    error: false,
    loading: true
  });

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchPrice = async () => {
      try {
        setDogeState(prev => ({ ...prev, loading: true, error: false }));
        
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd',
          {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDogeState({
          price: data.dogecoin.usd,
          error: false,
          loading: false
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.warn('Using fallback DOGE price due to fetch error:', error);
        setDogeState(prev => ({
          ...prev,
          error: true,
          loading: false
        }));
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const getDogeAmount = (usdPrice: number) => {
    return usdPrice / dogeState.price;
  };

  return {
    dogePrice: dogeState.price,
    isLoading: dogeState.loading,
    hasError: dogeState.error,
    getDogeAmount
  };
}