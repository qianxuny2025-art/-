import React, { useState } from 'react';
import { Search, Sparkles, X, Flame, Zap, ShieldAlert, ArrowRight } from 'lucide-react';
import { StarKey, StarCategory, StarProfile } from '../types';
import { STAR_PROFILES } from '../data/stars';
import { RadarChart } from './RadarChart';

interface CodexViewProps {
  initialSelectedKey?: StarKey;
  onSelectForDetail?: (starKey: StarKey) => void;
}

export const CodexView: React.FC<CodexViewProps> = ({ initialSelectedKey }) => {
  const [selectedCategory, setSelectedCategory] = useState<StarCategory | '全部'>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStarKey, setActiveStarKey] = useState<StarKey | null>(initialSelectedKey || null);

  const starList = Object.values(STAR_PROFILES);

  const categories: (StarCategory | '全部')[] = ['全部', '开创型', '领导型', '支援型', '合作型'];

  const filteredStars = starList.filter((star) => {
    const matchesCat = selectedCategory === '全部' || star.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      star.name.toLowerCase().includes(query) ||
      star.archetypeTitle.toLowerCase().includes(query) ||
      star.keywords.some((k) => k.toLowerCase().includes(query)) ||
      star.slogan.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  const activeStar: StarProfile | null = activeStarKey ? STAR_PROFILES[activeStarKey] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" id="codex-view-container">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3 text-purple-300" />
          <span>十四维度 · 心智原型全鉴</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100 tracking-wide mb-2">
          心智原型图鉴检索
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          解构十四种人格原型的精神内核、高光天赋与隐秘防御，探索自我与身旁伙伴的心智特质。
        </p>
      </div>

      {/* Filter Toolbar: Categories & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索原型名称、关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* 14 Stars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="codex-stars-grid">
        {filteredStars.map((star) => {
          return (
            <div
              key={star.key}
              onClick={() => setActiveStarKey(star.key)}
              id={`codex-card-${star.key}`}
              className="bg-slate-900/60 border border-white/10 hover:border-amber-300/40 rounded-2xl p-5 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-950/30 group relative flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-slate-300 font-mono">
                    {star.element}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300 font-medium">
                    {star.category}
                  </span>
                </div>

                {/* Star name & archetype */}
                <div className="mb-2">
                  <div className="text-xl font-bold font-serif text-slate-100 group-hover:text-amber-200 transition-colors flex items-baseline gap-2">
                    <span>{star.name}</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      {star.pinyin}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-amber-300/90 font-sans mt-0.5">
                    {star.archetypeTitle}
                  </div>
                </div>

                {/* Slogan */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {star.slogan}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {star.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-400"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer link */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-200 transition-colors">
                <span className="font-mono text-[11px]">查看深度解析</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail for Active Star */}
      {activeStar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 max-h-[88vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setActiveStarKey(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-100">
              {/* Header */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300">
                    {activeStar.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-400 font-mono">
                    {activeStar.element}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                  {activeStar.name}{' '}
                  <span className="text-sm font-sans font-normal text-amber-200">
                    ({activeStar.archetypeTitle})
                  </span>
                </h3>
                <p className="text-xs text-slate-400 italic">
                  "{activeStar.slogan}"
                </p>
              </div>

              {/* Radar preview & Essence */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200 tracking-wider uppercase font-mono">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>精神内核底色</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeStar.essence}
                  </p>
                </div>
                <div className="md:col-span-5 flex justify-center bg-white/[0.02] p-2 rounded-2xl border border-white/5">
                  <RadarChart data={activeStar.radar} />
                </div>
              </div>

              {/* Bright Talents */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200 tracking-wider uppercase font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>三大高光天赋场</span>
                </div>
                <div className="space-y-1.5">
                  {activeStar.brightTalents.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 leading-relaxed">
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadow Defense */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 tracking-wider uppercase font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>暗面防御与内耗源</span>
                </div>
                <div className="space-y-1.5">
                  {activeStar.shadowMechanism.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-500/[0.03] border border-rose-500/20 text-xs text-slate-300 leading-relaxed">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Motto Box */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center space-y-1">
                <div className="text-[10px] text-amber-300/80 tracking-widest uppercase">
                  核心能量箴言
                </div>
                <p className="text-xs text-slate-200 font-serif leading-relaxed italic">
                  {activeStar.motto}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
