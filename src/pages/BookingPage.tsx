import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { CalendarIcon, Minus, Plus, Users, Wallet, Building2, GraduationCap, Send, Loader2, UserRound, UsersRound } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/hero-travel.jpg";

const destinations = [
  "เซี่ยงไฮ้ (จีน)", "ปักกิ่ง (จีน)", "กวางโจว (จีน)", "โตเกียว (ญี่ปุ่น)", "โอซาก้า (ญี่ปุ่น)",
  "โซล (เกาหลีใต้)", "ไทเป (ไต้หวัน)", "ฮานอย (เวียดนาม)", "สิงคโปร์",
  "ฮ่องกง", "ลอนดอน (อังกฤษ)", "ปารีส (ฝรั่งเศส)", "โรม (อิตาลี)",
];

const orgTypes = [
  { value: "government", label: "หน่วยงานราชการ", icon: Building2 },
  { value: "corporate", label: "บริษัทเอกชน", icon: Building2 },
  { value: "education", label: "สถาบันการศึกษา", icon: GraduationCap },
  { value: "association", label: "สมาคม/ชมรม", icon: Users },
];

const studyTopicOptions = [
  "เทคโนโลยี/นวัตกรรม", "การศึกษา", "สาธารณสุข/การแพทย์", "เกษตรกรรม",
  "อุตสาหกรรม/การผลิต", "การท่องเที่ยว/บริการ", "พลังงาน/สิ่งแวดล้อม", "การปกครอง/บริหาร",
];

const accommodationLevels = ["ประหยัด (3 ดาว)", "สแตนดาร์ด (4 ดาว)", "พรีเมี่ยม (5 ดาว)"];
const mealPrefs = ["ทุกมื้อ", "เช้า-เย็น", "เช้าเท่านั้น", "ไม่แน่ใจ"];

const tripTypes = [
  { value: "group", label: "กรุ๊ปทัวร์", icon: UsersRound, desc: "จัดกรุ๊ปส่วนตัว" },
  { value: "solo", label: "ทริปเดี่ยว", icon: UserRound, desc: "เดินทางคนเดียว" },
  { value: "join", label: "จอยทริป", icon: Users, desc: "ร่วมกรุ๊ปที่เปิดรับ" },
];

