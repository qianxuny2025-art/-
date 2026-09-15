import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Share2,
  RotateCcw,
  Calendar,
  Compass,
  ArrowRight,
  ShieldAlert,
  Flame,
  Zap,
  Users,
  X
} from 'lucide-react';
import { StarProfile, NatalCalculationResult, StarKey } from '../types';
import { RadarChart } from './RadarChart';
import { PosterModal } from './PosterModal';
import { STAR_PROFILES } from '../data/stars';

interface ResultViewProps {
  primaryStar: StarProfile;
  secondaryStar?: StarProfile;
  source: 'quiz' | 'natal';
  natalMeta?: NatalCalculationResult;
  onRetestQuiz: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  primaryStar,
  secondaryStar,
  source,
  natalMeta,
  onRetestQuiz
}) => {
  const [showPoster, setShowPoster] = useState(false);
  const [partnerPreviewKey, setPartnerPreviewKey] = useState<StarKey | null>(null);

  // Category Theme tags
  const categoryTagMap: Record<string, { label: string; bg: string; text: string }> = {
    开创型: { label: '开创型 · 突破与拓荒', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800' },
    领导型: { label: '领导型 · 秩序与统领', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-900' },
    支援型: { label: '支援型 · 谋略与通达', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-900' },
    合作型: { label: '合作型 · 滋养与同理', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-900' }
  };

  const catTag = categoryTagMap[primaryStar.category] || {
    label: primaryStar.category,
    bg: 'bg-slate-50 border-slate-200',
    text: 'text-slate-800'
  };

  // Find archetype key helper for partner clicks
  const getStarKeyByName = (name: string): StarKey | undefined => {
    const entry = Object.entries(STAR_PROFILES).find(([_, p]) => p.archetypeTitle === name || p.name === name);
    return entry ? (entry[0] as StarKey) : undefined;
  };

  const partnerProfile = partnerPreviewKey ? STAR_PROFILES[partnerPreviewKey] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" id="result-view-container">
      {/* Top Source Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono flex items-center gap-1.5 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>性格特质测评结果</span>
          </span>
          {natalMeta?.isOppositeBorrowed && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800">
              双重复合特质
            </span>
          )}
        </div>

        {/* Action button to trigger poster */}
        <button
          onClick={() => setShowPoster(true)}
          id="result-btn-poster"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>生成并保存精美海报</span>
        </button>
      </div>

      {/* Natal Metadata Bar if available */}
      {natalMeta && (
        <div className="mb-6 p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-sans font-medium text-[11px]">
              {natalMeta.gender === 'female' ? '女性' : '男性'}
            </span>
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>公历 {natalMeta.solarDate}</span>
            {!natalMeta.isDeducedFromQuiz && natalMeta.shichenTimeRange && (
              <>
                <span className="text-slate-300">|</span>
                <span className="text-amber-800 font-medium">
                  {natalMeta.shichenTimeRange}
                </span>
              </>
            )}
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            性格特质深度报告
          </div>
        </div>
      )}

      {/* Hero Exhibition Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden mb-8"
        id="result-hero-card"
      >
        {/* Subtle background ambient radial light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Category Pill & Element */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${catTag.bg} ${catTag.text}`}>
            {catTag.label}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-mono">
            特质倾向：{primaryStar.element}
          </span>
          {secondaryStar && (
            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800">
              复合特质：{secondaryStar.archetypeTitle}
            </span>
          )}
        </div>

        {/* Big Display Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-7 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-wide flex flex-wrap items-baseline gap-2.5">
              <span>{primaryStar.archetypeTitle}</span>
              {secondaryStar && (
                <span className="text-xl sm:text-2xl font-light text-amber-700">
                  / {secondaryStar.archetypeTitle}
                </span>
              )}
            </h1>
            <p className="text-sm text-slate-600 pt-1 leading-relaxed">
              {primaryStar.tagline}
            </p>

            {/* Slogan Quote Block */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border-l-2 border-amber-500 text-sm text-slate-800 italic leading-relaxed">
              "{primaryStar.slogan}"
            </div>

            {/* Keyword Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {primaryStar.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100/80 border border-slate-200 text-slate-700 font-medium"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 5D Radar Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-50/70 border border-slate-200/80">
            <div className="text-xs font-mono text-slate-500 tracking-wider mb-1">
              FIVE-DIMENSIONAL ENERGY RADAR
            </div>
            <RadarChart data={primaryStar.radar} />
          </div>
        </div>

        {/* SECTION 1: 内核精神底色 */}
        <div className="border-t border-slate-100 pt-8 mb-8 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900 tracking-wider uppercase font-mono">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>01 / 内核精神底色</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            {primaryStar.essence}
          </p>
        </div>

        {/* SECTION 2: 三大高光天赋场 */}
        <div className="border-t border-slate-100 pt-8 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900 tracking-wider uppercase font-mono">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>02 / 高光天赋场 (BRIGHT TALENTS)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {primaryStar.brightTalents.map((talent, idx) => {
              const [title, desc] = talent.split('：');
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 transition-colors"
                >
                  <div className="text-amber-900 text-sm font-bold font-serif mb-1 flex items-center gap-1.5">
                    <span className="text-xs text-amber-600">✦ 0{idx + 1}</span>
                    <span>{title || talent}</span>
                  </div>
                  {desc && (
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: 暗面防御与内耗机制 */}
        <div className="border-t border-slate-100 pt-8 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-800 tracking-wider uppercase font-mono">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>03 / 隐秘防御机制与内耗源 (SHADOW DEFENSE)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {primaryStar.shadowMechanism.map((shadow, idx) => {
              const [title, desc] = shadow.split('：');
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80"
                >
                  <div className="text-rose-900 text-sm font-bold font-serif mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{title || shadow}</span>
                  </div>
                  {desc && (
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4 & 5: 社交引力 & 灵魂搭子 */}
        <div className="border-t border-slate-100 pt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Social Aura */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-900 tracking-wider uppercase font-mono">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>04 / 社交引力与气场</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              {primaryStar.socialAura}
            </p>
          </div>

          {/* Partners */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900 tracking-wider uppercase font-mono">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>05 / 心智社交共振图谱</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
              <div>
                <div className="text-xs text-emerald-800 font-medium mb-1.5 flex items-center gap-1">
                  <span>◎ 默契协同 · 灵魂共鸣：</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {primaryStar.resonantPartners.harmonic.map((pName, i) => {
                    const key = getStarKeyByName(pName);
                    return (
                      <button
                        key={i}
                        onClick={() => key && setPartnerPreviewKey(key)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
                        title={`点击预览【${pName}】原型`}
                      >
                        <span>{pName}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs text-rose-800 font-medium mb-1.5 flex items-center gap-1">
                  <span>▲ 认知差异 · 需予磨合：</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {primaryStar.resonantPartners.contrasting.map((pName, i) => {
                    const key = getStarKeyByName(pName);
                    return (
                      <button
                        key={i}
                        onClick={() => key && setPartnerPreviewKey(key)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                        title={`点击预览【${pName}】原型`}
                      >
                        <span>{pName}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: 本命能量箴言卡 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-50 via-purple-50 to-indigo-50 border border-amber-200 text-center space-y-2">
          <div className="text-xs font-mono text-amber-800 tracking-wider font-semibold">
            ✦ 心智箴言 ✦
          </div>
          <p className="text-base sm:text-lg text-slate-900 font-serif leading-relaxed italic max-w-2xl mx-auto">
            {primaryStar.motto}
          </p>
        </div>
      </motion.div>

      {/* Bottom Action Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setShowPoster(true)}
          id="result-btn-bottom-poster"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-white" />
          <span>保存高清海报 (分享图片)</span>
        </button>

        <button
          onClick={onRetestQuiz}
          id="result-btn-retest-quiz"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium transition-all shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>重新测试</span>
        </button>
      </div>

      {/* Partner Prototype Quick Preview Modal */}
      {partnerProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
            <button
              onClick={() => setPartnerPreviewKey(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              title="关闭"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono">
                {partnerProfile.category} · {partnerProfile.element}
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 pt-1">
                {partnerProfile.archetypeTitle}
              </h3>
              <p className="text-xs text-slate-500 italic">
                "{partnerProfile.slogan}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              {partnerProfile.essence}
            </p>

            <button
              onClick={() => setPartnerPreviewKey(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* Poster Share Modal */}
      <PosterModal
        isOpen={showPoster}
        onClose={() => setShowPoster(false)}
        primaryStar={primaryStar}
        secondaryStar={secondaryStar}
        natalMeta={natalMeta}
      />
    </div>
  );
};
