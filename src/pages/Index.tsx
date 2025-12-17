import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  Blocks,
  ShieldCheck,
  GraduationCap,
  Scale,
  MapPin,
  CalendarDays,
  ExternalLink,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { EventModalWithStats } from "@/components/events/EventModalWithStats";
import { MapSection } from "@/components/home/MapSection";
import newsData from "@/data/news.json";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  date: string;
  category: string;
  location: string;
  icon: string;
  media?: { images: string[]; videos: string[] };
}

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get latest 4 news by highest id
  const latestNews = useMemo(() => {
    return [...newsData.news]
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, 4);
  }, []);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <Layout transparentHeader>
      {/* Dot Background */}
      <div className="fixed inset-0 dot-background -z-10"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/80 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-medium text-muted-foreground">
                Стратегия цифровой трансформации 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
              Инновации и цифровые технологии для бизнеса
              <br />
              <span className="text-muted-foreground">в Саратовской области</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 tracking-tight">
            Объединяем IT-компании, промышленность, образование и власть для внедрения сквозных цифровых технологий,
            повышения производительности и развития технологического предпринимательства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/join"
                className="h-12 px-8 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Подать заявку
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/events"
                className="h-12 px-8 bg-background/90 backdrop-blur-sm border border-border text-muted-foreground font-medium rounded-lg hover:bg-muted transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                План мероприятий
              </Link>
            </div>
          </div>


          {/* Featured Event Card */}
          <div
            className="lg:col-span-5 w-full animate-fade-in order-1 lg:order-2"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded border border-accent/20">
                    Анонс
                  </span>
                  <span className="flex items-center text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded-md shadow-sm border border-border">
                    <MapPin className="w-3 h-3 mr-1" /> Саратов
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
                Форум технологического предпринимательства Саратовской области
                </h3>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    <span>февраль 2026</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Индустрия, разработчики, вузы, инвесторы и институты развития в одном контуре.
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 h-10 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-md">
                    Регистрация (будет доступна позже)
                  </button>
                  <button className="h-10 w-10 flex items-center justify-center bg-background border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="border-b border-border bg-background">
          <div className="max-w-6xl mx-auto px-3 py-63">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Саратовская область
          </p>
        </div>
      </div>
      <section className="border-y border-border bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight">120+</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              IT-компаний
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight">850+</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Выпускников вузов
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight">₽2.5Млрд</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              ИНВЕСТИЦИИ В IT
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight">50+</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            СТАРТАПОВ
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10 bg-background/40 backdrop-blur-sm rounded-3xl mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
              Направления деятельности
            </h2>
            <p className="text-muted-foreground">
              Ключевые векторы развития цифровой экономики региона
            </p>
          </div>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground border-b border-border pb-0.5 hover:border-foreground transition-colors"
          >
            Посмотреть все программы
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-32 h-32" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-6 text-foreground border border-border">
                <Blocks className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-tight mb-2">
                  Импортозамещение ПО
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Содействие переходу предприятий области на отечественные
                  программные продукты.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-8 text-background shadow-sm flex flex-col justify-between group">
            <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center mb-6 border border-background/20">
              <ShieldCheck className="w-5 h-5 text-background" />
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-tight mb-2">
                Кибербезопасность
              </h3>
              <p className="text-background/70 text-sm leading-relaxed">
                Аудит и защита критической информационной инфраструктуры.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-6 text-foreground border border-border">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-tight mb-2">
                IT-Образование
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Сотрудничество с ВУЗами для подготовки кадров.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center mb-6 text-foreground border border-border shadow-sm">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-2">
                  Законодательные инициативы
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Лоббирование интересов IT-отрасли. Налоговые льготы и
                  преференции.
                </p>
              </div>
              <div className="bg-background p-4 rounded-xl border border-border shadow-sm min-w-[200px]">
                <div className="flex items-center gap-3 mb-3 border-b border-border pb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-muted-foreground">
                    В разработке
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-3/4 bg-muted rounded-full"></div>
                  <div className="h-1.5 w-1/2 bg-muted rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section - Minimal format with modal on Index */}
      <section className="bg-muted border-y border-border py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium tracking-tight">Последние новости</h2>
            <Link
              to="/events"
              className="text-sm font-medium text-foreground flex items-center gap-1 hover:gap-2 transition-all"
            >
              Все новости <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestNews.map((news) => (
              <article 
                key={news.id}
                className="group bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleNewsClick(news as NewsItem)}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {new Date(news.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {news.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Event Modal */}
      <EventModalWithStats
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedNews}
        eventUrl={selectedNews ? `${window.location.origin}/events?id=${selectedNews.id}` : undefined}
      />
    </Layout>
  );
};

export default Index;
