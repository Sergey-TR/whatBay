<template>
  <div>
    <div class="content">
      <div class="calendar">
        <div class="calendar-week" v-for="(_, i) in 7">
          <span class="weeklyDay" :class="{ weekEnd: i === 5 || i === 6 }">{{
            weekDayName(i)
          }}</span>
        </div>
        <div class="calendarItems" v-for="(day, idx) in dayOfMonth" :key="idx">
          <CalendarItem
            :data="day"
            :noteData="dateList"
            v-if="day"
            @showList="showList"
          />
        </div>
      </div>
      <div class="listDate">
        <div class="header-list">
          <div class="selectedDate">
            {{ dateList | date("date") }}
          </div>
          <div class="choiceMenu">
            <img src="../../assets/img/settings.svg" @click="showChoiceMenu" />
          </div>
        </div>
        <div v-if="Object.keys(thisDateList).length">
          <ShopListItem
            v-for="(shop, idx) in getDateList"
            :idx="idx"
            :shop_data="shop"
            :key="idx"
          >
          </ShopListItem>
        </div>
        <div v-else>
          <p>Нет списков на текущую дату</p>
        </div>
      </div>
      <ChoiceMenu v-if="isVisible" @closeDropMenu="closeDropMenu" />
    </div>
  </div>
</template>

<script>
import CalendarItem from "./CalendarItem";
import ChoiceMenu from "../modal/ChoiceMenu";
import { mapGetters, mapActions } from "vuex";
import userData from "../composables/userData";
import ShopListItem from "../shop/ShopListItem";

export default {
  name: "Calendar",
  components: {
    CalendarItem,
    ChoiceMenu,
    ShopListItem,
  },

  props: ["selectedDate"],

  data() {
    return {
      isVisible: false,
      dateList: new Date(),
    };
  },

  computed: {
    ...mapGetters([
      "dayOfMonth",
      "allShops",
      "getShopsList",
      "getQty",
      "getShopUserId",
      "getListByDay",
      "getListUserId",
    ]),
    thisDateList() {
      return this.listByDate();
    },
    getDateList() {
      const shops = this.getShopUserId;
      const lists = this.listByDate();
      const allListsDate = userData(shops, lists);
      const haveList = [];
      for (let list of allListsDate) {
        if (list.lists.length) {
          haveList.push(list);
        }
      }
      return haveList;
    },
  },
  watch: {
    selectedDate() {
      this.getDaysOfMonth(this.selectedDate);
    },
  },
  methods: {
    ...mapActions(["fetchShops", "getDaysOfMonth", "getUserListByDate"]),

    weekDayName(i) {
      const d = new Date("2021-04-05");
      d.setDate(d.getDate() + i);
      return d.toLocaleDateString("ru-RU", { weekday: "short" });
    },
    showChoiceMenu() {
      this.isVisible = true;
    },
    closeDropMenu() {
      this.isVisible = false;
    },
    showList(selectDate) {
      this.dateList = selectDate;
    },
    listByDate() {
      this.dateList.setMinutes(
        this.dateList.getMinutes() - this.dateList.getTimezoneOffset()
      );
      const noteDay = this.dateList.toISOString().split("T")[0];
      const listDay = [];
      for (let list of this.getListUserId) {
        let listByDay = list.created_at.split("T")[0];
        if (listByDay === noteDay) {
          listDay.push(list);
        }
      }
      return listDay;
    },
  },
  async mounted() {
    this.getDaysOfMonth(this.selectedDate);
  },
};
</script>

<style scoped>
.wrapper-shop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar-week {
  margin-bottom: 20px;
  min-height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weeklyDay {
  text-transform: uppercase;
  font-weight: bold;
}
.weekEnd {
  text-transform: uppercase;
  font-weight: bold;
  color: red;
}
.calendarItems {
  min-height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.listDate {
  width: 100%;
  margin-top: 30px;
}
.header-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}
.listDate_body {
  margin-top: 20px;
  /*display: flex;*/
  /*justify-content: space-between;*/
}
.note {
  border-bottom: 1px solid darkblue;
}
</style>