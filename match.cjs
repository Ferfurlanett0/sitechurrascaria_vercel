const fs = require('fs');
const { svgPathBbox } = require('svg-path-bbox');

// Load paths
const svgStr = fs.readFileSync('public/img/Boi vetorizado.svg', 'utf-8');
const paths = [];

const regex = /<path[^>]*d="([^"]+)"/g;
let match;
while ((match = regex.exec(svgStr)) !== null) {
    const fullTag = match[0];
    if (!fullTag.includes('class="cls-1"')) {
        const d = match[1];
        try {
            const bbox = svgPathBbox(d); // [x0, y0, x1, y1]
            const cx = (bbox[0] + bbox[2]) / 2;
            const cy = (bbox[1] + bbox[3]) / 2;
            const area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]);
            paths.push({ d, cx, cy, area });
        } catch(e) {
            console.error("Error parsing path:", e.message);
        }
    }
}

console.log(`Found ${paths.length} paths without cls-1 class.`);

// Load cuts
const polygons = require('./cuts_extracted2.json');
const mapping = {
  "1_musculo_dianteiro": [21, 12],
  "2_peito": [16, 29],
  "3_pescoco": [2, 8, 22],
  "4_acem": [3],
  "5_cupim": [5],
  "6_paleta": [1],
  "7_capa_file": [6],
  "8_file_costela": [33, 30, 26],
  "10_ponta_agulha": [0],
  "11_contrafile": [35, 45, 42],
  "12_file_mignon": [28, 17],
  "13_fraldinha": [13, 34],
  "14_maminha": [43, 41],
  "15_alcatra": [23, 39, 44],
  "16_picanha": [7],
  "17_patinho": [31, 24],
  "18_coxao_mole": [20, 37, 40, 36, 27],
  "19_lagarto": [10, 19, 38, 25, 9],
  "20_coxao_duro": [15, 18],
  "21_musculo_traseiro": [14, 32, 11],
  "aba_do_file": [4]
};

const cutCenters = {};
for (const [cutId, indices] of Object.entries(mapping)) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const idx of indices) {
        const poly = polygons[idx];
        const pts = poly.points.split(' ').map(p => p.split(',').map(Number));
        for (const [x, y] of pts) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    cutCenters[cutId] = { cx, cy };
}

const targetPaths = paths;

console.log(`Found ${targetPaths.length} target paths for cuts.`);

const assignments = {};
const usedPaths = new Set();
// Simple greedy matching
for (const cutId of Object.keys(mapping)) {
    const cc = cutCenters[cutId];
    let bestDist = Infinity;
    let bestPathIdx = -1;
    for (let i = 0; i < targetPaths.length; i++) {
        if (usedPaths.has(i)) continue;
        const pc = targetPaths[i];
        const dist = Math.sqrt((cc.cx - pc.cx)**2 + (cc.cy - pc.cy)**2);
        if (dist < bestDist) {
            bestDist = dist;
            bestPathIdx = i;
        }
    }
    if (bestPathIdx !== -1) {
        assignments[cutId] = bestPathIdx;
        usedPaths.add(bestPathIdx);
        console.log(`Assigned ${cutId} to path ${bestPathIdx} (dist: ${bestDist.toFixed(2)})`);
    } else {
        console.log(`Could not assign ${cutId}`);
    }
}

// Generate the new component

let out = `import React from "react";

export const BoiCortesSVG = ({ activeCutId, onCutHover, onCutLeave, onCutClick }) => {
  return (
    <svg viewBox="0 0 2468 1728" className="w-full h-auto drop-shadow-2xl" style={{ color: '#6B3A14' }} preserveAspectRatio="xMidYMid meet">
      {/* Corpo do Boi */}
`;

// Add all non-cls-1 body paths with currentColor
const regexBody = /<path(?![^>]*class="cls-1")[^>]*d="([^"]+)"[^>]*>/g;
const bodyStr = fs.readFileSync('public/img/Boi vetorizado.svg', 'utf-8');
let bodyMatch;
while ((bodyMatch = regexBody.exec(bodyStr)) !== null) {
    const d = bodyMatch[1];
    // skip the huge background rect path (starts with m0,)
    if (d.startsWith('m0,') || d.startsWith('M0,')) continue;
    out += `      <path d="${d}" fill="currentColor" className="pointer-events-none" />\n`;
}

out += `      {/* Áreas Interativas */}\n`;

for (const cutId of Object.keys(mapping)) {
    const pathIdx = assignments[cutId];
    if (pathIdx === undefined) continue;
    const path = targetPaths[pathIdx];
    
    out += `      <g
        id="${cutId}"
        className={\`transition-all duration-300 cursor-pointer outline-none group \${activeCutId === "${cutId}" ? "active-cut" : ""}\`}
        onMouseEnter={() => onCutHover("${cutId}")}
        onMouseLeave={() => onCutLeave && onCutLeave("${cutId}")}
        onClick={() => onCutClick("${cutId}")}
      >
        <path
          d="${path.d}"
          className={\`transition-all duration-300 \${activeCutId === "${cutId}" ? "fill-[rgba(234,88,12,0.45)] stroke-[rgba(234,88,12,0.8)] stroke-[4px]" : "fill-transparent stroke-transparent hover:fill-[rgba(255,255,255,0.1)]"}\`}
          strokeLinejoin="round"
          style={{ mixBlendMode: "screen" }}
        />
        <text
          x="${cutCenters[cutId].cx}"
          y="${cutCenters[cutId].cy}"
          textAnchor="middle"
          dominantBaseline="middle"
          className={\`text-3xl md:text-5xl font-bold transition-all duration-300 pointer-events-none \${activeCutId === "${cutId}" ? "fill-white" : "fill-white/50 group-hover:fill-white"}\`}
          style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.8)" }}
        >
          ${cutId.split('_')[0]}
        </text>
      </g>\n`;
}

// Now include the cls-1 paths as decorative/border paths (which the user says are elements separated)
// wait, the cls-1 paths are white. They probably form the lines between cuts!
out += `      {/* Lines and decorative paths */}\n`;
const svgLines = [];
let matchCls = null;
const regexCls = /<path[^>]*class="cls-1"[^>]*d="([^"]+)"/g;
while ((matchCls = regexCls.exec(svgStr)) !== null) {
    const d = matchCls[1];
    out += `      <path d="${d}" fill="#ffffff" className="pointer-events-none" />\n`;
}

out += `    </svg>
  );
};
`;

fs.writeFileSync("src/components/BoiCortesSVG.tsx", out);
console.log("Componente gerado com sucesso.");
