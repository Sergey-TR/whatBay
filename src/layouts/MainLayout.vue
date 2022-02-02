<template>
  <div class="main-wrapper p-3">
    <UserDropMenu v-if="isMainMenuVisible" @closeMainMenu="closeMainMenu"/>
    <UserNoLoginMenu v-if="isNoLoginMenu" @closeMainMenu="closeMainMenu"/>
    <header class="header">
      <div class="header-left">
        <router-link to="/">
          <img class="logo" src="../assets/img/logo1.svg" alt="">
        </router-link>
      </div>
      <div class="header-right">
        <div class="layout-list" v-if="isUser" @click="showMainMenu">
          <span class="avatar-letter">{{ getUser[0].user_name[0] }}</span>
        </div>
        <div v-else>
          <b-icon icon="person" class="layout-list" @click="showNoLoginMenu"></b-icon>
        </div>
      </div>
    </header>
    <main>
      <div class="main-content">
        <router-view>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import UserDropMenu from "../components/modal/UserDropMenu";
import UserNoLoginMenu from "../components/modal/UserNoLoginMenu";

export default {
  name: "MainLayout",

  components: {
    UserNoLoginMenu,
    UserDropMenu
  },

  data() {
    return {
       isMainMenuVisible: false,
       isNoLoginMenu: false,
    }
  },

  async mounted() {
    if(!Object.keys(this.getUser).length) {
      await this.currentUser()
    }
  },

  methods: {
    ...mapActions(['currentUser']),

    showMainMenu() {
      this.isMainMenuVisible = true
    },
    showNoLoginMenu() {
      this.isNoLoginMenu = true
    },
    closeMainMenu() {
      this.isMainMenuVisible = false
      this.isNoLoginMenu = false
    },
  },
  computed: {
   ...mapGetters(['getUser', 'getUserId', 'userId']),
    isUser() {
      if(!Object.keys(this.getUser).length) {
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style>
.main-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.main-content {
  margin-top: 27px;
}
.header {
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
}

.logo {
  width: 95px;
}

.header-right {
  display: flex;
  align-items: center;
}
.layout-list  {
  width: 32px;
  height: 32px;
  background: gray;
  border-radius: 7px;
  opacity: .4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-letter {
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}
.section-heading {
  width: 100%;
  margin-bottom: 23px;
}

.section-heading-with-button {
  display: flex;
  justify-content: space-between;
}
.h3 {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}
.button-pic {
  padding: 0px 10px;
}
.button {
  border: none;
  border-radius: 10px;
  outline: none;
  background: #2C9AB7;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  color: #FFFFFF;
  font-size: 14px;
  justify-content: center;
}
.button:hover {
  cursor: pointer;
}
.button:active {
  background: #428294;
}
.shim-user-menu {
  /*display: none;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
}

.shim-modal-show {
  display: block;
}

.user-menu {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-left: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 160px;
  background-color: #ffffff;
  position: absolute;
  right: 16px;
  top: 10px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
}

.user-menu-item {
  list-style-type: none;
  font-size: 14px;
  line-height: 48px;
  padding: 0 16px 0 16px;
}

.user-menu > li > a {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 600;
  display: block;
}
</style>