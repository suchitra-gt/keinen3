import { useState, useEffect, useRef } from "react";
 
const COLORS = {
  red: "#E8342A",
  redDark: "#B02820",
  redGlow: "rgba(232, 52, 42, 0.15)",
  bg: "#0A0A0A",
  bgCard: "#111111",
  border: "#1E1E1E",
  borderBright: "#2A2A2A",
  text: "#FFFFFF",
  textMuted: "#888888",
  textDim: "#444444",
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6",
};
 
const css = `
  @keyframes growBar { from { height: 0 !important; } }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.3); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #1E1E1E; border-radius: 2px; }
  body { background: #0A0A0A; overflow: hidden; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 13px; border-left: 2px solid transparent; color: #888888; }
  .nav-item:hover { background: #1E1E1E; color: #FFFFFF; }
  .nav-item.active { background: rgba(232,52,42,0.15); border-left: 2px solid #E8342A; color: #E8342A; font-weight: 600; }
  .metric-card { background: #111111; border: 1px solid #1E1E1E; border-radius: 10px; padding: 16px 18px; position: relative; overflow: hidden; transition: border-color 0.2s; }
  .metric-card:hover { border-color: #E8342A; }
  .stack-tag { padding: 6px 12px; border-radius: 6px; background: #1E1E1E; border: 1px solid #2A2A2A; font-size: 12px; color: #888888; cursor: default; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
  .stack-tag:hover { background: rgba(232,52,42,0.15); border-color: #E8342A; color: #FFFFFF; }
`;
 
/* ── AnimatedCounter ── */
function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
 
/* ── SparkLine ── */
function SparkLine({ data, color = COLORS.red }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const w = 110, h = 38;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 8) - 4}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity="0.1" />
    </svg>
  );
}
 
