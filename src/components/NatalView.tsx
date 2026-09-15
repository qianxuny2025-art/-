import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, HelpCircle, Compass, User, CheckCircle2 } from 'lucide-react';
import { SHICHEN_LIST, calculateZiweiNatal } from '../utils/ziweiCalculator';
import { STAR_PROFILES } from '../data/stars';
import { StarProfile, NatalCalculationResult, Gender } from '../types';

interface NatalViewProps {
  onCalculateComplete: (
    primary: StarProfile,
    secondary?: StarProfile,
    natalMeta?: NatalCalculationResult
  ) => void;
  onSwitchToQuiz: () => void;
}

export const NatalView: React.FC<NatalViewProps> = ({ onCalculateComplete, onSwitchToQuiz }) => {
  // Default to a representative young adult birth year e.g. 2000
  const [gender, setGender] = useState<Gender>('female');
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(6);
  const [day, setDay] = useState(15);
  const [shichenIndex, setShichenIndex] = useState(6); // Default Noon (午时 11:00-13:00)
  const [showHelper, setShowHelper] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate day options based on month/year
  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };

  const daysCount = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const natalRes = calculateZiweiNatal(year, month, day, shichenIndex, gender);
      const primaryProfile = STAR_PROFILES[natalRes.primaryStarKey];
      const secondaryProfile = natalRes.secondaryStarKey
        ? STAR_PROFILES[natalRes.secondaryStarKey]
        : undefined;

      setIsSubmitting(false);
      onCalculateComplete(primaryProfile, secondaryProfile, natalRes);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="natal-view-container">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>时空节律模型 · 核心人格原型测定</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100 tracking-wide mb-2">
          解码你的核心心智原型
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          输入公历出生年月日与出生时段区间，我们将基于自然时空节律与深层心智模型，精准解码你的核心人格原型。
        </p>
      </div>

      {/* Main Form Box */}
      <form
        onSubmit={handleCalculate}
        className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl shadow-black/40"
        id="natal-form"
      >
        {/* Gender Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2.5">
            <User className="w-4 h-4 text-amber-300" />
            <span>生理性别（心理基调参考）<span className="text-amber-400">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('female')}
              id="natal-gender-female"
              className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                gender === 'female'
                  ? 'bg-rose-500/15 border-rose-400/50 text-rose-200'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06]'
              }`}
            >
              <span>♀ 女性 Female</span>
              {gender === 'female' && <CheckCircle2 className="w-4 h-4 text-rose-300" />}
            </button>
            <button
              type="button"
              onClick={() => setGender('male')}
              id="natal-gender-male"
              className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                gender === 'male'
                  ? 'bg-indigo-500/15 border-indigo-400/50 text-indigo-200'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06]'
              }`}
            >
              <span>♂ 男性 Male</span>
              {gender === 'male' && <CheckCircle2 className="w-4 h-4 text-indigo-300" />}
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-3">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>出生公历日期（阳历）</span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {/* Year */}
            <div>
              <div className="text-xs text-slate-400 mb-1">年份</div>
              <select
                id="natal-select-year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-400/50"
              >
                {Array.from({ length: 65 }, (_, i) => 2025 - i).map((y) => (
                  <option key={y} value={y} className="bg-slate-900 text-slate-100">
                    {y} 年
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <div className="text-xs text-slate-400 mb-1">月份</div>
              <select
                id="natal-select-month"
                value={month}
                onChange={(e) => {
                  const newM = Number(e.target.value);
                  setMonth(newM);
                  const maxD = getDaysInMonth(year, newM);
                  if (day > maxD) setDay(maxD);
                }}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-400/50"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m} className="bg-slate-900 text-slate-100">
                    {m} 月
                  </option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <div className="text-xs text-slate-400 mb-1">日期</div>
              <select
                id="natal-select-day"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-400/50"
              >
                {daysArray.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-slate-100">
                    {d} 日
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Shichen Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <Clock className="w-4 h-4 text-indigo-300" />
              <span>出生时辰（对应现代24小时区间）</span>
            </label>
            <button
              type="button"
              id="natal-btn-help"
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs text-indigo-300/80 hover:text-indigo-200 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>不确定具体出生时段？</span>
            </button>
          </div>

          {showHelper && (
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200/90 mb-4 leading-relaxed">
              <p className="font-semibold mb-1 text-indigo-200">💡 时间定位小贴士：</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li>可以翻看出生医学证明或询问长辈大概是在早晨、中午、傍晚还是深夜；</li>
                <li>若完全无法获知具体时段，推荐点击下方切换到「直觉测评」，通过情境选择测出更贴合你当下气质的心智原型。</li>
              </ul>
              <button
                type="button"
                onClick={onSwitchToQuiz}
                className="mt-2 text-amber-300 underline font-medium hover:text-amber-200"
              >
                切换到【直觉测评】→
              </button>
            </div>
          )}

          {/* 12 Shichen Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5" id="shichen-grid">
            {SHICHEN_LIST.map((sc) => {
              const isSelected = shichenIndex === sc.index;
              return (
                <button
                  type="button"
                  key={sc.index}
                  id={`shichen-opt-${sc.index}`}
                  onClick={() => setShichenIndex(sc.index)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-950/30'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100 font-serif">
                      {sc.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300/80">
                      {sc.branch}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mb-1 font-mono">
                    {sc.timeRange}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {sc.poeticNote}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="natal-btn-submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-slate-950 font-bold tracking-wider hover:opacity-95 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span>{isSubmitting ? '时空模型深度计算中...' : '开启时空节律原型解码'}</span>
        </button>
      </form>
    </div>
  );
};
