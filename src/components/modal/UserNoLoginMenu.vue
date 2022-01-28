<template>
  <div>
    <div class="shim-user-menu" ref="modal">
      <ul class="user-menu">
        <li class="user-menu-item"><a href="#">О приложении</a></li>
        <li class="user-menu-item" @click="closeDropMenu">
          <router-link to="/login">
            Войти
          </router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserNoLoginMenu",
  methods: {
    closeDropMenu() {
      this.$emit('closeMainMenu')
    }
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

<style>

</style>