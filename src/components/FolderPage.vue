<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import type { ResponseType } from "@/types/response";

import { getDirectory, getFile } from "@/utils/apiHandler";

const router = useRouter();

const dirData = ref<string[]>([]);
const fileData = ref<string[]>([]);

const expandDetails = async (folder: string) => {
  const apiUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/files?dir=${folder}`
    : `/api/files?dir=${folder}`;
  try {
    const response = await axios.get<ResponseType<string[]>>(apiUrl);
    if (response && response.status === 200) {
      fileData.value = response.data.data;
    } else if (response) {
      router.push("/error");
    } else {
      router.push("/error");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    router.push("/error");
  }
};

const goToUrl = async (url: string) => {
  window.location.href = import.meta.env.VITE_API_URL + "/" + url;
};

onMounted(async () => {
  let response = await getDirectory();
  if (response && response.status === 200) {
    dirData.value = response.data.data;
  } else if (response) {
    router.push("/error");
  } else {
    router.push("/error");
  }
  response = await getFile();
  if (response && response.status === 200) {
    fileData.value = response.data.data;
  } else if (response) {
    router.push("/error");
  } else {
    router.push("/error");
  }
});
</script>

<template>
  <div class="row main-block">
    <h1 class="center">伺服器資源</h1>
    <div class="col l4 m12 s12 file-block input-field">
      <div class="row">
        <div class="col s12 folder-block-title">📁選擇資料夾</div>
        <div class="col s12 folder" v-for="(item, index) in dirData" :key="index" :value="item">
          <input type="button" class="button-folder" @click="expandDetails(item)" :value="item" />
        </div>
      </div>
    </div>
    <div class="col l8 m12 s12 file-block input-field">
      <div class="row">
        <div class="col s12 file-block-title">📃資料夾內容</div>
        <div
          class="col s12 wow animate__fadeInRightBig floatup-div file ellipsis"
          @click="goToUrl(item)"
          v-for="(item, index) in fileData"
          :key="index"
          :value="item"
        >
          <a>
            <div v-if="(item as string).endsWith('.png') || (item as string).endsWith('.jpg')">
              🖼️{{ item as string }}
            </div>
            <div v-else>📃{{ item as string }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  font-size: 25px;
}
.center {
  text-align: center;
}
.folder {
  margin-top: 10px;
  > input {
    width: 150px;
    height: 50px;
    font-size: 20px;
  }
}
.file {
  border: 2px solid skyblue;
  border-radius: 100px;
  margin-bottom: 10px;
  padding: 20px;
  cursor: pointer;
}
.folder-block-title {
  font-size: 30px;
}
.file-block-title {
  font-size: 30px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
