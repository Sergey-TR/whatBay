<template>
  <div>
    <div class="section-heading section-heading-with-button">
      <h3 class="h3">Создать новый список</h3>
    </div>
    <form method="post" class="form-new-shop-list" @submit.prevent="createList">
      <div class="w-100">
        <div class="select-wrapper">
          <div class="w-100">
            <select v-model="shop_id" class="new-shop-list-select">
              <option value="null" disabled selected class="opSelected">
                Выберите магазин
              </option>
              <option
                v-for="option in getShopUserId"
                :key="option.id"
                :value="option.id"
              >
                {{ option.shop_name }}
              </option>
            </select>
          </div>
          <div class="btn-add-product" @click="showModalNewShop">+</div>
        </div>
        <p class="small p-2">
          выберите магазин или
          <span class="btn-add-category" @click="showModalNewShop"
            >добавте новый</span
          >
        </p>
        <input
          type="text"
          class="inputAddProduct"
          placeholder="введите наименование списка"
          v-model="listName"
        />
        <b-form-datepicker
          id="dp"
          v-model="dateList"
          :min="min"
          locale="ru"
          selected-variant="info"
          placeholder="Дата"
          :date-format-options="{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }"
          size="lg"
        ></b-form-datepicker>
        <label for="dp" class="small p-2">выберите дату</label>
        <div class="select-wrapper">
          <div class="w-100">
            <select class="new-shop-list-select">
              <option>Добавить участника</option>
            </select>
          </div>
          <div class="btn-add-product">+</div>
        </div>
        <p class="small p-2">example@mail.ru</p>
      </div>
      <button class="button btn-add" type="submit">Добавить</button>
    </form>
    <ModalNewShop
      v-if="isModalNewShop"
      @closeModalCreateShop="closeModalCreateShop"
      :user_id="this.user_id"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalNewShop from "../components/modal/ModalNewShop";

export default {
  name: "CreateList",

  components: {
    ModalNewShop,
  },

  props: ["user_id"],

  data() {
    return {
      shop_id: "null",
      listName: "",
      dateList: "",
      min: new Date(),
      isModalNewShop: false,
    };
  },
  watch: {
    dateList() {},
  },
  methods: {
    ...mapActions(["getOptionsList", "allLists"]),
    async createList() {
      const list = {
        list_name: this.listName,
        shop_id: this.shop_id,
        created_at: new Date(this.dateList),
        user_id: this.user_id,
      };
      try {
        await this.$store.dispatch("createNewList", list);
        await this.$router.push("/my_shop");
      } catch (e) {}
    },
    showModalNewShop() {
      this.isModalNewShop = true;
    },
    closeModalCreateShop() {
      this.isModalNewShop = false;
    },
  },
  computed: {
    ...mapGetters([
      "getShopsOptionList",
      "getAllCategories",
      "getAllLists",
      "getShopUserId",
    ]),
  },
  async mounted() {
    await this.getOptionsList();
    await this.allLists();
  },
};
</script>

<style>
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
.select-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-add-category {
  border: none;
  background: none;
  outline: none;
  color: #2c9ab7;
}
.btn-add-category:hover {
  color: #2c9ab7;
  font-weight: bold;
  text-decoration: underline;
}
.btn-add-product {
  border: 1px solid #2c9ab7;
  background: none;
  outline: none;
  border-radius: 7px;
  color: #2c9ab7;
  width: 50px;
  height: 50px;
  font-size: 32px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-add-product:hover {
  background: #2c9ab7;
  color: #ffffff;
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
.btn-add {
  width: 150px;
  height: 56px;
}
</style>