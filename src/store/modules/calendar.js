import getDaysOfMonth from "../../components/composables/date-utils";
import getFirstWeekday from "../../components/composables/week-days";
import {baseURL} from "../../constance";

export default {
    actions: {
        getDaysOfMonth(ctx, props) {
            const currentDay = new Date(props)
            const month = currentDay.getMonth()
            const year = currentDay.getFullYear()
            const daysInMonth = getDaysOfMonth(month, year)
            const firstDayIndex = getFirstWeekday(month, year)
            const day = []
            for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
                day[i] = new Date(year, month, i + 1 - firstDayIndex)
            }
            const days = day

            ctx.commit('updateMonth', days)

        },
        async fetchShops(ctx, selectDate) {
            try {
                if (selectDate) {
                    const res = await fetch(
                        baseURL + selectDate
                    );
                    const shops = await res.json();
                    ctx.commit('updateShopsList', shops)
                }

            } catch (e) {
                console.log('err', e)
                console.error(e)
            }
        },
    },
    mutations: {
        updateMonth(state, days) {
            state.days = days
        },
        updateShopsList(state, shops) {
            state.shops = shops
        },
    },
    state: {
        days: [],
        shops: [],
    },
    getters: {
        dayOfMonth(state) {
            return state.days
        },
        allShops(state) {
            return state.shops
        },

    }
}