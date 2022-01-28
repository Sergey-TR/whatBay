<template>
  <div>
    <div class="shim-user-menu" ref="modal">
      <ul class="choice-menu">
        <li class="choice-menu-item">
          <router-link to="/" class="choice-a">По спискам</router-link>
        </li>
        <li class="choice-menu-item">
          <router-link to="/my-shop" class="choice-a">По товарам</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceMenu",

  methods: {
    closeDropMenu() {
      this.$emit('closeDropMenu')
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

<style scoped>
.choice-menu {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-left: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 138px;
  background-color: #ffffff;
  position: absolute;
  right: 16px;
  bottom: 8px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
              0px 8px 10px 1px rgb(0 0 0 / 14%),
              0px 3px 14px 2px rgb(0 0 0 / 12%);
}
.choice-menu-item {
  list-style-type: none;
  font-size: 14px;
  line-height: 48px;
  padding: 0 16px 0 16px;
  text-align: right;
}
.choice-a {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 600;
  display: block;
}
</style>