import React, { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";

export type ProjectType = "request" | "solution" | "pilot";

export type ProjectStatus = 
  | "draft" 
  | "published" 
  | "shortlist" 
  | "pitch" 
  | "followup" 
  | "poc" 
  | "live" 
  | "scale" 
  | "done" 
  | "on_hold";

export type DataRequirement = 
  | "on_prem" 
  | "cloud_ok" 
  | "pdn" 
  | "nda" 
  | "anonymized_only";

export interface ProjectCard {
  id: string;
  type: ProjectType;
  title: string;
  oneLiner: string;
  description: string;
  categories: string[];
  industries: string[];
  tags: string[];
  status: ProjectStatus;
  readinessScore: number;
  impactScore: number;
  pilotDurationWeeks?: number;
  startWindow?: { from?: string; to?: string };
  budgetRange?: { min?: number; max?: number; currency?: "RUB" };
  dataRequirements: DataRequirement[];
  assets?: {
    pdfUrl?: string;
    pitchVideoUrl?: string;
    websiteUrl?: string;
  };
  owner?: { 
    name?: string; 
    role?: string; 
    email?: string; 
    phone?: string; 
    public?: boolean 
  };
  createdAt: string;
  updatedAt: string;
}

export type SortOption =
  | "relevance"
  | "readiness_score_desc"
  | "impact_score_desc"
  | "newest"
  | "starting_soon";

export type LeadFormType =
  | "request"
  | "solution"
  | "pilot_meeting"
  | "b2b_slot"
  | "submit_project";

export interface LeadFormState {
  fullName: string;
  org: string;
  role: "customer" | "mtk" | "university" | "investor" | "other";
  phone: string;
  email: string;
  comment: string;
  pdnConsent: boolean;
}

// ========== MOCK ДАННЫЕ ==========

import projectsData from '@/data/projects-data.json';

// Экспортируем типизированные mock данные
export const MOCK_PROJECTS: ProjectCard[] = projectsData as ProjectCard[];

// Пример функции для фильтрации или поиска
export const getProjectsByType = (type: ProjectType): ProjectCard[] => {
  return MOCK_PROJECTS.filter(project => project.type === type);
};

export const getProjectById = (id: string): ProjectCard | undefined => {
  return MOCK_PROJECTS.find(project => project.id === id);
};

// ========== СЛОВАРИ ==========

const CATEGORY_LABELS: Record<string, string> = {
  ai_agents: "AI-агенты",
  computer_vision: "Computer Vision",
  iiot: "IIoT",
  buildtech: "BuildTech",
  cyber: "Кибербезопасность",
  automation: "Автоматизация",
  design: "Design",
  ip_nma: "IP & НМА",
  export: "Экспорт",
  cfa: "ЦФА",
};

const INDUSTRY_LABELS: Record<string, string> = {
  manufacturing: "Промышленность",
  construction: "Стройка",
  energy: "Энергетика",
  agro: "Агро",
  city: "Город",
  services: "Сервисы",
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Черновик",
  published: "Опубликован",
  shortlist: "Shortlist",
  pitch: "Pitch",
  followup: "Follow-up",
  poc: "PoC",
  live: "В работе",
  scale: "Масштабирование",
  done: "Завершён",
  on_hold: "Пауза",
};

const STATUS_BADGE: Partial<Record<ProjectStatus, string>> = {
  live: "в работе",
  poc: "готов к пилоту",
  scale: "масштабирование",
  done: "завершён",
};

const TYPE_LABELS: Record<ProjectType, string> = {
  request: "Запрос",
  solution: "Решение",
  pilot: "Пилот",
};

// ========== ХЕЛПЕРЫ ==========

const formatPilotDuration = (weeks?: number) => {
  if (!weeks) return "Срок уточняется";
  if (weeks <= 4) return "2–4 недели";
  if (weeks <= 8) return "1–2 месяца";
  if (weeks <= 24) return "3–6 месяцев";
  return "6+ месяцев";
};

const formatBudget = (budget?: ProjectCard["budgetRange"]) => {
  if (!budget || (!budget.min && !budget.max)) return "По согласованию";
  const fmt = (val?: number) =>
    typeof val === "number" ? val.toLocaleString("ru-RU") : "";
  const currency = budget.currency === "RUB" || !budget.currency ? "₽" : budget.currency;
  if (budget.min && budget.max) return `${fmt(budget.min)}–${fmt(budget.max)} ${currency}`;
  if (budget.min) return `от ${fmt(budget.min)} ${currency}`;
  if (budget.max) return `до ${fmt(budget.max)} ${currency}`;
  return "По согласованию";
};

const generateLeadId = () => `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const parseQueryParam = (name: string): string | undefined => {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return params.get(name) ?? undefined;
};



export default function PilotProjectsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [industryFilter, setIndustryFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("relevance");

  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLeadFormType, setActiveLeadFormType] = useState<LeadFormType | null>(null);

  const [leadForm, setLeadForm] = useState<LeadFormState>({
    fullName: "",
    org: "",
    role: "customer",
    phone: "",
    email: "",
    comment: "",
    pdnConsent: false,
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  // deep-link
  useEffect(() => {
    const projectParam = parseQueryParam("project");
    if (projectParam) {
      setSelectedProjectId(projectParam);
      setDrawerOpen(true);
    }
  }, []);

  // sync URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (drawerOpen && selectedProjectId) {
      url.searchParams.set("project", selectedProjectId);
    } else {
      url.searchParams.delete("project");
    }
    window.history.replaceState({}, "", url.toString());
  }, [drawerOpen, selectedProjectId]);

  const selectedProject = useMemo(
    () => MOCK_PROJECTS.find((p) => p.id === selectedProjectId),
    [selectedProjectId]
  );

  // фильтрация + сортировка
  const filteredProjects = useMemo(() => {
    let list = [...MOCK_PROJECTS];

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const haystack = [p.title, p.oneLiner, p.description, ...(p.tags ?? [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (typeFilter !== "all") {
      list = list.filter((p) => p.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.categories?.includes(categoryFilter));
    }

    if (industryFilter !== "all") {
      list = list.filter((p) => p.industries?.includes(industryFilter));
    }

    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }

    list.sort((a, b) => {
      switch (sort) {
        case "readiness_score_desc":
          return (b.readinessScore ?? 0) - (a.readinessScore ?? 0);
        case "impact_score_desc":
          return (b.impactScore ?? 0) - (a.impactScore ?? 0);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "starting_soon":
          return (
            new Date(a.startWindow?.from ?? 0).getTime() -
            new Date(b.startWindow?.from ?? 0).getTime()
          );
        case "relevance":
        default:
          const scoreA = (a.readinessScore ?? 0) * 0.6 + (a.impactScore ?? 0) * 0.4;
          const scoreB = (b.readinessScore ?? 0) * 0.6 + (b.impactScore ?? 0) * 0.4;
          return scoreB - scoreA;
      }
    });

    return list;
  }, [search, typeFilter, categoryFilter, industryFilter, statusFilter, sort]);

  const resetLeadForm = () => {
    setLeadForm({
      fullName: "",
      org: "",
      role: "customer",
      phone: "",
      email: "",
      comment: "",
      pdnConsent: false,
    });
    setLeadSuccess(false);
  };

  const handleOpenDrawer = (projectId: string, formType?: LeadFormType) => {
    setSelectedProjectId(projectId);
    setDrawerOpen(true);
    setActiveLeadFormType(formType ?? null);
    resetLeadForm();
  };

  const handleLeadChange = (field: keyof LeadFormState, value: any) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeadSubmit = async () => {
    if (!leadForm.pdnConsent) return;
    setLeadSubmitting(true);
    try {
      console.log("Lead submitted:", {
        leadId: generateLeadId(),
        formType: activeLeadFormType,
        projectId: selectedProjectId,
        data: leadForm,
      });
      setLeadSuccess(true);
      setTimeout(() => resetLeadForm(), 2000);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const kpi = useMemo(() => {
    return {
      totalRequests: MOCK_PROJECTS.filter((p) => p.type === "request").length,
      totalSolutions: MOCK_PROJECTS.filter((p) => p.type === "solution").length,
      totalPilots: MOCK_PROJECTS.filter((p) => p.type === "pilot").length,
      inWork: MOCK_PROJECTS.filter((p) => ["poc", "live", "scale"].includes(p.status)).length,
    };
  }, []);

  return (
    <Layout>
    <div className="dot-background dot-dark min-h-screen">
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 pt-16">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
              Форум • Экосистема пилотов
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Пилотные проекты: от запроса к внедрению
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 md:text-base">
              Выберите запрос или решение. Запросите встречу. Запустите пилот — с&nbsp;прозрачным треком статусов на 6–12 месяцев после форума.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
                onClick={() => {
                  setActiveLeadFormType("submit_project");
                  setDrawerOpen(true);
                  setSelectedProjectId(undefined);
                }}
              >
                Подать проект
              </button>
              <button
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-50 transition hover:border-sky-500 hover:text-sky-300"
                onClick={() => {
                  setActiveLeadFormType("request");
                  setDrawerOpen(true);
                  setSelectedProjectId(undefined);
                }}
              >
                Заявить запрос
              </button>
              <button
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-50 transition hover:border-sky-500 hover:text-sky-300"
                onClick={() => {
                  setActiveLeadFormType("b2b_slot");
                  setDrawerOpen(true);
                  setSelectedProjectId(undefined);
                }}
              >
                Записаться на B2B
              </button>
            </div>
          </div>

          {/* KPI */}
          <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs md:grid-cols-4 md:text-sm">
            <div>
              <div className="text-slate-400">Запросов</div>
              <div className="text-lg font-semibold text-sky-400">{kpi.totalRequests}</div>
            </div>
            <div>
              <div className="text-slate-400">Решений</div>
              <div className="text-lg font-semibold text-emerald-400">{kpi.totalSolutions}</div>
            </div>
            <div>
              <div className="text-slate-400">Пилотов</div>
              <div className="text-lg font-semibold text-amber-400">{kpi.totalPilots}</div>
            </div>
            <div>
              <div className="text-slate-400">В работе</div>
              <div className="text-lg font-semibold text-lime-400">{kpi.inWork}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Фильтры + Грид */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        {/* Sticky filter bar */}
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur">
          <div className="flex flex-col gap-3 md:gap-3">
            <input
              className="w-full rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
              placeholder="Поиск по названию, тегам, отрасли..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 text-xs">
              <select
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
              >
                <option value="all">Тип: любой</option>
                <option value="request">Запрос</option>
                <option value="solution">Решение</option>
                <option value="pilot">Пилот</option>
              </select>

              <select
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Категория: любая</option>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="all">Отрасль: любая</option>
                {Object.entries(INDUSTRY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">Статус: любой</option>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="relevance">По релевантности</option>
                <option value="readiness_score_desc">По готовности</option>
                <option value="impact_score_desc">По эффекту</option>
                <option value="newest">Новые</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleOpenDrawer(project.id)}
              onAction={(type) => handleOpenDrawer(project.id, type)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center text-sm text-slate-400">
            Ничего не найдено. Попробуйте изменить фильтры.
          </div>
        )}

{/* How it works - Liquid Glass цифры с анимацией */}
<section className="mt-24 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
  <div className="mb-8">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
      Как устроен пилот
    </h2>
    <p className="mt-2 text-sm text-slate-400">От идеи до внедрения — 5 ключевых этапов</p>
  </div>
  
  <div className="space-y-8">
    {[
      { 
        number: "01", 
        title: "Формулировка", 
        subtitle: "Определяем проблему и целевые KPI",
        description: "Совместно с заказчиком описываем бизнес-задачу и метрики успеха"
      },
      { 
        number: "02", 
        title: "Скоринг", 
        subtitle: "Выбор команды",
        description: "Анализ компетенций и&nbsp;выбор оптимальной команды под задачу"
      },
      { 
        number: "03", 
        title: "Техническое задание", 
        subtitle: "Детальное описание",
        description: "Совместная разработка требований и&nbsp;архитектуры решения"
      },
      { 
        number: "04", 
        title: "PoC", 
        subtitle: "Ограниченный пилот",
        description: "Тестирование гипотезы на реальных данных в&nbsp;контролируемой среде"
      },
      { 
        number: "05", 
        title: "Внедрение", 
        subtitle: "Полная интеграция",
        description: "Масштабирование решения и&nbsp;интеграция в&nbsp;бизнес-процессы"
      }
    ].map((item, i) => (
      <div 
        key={i} 
        className="group flex items-start gap-10 rounded-xl border border-slate-800 bg-slate-950/40 p-6 transition-all hover:border-sky-500/30 hover:bg-slate-900/60"
      >
        {/* Liquid Glass цифра с анимацией */}
        <div className="flex-shrink-0 relative">
          <div className="relative">
            {/* Основа для объема */}
            <div className="text-6xl md:text-7xl font-black">
              <span className="text-slate-900/70">{item.number}</span>
            </div>
            
            {/* Основной жидкий слой с анимацией */}
            <div className="absolute top-0 left-0 text-6xl md:text-7xl font-black">
              <span 
                className="text-transparent bg-clip-text animate-shimmer"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7dd3fc 0%, #22d3ee 20%, #2dd4bf 40%, #34d399 60%, #4ade80 80%, #7dd3fc 100%)',
                  backgroundSize: '200% 100%',
                  filter: 'drop-shadow(0 0 12px rgba(125, 211, 252, 0.4))'
                }}
              >
                {item.number}
              </span>
            </div>
            
            {/* Блики */}
            <div className="absolute top-0 left-0 text-6xl md:text-7xl font-black opacity-30">
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                  backgroundSize: '50% 100%',
                  backgroundPosition: '-100% 0'
                }}
              >
                {item.number}
              </span>
            </div>
          </div>
          
          {/* Декоративная линия под цифрой */}
          <div className="mt-2 h-1 w-16 bg-gradient-to-r from-sky-500 to-transparent rounded-full group-hover:w-24 transition-all duration-300"></div>
        </div>
        
        {/* Контент справа */}
        <div className="flex-1 pl-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-100">{item.title}</h3>
            <span className="text-xs font-medium text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-full">
              {item.subtitle}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {item.description}
          </p>
          {/* Декоративная линия при наведении */}
        </div>
      </div>
    ))}
  </div>
</section>

        {/* FAQ */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold">Частые вопросы</h3>
            <div className="mt-4 space-y-4 text-sm">
              <details className="rounded border border-slate-800 p-2">
                <summary className="cursor-pointer font-medium">Кто может подать проект?</summary>
                <p className="mt-5 text-xs text-slate-300">Команды, МТК, вузы, стартапы, готовые к B2B.</p>
              </details>
              <details className="rounded border border-slate-800 p-2">
                <summary className="cursor-pointer font-medium">Какие форматы пилота?</summary>
                <p className="mt-4 text-xs text-slate-300">PoC, пилот на участке, поэтапное внедрение.</p>
              </details>
              <details className="rounded border border-slate-800 p-2">
                <summary className="cursor-pointer font-medium">Нужен ли NDA?</summary>
                <p className="mt-4 text-xs text-slate-300">Да, для чувствительных данных с NDA и on-prem.</p>
              </details>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold">Контакты оргкомитета</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Email: </span>
                <a href="mailto:info@cdti.tech" className="text-sky-400 hover:underline">
                  info@cdti.tech
                </a>
              </div>
              <div>
                <span className="text-slate-400">Телеграм: </span>
                <span className="text-slate-200">@cdti_forum</span>
              </div>
              <div>
                <span className="text-slate-400">Сайт: </span>
                <a href="https://cdti.tech" className="text-sky-400 hover:underline">
                  https://cdti.tech
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Drawer */}
      {drawerOpen && (
        <ProjectDrawer
          project={selectedProject}
          onClose={() => setDrawerOpen(false)}
          leadForm={leadForm}
          onLeadChange={handleLeadChange}
          onLeadSubmit={handleLeadSubmit}
          leadSubmitting={leadSubmitting}
          leadSuccess={leadSuccess}
          activeFormType={activeLeadFormType}
        />
      )}
    </div>
    </div>
    </Layout>
  );
}

// ========== SUB-COMPONENTS ==========

function ProjectCard({
  project,
  onClick,
  onAction,
}: {
  project: ProjectCard;
  onClick: () => void;
  onAction: (type: LeadFormType) => void;
}) {
  const badge = STATUS_BADGE[project.status];
  const primaryAction: LeadFormType =
    project.type === "request"
      ? "solution"
      : project.type === "solution"
      ? "pilot_meeting"
      : "b2b_slot";

  const primaryLabel =
    project.type === "request"
      ? "Предложить решение"
      : project.type === "solution"
      ? "Запросить пилот"
      : "Запросить встречу";

  return (
    <button
      onClick={onClick}
      className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-sky-500/60 hover:bg-slate-900/80 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-[11px] font-medium">
          <span
            className={
              project.type === "request"
                ? "h-1.5 w-1.5 rounded-full bg-amber-400"
                : project.type === "solution"
                ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                : "h-1.5 w-1.5 rounded-full bg-sky-400"
            }
          />
          {TYPE_LABELS[project.type]}
        </span>
        {badge && <span className="text-[11px] text-sky-300">{badge}</span>}
      </div>

      <h3 className="line-clamp-2 font-semibold text-slate-50">{project.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-slate-300">{project.oneLiner}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {project.categories?.slice(0, 2).map((cat) => (
          <span key={cat} className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300">
            {CATEGORY_LABELS[cat] || cat}
          </span>
        ))}
      </div>

      <div className="mt-11 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        <div>
          <div className="text-slate-500">Готовность</div>
          <div className="font-semibold">{project.readinessScore}/100</div>
        </div>
        <div>
          <div className="flex flex-col items-end text-right"> {/* Добавили flex-col и items-end */}
          <div className="text-slate-500">Эффект</div>
          <div className="font-semibold">{project.impactScore}/100</div>
        </div>
      </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
  <button
    onClick={(e) => {
      e.stopPropagation();
      onAction(primaryAction);
    }}
    className="relative rounded-full px-4 py-2 text-xs font-bold overflow-hidden group/btn transition-all duration-300 border border-slate-700 hover:border-sky-500/70"
  >
    {/* Glass фон с более четкой границей */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
    
 {/* Жидкий градиент как у цифр */}
<div 
  className="absolute inset-0 opacity-30 group-hover/btn:opacity-70 transition-opacity duration-500 rounded-full"
  style={{
    backgroundImage: 'linear-gradient(135deg, rgba(125, 211, 252, 0.4) 0%, rgba(34, 211, 238, 0.3) 25%, rgba(45, 212, 191, 0.3) 50%, rgba(52, 211, 153, 0.4) 75%, rgba(74, 222, 128, 0.5) 100%)'
  }}
></div>

{/* Shimmer эффект ТОЛЬКО при наведении на кнопку */}
<div 
  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
  style={{
    background: 'linear-gradient(90deg, transparent 0%, rgba(125, 211, 252, 0.4) 50%, transparent 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear'
  }}
></div>

{/* Блик сверху как у цифр */}
<div 
  className="absolute top-0 left-0 w-full h-1/2 opacity-25 group-hover/btn:opacity-50 transition-opacity duration-300 rounded-t-full"
  style={{
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
    mixBlendMode: 'overlay'
  }}
></div>

{/* Эффект внутреннего свечения как у цифр */}
<div 
  className="absolute inset-0 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500 rounded-full"
  style={{
    backgroundImage: 'radial-gradient(circle at center, rgba(125, 211, 252, 0.5) 0%, transparent 70%)',
    filter: 'blur(8px)'
  }}
></div>
    
    {/* Текст кнопки */}
    <span className="relative z-10 text-white font-bold drop-shadow-md">
      {primaryLabel}
    </span>
    
    {/* Эффект нажатия */}
    <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/5 group-active/btn:bg-white/10 transition-colors rounded-full"></div>
  </button>
  
  {/* "Подробнее" - реагирует на наведение только на себя */}
  <span className="text-xs text-slate-500 hover:text-sky-300 transition-colors cursor-pointer">Подробнее →</span>
</div>
    </button>
  );
}

function ProjectDrawer({
  project,
  onClose,
  leadForm,
  onLeadChange,
  onLeadSubmit,
  leadSubmitting,
  leadSuccess,
  activeFormType,
}: {
  project?: ProjectCard;
  onClose: () => void;
  leadForm: LeadFormState;
  onLeadChange: (field: keyof LeadFormState, value: any) => void;
  onLeadSubmit: () => void;
  leadSubmitting: boolean;
  leadSuccess: boolean;
  activeFormType: LeadFormType | null;
}) {
  const [tab, setTab] = useState<"description" | "conditions" | "contacts">("description");

  const primaryLabel =
    activeFormType === "request"
      ? "Отправить запрос"
      : activeFormType === "solution"
      ? "Предложить решение"
      : activeFormType === "b2b_slot"
      ? "Запросить B2B слот"
      : "Запросить встречу";

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center">
      <div className="relative w-full max-w-2xl rounded-t-2xl border border-slate-800 bg-slate-950 shadow-xl md:h-[75vh] md:rounded-2xl md:overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <h2 className="line-clamp-1 font-semibold text-slate-50">
            {project?.title || "Новая заявка"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-sky-500"
          >
            ✕
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)] flex-col gap-4 md:h-[calc(75vh-60px)] md:flex-row">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!project ? (
              <p className="text-sm text-slate-300">Заполните форму справа и отправьте запрос.</p>
            ) : (
              <>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-200">{project.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-slate-500">Готовность</div>
                      <div className="font-semibold text-slate-100">{project.readinessScore}/100</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Эффект</div>
                      <div className="font-semibold text-slate-100">{project.impactScore}/100</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Срок пилота</div>
                      <div className="text-slate-100">{formatPilotDuration(project.pilotDurationWeeks)}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Бюджет</div>
                      <div className="text-slate-100">{formatBudget(project.budgetRange)}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-full border-t border-slate-800 bg-slate-900/50 px-4 py-4 md:w-80 md:border-l md:border-t-0">
            <h3 className="text-sm font-semibold text-slate-100">{primaryLabel}</h3>
            <p className="mt-1 text-xs text-slate-400">
              После отправки свяжемся в течение 2 рабочих дней.
            </p>

            <div className="mt-3 space-y-2">
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500"
                placeholder="ФИО"
                value={leadForm.fullName}
                onChange={(e) => onLeadChange("fullName", e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500"
                placeholder="Организация"
                value={leadForm.org}
                onChange={(e) => onLeadChange("org", e.target.value)}
              />
              <select
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50"
                value={leadForm.role}
                onChange={(e) => onLeadChange("role", e.target.value)}
              >
                <option value="customer">Заказчик</option>
                <option value="mtk">МТК</option>
                <option value="university">Вуз</option>
                <option value="investor">Инвестор</option>
                <option value="other">Другое</option>
              </select>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500"
                placeholder="Email"
                type="email"
                value={leadForm.email}
                onChange={(e) => onLeadChange("email", e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500"
                placeholder="Телефон"
                value={leadForm.phone}
                onChange={(e) => onLeadChange("phone", e.target.value)}
              />
              <textarea
                className="min-h-16 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500"
                placeholder="Комментарий"
                value={leadForm.comment}
                onChange={(e) => onLeadChange("comment", e.target.value)}
              />

              <label className="flex items-start gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={leadForm.pdnConsent}
                  onChange={(e) => onLeadChange("pdnConsent", e.target.checked)}
                />
                <span>Согласен с политикой конфиденциальности</span>
              </label>

              <button
                disabled={!leadForm.pdnConsent || !leadForm.email || leadSubmitting}
                onClick={onLeadSubmit}
                className="w-full rounded-lg bg-sky-500 px-3 py-2 text-xs font-medium text-slate-950 transition hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-400"
              >
                {leadSubmitting ? "Отправка..." : primaryLabel}
              </button>

              {leadSuccess && (
                <p className="text-xs text-emerald-400">✓ Заявка отправлена!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}