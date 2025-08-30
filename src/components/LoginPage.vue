<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
// import { useUserStore } from "@/store/user";
// import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import type { ResponseType } from "@/types/response";

const router = useRouter();
// const userStore = useUserStore();
// const { user } = storeToRefs(userStore);
const form = ref({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_TEST_URL ? `${import.meta.env.VITE_API_TEST_URL}/api/login` : "/api/login";
    const response = await axios.post<ResponseType<string>>(apiUrl, form.value, {
      withCredentials: true,
    });
    sessionStorage.setItem("msg", response.data.msg); // ?
    // userStore.set(response.data.data);
    router.push("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
      router.push("/error");
    } else {
      sessionStorage.setItem("msg", String(error));
      router.push("/error");
    }
  }
};
</script>

<template>
  <div class="row main-block">
    <h1>登入</h1>
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" v-model="form.username" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
          <label for="icon_prefix">username</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="icon_lock" v-model="form.password" type="password" class="validate" required />
          <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
          <label for="icon_lock">password</label>
        </div>
        <div class="col s12">
          <button @click="handleSubmit" class="btn waves-effect waves-light" type="button">
            點我登入
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col {
  margin: 20px;
}
.row {
  margin-bottom: 0px !important;
}
.sub-block {
  min-height: 250px;
  height: auto;
}
</style>
