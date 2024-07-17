import {
  defineStore
} from "pinia";
import {
  ref
} from 'vue';
import {
  getStorage,
  ref as refFb,
  uploadBytes,
  listAll,
  getMetadata,
  deleteObject,
  getDownloadURL
} from "firebase/storage";
import router from "../router";

export const useFileStore = defineStore('fileStore', () => {
  const files = ref([]);
  const loader = ref(false);

  const setFile = async (file) => {
    const storage = getStorage();
    const storageRef = refFb(storage, 'files/' + file.name);
    loader.value = true;

    await uploadBytes(storageRef, file).then((snapshot) => {
      let urlCurrnet = '';
      getDownloadURL(storageRef).then(url => {
        urlCurrnet = url;
      });
      const object = {
        name: snapshot.metadata.name,
        size: snapshot.metadata.size,
        timeCreated: snapshot.metadata.timeCreated,
        url: urlCurrnet
      }
      files.value.push(object);
      if (files.value.length > 0) {
        router.push('/');
      }
      loader.value = false;
    }).catch((error) => {
      console.log(error)
      loader.value = false;
    });
  };



  const onChoiceFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
  };


  const onDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const file = e.dataTransfer.files[0];
    setFile(file);
  }



  const getListFiles = async () => {
    const storage = getStorage();
    const listRef = refFb(storage, 'files/');

    loader.value = true;

    const listResult = await listAll(listRef)

    if (listResult.items.length === 0) {
      router.push('/upload-files');
    }

    listResult.items.forEach(item => {
      let urlCurrnet = '';
      getDownloadURL(item).then(url => {
        urlCurrnet = url;
      });
      getMetadata(item)
        .then((metadata) => {
          const object = {
            name: metadata.name,
            size: metadata.size,
            timeCreated: metadata.timeCreated,
            url: urlCurrnet
          }
          files.value.shift();
          files.value.push(object);
          loader.value = false;
        })
        .catch((error) => {
          console.log(error);
          loader.value = false;
        });
    })
  }

  const deleteFile = async (name) => {
    files.value = files.value.filter(item => item.name !== name);

    const storage = getStorage();
    const desertRef = refFb(storage, 'files/' + name);
    await deleteObject(desertRef).then((res) => {
      if (files.value.length === 0) {
        router.push('/upload-files');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return {
    files,
    loader,
    setFile,
    onChoiceFile,
    getListFiles,
    onDrop,
    deleteFile,
  }
})