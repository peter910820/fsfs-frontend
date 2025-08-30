<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { initMaterialFormSelect } from "@/composables/useMaterial";
import axios from "axios";

import { getDirectory } from "@/utils/apiHandler";

const router = useRouter();
const directory = ref(null);
let updateDirectory = ref<string | null>(null);
const file = ref<File | null>(null);

onMounted(async () => {
  const response = await getDirectory();
  if (response && response.status === 200) {
    directory.value = response.data.data;
  } else {
    router.push("/error");
  }
  initMaterialFormSelect();
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};

const upload = async () => {
  if (!file.value) {
    alert("請選擇檔案");
    return;
  }
  if (!updateDirectory.value) {
    alert("請選擇上傳資料夾");
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("directory", updateDirectory.value as string);

  try {
    await axios.post(import.meta.env.VITE_API_URL + "/api/upload/" + updateDirectory.value, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("檔案上傳成功！");
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      router.push("/error");
    } else {
      router.push("/error");
    }
  }
};
</script>

<template>
  <div class="row main-block">
    <div class="col s12">
      <h1>資源伺服器目錄</h1>
    </div>
    <div class="col s12 file-field input-field">
      <div class="btn">
        <span><i class="material-icons">upload_file</i></span>
        <input type="file" name="file" @change="handleFileUpload" />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" placeholder="只允許上傳單一檔案" />
      </div>
    </div>
    <div class="col s12 input-field mobile-hidden">
      <select v-model="updateDirectory">
        <option class="validate" value="" disabled selected>選擇資料夾</option>
        <option v-for="(item, index) in directory" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="col s12 input-field mobile-display">
      <select v-model="updateDirectory" class="browser-default">
        <option class="validate" value="" disabled selected>選擇資料夾</option>
        <option v-for="(item, index) in directory" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="col s12">
      <button class="btn waves-effect waves-light" type="button" name="action" @click="upload">
        上傳
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
