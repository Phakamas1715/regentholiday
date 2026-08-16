import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Download, Home, Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import logoImg from "@/assets/logo-regent.png";

interface BookingState {
  bookingCode: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  orgName?: string | null;
  destination: string;
  travelers: number;
  budget: number;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="font-body text-muted-foreground">{label}</span>
      <span className="font-body font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

export default function BookingConfirmationPage() {
  const navigate = useNavigate();
  const state = (useLocation().state ?? null) as BookingState | null;

  const formatDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" }) : "-";

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 max-w-md mx-auto px-4 text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">ไม่พบข้อมูลการจอง</h1>
          <p className="font-body text-muted-foreground">
            กรุณาส่งคำขอใบเสนอราคาใหม่อีกครั้ง หรือติดต่อทีมงานผ่าน LINE
          </p>
          <Button onClick={() => navigate("/booking")} className="rounded-full">
            ไปหน้าขอใบเสนอราคา
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(state.bookingCode);
    toast.success("คัดลอกรหัสการจองแล้ว");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="pt-24 print:pt-0 pb-16 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2 print:hidden">
            <CheckCircle2 className="h-16 w-16 mx-auto text-success" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              ส่งคำขอเรียบร้อยแล้ว
            </h1>
            <p className="font-body text-muted-foreground">
              ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง กรุณาเก็บรหัสการจองไว้อ้างอิง
            </p>
          </div>

          {/* Printable confirmation card */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card print:shadow-none print:border-0">
            <div className="flex items-center justify-between gap-4 mb-6">
              <img src={logoImg} alt="Regent Holiday" className="h-12 w-auto" />
              <div className="text-right">
                <p className="font-heading text-lg font-bold text-foreground">ใบยืนยันการจอง</p>
                <p className="font-body text-sm text-muted-foreground">Booking Confirmation</p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 mb-6 text-center">
              <p className="font-body text-sm text-muted-foreground mb-1">รหัสการจอง (Booking ID)</p>
              <p className="font-heading text-2xl font-bold text-primary tracking-wider">
                {state.bookingCode}
              </p>
              <button
                type="button"
                onClick={copyCode}
                className="print:hidden mt-2 inline-flex items-center gap-1.5 text-sm font-body text-primary hover:underline"
              >
                <Copy className="h-4 w-4" /> คัดลอกรหัส
              </button>
            </div>

            <div className="space-y-0">
              <Row label="วันที่ส่งคำขอ" value={formatDate(state.createdAt)} />
              <Row label="ชื่อผู้ติดต่อ" value={state.contactName} />
              <Row label="เบอร์โทร" value={state.contactPhone} />
              {state.contactEmail ? <Row label="อีเมล" value={state.contactEmail} /> : null}
              {state.orgName ? <Row label="หน่วยงาน/องค์กร" value={state.orgName} /> : null}
              <Row label="ปลายทาง" value={state.destination} />
              <Row label="จำนวนผู้เดินทาง" value={`${state.travelers} คน`} />
              <Row label="งบประมาณต่อคน" value={`฿${state.budget.toLocaleString("th-TH")}`} />
              <Row label="วันเดินทาง" value={`${formatDate(state.startDate)} - ${formatDate(state.endDate)}`} />
            </div>

            <div className="mt-6 pt-4 border-t border-border font-body text-sm text-muted-foreground space-y-1">
              <p>เอกสารนี้เป็นการยืนยันการรับคำขอใบเสนอราคา ยังไม่ถือเป็นการยืนยันการเดินทาง</p>
              <p>สอบถามเพิ่มเติม LINE: @ugm3067r | Regent Holiday</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            <Button onClick={() => window.print()} className="flex-1 rounded-full h-12 text-base">
              <Download className="mr-2 h-5 w-5" /> ดาวน์โหลด PDF
            </Button>
            <Button variant="outline" asChild className="flex-1 rounded-full h-12 text-base">
              <a href="https://line.me/R/ti/p/@ugm3067r" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> สอบถามทาง LINE
              </a>
            </Button>
            <Button variant="ghost" asChild className="rounded-full h-12 text-base">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" /> กลับหน้าแรก
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
