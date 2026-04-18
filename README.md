# Комитет «Цифровых технологий и инноваций» ТПП Саратовской области

Официальный сайт комитета цифровых технологий и инноваций Торгово-промышленной палаты Саратовской области.

## 🚀 Запуск проекта

### Требования
- Node.js 18+ 
- npm или yarn

### Установка и запуск

```bash
# Клонировать репозиторий
git clone <URL_РЕПОЗИТОРИЯ>
cd <НАЗВАНИЕ_ПАПКИ>

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать для продакшена
npm run build

# Превью продакшен сборки
npm run preview
```

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── layout/         # Компоненты макета (Header, Footer, Layout)
│   ├── events/         # Компоненты для мероприятий
│   │   ├── EventCard.tsx           # Карточка мероприятия
│   │   ├── EventModal.tsx          # Модальное окно мероприятия (статичное)
│   │   ├── EventModalWithStats.tsx # Модальное окно с динамической статистикой
│   │   ├── MediaGallery.tsx        # Галерея фото/видео
│   │   ├── NewsListItem.tsx        # Элемент списка новостей
│   │   └── ShareButtons.tsx        # Кнопки шеринга и счётчики
│   ├── participants/   # Компоненты для участников
│   │   ├── LeaderCard.tsx     # Карточка руководителя
│   │   ├── LeaderModal.tsx    # Модальное окно с информацией
│   │   └── CompanyCard.tsx    # Карточка компании
│   ├── documents/      # Компоненты для документов
│   │   └── DocumentPreview.tsx # Предпросмотр документов
│   └── ui/             # UI компоненты (shadcn/ui)
├── data/               # JSON файлы с данными
│   ├── news.json       # Мероприятия и новости
│   ├── participants.json # Участники и руководство
│   └── documents.json  # Документы
├── hooks/              # React хуки
│   ├── useNewsStats.ts # Хук для работы со статистикой новостей
│   └── use-mobile.tsx  # Хук для определения мобильного устройства
├── integrations/       # Интеграции с внешними сервисами
│   └── supabase/       # Lovable Cloud (база данных)
│       ├── client.ts   # Клиент для подключения к БД
│       └── types.ts    # TypeScript типы для БД
├── pages/              # Страницы сайта
├── lib/                # Утилиты
└── index.css           # Глобальные стили
```

## 🗄️ База данных (Lovable Cloud)

Проект использует Lovable Cloud для хранения статистики новостей.

### Таблица `news_stats`

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | TEXT | ID новости (PRIMARY KEY) |
| `views` | INTEGER | Количество просмотров |
| `likes` | INTEGER | Количество лайков |
| `shares` | INTEGER | Количество поделившихся |
| `created_at` | TIMESTAMP | Дата создания записи |
| `updated_at` | TIMESTAMP | Дата последнего обновления |

### Функции базы данных

- `increment_news_stat(news_id, stat_type)` — инкремент счётчика (views/likes/shares)
- `decrement_news_like(news_id)` — декремент лайков

### Хук `useNewsStats`

```typescript
import { useNewsStats } from "@/hooks/useNewsStats";

