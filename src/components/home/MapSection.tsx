import { useState } from "react";
import { MapPin, Send, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const MapSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Сообщение с сайта от ${formData.name}`);
    const body = encodeURIComponent(
      `Имя: ${formData.name}\nEmail: ${formData.email}\n\nСообщение:\n${formData.message}`
    );

    window.location.href = `mailto:info@cdti.tech?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 px-6 relative z-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Мы всегда рады ответить на ваши вопросы и обсудить сотрудничество
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 order-2 lg:order-1">
            <h3 className="text-lg font-medium mb-6">Обратная связь</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Ваше сообщение"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                <>
                  Отправить <Send className="w-4 h-4 ml-2" />
                </>
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>410031, г. Саратов, ул. Первомайская, 74 А</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+7 (8452) 390-350</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@cdti.tech" className="hover:text-foreground transition-colors">
                  info@cdti.tech
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Пн–Пт: 9:00 – 18:00</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden order-1 lg:order-2 h-[300px] lg:h-auto min-h-[400px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=46.037859%2C51.531926&z=17&pt=46.037859%2C51.531926%2Cpm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{ display: "block" }}
              title="Карта расположения офиса"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
