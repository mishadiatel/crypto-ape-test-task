import CryptoChart from "@/components/CryptoChart";
import { FaBitcoin } from "react-icons/fa";


interface PageProps {
  searchParams: { coin?: string; days?: string };
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
  const coin = params?.coin || "bitcoin";
  const days = Number(params?.days) || 7;

  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="flex items-center mb-8 gap-3">
          <FaBitcoin size={40} className="text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800">Crypto Tracker</h1>
        </div>
        <CryptoChart initialCoin={coin} initialDays={days} />
      </main>
  );
}
