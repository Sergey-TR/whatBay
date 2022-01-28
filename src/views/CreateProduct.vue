<template>
  <div>
    <form class="form-create" method="post" @submit.prevent="createProduct">
      <div class="w-100">
        <div class="select-wrapper">
          <div class="w-100">
            <select v-model="category_id" class="new-shop-list-select">
              <option value="null" disabled selected class="opSelected">Без категории</option>
              <option v-for="option in getCategoryUserId" :key="option.id"
                    :value="option.id">
                {{ option.category_name}}
              </option>
            </select>
          </div>
          <div class="btn-add-product" @click="showModalNewCategory">+</div>
        </div>
        <p class="small p-2">выберите категорию или <br>
          <span class="btn-add-category" @click="showModalNewCategory">добавте новую</span></p>
      </div>
      <div class="w-100">
        <div class="select-wrapper">
          <div class="w-100">
            <select v-model="product" class="new-shop-list-select">
              <option value="null" disabled selected class="opSelected">Выберите продукт</option>
              <option v-for="opProduct in products" :value="opProduct.product_name">
                {{ opProduct.product_name}}
              </option>
            </select>
          </div>
          <div class="btn-add-product" @click="showModalNewProduct">+</div>
        </div>
        <p class="small p-2">выберите продукт или <br>
          <span class="btn-add-category" @click="showModalNewProduct">добавить новый</span>
        </p>
      </div>
      <button class="button btn-add" type="submit">Добавить</button>
    </form>
    <ModalNewCategory v-if="isModalNewCategory"
                      :category_id="this.category_id"
                      :shop="this.shop"
                      :day="this.day"
                      :id="this.id"
                      @closeModalCreateCategory="closeModalCreateCategory"/>
    <ModalNewProduct v-if="isModalNewProduct"
                     :category_id="this.category_id"
                     :shop="this.shop"
                     :day="this.day"
                     :id="this.id"
                     :user_id="this.getUserId"
                     :list_id="this.list_id"
    @closeModalCreateProduct="closeModalCreateProduct"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ModalNewCategory from "../components/modal/ModalNewCategory";
import ModalNewProduct from "../components/modal/ModalNewProduct";
import productFilter from "../filters/product.filter";

export default {
  name: "CreateProduct",
  components: {
    ModalNewCategory,
    ModalNewProduct
  },

  props: ['shop', 'day', 'id', 'list_id'],

  data () {
    return {
      product: 'null',
      category_id: 0,
      isModalNewCategory: false,
      isModalNewProduct: false
    }
  },

  methods: {
    async createProduct() {
      const isProduct = this.getListProducts.filter(item => item.product_name === this.product)
      if (!isProduct.length) {
        const newProduct = {
          category_id: this.category_id,
          day: this.day,
          is_success: false,
          shop_id: this.id,
          shop_name: this.shop,
          order_id: this.id,
          category_name: this.category,
          product_name: this.product,
          user_id: this.getUserId,
          list_id: this.list_id
        }
        try {
          await this.$store.dispatch('createNewOrdersProduct', newProduct)
          await this.$store.dispatch('createNewProduct', newProduct)
          await this.$router.push(`/my_shops_shop/${this.id}/${this.shop}/${this.day}`)
        } catch (e) {}
      } else {
        alert('Продукт есть в списке')
      }
    },

    showModalNewCategory() {
      this.isModalNewCategory = true
    },

    showModalNewProduct() {
      this.isModalNewProduct = true
    },
    closeModalCreateProduct() {
      this.isModalNewProduct = false
    },
    closeModalCreateCategory() {
      this.isModalNewCategory = false
    }
  },

  computed: {
    ...mapGetters
    ([
      'getListProducts',
      'getCategoryUserId',
      'getUserId',
      'getProductUserId'
    ]),

    products() {
      return  productFilter(this.category_id, this.getProductUserId)
    },
  },
  mounted() {}
}
</script>

<style scoped>
  .new-shop-list-select {
    border: 1px solid #c4c4c4;
    background: none;
    outline: none;
    /*min-width: 200px;*/
    width: 100%;
    height: 56px;
    border-radius: 7px;
    padding: 0px 11px;
    color: #242e42;
    --webkit-appearence: none;
    --moz-appearance: none;
    --ms-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L5 5L10 0H0Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: center;
    background-origin: content-box;
  }
  .form-create {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 16px;
  }
  .select-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn-add-category {
    border: none;
    background: none;
    outline: none;
    color: #2C9AB7;
  }
  .btn-add-category:hover {
    color: #2C9AB7;
    font-weight: bold;
    text-decoration: underline;
  }
  .btn-add {
    width: 150px;
    height: 56px;
  }
  .btn-add-product {
    border: 1px solid #2C9AB7;
    background: none;
    outline: none;
    border-radius: 7px;
    color: #2C9AB7;
    width: 50px;
    height: 50px;
    font-size: 32px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-add-product:hover {
    background: #2C9AB7;
    color: #FFFFFF;
  }
</style>