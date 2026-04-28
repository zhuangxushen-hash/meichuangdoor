/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  TrendingDown, 
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building2,
  Factory,
  Truck,
  Users,
  QrCode,
  MessageCircle
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  PRODUCT_CATEGORIES, 
  CORE_ADVANTAGES, 
  SERVICE_CAPABILITIES, 
  FAQS 
} from './constants';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [showNavQr, setShowNavQr] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '产品中心', href: '#products' },
    { name: '核心优势', href: '#advantages' },
    { name: '工程案例', href: '#cases' },
    { name: '关于我们', href: '#about' },
    { name: '常见问题', href: '#faq' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-brand-primary selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-serif font-bold text-xl leading-none">M</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl tracking-tight leading-none text-neutral-900`}>
                美创门业
              </span>
              <span className={`text-[10px] font-medium tracking-[0.25em] text-neutral-500 mt-1`}>
                专业 · 环保 · 定制
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[13px] font-medium text-neutral-800 hover:text-brand-primary transition-colors tracking-tight"
              >
                {link.name}
              </a>
            ))}
            <div className="relative group">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setShowNavQr(!showNavQr);
                }}
                onMouseEnter={() => setShowNavQr(true)}
                onMouseLeave={() => setShowNavQr(false)}
                className="ml-2 px-6 py-2.5 bg-brand-primary text-white rounded-full text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-primary/20 cursor-pointer"
              >
                <MessageCircle size={14} className="fill-current" />
                立即咨询
              </a>

              {/* QR Code Tooltip */}
              <div className={`absolute top-full right-0 mt-4 transition-all duration-300 transform z-50 ${
                showNavQr 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-white p-3 rounded-xl shadow-2xl border border-neutral-100">
                  <div className="w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-neutral-400 text-[10px] text-center px-4">
                      <QrCode size={40} className="mx-auto mb-2 opacity-20" />
                      <p>微信二维码</p>
                    </div>
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=4E342E&data=https://u.wechat.com/MEICHUANG_DOORS" 
                      alt="微信二维码" 
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="mt-2 text-center whitespace-nowrap">
                    <p className="text-[10px] text-neutral-900 font-bold">扫一扫加我为朋友</p>
                    <p className="text-[8px] text-neutral-400">惠州美创门业 · 官方微信</p>
                  </div>
                  <div className="absolute bottom-full right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium border-b border-neutral-100 pb-2 hover:text-brand-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-brand-primary font-bold py-2"
                >
                  <MessageCircle size={20} />
                  立即咨询
                </a>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-3 text-neutral-500 font-medium py-2 text-sm italic"
                >
                  或直接来电: {COMPANY_INFO.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_modern_door_1777014910177.png" 
            alt="Premium Interior Door" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-block px-3 py-1 bg-brand-primary text-white text-[10px] sm:text-xs font-bold leading-none mb-8 rounded-sm">
              惠州本土专业制造品牌
            </div>
            <h1 className="text-6xl md:text-[88px] font-serif font-medium mb-8 leading-[1.05] tracking-tight">
              匠心造好门<br />
              <span className="text-brand-accent">品质</span>赢口碑
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-12 leading-relaxed font-normal max-w-lg">
              惠州本土专业木门、铝木门、室内门制造与定制服务商<br />
              <span className="opacity-80">为家庭与工程提供更环保、更耐用、更美观的门类解决方案。</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href="#products" 
                className="px-10 py-5 bg-white text-neutral-900 rounded-full font-bold text-base hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 group shadow-xl"
              >
                浏览产品
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="px-10 py-5 border border-white/40 backdrop-blur-md text-white rounded-full font-bold text-base hover:bg-white/10 transition-all text-center"
              >
                获取报价
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/60 uppercase tracking-widest">探索更多</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '5000+', label: '月生产能力 (套)', icon: Factory },
            { value: '7-15', label: '标准交付周期 (天)', icon: Clock },
            { value: '15-25%', label: '同质比更低价格', icon: TrendingDown },
            { value: '5年', label: '五金核心质保', icon: ShieldCheck },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <stat.icon className="text-brand-primary mb-3 opacity-60 group-hover:opacity-100 transition-opacity" size={32} />
              <span className="text-3xl font-serif font-bold text-brand-primary">{stat.value}</span>
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-brand-primary tracking-[0.3em] mb-4">产品中心</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                多元化产品矩阵<br />致力于满足全屋定制需求
              </h3>
            </div>
            <p className="text-neutral-500 max-w-sm">
              从经典实木到现代极简铝木门，我们坚持采用E0级以上环保标准，为您打造安心舒适的家居环境。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <motion.div 
                key={category.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100 flex flex-col h-full"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold mb-3">{category.title}</h4>
                  <p className="text-sm text-neutral-600 mb-6 leading-relaxed flex-grow">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-neutral-500 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-brand-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="#contact"
                    className="w-full py-3 border border-neutral-200 rounded-lg text-sm font-bold hover:bg-neutral-50 transition-colors text-center"
                  >
                    详情咨询
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/src/assets/images/factory_craftsmanship_1777014958708.png" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary rounded-3xl -z-0 opacity-10" />
              <div className="absolute -top-12 -left-12 aspect-square w-48 bg-brand-accent rounded-full -z-0 opacity-10" />
              
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl z-20 border border-white/50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest leading-none">惠州本土生产制造</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-brand-primary tracking-[0.3em] mb-4">关于我们</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                二十载行业积淀<br />专注门业高端定制
              </h3>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {COMPANY_INFO.name}坐落于惠州。作为粤东地区专业的门类制造服务商，我们始终秉承“匠心造好门”的理念，专注实木门、铝木门等多系列产品的研发与交付。
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="space-y-4">
                  <h5 className="font-bold border-l-2 border-brand-primary pl-4">我们的使命</h5>
                  <p className="text-sm text-neutral-500">{COMPANY_INFO.mission}</p>
                </div>
                <div className="space-y-4">
                  <h5 className="font-bold border-l-2 border-brand-accent pl-4">我们的愿景</h5>
                  <p className="text-sm text-neutral-500">{COMPANY_INFO.vision}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t font-medium">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="text-brand-primary" size={18} />
                  ISO9001质管认证
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="text-brand-primary" size={18} />
                  E0级环保标准
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="text-brand-primary" size={18} />
                  门业协会会员
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-[0.3em] mb-4">核心优势</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold">为什么选择美创门业？</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_ADVANTAGES.map((adv, idx) => {
            const icons: Record<string, any> = { 
              MapPin, ShieldCheck, TrendingDown, Award 
            };
            const Icon = icons[adv.icon] || ShieldCheck;
            
            return (
              <div 
                key={idx} 
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group text-center"
              >
                <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-brand-accent" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-4">{adv.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.3em] mb-4">工程案例</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">服务覆盖惠州及大湾区</h3>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              先后承接多个知名办公、商业、住宅及文教建筑工程。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl aspect-[16/10]">
              <img 
                src="/src/assets/images/engineering_case_display_1777014975345.png" 
                alt="Engineering Case" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <span className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-2">酒店工程项目</span>
                <h5 className="text-white text-2xl font-serif font-bold">高端酒店客房木门统一订制</h5>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <img 
                src="https://picsum.photos/seed/case1/600/600" 
                alt="Resident" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <img 
                src="https://picsum.photos/seed/case2/600/600" 
                alt="Office" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.3em] mb-4">常见问题</h2>
            <h3 className="text-4xl font-serif font-bold">专业解答 · 快速解惑</h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                <button 
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-neutral-50 bg-white transition-colors"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-bold md:text-lg">{faq.question}</span>
                  <ChevronDown className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-neutral-600 border-t border-neutral-50 pt-4 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-neutral-900 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/10 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="text-white">
              <h2 className="text-sm font-bold text-brand-accent tracking-[0.3em] mb-4">联系我们</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8">准备好为您的空间定制美学吗？</h3>
              <p className="text-neutral-400 mb-10 text-lg">
                欢迎垂询，我们将竭诚为您提供专业的门类顾问服务与定制报价。
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">咨询热线</h5>
                    <p className="text-2xl font-sans font-bold text-white tracking-tight">{COMPANY_INFO.phone}</p>
                    <p className="text-[10px] text-neutral-500 tracking-[0.2em] mt-1">周一至周日 (8:30 - 18:00)</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">总部地址</h5>
                    <p className="text-neutral-300">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    <Factory size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">生产基地</h5>
                    <p className="text-neutral-300">{COMPANY_INFO.factoryAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
              <h4 className="text-2xl font-bold mb-8">在线预约咨询</h4>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">您的称呼</label>
                    <input type="text" placeholder="例: 张先生" className="w-full px-4 py-3 bg-neutral-50 border rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">联系电话</label>
                    <input type="tel" placeholder="13x xxxx xxxx" className="w-full px-4 py-3 bg-neutral-50 border rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">需求类型</label>
                  <select className="w-full px-4 py-3 bg-neutral-50 border rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none appearance-none transition-all">
                    <option>家装单套订制</option>
                    <option>批量工程单</option>
                    <option>加盟/渠道合作</option>
                    <option>其他咨询</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">详情描述</label>
                  <textarea rows={4} placeholder="描述您的需求或尺寸信息..." className="w-full px-4 py-3 bg-neutral-50 border rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-brand-primary/20">
                  提交咨询
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 pt-16 pb-8 border-t border-white/5 relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl leading-none">M</span>
                </div>
                <span className="font-bold text-xl tracking-tight leading-none text-white">{COMPANY_INFO.shortName}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                {COMPANY_INFO.positioning}。立足惠州，服务全国，以匠心成就每一扇好门。
              </p>
              <div className="flex gap-4">
                {/* WeChat QR Code Interaction */}
                <div 
                  className="relative group/qr"
                  onMouseEnter={() => setShowQr(true)}
                  onMouseLeave={() => setShowQr(false)}
                  onClick={() => setShowQr(!showQr)}
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">
                    <QrCode size={18} title="微信" />
                  </div>
                  
                  {/* QR Code Tooltip */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 transform z-50 ${
                    showQr 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                    <div className="bg-white p-3 rounded-xl shadow-2xl border border-neutral-100">
                      <div className="w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* 
                          Note: In a real app, replace the src below with your actual QR code asset path 
                          (e.g., /src/assets/images/wechat_qr.png)
                        */}
                        <div className="text-neutral-400 text-[10px] text-center px-4">
                          <QrCode size={40} className="mx-auto mb-2 opacity-20" />
                          <p>微信二维码</p>
                        </div>
                        {/* QR Code from generic provider for now */}
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=4E342E&data=https://u.wechat.com/MEICHUANG_DOORS" 
                          alt="微信二维码" 
                          className="absolute inset-0 w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="mt-2 text-center whitespace-nowrap">
                        <p className="text-[10px] text-neutral-900 font-bold">扫一扫加我为朋友</p>
                        <p className="text-[8px] text-neutral-400">惠州美创门业 · 官方微信</p>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                    </div>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">
                  <Building2 size={18} title="小红书" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs">快速链接</h5>
              <ul className="space-y-4 text-sm text-neutral-400">
                {navLinks.slice(1).map(link => (
                  <li key={link.href}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs">产品系列</h5>
              <ul className="space-y-4 text-sm text-neutral-400">
                {PRODUCT_CATEGORIES.map(cat => (
                  <li key={cat.id}><a href="#products" className="hover:text-white transition-colors">{cat.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-brand-accent tracking-widest uppercase text-xs">企业资质</h5>
              <div className="space-y-4 text-xs text-neutral-400 leading-relaxed">
                <p>统一社会信用代码：<br />{COMPANY_INFO.unifiedCode}</p>
                <p>Copyright © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</p>
                <p>粤ICP备XXXXXXXX号-1</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-xs text-neutral-500 font-medium">
            <p>匠心营造 · 环保智造 · 高端定制 · 惠州美创门业</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
