<template>
  <div>
<!--    :key="reRender"-->
    <div class="main-wrapper flex-center-column">
      <div v-if="dataUserId.length">
        <ShopListItem
          v-for="(shop, idx) in dataUserId"
          :idx = "idx"
          :shop_data = "shop"
        >
        </ShopListItem>
      </div>
      <div v-else>
        <p>У Вас пока нет магазинов и списков</p>
      </div>
      <router-link :to="{name: 'newList', params: {user_id: getUserId}}"
                   class="button btn-new-list">+</router-link>
    </div>
    {{currentLists}}
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
      const lists = this.getListUserId;
     return userData(shops, lists);
    },

   currentLists() {
      const currentData = [];
      for (let data of this.dataUserId) {
       // console.log(data)
        const dataList = []
        for (let list of data.lists) {
         //console.log(list)
          const currentList = []
          if (list.day.split('T')[0] >= getISO(new Date())) {
            currentList.push(list)
           // console.log(currentList)
          }
          //console.log(currentList)
          //dataList.push(currentList)
         // console.log(dataList)
        }
        //console.log(dataList)
        // if (list.day.split('T')[0] >= getISO(new Date())) {
          // currentData.push(dataList)
        // }
      }
      // console.log(currentData)
      return currentData
   }
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