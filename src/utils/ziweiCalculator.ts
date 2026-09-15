import { Solar } from 'lunar-javascript';
import { StarKey, NatalCalculationResult, Gender } from '../types';

export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;

export interface ShichenOption {
  index: number; // 0 to 11
  branch: string;
  name: string;
  timeRange: string;
  poeticNote: string;
}

export const SHICHEN_LIST: ShichenOption[] = [
  { index: 0, branch: '子', name: '子夜时段', timeRange: '23:00 - 01:00', poeticNote: '夜半更深 · 万籁沉潜' },
  { index: 1, branch: '丑', name: '凌晨时段', timeRange: '01:00 - 03:00', poeticNote: '潜动初萌 · 晨曦微蕴' },
  { index: 2, branch: '寅', name: '破晓时段', timeRange: '03:00 - 05:00', poeticNote: '平旦破晓 · 朝气初升' },
  { index: 3, branch: '卯', name: '清晨时段', timeRange: '05:00 - 07:00', poeticNote: '朝阳初晞 · 舒展苏醒' },
  { index: 4, branch: '辰', name: '早晨时段', timeRange: '07:00 - 09:00', poeticNote: '晨光气朗 · 生机盎然' },
  { index: 5, branch: '巳', name: '上午时段', timeRange: '09:00 - 11:00', poeticNote: '隅中日盛 · 能量聚敛' },
  { index: 6, branch: '午', name: '正午时段', timeRange: '11:00 - 13:00', poeticNote: '日当正午 · 能量充盈' },
  { index: 7, branch: '未', name: '午后时段', timeRange: '13:00 - 15:00', poeticNote: '日昳光暖 · 从容从容' },
  { index: 8, branch: '申', name: '下午时段', timeRange: '15:00 - 17:00', poeticNote: '光华渐敛 · 专注归藏' },
  { index: 9, branch: '酉', name: '傍晚时段', timeRange: '17:00 - 19:00', poeticNote: '斜阳晚霞 · 沉着自洽' },
  { index: 10, branch: '戌', name: '向晚时段', timeRange: '19:00 - 21:00', poeticNote: '暮色合围 · 归心安坐' },
  { index: 11, branch: '亥', name: '入夜时段', timeRange: '21:00 - 23:00', poeticNote: '静息归宁 · 灵台清朗' }
];

export function getLunarSummary(year: number, month: number, day: number): {
  lunarString: string;
  yearGanZhi: string;
  solarTerm: string;
} {
  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    const jieqi = lunar.getPrevJieQi().getName();
    return {
      lunarString: `物候季相：${jieqi || '季候更迭'}`,
      yearGanZhi: `时空基底：${year}年度`,
      solarTerm: jieqi || '四季节律'
    };
  } catch {
    return {
      lunarString: '时空节律计算中',
      yearGanZhi: '出生时空坐标',
      solarTerm: ''
    };
  }
}

