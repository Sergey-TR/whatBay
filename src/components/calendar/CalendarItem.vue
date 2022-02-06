<template>
  <div class="days-wrapper">
    <div :class="calendarItem" @click="showList">
      {{ data.getDate() }}
    </div>
  </div>
</template>

<script>
import getISO from "../composables/getISO";
import noteDays from "../composables/noteDays";
import { mapGetters } from "vuex";

export default {
  name: "CalendarItem",
  props: ["data", "noteData"],

  data() {
    return {
      date: new Date(),
    };
  },

  methods: {
    showList() {
      this.$emit("showList", this.data);
    },
  },

  computed: {
    ...mapGetters(["dayOfMonth", "getShopsList", "getQty", "getListUserId"]),

    calendarItem() {
      const note = noteDays(this.getListUserId);
      let classes = "";
      let purchase = "";
      const isCurrentDate = getISO(new Date()) === getISO(this.data);
      for (let i = 0; i <= note.length - 1; i++) {
        if (
          getISO(note[i]) === getISO(this.data) &&
          note.length &&
          getISO(note[i]) >= getISO(new Date())
        ) {
          classes = true;
        } else if (
          getISO(note[i]) === getISO(this.data) &&
          note.length &&
          getISO(note[i]) < getISO(new Date())
        ) {
          purchase = true;
        }
      }
      return {
        primary: isCurrentDate,
        default: !isCurrentDate,
        note: classes,
        done: purchase,
      };
    },
  },
  mounted() {},
};
</script>

<style scoped>
.days-wrapper {
  width: 100%;
  height: 100%;
}
.primary {
  background: #2c9ab7;
  color: white;
}
.default,
.primary {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 10px;
  margin: 1px;
}
.default:active {
  background: aquamarine;
}
.note {
  border: 2px solid red;
  border-radius: 10px;
}
.done {
  border: 2px solid forestgreen;
  border-radius: 10px;
}
</style>