<template>
  <div class="color-masterbatch-page">
    <!-- Color Magnifier -->
    <div
      class="color-magnifier"
      ref="colorMagnifier"
      :style="{
        left: magnifierPosition.x + 'px',
        top: magnifierPosition.y + 'px',
        backgroundColor: magnifierColor,
        opacity: magnifierVisible ? 1 : 0,
      }"
    ></div>

    <div class="main-content">
      <div class="container fade-in">
        <div class="page-title">{{ pageTitle }}</div>

        <table class="color-table fade-in">
          <thead>
            <tr>
              <th>{{ tableHeaders[0] }}</th>
              <th>{{ tableHeaders[1] }}</th>
              <th>{{ tableHeaders[2] }}</th>
              <th>{{ tableHeaders[3] }}</th>
              <th>{{ tableHeaders[4] }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(group, groupName, groupIndex) in groupedColors" :key="groupName">
              <tr v-for="(color, index) in group" :key="color.id">
                <td>{{ color.id }}</td>
                <td v-if="index === 0" :rowspan="group.length">{{ groupName }}</td>
                <td>
                  <div
                    class="color-box"
                    :style="{ backgroundColor: color.hex, border: color.hex === '#ffffff' ? '1px solid #ccc' : 'none' }"
                    @mouseenter="showMagnifier($event, color.hex)"
                    @mousemove="moveMagnifier"
                    @mouseleave="hideMagnifier"
                  ></div>
                </td>
                <td>{{ color.code }}</td>
                <td>{{ color.addition }}</td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="notes fade-in">
          <p><strong>{{ notesTitle }}</strong></p>
          <ol>
            <li v-for="note in notesContent" :key="note">{{ note }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const lang = computed(() => route.query.lang || 'en');

const colors = ref([
  { id: 1, group: { en: 'Black', cn: '黑色' }, hex: '#010604', code: 'B01001', addition: '1%' },
  { id: 2, group: { en: 'Black', cn: '黑色' }, hex: '#020607', code: 'B02001', addition: '1%' },
  { id: 3, group: { en: 'Gray', cn: '灰色' }, hex: '#777d7f', code: 'B03001', addition: '1%' },
  { id: 4, group: { en: 'Gray', cn: '灰色' }, hex: '#726d66', code: 'B04001', addition: '1%' },
  { id: 5, group: { en: 'Gray', cn: '灰色' }, hex: '#424345', code: 'B05001', addition: '1%' },
  { id: 6, group: { en: 'Blue', cn: '蓝色' }, hex: '#273b75', code: 'L01001', addition: '1%' },
  { id: 7, group: { en: 'Blue', cn: '蓝色' }, hex: '#272841', code: 'L02001', addition: '1%' },
  { id: 8, group: { en: 'Blue', cn: '蓝色' }, hex: '#212138', code: 'L03001', addition: '1%' },
  { id: 9, group: { en: 'Yellow', cn: '黄色' }, hex: '#dbb035', code: 'Y01001', addition: '1%' },
  { id: 10, group: { en: 'Yellow', cn: '黄色' }, hex: '#eaa236', code: 'Y03001', addition: '1%' },
  { id: 11, group: { en: 'Yellow', cn: '黄色' }, hex: '#e2bf3a', code: 'Y04001', addition: '1%' },
  { id: 12, group: { en: 'Orange', cn: '橙色' }, hex: '#e2602a', code: 'Y05001', addition: '1%' },
  { id: 13, group: { en: 'Green', cn: '绿色' }, hex: '#0e392f', code: 'G01001', addition: '1%' },
  { id: 14, group: { en: 'Green', cn: '绿色' }, hex: '#2b462e', code: 'G02001', addition: '1%' },
  { id: 15, group: { en: 'Red', cn: '红色' }, hex: '#782e2a', code: 'R01001', addition: '1%' },
  { id: 16, group: { en: 'Red', cn: '红色' }, hex: '#732828', code: 'R02001', addition: '1%' },
  { id: 17, group: { en: 'Red', cn: '红色' }, hex: '#974332', code: 'R03001', addition: '1%' },
  { id: 18, group: { en: 'Red', cn: '红色' }, hex: '#a62b2f', code: 'R04001', addition: '1%' },
  { id: 19, group: { en: 'Red', cn: '红色' }, hex: '#bd262c', code: 'R05001', addition: '1%' },
  { id: 20, group: { en: 'Brown', cn: '棕色' }, hex: '#3b2419', code: 'R09001', addition: '1%' },
  { id: 21, group: { en: 'White', cn: '白色' }, hex: '#ffffff', code: 'W01001', addition: '1%' },
]);

const pageTitle = computed(() => (lang.value === 'cn' ? '色母粒' : 'Color Masterbatch'));

const tableHeaders = computed(() => {
  return lang.value === 'cn'
    ? ['编号', '颜色', '颜色样本', '颜色代码', '建议添加量']
    : ['No.', 'Color', 'Color Sample', 'Color Code', 'Recommended Addition Level'];
});

const notesTitle = computed(() => (lang.value === 'cn' ? '备注' : 'Notes:'));

const notesContent = computed(() => {
  return lang.value === 'cn'
    ? [
        '色样所用基胶为我司自制NE-7150。',
        '色样仅供参考，标准颜色请以实物为准。',
        '试片一次硫化条件：175℃×5min。',
      ]
    : [
        'The base rubber of color sample is NE-7150 by self-made of our company.',
        'The color sample is for reference only, please see physical products for standard colors.',
        'The primary curing condition for the test piece: 175°C × 5min.',
      ];
});

const groupedColors = computed(() => {
  return colors.value.reduce((acc, color) => {
    const groupName = color.group[lang.value] || color.group.en;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(color);
    return acc;
  }, {});
});

const colorMagnifier = ref(null);
const magnifierVisible = ref(false);
const magnifierColor = ref('');
const magnifierPosition = ref({ x: 0, y: 0 });

const showMagnifier = (e, color) => {
  magnifierColor.value = color;
  magnifierVisible.value = true;
  moveMagnifier(e);
};

const moveMagnifier = (e) => {
  magnifierPosition.value = { x: e.clientX + 15, y: e.clientY - 15 };
};

const hideMagnifier = () => {
  magnifierVisible.value = false;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.color-masterbatch-page {
  font-family: "Playfair Display", serif;
  background-color: #f4f4f4;
  color: #333;
  padding: 20px;
}

.main-content {
  flex: 1;
  position: relative;
}

.container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2.2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

table.color-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  font-size: 0.95em;
  text-align: center;
}

table.color-table th,
table.color-table td {
  border: 1px solid #ccc;
  padding: 10px;
  vertical-align: middle;
}

table.color-table th {
  background-color: #eaeaea;
}

.color-box {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  cursor: crosshair;
}

.color-magnifier {
  position: fixed;
  width: 120px;
  height: 120px;
  border: 3px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
  background-size: cover;
  background-position: center;
}

.notes {
  font-size: 0.85em;
  margin-top: 20px;
  color: #666;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.8s ease, transform 1.8s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