// 六十甲子纳音五行局速查
// 纳音五行与局数：水二局(2), 木三局(3), 金四局(4), 土五局(5), 火六局(6)
const NAYIN_BUREAU_MAP: Record<string, { bureauName: string; bureauNumber: number }> = {
  // 甲子乙丑海中金, 丙寅丁卯炉中火, 戊辰己巳大林木, 庚午辛未路旁土, 壬申癸酉剑锋金, 甲戌乙亥山头火
  '甲子': { bureauName: '金四局', bureauNumber: 4 },
  '乙丑': { bureauName: '金四局', bureauNumber: 4 },
  '丙寅': { bureauName: '火六局', bureauNumber: 6 },
  '丁卯': { bureauName: '火六局', bureauNumber: 6 },
  '戊辰': { bureauName: '木三局', bureauNumber: 3 },
  '己巳': { bureauName: '木三局', bureauNumber: 3 },
  '庚午': { bureauName: '土五局', bureauNumber: 5 },
  '辛未': { bureauName: '土五局', bureauNumber: 5 },
  '壬申': { bureauName: '金四局', bureauNumber: 4 },
  '癸酉': { bureauName: '金四局', bureauNumber: 4 },
  '甲戌': { bureauName: '火六局', bureauNumber: 6 },
  '乙亥': { bureauName: '火六局', bureauNumber: 6 },
  '丙子': { bureauName: '水二局', bureauNumber: 2 },
  '丁丑': { bureauName: '水二局', bureauNumber: 2 },
  '戊寅': { bureauName: '土五局', bureauNumber: 5 },
  '己卯': { bureauName: '土五局', bureauNumber: 5 },
  '庚辰': { bureauName: '金四局', bureauNumber: 4 },
  '辛巳': { bureauName: '金四局', bureauNumber: 4 },
  '壬午': { bureauName: '木三局', bureauNumber: 3 },
  '癸未': { bureauName: '木三局', bureauNumber: 3 },
  '甲申': { bureauName: '水二局', bureauNumber: 2 },
  '乙酉': { bureauName: '水二局', bureauNumber: 2 },
  '丙戌': { bureauName: '土五局', bureauNumber: 5 },
  '丁亥': { bureauName: '土五局', bureauNumber: 5 },
  '戊子': { bureauName: '火六局', bureauNumber: 6 },
  '己丑': { bureauName: '火六局', bureauNumber: 6 },
  '庚寅': { bureauName: '木三局', bureauNumber: 3 },
  '辛卯': { bureauName: '木三局', bureauNumber: 3 },
  '壬辰': { bureauName: '水二局', bureauNumber: 2 },
  '癸巳': { bureauName: '水二局', bureauNumber: 2 },
  '甲午': { bureauName: '金四局', bureauNumber: 4 },
  '乙未': { bureauName: '金四局', bureauNumber: 4 },
  '丙申': { bureauName: '火六局', bureauNumber: 6 },
  '丁酉': { bureauName: '火六局', bureauNumber: 6 },
  '戊戌': { bureauName: '木三局', bureauNumber: 3 },
  '己亥': { bureauName: '木三局', bureauNumber: 3 },
  '庚子': { bureauName: '土五局', bureauNumber: 5 },
  '辛丑': { bureauName: '土五局', bureauNumber: 5 },
  '壬寅': { bureauName: '金四局', bureauNumber: 4 },
  '癸卯': { bureauName: '金四局', bureauNumber: 4 },
  '甲辰': { bureauName: '火六局', bureauNumber: 6 },
  '乙巳': { bureauName: '火六局', bureauNumber: 6 },
  '丙午': { bureauName: '水二局', bureauNumber: 2 },
  '丁未': { bureauName: '水二局', bureauNumber: 2 },
  '戊申': { bureauName: '土五局', bureauNumber: 5 },
  '己酉': { bureauName: '土五局', bureauNumber: 5 },
  '庚戌': { bureauName: '金四局', bureauNumber: 4 },
  '辛亥': { bureauName: '金四局', bureauNumber: 4 },
  '壬子': { bureauName: '木三局', bureauNumber: 3 },
  '癸丑': { bureauName: '木三局', bureauNumber: 3 },
  '甲寅': { bureauName: '水二局', bureauNumber: 2 },
  '乙卯': { bureauName: '水二局', bureauNumber: 2 },
  '丙辰': { bureauName: '土五局', bureauNumber: 5 },
  '丁巳': { bureauName: '土五局', bureauNumber: 5 },
  '戊午': { bureauName: '火六局', bureauNumber: 6 },
  '己未': { bureauName: '火六局', bureauNumber: 6 },
  '庚申': { bureauName: '木三局', bureauNumber: 3 },
  '辛酉': { bureauName: '木三局', bureauNumber: 3 },
  '壬戌': { bureauName: '水二局', bureauNumber: 2 },
  '癸亥': { bureauName: '水二局', bureauNumber: 2 }
};

/**
 * Classical Ziwei Dou Shu star chart locator
 */
