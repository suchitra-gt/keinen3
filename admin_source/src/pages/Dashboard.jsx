import { useState, useEffect, useRef } from "react";
 
const COLORS = {
  red: "#E8342A",
  redDark: "#B02820",
  redGlow: "rgba(232, 52, 42, 0.15)",
  bg: "#0A0A0A",
  bgCard: "#111111",
  border: "#222222",
  borderBright: "#2A2A2A",
  text: "#FFFFFF",
  textMuted: "#F0F0F0", // Almost white
  textDim: "#CCCCCC",   // Light grey/silver
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#2A9DE8",
};
 
const css = `
  @keyframes growBar { from { height: 0 !important; } }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.3); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #1E1E1E; border-radius: 2px; }
  body { background: #0A0A0A; overflow: hidden; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 13px; border-left: 2px solid transparent; color: ${COLORS.textDim}; }
  .nav-item:hover { background: #1E1E1E; color: ${COLORS.text}; }
  .nav-item.active { background: rgba(232,52,42,0.15); border-left: 2px solid #E8342A; color: #E8342A; font-weight: 600; }
  .metric-card { background: #111111; border: 1px solid #1E1E1E; border-radius: 10px; padding: 16px 18px; position: relative; overflow: hidden; transition: border-color 0.2s; }
  .metric-card:hover { border-color: #E8342A; }
`;
 
/* ── AnimatedCounter ── */
function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    // If target hasn't changed much, don't restart animation
    if (Math.abs(target - count) < 2) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = count;
        const diff = target - start;
        const step = diff / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if ((diff > 0 && start >= target) || (diff < 0 && start <= target)) { 
            setCount(target); 
            clearInterval(timer); 
          }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
 
/* ── SparkLine ── */
function SparkLine({ data, color = COLORS.red }) {
  if (!data || data.length === 0) return null;
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
 
/* ── Main Dashboard ── */
export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [liveVisitors, setLiveVisitors] = useState(247);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [stats, setStats] = useState({ total: 0, unique: 0, live: 0 });
  const [reviews, setReviews] = useState([]);
 
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/analytics/visitors");
      const data = await res.json();
      setStats(data);
      if (data.live) setLiveVisitors(data.live);

      const reviewsRes = await fetch("http://localhost:5000/api/reviews");
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    const t = setInterval(() => setTime(new Date()), 1000);
    const s = setInterval(fetchStats, 5000);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);
 
  const metrics = [
    { label: "Total website visitors",  value: stats.total, suffix: "",  trend: "+12.4%", up: true,  spark: [80,95,88,110,105,132,128,145,139,162,155,178], color: COLORS.red   },
    { label: "Unique Visitors", value: stats.unique,  suffix: "",  trend: "+8.7%",  up: true,  spark: [40,52,47,61,58,74,69,82,78,91,87,98],          color: COLORS.blue  },
  ];
 
  const topBarColors = [COLORS.red, COLORS.blue];
 
  const navGroups = [
    { title: "Main",   items: [{ icon: "⬡", label: "Dashboard" }, { icon: "◈", label: "Analytics" }, { icon: "★", label: "Reviews" }] },
  ];
 
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
                </div>
              ))}
            </div>
          ))}
        </div>
 
        {/* User */}
        <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.redGlow, border: `1px solid ${COLORS.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.red, fontWeight: 700 }}>SA</div>
            <div>
              <div style={{ fontSize: 12 }}>Sys Admin</div>
              <div style={{ fontSize: 10, color: COLORS.textDim }}>admin@keinen.io</div>
            </div>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('admin_token'); window.location.href='/login'; }}
            style={{ 
              width: '100%', 
              background: 'transparent', 
              border: `1px solid ${COLORS.border}`, 
              color: COLORS.textDim, 
              padding: '8px', 
              borderRadius: '6px', 
              fontSize: '11px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            TERMINATE SESSION
          </button>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 20 }}>
            {metrics.map((m, i) => (
              <div key={i} className="metric-card">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: topBarColors[i] }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{m.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>
                      <AnimatedCounter target={m.value} suffix={m.suffix || ""} />
                    </div>
                    <div style={{ marginTop: 6, fontSize: 11, color: m.up ? COLORS.green : COLORS.red }}>{m.up ? "▲" : "▼"} {m.trend}</div>
                  </div>
                  <div style={{ opacity: 0.6, marginTop: 4 }}><SparkLine data={m.spark} color={m.color} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>LIVE CLIENT FEEDBACK</h3>
              <span style={{ fontSize: 11, color: COLORS.textDim }}>DATABASE SYNC: ACTIVE</span>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, animation: "fadeSlideIn 0.3s ease-out forwards" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(232,52,42,0.1)", color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                        <div style={{ fontSize: 10, color: COLORS.textDim }}>{r.email}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: COLORS.amber, fontSize: 12 }}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                      <div style={{ fontSize: 9, color: COLORS.textDim, marginTop: 4 }}>{new Date(r.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6 }}>"{r.comment}"</p>
                </div>
              )) : (
                <div style={{ textAlign: "center", padding: 40, border: `1px dashed ${COLORS.border}`, borderRadius: 10, color: COLORS.textDim, fontSize: 12 }}>
                  NO REVIEWS STORED IN DATABASE YET
                </div>
              )}
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}
