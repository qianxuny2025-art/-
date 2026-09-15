import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Compass,
  CheckCircle2,
  ShieldCheck,
  User
} from 'lucide-react';
import { Question, StarKey, StarProfile, Gender, TimeCertainty, NatalCalculationResult } from '../types';
import { getQuestionsForProfile } from '../data/questions';
import { STAR_PROFILES } from '../data/stars';
import {
  SHICHEN_LIST,
  calculateZiweiNatal,
  deduceBestNatalFromScores,
  getLunarSummary
} from '../utils/ziweiCalculator';

interface QuizViewProps {
  onComplete: (
    primary: StarProfile,
    secondary?: StarProfile,
    natalMeta?: NatalCalculationResult
  ) => void;
  onStageChange?: (stage: 'profile' | 'quiz') => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete, onStageChange }) => {
  // Step 1: Birth Info & Gender Input
  // Step 2: Adaptive Questions (4 if time exact, 10 if time uncertain)
  const [step, setStep] = useState<'profile' | 'quiz'>('profile');

  // Birth Profile state
  const [gender, setGender] = useState<Gender>('female');
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(6);
  const [day, setDay] = useState(15);
  const [timeCertainty, setTimeCertainty] = useState<TimeCertainty>('exact');
  const [shichenIndex, setShichenIndex] = useState(6); // default Noon 午时

  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Dynamic days in month
  const daysInMonth = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [year, month]);

  // Sync day if out of range
  React.useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  }, [daysInMonth, day]);

  // Real-time lunar info summary
  const lunarInfo = useMemo(() => {
    return getLunarSummary(year, month, day);
  }, [year, month, day]);

  // Handle start test
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    // Deterministic, purpose-driven questions:
    // 4 targeted calibration questions if exact time,
    // 10 diagnostic deduction questions if uncertain time
    setQuestions(getQuestionsForProfile(timeCertainty));
    setCurrentIndex(0);
    setAnswers({});
    setStep('quiz');
    onStageChange?.('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = { ...answers, [currentIndex]: optionIndex };
    setAnswers(nextAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions, compute final profile
      finishQuiz(nextAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = (finalAnswers: Record<number, number>) => {
    setIsCalculating(true);

    // 1. Tally star weights from quiz responses
    const tally: Record<StarKey, number> = {
      ziwei: 0, tianji: 0, taiyang: 0, wuqu: 0,
      tiantong: 0, lianzhen: 0, tianfu: 0, taiyin: 0,
      tanlang: 0, jumen: 0, tianxiang: 0, tianliang: 0,
      qisha: 0, pojun: 0
    };

    questions.forEach((q, idx) => {
      const chosenOptIdx = finalAnswers[idx];
      if (chosenOptIdx !== undefined && q.options[chosenOptIdx]) {
        const weights = q.options[chosenOptIdx].weights;
        (Object.keys(weights) as StarKey[]).forEach((starKey) => {
          const w = weights[starKey] || 0;
          tally[starKey] += w;
        });
      }
    });

    setTimeout(() => {
      let finalNatal: NatalCalculationResult;
      let primaryProfile: StarProfile;
      let secondaryProfile: StarProfile | undefined;

      if (timeCertainty === 'exact') {
        // Birth time is known: compute directly using classical Ziwei chart
        finalNatal = calculateZiweiNatal(year, month, day, shichenIndex, gender);
        primaryProfile = STAR_PROFILES[finalNatal.primaryStarKey];
        secondaryProfile = finalNatal.secondaryStarKey
          ? STAR_PROFILES[finalNatal.secondaryStarKey]
          : undefined;

        // If secondary star wasn't naturally co-located, check if quiz answers strongly reflect an auxiliary star
        if (!secondaryProfile) {
          const sortedQuizStars = (Object.keys(tally) as StarKey[])
            .filter((k) => k !== finalNatal.primaryStarKey)
            .sort((a, b) => tally[b] - tally[a]);
          if (sortedQuizStars.length > 0 && tally[sortedQuizStars[0]] > 0) {
            secondaryProfile = STAR_PROFILES[sortedQuizStars[0]];
          }
        }
      } else {
        // Birth time is uncertain: reverse-engineer best matching Shichen chart using quiz tally
        finalNatal = deduceBestNatalFromScores(year, month, day, gender, tally);
        primaryProfile = STAR_PROFILES[finalNatal.primaryStarKey];
        secondaryProfile = finalNatal.secondaryStarKey
          ? STAR_PROFILES[finalNatal.secondaryStarKey]
          : undefined;

        if (!secondaryProfile) {
          const sortedQuizStars = (Object.keys(tally) as StarKey[])
            .filter((k) => k !== finalNatal.primaryStarKey)
            .sort((a, b) => tally[b] - tally[a]);
          if (sortedQuizStars.length > 0 && tally[sortedQuizStars[0]] > 0) {
            secondaryProfile = STAR_PROFILES[sortedQuizStars[0]];
          }
        }
      }

      setIsCalculating(false);
      onComplete(primaryProfile, secondaryProfile, finalNatal);
    }, 1200);
  };

  // STEP 1: BIRTH & GENDER FORM VIEW
  if (step === 'profile') {
    return (
      <div className="max-w-xl mx-auto px-4 py-2 sm:py-4" id="quiz-profile-container">
        {/* Header Intro */}
        <div className="text-center mb-6 space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-wide">
            填写基本信息
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            探索您的核心性格特质与潜能，生成专属测评报告。
          </p>
        </div>

        {/* The Profile Form */}
        <form
          onSubmit={handleStartQuiz}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          id="birth-profile-form"
        >
          {/* 1. Gender Selector */}
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 mb-2.5">
              <User className="w-4 h-4 text-amber-600" />
              <span>性别</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('female')}
                id="gender-btn-female"
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className="text-base text-rose-600 font-bold">♀</span>
                <span>女性 Female</span>
                {gender === 'female' && <CheckCircle2 className="w-4 h-4 text-rose-600 ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setGender('male')}
                id="gender-btn-male"
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-sky-50 border-sky-300 text-sky-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className="text-base text-sky-600 font-bold">♂</span>
                <span>男性 Male</span>
                {gender === 'male' && <CheckCircle2 className="w-4 h-4 text-sky-600 ml-1" />}
              </button>
            </div>
          </div>

          {/* 2. Birthday Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>生日</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {/* Year */}
              <div>
                <div className="text-[11px] text-slate-500 mb-1">年份</div>
                <select
                  id="birth-select-year"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
                >
                  {Array.from({ length: 70 }, (_, i) => 2025 - i).map((y) => (
                    <option key={y} value={y} className="text-slate-800">
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div>
                <div className="text-[11px] text-slate-500 mb-1">月份</div>
                <select
                  id="birth-select-month"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m} className="text-slate-800">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day */}
              <div>
                <div className="text-[11px] text-slate-500 mb-1">日期</div>
                <select
                  id="birth-select-day"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
                >
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d} className="text-slate-800">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. Birth Time Selector */}
          <div className="pt-1 border-t border-slate-100">
            <label className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 mb-2">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>出生时间</span>
              </span>
              {timeCertainty === 'exact' ? (
                <span className="text-amber-800 font-mono text-xs font-semibold">
                  {SHICHEN_LIST[shichenIndex].timeRange}
                </span>
              ) : (
                <span className="text-purple-700 text-xs font-medium">
                  时间不详
                </span>
              )}
            </label>

            <select
              id="birth-select-shichen"
              value={timeCertainty === 'uncertain' ? 'uncertain' : shichenIndex}
              onChange={(e) => {
                if (e.target.value === 'uncertain') {
                  setTimeCertainty('uncertain');
                } else {
                  setTimeCertainty('exact');
                  setShichenIndex(Number(e.target.value));
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
            >
              {SHICHEN_LIST.map((s) => (
                <option key={s.index} value={s.index} className="text-slate-800">
                  {s.name}（{s.timeRange}）
                </option>
              ))}
              <option value="uncertain" className="text-slate-800">
                出生时间不详 / 不清楚
              </option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            id="btn-start-quiz"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>开始测评</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    );
  }

  // CALCULATION LOADING SCREEN
  if (isCalculating) {
    return (
      <div className="min-h-[480px] flex flex-col items-center justify-center text-center px-4 py-16" id="quiz-calculating-screen">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full border border-amber-200 flex items-center justify-center animate-spin duration-3000">
            <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-amber-600 animate-spin" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-600 absolute inset-0 m-auto animate-pulse" />
        </div>
        <h3 className="text-xl font-serif text-slate-900 mb-2 tracking-wide">
          正在生成性格特质测评报告
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-mono">
          正在综合分析您的特质维度与测评反馈，请稍候...
        </p>
      </div>
    );
  }

  // STEP 2: ACTIVE QUESTIONS VIEW
  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" id="quiz-card-container">
      {/* Top Meta & Mode Indicator */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setStep('profile')}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回修改信息</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-amber-800 shadow-2xs font-medium">
            特质倾向测评
          </span>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-amber-700 font-semibold">
            第 {currentIndex + 1} / {questions.length} 题
          </span>
          <span className="font-mono">{progressPercent}% 完成</span>
        </div>
        <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card with motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative"
          id={`quiz-question-card-${currentQ.id}`}
        >
          {/* Topic Badge */}
          <div className="mb-3">
            <span className="text-[11px] font-mono tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-800 font-medium">
              #{currentQ.topic}
            </span>
          </div>

          {/* Scenario Text if present */}
          {currentQ.scenario && (
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-3">
              {currentQ.scenario}
            </p>
          )}

          {/* Question Headline */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 tracking-tight">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  id={`quiz-option-${idx}`}
                  className={`w-full text-left px-4 py-3.5 sm:py-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                    isSelected
                      ? 'bg-amber-50/95 border-amber-500 shadow-2xs ring-1 ring-amber-400/40'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/20'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-xs font-mono font-medium transition-colors ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white'
                          : 'border-slate-300 text-slate-500 group-hover:border-amber-400 group-hover:text-amber-800'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span
                      className={`text-sm sm:text-base leading-snug transition-colors ${
                        isSelected
                          ? 'text-amber-950 font-semibold'
                          : 'text-slate-800 group-hover:text-slate-950'
                      }`}
                    >
                      {option.text}
                    </span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-amber-600 bg-amber-600'
                        : 'border-slate-300 opacity-0 group-hover:opacity-40'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Card Footer: Back Button */}
          {currentIndex > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                id="quiz-btn-prev"
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>返回上一题</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                自动进入下一题
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
