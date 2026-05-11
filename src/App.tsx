/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  UserPlus, 
  Coins, 
  ArrowRight,
  Info,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface CalculatorProps {
  title: string;
  id: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  result: number;
  unit?: string;
  isAnnual?: boolean;
}

const Card = ({ title, id, description, icon, children, result, unit = "$", isAnnual = true, badge, formula }: CalculatorProps & { badge?: string, formula?: string }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
      id={id}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            {badge && (
              <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {badge}
              </span>
            )}
            <h3 className="text-lg font-bold text-gray-900 mt-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-snug mt-1">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {unit}{result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
              {isAnnual ? 'Annual Savings' : 'Monthly Capture'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {children}
        </div>
      </div>

      {formula && (
        <p className="text-[10px] font-mono text-gray-400 mt-6 pt-4 border-t border-gray-50">
          FORMULA: {formula}
        </p>
      )}
    </motion.div>
  );
};

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon?: ReactNode;
  suffix?: string;
  prefix?: string;
  min?: number;
  step?: number;
}

const InputField = ({ label, value, onChange, icon, suffix, prefix, min = 0, step = 1 }: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="text-[0.8rem] font-medium text-gray-700 block">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          step={step}
          className="w-full bg-gray-50 border border-gray-300 rounded-md py-1.5 px-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-gray-400"
          placeholder={prefix ? `${prefix}0` : '0'}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-bold uppercase pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  // 1. Direct Labor Savings
  const [laborHours, setLaborHours] = useState(5);
  const [laborRate, setLaborRate] = useState(30);
  const laborSavings = useMemo(() => (laborHours * laborRate) * 52, [laborHours, laborRate]);

  // 2. Speed-to-Lead
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  const [convIncrease, setConvIncrease] = useState(5);
  const [avgSale, setAvgSale] = useState(1000);
  const speedToLeadValue = useMemo(() => (monthlyLeads * (convIncrease / 100)) * avgSale, [monthlyLeads, convIncrease, avgSale]);
  const annualizedSpeedToLead = speedToLeadValue * 12;

  // 3. Opportunity Cost
  const [adminHours, setAdminHours] = useState(10); // monthly
  const [founderRate, setFounderRate] = useState(200);
  const [marketRate, setMarketRate] = useState(25);
  const monthlyOppCost = (adminHours * (founderRate - marketRate));
  const annualOppCost = monthlyOppCost * 12;

  const totalImpact = laborSavings + annualizedSpeedToLead + annualOppCost;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans selection:bg-blue-600 selection:text-white pb-12">
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Calculator size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Digital Intern ROI Architect</h1>
              <p className="text-sm text-gray-500">Calculated investment & impact strategy</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Report ID</span>
              <p className="font-mono text-sm">#AUTO-2026-ROI</p>
            </div>
            <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Status</span>
              <p className="text-sm text-green-600 font-bold uppercase">Analysis Active</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Direct Labor Savings */}
          <Card 
            id="labor-savings"
            title="Direct Labor Savings"
            description="Savings from removing humans from manual tasks."
            icon={<Clock className="text-blue-600" size={20} />}
            result={laborSavings}
            badge="1. HARD ROI"
            formula="L = (H × R) × 52"
          >
            <InputField 
              label="Hours saved per week"
              value={laborHours}
              onChange={setLaborHours}
              suffix="hrs/wk"
            />
            <InputField 
              label="Hourly rate ($)"
              value={laborRate}
              onChange={setLaborRate}
            />
          </Card>

          {/* 2. Speed-to-Lead Revenue */}
          <Card 
            id="speed-to-lead"
            title="Speed-to-Lead Revenue"
            description="Captured value from instant qualifying."
            icon={<TrendingUp className="text-green-600" size={20} />}
            result={speedToLeadValue}
            isAnnual={false}
            badge="2. GROWTH ROI"
            formula="V = (M × ΔC) × A"
          >
            <div className="col-span-2 grid grid-cols-3 gap-3">
              <InputField 
                label="Leads / Mo"
                value={monthlyLeads}
                onChange={setMonthlyLeads}
              />
              <InputField 
                label="Conv. Delta"
                value={convIncrease / 100}
                onChange={(v) => setConvIncrease(v * 100)}
                step={0.01}
              />
              <InputField 
                label="Sale Val ($)"
                value={avgSale}
                onChange={setAvgSale}
              />
            </div>
          </Card>

          {/* 3. Opportunity Cost */}
          <Card 
            id="opportunity-cost"
            title="Opportunity Cost"
            description="The 'Value Gap' of high-value leadership time."
            icon={<UserPlus className="text-purple-600" size={20} />}
            result={annualOppCost}
            badge="3. FOUNDER ROI"
            formula="O = H × (Fv - R)"
          >
            <div className="col-span-2 grid grid-cols-3 gap-3">
              <InputField 
                label="Admin Hrs / Mo"
                value={adminHours}
                onChange={setAdminHours}
              />
              <InputField 
                label="Ideal Rate ($)"
                value={founderRate}
                onChange={setFounderRate}
              />
              <InputField 
                label="Admin Rate ($)"
                value={marketRate}
                onChange={setMarketRate}
              />
            </div>
          </Card>

          {/* Impact Bar */}
          <motion.div 
            className="bg-slate-900 text-white rounded-xl p-6 shadow-xl flex flex-col justify-between border-2 border-blue-600 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Coins size={128} />
            </div>
            <div className="z-10 relative">
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase block mb-1">Executive Summary</span>
              <h2 className="text-2xl font-bold">Total Annual Impact</h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Calculated cumulative value of automation across labor, growth, and leadership recovery.
              </p>
            </div>
            <div className="mt-8 z-10 relative">
              <div className="flex justify-between items-end border-t border-slate-800 pt-4">
                <div className="text-blue-400 font-mono text-3xl font-bold tracking-tight">
                  ${totalImpact.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase text-slate-500 font-bold tracking-wider">Est. Net Gain / Year</span>
                  <span className="text-green-400 text-sm font-bold">+{(totalImpact / 48000 * 100).toFixed(0)}% Baseline Increase</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-[10px] border-t border-gray-200 pt-4 gap-4">
          <div>&copy; 2026 ROI Intelligence Systems | Confidential Client Assessment</div>
          <div className="flex items-center gap-6">
            <span>Calculations are indicative of current market data</span>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
