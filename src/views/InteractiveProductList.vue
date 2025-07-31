<template>
  <div id="vue-app-container">
    <!-- Loading Overlay -->
    <div v-if="isNavigating" class="loading-overlay">
      <div class="loading-spinner-wrapper">
        <div class="loading-spinner"></div>
      </div>
      <div class="loading-text">
        {{ lang === 'cn' ? '正在加载产品信息...' : 'Loading product information...' }}
      </div>
    </div>

    <!-- Reset Button -->
    <button :class="['btn', 'reset-button', { visible: resetButtonVisible }]" @click="resetView">⟲ {{ resetViewText }}</button>

    <svg ref="svgRef">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#00ffff" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#00ffff" />
        </filter>
      </defs>
    </svg>
    <canvas ref="minimapRef" class="minimap fade-in" :class="{ visible: contentVisible }" width="320" height="100"></canvas>
    <div class="minimap-indicator fade-in" :class="{ visible: contentVisible }">
      <span v-html="minimapIndicatorText"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import * as d3 from 'd3';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const lang = computed(() => route.query.lang || 'en');

// --- Refs for DOM elements ---
const svgRef = ref(null);
const minimapRef = ref(null);

// --- Reactive State ---
const isTransitioning = ref(true);
const isNavigating = ref(false);
const resetButtonVisible = ref(false);
const contentVisible = ref(true);

// --- D3 related variables ---
let g, zoom, linkData, nodeData, links;

// --- Product Data (English) ---
const data_en = {
  name: "Product List",
  children: [
    {
      name: "Silicone Gum",
      linkName: "SiliGum",
      children: [
        { name: "101 methyl", linkName: "101 methyl" },
        { name: "Methyl Vinyl", linkName: "Methyl Vinyl" },
        { name: "101B Hydroxyl", linkName: "101B Hydroxyl" }
      ]
    },
    {
      name: "Silicone Rubber",
      linkName: "SiliRub",
      children: ["Translucent", "Subtranslucent", "Common", "Economic"].map(type => ({
        name: type,
        linkName: type,
        children: ["Molding", "Extrusion"].map(app => ({
          name: app,
          linkName: app
        }))
      }))
    },
    {
      name: "Fumed Silicone Rubber",
      linkName: "FumRub",
      children: [
        {
          name: "Standard",
          linkName: "Standard",
          children: ["Molding", "Extrusion"].map(app => ({
            name: app,
            linkName: app
          }))
        },
        {
          name: "Economic",
          linkName: "Economic",
          children: ["Molding", "Extrusion"].map(app => ({
            name: app,
            linkName: app
          }))
        },
        { name: "General Purpose", linkName: "General Purpose" }
      ]
    },
    {
      name: "Special Silicone Rubber",
      linkName: "SpeRub",
      children: [
        {
          name: "Silicone Rubber",
          linkName: "Silicone Rubber",
          children: [
            "Cable Accessories", "High Rebound", "High Strength Molding",
            "Food Contact Molding", "Ultra Low Hardness Molding", "Addition-curing",
            "High Temperature Resistant", "Self-lubricating", "Anti-static",
            "Flame Retardant", "Ceramic"
          ].map(name => ({ name, linkName: name }))
        },
        {
          name: "Fumed Silicone Rubber",
          linkName: "Fumed Silicone Rubber",
          children: [
            "Economic High tear Strength", "Standard High tear Strength", "High Transparency"
          ].map(name => ({ name, linkName: name }))
        },
        { name: "Electrical Insulating", linkName: "Electrical Insulating" }
      ]
    }
  ]
};

