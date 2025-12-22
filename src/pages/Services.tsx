import { Layout } from "@/components/layout/Layout";
import {
  Blocks,
  ShieldCheck,
  GraduationCap,
  Cpu,
  Building2,
  Network,
} from "lucide-react";
import { Link } from "react-router-dom";

const coreServices = [
  {
    id: 1,
    title: "Аудит 4.0 и цифровая трансформация предприятий",
    description:
      "Комплексное сопровождение проектов по внедрению сквозных цифровых технологий на производственных и сервисных предприятиях региона. Автоматизация. Внедрение чат-ботов и ИИ-ассистентов: RAG на ваших документах, контроль качества, безопасность и интеграции с CRM/ERP/ServiceDesk",
    icon: Cpu,
    badge: "Стратегические проекты",
    audience: "Промышленные предприятия, крупный и средний бизнес",
    result: "Рост производительности, прозрачность процессов, снижение издержек.",
  },
  {
    id: 2,
    title: "Подбор и внедрение отечественного ПО",
    description:
      "Аудит текущих ИТ-ландшафтов, подбор отечественных решений и планомерное импортозамещение с учетом требований к безопасности и регуляторике.",
    icon: Blocks,
    badge: "Импортозамещение",
    audience: "Органы власти, корпорации, муниципальные и частные организации",
    result:
      "Снижение рисков, выполнение требований законодательства, устойчивость ИТ-инфраструктуры.",
  },
  {
    id: 3,
    title: "Проекты в сфере кибербезопасности",
    description:
      "Аудит защищенности, моделирование угроз, выбор решений и сопровождение внедрения средств защиты информации.",
    icon: ShieldCheck,
    badge: "Критическая инфраструктура",
    audience: "Критически важные объекты, компании с высокими требованиями к защите данных",
    result: "Снижение рисков инцидентов, соответствие отраслевым стандартам.",
  },
  {
    id: 4,
    title: "Образовательные и акселерационные программы",
    description:
      "Программы повышения квалификации, корпоративное обучение стажировки и студенческие треки, акселераторы для технологических стартапов и проектных команд.",
    icon: GraduationCap,
    badge: "Развитие кадров и стартапов",
    audience: "Вузы, студенты, ИТ‑специалисты, основатели стартапов, Промышленные предприятия, крупный и средний бизнес",
    result: "Подготовка кадров, формирование проектных команд и новых продуктов.",
  },
  {
    id: 5,
    title: "Пилотные зоны и тестирование решений",
    description:
      "Организация пилотных проектов на предприятиях региона, подбор партнеров и площадок для апробации цифровых решений.",
    icon: Building2,
    badge: "Тестирование технологий",
    audience: "Технологические компании, заказчики из реального сектора",
    result: "Подтверждение эффективности решений и масштабирование успешных пилотов.",
  },
  {
    id: 6,
    title: "Координация экосистемы, нетворкинг и законотворчество",
    description:
      "Законотворчество и развитие условий для IT-бизнеса. Экспертиза инициатив и предложения по совершенствованию нормативной базы в интересах отечественных IT-компаний и цифровизации предприятий региона.Связка бизнеса, ИТ‑компаний, вузов, институтов развития и органов власти в рамках единого контура цифровых инициатив.",
    icon: Network,
    badge: "Экосистема региона",
    audience: "Все участники цифровой экосистемы Саратовской области",
    result: "Ускорение запуска инициатив и рост числа совместных проектов.",
  },
];

const Services = () => {
  return (
    <Layout>
      <div className="dot-background min-h-screen pb-20">
        {/* Hero / Intro */}
        <header className="pt-24 md:pt-32 pb-10 md:pb-14 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-8 md:mb-10">
            <div className="space-y-4 max-w-2xl">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Витрина услуг
              </p>
              <div>
                <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-3">
                  Услуги и сервисы Комитета
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-tight">
                  Практические инструменты для цифровой трансформации бизнеса и
                  развития технологической экосистемы Саратовской области.
                </p>
              </div>
            </div>

            <div className="bg-background/80 border border-border rounded-2xl p-4 md:p-5 shadow-sm max-w-sm">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                Для кого
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Государственные органы, промышленные предприятия, ИТ‑компании,
                образовательные организации и технологические стартапы.
              </p>
              <Link
                to="/join"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/90 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-border" />
        </header>

        {/* Services grid */}
        <main className="px-4 md:px-6 max-w-6xl mx-auto">
          <section className="py-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                  Ключевые направления услуг
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                  Выберите формат взаимодействия в зависимости от зрелости
                  цифровых решений и запросов вашей организации.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {coreServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.id}
                    className="group bg-card rounded-2xl border border-border p-6 md:p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    <div className="absolute -top-16 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                            <Icon className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <h3 className="text-base md:text-lg font-medium tracking-tight">
                              {service.title}
                            </h3>
                            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mt-1">
                              {service.badge}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-auto pt-3 border-t border-dashed border-border/70 space-y-1.5">
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
                          Целевая аудитория
                        </p>
                        <p className="text-xs text-foreground/80">
                          {service.audience}
                        </p>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mt-3">
                          Результат
                        </p>
                        <p className="text-xs text-foreground/80">
                          {service.result}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* How to request section */}
          <section className="mb-16 md:mb-20">
            <div className="bg-background/80 border border-border rounded-2xl px-5 md:px-8 py-7 md:py-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between shadow-sm">
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-lg md:text-xl font-medium tracking-tight">
                  Как получить услугу
                </h3>
                <ol className="space-y-2 text-m ">
                  <li>
                    1. Опишите вашу задачу: отрасль, масштабы компании, текущий
                    уровень цифровизации.
                  </li>
                </ol>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    2. Совместно с экспертами Комитета сформируйте дорожную
                    карту и подберите формат взаимодействия.
                  </li>
                  <li>
                    3. Запустите пилотный или полноформатный проект с участием
                    ИТ‑компаний и профильных партнеров.
                  </li>
                </ol>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/90 transition-colors"
                >
                  Изучить регламенты и документы
                </Link>
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Оставить заявку на услугу
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Services;


