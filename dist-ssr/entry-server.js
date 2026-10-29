import React, { forwardRef, createElement, useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import * as fm from "framer-motion";
import { AnimatePresence } from "framer-motion";
const motion = fm.motion;
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$f = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$f);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$e = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$e);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$d = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$d);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$c = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$c);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$b);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Clock = createLucideIcon("clock", __iconNode$a);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }],
  [
    "path",
    {
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      key: "1iv0i2"
    }
  ],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const Factory = createLucideIcon("factory", __iconNode$9);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$8);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$7);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$6);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$5);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode$4);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$3);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$2);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const logoLight = "/assets/logo_light-Ccbv29uc.png";
const logoDark = "/assets/logo_dark-BV-4j-kz.png";
const Logo = ({ className = "", light = false }) => {
  return /* @__PURE__ */ jsx("div", { className: `flex items-center ${className}`, id: "brand-logo-container", children: /* @__PURE__ */ jsx(
    "img",
    {
      id: "brand-logo-img",
      src: light ? logoLight : logoDark,
      alt: "美创门业",
      className: "h-9 sm:h-11 md:h-12 lg:h-14 xl:h-16 w-auto object-contain transition-all duration-300",
      referrerPolicy: "no-referrer"
    }
  ) });
};
const heroImage = "/assets/hero_image-ClH0ccyu.png";
const caseHotel = "/assets/case_hotel-BfewSp9M.jpg";
const caseResident = "/assets/case_resident-BnN43Zk1.jpg";
const caseOffice = "/assets/case_office-CYXzdh0e.jpg";
const aboutFactory = "/assets/about_factory-By-N1K45.jpg";
const wechatQr = "/assets/wechat_qr-BSnA6uGR.png";
const productSolidWood = "/assets/product_solid_wood-Dxashzti.jpg";
const productPaintFree = "/assets/product_paint_free-8HElLXuG.jpg";
const productAluminumWood = "/assets/product_aluminum_wood-DkboVcU8.jpg";
const productSpecialCustom = "/assets/product_special_custom-4psZf29u.jpg";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
const COMPANY_INFO = {
  name: "惠州市美创门业有限公司",
  address: "广东省惠州市仲恺高新区陈江街道观田村胜弘厂厂房1楼",
  factoryAddress: "广东省惠州市仲恺高新区潼湖新华大道牛墩路 19 号",
  phone: "13554866836",
  unifiedCode: "91441303MA7FCWFU79",
  mission: "为家庭与工程提供环保、耐用、美观的门类产品，打造高性价比门业解决方案",
  vision: "成为粤东地区最具口碑的木门定制标杆企业",
  positioning: "惠州本土专业门业制造工厂"
};
const PRODUCT_CATEGORIES = [
  {
    id: "solid-wood",
    title: "实木门系列",
    description: "选用进口橡木、胡桃木等天然原木，榫卯结构，环保PU漆，彰显高贵品质。",
    features: ["进口橡木/胡桃木/沙比利", "原木切割", "多层打磨", "环保PU漆"],
    applicable: ["别墅", "高端家装", "卧室/书房原木门"],
    image: productSolidWood
  },
  {
    id: "paint-free",
    title: "免漆木门系列",
    description: "E0级环保板材，即装即住，防潮抗变形，性价比之选。",
    features: ["E0级环保密度板", "实木多层板", "无漆覆膜", "即装即住"],
    applicable: ["家装室内门", "出租房", "工程批量单"],
    image: productPaintFree
  },
  {
    id: "aluminum-wood",
    title: "铝木门系列",
    description: "铝合金边框结合实木填充，极简轻奢，隔音耐用，现代家居首选。",
    features: ["极简轮廓", "隔音≥35dB", "防潮防蛀", "坚固耐用"],
    applicable: ["现代家装", "厨卫门", "办公隔断"],
    image: productAluminumWood
  },
  {
    id: "special-custom",
    title: "定制特种门",
    description: "支持尺寸、颜色、款式全方位定制，涵盖子母门、隐形门等特种门类。",
    features: ["尺寸/颜色定制", "推拉/折叠/隐形", "防火工程门", "五金升级"],
    applicable: ["异形空间", "工程项目", "个性化家居"],
    image: productSpecialCustom
  }
];
const CORE_ADVANTAGES = [
  {
    title: "惠州本土厂家",
    description: "本土生产，售后响应快（24h上门），安装维护无忧。",
    icon: "MapPin"
  },
  {
    title: "全系环保认证",
    description: "全系采用E0/E1级环保板材，符合国标，无异味，健康环保。",
    icon: "ShieldCheck"
  },
  {
    title: "极致性价比",
    description: "厂家直供，同等品质比市场价低15%-25%。",
    icon: "TrendingDown"
  },
  {
    title: "无忧品质保障",
    description: "五金质保5年，整体质保2年，加厚工艺，更耐用。",
    icon: "Award"
  }
];
const FAQS = [
  {
    question: "美创门业主要做什么门？",
    answer: "四大品类：① 入户防盗门（加厚钢板+C级锁芯，GB17565-2007 标准）；② 实木烤漆门（橡木/胡桃木榫卯结构）；③ 铝木复合门（极简轻奢+隔音≥35dB）；④ 极窄铝合金极简门/定制特种门。全屋配齐，工厂直销无中间商。"
  },
  {
    question: "是否支持上门测量与安装？",
    answer: "惠州区域免费上门测量、设计、送货、安装一体化服务。"
  },
  {
    question: "产品环保吗？",
    answer: "全系采用E0/E1级环保板材，无甲醛添加，符合国家室内环保标准。"
  },
  {
    question: "定制周期与质保多久？",
    answer: "常规7–15天交付；整体质保2年，五金配件质保5年。"
  },
  {
    question: "能否承接工程批量单？",
    answer: "可承接大小工程单，提供报价、深化、生产、安装、验收全流程服务。"
  },
  {
    question: "美创门业做入户防盗门吗？",
    answer: "做。入户防盗门是美创四大核心品类之一：加厚冷轧钢板 + C级锁芯 + 防潮防锈工艺，可承接家装单户、楼盘批量、酒店公寓整套。已交付惠州 XX 花园 1280 套、XX 酒店 320 套等入户防盗门项目。"
  },
  {
    question: "美创门业能接百万级大型工程项目吗？",
    answer: "可以。工厂月产能 5000+ 套、3000 ㎡ 数控生产线、自有安装团队，已承接多项百万级批量项目：XX 花园入户门 1280 套（约 400 万合同额）、XX 工业园整套门 860 套（约 95 万）、XX 酒店整套门 320 套（约 68 万），批量单稳定排产 10-18 天交付。"
  }
];
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [showNavQr, setShowNavQr] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "首页", href: "#home" },
    { name: "产品中心", href: "#products" },
    { name: "核心优势", href: "#advantages" },
    { name: "工程案例", href: "#cases" },
    { name: "关于我们", href: "/about.html" },
    { name: "门业百科", href: "/pages/blog/" },
    { name: "常见问题", href: "#faq" },
    { name: "联系我们", href: "#contact" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-brand-primary selection:text-white", children: [
    /* @__PURE__ */ jsxs(
      "nav",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3 sm:py-4 md:py-5" : "bg-transparent py-5 sm:py-6 md:py-7"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx(Logo, { light: !scrolled }),
            /* @__PURE__ */ jsxs("div", { className: "md:flex items-center gap-6 block", children: [
              navLinks.map((link) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  className: "text-[13px] font-medium text-neutral-800 hover:text-brand-primary transition-colors tracking-tight",
                  children: link.name
                },
                link.name
              )),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#contact",
                    onClick: (e) => {
                      e.preventDefault();
                      setShowNavQr(!showNavQr);
                    },
                    onMouseEnter: () => setShowNavQr(true),
                    onMouseLeave: () => setShowNavQr(false),
                    className: "ml-2 px-6 py-2.5 bg-brand-primary text-white rounded-full text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-primary/20 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { size: 14, className: "fill-current" }),
                      "立即咨询"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: `absolute top-full right-0 mt-4 transition-all duration-300 transform z-50 ${showNavQr ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded-xl shadow-2xl border border-neutral-100", children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-neutral-400 text-[10px] text-center px-4", children: [
                      /* @__PURE__ */ jsx(QrCode, { size: 40, className: "mx-auto mb-2 opacity-20" }),
                      /* @__PURE__ */ jsx("p", { children: "微信二维码" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: wechatQr,
                        alt: "微信二维码",
                        className: "absolute inset-0 w-full h-full object-contain p-2"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-neutral-900 font-bold", children: "扫一扫加我为朋友" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] text-neutral-400", children: "惠州美创门业 · 官方微信" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-full right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white" })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "md:hidden p-2",
                onClick: () => setIsMenuOpen(!isMenuOpen),
                children: isMenuOpen ? /* @__PURE__ */ jsx(X, {}) : /* @__PURE__ */ jsx(Menu, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: isMenuOpen && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "md:hidden bg-white border-t overflow-hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col gap-4", children: [
                navLinks.map((link) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: link.href,
                    onClick: () => setIsMenuOpen(false),
                    className: "text-lg font-medium border-b border-neutral-100 pb-2 hover:text-brand-primary",
                    children: link.name
                  },
                  link.name
                )),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#contact",
                    onClick: () => setIsMenuOpen(false),
                    className: "flex items-center gap-3 text-brand-primary font-bold py-2",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
                      "立即咨询"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `tel:${COMPANY_INFO.phone}`,
                    className: "flex items-center gap-3 text-neutral-500 font-medium py-2 text-sm italic",
                    children: [
                      "或直接来电: ",
                      COMPANY_INFO.phone
                    ]
                  }
                )
              ] })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { id: "home", className: "relative h-screen flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: heroImage,
            alt: "Premium Interior Door",
            className: "w-full h-full object-cover",
            referrerPolicy: "no-referrer"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 w-full", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-2xl text-white",
          children: [
            /* @__PURE__ */ jsx("div", { className: "inline-block px-3 py-1 bg-brand-primary text-white text-[10px] sm:text-xs font-bold leading-none mb-8 rounded-sm", children: "惠州本土专业制造品牌" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-[88px] font-serif font-medium mb-8 leading-[1.05] tracking-tight", children: [
              "匠心造好门",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-brand-accent", children: "品质" }),
              "赢口碑"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/90 mb-12 leading-relaxed font-normal max-w-2xl", children: "惠州市美创门业有限公司是惠州仲恺本土实体门类生产工厂，主营四大品类：入户防盗门、室内实木烤漆门、铝木复合门、极窄铝合金极简门。工厂集研发、数控生产、定制加工、配送安装、售后维保一体，面向惠州全域家装自建房、精装楼盘、商铺工装、装修公司配套、全国经销商供货。针对南方回南天潮湿气候优化防潮、防变形、防锈工艺，非标尺寸可定制，工厂直供无中间商差价，提供免费勘测、全屋搭配方案、透明报价、稳定排产交付、本地极速售后全流程服务。" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-5", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#products",
                  className: "px-10 py-5 bg-white text-neutral-900 rounded-full font-bold text-base hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 group shadow-xl",
                  children: [
                    "浏览产品",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#contact",
                  className: "px-10 py-5 border border-white/40 backdrop-blur-md text-white rounded-full font-bold text-base hover:bg-white/10 transition-all text-center",
                  children: "获取报价"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/60 uppercase tracking-widest", children: "探索更多" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: [0, 8, 0] },
            transition: { repeat: Infinity, duration: 2 },
            className: "w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1",
            children: /* @__PURE__ */ jsx("div", { className: "w-1 h-2 bg-white rounded-full" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-12 border-b", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8", children: [
      { value: "5000+", label: "月生产能力 (套)", icon: Factory },
      { value: "7-15", label: "标准交付周期 (天)", icon: Clock },
      { value: "15-25%", label: "同质比更低价格", icon: TrendingDown },
      { value: "5年", label: "五金核心质保", icon: ShieldCheck }
    ].map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center group", children: [
      /* @__PURE__ */ jsx(stat.icon, { className: "text-brand-primary mb-3 opacity-60 group-hover:opacity-100 transition-opacity", size: 32 }),
      /* @__PURE__ */ jsx("span", { className: "text-3xl font-serif font-bold text-brand-primary", children: stat.value }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1", children: stat.label })
    ] }, idx)) }) }),
    /* @__PURE__ */ jsx("section", { id: "products", className: "py-24 bg-neutral-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-primary tracking-[0.3em] mb-4", children: "产品中心" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-5xl font-serif font-bold leading-tight", children: [
            "多元化产品矩阵",
            /* @__PURE__ */ jsx("br", {}),
            "致力于满足全屋定制需求"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-500 max-w-sm", children: "从经典实木到现代极简铝木门，我们坚持采用E0级以上环保标准，为您打造安心舒适的家居环境。" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: PRODUCT_CATEGORIES.map((category) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: { y: -10 },
          className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100 flex flex-col h-full",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: category.image,
                alt: category.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                referrerPolicy: "no-referrer"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-3", children: category.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600 mb-6 leading-relaxed flex-grow", children: category.description }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6", children: category.features.slice(0, 3).map((feat, i) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-neutral-500 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(CircleCheck, { size: 12, className: "text-brand-accent" }),
                feat
              ] }, i)) }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/products/${category.id}.html`,
                  className: "w-full py-3 border border-neutral-200 rounded-lg text-sm font-bold hover:bg-neutral-50 transition-colors text-center",
                  children: "查看详情"
                }
              )
            ] })
          ]
        },
        category.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "advantages", className: "py-24 bg-neutral-900 text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-accent tracking-[0.3em] mb-4", children: "核心优势" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-serif font-bold", children: "为什么选择美创门业？" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: CORE_ADVANTAGES.map((adv, idx) => {
        const icons = {
          MapPin,
          ShieldCheck,
          TrendingDown,
          Award
        };
        const Icon2 = icons[adv.icon] || ShieldCheck;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Icon2, { className: "text-brand-accent", size: 32 }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-4", children: adv.title }),
              /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-sm leading-relaxed", children: adv.description })
            ]
          },
          idx
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-neutral-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-brand-primary mb-3", children: "工厂核心优势" }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-600 mb-10", children: "六大差异化竞争力，让美创门业在惠州家装与工程市场中脱颖而出" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "地域优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "惠州仲恺本地工厂，本土生产，售后响应快（24h 上门），安装维护无忧。本地物流成本低，送货周期短。" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "品类优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "四大门类全覆盖：入户门+室内房门+厨卫门一套配齐，风格统一，减少多方对接麻烦。可承接全屋门墙柜配套门、香港整套组装出货。" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "工艺优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "专为岭南气候升级防潮、防变形、防水工艺，解决南方家装门常见通病（木门开裂、铝门渗水、入户门防盗差）。" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "价格优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "自产自销，省去门店、经销商层层加价。同等配置低于门店零售价 30% 左右。工厂直营零售+工程批量供货+经销商加盟三重渠道。" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "交付优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "自有生产线，排产可控，工期透明，不会外包外发耽误交付。常规款式生产周期 10-18 天。" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-neutral-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-brand-primary mb-2", children: "服务优势" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "免费上门精准量尺，免费全屋配门方案设计，本地专业安装团队，原厂质保 5 年五金核心，终身提供维修调试换件服务。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-neutral-100 p-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-6", children: "标准服务流程（6 步全闭环）" }),
        /* @__PURE__ */ jsxs("ol", { className: "space-y-3 text-sm text-neutral-700", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "1. 咨询沟通" }),
            "：线上线下确认户型、装修风格、门类需求与预算"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2. 免费勘测" }),
            "：惠州全域免费上门实地勘测，规避门洞尺寸误差"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3. 方案报价" }),
            "：设计师出具全屋门类搭配方案，附带明细透明报价，无隐形增项"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4. 工厂生产" }),
            "：客户确认方案下单后，工厂流水线数控生产，全程多重品检"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5. 配送安装" }),
            "：本地专车配送，本厂安装团队标准化施工、清洁收尾"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "6. 售后质保" }),
            "：完工验收后录入售后档案，原厂质保终身维护"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "cases", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-primary tracking-[0.3em] mb-4", children: "工程案例" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-serif font-bold mb-6", children: "服务覆盖惠州及大湾区" }),
        /* @__PURE__ */ jsx("p", { className: "text-neutral-500 max-w-2xl mx-auto", children: "先后承接多个知名办公、商业、住宅及文教建筑工程。" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl aspect-[16/10]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: caseHotel,
              alt: "Engineering Case",
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
              referrerPolicy: "no-referrer"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-brand-accent font-bold uppercase tracking-widest mb-2", children: "酒店工程项目" }),
            /* @__PURE__ */ jsx("h5", { className: "text-white text-2xl font-serif font-bold", children: "高端酒店客房木门统一订制" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative group overflow-hidden rounded-3xl aspect-square", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: caseResident,
            alt: "Resident",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
            referrerPolicy: "no-referrer"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "relative group overflow-hidden rounded-3xl aspect-square", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: caseOffice,
            alt: "Office",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
            referrerPolicy: "no-referrer"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 bg-white overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: aboutFactory,
            alt: "Craftsmanship",
            className: "w-full h-full object-cover",
            referrerPolicy: "no-referrer"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary rounded-3xl -z-0 opacity-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -left-12 aspect-square w-48 bg-brand-accent rounded-full -z-0 opacity-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl z-20 border border-white/50 md:block", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Users, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "100%" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase text-neutral-500 font-bold tracking-widest leading-none", children: "惠州本土生产制造" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-primary tracking-[0.3em] mb-4", children: "关于我们" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight", children: [
          "二十载行业积淀",
          /* @__PURE__ */ jsx("br", {}),
          "专注门业高端定制"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-neutral-600 mb-8 leading-relaxed", children: [
          "惠州市美创门业有限公司（又称：美创门厂）坐落仲恺潼侨，是惠州仲恺本土实体门类生产工厂（成立于 2019 年，2021 年工商注册），主营四大品类：",
          /* @__PURE__ */ jsx("strong", { children: "入户防盗门（GB17565-2007 C级标准）" }),
          "、全屋实木烤漆门、铝木复合门、极窄铝合金极简门。工厂占地 3000+㎡，全套数控裁切、封边、组装设备，月产能 5000+ 套，每款产品出厂经过隔音、密封、防潮、抗压多重质检，解决广东珠三角地区木门开裂、铝门渗水、入户门防盗差等家装痛点。累计承接 20+ 惠州大湾区工程（楼盘入户批量、酒店公寓整套、工业园办公门），单项最高合同额 400 万。经营模式为工厂直营零售+工程批量供货+经销商加盟三重渠道，不经过中间商，同等配置低于门店零售价 30% 左右。自有安装团队，无需外包，售后响应 24 小时内上门。展厅地址：惠州市仲恺高新区潼侨镇新城山庄A8号铂金实业。",
          /* @__PURE__ */ jsxs("p", { className: "definition-opening", style: { opacity: "0.95", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem", padding: "12px 16px", background: "#f8f9fa", borderLeft: "4px solid #c8a875", borderRadius: "0 4px 4px 0" }, children: [
            /* @__PURE__ */ jsx("strong", { children: "【定义】" }),
            "美创门业（别名：美创门厂）是一家位于广东省惠州市的工厂直供门业制造商，2019 年起步、2021 年工商注册，专注入户防盗门、室内木门、铝合金门、定制门墙柜的设计、生产与工程配套服务。惠州本地源头门厂，支持非标定制、批量工程、工厂直供无中间商。展厅地址：仲恺高新区潼侨镇新城山庄 A8 号，工厂位于潼湖新华大道牛墩路 19 号。"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h5", { className: "font-bold border-l-2 border-brand-primary pl-4", children: "我们的使命" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500", children: COMPANY_INFO.mission })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h5", { className: "font-bold border-l-2 border-brand-accent pl-4", children: "我们的愿景" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500", children: COMPANY_INFO.vision })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 pt-6 border-t font-medium", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "text-brand-primary", size: 18 }),
            "ISO9001质管认证"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "text-brand-primary", size: 18 }),
            "E0级环保标准"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "text-brand-primary", size: 18 }),
            "门业协会会员"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "text-brand-primary", size: 18 }),
            /* @__PURE__ */ jsx("a", { href: "https://www.qcc.com/web/search?key=91441303MA7FCWFU79", target: "_blank", rel: "noopener noreferrer", className: "hover:text-brand-primary underline-offset-2 hover:underline", children: "工商信息（企查查）" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "text-brand-primary", size: 18 }),
            /* @__PURE__ */ jsx("a", { href: "https://www.tianyancha.com/search?key=91441303MA7FCWFU79", target: "_blank", rel: "noopener noreferrer", className: "hover:text-brand-primary underline-offset-2 hover:underline", children: "工商信息（天眼查）" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "faq", className: "py-24 bg-neutral-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-primary tracking-[0.3em] mb-4", children: "常见问题" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-serif font-bold", children: "专业解答 · 快速解惑" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: FAQS.map((faq, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full px-8 py-6 text-left flex justify-between items-center hover:bg-neutral-50 bg-white transition-colors",
                onClick: () => setActiveFaq(activeFaq === idx ? null : idx),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold md:text-lg", children: faq.question }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}` })
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { children: activeFaq === idx && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { height: 0 },
                animate: { height: "auto" },
                exit: { height: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsx("div", { className: "px-8 pb-6 text-neutral-600 border-t border-neutral-50 pt-4 leading-relaxed", children: faq.answer })
              }
            ) })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "contact", className: "py-24 bg-neutral-900 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-brand-primary/10 -skew-x-12 translate-x-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-brand-accent tracking-[0.3em] mb-4", children: "联系我们" }),
          /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-serif font-bold mb-8", children: "准备好为您的空间定制美学吗？" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-400 mb-10 text-lg", children: "欢迎垂询，我们将竭诚为您提供专业的门类顾问服务与定制报价。" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-brand-accent", children: /* @__PURE__ */ jsx(Phone, { size: 28 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-lg mb-1", children: "咨询热线" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-sans font-bold text-white tracking-tight", children: COMPANY_INFO.phone }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-neutral-500 tracking-[0.2em] mt-1", children: "周一至周日 (8:30 - 18:00)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 text-brand-accent", children: /* @__PURE__ */ jsx(MapPin, { size: 28 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-lg mb-1", children: "展厅地址" }),
                /* @__PURE__ */ jsx("p", { className: "text-neutral-300", children: COMPANY_INFO.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 text-brand-accent", children: /* @__PURE__ */ jsx(Factory, { size: 28 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-lg mb-1", children: "生产基地" }),
                /* @__PURE__ */ jsx("p", { className: "text-neutral-300", children: COMPANY_INFO.factoryAddress })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -translate-y-8 translate-x-8 pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl translate-y-8 -translate-x-8 pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-sm flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 text-brand-primary", children: /* @__PURE__ */ jsx(QrCode, { size: 32 }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3", children: "官方微信咨询" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500 leading-relaxed mb-8", children: "欢迎扫描下方官方微信二维码，即可享受一对一专业专属顾问服务，获取免费定制报价与门类方案。" }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-white border border-neutral-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group/card mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-48 h-48 bg-neutral-50 rounded-xl flex items-center justify-center relative overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: wechatQr,
                alt: "微信二维码",
                className: "absolute inset-0 w-full h-full object-contain p-2 group-hover/card:scale-105 transition-transform duration-300"
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400", children: "长按识别或打开微信扫一扫" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-primary font-bold mt-1", children: "惠州美创门业 · 官方微信" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-neutral-900 pt-16 pb-8 border-t border-white/5 relative z-10 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 lg:col-span-1", children: [
          /* @__PURE__ */ jsx(Logo, { light: true, className: "mb-6" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-400 leading-relaxed mb-8", children: [
            COMPANY_INFO.positioning,
            "。立足惠州，服务全国，以匠心成就每一扇好门。"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group/qr",
                onMouseEnter: () => setShowQr(true),
                onMouseLeave: () => setShowQr(false),
                onClick: () => setShowQr(!showQr),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsx(QrCode, { size: 18, title: "微信" }) }),
                  /* @__PURE__ */ jsx("div", { className: `absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 transform z-50 ${showQr ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`, children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded-xl shadow-2xl border border-neutral-100", children: [
                    /* @__PURE__ */ jsxs("div", { className: "w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden", children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-neutral-400 text-[10px] text-center px-4", children: [
                        /* @__PURE__ */ jsx(QrCode, { size: 40, className: "mx-auto mb-2 opacity-20" }),
                        /* @__PURE__ */ jsx("p", { children: "微信二维码" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: wechatQr,
                          alt: "微信二维码",
                          className: "absolute inset-0 w-full h-full object-contain p-2"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-neutral-900 font-bold", children: "扫一扫加我为朋友" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[8px] text-neutral-400", children: "惠州美创门业 · 官方微信" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("a", { href: "https://www.douyin.com/user/MS4wLjABAAAA8EC38gY1OJDxvQZVDbVTvre35CZYi9mqjW3w2P3NQiM", target: "_blank", rel: "noopener noreferrer", "aria-label": "抖音", title: "抖音", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://www.xiaohongshu.com/user/profile/meichuangmenye", target: "_blank", rel: "noopener noreferrer", "aria-label": "小红书", title: "小红书", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsx(Building2, { size: 18 }) }) }),
            /* @__PURE__ */ jsx("a", { href: "https://zhihu.com/org/meichuangmenye", target: "_blank", rel: "noopener noreferrer", "aria-label": "知乎", title: "知乎", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsx(Factory, { size: 18 }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs", children: "快速链接" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-sm text-neutral-400", children: navLinks.slice(1).map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: link.href, className: "hover:text-white transition-colors", children: link.name }) }, link.href)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs", children: "产品系列" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-sm text-neutral-400", children: PRODUCT_CATEGORIES.map((cat) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#products", className: "hover:text-white transition-colors", children: cat.title }) }, cat.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs", children: "企业资质" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-xs text-neutral-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "统一社会信用代码：",
              /* @__PURE__ */ jsx("br", {}),
              COMPANY_INFO.unifiedCode
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2", children: /* @__PURE__ */ jsxs("a", { href: "tel:" + COMPANY_INFO.phone, className: "hover:text-brand-primary transition-colors", children: [
              "咨询热线：",
              COMPANY_INFO.phone
            ] }) }),
            /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "https://meichuangmenye.com", className: "hover:text-brand-primary transition-colors", children: "官方网站：meichuangmenye.com" }) }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Copyright © ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " ",
              COMPANY_INFO.name,
              ". All Rights Reserved."
            ] }),
            /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "https://beian.miit.gov.cn/#/Integrated/index", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: "粤ICP备2026061405号" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-8 border-t border-white/5 text-center text-xs text-neutral-500 font-medium", children: /* @__PURE__ */ jsx("p", { children: "匠心营造 · 环保智造 · 高端定制 · 惠州美创门业" }) })
    ] }) })
  ] });
}
if (typeof global.window === "undefined") {
  global.window = {
    innerWidth: 1920,
    innerHeight: 1080,
    scrollY: 0,
    scrollX: 0,
    devicePixelRatio: 1,
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    addEventListener: () => {
    },
    removeEventListener: () => {
    },
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    localStorage: { getItem: () => null, setItem: () => {
    }, removeItem: () => {
    } }
  };
}
if (typeof global.document === "undefined") {
  global.document = {
    createElement: () => ({
      style: {},
      setAttribute: () => {
      },
      addEventListener: () => {
      },
      removeEventListener: () => {
      },
      appendChild: () => {
      },
      removeChild: () => {
      },
      classList: { add: () => {
      }, remove: () => {
      } },
      getContext: () => null
    }),
    createTextNode: (t) => ({ nodeValue: t }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    body: {},
    head: {},
    documentElement: { style: {} },
    addEventListener: () => {
    },
    removeEventListener: () => {
    },
    referrer: "",
    readyState: "complete",
    URL: "https://meichuangmenye.com/"
  };
}
if (typeof global.navigator === "undefined") {
  global.navigator = { userAgent: "Node.js SSR", platform: "SSR" };
}
function render() {
  try {
    const html = renderToString(React.createElement(App));
    return html;
  } catch (err) {
    console.error("[SSR] renderToString 失败:", err);
    return "";
  }
}
export {
  render
};
