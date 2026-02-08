import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Line
} from 'recharts';
import { Activity, Calendar, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const detailedChartData = [
    { date: 'Jan', portfolio: 0, benchmark: 0 },
    { date: 'Feb', portfolio: 2.5, benchmark: 1.2 },
    { date: 'Mar', portfolio: 1.8, benchmark: -0.5 },
    { date: 'Apr', portfolio: 5.2, benchmark: 2.1 },
    { date: 'May', portfolio: 4.8, benchmark: 1.8 },
    { date: 'Jun', portfolio: 8.5, benchmark: 4.2 },
    { date: 'Jul', portfolio: 12.1, benchmark: 5.5 },
    { date: 'Aug', portfolio: 11.5, benchmark: 4.8 },
    { date: 'Sep', portfolio: 14.8, benchmark: 6.2 },
    { date: 'Oct', portfolio: 13.2, benchmark: 5.9 },
    { date: 'Nov', portfolio: 17.5, benchmark: 8.1 },
    { date: 'Dec', portfolio: 21.4, benchmark: 10.5 },
    { date: 'Jan', portfolio: 22.8, benchmark: 11.2 },
    { date: 'Feb', portfolio: 25.2, benchmark: 12.8 },
];

const topAssets = [
    { symbol: "NVDA", name: "NVIDIA Corp.", weight: "12.5%" },
    { symbol: "MSFT", name: "Microsoft", weight: "10.2%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", weight: "8.1%" },
    { symbol: "LLY", name: "Eli Lilly", weight: "6.5%" },
    { symbol: "Cash", name: "USD Liquidity", weight: "5.0%" },
];

const AnimatedNumber = ({ value, suffix = "", isPercentage = false, decimals = 2 }: { value: number, suffix?: string, isPercentage?: boolean, decimals?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
    const display = useTransform(spring, (current) =>
        (current > 0 && isPercentage ? "+" : "") + current.toFixed(decimals) + (isPercentage ? "%" : "") + suffix
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return <motion.span ref={ref} className="tabular-nums">{display}</motion.span>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const portfolioData = payload.find((p: any) => p.dataKey === 'portfolio');
        const benchmarkData = payload.find((p: any) => p.dataKey === 'benchmark');

        const portfolioVal = portfolioData ? portfolioData.value : 0;
        const benchmarkVal = benchmarkData ? benchmarkData.value : 0;

        return (
            <div className="bg-slate-900 text-white p-4 rounded-lg shadow-2xl border border-slate-700 text-xs w-48">
                <p className="font-bold mb-3 text-slate-400 border-b border-slate-700 pb-2">{label} Performance</p>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> ITIC Portfolio:</span>
                        <span className="font-mono font-bold text-red-400">
                            {portfolioVal > 0 ? '+' : ''}{portfolioVal}%
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-500" /> Benchmark:</span>
                        <span className="font-mono font-bold text-slate-400">
                            {benchmarkVal > 0 ? '+' : ''}{benchmarkVal}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const StrategiesPage = () => {
    return (
        <PageTransition>
            <div className="min-h-screen bg-white">
                <Navbar />

                <main className="pt-20">

                    <section className="relative py-20 bg-slate-50 border-b border-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
                        <div className="container mx-auto px-4 relative z-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold uppercase tracking-widest text-red-600 mb-6">
                                    <Activity className="w-4 h-4" /> Live Performance
                                </div>
                                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
                                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Strategies</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                                    Transparent tracking of our Asset Management and Trading portfolios.
                                    We benchmark against the S&P 500 to ensure we deliver real alpha.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">

                            <Tabs defaultValue="am" className="w-full">

                                <div className="flex justify-center mb-10">
                                    <TabsList className="bg-slate-100 p-1 rounded-full border border-slate-200">
                                        <TabsTrigger value="am" className="rounded-full px-8 py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-md transition-all">
                                            Asset Management (Long-Only)
                                        </TabsTrigger>
                                        <TabsTrigger value="quant" className="rounded-full px-8 py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-md transition-all">
                                            Quant Strategies (Alpha)
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="am">
                                    <div className="grid lg:grid-cols-3 gap-6 items-stretch">

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="lg:col-span-2 flex flex-col"
                                        >
                                            <Card className="h-full border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden flex flex-col">
                                                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100 bg-white z-10">
                                                    <div>
                                                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                            Cumulative Returns
                                                            <TooltipProvider>
                                                                <UITooltip>
                                                                    <TooltipTrigger><Info className="w-4 h-4 text-gray-400 cursor-help" /></TooltipTrigger>
                                                                    <TooltipContent>Comparison between ITIC Portfolio and S&P 500 Index</TooltipContent>
                                                                </UITooltip>
                                                            </TooltipProvider>
                                                        </CardTitle>
                                                        <p className="text-sm text-gray-500 mt-1">Time-Weighted Return (TWR) • Since Inception</p>
                                                    </div>
                                                    <div className="flex gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                                            <span className="font-bold text-gray-700">ITIC Portfolio</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                            <span className="font-medium text-gray-500">S&P 500</span>
                                                        </div>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="flex-1 min-h-[450px] p-0 relative bg-white">
                                                    <div className="absolute inset-0 pt-6 pr-2 pb-2">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={detailedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                                <defs>
                                                                    <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                                                                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                                <XAxis
                                                                    dataKey="date"
                                                                    axisLine={false}
                                                                    tickLine={false}
                                                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                                                    dy={10}
                                                                />
                                                                <YAxis
                                                                    axisLine={false}
                                                                    tickLine={false}
                                                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                                                    tickFormatter={(value) => `${value}%`}
                                                                    dx={-10}
                                                                />
                                                                <Tooltip content={<CustomTooltip />} />

                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="benchmark"
                                                                    stroke="#94a3b8"
                                                                    strokeWidth={2}
                                                                    dot={false}
                                                                    strokeDasharray="5 5"
                                                                />

                                                                <Area
                                                                    type="monotone"
                                                                    dataKey="portfolio"
                                                                    stroke="#dc2626"
                                                                    strokeWidth={3}
                                                                    fillOpacity={1}
                                                                    fill="url(#colorPortfolio)"
                                                                />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="lg:col-span-1 flex flex-col"
                                        >
                                            <Card className="h-full border-0 shadow-2xl bg-slate-900 text-white overflow-hidden flex flex-col relative">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                                                <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm z-10">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Top Holdings</h3>
                                                    <div className="space-y-3">
                                                        {topAssets.map((asset, i) => (
                                                            <div key={asset.symbol} className="flex justify-between items-center text-sm">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="font-mono text-slate-500 w-4">{i + 1}.</span>
                                                                    <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700 font-mono">
                                                                        {asset.symbol}
                                                                    </Badge>
                                                                    <span className="text-slate-300 truncate max-w-[100px]">{asset.name}</span>
                                                                </div>
                                                                <span className="font-mono font-bold text-green-400">{asset.weight}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <CardContent className="flex-1 p-8 flex flex-col justify-center gap-8 relative z-10">

                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Cumulative Return</p>
                                                            <div className="text-3xl font-mono font-bold text-white tracking-tight">
                                                                <AnimatedNumber value={25.20} isPercentage />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">CAGR</p>
                                                            <div className="text-3xl font-mono font-bold text-green-400 tracking-tight">
                                                                <AnimatedNumber value={61.38} isPercentage />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Volatility (Ann.)</p>
                                                            <div className="text-2xl font-mono font-bold text-slate-300">
                                                                <AnimatedNumber value={17.03} isPercentage />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sharpe Ratio</p>
                                                            <div className="text-2xl font-mono font-bold text-slate-300">
                                                                <AnimatedNumber value={2.27} />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Max Drawdown</p>
                                                            <div className="text-2xl font-mono font-bold text-red-400">
                                                                <AnimatedNumber value={-7.22} isPercentage />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Alpha</p>
                                                            <div className="text-2xl font-mono font-bold text-blue-400">
                                                                <AnimatedNumber value={4.5} isPercentage />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </CardContent>

                                                <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
                                                    <div className="flex justify-between items-center px-4">
                                                        <span className="text-[10px] font-bold uppercase text-slate-500">Portfolio Beta</span>
                                                        <span className="text-lg font-mono font-bold text-white"><AnimatedNumber value={0.85} /></span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>

                                    </div>
                                </TabsContent>

                                <TabsContent value="quant">
                                    <div className="h-[500px] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 group hover:border-gray-300 transition-colors">
                                        <div className="p-6 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-500">
                                            <Activity className="w-12 h-12 text-red-200" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-700">Quant Strategy Under Development</h3>
                                        <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
                                            We are currently backtesting our algorithmic models. Live performance data will be available in Q4 2024.
                                        </p>
                                    </div>
                                </TabsContent>

                            </Tabs>

                            <div className="mt-16 p-6 bg-gray-50 rounded-xl border border-gray-200 flex gap-4 items-start shadow-inner">
                                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-gray-900">Important Disclaimer</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed text-justify">
                                        The performance data shown above represents a model portfolio managed by the ITIC Asset Management department for educational purposes.
                                        It does not represent actual client accounts, real money trading, or a solicitation to invest.
                                        Past performance is not indicative of future results. All financial metrics are calculated based on historical data and hypothetical execution prices.
                                        The "Benchmark" refers to the SPDR S&P 500 ETF Trust (SPY).
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                </main>
                <Footer />
            </div>
        </PageTransition>
    );
};

export default StrategiesPage;