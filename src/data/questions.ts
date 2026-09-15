import { Question } from '../types';

/**
 * 4 targeted calibration questions for exact birth time:
 * 4 orthogonal archetypes:
 * A: 领导型 (掌控、目标、大局、结果)
 * B: 开创型 (速度、冒险、破局、实战)
 * C: 支援型 (逻辑、智谋、巧劲、辩明)
 * D: 合作型 (和谐、共情、协同、平稳)
 */
export const EXACT_CALIBRATION_QUESTIONS: Question[] = [
  {
    id: 'calib_1',
    topic: '决策风格',
    scenario: '',
    question: '在面临重要决定时，你通常最看重：',
    options: [
      {
        text: '最终的实际收益与整体掌控力',
        weights: { wuqu: 4, ziwei: 4, tianfu: 3 }
      },
      {
        text: '能否打破常规、抢占先发优势',
        weights: { qisha: 4, pojun: 4, tanlang: 3 }
      },
      {
        text: '底层逻辑是否严谨与最优解法',
        weights: { tianji: 4, jumen: 4, taiyang: 3 }
      },
      {
        text: '团队各方能否达成共识与人际和睦',
        weights: { tiantong: 4, taiyin: 4, tianliang: 3 }
      }
    ]
  },
  {
    id: 'calib_2',
    topic: '行动习惯',
    scenario: '',
    question: '日常推进工作任务时，你更习惯：',
    options: [
      {
        text: '设定明确目标与节点，严格抓考核交付',
        weights: { tianfu: 4, wuqu: 4, ziwei: 3 }
      },
      {
        text: '敢冒风险直接开干，在实战冲锋中破局',
        weights: { qisha: 4, pojun: 4, lianzhen: 3 }
      },
      {
        text: '拆解底层逻辑与巧劲，寻找效率最优解',
        weights: { tianji: 4, jumen: 4, taiyang: 3 }
      },
      {
        text: '调动大家意愿与共识，在平稳节奏中推进',
        weights: { tiantong: 4, taiyin: 4, tianxiang: 3 }
      }
    ]
  },
  {
    id: 'calib_3',
    topic: '社交互动',
    scenario: '',
    question: '在团队沟通或社交场合中，你通常：',
    options: [
      {
        text: '自然居中控场，把控整体节奏与决断',
        weights: { ziwei: 4, tianfu: 4, wuqu: 3 }
      },
      {
        text: '气场鲜明直接，敢于主导焦点与引领话题',
        weights: { tanlang: 4, qisha: 4, taiyang: 3 }
      },
      {
        text: '乐于分享硬核观点，享受思想碰撞与探讨',
        weights: { jumen: 4, tianji: 4, taiyang: 3 }
      },
      {
        text: '照顾冷场者情绪，让每个人都感到舒服放松',
        weights: { tianxiang: 4, tiantong: 4, taiyin: 3 }
      }
    ]
  },
  {
    id: 'calib_4',
    topic: '面对压力',
    scenario: '',
    question: '遭遇重大挫折或外界质疑时，你的第一反应是：',
    options: [
      {
        text: '迅速调整战略打法，用硬核业绩夺回话语权',
        weights: { wuqu: 4, ziwei: 4, tianfu: 3 }
      },
      {
        text: '斗志瞬间被激发，不服输坚决正面硬刚到底',
        weights: { qisha: 4, pojun: 4, lianzhen: 3 }
      },
      {
        text: '刨根问底反思原因，据理力争辩明事实是非',
        weights: { jumen: 4, tianji: 4, taiyang: 3 }
      },
      {
        text: '寻找信赖的朋友倾诉，先自我调适安抚情绪',
        weights: { tiantong: 4, taiyin: 4, tianliang: 3 }
      }
    ]
  }
];

/**
 * 10 targeted questions for uncertain birth time:
 * Each question strictly maps to the 4 orthogonal archetypes:
 * A: 领导型 (支配、统筹、结果、基业)
 * B: 开创型 (进攻、突破、先锋、速度)
 * C: 支援型 (智囊、洞察、逻辑、巧思)
 * D: 合作型 (和气、滋养、共赢、稳妥)
 */
