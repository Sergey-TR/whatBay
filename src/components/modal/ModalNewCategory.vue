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
          <h5 class="mb-4">Создать новую категорию</h5>
          <div class="w-100 modalAddProduct">
            <form class="w-100" method="post" @submit.prevent="createCategory">
              <input type="text" class="inputAddProduct" placeholder="введите наименование категории"
                     v-model="nameCategory">
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
  name: "ModalNewCategory",

  props: ['shop', 'day', 'id', 'category_id'],

  data() {
    return {
      nameCategory: ''
    }
  },

  methods: {
    closeDropMenu() {
      this.$emit('closeModalCreateCategory')
    },
    ...mapActions(['getCategories', 'getCategoryFromUserId']),
    async createCategory() {
      const isCategory = this.getAllCategories.filter(item => item.category_name === this.nameCategory)
      if (!isCategory.length) {
        const newCategory ={
          category_name: this.nameCategory,
          user_id: this.getUserId
        }
        const id = {
          id: this.getUserId
        }
        console.log(newCategory)
        try {
          await this.$store.dispatch('createNewCategory', newCategory)
          console.log('after createNewCategory')
          await this.closeDropMenu()
          await this.$store.dispatch('getCategoryFromUserId', id)
          await this.getCategories()

        } catch (e) {}
      } else {
        alert('Категория есть в списке')
      }
    }
  },

  computed: {
    ...mapGetters(['getAllCategories', 'getUserId'])
  },
  // mounted() {
  //   this.getCategories()
  // }
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