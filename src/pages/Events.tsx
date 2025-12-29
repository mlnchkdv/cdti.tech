import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/events/EventCard";
import { EventModalWithStats } from "@/components/events/EventModalWithStats";
import newsData from "@/data/news.json";
import AsciiBackground from '@/components/AsciiBackground';

type FilterType = "all" | "events" | "programs" | "projects" | "startups" | "news";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "events", label: "Мероприятия" },
  { id: "programs", label: "Программы" },
  { id: "projects", label: "Проекты" },
  { id: "startups", label: "Стартапы" },
  { id: "news", label: "Новости" },
];

const ITEMS_PER_PAGE = 6;

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof newsData.news[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const eventId = searchParams.get("id");
    if (eventId) {
      const event = newsData.news.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const filteredNews = useMemo(() => {
    let filtered = [...newsData.news];

    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.category === activeFilter);
    }

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [activeFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 500);
  };

  const handleEventClick = (event: typeof newsData.news[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setSearchParams({ id: event.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSearchParams({});
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const getEventUrl = (eventId: string) => {
    return `${window.location.origin}/events?id=${eventId}`;
  };

  return (
    <Layout>
      <div className="dot-background min-h-screen pb-20 relative">
        
        {/* 🔑 ASCII Background с переопределением позиции на fixed */}
        {/* <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '1200px',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <AsciiBackground 
            offsetTop={0}
            height={1200}
            offsetLeft={-40}
            scatterRange={90.5}
          />
        </div> */}

        {/* Весь контент с position: relative чтобы быть поверх ASCII */}
        <div className="relative z-10">
          {/* Header & Filters */}
          <header className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
                  Инициативы
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl tracking-tight leading-relaxed">
                  Следите за повесткой IT-отрасли региона. Заседания, конференции
                  и образовательные программы.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
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

            <div className="h-px w-full bg-border"></div>
          </header>

          {/* Events Grid */}
          <main className="px-4 md:px-6 max-w-6xl mx-auto">
            {visibleNews.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Нет событий для выбранного фильтра
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
                {visibleNews.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    previewImage={event.media?.images?.[0]}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex flex-col items-center justify-center py-8 md:py-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-background border border-border text-sm font-medium text-muted-foreground rounded-full hover:border-foreground hover:text-foreground transition-all shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Загрузка...</span>
                    </>
                  ) : (
                    <>
                      <span>Загрузить еще</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <EventModalWithStats
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        eventUrl={selectedEvent ? getEventUrl(selectedEvent.id) : undefined}
      />
    </Layout>
  );
};

export default Events;
