<template>
  <div>
    <div class="shim-user-menu" ref="modal">
      <div class="w-100 h-100 bg-white px-3 pt-4 pb-4">
        <div class="closeIcon">
          <router-link to="/">
            <img class="logo" src="../../assets/img/logo1.svg" alt="">
          </router-link>
          <b-icon icon="plus-circle" rotate="45" variant="secondary" @click="closeDropMenu"></b-icon>
        </div>
        <div class="w-100 mt-2">
          <h5 class="mb-4">Добавить магазин</h5>
          <div class="w-100 modalAddProduct">
            <form class="w-100" method="post" @submit.prevent="createShop">
              <input type="text" class="inputAddProduct" placeholder="введите наименование магазина"
                     v-model="nameShop">
              <button class="button btn-add" type="submit">Создать</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ModalNewShop",

  props: ['user_id'],

  data() {
    return {
      nameShop: ''
    }
  },

  methods: {
    closeDropMenu() {
      this.$emit('closeModalCreateShop')
    },

    ...mapActions(['getOptionsList']),

    async createShop() {
      const shop = {
        shop_name: this.nameShop,
        user_id: this.user_id
      }
      const uId = {
        id: this.user_id
      }
      try {
        await this.$store.dispatch('createNewShop', shop)
        //await this.$router.push('/newList')
        this.closeDropMenu()
        await this.$store.dispatch('getShopFromUserId', uId)
        //this.getOptionsList()
      } catch (e) {}
    }
  },
  computed: {
    ...mapGetters(['getShopsOptionList'])
  }
}
</script>

<style scoped>
.closeIcon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
}
.modalAddProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-add {
  width: 150px;
  height: 56px;
}
.inputAddProduct {
  border: 1px solid #c4c4c4;
  background: none;
  outline: none;
  /*min-width: 200px;*/
  width: 100%;
  height: 56px;
  border-radius: 7px;
  padding: 0px 11px;
  color: #242e42;
  margin-bottom: 32px;
}
</style>