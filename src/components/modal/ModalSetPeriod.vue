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
        <div class="selectDate">
          <label for="min" class="small">выберите начальную дату</label>
          <b-form-datepicker
            id="min"
            v-model="minDay"
            locale="ru"
            selected-variant="info"
            placeholder="начальная дата"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            size="lg"
          ></b-form-datepicker>
          <label for="max" class="small mt-5">выберите конечную дату</label>
          <b-form-datepicker
            id="max"
            v-model="maxDay"
            locale="ru"
            selected-variant="info"
            placeholder="конечная дата"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            size="lg"
          ></b-form-datepicker>
        </div>
        <div class="selectDate flex-center">
          <button class="button btn-main" @click="closeDropMenu">ПРИМЕНИТЬ</button>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalSetPeriod",

  data() {
    return {
      minDay: "",
      maxDay: "",
    };
  },

  methods: {
    closeDropMenu() {
      this.$emit("closeModalSetPeriod", this.minDay, this.maxDay);
    },

    // closeAndApply() {
    //   this.$emit()
    // }
  },
};
</script>

<style>
.closeIcon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
}
.selectDate {
    margin-top: 30px;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>