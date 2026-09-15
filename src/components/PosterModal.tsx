import React, { useState, useRef } from 'react';
import { X, Copy, Check, Download, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { StarProfile, NatalCalculationResult } from '../types';
import { RadarChart } from './RadarChart';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryStar: StarProfile;
  secondaryStar?: StarProfile;
  natalMeta?: NatalCalculationResult;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  primaryStar,
  secondaryStar,
  natalMeta,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `【紫薇十四型性格测试报告】
核心原型：${primaryStar.name}（${primaryStar.archetypeTitle}）
心智元质：${primaryStar.element} | 决策模式：${primaryStar.category}
核心气场：${primaryStar.slogan}

【核心天赋】
${primaryStar.brightTalents.map((t) => `• ${t}`).join('\n')}

【暗面防御与内耗】
${primaryStar.shadowMechanism.map((s) => `• ${s}`).join('\n')}

【核心能量箴言】
${primaryStar.motto}

— 来自紫薇十四型性格测试`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert poster DOM to high-resolution PNG image using html2canvas
  const handleExportPosterImage = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);
    setToastMsg(null);

    try {
      // Allow slight wait for full DOM rendering
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(posterRef.current, {
        scale: 2.5, // 2.5x for ultra-sharp Retina output
        useCORS: true,
        backgroundColor: '#faf8f5',
        logging: false,
        allowTaint: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImgUrl(dataUrl);

      // Trigger automatic file download
      const filename = `心智原型卡-${primaryStar.name}-${primaryStar.archetypeTitle.split('·')[0].trim()}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToastMsg('海报图片已生成并触发下载！手机端可长按下方图片保存至相册。');
    } catch (err) {
      console.error('html2canvas poster generation error:', err);
      setToastMsg('生成图片海报失败，请稍后重试或使用截图功能。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          id="poster-modal-close"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Bar */}
        <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-serif tracking-wide">
              专属心智原型卡
            </h3>
          </div>
          <span className="text-[11px] text-amber-800 font-mono pr-8">
            一键保存分享
          </span>
        </div>

        {/* Toast alert if any */}
        {toastMsg && (
          <div className="mx-4 mt-3 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center animate-in fade-in">
            {toastMsg}
          </div>
        )}

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* If already generated image preview, display prompt */}
          {generatedImgUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>海报图片已生成！若未弹出下载，长按或右键下方卡片即可保存。</span>
              </span>
            </div>
          )}

          {/* THE POSTER ELEMENT CAPTURED BY html2canvas */}
          <div className="flex justify-center">
            <div
              ref={posterRef}
              id="poster-export-card"
              className="w-full max-w-[390px] bg-[#faf8f5] border-2 border-amber-300 rounded-2xl p-5 sm:p-6 text-slate-800 relative shadow-lg overflow-hidden space-y-4"
              style={{
                backgroundColor: '#faf8f5',
                color: '#1e293b',
              }}
            >
              {/* Corner Traditional Accents */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/60" />

              {/* Card Header Stamp & Brand */}
              <div className="text-center pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-medium tracking-wide">
                  <span>✦ 个人性格特质档案 ✦</span>
                </div>
              </div>

              {/* User Natal & Gender Info if present */}
              {natalMeta && (
                <div className="py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-center space-y-0.5 shadow-2xs">
                  <div className="text-[11px] text-slate-700 font-medium">
                    {natalMeta.gender === 'female' ? '女性' : '男性'} · 公历 {natalMeta.solarDate}
                    {!natalMeta.isDeducedFromQuiz && natalMeta.shichenTimeRange ? ` · ${natalMeta.shichenTimeRange}` : ''}
                  </div>
                </div>
              )}

              {/* Main Archetype Display Block */}
              <div className="text-center space-y-1 pb-3 border-b border-slate-200">
                <div className="text-[11px] text-amber-800 font-mono tracking-wider font-semibold">
                  {primaryStar.element} · {primaryStar.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-wider">
                  {primaryStar.archetypeTitle}
                  {secondaryStar && (
                    <span className="text-xl font-normal text-amber-700 ml-2">
                      / {secondaryStar.archetypeTitle}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-600 pt-0.5">
                  {primaryStar.tagline}
                </p>
              </div>

              {/* Radar Chart (Compact embedded in poster) */}
              <div className="flex flex-col items-center justify-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[9px] font-mono text-slate-500 tracking-wider mb-0.5">
                  五维精神能量场
                </div>
                <div className="transform scale-80 -my-4 origin-center">
                  <RadarChart data={primaryStar.radar} />
                </div>
              </div>

              {/* Slogan Quote */}
              <div className="p-2.5 rounded-xl bg-amber-50/80 border-l-2 border-amber-500 text-[11px] text-slate-700 leading-relaxed italic">
                "{primaryStar.slogan}"
              </div>

              {/* High-light Talents */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-amber-900 tracking-wider uppercase font-mono flex items-center gap-1">
                  <span>✦ 核心天赋场 (TALENTS)</span>
                </div>
                <div className="space-y-1">
                  {primaryStar.brightTalents.map((talent, idx) => (
                    <div key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-600 text-xs shrink-0">•</span>
                      <span>{talent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadow Defense */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-rose-800 tracking-wider uppercase font-mono flex items-center gap-1">
                  <span>▲ 暗面防御与内耗 (SHADOW)</span>
                </div>
                <div className="space-y-1">
                  {primaryStar.shadowMechanism.map((shadow, idx) => (
                    <div key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                      <span className="text-rose-600 text-xs shrink-0">▫</span>
                      <span>{shadow}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motto Box with Seal */}
              <div className="p-3 rounded-xl bg-white border border-amber-200 text-center space-y-1 relative shadow-2xs">
                <div className="text-[9px] text-amber-800 tracking-widest uppercase font-semibold">
                  核心能量箴言
                </div>
                <p className="text-[11px] text-slate-800 font-serif leading-relaxed italic">
                  {primaryStar.motto}
                </p>
                {/* Decorative Red Stamp Seal */}
                <div className="absolute right-2.5 bottom-2.5 w-6 h-6 rounded-md border border-rose-300 bg-rose-50 text-rose-700 flex items-center justify-center text-[10px] font-serif font-bold">
                  原
                </div>
              </div>

              {/* Footer Watermark */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
                <span>十四型心智性格特质测评</span>
                <span className="font-mono">14 PERSONALITY ARCHETYPES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Controls Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2.5">
          {/* Main Action: Generate & Save Image */}
          <button
            onClick={handleExportPosterImage}
            disabled={isGenerating}
            id="poster-btn-export-image"
            className="flex-1 min-w-[150px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>生成高清画卡中...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span>{generatedImgUrl ? '重新下载海报图片' : '保存海报图片'}</span>
              </>
            )}
          </button>

          {/* Copy Text button */}
          <button
            onClick={handleCopyText}
            id="poster-btn-copy"
            className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '已复制' : '复制特质文案'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
