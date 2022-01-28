<template>
  <div>
    <div class="shim-user-menu" ref="modal">
      <ul class="user-menu">
        <li class="user-menu-item" @click="closeDropMenu">
          <router-link to="/my_shop">Мои магазины</router-link>
        </li>
        <li class="user-menu-item" @click="closeDropMenu">
          <router-link :to="{name: 'newList', params: {user_id: getUserId}}">Новый список</router-link>
        </li>
        <li class="user-menu-item"><a href="#">Настройки</a></li>
        <li class="user-menu-item" @click="closeDropMenu"><a href="#">Закрыть</a></li>
        <li class="user-menu-exit" @click="logout"><a>Выйти из аккаута</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UserDropMenu",
  methods: {

    closeDropMenu() {
      this.$emit('closeMainMenu')
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.closeDropMenu()
      await this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['getUserId']),
  },
  mounted() {
    let vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['modal']) {
        vm.closeDropMenu()
      }
    })
  }

}
</script>

<style scoped>
.btn-drop {
  border: none;
  outline: none;
  background: white;
  padding-left: 50px;
  padding-bottom: 20px;
}
.user-menu-exit {
  list-style-type: none;
  font-size: 14px;
  padding: 0 16px 0 16px;
}
</style>