export const UNCERTAIN_DEDUCTION_QUESTIONS: Question[] = [
  {
    id: 'deduce_1',
    topic: '团队角色',
    scenario: '',
    question: '在团队协作项目中，你最自然的定位是：',
    options: [
      {
        text: '把控大局方向、负责终局拍板的领舵人',
        weights: { ziwei: 4, tianfu: 4, wuqu: 3 }
      },
      {
        text: '冲锋前沿阵地、敢啃硬骨头的开路先锋',
        weights: { qisha: 4, pojun: 4, tanlang: 3 }
      },
      {
        text: '提供深度洞见、专攻疑难杂症的军师智囊',
        weights: { tianji: 4, jumen: 4, taiyang: 3 }
      },
      {
        text: '润滑人际关系、促进彼此信任的团队粘合剂',
        weights: { tianxiang: 4, tiantong: 4, taiyin: 3 }
      }
    ]
  },
  {
    id: 'deduce_2',
    topic: '突发危机',
    scenario: '',
    question: '手头计划被突发变故彻底打乱时，你的第一反应是：',
    options: [
      {
        text: '迅速重塑秩序，强势统筹调度人员分工',
        weights: { ziwei: 4, tianfu: 4, tianxiang: 3 }
      },
      {
        text: '果断止损切除烂摊子，雷厉风行强行破局',
        weights: { qisha: 4, pojun: 4, wuqu: 3 }
      },
      {
        text: '拆解突发成因，快速构思备选巧解方案',
        weights: { tianji: 4, jumen: 4, tanlang: 3 }
      },
      {
        text: '先安抚恐慌情绪，寻找多方资源稳健托底',
        weights: { tianliang: 4, tiantong: 4, taiyin: 3 }
      }
    ]
  },
  {
    id: 'deduce_3',
    topic: '面对规则',
    scenario: '',
    question: '面对陈旧低效的既有制度规矩，你的态度通常是：',
    options: [
      {
        text: '追求更严谨的规范治理，建立清晰权责边界',
        weights: { ziwei: 4, tianfu: 4, wuqu: 3 }
      },
      {
        text: '厌恶繁文缛节与教条，敢于掀桌打破陈规',
        weights: { pojun: 4, qisha: 4, lianzhen: 3 }
      },
      {
        text: '敏锐指出规则漏洞，从逻辑层面提出改良方案',
        weights: { jumen: 4, taiyang: 4, tianji: 3 }
      },
      {
        text: '顺应既有规范与安排，在人际和谐中求平衡',
        weights: { tiantong: 4, taiyin: 4, tianliang: 3 }
      }
    ]
  },
  {
    id: 'deduce_4',
    topic: '社交风格',
    scenario: '',
    question: '在日常人际交往或社交圈子里，你最典型的状态是：',
    options: [
      {
        text: '进退有度，交往圈层多为志同道合或事业伙伴',
        weights: { tianfu: 4, ziwei: 4, tianliang: 3 }
      },
      {
        text: '豪爽直接不设防，喜欢结交各路个性鲜明的新朋友',
        weights: { tanlang: 4, taiyang: 4, qisha: 3 }
      },
      {
        text: '慢热挑剔，偏好与少数高共鸣知己进行思想长谈',
        weights: { tianji: 4, jumen: 4, taiyin: 3 }
      },
      {
        text: '温柔体贴无压力，总能让身边的朋友感到治愈放松',
        weights: { tiantong: 4, taiyin: 4, tianxiang: 3 }
      }
    ]
  },
  {
    id: 'deduce_5',
    topic: '意见分歧',
    scenario: '',
    question: '与他人产生严重观点分歧或冲突时，你通常会：',
    options: [
      {
        text: '不屑口舌之争，直接用实打实的业绩成果说话',
        weights: { wuqu: 4, ziwei: 4, qisha: 3 }
      },
      {
        text: '态度决绝强硬，寸步不让地捍卫自己的原则底线',
        weights: { qisha: 4, lianzhen: 4, pojun: 3 }
      },
      {
        text: '逐条梳理逻辑事实，一定要在辩论中把道理讲透',
        weights: { jumen: 4, taiyang: 4, tianji: 3 }
      },
      {
        text: '顾及双方情面，主动寻找互利共赢的各退一步折中点',
        weights: { tianxiang: 4, tiantong: 4, tianliang: 3 }
      }
    ]
  },
  {
    id: 'deduce_6',
    topic: '核心动机',
    scenario: '',
    question: '内心深处，哪种成就最能给你持久的满足感：',
    options: [
      {
        text: '建立属于自己的基业与话语权，受人尊崇敬仰',
        weights: { ziwei: 4, tianfu: 4, wuqu: 3 }
      },
      {
        text: '活得轰轰烈烈痛痛快快，不断突破人生极限',
        weights: { pojun: 4, qisha: 4, tanlang: 4 }
      },
      {
        text: '探索真理与传播智慧，成为不可替代的洞察智者',
        weights: { taiyang: 4, tianji: 4, jumen: 4 }
      },
      {
        text: '内心丰盈安宁，与相爱相知的人共度温暖岁月',
        weights: { tiantong: 4, taiyin: 4, tianliang: 3 }
      }
    ]
  },
  {
    id: 'deduce_7',
    topic: '金钱财富',
    scenario: '',
    question: '关于金钱与财富，你最真实的观念是：',
    options: [
      {
        text: '重视财富掌控与稳步扩张，资产规模是底气源泉',
        weights: { wuqu: 4, tianfu: 4, taiyin: 3 }
      },
      {
        text: '敢赚敢花，看准机会就敢重仓下注博取大回报',
        weights: { qisha: 4, pojun: 4, tanlang: 4 }
      },
      {
        text: '视金钱为探索世界与实现自由的手段，不迷恋数字',
        weights: { tianji: 4, taiyang: 4, jumen: 3 }
      },
      {
        text: '知足常乐，更看重金钱带来的舒适体验与人情温暖',
        weights: { tiantong: 4, taiyin: 4, tianxiang: 4 }
      }
    ]
  },
  {
    id: 'deduce_8',
    topic: '学习探索',
    scenario: '',
    question: '面对一个全新的未知领域时，你的探究习惯是：',
    options: [
      {
        text: '直奔核心骨架与实战价值，迅速转化为实际生产力',
        weights: { wuqu: 4, tianfu: 4, ziwei: 3 }
      },
      {
        text: '尝试跨界杂交与野路子，寻找没人玩过的新鲜玩法',
        weights: { tanlang: 4, pojun: 4, lianzhen: 3 }
      },
      {
        text: '顺藤摸瓜穷尽底层原理，享受体系融会贯通的快感',
        weights: { tianji: 4, jumen: 4, taiyang: 3 }
      },
      {
        text: '凭感性审美与共鸣沉浸体会，注重精神层面的滋养',
        weights: { taiyin: 4, tiantong: 4, tianliang: 3 }
      }
    ]
  },
  {
    id: 'deduce_9',
    topic: '闲暇充能',
    scenario: '',
    question: '高负荷工作后拥有完整周末，你最喜欢的充能方式是：',
    options: [
      {
        text: '复盘近期得失并打理居室，在掌控感中重获从容',
        weights: { tianfu: 4, wuqu: 4, ziwei: 3 }
      },
      {
        text: '户外剧烈运动、尝试刺激探险或参加热闹狂欢',
        weights: { tanlang: 4, pojun: 4, taiyang: 3 }
      },
      {
        text: '找个安静无人打扰的书屋，深度阅读听播客充电',
        weights: { tianji: 4, taiyin: 4, jumen: 4 }
      },
      {
        text: '睡到自然醒，吃喜欢的温暖美食，彻底放空发呆',
        weights: { tiantong: 4, taiyin: 4, tianxiang: 3 }
      }
    ]
  },
  {
    id: 'deduce_10',
    topic: '他人评价',
    scenario: '',
    question: '身边熟悉你的朋友或同事，通常觉得你是一个：',
    options: [
      {
        text: '“沉稳有霸气，关键大场面撑得住、拿得下”',
        weights: { ziwei: 4, tianfu: 4, tianliang: 3 }
      },
      {
        text: '“作风硬朗雷厉风行，行动力极强从不畏缩”',
        weights: { qisha: 4, pojun: 4, wuqu: 3 }
      },
      {
        text: '“见解独到有深度，看问题总能一针见血”',
        weights: { tianji: 4, jumen: 4, taiyang: 4 }
      },
      {
        text: '“温和体贴极好相处，情绪稳定让人倍感安心”',
        weights: { tiantong: 4, taiyin: 4, tianxiang: 4 }
      }
    ]
  }
];

export function getQuestionsForProfile(timeCertainty: 'exact' | 'uncertain'): Question[] {
  if (timeCertainty === 'exact') {
    return EXACT_CALIBRATION_QUESTIONS;
  }
  return UNCERTAIN_DEDUCTION_QUESTIONS;
}

export function getRandomQuestions(count: number = 8): Question[] {
  if (count <= 4) {
    return EXACT_CALIBRATION_QUESTIONS;
  }
  return UNCERTAIN_DEDUCTION_QUESTIONS;
}
