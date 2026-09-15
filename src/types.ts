export type StarKey =
  | 'ziwei'
  | 'tianji'
  | 'taiyang'
  | 'wuqu'
  | 'tiantong'
  | 'lianzhen'
  | 'tianfu'
  | 'taiyin'
  | 'tanlang'
  | 'jumen'
  | 'tianxiang'
  | 'tianliang'
  | 'qisha'
  | 'pojun';

export type StarCategory = '开创型' | '领导型' | '支援型' | '合作型';

export interface StarProfile {
  key: StarKey;
  name: string;
  pinyin: string;
  archetypeTitle: string; // e.g. "秩序主理人 · The Sovereign"
  category: StarCategory;
  element: string; // 五行: 阴土, 阴水, etc.
  slogan: string;
  tagline: string;
  keywords: string[];
  essence: string; // 核心精神底色
  brightTalents: string[]; // 高光天赋场 (3条)
  shadowMechanism: string[]; // 暗面防御机制与内耗 (2条)
  socialAura: string; // 社交与人际气场
  radar: {
    decisiveness: number; // 决策力
    intuition: number;     // 灵感洞察
    charisma: number;      // 气场魅力
    resilience: number;    // 精神韧性
    boundaries: number;    // 边界护城河
  };
  resonantPartners: {
    harmonic: string[]; // 灵魂共振
    contrasting: string[]; // 磨合张力
  };
  motto: string; // 东方现代哲理金句
}

export interface QuestionOption {
  text: string;
  subtext?: string;
  weights: Partial<Record<StarKey, number>>;
}

export interface Question {
  id: string;
  topic: string; // e.g. "职场困局", "独处充电", "社交防线"
  scenario: string;
  question: string;
  options: QuestionOption[];
}

export type Gender = 'male' | 'female';
export type TimeCertainty = 'exact' | 'uncertain';

export interface UserBirthProfile {
  gender: Gender;
  year: number;
  month: number;
  day: number;
  timeCertainty: TimeCertainty;
  shichenIndex?: number; // 0 to 11 if exact
}

export interface NatalCalculationResult {
  gender?: Gender;
  solarDate: string;
  lunarDate: string;
  lunarYearStemBranch: string;
  shichenName: string;
  shichenTimeRange: string;
  mingPalaceBranch: string; // 地支
  bureau: string; // 五行局，如 水二局
  primaryStarKey: StarKey;
  secondaryStarKey?: StarKey;
  isOppositeBorrowed: boolean; // 是否空宫借对宫
  isDeducedFromQuiz?: boolean; // 是否由心测多题反推定盘
  allPalaceStars?: Record<string, string[]>;
}

export type AppMode = 'quiz' | 'natal' | 'codex';
