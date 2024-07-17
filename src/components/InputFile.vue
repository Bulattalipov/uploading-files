<script setup>
import { useFileStore } from '../stores/FileStore';

const fileStore = useFileStore();
</script>

<template>
  <label class="input-file"
    ><input type="file" @change="fileStore.onChoiceFile($event)" /><img
      src="/assets/img/upload-cloud.svg"
      alt="" /><slot></slot
  ></label>
</template>

<style scoped lang="scss">
.input-file {
  display: flex;
  justify-content: center;
  gap: 8.84px;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  background: #7f56d9;
  border: 1px solid #7f56d9;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 143%;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: grey;
  }
}

input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
}
</style>