export default function BookingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLineId, setContactLineId] = useState("");

  // Organization
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");

  // Trip
  const [tripType, setTripType] = useState("group");
  const [destination, setDestination] = useState("");
  const [customDestination, setCustomDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState(30);
  const [budget, setBudget] = useState([25000]);

  // Study
  const [studyObjectives, setStudyObjectives] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [preferredVisits, setPreferredVisits] = useState("");

  // Preferences
  const [accommodation, setAccommodation] = useState("");
  const [meal, setMeal] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);

  const toggleTopic = (t: string) =>
    setSelectedTopics((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleSubmit = async () => {
    const finalDestination = destination === "__other__" ? customDestination : destination;
    if (!contactName || !contactPhone || !orgName || !finalDestination) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, เบอร์โทร, องค์กร, ปลายทาง)");
      return;
    }
    if (!pdpaConsent) {
      toast.error("กรุณายินยอมนโยบายความเป็นส่วนตัว (PDPA) ก่อนส่งข้อมูล");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        contact_name: contactName,
        contact_phone: contactPhone,
        contact_email: contactEmail || null,
        contact_line_id: contactLineId || null,
        org_name: orgName,
        org_type: (orgType || "other") as any,
        destination: finalDestination,
        transport_preference: tripType,
        travel_date_start: startDate ? format(startDate, "yyyy-MM-dd") : null,
        travel_date_end: endDate ? format(endDate, "yyyy-MM-dd") : null,
        num_travelers: travelers,
        budget_per_person: budget[0],
        study_objectives: studyObjectives || null,
        study_topics: selectedTopics.length > 0 ? selectedTopics : null,
        preferred_visits: preferredVisits || null,
        accommodation_level: accommodation || null,
        meal_preference: meal || null,
        special_requests: specialRequest || null,
      });

      if (error) throw error;

      toast.success("ส่งคำขอใบเสนอราคาเรียบร้อยแล้ว! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง");
      navigate("/packages");
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              ขอใบเสนอราคาทัวร์กรุ๊ป
            </h2>
            <p className="font-body text-primary-foreground/80 text-lg">
              ศึกษาดูงานต่างประเทศ จัดได้ตามความต้องการ
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto max-h-screen">
          <div className="max-w-xl mx-auto space-y-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">ขอใบเสนอราคา</h1>
              <p className="font-body text-muted-foreground">กรอกข้อมูลคณะของท่าน ทีมงานจะจัดโปรแกรมและเสนอราคาภายใน 24 ชม.</p>
            </div>

            {/* === Section: Contact Info === */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">📞 ข้อมูลผู้ติดต่อ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">ชื่อ-สกุล *</Label>
                  <Input placeholder="ชื่อผู้ประสานงาน" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">เบอร์โทรศัพท์ *</Label>
                  <Input placeholder="08x-xxx-xxxx" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">อีเมล</Label>
                  <Input type="email" placeholder="email@org.go.th" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">LINE ID</Label>
                  <Input placeholder="@lineid" value={contactLineId} onChange={(e) => setContactLineId(e.target.value)} />
                </div>
              </div>
            </div>

            {/* === Section: Organization (group only) === */}
            {tripType === "group" && (
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">🏢 ข้อมูลองค์กร</h3>
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">ชื่อหน่วยงาน/องค์กร *</Label>
                <Input placeholder="ชื่อหน่วยงาน" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">ประเภทองค์กร</Label>
                <div className="grid grid-cols-2 gap-2">
                  {orgTypes.map((o) => (
                    <Badge
                      key={o.value}
                      variant={orgType === o.value ? "default" : "outline"}
                      className="cursor-pointer transition-all text-sm px-4 py-3 justify-center"
                      onClick={() => setOrgType(o.value)}
                    >
                      <o.icon className="h-4 w-4 mr-1" />
                      {o.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* === Section: Trip Details === */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">✈️ รายละเอียดทริป</h3>

              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">ประเภททริป *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {tripTypes.map((t) => (
                    <div
                      key={t.value}
                      onClick={() => setTripType(t.value)}
                      className={cn(
                        "cursor-pointer rounded-xl border-2 p-3 text-center transition-all",
                        tripType === t.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <t.icon className={cn("h-5 w-5 mx-auto mb-1", tripType === t.value ? "text-primary" : "text-muted-foreground")} />
                      <p className="font-heading text-sm font-semibold">{t.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">ปลายทาง *</Label>
                <Select value={destination} onValueChange={(val) => { setDestination(val); if (val !== "__other__") setCustomDestination(""); }}>
                  <SelectTrigger><SelectValue placeholder="เลือกจุดหมายปลายทาง" /></SelectTrigger>
                  <SelectContent>
                    {destinations.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                    <SelectItem value="__other__">อื่นๆ (ระบุเอง)</SelectItem>
                  </SelectContent>
                </Select>
                {destination === "__other__" && (
                  <Input
                    placeholder="พิมพ์ปลายทางที่ต้องการ"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="mt-2"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {["เซี่ยงไฮ้ (จีน)", "โตเกียว (ญี่ปุ่น)", "โซล (เกาหลีใต้)"].map((d) => (
                    <Badge
                      key={d}
                      variant={destination === d ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => { setDestination(d); setCustomDestination(""); }}
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">วันเดินทาง</Label>
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
                  <Label className="font-heading font-semibold text-sm">วันกลับ</Label>
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

              {/* Travelers (group only) */}
              {tripType === "group" && (
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">จำนวนผู้เดินทาง (คน)</Label>
                <div className="flex items-center gap-4 bg-card rounded-xl border border-border p-4">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(10, travelers - 5))} className="h-10 w-10 rounded-full">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-heading text-2xl font-bold text-foreground w-16 text-center">{travelers}</span>
                  <Button variant="outline" size="icon" onClick={() => setTravelers(Math.min(200, travelers + 5))} className="h-10 w-10 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="font-body text-muted-foreground">คน</span>
                </div>
              </div>
              )}

              {/* Budget */}
              <div className="space-y-3">
                <Label className="font-heading font-semibold text-sm flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> งบประมาณต่อคน
                </Label>
                <Slider value={budget} onValueChange={setBudget} min={15000} max={100000} step={5000} />
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>฿15,000</span>
                  <span className="text-primary font-semibold text-lg">฿{budget[0].toLocaleString()}</span>
                  <span>฿100,000</span>
                </div>
              </div>
            </div>

            {/* === Section: Study Objectives === */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">📚 วัตถุประสงค์ศึกษาดูงาน</h3>

              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">วัตถุประสงค์หลัก</Label>
                <Textarea
                  placeholder="เช่น ศึกษาดูงานด้านเทคโนโลยีการศึกษา, ดูงานด้านสาธารณสุข..."
                  value={studyObjectives}
                  onChange={(e) => setStudyObjectives(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">หัวข้อที่สนใจ</Label>
                <div className="flex flex-wrap gap-2">
                  {studyTopicOptions.map((t) => (
                    <Badge
                      key={t}
                      variant={selectedTopics.includes(t) ? "default" : "outline"}
                      className="cursor-pointer transition-all text-sm px-3 py-2"
                      onClick={() => toggleTopic(t)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">สถานที่ที่ต้องการไปดูงาน (ถ้ามี)</Label>
                <Textarea
                  placeholder="เช่น มหาวิทยาลัยโตเกียว, โรงพยาบาลแห่งชาติเกาหลี, นิคมอุตสาหกรรม..."
                  value={preferredVisits}
                  onChange={(e) => setPreferredVisits(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* === Section: Preferences (optional) === */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">⚙️ ความต้องการเพิ่มเติม <span className="font-body text-xs text-muted-foreground font-normal">(ไม่บังคับ)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-heading font-semibold text-sm">ระดับที่พัก</Label>
                  <Select value={accommodation} onValueChange={setAccommodation}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                      {accommodationLevels.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
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
              <div className="space-y-2">
                <Label className="font-heading font-semibold text-sm">คำขอพิเศษ</Label>
                <Textarea
                  placeholder="เช่น ต้องการล่ามภาษาจีน, มีผู้สูงอายุร่วมคณะ, ต้องการใบเสนอราคาภายในวันที่..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* PDPA Consent */}
            <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
              <Checkbox
                id="pdpa"
                checked={pdpaConsent}
                onCheckedChange={(checked) => setPdpaConsent(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="pdpa" className="font-body text-sm text-muted-foreground leading-relaxed cursor-pointer">
                ข้าพเจ้ายินยอมให้ บริษัท รีเจ้นท์ ฮอลิเดย์ จำกัด เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า
                เพื่อวัตถุประสงค์ในการจัดทำใบเสนอราคา ติดต่อประสานงาน และให้บริการนำเที่ยว
                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) <span className="text-destructive">*</span>
              </label>
            </div>

            {/* Submit */}
            <Button variant="hero" size="lg" className="w-full text-lg py-6" onClick={handleSubmit} disabled={isSubmitting || !pdpaConsent}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isSubmitting ? "กำลังส่ง..." : "ส่งคำขอใบเสนอราคา"}
            </Button>

            <p className="text-center font-body text-xs text-muted-foreground">
              ทีมงาน Regent Holiday จะติดต่อกลับภายใน 24 ชั่วโมง ทางโทรศัพท์หรือ LINE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
