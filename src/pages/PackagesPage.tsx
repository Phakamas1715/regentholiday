import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Star, Clock, MapPin, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import chiangmaiImg from "@/assets/destination-chiangmai.jpg";
import krabiImg from "@/assets/destination-krabi.jpg";
import phuketImg from "@/assets/destination-phuket.jpg";

const packages = [
  {
    id: 1,
    name: "เชียงใหม่ วัฒนธรรมล้านนา",
    image: chiangmaiImg,
    days: 4,
    price: 12500,
    rating: 4.9,
    highlights: ["ดอยสุเทพ", "ย่านเมืองเก่า", "อุทยานแห่งชาติดอยอินทนนท์"],
    timeline: ["Day 1: เดินทาง + วัดพระธาตุดอยสุเทพ", "Day 2: Old City Tour + Night Bazaar", "Day 3: ดอยอินทนนท์ Full Day", "Day 4: อิสระ + กลับ"],
    style: "วัฒนธรรม",
  },
  {
    id: 2,
    name: "กระบี่ ทะเลหมอก สวรรค์ทะเลใต้",
    image: krabiImg,
    days: 3,
    price: 15800,
    rating: 4.8,
    highlights: ["เกาะพีพี", "อ่าวไร่เลย์", "สระมรกต"],
    timeline: ["Day 1: เดินทาง + หาดอ่าวนาง", "Day 2: ทัวร์ 4 เกาะ", "Day 3: สระมรกต + กลับ"],
    style: "ธรรมชาติ",
  },
  {
    id: 3,
    name: "ภูเก็ต Premium Getaway",
    image: phuketImg,
    days: 5,
    price: 22900,
    rating: 4.7,
    highlights: ["หาดป่าตอง", "เมืองเก่าภูเก็ต", "เกาะเฮ"],
    timeline: ["Day 1: เดินทาง + Check-in Pool Villa", "Day 2: เกาะเฮ + ดำน้ำ", "Day 3: เมืองเก่า + Street Food", "Day 4: สปา + อิสระ", "Day 5: กลับ"],
    style: "พักผ่อน",
  },
];

export default function PackagesPage() {
  const [priceRange, setPriceRange] = useState([30000]);
  const [duration, setDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = packages.filter(
    (p) => p.price <= priceRange[0] && (!duration || (duration === "3" ? p.days <= 3 : duration === "5" ? p.days <= 5 : true))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge className="mb-3">AI Recommended</Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              แพ็คเกจที่ AI แนะนำสำหรับคุณ
            </h1>
            <p className="font-body text-muted-foreground text-lg">จากข้อมูลที่คุณกรอก เราเลือก 3 แพ็คเกจที่เหมาะที่สุด</p>
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
                  <Slider value={priceRange} onValueChange={setPriceRange} min={10000} max={50000} step={5000} />
                  <p className="text-right text-sm font-semibold text-primary">฿{priceRange[0].toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm text-muted-foreground">ระยะเวลา</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger><SelectValue placeholder="ทั้งหมด" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="3">1-3 วัน</SelectItem>
                      <SelectItem value="5">4-5 วัน</SelectItem>
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
                    <Badge className="absolute top-4 left-4">{pkg.style}</Badge>
                  </div>
                  <div className="flex-1 p-6 md:p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-heading text-xl font-bold text-foreground">{pkg.name}</h3>
                      <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        {pkg.rating}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.days} วัน {pkg.days - 1} คืน</span>
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
