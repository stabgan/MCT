import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Zap,
  Shield,
  Users,
  ChevronRight,
  PlayCircle,
  ArrowRight,
  Layers3,
  Brain,
  Settings,
  CheckCircle,
  Activity,
} from 'lucide-react';
import NeuralNetworkVisualization from './components/NeuralNetworkVisualization';

const MedCodeTransformer: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [tokenizedText, setTokenizedText] = useState<Array<{text: string, type: string, color: string}>>([]);
  const [inputText, setInputText] = useState('');
  const [selectedComorbidity, setSelectedComorbidity] = useState<any>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'overview', 'architecture', 'methodology', 'innovations', 'tokenization', 'comorbidity', 'demo'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const tokenizeText = (text: string) => {
    if (!text) return [];
    const words = text.split(/\s+/);
    return words.map(word => {
      if (word.match(/^[A-Z]\d{2}/)) {
        return { text: word, type: 'icd', color: 'bg-secondary-100 text-secondary-700' };
      } else if (word.match(/diabetes|hypertension|pneumonia|asthma|heart|failure|dyspnea|edema/i)) {
        return { text: word, type: 'medical', color: 'bg-primary-100 text-primary-700' };
      } else {
        return { text: word, type: 'general', color: 'bg-gray-100 text-gray-700' };
      }
    });
  };

  const comorbidityGroups = [
    {
      id: 1,
      index: 'Type 2 Diabetes (E11)',
      comorbidities: ['Hypertension', 'Chronic Kidney Disease', 'Retinopathy', 'Neuropathy'],
      rarity: 'Common',
      strategy: 'Statistical Co-occurrence',
      color: 'from-primary-400 to-primary-600'
    },
    {
      id: 2,
      index: 'Marfan Syndrome (Q87.4)',
      comorbidities: ['Aortic Aneurysm', 'Lens Dislocation', 'Mitral Valve Prolapse'],
      rarity: 'Rare',
      strategy: 'Knowledge-based Inference',
      color: 'from-secondary-400 to-secondary-600'
    },
    {
      id: 3,
      index: 'Heart Failure (I50)',
      comorbidities: ['Atrial Fibrillation', 'Coronary Artery Disease', 'COPD', 'Anemia'],
      rarity: 'Common',
      strategy: 'Statistical Co-occurrence',
      color: 'from-accent-400 to-accent-600'
    }
  ];

  const performClassification = () => {
    // Simulate classification process
    setClassificationResult('');
    setIsClassifying(true);
    
    setTimeout(() => {
      const results = [
        'E11.9 - Type 2 diabetes mellitus without complications (89.3%)',
        'I10 - Essential hypertension (76.8%)',
        'Z51.11 - Encounter for antineoplastic chemotherapy (45.2%)'
      ];
      setClassificationResult(results.join('\n'));
      setIsClassifying(false);
    }, 2000);
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'innovations', label: 'Innovations' },
    { id: 'tokenization', label: 'Tokenization' },
    { id: 'comorbidity', label: 'Comorbidity' },
    { id: 'demo', label: 'Demo' }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'glass-effect shadow-soft' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            MedCode-Transformer
          </motion.h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-sm">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-primary-600 transition-colors font-medium ${
                  activeSection === item.id ? 'text-primary-600 font-semibold' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect border-t border-white/20"
            >
              <div className="px-4 py-2 space-y-2">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 transition-colors ${
                      activeSection === item.id ? 'text-primary-600 font-semibold bg-primary-50/20' : 'text-text-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-60"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-200 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="text-center z-10 max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MedCode-Transformer
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-text-secondary mb-8 px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A scientifically rigorous deep learning approach for hierarchical ICD-10-CM coding using 
            advanced pre-training optimization, factorized embeddings, and tiered comorbidity strategies
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card px-6 py-3 hover:shadow-neural transition-all">
              <span className="text-sm text-text-secondary font-medium">358.7M Parameters</span>
            </div>
            <div className="glass-card px-6 py-3 hover:shadow-neural transition-all">
              <span className="text-sm text-text-secondary font-medium">75,000 ICD Codes</span>
            </div>
            <div className="glass-card px-6 py-3 hover:shadow-neural transition-all">
              <span className="text-sm text-text-secondary font-medium">100K Token Vocabulary</span>
            </div>
            <div className="glass-card px-6 py-3 hover:shadow-neural transition-all">
              <span className="text-sm text-text-secondary font-medium">27M Training Texts</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-6 h-6 mx-auto text-text-muted" />
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Methodology Overview
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <Settings className="w-6 h-6" />, 
                title: "Hybrid Tokenization", 
                desc: "100K vocabulary combining BPE for medical text with specialized ICD-10 semantic tokens", 
                delay: 0,
                color: "#6366F1"
              },
              { 
                icon: <Layers3 className="w-6 h-6" />, 
                title: "Asymmetric Architecture", 
                desc: "20-layer encoder with interleaved local/global attention, 7-layer decoder with GQA", 
                delay: 100,
                color: "#3B82F6"
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "Grouped Query Attention", 
                desc: "4:1 ratio in encoder, 2:1 in decoder for computational efficiency", 
                delay: 200,
                color: "#F59E0B"
              },
              { 
                icon: <Shield className="w-6 h-6" />, 
                title: "Factorized Embeddings", 
                desc: "Parameter-efficient V→E→H embedding strategy with weight tying", 
                delay: 300,
                color: "#10B981"
              },
              { 
                icon: <Brain className="w-6 h-6" />, 
                title: "Mixture-of-Denoisers", 
                desc: "R, S, X, P-Denoiser pre-training on 27M medical texts", 
                delay: 400,
                color: "#6366F1"
              },
              { 
                icon: <Users className="w-6 h-6" />, 
                title: "Tiered Comorbidity", 
                desc: "Statistical co-occurrence for common, knowledge-based for rare diseases", 
                delay: 500,
                color: "#DC2626"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="architecture-block p-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay / 1000 }}
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background-subtle to-background">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Model Architecture
          </motion.h2>
          
          {/* Neural Network Visualization */}
          <motion.div 
            className="bg-background-card rounded-3xl shadow-glass p-4 sm:p-8 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <NeuralNetworkVisualization />
          </motion.div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Encoder Specifications",
                icon: <Brain className="w-5 h-5" />,
                color: "#3B82F6",
                specs: [
                  "20 layers (3L:1G pattern)",
                  "GQA 4:1 ratio (16Q + 4KV)",
                  "Local window: 2048-4096",
                  "241.2M parameters"
                ]
              },
              {
                title: "Decoder Specifications", 
                icon: <Users className="w-5 h-5" />,
                color: "#8B5CF6",
                specs: [
                  "7 layers (3 sub-layers)",
                  "Self-Attn GQA 2:1",
                  "Cross-Attn 16 heads",
                  "117.5M parameters"
                ]
              },
              {
                title: "Attention Mechanisms",
                icon: <Zap className="w-5 h-5" />,
                color: "#F59E0B", 
                specs: [
                  "RoPE positional encoding",
                  "QK-Normalization",
                  "Interleaved Local/Global",
                  "Causal masking in decoder"
                ]
              },
              {
                title: "Technical Details",
                icon: <Settings className="w-5 h-5" />,
                color: "#DC2626",
                specs: [
                  "Hidden size: 1024",
                  "FFN: SwiGLU (3072 dim)",
                  "RMSNorm (ε=1e-6)",
                  "Dropout: 0.1"
                ]
              }
            ].map((spec, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-6 hover:shadow-neural transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4" style={{ color: spec.color }}>
                  {spec.icon}
                  <h3 className="font-semibold text-sm text-text-primary">{spec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {spec.specs.map((item, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spec.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Deep Dive */}
      <section id="methodology" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Scientific Methodology
          </motion.h2>

          {/* Factorized Embeddings */}
          <motion.div 
            className="glass-card p-8 mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-neural-embedding rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Factorized Embedding Strategy</h3>
                <p className="text-text-secondary">Parameter-efficient two-stage embedding process</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background-subtle rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-neural-embedding">Stage 1: Token → Factorized</h4>
                <p className="text-sm text-text-secondary">V(100K) → E(256)</p>
                <p className="text-xs text-text-muted mt-2">Maps token IDs to lower-dimensional vectors</p>
              </div>
              <div className="bg-background-subtle rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-neural-embedding">Stage 2: Projection</h4>
                <p className="text-sm text-text-secondary">E(256) → H(1024)</p>
                <p className="text-xs text-text-muted mt-2">Linear projection to model hidden size</p>
              </div>
              <div className="bg-background-subtle rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-neural-embedding">Efficiency Gain</h4>
                <p className="text-sm text-text-secondary">~75% parameter reduction</p>
                <p className="text-xs text-text-muted mt-2">Compared to direct V×H embedding</p>
              </div>
            </div>
          </motion.div>

          {/* Pre-training Strategy */}
          <motion.div 
            className="glass-card p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-neural-flow rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Mixture-of-Denoisers Pre-training</h3>
                <p className="text-text-secondary">Four specialized denoising objectives on 27M medical texts</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'R-Denoiser', desc: 'Regular span corruption', color: '#3B82F6', bgClass: 'bg-primary-500' },
                { name: 'S-Denoiser', desc: 'Sequential denoising', color: '#8B5CF6', bgClass: 'bg-secondary-500' },
                { name: 'X-Denoiser', desc: 'Extreme span infilling', color: '#EF4444', bgClass: 'bg-accent-500' },
                { name: 'P-Denoiser', desc: 'Permutation coherence', color: '#F59E0B', bgClass: 'bg-yellow-500' }
              ].map((denoiser, idx) => (
                <motion.div 
                  key={idx} 
                  className="bg-background-subtle rounded-xl p-4 hover:shadow-soft transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mb-3 text-base shadow-sm"
                    style={{ backgroundColor: denoiser.color }}
                  >
                    {denoiser.name[0]}
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">{denoiser.name}</h4>
                  <p className="text-xs text-text-muted">{denoiser.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Innovations */}
      <section id="innovations" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background-subtle to-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Innovations
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interleaved Attention */}
            <motion.div 
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-neural-encoder rounded-xl flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Interleaved Local/Global Attention</h3>
                  <p className="text-text-secondary text-sm">3:1 pattern for long medical documents</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary-400 rounded"></div>
                  <span className="text-sm"><strong>15 Local layers:</strong> 2048-4096 token windows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span className="text-sm"><strong>5 Global layers:</strong> Full sequence attention</span>
                </div>
                <p className="text-text-muted text-xs">
                  Balances computational efficiency with long-range dependency modeling 
                  for comprehensive clinical document understanding.
                </p>
              </div>
            </motion.div>

            {/* RoPE Implementation */}
            <motion.div 
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Rotary Position Embeddings</h3>
                  <p className="text-text-secondary text-sm">θ=1,000,000 hyperparameter</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-secondary-400 rounded"></div>
                  <span className="text-sm">Applied directly to Q & K vectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-secondary-600 rounded"></div>
                  <span className="text-sm">Relative position encoding benefits</span>
                </div>
                <p className="text-text-muted text-xs">
                  Enables better generalization to sequence lengths beyond training, 
                  crucial for variable-length medical documents.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenization Demo */}
      <section id="tokenization" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hybrid Tokenization Demo
          </motion.h2>
          <motion.div 
            className="glass-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-text-secondary">
                Try typing medical terms or ICD codes like "E11", "I50", "diabetes", "hypertension"
              </span>
            </div>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-background-card"
              rows={3}
              placeholder="Enter medical text (e.g., 'Patient with E11 diabetes and I50 heart failure presenting with acute dyspnea and bilateral edema')"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setTokenizedText(tokenizeText(e.target.value));
              }}
            />
            <AnimatePresence>
              {tokenizedText.length > 0 && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Tokenized Output:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tokenizedText.map((token, idx) => (
                      <motion.span 
                        key={idx} 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${token.color}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        {token.text}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-secondary-200 rounded-full"></span> 
                      ICD Code
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-primary-200 rounded-full"></span> 
                      Medical Term
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-gray-200 rounded-full"></span> 
                      General Text
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Comorbidity Network */}
      <section id="comorbidity" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background-subtle to-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Tiered Comorbidity Strategy
          </motion.h2>
          <motion.p 
            className="text-center text-text-secondary mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our scientifically-grounded approach identifies disease relationships through 
            <strong className="text-text-primary"> statistical co-occurrence analysis</strong> for common conditions 
            and <strong className="text-text-primary"> knowledge-based inference</strong> for rare diseases,
            enabling comprehensive synthetic data generation.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comorbidityGroups.map((group, idx) => (
              <motion.div 
                key={group.id}
                className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedComorbidity?.id === group.id ? 'ring-2 ring-primary-500 shadow-neural' : ''
                }`}
                onClick={() => setSelectedComorbidity(group)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${group.color} rounded-full mb-4`}></div>
                <h3 className="font-semibold text-lg mb-3 text-text-primary">{group.index}</h3>
                <div className="flex gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    group.rarity === 'Common' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    {group.rarity}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                    {group.strategy}
                  </span>
                </div>
                <div className="space-y-2">
                  {group.comorbidities.map((comorbidity, idx) => (
                    <motion.div 
                      key={idx} 
                      className="text-sm text-text-secondary flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ArrowRight className="w-3 h-3 text-text-muted" />
                      {comorbidity}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {selectedComorbidity && (
              <motion.div 
                className="mt-8 glass-card p-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedComorbidity.color} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {selectedComorbidity.index.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="text-sm text-text-primary">
                      <strong>Selected Group:</strong> {selectedComorbidity.index}
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      This {selectedComorbidity.rarity.toLowerCase()} condition uses <strong>{selectedComorbidity.strategy.toLowerCase()}</strong> to identify 
                      {selectedComorbidity.comorbidities.length} associated conditions, forming a clinically relevant comorbidity pattern 
                      for synthetic medical text generation and ICD-10 code prediction training.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Classification Demo */}
      <section id="demo" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hierarchical ICD-10 Classification Demo
          </motion.h2>
          <motion.div 
            className="glass-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-text-secondary">
                Our hierarchical classifier predicts ICD-10 codes with confidence scores and hierarchical levels
              </span>
            </div>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-background-card"
              rows={4}
              placeholder="Enter a clinical note excerpt for classification..."
              defaultValue="65-year-old male with history of congestive heart failure and atrial fibrillation presents with worsening dyspnea and lower extremity edema. Physical examination reveals bilateral crackles and 3+ pitting edema. Also noted COPD exacerbation with increased sputum production."
              id="classification-input"
            />
            <button 
              onClick={performClassification}
              className="mt-4 w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:shadow-neural transition-all duration-300"
            >
              Classify ICD-10 Codes
            </button>
            
            <AnimatePresence>
              {classificationResult && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {isClassifying ? (
                    <div className="text-center py-8">
                      <div className="relative inline-block">
                        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                        <motion.div 
                          className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <p className="mt-4 text-text-secondary">
                        Analyzing clinical text through hierarchical classification...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-text-primary">Predicted ICD-10 Codes:</h4>
                      {classificationResult.split('\n').map((code: string, idx: number) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <span className="font-mono font-bold text-primary-600 text-lg">{code.split(' - ')[0]}</span>
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full w-fit font-medium">
                                  {code.split(' - ')[1].split(' (')[0]}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary">{code.split(' - ')[0]} Classification</p>
                            </div>
                            <div className="text-center sm:text-right sm:ml-4">
                              <div className="text-sm text-text-muted mb-1">Confidence</div>
                              <div className="font-bold text-lg text-text-primary">{code.split(' (')[1].replace(')', '')}</div>
                              <div className="w-20 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden mx-auto sm:mx-0">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${code.split(' (')[1].replace(')', '').replace('%', '')}%` }}
                                  transition={{ duration: 1, delay: idx * 0.1 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MedCodeTransformer; 