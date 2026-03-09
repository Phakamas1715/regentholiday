import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { CalendarIcon, Minus, Plus, Sparkles, Users, Wallet, Heart } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";

const destinations = [
  "เซี่ยงไฮ้ (จีน)", "ปักกิ่ง (จีน)", "โตเกียว (ญี่ปุ่น)", "โอซาก้า (ญี่ปุ่น)",
  "โซล (เกาหลีใต้)", "ไทเป (ไต้หวัน)", "ฮานอย (เวียดนาม)", "สิงคโปร์",
  "ฮ่องกง", "ลอนดอน (อังกฤษ)", "ปารีส (ฝรั่งเศส)", "โรม (อิตาลี)",
];

const tripStyles = ["ผจญภัย", "พักผ่อน", "วัฒนธรรม", "ธรรมชาติ", "อาหาร", "ถ่ายรูป"];
const hotelLevels = ["ประหยัด", "สแตนดาร์ด", "พรีเมี่ยม", "ลักชัวรี่"];
const transports = ["เครื่องบิน", "เครื่องบิน + รถไฟ", "เครื่องบิน + รถบัส"];
const mealPrefs = ["ทุกมื้อ", "เช้า-เย็น", "เช้าเท่านั้น", "ไม่รวมอาหาร"];

export default function BookingPage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState([40000]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [hotelLevel, setHotelLevel] = useState("");
  const [transport, setTransport] = useState("");
  const [meal, setMeal] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const toggleStyle = (s: string) =>
    setSelectedStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = () => navigate("/packages");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
        {/* Left image panel */}
        <div className="hidden lg:block lg:w-2/5 relative">
          <img src={heroImage} alt="ทัวร์ต่างประเทศ" className="w-full h-full object-cover sticky top-0" />
          <div className="absolute inset-0 bg-gradient-hero opacity-40" />
          <div className="absolute bottom-12 left-8 right-8 z-10">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-2">
              บอกเราเกี่ยวกับทริปในฝัน
            </h2>
            <p className="font-body text-primary-foreground/80 text-lg">
              กรอกข้อมูลแล้วให้เราจัดโปรแกรมทัวร์ต่างประเทศให้คุณ
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto max-h-screen">
          <div className="max-w-xl mx-auto space-y-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">จองทัวร์ต่างประเทศ</h1>
              <p className="font-body text-muted-foreground">กรอกรายละเอียดเพื่อให้เราออกแบบทริปที่เหมาะกับคุณ</p>
            </div>

            {/* Destination */}
            <div className="space-y-3">
              <Label className="font-heading font-semibold text-foreground">ปลายทาง</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger><SelectValue placeholder="เลือกจุดหมายปลายทาง" /></SelectTrigger>
                <SelectContent>
                  {destinations.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {["เซี่ยงไฮ้ (จีน)", "โตเกียว (ญี่ปุ่น)", "โซล (เกาหลีใต้)", "ปารีส (ฝรั่งเศส)"].map((d) => (
                  <Badge
                    key={d}
                    variant={destination === d ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => setDestination(d)}
                  >
                    {d}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-heading font-semibold">วันเดินทาง</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "d MMM yyyy", { locale: th }) : "เลือกวัน"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="font-heading font-semibold">วันกลับ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "d MMM yyyy", { locale: th }) : "เลือกวัน"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <Label className="font-heading font-semibold">จำนวนผู้เดินทาง</Label>
              <div className="flex items-center gap-4 bg-card rounded-xl border border-border p-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 rounded-full">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-heading text-2xl font-bold text-foreground w-12 text-center">{travelers}</span>
                <Button variant="outline" size="icon" onClick={() => setTravelers(Math.min(20, travelers + 1))} className="h-10 w-10 rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="font-body text-muted-foreground">คน</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <Label className="font-heading font-semibold flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                งบประมาณ
              </Label>
              <Slider value={budget} onValueChange={setBudget} min={15000} max={200000} step={5000} className="mt-2" />
              <div className="flex justify-between font-body text-sm text-muted-foreground">
                <span>฿15,000</span>
                <span className="text-primary font-semibold text-lg">฿{budget[0].toLocaleString()}</span>
                <span>฿200,000</span>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <Label className="font-heading font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4" />
                สไตล์การเดินทาง
              </Label>
              <div className="flex flex-wrap gap-2">
                {tripStyles.map((s) => (
                  <Badge
                    key={s}
                    variant={selectedStyles.includes(s) ? "default" : "outline"}
                    className="cursor-pointer transition-all text-sm px-4 py-2"
                    onClick={() => toggleStyle(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">ระดับที่พัก</Label>
                <Select value={hotelLevel} onValueChange={setHotelLevel}>
                  <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                  <SelectContent>
                    {hotelLevels.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">การเดินทาง</Label>
                <Select value={transport} onValueChange={setTransport}>
                  <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                  <SelectContent>
                    {transports.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">อาหาร</Label>
                <Select value={meal} onValueChange={setMeal}>
                  <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                  <SelectContent>
                    {mealPrefs.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label className="font-heading font-semibold">คำขอพิเศษ</Label>
              <Textarea
                placeholder="เช่น ต้องการห้องพักวิวเมือง, มีเด็กเล็กร่วมเดินทาง, ต้องการอาหารฮาลาล..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit */}
            <Button variant="hero" size="lg" className="w-full text-lg py-6" onClick={handleSubmit}>
              <Sparkles className="mr-2 h-5 w-5" />
              ค้นหาแพ็คเกจทัวร์
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
