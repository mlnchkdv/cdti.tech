import { Layout } from "@/components/layout/Layout";
import {
  Scale,
  GraduationCap,
  Share2,
  ShieldCheck,
  Quote,
  FileText,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="dot-background min-h-screen">
        {/* Header */}
        <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto border-b border-border/50">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[10px] uppercase font-semibold tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>О нас
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
              Драйвер цифровой трансформации региона
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl tracking-tight">
              Комитет ТПП Саратовской области по развитию цифровых технологий и инноваций —
              площадка диалога бизнеса, государства и образования
               и инструмент реализации проектов цифровой трансформации региона.
            </p>
          </div>
        </header>

        {/* Key Metrics */}
        <section className="hidden border-b border-border bg-background/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="animate-fade-in delay-100">
                <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                  45+
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  IT-компаний
                </div>
              </div>
              <div className="animate-fade-in delay-100">
                <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                  12
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Заседаний в год
                </div>
              </div>
              <div className="animate-fade-in delay-100">
                <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                  5
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  ВУЗов-партнеров
                </div>
              </div>
              <div className="animate-fade-in delay-100">
                <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                  2018
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Год основания
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="px-6 max-w-6xl mx-auto py-20">
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            <div className="lg:col-span-4 animate-fade-in delay-100">
              <h2 className="text-xl font-medium tracking-tight mb-4">
                Наша миссия
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Формирование конкурентоспособной цифровой экономики в регионе
                через объединение усилий участников рынка и выстраивание
                прозрачных правил игры.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in delay-200">
              <div className="info-card bg-card border border-border rounded-xl p-6 transition-all duration-300">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4 border border-border text-foreground">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-foreground mb-2 tracking-tight">
                  Законотворчество
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Участие в разработке региональных нормативных актов и мер
                  поддержки для IT-отрасли. Лоббирование интересов участников.
                </p>
              </div>

              <div className="info-card bg-card border border-border rounded-xl p-6 transition-all duration-300">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4 border border-border text-foreground">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-foreground mb-2 tracking-tight">
                  Кадры и образование
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Синхронизация учебных программ ВУЗов с реальными потребностями
                  рынка. Организация стажировок и хакатонов.
                </p>
              </div>

              <div className="info-card bg-card border border-border rounded-xl p-6 transition-all duration-300">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4 border border-border text-foreground">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-foreground mb-2 tracking-tight">
                  Нетворкинг
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Обмен опытом между руководителями компаний. Создание совместных
                  продуктов и выход на федеральные рынки.
                </p>
              </div>

              <div className="info-card bg-card border border-border rounded-xl p-6 transition-all duration-300">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4 border border-border text-foreground">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-foreground mb-2 tracking-tight">
                  Защита бизнеса
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Юридическая поддержка членов комитета. Медиация споров и помощь
                  во взаимодействии с контрольно-надзорными органами.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-r from-foreground to-muted-foreground rounded-2xl p-8 md:p-12 mb-24 relative overflow-hidden ">
            <div className="absolute top-0 right-0 w-64 h-64 bg-muted-foreground/20 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1">
                <Quote className="text-muted-foreground w-8 h-8 mb-4 opacity-50" />
                <p className="text-lg md:text-xl text-background/90 font-medium leading-relaxed tracking-tight mb-6">
                  "Мы не просто объединение компаний, мы — интеллектуальный ресурс
                  региона. Наша задача — сделать так, чтобы самые передовые
                  технологии работали на благо экономики Саратовской области."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted-foreground/30 flex items-center justify-center text-xs text-background font-medium border-2 border-muted-foreground/50">
                    ДБ
                  </div>
                  <div>
                    <div className="text-sm text-background font-medium">
                      Козюкин Денис Борисович
                    </div>
                    <div className="text-xs text-background/60">
                      Председатель комитета
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Structure Section */}
          <div className="animate-fade-in delay-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Структура работы
              </span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-default">
                <div className="h-px w-8 bg-foreground mb-4 group-hover:w-full transition-all duration-500"></div>
                <h4 className="font-medium text-foreground mb-2">
                  Общие собрания
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Проводятся ежеквартально. Утверждение планов, прием новых
                  членов, встреча с приглашенными спикерами из правительства.
                </p>
              </div>
              <div className="group cursor-default">
                <div className="h-px w-8 bg-foreground mb-4 group-hover:w-full transition-all duration-500"></div>
                <h4 className="font-medium text-foreground mb-2">
                  Рабочие группы
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Формируются под конкретные задачи: "Образование", "Налоги",
                  "Умный город". Оперативное решение узких вопросов.
                </p>
              </div>
              <div className="group cursor-default">
                <div className="h-px w-8 bg-foreground mb-4 group-hover:w-full transition-all duration-500"></div>
                <h4 className="font-medium text-foreground mb-2">
                  Совет комитета
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Управляющий орган. Определяет стратегическую повестку и
                  представляет комитет на федеральном уровне.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Documents Preview */}
        <section className="border-t border-border bg-muted py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-xl font-medium tracking-tight mb-2">
                  Нормативная база
                </h2>
                <p className="text-sm text-muted-foreground">
                  Основополагающие документы, регламентирующие деятельность.
                </p>
              </div>
              <Link
                to="/docs"
                className="text-sm font-medium text-foreground flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                Все документы <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="#"
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-muted-foreground/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-muted transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Положение о комитете
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>PDF</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>2.4 MB</span>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-muted-foreground/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-muted transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    План работы на 2026
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>PDF</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>1.1 MB</span>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-muted-foreground/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-muted transition-colors">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Порядок вступления
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>DOCX</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>0.5 MB</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
