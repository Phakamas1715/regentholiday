import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Star, Clock, MapPin, ArrowRight, Filter, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import shanghaiImg from "@/assets/destination-shanghai.jpg";
import japanImg from "@/assets/destination-japan.jpg";
import koreaImg from "@/assets/destination-korea.jpg";

const packages = [
  {
    id: 1,
    name: "เซี่ยงไฮ้ ไม่ลงร้าน 4 วัน 3 คืน (MU)",
    image: shanghaiImg,
    days: 4,
    price: 19900,
    rating: 4.9,
    airline: "China Eastern (MU)",
    highlights: ["เดอะบันด์", "หาดไว่ทาน", "เมืองโบราณจูเจียเจี่ยว"],
    timeline: ["Day 1: กรุงเทพฯ – เซี่ยงไฮ้ + หาดไว่ทาน", "Day 2: เดอะบันด์ + ถนนนานจิง + ตลาดเฉิงหวังเมี่ยว", "Day 3: เมืองโบราณจูเจียเจี่ยว + Shanghai Tower", "Day 4: อิสระ + เซี่ยงไฮ้ – กรุงเทพฯ"],
    style: "วัฒนธรรม",
    country: "จีน",
  },
  {
    id: 2,
    name: "โตเกียว-โอซาก้า ซากุระ 6 วัน 4 คืน",
    image: japanImg,
    days: 6,
    price: 35900,
    rating: 4.8,
    airline: "Thai Airways (TG)",
    highlights: ["วัดอาซากุสะ", "ภูเขาไฟฟูจิ", "ชินไซบาชิ"],
    timeline: ["Day 1: กรุงเทพฯ – โตเกียว", "Day 2: อาซากุสะ + ชิบุย่า + ฮาราจุกุ", "Day 3: ภูเขาไฟฟูจิ + ทะเลสาบคาวากุจิ", "Day 4: ชินคันเซ็น → โอซาก้า", "Day 5: ชินไซบาชิ + โดทงโบริ", "Day 6: โอซาก้า – กรุงเทพฯ"],
    style: "ธรรมชาติ",
    country: "ญี่ปุ่น",
  },
  {
    id: 3,
    name: "โซล-นามิ-เอเวอร์แลนด์ 5 วัน 3 คืน",
    image: koreaImg,
    days: 5,
    price: 22900,
    rating: 4.7,
    airline: "Korean Air (KE)",
    highlights: ["พระราชวังเคียงบก", "เกาะนามิ", "เอเวอร์แลนด์"],
    timeline: ["Day 1: กรุงเทพฯ – อินชอน", "Day 2: พระราชวังเคียงบก + บุกชอนฮันอก", "Day 3: เกาะนามิ + เปอติฟรองซ์", "Day 4: เอเวอร์แลนด์ + ย่านมยองดง", "Day 5: อิสระ + อินชอน – กรุงเทพฯ"],
    style: "พักผ่อน",
    country: "เกาหลีใต้",
  },
];

export default function PackagesPage() {
  const [priceRange, setPriceRange] = useState([50000]);
  const [duration, setDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = packages.filter(
    (p) => p.price <= priceRange[0] && (!duration || (duration === "4" ? p.days <= 4 : duration === "6" ? p.days <= 6 : true))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge className="mb-3">Regent Holiday</Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              แพ็คเกจทัวร์ต่างประเทศ
            </h1>
            <p className="font-body text-muted-foreground text-lg">ทัวร์คุณภาพคัดสรรพิเศษ จัดโดยทีมงานมืออาชีพ</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-card space-y-6">
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" /> กรอง
                </h3>
                <div className="space-y-2">
                  <label className="font-body text-sm text-muted-foreground">ราคาสูงสุด</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} min={15000} max={80000} step={5000} />
                  <p className="text-right text-sm font-semibold text-primary">฿{priceRange[0].toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm text-muted-foreground">ระยะเวลา</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger><SelectValue placeholder="ทั้งหมด" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="4">1-4 วัน</SelectItem>
                      <SelectItem value="6">5-6 วัน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" /> {showFilters ? "ซ่อนตัวกรอง" : "แสดงตัวกรอง"}
            </Button>

            {/* Package Cards */}
            <div className="flex-1 space-y-8">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-80 aspect-video md:aspect-auto overflow-hidden relative">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-4 left-4">{pkg.country}</Badge>
                  </div>
                  <div className="flex-1 p-6 md:p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-heading text-xl font-bold text-foreground">{pkg.name}</h3>
                      <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        {pkg.rating}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-body flex-wrap">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.days} วัน {pkg.days - 1} คืน</span>
                      <span className="flex items-center gap-1"><Plane className="h-4 w-4" />{pkg.airline}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.highlights.length} จุดเด่น</span>
                    </div>

                    <div className="space-y-1">
                      {pkg.timeline.map((t, i) => (
                        <p key={i} className="font-body text-sm text-muted-foreground">• {t}</p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((h) => (
                        <Badge key={h} variant="secondary">{h}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <span className="font-body text-sm text-muted-foreground">จาก</span>
                        <span className="font-heading text-2xl font-bold text-primary ml-2">฿{pkg.price.toLocaleString()}</span>
                        <span className="font-body text-sm text-muted-foreground">/คน</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to="/itinerary">
                          <Button variant="outline" size="sm">ดูรายละเอียด</Button>
                        </Link>
                        <Link to="/itinerary">
                          <Button variant="hero" size="sm">
                            เลือกแพ็คเกจนี้
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
