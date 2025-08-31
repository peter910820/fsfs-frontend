<template>
  <div class="main-style">
    <div class="sticky-navbar">
      <NavBar />
    </div>
    <div class="row">
      <div class="col m12 m12 s12">
        <router-view />
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h1>登入</h1>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" v-model="form.username" type="text" class="validate" required />
                <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
                <label for="icon_prefix">username</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input id="icon_lock" v-model="form.password" type="password" class="validate" required />
                <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
                <label for="icon_lock">password</label>
              </div>
              <div>
                <button @click="handleSubmit" class="modal-close btn waves-effect waves-light" type="button">
                  點我登入
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { ResponseType } from "@/types/response";

const router = useRouter();
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  margin-bottom: 0px !important;
}

.main-style {
  min-height: 100vh;
  min-width: 600px;
  font-family: "madoufmg";

  background-color: #f2ebea;
  background-size: 400% 400%;
}

.modal {
  border: 2px transparent f2ebea !important;
  border-radius: 20px !important;
  max-width: 800px;
}

.modal-content {
  background-color: #f2ebea;
}

.row {
  height: 100%;
  margin-bottom: 0px !important;
  padding: 30px;
}
.main-block {
  padding: 40px;
}
.sub-block {
  padding-top: 20px;
  margin-top: 10px;
  cursor: default !important;
  border: 2px solid f2ebea;
  border-radius: 20px;
}
.sticky-navbar {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.browser-default {
  background-color: #f2ebea;
  border: 0px;
  border-bottom: 1px solid rgb(118, 118, 118);
}
/* hide materializecss select in mobile */
.mobile-hidden {
  display: block !important;
}
.mobile-display {
  display: none !important;
}
@media (max-width: 768px) {
  .mobile-display {
    display: block !important;
  }
  .mobile-hidden {
    display: none !important;
  }
}
/* font-settings */
@font-face {
  font-family: "madoufmg";
  src: url("@/assets/fonts/madoufmg.ttf") format("truetype");
}
</style>
