import { ExternalLink } from "lucide-react";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
  },
  zinc: {
    bg: "bg-zinc-50",
    text: "text-zinc-600",
    border: "border-zinc-100",
  },
};

interface CompanyCardProps {
  name: string;
  initials: string;
  categoryLabel: string;
  description: string;
  tag: string;
  color: string;
  website?: string;
}

export const CompanyCard = ({
  name,
  initials,
  categoryLabel,
  description,
  tag,
  color,
  website,
}: CompanyCardProps) => {
  const colors = colorMap[color] || colorMap.zinc;

  return (
    <div className="member-card bg-card border border-border rounded-xl p-6 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-10 h-10 ${colors.bg} ${colors.text} rounded flex items-center justify-center font-semibold text-sm ${colors.border} border aspect-square flex-shrink-0`}
        >
          {initials}
        </div>
        <div>
          <h3 className="font-medium text-foreground text-sm">{name}</h3>
          <p className="text-xs text-muted-foreground">{categoryLabel}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded border border-border">
          {tag}
        </span>
        {website && (
          <a
            href={website}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
