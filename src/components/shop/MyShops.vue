<template>
  <div>
<!--    :key="reRender"-->
    <div class="main-wrapper flex-center-column">
      <div v-if="dataUserId.length">
        <ShopListItem
          v-for="(shop, idx) in dataUserId"
          :idx = "idx"
          :shop_data = "shop"
          :key="idx"
        >
        </ShopListItem>
      </div>
      <div v-else>
        <p>У Вас пока нет магазинов и списков</p>
      </div>
      <router-link :to="{name: 'newList', params: {user_id: getUserId}}"
                   class="button btn-new-list">+</router-link>
    </div>
  </div>
</template>

<script>
import ShopListItem from "./ShopListItem";
import {mapActions, mapGetters} from "vuex";
import userData from "../composables/userData";
import getISO from "../composables/getISO";

export default {
  name: "MyShops",

  components: {
    ShopListItem
  },

  props: ['idUser'],

  methods: {
    getId () {
      const user_id = {
        id: localStorage.getItem('saveUserId')
      }
      return user_id
    },
    currentLists() { 
      new Date().setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset())
      const thisDay = new Date().toISOString().split('T')[0]
      const currentData = []
      for (let list of this.getListUserId ) {
        let listByDay = list.created_at.split('T')[0]
        if (listByDay >= thisDay) {
          currentData.push(list)
        }
      }
      return currentData
   }
  },
  computed: {
    ...mapGetters
    ([
      'getShopsList',
      'getUser',
      'getShopUserId',
      'getUserId',
      'getShopsOptionList',
      'getListUserId',
      'getProductUserId',
      'getCategoryUserId',
        'userId'
    ]),

   dataUserId() {
      const shops = this.getShopUserId;
      const lists = this.currentLists();
      const allListsDate = userData(shops, lists);
      const haveList = [];
      for (let list of allListsDate) {
        if (list.lists.length) {
          haveList.push(list)
        }
      }
      return haveList;
    },
  },
  async beforeUpdate() {
    if (!Object.keys(this.getUser).length) {
      await this.$store.dispatch('currentUser')
    }

  },
  async mounted() {
    await this.$store.dispatch('getShopFromUserId', this.getId())
    await this.$store.dispatch('getListFromUserId', this.getId())
    await this.$store.dispatch('getCategoryFromUserId', this.getId())
    await this.$store.dispatch('getProductFromUserId', this.getId())

  },

}
</script>

<style scoped>
  .btn-new-list {
    width: 32px;
    height: 32px;
    font-size: 32px;
    position: fixed;
    right: 16px;
    bottom: 32px;
  }
</style>