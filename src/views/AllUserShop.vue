<template>
  <div>
    <div class="section-heading section-heading-with-button">
      <h3 class="h3">Мои магазины</h3>
      <div class="group-control-buttons">
        <!-- <img
          class="button-pic"
          src="../assets/img/settings.svg"
          alt="settings"
        /> -->

        <router-link to="/calendar">
          <img
            class="button-pic"
            src="../assets/img/calendar.svg"
            alt="calendar"
          />
        </router-link>
      </div>
    </div>
    <div>
      <h5 class="h5">все мои списки</h5>
      <ShopListItem
              v-for="(shop, idx) in dataUserAllShops"
              :idx = "idx"
              :shop_data = "shop"
              :key="idx"
          >
          </ShopListItem>
    </div>
  </div>
</template>

<script>
import ShopListItem from "../components/shop/ShopListItem"
import { mapGetters } from "vuex";
import userData from "../components/composables/userData"

export default {
  name: "AllUserShop",

  components: {
    ShopListItem
  },

  data() {
    return {
      isVisibleListShops: false
    }
  },

  computed: {
    ...mapGetters(["getShopUserId", "getListUserId", "getUser", "getQty"]),

    dataUserAllShops() {
      const shops = this.getShopUserId;
      const lists = this.getListUserId;
      const allListsDate = userData(shops, lists);
      return allListsDate
    }
  },

  methods: {} 
};
</script>

<style>
.h5 {
  margin-bottom: 20px;
  color: dimgrey;
  border-bottom: 1px solid dimgrey;
}
</style>
