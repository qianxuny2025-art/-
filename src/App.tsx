import { useState } from 'react';
import { Header } from './components/Header';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { StarProfile, NatalCalculationResult } from './types';
import { ShieldCheck, Compass } from 'lucide-react';

export default function App() {
  const [quizStage, setQuizStage] = useState<'profile' | 'quiz'>('profile');
  const [resultState, setResultState] = useState<{
    primaryStar: StarProfile;
    secondaryStar?: StarProfile;
    source: 'quiz' | 'natal';
    natalMeta?: NatalCalculationResult;
  } | null>(null);

  // When assessment finishes
  const handleQuizComplete = (
    primary: StarProfile,
    secondary?: StarProfile,
    natalMeta?: NatalCalculationResult
  ) => {
    setResultState({
      primaryStar: primary,
      secondaryStar: secondary,
      source: 'quiz',
      natalMeta
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetestQuiz = () => {
    setResultState(null);
    setQuizStage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStage = resultState ? 'result' : quizStage;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 bg-star-pattern flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Sleek Top Mini-App Bar */}
      <Header
        currentStage={currentStage}
        onReset={handleRetestQuiz}
      />

      {/* Main Flow: Info Collection -> Questions -> Result */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6" id="main-content">
        {resultState ? (
          <ResultView
            primaryStar={resultState.primaryStar}
            secondaryStar={resultState.secondaryStar}
            source={resultState.source}
            natalMeta={resultState.natalMeta}
            onRetestQuiz={handleRetestQuiz}
          />
        ) : (
          <QuizView
            onComplete={handleQuizComplete}
            onStageChange={(stage) => setQuizStage(stage)}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-slate-200/80 py-5 px-4 text-center text-xs text-slate-500 space-y-1.5 mt-auto bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-600/80" />
            <span>自适应性格特质模型</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600/80" />
            <span>数据纯本地运算 · 隐私保护</span>
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          紫薇性格特质测试 · 探寻你的核心潜能与精神底色
        </p>
      </footer>
    </div>
  );
}
