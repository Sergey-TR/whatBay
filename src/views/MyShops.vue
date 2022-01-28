<template>
<div>
  <div class="section-heading section-heading-with-button">
    <h3 class="h3">Мои магазины</h3>
    <div class="group-control-buttons">
      <img class="button-pic" src="../assets/img/settings.svg" alt="settings">
      <router-link to="/calendar">
        <img class="button-pic" src="../assets/img/calendar.svg" alt="calendar">
      </router-link>
    </div>
  </div>
  <MyShops :idUser="getUserId"/>
</div>
</template>

<script>
import MyShops from "../components/shop/MyShops";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Shops",

  // data() {
  //   return {
  //     UserId: ''
  //   }
  // },

  components: {
    MyShops
  },
  methods: {
   // ...mapActions(['currentUser'])
   //  forceRender() {
   //    this.UserId = this.getUserId
   //  }
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  //  mounted() {
  // //   console.log('viewMshop')
  //   this.forceRender()
  //  }

}
</script>

<style>

.dropList {

}
</style>