import {
  createRouter,
  createWebHistory
} from "vue-router";
import UploadFiles from "../views/UploadFiles.vue";
import Files from "../views/Files.vue";

const routes = [{
    path: '/',
    name: 'Files',
    component: Files,
  },
  {
    path: '/upload-files',
    name: 'UploadFiles',
    component: UploadFiles,
  }
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})

export default router;