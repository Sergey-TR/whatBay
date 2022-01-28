<template>
  <div>
  <div class="wrapper-shop">
          <div class="shopData">
            <div class="shopName" @click="showDropListShops">
              {{ shop_data.shop_name }}
            </div>
            <div class="qtyList" @click="showDropListShops">
              {{ shop_data.lists.length }} список
            </div>
          </div>
          <div class="show-shop-lists" v-if="!isVisibleListShops" @click="showDropListShops">
              <img src="../../assets/img/showListShop.png">
          </div>
          <div class="close-shop-lists" v-else @click="closeDropListShops">
              <img src="../../assets/img/closeListShop.png">
          </div>
  </div>
    <div  v-for="(list, idx) in shop_data.lists">
      <ListShop  v-if="isVisibleListShops">
        <router-link class="wrapper-list"
                     :to="{name: 'shop', params:{ id: shop_data.shop_id,
                          shop: shop_data.shop_name, day: list.day, listId: list.list_id}}">
          <div class="wrap-list-day-name">
            <div class="shop-data">{{ list.day | date('short') }}</div>
            <div class="shop-name">{{ list.list_name }}</div>
          </div>
          <div class="wrap-qty">
            <div class="qty-list">
              {{ purchase(list.list_id, shop_data.shop_id, list.day) }}/
            </div>
            <div class="qty-list">
              {{quantity(list.list_id, shop_data.shop_id, list.day)}}
            </div>
          </div>
          <div class="wrap-group">
            <div class="ava">A</div>
            <div class="ava">B</div>
            <div class="ava">K</div>
          </div>
        </router-link>
      </ListShop>
    </div>
<!--    {{getQty}}-->
  </div>
</template>

<script>
import ListShop from "../modal/ModalListShop";
import {mapGetters} from "vuex";

export default {
  name: "ShopListItem",
  components: {
    ListShop,
  },
  props: ['shop_data'],
  data() {
    return {
      isVisibleListShops: false,
      listId: ''
    }
  },
  methods: {
    showDropListShops() {
        this.isVisibleListShops = true
    },
    closeDropListShops() {
      this.isVisibleListShops = false
    },
    async getUserOrders() {
      const userId = {
        user_id: localStorage.getItem('saveUserId')
      }
      await this.$store.dispatch('getOrderUser', userId)
    },
    quantity(listId, shopId, listDay) {
      let count = 0;
      for (let list of this.getQty) {
        if (list.day === listDay && list.list_id === listId && list.shop_id === shopId) {
          count += 1
        }
      }
      return count
    },
    purchase(listId, shopId, listDay) {
      let count = 0
      for (let list of this.getQty) {
        if (list.day === listDay && list.list_id === listId &&
            list.shop_id === shopId && list.is_success === true) {
          count +=1
        }
      }
      return count
    }
  },

  mounted() {
    this.getUserOrders()
  },

  computed: {
    ...mapGetters(['getUserId', 'getListProducts', 'getQty']),
  }

}
</script>

<style>
.wrapper-shop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.shopData {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shopName {
  min-width: 180px;
}
.wrapper-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: black;
  margin-bottom: 10px;
  padding-left: 15px;
}
.shop-data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30px;
}
.shop-name {
  min-width: 110px;
  padding-left: 20px;
}
.wrap-list-day-name, .wrap-qty, .wrap-group {
  display: flex;
  align-items: center;
}
.ava {
  width: 18px;
  height: 18px;
  background: #c4c4c4;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #FFFFFF;
  margin-left: 11px
}
</style>