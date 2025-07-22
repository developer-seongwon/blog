<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
  name: 'Header',
})

</script>

<template>
  <header class="header">
    <div class="header-left">
      <h1>Developer.Seongwon</h1>
    </div>
    <div class="header-center">
      <h1>Developer.Seongwon</h1>
    </div>
    <div class="header-right">
      <h1>Developer.Seongwon</h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #f8f8f8; /* 배경색을 약간 회색으로 주어 구분 */
  border-bottom: 1px solid #eee; /* 하단 경계선 */
  padding: 20px 40px; /* 상하좌우 패딩 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  display: flex;
  justify-content: center; /* 내용을 중앙으로 정렬 */
  align-items: center;
  width: 100%; /* 전체 너비 차지 */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 */
}

.header-content {
  width: 100%;
  max-width: 960px; /* 내용의 최대 너비를 제한하여 깔끔하게 보임 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
}

.app-header h1 {
  margin: 0; /* h1 기본 마진 제거 */
  font-size: 2.5em; /* 'Blog' 텍스트 크기 */
  color: #333; /* 텍스트 색상 */
  font-family: sans-serif; /* 폰트 설정 */
  font-weight: bold;
}

.header {
  margin: 0;
  border: 1px dashed #000000; /* 영역 구분을 위한 임시 테두리 */
  height: 60px; /* 영역의 높이 */
  display: flex; /* 내부 콘텐츠 정렬을 위해 */
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}

/* 왼쪽 영역 */
.header-left {
  flex-basis: 20%; /* 전체 너비의 20%를 기본 너비로 가짐 */
  min-width: 100px; /* 최소 너비 */
  /* background-color: lightblue; */ /* 시각적 구분을 위한 임시 배경색 */
}

/* 가운데 영역 */
.header-center {
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 늘어남 */
  flex-basis: 60%; /* 전체 너비의 60%를 기본 너비로 가짐 */
  min-width: 200px; /* 최소 너비 */
  /* background-color: lightgreen; */
}

/* 오른쪽 영역 */
.header-right {
  flex-basis: 20%; /* 전체 너비의 20%를 기본 너비로 가짐 */
  min-width: 100px; /* 최소 너비 */
  /* background-color: lightcoral; */
}

/* GitHub 배너 스타일 (주석 처리됨, 나중에 사용) */
/*
.github-banner {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 15px;
  align-self: flex-end; // 오른쪽으로 정렬
}
*/
</style>