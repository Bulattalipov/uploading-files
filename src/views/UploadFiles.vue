<script setup>
import InputFile from '../components/InputFile.vue';
import { useFileStore } from '../stores/FileStore';
import { ref } from 'vue';

const movement = ref(false);
const fileStore = useFileStore();

function onDragenter(e) {
  e.preventDefault();
  if (e.target.closest('.intro-base')) {
    movement.value = true;
  }
}

function onDragleave(e) {
  e.preventDefault();
  if (!e.target.closest('.intro-base').contains(e.relatedTarget)) {
    movement.value = false;
  }
}
</script>

<template>
  <div class="intro">
    <div class="container">
      <div class="intro-top">
        <div class="intro-top__name">My projects</div>
      </div>
      <div
        class="intro-base"
        :class="{ 'intro-base--movement': movement }"
        @drop="fileStore.onDrop($event)"
        @dragover.prevent
        @dragenter="onDragenter($event)"
        @dragleave="onDragleave($event)"
      >
        <div class="intro-base__inner">
          <img class="intro-base__img" src="/assets/img/uploading.svg" alt="" />
          <div class="intro-base__title">Start by uploading a file</div>
          <div class="intro-base__desc" @click="fileStore.onAddFileInList()">
            Any assets used in projects will live here. Start creating by uploading your files.
          </div>
          <InputFile>Upload</InputFile>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro-top {
  width: 100%;
  padding: 20px 24px;

  @media (max-width: 575px) {
    padding: 20px 0;
  }

  &__name {
    font-weight: 500;
    font-size: 18px;
    line-height: 156%;
    color: #101828;
  }
}

.intro-base {
  min-height: calc(100vh - 69px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;

  &--movement {
    border: 2px dashed #7f56d9;
    background-color: rgba(127, 86, 217, 0.1);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 352px;
  }

  &__img {
    width: 152px;
    height: 118px;
    margin-bottom: 16px;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #101828;
    margin-bottom: 4px;
  }

  &__desc {
    line-height: 143%;
    text-align: center;
    color: #667085;
    margin-bottom: 24px;
  }
}
</style>
