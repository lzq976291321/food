import { FoodItem } from './types';

export const FOOD_LIST: FoodItem[] = [
  // 炒菜 (Stir-fry)
  { id: '1', name: '西红柿炒鸡蛋', emoji: '🍅', color: '#FF6347', description: '国民第一菜，酸甜下饭神！', category: '炒菜' },
  { id: '2', name: '酸辣土豆丝', emoji: '🥔', color: '#F4A460', description: '脆嫩酸爽，米饭杀手！', category: '炒菜' },
  { id: '3', name: '鱼香肉丝', emoji: '🍲', color: '#CD5C5C', description: '不见鱼影，却有鱼鲜！', category: '炒菜' },
  { id: '4', name: '宫保鸡丁', emoji: '🍗', color: '#B22222', description: '麻辣酸甜，口感丰富！', category: '炒菜' },
  { id: '5', name: '麻婆豆腐', emoji: '🥘', color: '#DC143C', description: '麻辣鲜香烫，下饭一绝！', category: '炒菜' },
  { id: '6', name: '回锅肉', emoji: '🥓', color: '#8B4513', description: '川菜之首，肥而不腻！', category: '炒菜' },
  { id: '7', name: '青椒肉丝', emoji: '🫑', color: '#2E8B57', description: '家常味道，简单美好！', category: '炒菜' },
  { id: '8', name: '地三鲜', emoji: '🍆', color: '#8B4513', description: '土豆茄子辣椒，素菜荤吃！', category: '炒菜' },
  { id: '9', name: '蒜蓉西兰花', emoji: '🥦', color: '#228B22', description: '清脆爽口，健康美味！', category: '炒菜' },
  { id: '10', name: '手撕包菜', emoji: '🥬', color: '#32CD32', description: '爽脆微辣，镬气十足！', category: '炒菜' },
  { id: '11', name: '葱爆羊肉', emoji: '🥩', color: '#D2691E', description: '葱香浓郁，肉质鲜嫩！', category: '炒菜' },
  { id: '12', name: '糖醋里脊', emoji: '🍖', color: '#FF4500', description: '酸甜酥脆，外焦里嫩！', category: '炒菜' },
  { id: '13', name: '蚝油生菜', emoji: '🥗', color: '#006400', description: '鲜嫩多汁，清爽解腻！', category: '炒菜' },
  { id: '14', name: '蒜苔炒肉', emoji: '🥖', color: '#008000', description: '蒜香浓郁，口感爽脆！', category: '炒菜' },
  { id: '15', name: '韭菜炒鸡蛋', emoji: '🍳', color: '#FFD700', description: '鲜香扑鼻，经典搭配！', category: '炒菜' },
  { id: '16', name: '小炒黄牛肉', emoji: '🐂', color: '#A52A2A', description: '香辣滑嫩，野性十足！', category: '炒菜' },
  { id: '17', name: '干煸四季豆', emoji: '🥒', color: '#556B2F', description: '干香麻辣，下酒好菜！', category: '炒菜' },
  { id: '18', name: '虾仁滑蛋', emoji: '🍤', color: '#FFA07A', description: '滑嫩鲜美，老少皆宜！', category: '炒菜' },
  { id: '19', name: '干锅菜花', emoji: '🥦', color: '#F0E68C', description: '焦香爽脆，超级下饭！', category: '炒菜' },
  { id: '20', name: '尖椒干豆腐', emoji: '🥡', color: '#F5DEB3', description: '东北特色，豆香浓郁！', category: '炒菜' },
  { id: '21', name: '京酱肉丝', emoji: '🌯', color: '#8B0000', description: '酱香浓郁，卷饼一绝！', category: '炒菜' },
  { id: '22', name: '木须肉', emoji: '🍄', color: '#DEB887', description: '营养均衡，家常经典！', category: '炒菜' },
  { id: '23', name: '辣椒炒肉', emoji: '🌶️', color: '#228B22', description: '湘菜灵魂，香辣过瘾！', category: '炒菜' },
  { id: '24', name: '西芹腰果百合', emoji: '🥜', color: '#90EE90', description: '清淡爽口，养生佳品！', category: '炒菜' },
  { id: '25', name: '酸豆角炒肉末', emoji: '🍚', color: '#556B2F', description: '酸辣开胃，拌饭神器！', category: '炒菜' },
  { id: '26', name: '包菜粉丝炒鸡蛋', emoji: '🍜', color: '#DAA520', description: '简单快手，美味饱腹！', category: '炒菜' },
  { id: '27', name: '菠萝咕咾肉', emoji: '🍍', color: '#FFD700', description: '酸甜可口，果香四溢！', category: '炒菜' },
  { id: '28', name: '清炒虾仁', emoji: '🦐', color: '#FFB6C1', description: '清淡鲜美，原汁原味！', category: '炒菜' },
  { id: '29', name: '苦瓜炒蛋', emoji: '🥒', color: '#006400', description: '苦中带甘，清热去火！', category: '炒菜' },
  { id: '30', name: '荷兰豆炒腊肠', emoji: '🥓', color: '#32CD32', description: '红绿相间，腊味十足！', category: '炒菜' },

  // 红烧 (Braised)
  { id: '31', name: '红烧肉', emoji: '🥘', color: '#8B0000', description: '浓油赤酱，入口即化！', category: '红烧' },
  { id: '32', name: '红烧茄子', emoji: '🍆', color: '#800080', description: '软糯入味，汤汁浓郁！', category: '红烧' },
  { id: '33', name: '红烧排骨', emoji: '🍖', color: '#A0522D', description: '咸甜适中，肉香骨酥！', category: '红烧' },
  { id: '34', name: '可乐鸡翅', emoji: '🍗', color: '#8B4513', description: '甜咸适中，小朋友最爱！', category: '红烧' },
  { id: '35', name: '红烧猪蹄', emoji: '🐷', color: '#CD853F', description: '美容养颜，胶原蛋白！', category: '红烧' },
  { id: '36', name: '红烧鱼', emoji: '🐟', color: '#A52A2A', description: '年年有余，鲜嫩多汁！', category: '红烧' },
  { id: '37', name: '土豆烧牛肉', emoji: '🥔', color: '#8B4513', description: '土豆绵软，牛肉劲道！', category: '红烧' },
  { id: '38', name: '黄焖鸡', emoji: '🐔', color: '#D2691E', description: '汤汁浓郁，拌饭一绝！', category: '红烧' },
  { id: '39', name: '啤酒鸭', emoji: '🦆', color: '#800000', description: '啤酒去腥，鸭肉鲜香！', category: '红烧' },
  { id: '40', name: '大盘鸡', emoji: '🍛', color: '#FF8C00', description: '新疆风味，麻辣鲜香！', category: '红烧' },

  // 凉菜 (Cold Dishes)
  { id: '41', name: '凉拌黄瓜', emoji: '🥒', color: '#00FF7F', description: '清脆爽口，开胃神器！', category: '凉菜' },
  { id: '42', name: '皮蛋豆腐', emoji: '🥚', color: '#708090', description: '口感丰富，清凉解暑！', category: '凉菜' },
  { id: '43', name: '口水鸡', emoji: '🌶️', color: '#FF4500', description: '麻辣鲜香，红油诱人！', category: '凉菜' },
  { id: '44', name: '凉拌海带丝', emoji: '🌿', color: '#006400', description: '脆嫩爽口，营养丰富！', category: '凉菜' },
  { id: '45', name: '蒜泥白肉', emoji: '🥓', color: '#FA8072', description: '蒜香浓郁，肥而不腻！', category: '凉菜' },

  // 蒸菜 (Steamed)
  { id: '46', name: '清蒸鲈鱼', emoji: '🐟', color: '#F0F8FF', description: '鲜嫩无比，原汁原味！', category: '蒸菜' },
  { id: '47', name: '粉蒸肉', emoji: '🥩', color: '#BC8F8F', description: '软糯咸香，米粉吸收油脂！', category: '蒸菜' },
  { id: '48', name: '蒜蓉粉丝蒸扇贝', emoji: '🐚', color: '#FFFACD', description: '蒜香浓郁，鲜美多汁！', category: '蒸菜' },
  { id: '49', name: '梅菜扣肉', emoji: '🍖', color: '#3E2723', description: '咸甜适口，肥而不腻！', category: '蒸菜' },
  { id: '50', name: '蒸水蛋', emoji: '🍮', color: '#FFFFE0', description: '滑嫩如镜，老少皆宜！', category: '蒸菜' },

  // 汤与粥 (Soup)
  { id: '51', name: '紫菜蛋花汤', emoji: '🥣', color: '#FFFF00', description: '简单快手，鲜美解腻！', category: '汤与粥' },
  { id: '52', name: '鲫鱼豆腐汤', emoji: '🍲', color: '#FFFAF0', description: '汤白如奶，鲜美无比！', category: '汤与粥' },
  { id: '53', name: '罗宋汤', emoji: '🥘', color: '#FF6347', description: '酸甜开胃，营养丰富！', category: '汤与粥' },
  { id: '54', name: '皮蛋瘦肉粥', emoji: '🥣', color: '#C0C0C0', description: '咸香顺滑，暖胃舒适！', category: '汤与粥' },
  { id: '55', name: '排骨玉米汤', emoji: '🌽', color: '#FFD700', description: '清甜滋润，补钙佳品！', category: '汤与粥' },

  // 主食 (Staple)
  { id: '56', name: '扬州炒饭', emoji: '🍚', color: '#F0E68C', description: '粒粒分明，色彩丰富！', category: '主食' },
  { id: '57', name: '炸酱面', emoji: '🍜', color: '#8B4513', description: '酱香浓郁，面条劲道！', category: '主食' },
  { id: '58', name: '葱油拌面', emoji: '🍝', color: '#D2691E', description: '葱香扑鼻，简单美味！', category: '主食' },
];

export const COMPLIMENTS = [
  "绝佳的选择！",
  "你的味蕾会感谢你的！",
  "这就是命中注定！",
  "今天就要吃顿好的！",
  "多巴胺正在加载...",
  "冲冲冲！开吃！",
  "这也太香了吧！",
  "干饭人，干饭魂！",
  "此时不吃更待何时！",
  "碳水教父觉得很赞！",
  "这顿饭能让你快乐一整天！",
  "相信算法，这就是你的本命菜！",
  "再也不用纠结吃什么了！",
  "准备好迎接美味了吗？",
  "吃饱了才有力气减肥！"
];