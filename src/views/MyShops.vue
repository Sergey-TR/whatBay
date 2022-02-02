<template>
  <div>
    <div class="section-heading section-heading-with-button">
      <h3 class="h3">Мои магазины</h3>
      <div class="group-control-buttons">
        <!-- <img class="button-pic" src="../assets/img/settings.svg" alt="settings" @click="showChoiceMenu"> -->

        <router-link to="/calendar">
          <img
            class="button-pic"
            src="../assets/img/calendar.svg"
            alt="calendar"
          />
        </router-link>
      </div>
    </div>
    <ChoiceMenu v-if="isVisible" @closeDropMenu="closeDropMenu"></ChoiceMenu>
    <MyShops :idUser="getUserId" />
  </div>
</template>

<script>
import MyShops from "../components/shop/MyShops";
import ChoiceMenu from "../components/modal/ChoiceMenu";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Shops",

  data() {
    return {
      isVisible: false,
    };
  },

  components: {
    MyShops,
    ChoiceMenu,
  },
  methods: {
    showChoiceMenu() {
      this.isVisible = true;
    },
    closeDropMenu() {
      this.isVisible = false;
    },
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
};
</script>

<style>
.dropList {
}
</style>