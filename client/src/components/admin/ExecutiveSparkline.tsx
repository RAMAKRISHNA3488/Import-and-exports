import React, { useState, useMemo } from 'react';

export interface SparklinePoint {
  label: string;
  value: number;
  displayValue: string;
}

export interface ExecutiveSparklineProps {
  data: SparklinePoint[];
  color: string;
  id: string;
  width?: number;
  height?: number;
  ariaLabel?: string;
}

export const ExecutiveSparkline: React.FC<ExecutiveSparklineProps> = ({
  data,
  color,
  id,
  width = 104,
  height = 40,
  ariaLabel,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Compute smooth spline coordinates
  const { strokePath, areaPath, points } = useMemo(() => {
    if (!data || data.length === 0) {
      return { strokePath: '', areaPath: '', points: [] };
    }

    const padLeft = 4;
    const padRight = 8;
    const padTop = 6;
    const padBottom = 6;
    const usableW = width - padLeft - padRight;
    const usableH = height - padTop - padBottom;

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const pts = data.map((d, i) => {
      const x = padLeft + (i / Math.max(data.length - 1, 1)) * usableW;
      const y = height - padBottom - ((d.value - min) / range) * usableH;
      return { ...d, x, y };
    });

    if (pts.length === 1) {
      return { strokePath: `M ${pts[0].x},${pts[0].y}`, areaPath: '', points: pts };
    }

    // Build cubic Bézier spline
    let path = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const dx = (p1.x - p0.x) * 0.45;
      path += ` C ${(p0.x + dx).toFixed(1)},${p0.y.toFixed(1)} ${(p1.x - dx).toFixed(1)},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }

    const last = pts[pts.length - 1];
    const first = pts[0];
    const area = `${path} L ${last.x.toFixed(1)},${height} L ${first.x.toFixed(1)},${height} Z`;

    return { strokePath: path, areaPath: area, points: pts };
  }, [data, width, height]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normX = (mouseX / rect.width) * width;

    // Find closest point by x coordinate
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - normX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoverIdx(closestIdx);
  };

  const handleMouseLeave = () => {
    setHoverIdx(null);
  };

  const activePoint = hoverIdx !== null && points[hoverIdx] ? points[hoverIdx] : null;
  const lastPoint = points.length > 0 ? points[points.length - 1] : null;

  const gradId = `spark-grad-${id}`;
  const glowId = `spark-glow-${id}`;

  return (
    <div className="admin-exec-sparkline-wrap" style={{ width, height, position: 'relative' }}>
      {/* Floating Micro Tooltip */}
      {activePoint && (
        <div
          className="admin-spark-scrub-tooltip"
          style={{
            left: `${(activePoint.x / width) * 100}%`,
            top: `${Math.max(0, activePoint.y - 24)}px`,
            borderColor: color,
          }}
        >
          <span className="tooltip-lbl">{activePoint.label}:</span>
          <strong className="tooltip-val">{activePoint.displayValue}</strong>
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="admin-exec-sparkline-svg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel || 'Trend sparkline graph'}
      >
        <defs>
          {/* Subtle colored multi-stop gradient */}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="55%" stopColor={color} stopOpacity="0.10" />
            <stop offset="100%" stopColor={color} stopOpacity="0.00" />
          </linearGradient>

          {/* Soft neon luminescence glow filter */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Financial reference grid lines */}
        <line
          x1="0"
          y1={Math.round(height * 0.35)}
          x2={width}
          y2={Math.round(height * 0.35)}
          stroke="#F1F5F9"
          strokeDasharray="2 3"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1={Math.round(height * 0.72)}
          x2={width}
          y2={Math.round(height * 0.72)}
          stroke="#F8FAFC"
          strokeDasharray="2 3"
          strokeWidth="1"
        />

        {/* Area Gradient Fill */}
        {areaPath && <path d={areaPath} fill={`url(#${gradId})`} />}

        {/* Glow Shadowed Spline Stroke */}
        {strokePath && (
          <path
            d={strokePath}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
          />
        )}

        {/* Interactive Scrubbing Cursor Hairline */}
        {activePoint && (
          <>
            <line
              x1={activePoint.x}
              y1={2}
              x2={activePoint.x}
              y2={height - 2}
              stroke={color}
              strokeDasharray="2 2"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            {/* Active coordinate indicator */}
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="4"
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="2.5"
            />
          </>
        )}

        {/* Default Live Telemetry Beacon (When not scrubbing) */}
        {!activePoint && lastPoint && (
          <>
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="5"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              className="admin-spark-beacon-ping"
            />
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="2.8"
              fill={color}
              className="admin-spark-beacon-dot"
            />
          </>
        )}
      </svg>
    </div>
  );
};
