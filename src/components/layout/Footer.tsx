import { Link } from "react-router-dom";
import { Send, Mail, Globe, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            
            <div className="mb-4">
              <a href="https://saratov.tpprf.ru/ru/" target="_blank">
                <img 
                  src="/images/tpp-logo.png" 
                  alt="ТПП Саратовской области"
                  className="h-12 object-contain"
                />
              </a>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-foreground rounded-lg flex items-center justify-center text-background">
                <img 
                  src="/images/favicon1.ico" 
                  className="w-8 h-8 object-contain"
                  alt="Логотип комитета"
                />
              </div>
              <div className="flex flex-col leading-[0.8rem]">
                <span className="text-xs font-medium tracking-tight [word-spacing:-px]">
                  КОМИТЕТ ПО РАЗВИТИЮ
                </span>
                <span className="text-xs font-medium tracking-tight">
                  ЦИФРОВЫХ ТЕХНОЛОГИЙ И ИНОВАЦИЙ
                </span>
              </div>
            </div>
            {/* <p className="text-muted-foreground text-sm max-w-sm">
              Комитет «Цифровых технологий и инноваций» Торгово-промышленной палаты
              Саратовской области.
            </p> */}
          </div>
          <div>
            <h4 className="font-medium text-sm mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  О комитете
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-foreground transition-colors">
                  Инициативы
                </Link>
              </li>
              <li>
                <Link to="/participants" className="hover:text-foreground transition-colors">
                  Участники
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foreground transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-foreground transition-colors">
                  Документы
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>410031, г. Саратов, ул. Первомайская, 74 А</li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                +7 (8452) 390-350
              </li>
              <li>
                <a 
                  href="mailto:secretariat@sartpp.ru"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  secretariat@sartpp.ru
                </a>
              </li>
              <li>
                <a 
                  href="https://cdti.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  cdti.tech
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://t.me/tpp_saratov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://vk.com/sartpp_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="VK"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.009-1.492-1.144-1.746-1.144-.356 0-.458.102-.458.597v1.57c0 .424-.136.678-1.237.678-1.829 0-3.862-1.11-5.295-3.177C4.593 10.883 4 8.55 4 8.057c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.305-.491.745-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.746.847 1.322 1.558 1.474 2.049.17.474-.085.72-.576.72z"/>
                </svg>
              </a>
              <a
                href="mailto:secretariat@sartpp.ru"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p className="text-center md:text-left">
            © 2025 Комитет по развитию цифровых технологий и инноваций,
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            ТПП Саратовской области.
            <br className="md:hidden" />
            <span className="hidden md:inline"> </span>
            Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
