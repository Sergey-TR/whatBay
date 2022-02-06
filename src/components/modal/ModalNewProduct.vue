<template>
  <div>
    <div class="shim-user-menu" ref="modal">
      <div class="w-100 h-100 bg-white px-3 pt-4 pb-4">
        <div class="closeIcon">
          <router-link to="/">
            <img class="logo" src="../../assets/img/logo1.svg" alt="" />
          </router-link>
          <b-icon
            icon="plus-circle"
            rotate="45"
            variant="secondary"
            @click="closeDropMenu"
          ></b-icon>
        </div>
        <div class="w-100 mt-2">
          <h5 class="mb-4">Новый продукт</h5>
          <div class="w-100 modalAddProduct">
            <label for="ctegory_name" class="label_category">Категория</label>
            <input
              type="text"
              id="ctegory_name"
              class="inputAddProduct"
              :value="getCategoryName"
            />
            <form class="w-100" method="post" @submit.prevent="createProduct">
              <input
                type="text"
                class="inputAddProduct"
                placeholder="введите наименование продукта"
                v-model="product"
              />
              <button class="button btn-add" type="submit">Добавить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ModalNewProduct",

  props: ["shop", "day", "id", "category_id", "user_id", "list_id"],

  data() {
    return {
      product: "",
    };
  },

  methods: {
    closeDropMenu() {
      this.$emit("closeModalCreateProduct");
    },
    async createProduct() {
      const isProduct = this.getListProducts.filter(
        (item) => item.product_name === this.product
      );
      if (!isProduct.length) {
        const newProduct = {
          category_id: this.category_id,
          day: this.day,
          is_success: false,
          shop_id: this.id,
          shop_name: this.shop,
          order_id: this.id,
          category_name: this.getCategoryName,
          product_name: this.product,
          user_id: this.user_id,
          list_id: this.list_id,
        };
        try {
          await this.$store.dispatch("createNewOrdersProduct", newProduct);
          await this.$store.dispatch("createNewProduct", newProduct);
          await this.$router.push(
            `/my_shops_shop/${this.id}/${this.shop}/${this.day}`
          );
        } catch (e) {}
      } else {
        alert("Продукт есть в списке");
      }
    },
  },
  computed: {
    ...mapGetters(["getAllCategories", "getListProducts", "getCategoryUserId"]),

    getCategoryName() {
      const categoryName = this.getCategoryUserId.find(
        (name) => name.id === this.category_id
      );
      return categoryName.category_name;
    },
  },
};
</script>

<style scoped>
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
.closeIcon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
}
.label_category {
  display: flex;
  align-self: self-start;
}
</style>