import React from 'react';

interface AbstractBackgroundProps {
  primaryColor?: string; // Teal или другой цвет бренда
  accentOpacity?: number;
  animated?: boolean;
  variant?: 'gradient' | 'geometric' | 'organic' | 'particles';
}

/**
 * ВАРИАНТ 1: Органичный градиент с размытыми формами
 * Идеален для современного, мягкого дизайна
 */
const GradientBackground: React.FC<AbstractBackgroundProps> = ({
  primaryColor = '#208080',
  accentOpacity = 0.15,
}) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ pointerEvents: 'none' }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="blur1">
        <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
      </filter>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryColor} stopOpacity={accentOpacity} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>

    <rect width="1440" height="900" fill="#ffffff" />

    {/* Размытые органичные круги */}
    <circle cx="200" cy="150" r="300" fill={primaryColor} opacity={accentOpacity} filter="url(#blur1)" />
    <circle cx="1200" cy="700" r="250" fill={primaryColor} opacity={accentOpacity * 0.8} filter="url(#blur1)" />
    <circle cx="720" cy="450" r="200" fill={primaryColor} opacity={accentOpacity * 0.6} filter="url(#blur1)" />

    {/* Градиент сверху вниз */}
    <rect width="1440" height="900" fill="url(#grad1)" />
  </svg>
);

/**
 * ВАРИАНТ 2: Геометрические фигуры и линии
 * Идеален для технологичного, современного вида
 */
const GeometricBackground: React.FC<AbstractBackgroundProps> = ({
  primaryColor = '#208080',
  accentOpacity = 0.12,
}) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ pointerEvents: 'none' }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="dots" x="40" y="40" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill={primaryColor} opacity={accentOpacity * 0.5} />
      </pattern>
    </defs>

    <rect width="1440" height="900" fill="#ffffff" />
    <rect width="1440" height="900" fill="url(#dots)" />

    {/* Геометрические линии */}
    <line x1="0" y1="0" x2="1440" y2="900" stroke={primaryColor} strokeWidth="1" opacity={accentOpacity} />
    <line x1="1440" y1="0" x2="0" y2="900" stroke={primaryColor} strokeWidth="1" opacity={accentOpacity * 0.7} />

    {/* Треугольники */}
    <polygon
      points="100,50 200,150 0,150"
      fill={primaryColor}
      opacity={accentOpacity}
    />
    <polygon
      points="1340,800 1440,700 1440,900"
      fill={primaryColor}
      opacity={accentOpacity * 0.8}
    />

    {/* Квадраты */}
    <rect x="720" y="350" width="100" height="100" fill="none" stroke={primaryColor} strokeWidth="2" opacity={accentOpacity} />
    <rect x="600" y="200" width="60" height="60" fill={primaryColor} opacity={accentOpacity * 0.5} />
  </svg>
);

/**
 * ВАРИАНТ 3: Органичные волны и кривые
 * Идеален для дружелюбного, органичного вида
 */
const OrganicBackground: React.FC<AbstractBackgroundProps> = ({
  primaryColor = '#208080',
  accentOpacity = 0.15,
}) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ pointerEvents: 'none' }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="blur2">
        <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
      </filter>
    </defs>

    <rect width="1440" height="900" fill="#ffffff" />

    {/* Волнообразные кривые */}
    <path
      d="M 0,200 Q 360,100 720,150 T 1440,180 L 1440,300 Q 720,350 0,300 Z"
      fill={primaryColor}
      opacity={accentOpacity}
      filter="url(#blur2)"
    />
    <path
      d="M 0,600 Q 360,550 720,600 T 1440,650 L 1440,900 L 0,900 Z"
      fill={primaryColor}
      opacity={accentOpacity * 0.8}
      filter="url(#blur2)"
    />

    {/* Органичные пятна */}
    <ellipse cx="300" cy="150" rx="150" ry="100" fill={primaryColor} opacity={accentOpacity * 0.6} filter="url(#blur2)" />
    <ellipse cx="1100" cy="750" rx="180" ry="120" fill={primaryColor} opacity={accentOpacity * 0.5} filter="url(#blur2)" />
  </svg>
);

/**
 * ВАРИАНТ 4: Частицы и точки с эффектом глубины
 * Идеален для технологичного, инновационного вида
 */
const ParticlesBackground: React.FC<AbstractBackgroundProps> = ({
  primaryColor = '#208080',
  accentOpacity = 0.2,
  animated = true,
}) => (
  <svg
    className={`absolute inset-0 w-full h-full ${animated ? 'animate-pulse' : ''}`}
    style={{ pointerEvents: 'none' }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(15px); } }
        .particle1 { animation: float1 6s ease-in-out infinite; }
        .particle2 { animation: float2 8s ease-in-out infinite; }
      `}</style>
    </defs>

    <rect width="1440" height="900" fill="#ffffff" />

    {/* Крупные размытые точки на фоне */}
    <circle cx="200" cy="300" r="120" fill={primaryColor} opacity={accentOpacity * 0.4} className="particle1" />
    <circle cx="1100" cy="400" r="100" fill={primaryColor} opacity={accentOpacity * 0.35} className="particle2" />
    <circle cx="700" cy="100" r="80" fill={primaryColor} opacity={accentOpacity * 0.3} className="particle1" />

    {/* Средние точки */}
    <circle cx="400" cy="650" r="50" fill={primaryColor} opacity={accentOpacity * 0.5} className="particle2" />
    <circle cx="1200" cy="700" r="45" fill={primaryColor} opacity={accentOpacity * 0.45} className="particle1" />
    <circle cx="900" cy="800" r="55" fill={primaryColor} opacity={accentOpacity * 0.4} className="particle2" />

    {/* Мелкие точки - сетка глубины */}
    {Array.from({ length: 40 }).map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 1440}
        cy={Math.random() * 900}
        r={Math.random() * 3 + 1}
        fill={primaryColor}
        opacity={accentOpacity * (Math.random() * 0.5 + 0.3)}
      />
    ))}
  </svg>
);

/**
 * Главный компонент - выбор варианта
 */
export const AbstractBackground: React.FC<AbstractBackgroundProps> = ({
  primaryColor = '#208080',
  accentOpacity = 0.15,
  animated = false,
  variant = 'gradient',
}) => {
  const variants = {
    gradient: <GradientBackground primaryColor={primaryColor} accentOpacity={accentOpacity} />,
    geometric: <GeometricBackground primaryColor={primaryColor} accentOpacity={accentOpacity} />,
    organic: <OrganicBackground primaryColor={primaryColor} accentOpacity={accentOpacity} />,
    particles: <ParticlesBackground primaryColor={primaryColor} accentOpacity={accentOpacity} animated={animated} />,
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
      {variants[variant]}
    </div>
  );
};

export default AbstractBackground;