// --- Product Data (Chinese) ---
const data_cn = {
  name: "产品列表",
  children: [
    {
      name: "硅橡胶生胶",
      linkName: "SiliGum",
      children: [
        { name: "101甲基", linkName: "101 methyl" },
        { name: "甲基乙烯基", linkName: "Methyl Vinyl" },
        { name: "101B羟基", linkName: "101B Hydroxyl" }
      ]
    },
    {
      name: "混炼胶",
      linkName: "SiliRub",
      children: ["半透明", "亚透明", "普通", "经济型"].map((type, index) => ({
        name: type,
        linkName: ["Translucent", "Subtranslucent", "Common", "Economic"][index],
        children: ["成型", "挤出"].map((app, appIndex) => ({
          name: app,
          linkName: ["Molding", "Extrusion"][appIndex]
        }))
      }))
    },
    {
      name: "气相硅橡胶",
      linkName: "FumRub",
      children: [
        {
          name: "标准",
          linkName: "Standard",
          children: ["成型", "挤出"].map((app, appIndex) => ({
            name: app,
            linkName: ["Molding", "Extrusion"][appIndex]
          }))
        },
        {
          name: "经济型",
          linkName: "Economic",
          children: ["成型", "挤出"].map((app, appIndex) => ({
            name: app,
            linkName: ["Molding", "Extrusion"][appIndex]
          }))
        },
        { name: "通用", linkName: "General Purpose" }
      ]
    },
    {
      name: "特种硅橡胶",
      linkName: "SpeRub",
      children: [
        {
          name: "硅橡胶",
          linkName: "Silicone Rubber",
          children: [
            "电缆配件", "高回弹", "高强度成型",
            "食品接触成型", "超低硬度成型", "加成固化",
            "耐高温", "自润滑", "抗静电",
            "阻燃", "陶瓷"
          ].map((name, index) => ({
            name,
            linkName: [
              "Cable Accessories", "High Rebound", "High Strength Molding",
              "Food Contact Molding", "Ultra Low Hardness Molding", "Addition-curing",
              "High Temperature Resistant", "Self-lubricating", "Anti-static",
              "Flame Retardant", "Ceramic"
            ][index]
          }))
        },
        {
          name: "气相硅橡胶",
          linkName: "Fumed Silicone Rubber",
          children: [
            "经济型高撕裂强度", "标准高撕裂强度", "高透明度"
          ].map((name, index) => ({
            name,
            linkName: [
              "Economic High tear Strength", "Standard High tear Strength", "High Transparency"
            ][index]
          }))
        },
        { name: "电绝缘", linkName: "Electrical Insulating" }
      ]
    }
  ]
};

const data = computed(() => (lang.value === 'cn' ? data_cn : data_en));

// --- Computed Text Properties ---
const resetViewText = computed(() => (lang.value === 'cn' ? '重置视图' : 'Reset View'));
const minimapIndicatorText = computed(() => (
  lang.value === 'cn'
    ? '点击<span class="red-dot"></span>红点查看产品规格。'
    : 'Click on the <span class="red-dot"></span>red dot to check the specification of our product.'
));


// --- D3 and Component Logic ---

const navigateWithTransition = (slug) => {
  // Prevent double-clicking
  if (isNavigating.value) return;
  
  isNavigating.value = true;
  isTransitioning.value = true;
  
  setTimeout(() => {
    // Check if current language is Chinese and use appropriate route
    const routePath = lang.value === 'cn' ? `/zh/products/${slug}` : `/products/${slug}`;
    router.push(routePath);
  }, 1500); // Increased delay to show loading animation
};

const handleNodeClick = (event, d) => {
  // Prevent clicking during navigation
  if (isNavigating.value) return;
  
  if (!d.children && d.depth > 0) {
    const path = d.ancestors().reverse().slice(1).map(n => n.data.linkName || n.data.name);
    let fileName = path[0] || '';
    if (path[1]) fileName += `-${path[1]}`;
    const noThirdDropdownNeeded = ["101 methyl", "Methyl Vinyl", "101B Hydroxyl", "General Purpose", "Electrical Insulating"];
    if (path[2] && !noThirdDropdownNeeded.includes(path[1])) {
      fileName += `-${path[2]}`;
    }
    // Create a proper slug for the router
    const slug = fileName.replace(/\s+/g, '_');
    navigateWithTransition(slug);
  }
};

