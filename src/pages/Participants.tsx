import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { LeaderCard } from "@/components/participants/LeaderCard";
import { LeaderModal } from "@/components/participants/LeaderModal";
import { CompanyCard } from "@/components/participants/CompanyCard";
import participantsData from "@/data/participants.json";

const Participants = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedLeader, setSelectedLeader] = useState<typeof participantsData.leadership[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLeadership = useMemo(() => {
    let leaders;
    if (activeFilter === "all" || activeFilter === "leadership") {
      leaders = participantsData.leadership;
    } else {
      leaders = participantsData.leadership.filter(
        (leader) => leader.category === activeFilter
      );
    }
    
    // Keep first 3 participants (Козюкин, Мещеряков, Мельничук) as is, sort the rest alphabetically
    if (leaders.length > 3) {
      const firstThree = leaders.slice(0, 3);
      const rest = leaders.slice(3);
      const sortedRest = [...rest].sort((a, b) => {
        // Extract last name (first word) for sorting
        const nameA = a.name.split(' ')[0].toLowerCase();
        const nameB = b.name.split(' ')[0].toLowerCase();
        return nameA.localeCompare(nameB, 'ru');
      });
      return [...firstThree, ...sortedRest];
    }
    return leaders;
  }, [activeFilter]);

  const filteredCompanies = useMemo(() => {
    if (activeFilter === "all") {
      return participantsData.companies;
    }
    if (activeFilter === "leadership") {
      return [];
    }
    return participantsData.companies.filter(
      (company) => company.category === activeFilter
    );
  }, [activeFilter]);

  const handleLeaderClick = (leader: typeof participantsData.leadership[0]) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
  };

  const showLeadership = activeFilter === "all" || activeFilter === "leadership" || filteredLeadership.length > 0;
  const showCompanies = activeFilter !== "leadership" && filteredCompanies.length > 0;

  return (
    <Layout>
      <div className="dot-background min-h-screen">
        {/* Header */}
        <header className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-4">
            Участники и партнёры
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl tracking-tight">
            Здесь собраны участники экосистемы Комитета: разработчики ПО и продуктовые команды,
             интеграторы и поставщики инфраструктуры, телеком и кибербезопасность, образовательные организации и исследовательские центры.
            </p>
          </div>
        </header>
        
        {/* Filters */}
        <div className="px-4 md:px-6 max-w-6xl mx-auto mb-8 md:mb-10 overflow-x-auto">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 md:px-4 py-2 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                activeFilter === "all"
                  ? "filter-active"
                  : "filter-inactive"
              }`}
            >
              Все участники
            </button>
            <button
              onClick={() => setActiveFilter("leadership")}
              className={`px-3 md:px-4 py-2 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                activeFilter === "leadership"
                  ? "filter-active"
                  : "filter-inactive"
              }`}
            >
              Члены комитета
            </button>
            {participantsData.filters.slice(1).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 md:px-4 py-2 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "filter-active"
                    : "filter-inactive"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        {showLeadership && filteredLeadership.length > 0 && (
          <section className="px-4 md:px-6 max-w-6xl mx-auto mb-12 md:mb-16 animate-fade-in delay-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Состав комитета
              </span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredLeadership.map((leader, index) => (
                <LeaderCard
                  key={leader.id}
                  name={leader.name}
                  initials={leader.initials}
                  position={leader.position}
                  company={leader.company}
                  pk={leader.pk}
                  description={leader.description}
                  photo={leader.photo}
                  telegram={leader.telegram}
                  email={leader.email}
                  isChairman={index === 0}
                  isDeputy={index === 1 || index === 2}
                  onClick={() => handleLeaderClick(leader)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Companies Grid */}
        {showCompanies && (
          <main className="px-4 md:px-6 max-w-6xl mx-auto pb-16 md:pb-24 animate-fade-in delay-200">
            <h2 className="text-lg md:text-xl font-medium tracking-tight mb-6">
              Компании-участники
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  name={company.name}
                  initials={company.initials}
                  categoryLabel={company.categoryLabel}
                  description={company.description}
                  tag={company.tag}
                  color={company.color}
                  website={company.website}
                />
              ))}
            </div>
          </main>
        )}

        {/* Empty State */}
        {!showLeadership && !showCompanies && (
          <div className="px-4 md:px-6 max-w-6xl mx-auto pb-16 md:pb-24">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Нет участников для выбранного фильтра
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="border-t border-border bg-muted">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                Хотите стать партнёром?
              </h2>
              <p className="text-muted-foreground text-sm">
                Присоединяйтесь к комитету для обмена опытом и развития IT-отрасли региона.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="h-10 px-6 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90 transition-colors shadow-lg">
                Подать заявку
              </button>
              <button className="h-10 px-6 bg-background border border-border text-muted-foreground text-sm font-medium rounded-md hover:bg-card transition-colors">
                Условия членства
              </button>
            </div>
          </div>
        </section>

        <LeaderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          leader={selectedLeader}
        />
      </div>
    </Layout>
  );
};

export default Participants;
