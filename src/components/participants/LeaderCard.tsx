import { Send, Mail } from "lucide-react";

interface LeaderCardProps {
  name: string;
  initials: string;
  position: string;
  company: string;
  pk?: string;
  description: string;
  photo?: string;
  telegram?: string;
  email?: string;
  isChairman?: boolean;
  isDeputy?: boolean;
  onClick?: () => void;
}

export const LeaderCard = ({
  name,
  initials,
  position,
  company,
  pk,
  description,
  photo,
  telegram,
  email,
  isChairman = false,
  isDeputy = false,
  onClick,
}: LeaderCardProps) => {
  return (
    <div 
      className="member-card bg-card border border-border rounded-xl p-4 sm:p-6 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col h-full"
      onClick={onClick}
    >
      {isChairman && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/25 via-accent/15 via-white/80 to-white rounded-bl-full -mr-6 -mt-6 z-0"></div>
      )}
      {isDeputy && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-muted-foreground/15 via-muted-foreground/8 via-white/80 to-white rounded-bl-full -mr-6 -mt-6 z-0"></div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        {/* Large Photo */}
        <div className="flex flex-col items-center mb-4">
          {photo ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-lg mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    if (isChairman) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-medium" style="background: linear-gradient(90deg, #3c83f6 0%, #3c83f6 70%, #66d9ff 100%); color: white">${initials}</div>`;
                    } else if (isDeputy) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-medium" style="background: linear-gradient(90deg, #3c83f6 0%, #3c83f6 50%, #bfe9ff 100%); color: white">${initials}</div>`;
                    } else {
                      parent.innerHTML = `<div class="w-full h-full bg-muted text-foreground flex items-center justify-center text-xl sm:text-2xl font-medium">${initials}</div>`;
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-xl sm:text-2xl font-medium border-4 border-background shadow-lg mb-3 sm:mb-4 group-hover:scale-105 transition-transform ${
                  (isChairman || isDeputy) ? 'text-white' : 'bg-muted text-foreground'
                }`}
              style={
                isChairman
                ? { background: 'linear-gradient(90deg, #3c83f6 0%, #3c83f6 70%, #66d9ff 100%)' }
                : isDeputy
                ? { background: 'linear-gradient(90deg, #3c83f6 0%, #3c83f6 50%, #bfe9ff 100%)' }
                  : undefined
              }
            >
              {initials}
            </div>
          )}
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${
              !(isChairman || isDeputy) ? 'bg-muted border border-border text-muted-foreground' : 'text-white'
            }`}
            style={
              isChairman
                ? { background: 'linear-gradient(90deg, #3c83f6 0%, #3c83f6 70%, #66d9ff 100%)' }
                : isDeputy
                ? { background: 'linear-gradient(90deg, #3c83f6 0%, #3c83f6 50%, #bfe9ff 100%)' }
                : undefined
            }
          >
            {position}
          </span>
        </div>
        
        <div className="text-center flex-grow">
          <h3 className="text-base sm:text-lg font-medium tracking-tight mb-1">{name}</h3>
          <p className="text-muted-foreground text-xs mb-2 sm:mb-3">{pk}</p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-justify">
            {description}
          </p>
        </div>
        
        <div className="flex justify-center gap-3 pt-3 sm:pt-4 border-t border-border">
          {telegram && (
            <a
              href={telegram}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          <span className="text-xs text-accent font-medium">Подробнее →</span>
        </div>
      </div>
    </div>
  );
};
