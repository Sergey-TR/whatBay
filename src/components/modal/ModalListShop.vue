<template>
  <div class="wrapper-list-shop">
    <slot></slot>
  </div>
</template>

<script>
import Shop from "../shop/Shop";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ModalListShop",
  components: {
    Shop
  }
  //props: ['list'],

  // methods: {
  //   ...mapActions(['getLists'])
  // },
  // computed: {
  //   ...mapGetters(['getListShop'])
  // },
  // mounted() {
  //   this.getLists(nameShop)
  // }

}
</script>

<style>
.wrapper-list-shop {
  display: flex;
  justify-content: space-around;
}
</style>