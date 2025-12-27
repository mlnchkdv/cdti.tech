import { Calendar, ArrowRight, Monitor, Users, GraduationCap, FileText, Mic, Briefcase } from "lucide-react";
import GlassContainer from '@/components/GlassContainer';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  users: Users,
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  mic: Mic,
  briefcase: Briefcase,
};

const categoryLabels: Record<string, string> = {
  meeting: "Заседание",
  networking: "Нетворкинг",
  education: "Образование",
  law: "Закон",
  conference: "Конференция",
  visit: "Визит",
};

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  location: string;
  icon: string;
  previewImage?: string;
  onClick: () => void;
}

export const EventCard = ({
  title,
  description,
  date,
  category,
  location,
  icon,
  previewImage,
  onClick,
}: EventCardProps) => {
  const IconComponent = iconMap[icon] || Monitor;
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    // 🔑 Внешняя обёртка для двух половинок
    <div 
      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
      style={{
        borderRadius: '0.75rem', // 🔑 Округление всей карточки
      }}
    >
      {/* 🔑 ВЕРХНЯЯ ПОЛОВИНА - GlassContainer sky с округлением сверху */}
      <GlassContainer
        variant="sky"
        className="h-40 sm:h-48 relative overflow-hidden flex-shrink-0"
        style={{
          borderRadius: '0.75rem 0.75rem 0 0', // 🔑 Только верхние края закруглены
        }}
      >
        {previewImage ? (
          <img 
            src={previewImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}

        <div 
          className={`absolute inset-0 ${previewImage ? 'hidden' : 'flex'} items-center justify-center text-accent/30`}
        >
          <IconComponent className="w-12 h-12 opacity-20" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"></div>

        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-background/90 backdrop-blur-sm border border-border/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-foreground">
          {categoryLabels[category] || category}
        </div>
      </GlassContainer>

      {/* 🔑 НИЖНЯЯ ПОЛОВИНА - GlassContainer default с прямыми углами */}
      <GlassContainer
        className="flex flex-col flex-1 p-4 sm:p-6"
        style={{
          borderRadius: '0 0 0.75rem 0.75rem', // 🔑 Только нижние края закруглены
        }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3 text-xs font-medium text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        <div className="mt-auto pt-3 sm:pt-4 border-t border-border flex items-center justify-between text-xs">
          <span className="text-muted-foreground truncate mr-2">{location}</span>
          <span className="font-medium text-foreground flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
            Подробнее <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </GlassContainer>
    </div>
  );
};
