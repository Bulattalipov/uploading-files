<script setup>
import { computed } from 'vue';
import { useFileStore } from '../stores/FileStore';
import { ref } from 'vue';

const fileStore = useFileStore();
const tooltipActive = ref(false);

defineProps({
  name: String,
  size: Number,
  timeCreated: String,
});

const changeType = (textWithType) => {
  if (!textWithType) return;

  const index = textWithType.lastIndexOf('.');
  const type = textWithType.slice(index + 1);

  let typeName = '';

  switch (type) {
    case 'pdf':
    case 'docx':
      typeName = 'docum.svg';
      break;
    case 'png':
    case 'jpg':
    case 'svg':
      typeName = 'image.svg';
      break;
    case 'mp4':
      typeName = 'video.svg';
      break;
    case 'fig':
      typeName = 'figma.svg';
      break;
    case 'frammerx':
      typeName = 'frammer.svg';
      break;
    default:
      typeName = 'docum.svg';
  }

  return typeName;
};

const onTooltipActive = () => {
  if (tooltipActive.value) {
    tooltipActive.value = false;
  } else {
    tooltipActive.value = true;
  }
};

const sizeTotal = (size) => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    const sizeChange = size / 1024;
    return sizeChange.toFixed(1) + ' KB';
  } else {
    const sizeChange = size / (1024 * 1024);
    return sizeChange.toFixed(1) + ' MB';
  }
};

const transformationDate = (time) => {
  const date = new Date(time);
  return (
    date.toLocaleString('en-US', { month: 'short' }) +
    ' ' +
    date.getDay() +
    ', ' +
    date.getFullYear()
  );
};

const download = (url) => {
  window.location.href = url;
};
</script>

<template>
  <div class="file-item">
    <div class="container">
      <div class="file-item__inner">
        <div class="file-item__icon">
          <div class="file-item__icon-inner">
            <img :src="'/assets/img/types/' + changeType(name)" alt="" />
          </div>
        </div>
        <div class="file-item__title">{{ name }}</div>
        <div class="file-item__size">{{ sizeTotal(size) }}</div>
        <div class="file-item__date">{{ transformationDate(timeCreated) }}</div>
        <div class="file-item__tooltip">
          <img
            @click="onTooltipActive()"
            class="file-item__tooltip-img"
            src="/assets/img/dropdown.svg"
            alt=""
          />
          <ul class="file-item__tooltip-list" :class="{ 'tooltip-active': tooltipActive }">
            <li @click="fileStore.deleteFile(name)" class="file-item__tooltip-item">Удалить</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-item {
  min-width: fit-content;
  border-top: 1px solid #eaecf0;

  &:nth-child(odd) {
    background: #f9fafb;
  }

  &__inner {
    display: flex;
    align-items: center;
    padding: 16px 0;
    min-height: 72px;
  }

  &__icon {
    width: 52px;
    flex-shrink: 0;
  }

  &__icon-inner {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: #f4ebff;
  }

  &__title {
    display: flex;
    align-items: center;
    flex: 1;
    font-weight: 500;
    line-height: 143%;
    color: #101828;
    min-width: 348px;
  }

  &__size {
    padding: 16px 24px;
    min-width: 176px;
    line-height: 143%;
    color: #667085;
  }

  &__date {
    padding: 16px 24px;
    min-width: 176px;
    line-height: 143%;
    color: #667085;
  }

  &__tooltip {
    position: relative;
    min-width: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
  }

  &__tooltip-img {
    cursor: pointer;
  }

  &__tooltip-list {
    display: none;
    position: absolute;
    background-color: #fff;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dde0e7;

    &.tooltip-active {
      display: block;
    }
  }

  &__tooltip-item {
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: #dde0e7;
    }
  }
}
</style>
