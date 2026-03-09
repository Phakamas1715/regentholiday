import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard, Users, FileText, CalendarCheck, BarChart3,
  Settings, Search, Plus, Download, Upload, Bell, ChevronDown,
  TrendingUp, DollarSign, UserPlus, Award, MoreHorizontal,
  MapPin, Clock, LogOut, Menu, X,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: UserPlus, label: "Leads", badge: "24" },
  { icon: FileText, label: "Quotations" },
  { icon: CalendarCheck, label: "Bookings" },
  { icon: Users, label: "Customers" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings" },
];

const kpis = [
  { label: "New Leads", value: "24", change: "+8 วันนี้", icon: UserPlus, color: "bg-amber-100 text-amber-700" },
  { label: "Proposals Sent", value: "18", change: "+3 สัปดาห์นี้", icon: FileText, color: "bg-blue-100 text-blue-700" },
  { label: "Won Deals", value: "12", change: "+2 เดือนนี้", icon: Award, color: "bg-emerald-100 text-emerald-700" },
  { label: "Revenue", value: "฿340K", change: "+18%", icon: DollarSign, color: "bg-violet-100 text-violet-700" },
];

const leads = [
  { id: "L-001", name: "สมชาย ใจดี", initials: "สช", dest: "ภูเก็ต", date: "15 เม.ย.", pax: 4, budget: "฿60K", status: "New", statusColor: "bg-amber-100 text-amber-800", agent: "พิมพ์" },
  { id: "L-002", name: "วิไล สุขสม", initials: "วล", dest: "เชียงใหม่", date: "22 เม.ย.", pax: 2, budget: "฿30K", status: "Contacted", statusColor: "bg-blue-100 text-blue-800", agent: "ณัฐ" },
  { id: "L-003", name: "ธนา วงศ์ประเสริฐ", initials: "ธน", dest: "กระบี่", date: "1 พ.ค.", pax: 6, budget: "฿120K", status: "Proposal", statusColor: "bg-violet-100 text-violet-800", agent: "พิมพ์" },
  { id: "L-004", name: "อรุณ แสงทอง", initials: "อร", dest: "เกาะสมุย", date: "10 พ.ค.", pax: 2, budget: "฿45K", status: "Negotiation", statusColor: "bg-orange-100 text-orange-800", agent: "สมศรี" },
  { id: "L-005", name: "ปิยะ ธรรมรัตน์", initials: "ปย", dest: "น่าน", date: "18 พ.ค.", pax: 3, budget: "฿25K", status: "Won", statusColor: "bg-emerald-100 text-emerald-800", agent: "ณัฐ" },
  { id: "L-006", name: "จิราภรณ์ ศรีสวัสดิ์", initials: "จร", dest: "พัทยา", date: "5 เม.ย.", pax: 8, budget: "฿80K", status: "Lost", statusColor: "bg-red-100 text-red-800", agent: "สมศรี" },
];

const recentActivity = [
  { text: "พิมพ์ ส่ง Proposal ให้ ธนา", time: "5 นาทีก่อน", type: "proposal" },
  { text: "ณัฐ ปิดดีล ปิยะ สำเร็จ", time: "1 ชม. ก่อน", type: "won" },
  { text: "Lead ใหม่จาก Facebook Ads", time: "2 ชม. ก่อน", type: "new" },
  { text: "อรุณ ตอบกลับ — ต้องการส่วนลด", time: "3 ชม. ก่อน", type: "reply" },
  { text: "สมศรี เพิ่มโน้ตใน L-006", time: "5 ชม. ก่อน", type: "note" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleLead = (id: string) =>
    setSelectedLeads((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filteredLeads = statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-secondary-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            TripAI Admin
          </Link>
          <button className="lg:hidden text-secondary-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.path || "#"}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-secondary-foreground/70 hover:bg-sidebar-accent/50 hover:text-secondary-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body text-secondary-foreground/70 hover:bg-sidebar-accent/50">
            <LogOut className="h-5 w-5" />
            กลับหน้าเว็บ
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="font-heading text-xl font-bold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ค้นหา..." className="pl-10 w-64" />
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col xl:flex-row">
            {/* Center content */}
            <div className="flex-1 p-6 space-y-6 min-w-0">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-background rounded-xl border border-border p-5 shadow-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-sm text-muted-foreground">{kpi.label}</span>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.color}`}>
                        <kpi.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="font-heading text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="font-body text-xs text-success flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />{kpi.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Filter Bar */}
              <div className="bg-background rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Won">Won</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="ค้นหา lead..." className="pl-10" />
                  </div>
                  {selectedLeads.length > 0 && (
                    <Badge variant="secondary">{selectedLeads.length} selected</Badge>
                  )}
                </div>
              </div>

              {/* Lead Table */}
              <div className="bg-background rounded-xl border border-border overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="p-4 text-left w-10">
                          <Checkbox />
                        </th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lead</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">ปลายทาง</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">วันเดินทาง</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">PAX</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">งบ</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="p-4 text-left font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Agent</th>
                        <th className="p-4 text-left w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onCheckedChange={() => toggleLead(lead.id)}
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">{lead.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-body text-sm font-medium text-foreground">{lead.name}</p>
                                <p className="font-body text-xs text-muted-foreground">{lead.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-body text-sm text-foreground flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-primary" />{lead.dest}
                            </span>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <span className="font-body text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />{lead.date}
                            </span>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
                            <span className="font-body text-sm text-foreground">{lead.pax} คน</span>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <span className="font-body text-sm font-medium text-foreground">{lead.budget}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold font-body ${lead.statusColor}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
                            <span className="font-body text-sm text-muted-foreground">{lead.agent}</span>
                          </td>
                          <td className="p-4">
                            <button className="p-1 text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="xl:w-72 shrink-0 p-6 xl:border-l border-border space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-semibold text-foreground">Quick Actions</h3>
                <Button variant="hero" className="w-full justify-start gap-2" size="sm">
                  <Plus className="h-4 w-4" /> สร้าง Lead ใหม่
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Upload className="h-4 w-4" /> Import Leads
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Download className="h-4 w-4" /> Export Report
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading text-sm font-semibold text-foreground">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-body text-sm text-foreground">{act.text}</p>
                        <p className="font-body text-xs text-muted-foreground">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