const handleMouseOver = (event, d) => {
  links.classed("animated", false);
  let pathToNode = [];
  let current = d;
  while (current.parent) {
    pathToNode.unshift(current);
    current = current.parent;
  }
  pathToNode.unshift(current);

  let i = 0;
  function animateGlow() {
    if (i < pathToNode.length - 1) {
      const source = pathToNode[i];
      const target = pathToNode[i + 1];
      links.filter(link =>
        (link.source === source && link.target === target) ||
        (link.source === target && link.target === source)
      ).classed("animated", true);
      i++;
      setTimeout(animateGlow, 0);
    }
  }
  setTimeout(animateGlow, 50);
};

const handleMouseOut = () => {
  links.classed("animated", false);
};

const updateMinimap = () => {
  const minimapContext = minimapRef.value.getContext("2d");
  const minimapWidth = 320;
  const minimapHeight = 100;
  minimapContext.clearRect(0, 0, minimapWidth, minimapHeight);

  const treeBounds = g.node().getBBox();
  const scaleX = minimapWidth / treeBounds.width;
  const scaleY = minimapHeight / treeBounds.height;
  const minimapScale = Math.min(scaleX, scaleY) * 0.8;

  const offsetX = (minimapWidth - treeBounds.width * minimapScale) / 2;
  const offsetY = (minimapHeight - treeBounds.height * minimapScale) / 2;

  minimapContext.strokeStyle = "#888";
  minimapContext.lineWidth = 1;
  minimapContext.beginPath();
  linkData.forEach(link => {
    const sourceX = (link.source.y - treeBounds.x) * minimapScale + offsetX;
    const sourceY = (link.source.x - treeBounds.y) * minimapScale + offsetY;
    const targetX = (link.target.y - treeBounds.x) * minimapScale + offsetX;
    const targetY = (link.target.x - treeBounds.y) * minimapScale + offsetY;
    minimapContext.moveTo(sourceX, sourceY);
    minimapContext.lineTo(targetX, targetY);
  });
  minimapContext.stroke();

  nodeData.forEach(node => {
    const x = (node.y - treeBounds.x) * minimapScale + offsetX;
    const y = (node.x - treeBounds.y) * minimapScale + offsetY;
    minimapContext.beginPath();
    minimapContext.arc(x, y, 2, 0, 2 * Math.PI);
    minimapContext.fillStyle = node.children ? "green" : "red";
    minimapContext.fill();
    minimapContext.strokeStyle = "white";
    minimapContext.lineWidth = 0.5;
    minimapContext.stroke();
  });

  const currentTransform = d3.zoomTransform(svgRef.value);
  const viewportX = (-currentTransform.x / currentTransform.k - treeBounds.x) * minimapScale + offsetX;
  const viewportY = (-currentTransform.y / currentTransform.k - treeBounds.y) * minimapScale + offsetY;
  const viewportWidth = (window.innerWidth / currentTransform.k) * minimapScale;
  const viewportHeight = (window.innerHeight / currentTransform.k) * minimapScale;

  minimapContext.strokeStyle = "#00ffff";
  minimapContext.lineWidth = 1;
  minimapContext.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);
};

const resetView = () => {
  const bounds = g.node().getBBox();
  const scale = 0.55;
  const centerX = (window.innerWidth - bounds.width * scale) / 2 - bounds.x * scale;
  const centerY = (window.innerHeight - bounds.height * scale) / 2 - bounds.y * scale;
  d3.select(svgRef.value).transition()
    .duration(1500)
    .call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));
};

const beforeUnloadHandler = () => {
  contentVisible.value = false;
  isTransitioning.value = true;
};

