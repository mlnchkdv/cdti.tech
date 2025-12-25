import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { DocumentPreview } from "@/components/documents/DocumentPreview";
import {
  Search,
  LayoutGrid,
  List,
  Star,
  Scale,
  Presentation,
  FileText,
  FileCheck2,
  Sheet,
  Download,
  Eye,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import documentsData from "@/data/documents.json";

const formatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  docx: FileCheck2,
  xlsx: Sheet,
};

const formatColors: Record<string, string> = {
  pdf: "bg-red-50 border-red-100 text-red-600",
  docx: "bg-blue-50 border-blue-100 text-blue-600",
  xlsx: "bg-green-50 border-green-100 text-green-600",
};

const Documents = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [yearFilters, setYearFilters] = useState<string[]>([]);
  const [formatFilters, setFormatFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [previewDoc, setPreviewDoc] = useState<typeof documentsData.documents[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const tabs = [
    { id: "all", label: "Все документы" },
    { id: "protocols", label: "Протоколы" },
    { id: "laws", label: "Законодательство" },
    { id: "templates", label: "Шаблоны" },
    { id: "archive", label: "Архив" },
  ];

  const filteredDocuments = useMemo(() => {
    let filtered = [...documentsData.documents];

    if (activeTab !== "all") {
      filtered = filtered.filter((doc) => doc.category === activeTab);
    }

    if (yearFilters.length > 0) {
      filtered = filtered.filter((doc) => yearFilters.includes(doc.year));
    }

    if (formatFilters.length > 0) {
      filtered = filtered.filter((doc) => formatFilters.includes(doc.format));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTab, yearFilters, formatFilters, searchQuery]);

  const featuredDocs = documentsData.documents.filter((doc) => doc.featured);

  const toggleFilter = (value: string, filters: string[], setFilters: (f: string[]) => void) => {
    setFilters(filters.includes(value) ? filters.filter((f) => f !== value) : [...filters, value]);
  };

  const resetFilters = () => {
    setYearFilters([]);
    setFormatFilters([]);
    setSearchQuery("");
    setActiveTab("all");
  };

  const openPreview = (doc: typeof documentsData.documents[0]) => {
    setPreviewDoc(doc);
    setIsPreviewOpen(true);
  };

  const groupedByMonth = useMemo(() => {
    const groups: Record<string, typeof documentsData.documents> = {};
    filteredDocuments.forEach((doc) => {
      const date = new Date(doc.date);
      const key = date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
      if (!groups[key]) groups[key] = [];
      groups[key].push(doc);
    });
    return groups;
  }, [filteredDocuments]);

  return (
    <Layout>
      <div className="dot-background min-h-screen pb-20 flex flex-col">
        {/* Header */}
        <header className="pt-24 pb-8 px-4 md:px-6 max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
              Документы и регламенты
            </h1>
            <p className="text-base md:text-lg text-muted-foreground tracking-tight leading-relaxed mb-6 md:mb-8">
              Официальная документация комитета: протоколы, законодательство, шаблоны.
            </p>

            {/* Search */}
            <div className="relative group mb-6 md:mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-card border border-border rounded-xl text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all"
                placeholder="Поиск по названию или описанию..."
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-1">
            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 w-full sm:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium pb-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-foreground border-b-2 border-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${viewMode === "list" ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${viewMode === "grid" ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="px-4 md:px-6 max-w-6xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-56 space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-4">Год</h3>
              <div className="flex flex-wrap md:flex-col gap-2 md:gap-3">
                {documentsData.years.map((year) => (
                  <label key={year} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={yearFilters.includes(year)}
                      onChange={() => toggleFilter(year, yearFilters, setYearFilters)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span>{year}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-4">Формат</h3>
              <div className="flex flex-wrap md:flex-col gap-2 md:gap-3">
                {documentsData.formats.map((format) => (
                  <label key={format} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formatFilters.includes(format)}
                      onChange={() => toggleFilter(format, formatFilters, setFormatFilters)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span>{format.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              Сбросить фильтры
            </button>
          </aside>

          {/* Documents */}
          <div className="flex-1">
            {/* Featured */}
            {activeTab === "all" && searchQuery === "" && (
              <div className="mb-8 md:mb-10">
                <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  Важное
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => openPreview(doc)}
                      className="group text-left bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 text-foreground rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-accent/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center mb-4 border border-accent/30">
                        <Scale className="w-4 h-4 text-accent" />
                      </div>
                      <h3 className="font-medium text-lg mb-1">{doc.title}</h3>
                      <p className="text-muted-foreground text-xs mb-4">{doc.description}</p>
                      <span className="text-xs font-medium flex items-center gap-1 text-accent">
                        Открыть <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* List/Grid */}
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Документы не найдены</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => {
                  const Icon = formatIcons[doc.format] || FileText;
                  return (
                    <div key={doc.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${formatColors[doc.format]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{doc.format.toUpperCase()}, {doc.size}</p>
                      <div className="flex gap-2">
                        <button onClick={() => openPreview(doc)} className="flex-1 h-8 bg-muted text-xs font-medium rounded flex items-center justify-center gap-1 hover:bg-muted/80">
                          <Eye className="w-3 h-3" /> Просмотр
                        </button>
                        <a href={doc.url} download className="h-8 w-8 bg-muted rounded flex items-center justify-center hover:bg-muted/80">
                          <Download className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedByMonth).map(([month, docs]) => (
                  <div key={month}>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-sm font-semibold text-foreground capitalize">{month}</h3>
                      <div className="h-px flex-1 bg-border"></div>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      {docs.map((doc, i) => {
                        const Icon = formatIcons[doc.format] || FileText;
                        return (
                          <div key={doc.id} className={`group flex flex-col sm:flex-row sm:items-center p-4 hover:bg-muted transition-colors cursor-pointer gap-3 ${i < docs.length - 1 ? "border-b border-border" : ""}`} onClick={() => openPreview(doc)}>
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${formatColors[doc.format]}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-foreground group-hover:text-accent">{doc.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{doc.format.toUpperCase()}, {doc.size}</span>
                              <a href={doc.url} download onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground">
                                <Download className="w-5 h-5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <DocumentPreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} document={previewDoc} />
      </div>
    </Layout>
  );
};

export default Documents;