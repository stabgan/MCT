import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  Network,
  Settings,
  Layers,
  FileText,
  Target,
  Hash
} from 'lucide-react';

interface ArchitectureComponent {
  id: string;
  type: 'input' | 'tokenizer' | 'embedding' | 'projection' | 'encoder' | 'decoder' | 'output' | 'classification' | 'generation';
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  textColor: string;
  stackCount?: number;
  icon?: React.ReactNode;
}

interface Connection {
  from: string;
  to: string;
  type: 'primary' | 'attention' | 'classification' | 'generation';
  strokeColor: string;
  animated?: boolean;
  label?: string;
}

const NeuralNetworkVisualization: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(phase => (phase + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Centered MCT Architecture Components
  const components: ArchitectureComponent[] = [
    {
      id: 'medical-input',
      type: 'input',
      label: 'Medical Text Input',
      sublabel: 'Clinical narratives',
      x: 340,
      y: 30,
      width: 220,
      height: 50,
      depth: 15,
      color: '#F8FAFC',
      textColor: '#1A202C',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'hybrid-tokenizer',
      type: 'tokenizer',
      label: 'Hybrid Tokenizer',
      sublabel: '100K vocab (BPE + ICD)',
      x: 315,
      y: 110,
      width: 270,
      height: 60,
      depth: 25,
      color: '#6366F1',
      textColor: '#FFFFFF',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'factorized-embedding',
      type: 'embedding',
      label: 'Factorized Embedding',
      sublabel: 'V(100K) → E(256)',
      x: 220,
      y: 210,
      width: 180,
      height: 55,
      depth: 20,
      color: '#10B981',
      textColor: '#FFFFFF'
    },
    {
      id: 'linear-projection',
      type: 'projection',
      label: 'Linear Projection',
      sublabel: 'E(256) → H(1024)',
      x: 430,
      y: 210,
      width: 180,
      height: 55,
      depth: 20,
      color: '#059669',
      textColor: '#FFFFFF'
    },
    {
      id: 'encoder-stack',
      type: 'encoder',
      label: 'MCT Encoder Stack',
      sublabel: '20 Layers • 241.2M params',
      x: 260,
      y: 310,
      width: 380,
      height: 100,
      depth: 40,
      color: '#3B82F6',
      textColor: '#FFFFFF',
      stackCount: 20,
      icon: <Layers className="w-6 h-6" />
    },
    // Classification path (right)
    {
      id: 'classification-head',
      type: 'classification',
      label: 'Classification Head',
      sublabel: 'H(1024) → Classes',
      x: 550,
      y: 460,
      width: 160,
      height: 55,
      depth: 25,
      color: '#F59E0B',
      textColor: '#FFFFFF',
      icon: <Hash className="w-5 h-5" />
    },
    {
      id: 'icd-predictions',
      type: 'classification',
      label: 'ICD-10 Predictions',
      sublabel: 'Hierarchical codes',
      x: 550,
      y: 545,
      width: 160,
      height: 55,
      depth: 20,
      color: '#DC2626',
      textColor: '#FFFFFF',
      icon: <Target className="w-5 h-5" />
    },
    // Generation path (left)
    {
      id: 'decoder-stack',
      type: 'decoder',
      label: 'MCT Decoder Stack',
      sublabel: '7 Layers • 117.5M params',
      x: 190,
      y: 460,
      width: 300,
      height: 85,
      depth: 35,
      color: '#8B5CF6',
      textColor: '#FFFFFF',
      stackCount: 7,
      icon: <Network className="w-6 h-6" />
    },
    {
      id: 'output-projection',
      type: 'generation',
      label: 'Output Projection',
      sublabel: 'H(1024) → E(256)',
      x: 120,
      y: 580,
      width: 150,
      height: 50,
      depth: 20,
      color: '#7C3AED',
      textColor: '#FFFFFF'
    },
    {
      id: 'lm-head',
      type: 'generation',
      label: 'LM Head',
      sublabel: 'E(256) → V(100K)',
      x: 290,
      y: 580,
      width: 150,
      height: 50,
      depth: 20,
      color: '#6D28D9',
      textColor: '#FFFFFF'
    },
    {
      id: 'text-generation',
      type: 'generation',
      label: 'Synthetic Text',
      sublabel: 'Medical narratives',
      x: 205,
      y: 660,
      width: 150,
      height: 45,
      depth: 15,
      color: '#5B21B6',
      textColor: '#FFFFFF',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const connections: Connection[] = [
    // Common path
    { from: 'medical-input', to: 'hybrid-tokenizer', type: 'primary', strokeColor: '#000000', animated: true },
    { from: 'hybrid-tokenizer', to: 'factorized-embedding', type: 'primary', strokeColor: '#000000', animated: true },
    { from: 'hybrid-tokenizer', to: 'linear-projection', type: 'primary', strokeColor: '#000000', animated: true },
    { from: 'factorized-embedding', to: 'encoder-stack', type: 'primary', strokeColor: '#000000', animated: true },
    { from: 'linear-projection', to: 'encoder-stack', type: 'primary', strokeColor: '#000000', animated: true },
    
    // Classification path
    { from: 'encoder-stack', to: 'classification-head', type: 'classification', strokeColor: '#000000', animated: true },
    { from: 'classification-head', to: 'icd-predictions', type: 'classification', strokeColor: '#000000', animated: true },
    
    // Generation path
    { from: 'encoder-stack', to: 'decoder-stack', type: 'attention', strokeColor: '#000000', animated: true },
    { from: 'decoder-stack', to: 'output-projection', type: 'generation', strokeColor: '#000000', animated: true },
    { from: 'output-projection', to: 'lm-head', type: 'generation', strokeColor: '#000000', animated: true },
    { from: 'lm-head', to: 'text-generation', type: 'generation', strokeColor: '#000000', animated: true }
  ];

  const renderConnection = (connection: Connection) => {
    const fromComponent = components.find(c => c.id === connection.from);
    const toComponent = components.find(c => c.id === connection.to);
    
    if (!fromComponent || !toComponent) return null;

    const fromX = fromComponent.x + fromComponent.width / 2;
    const fromY = fromComponent.y + fromComponent.height;
    const toX = toComponent.x + toComponent.width / 2;
    const toY = toComponent.y;

    // Curved paths for split connections
    if (connection.type === 'attention' || (connection.type === 'classification' && connection.from === 'encoder-stack')) {
      const isLeft = connection.type === 'attention';
      const controlX = isLeft ? fromX - 60 : fromX + 60;
      const controlY = (fromY + toY) / 2;
      
      return (
        <g key={`${connection.from}-${connection.to}`}>
          <motion.path
            d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
            stroke={connection.strokeColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={connection.type === 'attention' ? "8,4" : "none"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          {connection.animated && (
            <motion.circle
              r="4"
              fill={connection.strokeColor}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: animationPhase * 0.8
              }}
              style={{ 
                offsetPath: `path('M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}')`
              }}
            />
          )}
        </g>
      );
    }

    // Straight connections
    return (
      <g key={`${connection.from}-${connection.to}`}>
        <motion.line
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke={connection.strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {connection.animated && (
          <motion.circle
            r="4"
            fill={connection.strokeColor}
            initial={{ cx: fromX, cy: fromY, opacity: 0 }}
            animate={{ 
              cx: toX, 
              cy: toY, 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: animationPhase * 0.8
            }}
          />
        )}
      </g>
    );
  };

  const render3DComponent = (component: ArchitectureComponent, index: number) => {
    return (
      <g key={component.id}>
        {/* 3D effect - back face */}
        <rect
          x={component.x + component.depth * 0.5}
          y={component.y - component.depth * 0.5}
          width={component.width}
          height={component.height}
          rx={8}
          fill={component.color}
          opacity={0.3}
        />
        
        {/* 3D effect - side face */}
        <polygon
          points={`
            ${component.x + component.width},${component.y}
            ${component.x + component.width + component.depth * 0.5},${component.y - component.depth * 0.5}
            ${component.x + component.width + component.depth * 0.5},${component.y + component.height - component.depth * 0.5}
            ${component.x + component.width},${component.y + component.height}
          `}
          fill={component.color}
          opacity={0.5}
        />
        
        {/* 3D effect - top face */}
        <polygon
          points={`
            ${component.x},${component.y}
            ${component.x + component.depth * 0.5},${component.y - component.depth * 0.5}
            ${component.x + component.width + component.depth * 0.5},${component.y - component.depth * 0.5}
            ${component.x + component.width},${component.y}
          `}
          fill={component.color}
          opacity={0.4}
        />
        
        {/* Main component face */}
        <motion.rect
          x={component.x}
          y={component.y}
          width={component.width}
          height={component.height}
          rx={8}
          fill={component.color}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          filter="url(#shadow)"
        />
        
        {/* Stack count indicator */}
        {component.stackCount && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <circle
              cx={component.x + component.width - 20}
              cy={component.y + 20}
              r="14"
              fill="rgba(255,255,255,0.95)"
            />
            <text
              x={component.x + component.width - 20}
              y={component.y + 25}
              textAnchor="middle"
              className="text-sm font-bold"
              fill={component.color}
            >
              ×{component.stackCount}
            </text>
          </motion.g>
        )}
        
        {/* Icon */}
        {component.icon && (
          <g transform={`translate(${component.x + 15}, ${component.y + 15})`}>
            <circle r="10" fill="rgba(255,255,255,0.2)" />
            <foreignObject x="-5" y="-5" width="10" height="10">
              <div className="text-white">
                {React.cloneElement(component.icon as React.ReactElement, { 
                  className: "w-4 h-4" 
                })}
              </div>
            </foreignObject>
          </g>
        )}
        
        {/* Main label */}
        <text
          x={component.x + component.width / 2}
          y={component.y + component.height / 2 - (component.sublabel ? 8 : 0)}
          textAnchor="middle"
          className="text-base font-bold"
          fill={component.textColor}
        >
          {component.label}
        </text>
        
        {/* Sublabel */}
        {component.sublabel && (
          <text
            x={component.x + component.width / 2}
            y={component.y + component.height / 2 + 10}
            textAnchor="middle"
            className="text-xs font-medium"
            fill={component.textColor}
            opacity="0.9"
          >
            {component.sublabel}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="neural-container p-8">
      {/* Centered Architecture Visualization */}
      <div className="flex justify-center">
        <svg
          viewBox="0 0 900 750"
          className="w-full h-auto max-w-5xl"
          style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '16px'
          }}
        >
          <defs>
            {/* Shadow filter */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#00000020"/>
            </filter>
          </defs>
          
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Render connections first */}
          {connections.map(renderConnection)}
          
          {/* Render 3D components */}
          {components.map((component, index) => render3DComponent(component, index))}
        </svg>
      </div>

      {/* Simple Architecture Summary */}
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 text-center">MedCode-Transformer Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">358.7M</div>
              <div className="text-sm text-text-secondary">Total Parameters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neural-encoder">20 + 7</div>
              <div className="text-sm text-text-secondary">Encoder + Decoder Layers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neural-attention">2 Modes</div>
              <div className="text-sm text-text-secondary">Classification & Generation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkVisualization; 