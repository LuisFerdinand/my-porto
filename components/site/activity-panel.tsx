"use client";

import { useState } from "react";
import type { ActivityPoint } from "@/lib/stats";

const W = 640;
const H = 250;
const PAD_X = 28;
const TOP = 52;
const BOTTOM = 18;

/** Smooth line through the points (Catmull-Rom converted to cubic Béziers). */
function smooth(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

type Ring = { name: string; pct: number; others: { name: string; count: number }[] };

export function ActivityPanel({
  points,
  ring,
  text,
}: {
  points: ActivityPoint[];
  ring: Ring;
  text: { title: string; caption: string; totalLabel: string; stackTitle: string; stackCaption: string };
}) {
  const [selected, setSelected] = useState(Math.max(points.length - 1, 0));
  if (points.length < 2) return null;

  const max = Math.max(...points.map((p) => p.value), 1);
  const step = (W - PAD_X * 2) / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: PAD_X + i * step,
    y: TOP + (1 - p.value / max) * (H - TOP - BOTTOM),
  }));
  const line = smooth(coords);
  const area = `${line} L ${coords[coords.length - 1].x} ${H} L ${coords[0].x} ${H} Z`;
  const current = points[selected];
  const marker = coords[selected];

  const C = 2 * Math.PI * 46;

  return (
    <section className="grid12 gap-y-4" aria-label={text.title} data-reveal>
      <div className="surface col-span-12 lg:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="h3">{text.title}</h2>
            <p className="small muted mt-1">{text.caption}</p>
          </div>
          <p className="text-right">
            <span className="block text-[clamp(1.9rem,1.5rem+1.4vw,2.6rem)] font-extrabold leading-none tracking-tight tabular-nums">{current.value}</span>
            <span className="small muted font-bold">{text.totalLabel}</span>
          </p>
        </div>

        <div className="relative mt-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${text.caption}: ${current.full}, ${current.value}`}>
            <defs>
              <linearGradient id="activity-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#14131a" stopOpacity="0.14" />
                <stop offset="1" stopColor="#14131a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#activity-fill)" />
            <path d={line} className="chart-line" />
            <line x1={marker.x} x2={marker.x} y1={marker.y} y2={H} stroke="#14131a" strokeWidth="1.5" />
            <circle cx={marker.x} cy={marker.y} r="8" fill="#14131a" stroke="#f7f8fc" strokeWidth="4" />
            <g transform={`translate(${Math.min(Math.max(marker.x, 54), W - 54)} ${Math.max(marker.y - 38, 8)})`}>
              <rect x="-46" y="-4" width="92" height="30" rx="15" fill="#14131a" />
              <text y="16" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">
                {current.full}
              </text>
            </g>
          </svg>
        </div>

        <div className="segmented mt-2 w-full justify-between" role="group" aria-label={text.title}>
          {points.map((p, i) => (
            <button key={p.full} type="button" className="seg" aria-pressed={i === selected} onClick={() => setSelected(i)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* The dark card with the ring, as "Plan for 2020: Completed 75%" in the reference. */}
      <div className="stack-card card-dark col-span-12 flex flex-col justify-between gap-8 !p-6 lg:col-span-4">
        <div>
          <h2 className="h3">{text.stackTitle}</h2>
          <p className="small muted mt-1">
            {ring.pct}% {text.stackCaption} {ring.name}
          </p>
        </div>
        <div className="grid justify-items-center gap-7">
          <svg viewBox="0 0 120 120" className="size-40 shrink-0 -rotate-90" role="img" aria-label={`${ring.name}: ${ring.pct}%`}>
            <circle cx="60" cy="60" r="46" className="donut-track" />
            <circle cx="60" cy="60" r="46" className="donut-value" strokeDasharray={`${(ring.pct / 100) * C} ${C}`} />
            <text x="60" y="60" textAnchor="middle" dominantBaseline="central" transform="rotate(90 60 60)" fontSize="24" fontWeight="800" fill="#fff">
              {ring.pct}%
            </text>
          </svg>
          <ul className="grid w-full gap-2">
            {ring.others.map((o) => (
              <li key={o.name} className="small flex items-center justify-between gap-5 font-bold">
                <span>{o.name}</span>
                <span className="text-white/60 tabular-nums">{o.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
