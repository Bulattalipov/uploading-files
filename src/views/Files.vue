<script setup>
import InputFile from '../components/InputFile.vue';
import FileItem from '../components/FileItem.vue';
import { useFileStore } from '../stores/FileStore';
import { onMounted } from 'vue';
import Loader from '../components/Loader.vue';

const fileStore = useFileStore();

onMounted(() => fileStore.getListFiles());
</script>

<template>
  <div class="files">
    <div class="files-top">
      <div class="container">
        <div class="files-top__inner">
          <div class="files-top__text">Files uploaded</div>
          <InputFile>Upload</InputFile>
        </div>
      </div>
    </div>
    <div class="files-table">
      <div class="files-table__top">
        <div class="container">
          <div class="files-table__top-inner">
            <div class="files-table__top-name">File name</div>
            <div class="files-table__top-size">File size</div>
            <div class="files-table__top-data">Date uploaded</div>
            <div class="files-table__top-empty"></div>
          </div>
        </div>
      </div>
      <Loader v-if="fileStore.loader" />
      <div v-else class="files-table__items">
        <FileItem
          v-for="(item, index) of fileStore.files"
          :key="index"
          :name="item.name"
          :size="item.size"
          :timeCreated="item.timeCreated"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.files-table {
  overflow-x: auto;
  min-height: calc(100vh - 83px);

  &__top {
    min-width: fit-content;
  }

  &__top-inner {
    height: 40px;
    display: flex;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: #667085;
  }

  &__top-name {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 400px;
  }

  &__top-size {
    padding: 12px 24px;
    min-width: 176px;
  }

  &__top-data {
    padding: 12px 24px;
    min-width: 176px;
  }

  &__top-empty {
    padding: 12px 24px;
    min-width: 68px;
  }

  &__items {
  }
}

.files-top {
  padding: 20px 0 20px;

  &__text {
    font-weight: 500;
    font-size: 18px;
    line-height: 156%;
    color: #101828;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-file {
    width: auto;
  }
}
</style>
