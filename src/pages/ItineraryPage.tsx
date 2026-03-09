import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import {
  Check, X, MapPin, Clock, Camera, Utensils,
  Plane, Hotel, Sun, Moon, ArrowRight,
} from "lucide-react";
import chiangmaiImg from "@/assets/destination-chiangmai.jpg";

const itinerary = [
  {
    day: 1,
    title: "เดินทาง + วัดพระธาตุดอยสุเทพ",
    activities: [
      { time: "08:00", icon: Plane, label: "เดินทางถึงเชียงใหม่" },
      { time: "10:30", icon: Hotel, label: "Check-in โรงแรม" },
      { time: "13:00", icon: Utensils, label: "อาหารกลางวัน ข้าวซอยไก่" },
      { time: "15:00", icon: Camera, label: "วัดพระธาตุดอยสุเทพ" },
      { time: "18:00", icon: Moon, label: "Night Bazaar + อาหารเย็น" },
    ],
  },
  {
    day: 2,
    title: "Old City Tour + วัดเมืองเก่า",
    activities: [
      { time: "07:30", icon: Sun, label: "อาหารเช้าที่โรงแรม" },
      { time: "09:00", icon: MapPin, label: "วัดเจดีย์หลวง" },
      { time: "11:00", icon: MapPin, label: "วัดพระสิงห์" },
      { time: "12:30", icon: Utensils, label: "ข้าวแกงแหนม" },
      { time: "14:00", icon: Camera, label: "ย่านนิมมาน + คาเฟ่" },
      { time: "19:00", icon: Moon, label: "ขันโตก ดินเนอร์" },
    ],
  },
  {
    day: 3,
    title: "ดอยอินทนนท์ Full Day",
    activities: [
      { time: "06:00", icon: Sun, label: "ออกเดินทางสู่ดอยอินทนนท์" },
      { time: "08:30", icon: MapPin, label: "จุดสูงสุดของประเทศไทย" },
      { time: "10:00", icon: Camera, label: "พระมหาธาตุเจดีย์" },
      { time: "12:00", icon: Utensils, label: "อาหารกลางวัน" },
      { time: "14:00", icon: MapPin, label: "น้ำตกวชิรธาร" },
      { time: "18:00", icon: Moon, label: "กลับเชียงใหม่ + อิสระ" },
    ],
  },
  {
    day: 4,
    title: "อิสระ + เดินทางกลับ",
    activities: [
      { time: "08:00", icon: Sun, label: "อาหารเช้า" },
      { time: "10:00", icon: Camera, label: "ซื้อของฝาก ตลาดวโรรส" },
      { time: "12:00", icon: Hotel, label: "Check-out" },
      { time: "14:30", icon: Plane, label: "เดินทางกลับ" },
    ],
  },
];

const included = ["ตั๋วเครื่องบิน ไป-กลับ", "ที่พัก 3 คืน (4 ดาว)", "อาหาร 8 มื้อ", "รถรับส่งทุกจุด", "ค่าเข้าชมสถานที่", "ไกด์ท้องถิ่น"];
const excluded = ["ค่าใช้จ่ายส่วนตัว", "ประกันการเดินทาง", "ทิปไกด์/คนขับ"];

const steps = [
  { label: "เลือกแพ็คเกจ", done: true },
  { label: "ตรวจสอบรายละเอียด", active: true },
  { label: "ชำระเงิน", done: false },
];

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-heading ${
                  s.done ? "bg-success text-success-foreground" : s.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {s.done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`font-body text-sm ${s.active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{s.label}</span>
                {i < steps.length - 1 && <div className="w-12 h-px bg-border" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Timeline */}
            <div className="flex-1 space-y-6">
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img src={chiangmaiImg} alt="เชียงใหม่" className="w-full h-48 md:h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
                    เชียงใหม่ วัฒนธรรมล้านนา
                  </h1>
                  <p className="font-body text-primary-foreground/80">4 วัน 3 คืน</p>
                </div>
              </div>

              {itinerary.map((day) => (
                <div key={day.day} className="bg-card rounded-2xl border border-border p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    <Badge className="mr-2">Day {day.day}</Badge>
                    {day.title}
                  </h3>
                  <div className="space-y-3 ml-2 border-l-2 border-primary/20 pl-6">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <div className="absolute -left-[33px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                        <span className="font-body text-sm text-muted-foreground w-12 shrink-0">{act.time}</span>
                        <act.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="font-body text-foreground">{act.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Included / Excluded */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">✅ รวมในแพ็คเกจ</h4>
                  <ul className="space-y-2">
                    {included.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                        <Check className="h-4 w-4 text-success" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">❌ ไม่รวม</h4>
                  <ul className="space-y-2">
                    {excluded.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-destructive" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="lg:w-80 shrink-0">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card sticky top-24 space-y-5">
                <h3 className="font-heading text-lg font-bold text-foreground">สรุปการจอง</h3>

                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">แพ็คเกจ</span><span className="text-foreground font-medium">เชียงใหม่ ล้านนา</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ระยะเวลา</span><span className="text-foreground">4 วัน 3 คืน</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ผู้เดินทาง</span><span className="text-foreground">2 คน</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ที่พัก</span><span className="text-foreground">โรงแรม 4 ดาว</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">การเดินทาง</span><span className="text-foreground">เครื่องบิน</span></div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">ราคา/คน</span>
                    <span className="text-foreground">฿12,500</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">2 คน</span>
                    <span className="text-foreground">฿25,000</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-lg pt-2 border-t border-border">
                    <span className="text-foreground">รวมทั้งหมด</span>
                    <span className="text-primary">฿25,000</span>
                  </div>
                </div>

                <Button variant="success" size="lg" className="w-full text-lg py-6">
                  ยืนยันการจอง
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center font-body text-xs text-muted-foreground">
                  ไม่มีค่าใช้จ่ายจนกว่าจะยืนยัน
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
