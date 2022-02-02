<template>
  <div>
    <div class="shop-heading">
      <div class="shop-back">
        <router-link to="/my_shop">
          <img src="../../assets/img/arrowLeft.svg" />
        </router-link>
      </div>
      <div class="shop-title">
        <div class="shop-title-name">{{ this.shop }}</div>
        <div class="shop-title-date">{{ this.day | date("short") }}</div>
      </div>
      <div class="qtyProducts">
        <div class="shop-qty-purchase">{{ purchase.length }}/</div>
        <div class="shop-qty-buy">{{ getListProducts.length }}</div>
      </div>
      <div class="shop-ellipses">
        <img src="../../assets/img/ellipses.svg" />
      </div>
    </div>
    <div class="shop-content">
      <div v-if="getListProducts.length">
        <div
          class="shop-products-list"
          v-for="(product, idx) in getListProducts"
          :key="idx"
        >
          <div class="shop-productItem">
            <label :for="idx" class="row-list">
              <input
                type="checkbox"
                class="check-item"
                :id="idx"
                :value="product.product_name"
                v-model="purchase"
              />
              <div class="title-of-the-item">{{ product.product_name }}</div>
              <span class="check-box-fake"></span>
            </label>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Ваш список пуст</p>
      </div>
      <router-link
        :to="{
          name: 'createProduct',
          params: {
            shop: this.shop,
            day: this.day,
            id: this.id,
            list_id: this.listId,
          },
        }"
        class="add-product"
      >
        <img src="../../assets/img/plus.svg" />
        <span class="add-product-text">Добавить продукт</span>
      </router-link>
      <div class="group-people">
        <span>Участники:</span>
        <div class="wrap-group">
          <div class="ava">A</div>
          <div class="ava">B</div>
          <div class="ava">K</div>
        </div>
      </div>
    </div>
    <!--    <ModalCreateProduct v-if="isModalCreateProduct" @closeModalCreateProduct="closeModalCreateProduct" />-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Shop",
  components: {},

  props: ["id", "shop", "day", "listId"],

  data() {
    return {
      purchase: [],
    };
  },
  watch: {
    purchase() {},
  },
  methods: {
    ...mapActions(["getOrderProducts"]),
    success() {
      this.getListProducts.forEach((item) => {
        if (item.is_success) {
          if (this.purchase.includes(item.product_name)) {
            return this.purchase;
          } else {
            this.purchase.push(item.product_name);
          }
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getListProducts", "getUserId"]),
  },
  mounted() {
    const shopId = {
      order_id: this.id,
      shop_name: this.shop,
      user_id: this.getUserId,
      day: this.day,
    };
    this.getOrderProducts(shopId);
    this.success();
  },

  beforeUpdate() {
    //this.success()
  },
};
</script>

<style>
.shop-heading {
  display: flex;
  justify-content: space-between;
}
.shop-content {
  padding: 0px 16px;
  margin-top: 22px;
}
.shop-products-list {
  padding: 0px 16px;
}
.label-product {
  margin-left: 11px;
}
.add-product {
  border: none;
  outline: none;
  background: none;
  color: #575f6e;
  display: flex;
  align-items: center;
  padding: 0;
}
.add-product-text {
  margin-left: 13px;
}
.qtyProducts {
  display: flex;
  align-items: center;
  justify-content: center;
}
.group-people {
  display: flex;
  margin-top: 45px;
}
/* check list */
.check-list {
  padding-left: 22px;
  padding-top: 22px;
}

.row-list {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.title-of-the-item {
  width: 240px;
  white-space: nowrap;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-checked {
  color: #b9b9b9;
  text-decoration-line: line-through;
}

.check-item {
  position: absolute;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.check-box-fake {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid #242e42;
  border-radius: 2px;
  margin-left: -29px;
}
/*CHECKED*/
input:checked + .title-of-the-item {
  color: #b9b9b9;
  text-decoration-line: line-through;
}

input:checked + .title-of-the-item + .check-box-fake {
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14L2 9L3.41 7.58L7 11.17L14.59 3.58L16 5L7 14ZM16 0H2C0.89 0 0 0.89 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 0.89 17.1 0 16 0Z' fill='%23B9B9B9'/%3E%3C/svg%3E");
  width: 18px;
  height: 18px;
  background-size: 18px;
  border: none;
}
/*end CHECKED*/

.action-list {
  width: 100%;
  padding-left: 28px;
  display: flex;
  margin-bottom: 24px;
  color: #242e42;
}

.action-list > img {
  width: 14px;
  height: 14px;
  margin-right: 13px;
}

.participants-list {
  margin-top: 24px;
  display: flex;
  width: 100%;
  padding-left: 29px;
  font-size: 18px;
  font-weight: 700;
}
/*end checklist*/
.wrap-group {
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
  color: #ffffff;
  margin-left: 11px;
}
</style>