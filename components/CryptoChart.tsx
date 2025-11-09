"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FaBitcoin } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import {fetchCryptoData} from "@/api/crypto";
import Loader from "@/components/Loader";
import ButtonSelect from "@/components/ButtonSelect";

interface CryptoChartProps {
    initialCoin: string;
    initialDays: number;
}

export default function CryptoChart({
                                        initialCoin,
                                        initialDays
                                    }: CryptoChartProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [coin, setCoin] = useState(initialCoin);
    const [days, setDays] = useState(initialDays);
    const [data, setData] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const coins = [
        {
            id: 1,
            label: (
                <span className="flex items-center gap-2">
                    <FaBitcoin  /> Bitcoin
                </span>
            ),
            value: "bitcoin" },
        { id: 2, label: (
                <span className="flex items-center gap-2">
                    <SiSolana /> Solana
                </span>
            ), value: "solana" },
    ];

    const daysOptions = [
        { id: 1, label: "Last 7 days", value: 7 },
        { id: 2, label: "Last 30 days", value: 30 },
        { id: 3, label: "Last 90 days", value: 90 },
    ];

    // Update URL and fetch new data
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("coin", coin);
        params.set("days", days.toString());
        router.replace(`/?${params.toString()}`);

        const fetchData = async () => {
            setLoading(true);
            setError(null); // reset error on new fetch
            try {
                const data = await fetchCryptoData(coin, days);
                setData(data);
            } catch (err) {
                setError("Failed to load data from API (Too Many Requests). Please try again later.");
                setOpenErrorPopup(true);
            } finally {
                setLoading(false);
            }

        };
        fetchData();
    }, [coin, days]);

    return (
        <>
            {openErrorPopup && (
                <div
                    className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => {setOpenErrorPopup(false)}}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-full w-[500px] cursor-auto"
                        onClick={(e) => e.stopPropagation()} // prevent closing on click inside box
                    >
                        <div className={'flex items-center justify-between mb-4'}>
                            <h2 className="text-xl font-semibold text-red-600">Error</h2>
                            <button
                                className="p-2 text-red-600 text-[30px] hover:bg-red-600 hover:text-white cursor-pointer duration-300"
                            onClick={() => setOpenErrorPopup(false)}
                            >
                                <IoClose />
                            </button>
                        </div>
                        <p className={'text-black'}>{error}</p>

                    </div>
                </div>
            )}
            <div className="w-full max-w-3xl flex flex-col items-center bg-white p-6 rounded-xl shadow">
                <div className="flex flex-col items-center justify-center gap-5 mb-6">
                    <ButtonSelect
                        options={coins}
                        value={coin}
                        onChange={setCoin}
                    />
                    <ButtonSelect
                        options={daysOptions}
                        value={days}
                        onChange={setDays}
                    />
                </div>



                {loading ? (
                    <Loader/>
                )
                    :
                    error ? (
                        <div className={'min-h-[300px] text-black flex items-center text-center justify-center'}>
                            {error}
                        </div>
                        ) : (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="time"/>
                                <YAxis/>
                                <Tooltip/>
                                {/*<Line type="monotone" dataKey="price" stroke="#007aff" name={coin} />*/}
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke={coin === "btc" ? "#f2a900" : "#9945FF"}
                                    strokeWidth={3}
                                    dot={false}
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </>
    );
}