export function calculateZiweiNatal(
  year: number,
  month: number,
  day: number,
  shichenIndex: number,
  gender: Gender = 'male'
): NatalCalculationResult {
  // 1. Solar to Lunar conversion
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();

  const lunarYear = lunar.getYear();
  const lunarMonth = Math.abs(lunar.getMonth());
  const lunarDay = lunar.getDay();
  const yearGan = lunar.getYearGan();
  const yearZhi = lunar.getYearZhi();
  const ganzhiYear = `${yearGan}${yearZhi}年`;

  // 2. Calculate Ming Palace (命宫) Earthly Branch
  // 寅宫起正月顺数生月，再逆数生时
  // 寅 = 2
  const mingIndex = (2 + (lunarMonth - 1) - shichenIndex + 24) % 12;
  const mingBranch = EARTHLY_BRANCHES[mingIndex];

  // 3. Five Tigers seek Month Stem (五虎遁干) to determine Ming Palace Gan-Zhi
  const tigerStartStemMap: Record<string, number> = {
    '甲': 2, // 丙寅
    '己': 2, // 丙寅
    '乙': 4, // 戊寅
    '庚': 4, // 戊寅
    '丙': 6, // 庚寅
    '辛': 6, // 庚寅
    '丁': 8, // 壬寅
    '壬': 8, // 壬寅
    '戊': 0, // 甲寅
    '癸': 0  // 甲寅
  };

  const startStemIdx = tigerStartStemMap[yearGan] ?? 0;
  // Calculate stem for ming palace (from Yin (index 2) to mingIndex)
  const branchOffsetFromYin = (mingIndex - 2 + 12) % 12;
  const mingStemIdx = (startStemIdx + branchOffsetFromYin) % 10;
  const mingStem = HEAVENLY_STEMS[mingStemIdx];
  const mingGanzhi = `${mingStem}${mingBranch}`;

  const bureauInfo = NAYIN_BUREAU_MAP[mingGanzhi] || { bureauName: '水二局', bureauNumber: 2 };
  const bureauNum = bureauInfo.bureauNumber;

  // 4. Locate Ziwei Star (紫微星所在宫位)
  let ziweiIndex = 2; // default Yin
  const remainder = lunarDay % bureauNum;
  if (remainder === 0) {
    const quotient = lunarDay / bureauNum;
    ziweiIndex = (2 + quotient - 1 + 24) % 12;
  } else {
    const added = bureauNum - remainder;
    const quotient = (lunarDay + added) / bureauNum;
    if (added % 2 === 0) {
      ziweiIndex = (2 + quotient - 1 + added + 24) % 12;
    } else {
      ziweiIndex = (2 + quotient - 1 - added + 24) % 12;
    }
  }

  // 5. Place 14 Main Stars into 12 Palaces
  const palaceStars: Record<number, StarKey[]> = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [],
    6: [], 7: [], 8: [], 9: [], 10: [], 11: []
  };

  // Ziwei Series (Counter-Clockwise)
  palaceStars[ziweiIndex].push('ziwei');
  palaceStars[(ziweiIndex - 1 + 12) % 12].push('tianji');
  palaceStars[(ziweiIndex - 3 + 12) % 12].push('taiyang');
  palaceStars[(ziweiIndex - 4 + 12) % 12].push('wuqu');
  palaceStars[(ziweiIndex - 5 + 12) % 12].push('tiantong');
  palaceStars[(ziweiIndex - 8 + 12) % 12].push('lianzhen');

  // Tianfu Series (Symmetrical axis at Yin-Shen: 4 - ziweiIndex)
  const tianfuIndex = (4 - ziweiIndex + 24) % 12;
  palaceStars[tianfuIndex].push('tianfu');
  palaceStars[(tianfuIndex + 1) % 12].push('taiyin');
  palaceStars[(tianfuIndex + 2) % 12].push('tanlang');
  palaceStars[(tianfuIndex + 3) % 12].push('jumen');
  palaceStars[(tianfuIndex + 4) % 12].push('tianxiang');
  palaceStars[(tianfuIndex + 5) % 12].push('tianliang');
  palaceStars[(tianfuIndex + 6) % 12].push('qisha');
  palaceStars[(tianfuIndex + 10) % 12].push('pojun');

  // 6. Check stars in Ming Palace
  const starsInMing = palaceStars[mingIndex] || [];
  let primaryStarKey: StarKey;
  let secondaryStarKey: StarKey | undefined;
  let isOppositeBorrowed = false;

  if (starsInMing.length >= 1) {
    primaryStarKey = starsInMing[0];
    if (starsInMing.length >= 2) {
      secondaryStarKey = starsInMing[1];
    }
  } else {
    // 空宫 -> 借对宫 (迁移宫 = mingIndex + 6 % 12)
    const oppositeIndex = (mingIndex + 6) % 12;
    const oppositeStars = palaceStars[oppositeIndex] || [];
    isOppositeBorrowed = true;
    if (oppositeStars.length > 0) {
      primaryStarKey = oppositeStars[0];
      if (oppositeStars.length > 1) {
        secondaryStarKey = oppositeStars[1];
      }
    } else {
      // Fallback
      primaryStarKey = 'ziwei';
    }
  }

  const shichenObj = SHICHEN_LIST[shichenIndex];

  const bureauArchetypeMap: Record<string, string> = {
    '水二局': '潜流蓄能 · 柔韧共生型',
    '木三局': '破土抽枝 · 敏捷生长型',
    '金四局': '坚凝铸炼 · 刚毅聚焦型',
    '土五局': '沉厚承载 · 稳态架构型',
    '火六局': '烈焰激荡 · 热情释放型'
  };

  const modernBureau = bureauArchetypeMap[bureauInfo.bureauName] || '深层自洽稳态型';

  return {
    gender,
    solarDate: `${year}年${month}月${day}日`,
    lunarDate: `节律周期：${lunar.getMonthInChinese()}月象`,
    lunarYearStemBranch: `时代烙印：${year}代`,
    shichenName: shichenObj.name,
    shichenTimeRange: shichenObj.timeRange,
    mingPalaceBranch: `核心锚点区`,
    bureau: modernBureau,
    primaryStarKey,
    secondaryStarKey,
    isOppositeBorrowed
  };
}

/**
 * When birth time/shichen is uncertain, reverse-engineer the candidate Shichen
 * that best matches the user's psychological quiz answers for this birth date.
 */
export function deduceBestNatalFromScores(
  year: number,
  month: number,
  day: number,
  gender: Gender,
  starScores: Record<StarKey, number>
): NatalCalculationResult {
  let bestScore = -Infinity;
  let bestNatal = calculateZiweiNatal(year, month, day, 6, gender); // default noon

  for (let sIdx = 0; sIdx < 12; sIdx++) {
    const candidate = calculateZiweiNatal(year, month, day, sIdx, gender);
    const primaryScore = starScores[candidate.primaryStarKey] || 0;
    const secondaryScore = candidate.secondaryStarKey
      ? (starScores[candidate.secondaryStarKey] || 0)
      : 0;
    
    // Weight the primary star score higher
    const totalMatch = primaryScore * 2.0 + secondaryScore * 1.0;

    if (totalMatch > bestScore) {
      bestScore = totalMatch;
      bestNatal = candidate;
    }
  }

  return {
    ...bestNatal,
    isDeducedFromQuiz: true
  };
}