onMounted(() => {
  const svg = d3.select(svgRef.value);
  g = svg.append("g");

  zoom = d3.zoom()
    .scaleExtent([0.5, 2])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
      updateMinimap();
    });

  svg.call(zoom);

  const root = d3.hierarchy(data.value);
  const treeLayout = d3.tree().nodeSize([60, 600]);
  treeLayout(root);

  linkData = root.links();
  nodeData = root.descendants();

  links = g.selectAll(".link")
    .data(linkData)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

  const nodes = g.selectAll(".node")
    .data(nodeData)
    .enter()
    .append("g")
    .attr("class", d => "node " + (d.children ? "branch-head" : "leaf"))
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .style("cursor", d => d.children === undefined && d.depth > 0 ? "pointer" : "default")
    .on("click", handleNodeClick)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  nodes.append("circle").attr("r", 26);

  nodes.append("text")
    .attr("dy", 8)
    .attr("x", d => d.children ? -35 : 35)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);

  const bounds = g.node().getBBox();
  const fullWidth = window.innerWidth;
  const fullHeight = window.innerHeight;
  const scale = 0.55;
  const centerX = (fullWidth - bounds.width * scale) / 2 - bounds.x * scale;
  const centerY = (fullHeight - bounds.height * scale) / 2 - bounds.y * scale;
  svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));

  updateMinimap();

  // Initial animations
  setTimeout(() => {
    isTransitioning.value = false;
    resetButtonVisible.value = true;
  }, 500);

  window.addEventListener('beforeunload', beforeUnloadHandler);
  
  // Handle back/forward navigation
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      isTransitioning.value = false;
      contentVisible.value = true;
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler);
});

</script>

<style scoped>
  /* Loading Overlay */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease-in-out;
  }

  .loading-spinner-wrapper {
    animation: scaleIn 0.5s ease-out 0.1s both;
    margin-bottom: 20px;
  }

  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #34495e;
    border-top: 6px solid #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    letter-spacing: 1px;
    animation: fadeInUp 0.6s ease-out 0.2s both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  #vue-app-container {
    font-family: "Playfair Display", serif;
    margin: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  .fade-in {
    opacity: 0;
    transition: opacity 2s ease, transform 2s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .page-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000000;
    opacity: 1;
    z-index: 99999;
    pointer-events: none;
    transition: opacity 0.8s ease;
    overflow: hidden;
  }

  .page-transition.fade-out {
    opacity: 0;
    pointer-events: none;
  }

  .page-transition .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin: -30px 0 0 -30px;
    border: 6px solid white;
    border-top: 6px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10001;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .page-transition .loading-text {
    position: absolute;
    top: calc(50% + 50px);
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1em;
    text-align: center;
    max-width: 80%;
    opacity: 0.8;
    z-index: 10002;
  }

  .btn {
    position: absolute;
    top: 20px;
    background-color: #000000;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1em;
    transition: background-color 0.3s, opacity 0.5s ease, transform 0.5s ease;
    z-index: 1000;
    border: none;
    font-family: "Playfair Display", serif;
    cursor: pointer;
    min-width: 100px; /* Ensure same min-width */
    text-align: center;
  }

  .btn:hover {
    background-color: #005f00;
  }

  .reset-button {
    left: 40px;
    opacity: 0;
    transform: translateX(-20px);
  }

  .reset-button.visible {
    opacity: 1;
    transform: translateX(0);
  }

  svg {
    width: 100vw;
    height: 100vh;
    cursor: grab;
    max-width: 100vw;
    max-height: 100vh;
    display: block;
  }

  :deep(.link) {
    fill: none;
    stroke: #888;
    stroke-width: 2px;
    transition: stroke 0.3s ease, stroke-width 0.3s ease;
  }

  :deep(.link.animated) {
    stroke: #00ffff;
    stroke-width: 4px;
    filter: url(#glow);
  }

  :deep(.node circle) {
    stroke: #fff;
    stroke-width: 1.5px;
    transition: all 0.3s ease;
  }

  :deep(.node.branch-head circle) {
    fill: green;
  }

  :deep(.node.leaf circle) {
    fill: red;
  }

  :deep(.node:hover circle) {
    r: 35;
    filter: drop-shadow(0 0 10px #ff69b4);
  }

  /* Disable interactions when navigating */
  .loading-overlay ~ * :deep(.node) {
    pointer-events: none;
    opacity: 0.6;
  }

  .loading-overlay ~ * :deep(.node circle) {
    cursor: not-allowed;
  }

  :deep(.node text) {
    font-size: 30px;
    fill: white;
    pointer-events: none;
  }

  .minimap {
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .minimap-indicator {
    position: absolute;
    top: 120px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 1em;
    width: 322px;
    border: 1px solid #fff;
  }

  .red-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: red;
    border-radius: 50%;
    margin-right: 4px;
  }
</style>