/* ── TechOrb (canvas) ── */
function TechOrb() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0, animId;
    const particles = Array.from({ length: 60 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 60 + Math.random() * 50,
      speed: 0.003 + Math.random() * 0.005,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    const animate = () => {
      ctx.clearRect(0, 0, 200, 200);
      const cx = 100, cy = 100;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      grad.addColorStop(0, "rgba(232,52,42,0.15)");
      grad.addColorStop(0.5, "rgba(232,52,42,0.05)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.fill();
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, i * 25, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,52,42,${0.15 - i * 0.03})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius * 0.6;
        const y = cy + Math.sin(p.angle) * p.radius * 0.35;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,52,42,${p.opacity * 0.8})`; ctx.fill();
      });
      const pulse = Math.sin(frame * 0.05) * 5;
      ctx.beginPath(); ctx.arc(cx, cy, 18 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(232,52,42,0.2)"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.red; ctx.fill();
      frame++; animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} width={200} height={200} style={{ display: "block" }} />;
}
 
/* ── GlitchText ── */
function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", color: COLORS.red, fontWeight: 700 }}>
      {text}
      {glitch && (
        <>
          <span style={{ position: "absolute", left: 2, top: 0, color: "#00ffff", opacity: 0.7, clipPath: "inset(0 0 60% 0)" }}>{text}</span>
          <span style={{ position: "absolute", left: -2, top: 0, color: "#ff00ff", opacity: 0.7, clipPath: "inset(60% 0 0 0)" }}>{text}</span>
        </>
      )}
    </span>
  );
}
 
/* ── BarChart ── */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <div style={{
            width: "100%", borderRadius: "3px 3px 0 0",
            height: `${(d.value / max) * 70}px`,
            background: d.highlight ? `linear-gradient(180deg,${COLORS.red},${COLORS.redDark})` : COLORS.border,
            transition: "height 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
          <span style={{ fontSize: 9, color: COLORS.textDim, marginTop: 3 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}
 
/* ── ActivityFeed ── */
function ActivityFeed({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const dotColor = item.type === "visit" ? COLORS.green : item.type === "alert" ? COLORS.red : item.type === "deploy" ? COLORS.blue : COLORS.amber;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flexShrink: 0, boxShadow: `0 0 6px ${dotColor}` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 1 }}>{item.time}</div>
            </div>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: COLORS.border, color: COLORS.textMuted, whiteSpace: "nowrap" }}>{item.tag}</span>
          </div>
        );
      })}
    </div>
  );
}
 
/* ── WorldMap ── */
function WorldMap() {
  const dots = [
    { x: 12, y: 42, label: "NA", value: "38%" },
    { x: 47, y: 38, label: "EU", value: "29%" },
    { x: 63, y: 55, label: "AS", value: "24%" },
    { x: 30, y: 62, label: "SA", value: "6%" },
    { x: 75, y: 68, label: "OC", value: "3%" },
  ];
  return (
    <div style={{ position: "relative", height: 130, background: COLORS.border, borderRadius: 8, overflow: "hidden" }}>
      <svg viewBox="0 0 100 70" style={{ width: "100%", height: "100%", opacity: 0.15 }}>
        <rect width="100" height="70" fill="#1a1a1a" />
        {[
          "M10,20 Q15,18 20,22 Q25,20 30,24 Q32,22 36,23 L36,35 Q30,36 25,33 Q20,35 15,32 Q10,34 8,30 Z",
          "M40,18 Q50,15 58,20 Q65,17 72,22 Q78,20 85,25 Q88,28 86,35 Q80,38 74,34 Q68,37 62,33 Q55,36 48,32 Q42,34 38,30 Z",
          "M12,45 Q18,43 24,47 Q28,45 32,50 Q29,56 22,54 Q16,56 11,51 Z",
          "M68,50 Q75,47 82,52 Q84,58 78,60 Q72,62 67,57 Z",
        ].map((d, i) => <path key={i} d={d} fill="#444" />)}
      </svg>
      {dots.map((d, i) => (
        <div key={i} style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%,-50%)", animation: `pulse 2s ease ${i * 0.4}s infinite` }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.red, opacity: 0.8, boxShadow: `0 0 8px ${COLORS.red}` }} />
          <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.85)", padding: "2px 5px", borderRadius: 3, fontSize: 9, color: COLORS.text, whiteSpace: "nowrap", border: `1px solid ${COLORS.border}` }}>
            {d.label} {d.value}
          </div>
        </div>
      ))}
    </div>
  );
}
 
/* ── Main Dashboard ── */
export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [liveVisitors, setLiveVisitors] = useState(247);
  const [activeNav, setActiveNav] = useState("Dashboard");
 
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    const v = setInterval(() => setLiveVisitors(p => Math.max(200, p + Math.floor(Math.random() * 5 - 2))), 3000);
    return () => { clearInterval(t); clearInterval(v); };
  }, []);
 
  const weekData = [
    { label: "M", value: 3200, highlight: false },
    { label: "T", value: 4100, highlight: false },
    { label: "W", value: 3800, highlight: false },
    { label: "T", value: 5200, highlight: false },
    { label: "F", value: 6100, highlight: true },
    { label: "S", value: 4700, highlight: false },
    { label: "S", value: 2900, highlight: false },
  ];
 
  const activityItems = [
    { type: "visit",  text: "Surge: 312 concurrent users on /solutions", time: "2 min ago",  tag: "Traffic"  },
    { type: "deploy", text: "v2.4.1 deployed to production cluster",      time: "14 min ago", tag: "Deploy"   },
    { type: "alert",  text: "OT gateway latency spike — Mumbai node",     time: "31 min ago", tag: "Alert"    },
    { type: "visit",  text: "New enterprise lead from Saudi Aramco",       time: "1h ago",     tag: "Lead"     },
    { type: "info",   text: "Security scan completed — 0 vulnerabilities", time: "2h ago",     tag: "Security" },
    { type: "deploy", text: "CDN cache purged across 14 edge nodes",       time: "3h ago",     tag: "Infra"    },
  ];
 
  const techStack = [
    { name: "React",      icon: "⚛",  status: "live" },
    { name: "Node.js",    icon: "🟢", status: "live" },
    { name: "PostgreSQL", icon: "🐘", status: "live" },
    { name: "Redis",      icon: "🔴", status: "live" },
    { name: "Docker",     icon: "🐳", status: "live" },
    { name: "AI Engine",  icon: "🤖", status: "beta" },
    { name: "OT Bridge",  icon: "🏭", status: "beta" },
    { name: "Zero Trust", icon: "🔐", status: "dev"  },
  ];
 
  const metrics = [
    { label: "Total Visitors",  value: 284921, suffix: "",  trend: "+12.4%", up: true,  spark: [80,95,88,110,105,132,128,145,139,162,155,178], color: COLORS.red   },
    { label: "Unique Visitors", value: 91345,  suffix: "",  trend: "+8.7%",  up: true,  spark: [40,52,47,61,58,74,69,82,78,91,87,98],          color: COLORS.blue  },
    { label: "Avg. Session",    value: "4:32",              trend: "+0:18",  up: true,  isStr: true,                                            color: COLORS.green },
    { label: "Bounce Rate",     value: 34,     suffix: "%", trend: "-2.1%", up: false,                                                         color: COLORS.amber },
  ];
 
  const topBarColors = [COLORS.red, COLORS.blue, COLORS.green, COLORS.amber];
 
  const navGroups = [
    { title: "Main",   items: [{ icon: "⬡", label: "Dashboard" }, { icon: "◈", label: "Analytics" }, { icon: "◉", label: "Visitors", badge: "Live" }, { icon: "▣", label: "Solutions" }, { icon: "◫", label: "Industries" }] },
    { title: "System", items: [{ icon: "⊕", label: "Deployments", badge: "2" }, { icon: "⊛", label: "Security" }, { icon: "⊞", label: "OT Gateway" }, { icon: "◎", label: "Settings" }] },
  ];
 
  const card = { background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 };
 
  return (
    <div style={{ display: "flex", height: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Courier New','SF Mono',monospace", overflow: "hidden" }}>
      <style>{css}</style>
 
      {/* ── Sidebar ── */}
      <div style={{ width: 220, background: COLORS.bgCard, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>KEINEN</div>
              <div style={{ fontSize: 9, color: COLORS.textDim, letterSpacing: 1.5 }}>BUILT ON FAITH</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "4px 8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6, fontSize: 10, color: COLORS.green, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, animation: "blink 1s infinite" }} />
            ADMIN · LIVE
          </div>
        </div>
 
        {/* Nav */}
        <div style={{ padding: "12px 8px", flex: 1 }}>
          {navGroups.map(group => (
            <div key={group.title}>
              <div style={{ fontSize: 9, color: COLORS.textDim, letterSpacing: 2, padding: "8px 16px", textTransform: "uppercase" }}>{group.title}</div>
              {group.items.map(item => (
                <div key={item.label} className={`nav-item${activeNav === item.label ? " active" : ""}`} onClick={() => setActiveNav(item.label)}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 999, background: COLORS.red, color: "#fff", fontWeight: 700 }}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
 
        {/* User */}
        <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.redGlow, border: `1px solid ${COLORS.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.red, fontWeight: 700 }}>SA</div>
          <div>
            <div style={{ fontSize: 12 }}>Sys Admin</div>
            <div style={{ fontSize: 10, color: COLORS.textDim }}>admin@keinen.io</div>
          </div>
        </div>
      </div>
 
      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
 
        {/* Topbar */}
        <div style={{ padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bgCard, flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>COMMAND CENTER</span>
            <span style={{ fontSize: 11, color: COLORS.textDim, marginLeft: 12 }}>
              {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>{time.toLocaleTimeString("en-US", { hour12: false })}</span>
            <button style={{ padding: "6px 14px", borderRadius: 6, background: COLORS.red, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1, border: "none" }}>
              TALK TO AN ARCHITECT →
            </button>
          </div>
        </div>
 
        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
 
          {/* Page header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Global Technology Architects</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Architecting <GlitchText text="Digital Ecosystems" /></div>
            </div>
            <div style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(232,52,42,0.08)", border: "1px solid rgba(232,52,42,0.3)", fontSize: 13, color: COLORS.red, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ animation: "blink 1.5s infinite" }}>●</span>
              <AnimatedCounter target={liveVisitors} duration={500} /> live now
            </div>
          </div>
 
          {/* Metric cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
            {metrics.map((m, i) => (
              <div key={i} className="metric-card">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: topBarColors[i] }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{m.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>
                      {m.isStr ? m.value : <AnimatedCounter target={m.value} suffix={m.suffix || ""} />}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 11, color: m.up ? COLORS.green : COLORS.red }}>{m.up ? "▲" : "▼"} {m.trend}</div>
                  </div>
                  {!m.isStr && <div style={{ opacity: 0.6, marginTop: 4 }}><SparkLine data={m.spark} color={m.color} /></div>}
                </div>
              </div>
            ))}
          </div>
 
          {/* Middle row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
 
            {/* Bar chart */}
            <div style={card}>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Weekly Traffic</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                <AnimatedCounter target={32148} /> <span style={{ fontSize: 11, color: COLORS.green }}>↑ this week</span>
              </div>
              <BarChart data={weekData} />
            </div>
 
            {/* Orb */}
            <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, alignSelf: "flex-start" }}>System Status</div>
              <div style={{ animation: "floatUp 3s ease-in-out infinite" }}><TechOrb /></div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center" }}>All systems <span style={{ color: COLORS.green }}>nominal</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12, width: "100%" }}>
                {[["IT","99.9%",COLORS.green],["OT","98.4%",COLORS.green],["SEC","100%",COLORS.green],["CDN","99.1%",COLORS.amber]].map(([k,v,c]) => (
                  <div key={k} style={{ background: COLORS.border, borderRadius: 6, padding: "6px 8px", fontSize: 11, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.textDim }}>{k}</span>
                    <span style={{ color: c, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
 
            {/* World map */}
            <div style={card}>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Global Reach</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}><AnimatedCounter target={47} /> countries</div>
              <WorldMap />
              <div style={{ marginTop: 10, fontSize: 11, color: COLORS.textDim }}>Top: N. America · Europe · Asia</div>
            </div>
          </div>
 
          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
 
            {/* Activity feed */}
            <div style={card}>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Activity Feed</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14 }}>Real-time system events</div>
              <ActivityFeed items={activityItems} />
            </div>
 
            {/* Tech stack + performance */}
            <div style={card}>
              <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Technology Stack</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14 }}>Live infrastructure overview</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {techStack.map((item, i) => {
                  const bg = item.status === "live" ? "rgba(34,197,94,0.15)" : item.status === "beta" ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)";
                  const tc = item.status === "live" ? COLORS.green : item.status === "beta" ? COLORS.amber : COLORS.blue;
                  return (
                    <div key={i} className="stack-tag">
                      <span style={{ fontSize: 14 }}>{item.icon}</span>
                      <span>{item.name}</span>
                      <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 999, background: bg, color: tc }}>{item.status}</span>
                    </div>
                  );
                })}
              </div>
 
              <div style={{ marginTop: 20, borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Performance</div>
                {[["API Response","124ms",85],["DB Query Avg","23ms",95],["CDN Hit Rate","98.4%",98],["Error Rate","0.02%",99]].map(([label,val,pct]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                      <span style={{ color: COLORS.textMuted }}>{label}</span>
                      <span style={{ color: COLORS.text }}>{val}</span>
                    </div>
                    <div style={{ height: 3, background: COLORS.border, borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 99, width: `${pct}%`, background: pct > 90 ? COLORS.green : pct > 70 ? COLORS.amber : COLORS.red, transition: "width 1.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}
