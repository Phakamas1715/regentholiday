import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Compass, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";
import shanghaiImg from "@/assets/destination-shanghai.jpg";
import japanImg from "@/assets/destination-japan.jpg";
import koreaImg from "@/assets/destination-korea.jpg";
import { Navbar } from "@/components/Navbar";

const features = [
  { icon: Sparkles, title: "ทัวร์คุณภาพ", desc: "โปรแกรมทัวร์ต่างประเทศคัดสรรพิเศษ จัดโดยทีมงานมืออาชีพ" },
  { icon: Shield, title: "ราคาคุ้มค่า", desc: "การันตีราคาดีที่สุด พร้อมบริการครบวงจร" },
  { icon: Compass, title: "ปรับแต่งได้", desc: "ออกแบบทริปตามใจคุณ ปรับแต่งได้ทุกรายละเอียด" },
];

const popularDestinations = [
  { name: "เซี่ยงไฮ้", country: "จีน", image: shanghaiImg, price: "จาก ฿19,900", rating: 4.9 },
  { name: "โตเกียว-โอซาก้า", country: "ญี่ปุ่น", image: japanImg, price: "จาก ฿29,900", rating: 4.8 },
  { name: "โซล-เกาหลี", country: "เกาหลีใต้", image: koreaImg, price: "จาก ฿22,900", rating: 4.7 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="ท่องเที่ยวต่างประเทศ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground font-body text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Regent Holiday — ทัวร์ต่างประเทศ
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-tight text-primary-foreground">
              ค้นพบตัวตนใหม่<br />
              <span className="text-gradient-primary">ในทุกการเดินทาง</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-lg">
              เปิดประสบการณ์ใหม่กับทัวร์ต่างประเทศคุณภาพ ญี่ปุ่น เกาหลี จีน ยุโรป และอีกมากมาย
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  เริ่มวางแผนทริป
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm">
                  ดูแพ็คเกจทัวร์
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              ทัวร์ต่างประเทศยอดนิยม
            </h2>
            <p className="font-body text-muted-foreground text-lg">เลือกจุดหมายปลายทาง แล้วให้เราจัดให้</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularDestinations.map((dest) => (
              <Link to="/booking" key={dest.name} className="group">
                <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-primary-foreground">{dest.name}</h3>
                        <p className="font-body text-primary-foreground/80">{dest.country} · {dest.price}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {dest.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container max-w-2xl space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
            พร้อมเริ่มต้นการเดินทาง?
          </h2>
          <p className="font-body text-lg text-primary-foreground/80">
            ให้ Regent Holiday ดูแลทุกรายละเอียดให้คุณ — จองง่าย สะดวก ปลอดภัย
          </p>
          <Link to="/booking">
            <Button variant="hero" size="lg" className="text-lg px-10 py-6 mt-4">
              เริ่มวางแผนเลย
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-foreground">
        <div className="container text-center">
          <p className="font-body text-sm text-muted">© 2026 Regent Holiday — ทัวร์ต่างประเทศคุณภาพ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