const { stats, liked, incrementView, toggleLike, incrementShare } = useNewsStats(newsId);
```

**Возвращаемые значения:**
- `stats` — объект `{ views, likes, shares }`
- `liked` — лайкнул ли пользователь новость
- `incrementView()` — увеличить счётчик просмотров
- `toggleLike()` — переключить лайк
- `incrementShare()` — увеличить счётчик шеров

## 📝 Редактирование контента

### Мероприятия и новости
Файл: `src/data/news.json`

```json
{
  "id": "1",
  "title": "Название мероприятия",
  "description": "Краткое описание",
  "fullContent": "Полное описание для модального окна",
  "date": "2024-08-24",
  "category": "meeting",
  "location": "Место проведения",
  "icon": "monitor",
  "media": {
    "images": ["/images/events/photo1.jpg"],
    "videos": [
      "https://youtube.com/embed/...",
      "/videos/local-video.mp4"
    ]
  }
}
```

**Категории:** `meeting`, `networking`, `education`, `conference`, `law`, `visit`
**Иконки:** `monitor`, `users`, `graduation-cap`, `file-text`, `mic`, `briefcase`

**Поддержка медиа:**
- Изображения: локальные пути (`/images/events/...`) или внешние URL
- Видео: YouTube embed ссылки или локальные файлы (`.mp4`, `.webm`, `.ogg`)

### Руководство комитета
Файл: `src/data/participants.json` → раздел `leadership`

```json
{
  "id": "1",
  "name": "Иванов Иван Иванович",
  "initials": "ИИ",
  "position": "Председатель",
  "company": "Название компании",
  "description": "Краткое описание",
  "fullBio": "Полная биография для модального окна",
  "photo": "/images/leader-1.jpg",
  "email": "email@example.ru",
  "phone": "+7 (000) 000-00-00",
  "telegram": "https://t.me/username",
  "achievements": ["Достижение 1", "Достижение 2"]
}
```

### Компании-участники
Файл: `src/data/participants.json` → раздел `companies`

```json
{
  "id": "1",
  "name": "Название компании",
  "category": "development",
  "description": "Описание деятельности",
  "logo": "URL_логотипа",
  "website": "https://company.ru"
}
```

**Категории компаний:** `development`, `consulting`, `security`, `education`, `telecom`, `hardware`

### Документы
Файл: `src/data/documents.json`

```json
{
  "id": "1",
  "title": "Название документа",
  "description": "Описание",
  "date": "2024-01-12",
  "category": "protocols",
  "year": "2024",
  "format": "pdf",
  "size": "2.4 MB",
  "url": "/documents/file.pdf",
  "featured": true
}
```

**Категории:** `protocols`, `laws`, `templates`, `regulations`, `archive`
**Форматы:** `pdf`, `docx`, `xlsx`

## 📄 Страницы

| Страница | Путь | Файл | Описание |
|----------|------|------|----------|
| Главная | `/` | `src/pages/Index.tsx` | Главная страница с формой обратной связи и картой |
| О комитете | `/about` | `src/pages/About.tsx` | Информация о комитете |
| Мероприятия | `/events` | `src/pages/Events.tsx` | Новости и события (поддержка прямых ссылок `?id=N`) |
| Участники | `/participants` | `src/pages/Participants.tsx` | Руководство и компании |
| Документы | `/documents` | `src/pages/Documents.tsx` | Документация с фильтрацией и предпросмотром |

## 🔗 Прямые ссылки на новости

Каждая новость имеет уникальный ID. Для получения прямой ссылки используйте формат:
```
/events?id=1
```

При открытии такой ссылки автоматически откроется модальное окно с соответствующей новостью.

## 📊 Система статистики

Статистика новостей (просмотры, лайки, шеры) хранится в базе данных и обновляется в реальном времени:

- **Просмотры** — увеличиваются при открытии модального окна новости (один раз за сессию)
- **Лайки** — пользователь может ставить/убирать лайк (сохраняется в localStorage)
- **Шеры** — увеличиваются при копировании ссылки или шеринге в соцсети

## 📍 Интеграции

### Яндекс Карты
На главной странице интегрирована Яндекс Карта с расположением комитета.
Адрес: Первомайская ул., 74А, Саратов

### Форма обратной связи
На главной странице есть форма обратной связи с возможностью выбора способа связи:
- Email
- Telegram
- Телефон

Сообщения отправляются на почту: mlnchkdv@gmail.com

### Lovable Cloud
Проект использует Lovable Cloud для:
- Хранения статистики новостей (просмотры, лайки, шеры)
- Персистентное хранение данных между сессиями

## 🎨 Стилизация

Стили определены в `src/index.css`. Используется:
- Tailwind CSS для утилитарных классов
- CSS переменные для цветов (светлая/темная тема)
- Кастомные компоненты в `@layer components`

## 🖼️ Изображения и медиа

- Фото руководства: `public/images/leader-*.jpg`
- Фото мероприятий: `public/images/events/*.jpg`
- Видео мероприятий: `public/videos/*.mp4`
- Документы: `public/documents/*.pdf`

## 🔧 Технологии

- **React 18** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **Tailwind CSS** — стили
- **shadcn/ui** — UI компоненты
- **React Router** — маршрутизация
- **Lucide React** — иконки
- **Sonner** — уведомления
- **Lovable Cloud** — база данных и бэкенд

## 📱 Адаптивность

Сайт полностью адаптивен для:
- Мобильных устройств (< 640px)
- Планшетов (640px - 1024px)
- Десктопов (> 1024px)

Используются адаптивные классы Tailwind: `sm:`, `md:`, `lg:`, `xl:`


Это правки для Никиты.
