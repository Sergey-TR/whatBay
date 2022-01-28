<template>
  <div>
  <div class="selector-wrapper">
    <div class="selector">
      <button class="btn btn-selector" @click="prevent">
        <img src="../../assets/img/sliderLeft.png">
      </button>
      <div class="selector-body">{{ getMonthTitle() + '  ' + getYear() }}</div>
      <button class="btn btn-selector" @click="next">
        <img src="../../assets/img/sliderRight.png">
      </button>
    </div>
  </div>
    <Calendar :selectedDate="date"/>
  </div>
</template>

<script>
import Calendar from "./Calendar";
import UserDropMenu from "../modal/UserDropMenu";
import {mapGetters} from "vuex";

export default {
  name: "CalendarSelector",
  components: {
    Calendar,
    UserDropMenu
  },

  data() {
    return {
      date: new Date(),
      isDropMenuVisible: false
    }
  },
  methods: {
    getMonthTitle() {
      const m = this.date.getMonth()
      const d = new Date(2020, m, 1)
      return d.toLocaleDateString('ru-RU', {month: 'long'})
    },
    getYear() {
      return this.date.getFullYear()
    },
    next() {
      const date = new Date(this.date)
      date.setMonth(date.getMonth() + 1)
      this.date = date
    },
    prevent() {
      const date = new Date(this.date)
      date.setMonth(date.getMonth() - 1)
      this.date = date
    },
    showUserMenu() {
      this.isDropMenuVisible = true
    },
    closeDropMenu() {
      this.isDropMenuVisible = false
    }
  },
  computed: {
    ...mapGetters(['getShopsList'])
  }
}
</script>

<style scoped>
.header {
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 32px;
  background-color: #C4C4C4;
  border-radius: 7px;
  color: #ffffff;
  height: 32px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selector-wrapper {
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 288px;
  height: 35px;
}
.btn-selector:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.17);
}
.btn-selector:active {
  height: 19px;
}
.selector-body {
  padding: 0px 10px;
  text-transform: uppercase;
  font-weight: bold;
}
.btn {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}
</style>