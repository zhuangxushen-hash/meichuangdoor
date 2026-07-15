/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import solidWoodDoorDetail from "./assets/images/solid_wood_door_detail_1777014927673.png";
import aluminumWoodDoorModern from "./assets/images/aluminum_wood_door_modern_1777014942577.png";
import factoryCraftsmanship from "./assets/images/factory_craftsmanship_1777014958708.png";
import engineeringCaseDisplay from "./assets/images/engineering_case_display_1777014975345.png";

export const COMPANY_INFO = {
  name: "惠州市美创门业有限公司",
  shortName: "美创门业",
  since: "2021年12月29日",
  address: "广东省惠州市仲恺高新区陈江街道观田村胜弘厂厂房1楼",
  factoryAddress: "惠州市潼湖经理管理区新华大道牛墩路19号厂房",
  phone: "13554866836",
  contactPerson: "13554866836",
  serviceHours: "周一至周日 8:30–18:00",
  unifiedCode: "91441303MA7FCWFU79",
  tagline: "匠心造好门、品质赢口碑、诚信立品牌",
  mission: "为家庭与工程提供环保、耐用、美观的门类产品，打造高性价比门业解决方案",
  vision: "成为粤东地区最具口碑的木门定制标杆企业",
  positioning: "惠州本土专业木门、铝木门、室内门制造与定制服务商",
};

export const PRODUCT_CATEGORIES = [
  {
    id: "solid-wood",
    title: "实木门系列",
    description: "选用进口橡木、胡桃木等天然原木，榫卯结构，环保PU漆，彰显高贵品质。",
    features: ["进口橡木/胡桃木/沙比利", "原木切割", "多层打磨", "环保PU漆"],
    applicable: ["别墅", "高端家装", "卧室/书房原木门"],
    image: solidWoodDoorDetail,
  },
  {
    id: "paint-free",
    title: "免漆木门系列",
    description: "E0级环保板材，即装即住，防潮抗变形，性价比之选。",
    features: ["E0级环保密度板", "实木多层板", "无漆覆膜", "即装即住"],
    applicable: ["家装室内门", "出租房", "工程批量单"],
    image: factoryCraftsmanship,
  },
  {
    id: "aluminum-wood",
    title: "铝木门系列",
    description: "铝合金边框结合实木填充，极简轻奢，隔音耐用，现代家居首选。",
    features: ["极简轮廓", "隔音≥35dB", "防潮防蛀", "坚固耐用"],
    applicable: ["现代家装", "厨卫门", "办公隔断"],
    image: aluminumWoodDoorModern,
  },
  {
    id: "special-custom",
    title: "定制特种门",
    description: "支持尺寸、颜色、款式全方位定制，涵盖子母门、隐形门等特种门类。",
    features: ["尺寸/颜色定制", "推拉/折叠/隐形", "防火工程门", "五金升级"],
    applicable: ["异形空间", "工程项目", "个性化家居"],
    image: engineeringCaseDisplay,
  },
];

export const CORE_ADVANTAGES = [
  {
    title: "惠州本土厂家",
    description: "本土生产，售后响应快（24h上门），安装维护无忧。",
    icon: "MapPin",
  },
  {
    title: "全系环保认证",
    description: "全系采用E0/E1级环保板材，符合国标，无异味，健康环保。",
    icon: "ShieldCheck",
  },
  {
    title: "极致性价比",
    description: "厂家直供，同等品质比市场价低15%-25%。",
    icon: "TrendingDown",
  },
  {
    title: "无忧品质保障",
    description: "五金质保5年，整体质保2年，加厚工艺，更耐用。",
    icon: "Award",
  },
];

export const SERVICE_CAPABILITIES = [
  {
    title: "生产规模",
    description: "月产能5000+套，可承接大型工程单。",
  },
  {
    title: "定制能力",
    description: "一站式设计、生产、安装与售后服务。",
  },
  {
    title: "交付周期",
    description: "常规7-15天，加急最快5天交付。",
  },
  {
    title: "服务区域",
    description: "以惠州为中心，覆盖珠三角主要城市。",
  },
];

export const FAQS = [
  {
    question: "美创门业主要做什么门？",
    answer: "专注实木门、免漆木门、铝木门、室内定制门，铝合金极简门，主打环保与高性价比。",
  },
  {
    question: "是否支持上门测量与安装？",
    answer: "惠州区域免费上门测量、设计、送货、安装一体化服务。",
  },
  {
    question: "产品环保吗？",
    answer: "全系采用E0/E1级环保板材，无甲醛添加，符合国家室内环保标准。",
  },
  {
    question: "定制周期与质保多久？",
    answer: "常规7–15天交付；整体质保2年，五金配件质保5年。",
  },
  {
    question: "能否承接工程批量单？",
    answer: "可承接大小工程单，提供报价、深化、生产、安装、验收全流程服务。",
  },
];
