import { ReactNode, CSSProperties } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'small' | 'large'| 'sky'| 'no';
  style?: CSSProperties;
}

const glassVariants = {
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  small: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  large: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
   sky: {
backgroundColor: 'rgba(60, 131, 246, 0.2)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(2px)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
    no: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
};

const GlassContainer = ({
  children,
  className = '',
  variant = 'default',
  style = {},
}: GlassContainerProps) => {
  return (
    <div
      className={`rounded-2xl border relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        ...glassVariants[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
