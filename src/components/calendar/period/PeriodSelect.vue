<template>
    <div>
        <div class="mt-3 d_flex justify bb" @click="setPeriod()">
            <div>
                {{ this.previousDay | date('date-num')}} - {{ this.maxDay | date('date-num') }}
            </div>
            <div>
                <b-icon icon="calendar"></b-icon>
            </div>
        </div>
        <div v-if="Object.keys(listForPeriod).length" class="mt-4">
            <ShopListItem
              v-for="(shop, idx) in listForPeriod"
              :idx = "idx"
              :shop_data = "shop"
              :key="idx"
          >
          </ShopListItem>
        </div>
        <div v-else>
          <p>Нет списков на выбранный период</p>
        </div>
        <ModalSetPeriod v-if="this.isVisible" @closeModalSetPeriod="closeModalSetPeriod"/>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import ModalSetPeriod from "../../modal/ModalSetPeriod";
import ShopListItem from "../../shop/ShopListItem";
import getISO from "../../composables/getISO";
import userData from "../../composables/userData";

export default {
    name: "PeriodSelect",

    components: {
        ModalSetPeriod,
        ShopListItem
    },

    data() {
        return {
            previousDay: '',
            maxDay: '',
            minDay: '',
            isVisible: false
        }
    },

    computed: {
        ...mapGetters(['getQty', 'getShopUserId', 'getListUserId']),

        listForPeriod() {
            const shops = this.getShopUserId;
            let listForPeriod = [];
            for(let list of this.getListUserId) {
                let d = list.created_at.split('T')[0]
                let max = getISO(this.maxDay)
                let min = getISO(this.previousDay)
                if(d >= min && d <= max) {
                   listForPeriod.push(list)
               }
            } 
            const allListsDate = userData(shops, listForPeriod );  
            let listPeriod = [];
            for (let list of allListsDate) {
                if (list.lists.length) {
                    listPeriod.push(list)
                }
            }
        
            return listPeriod
        }      
    },

    methods: {
        ...mapActions(['getOrderUser']),

        previousDate() {
            let d = new Date();
            d.setDate(d.getDate() - 1);
            if(!this.minDay) {
                this.previousDay = d
                this.maxDay = new Date()
            } else {
                this.previousDay = this.minDay
            }
        },

        setPeriod() {
            this.isVisible = true
        },

        closeModalSetPeriod(min, max) {
            this.isVisible = false
            if(min && max) {
                this.previousDay = new Date(min)
                this.maxDay = new Date(max)
            }
        }
    },

    beforeMount() {
        this.previousDate()
    },

    async mounted() {
        const id = {
            user_id: localStorage.getItem('saveUserId')
        }
        await this.getOrderUser(id)
    }
}
</script>

<style>
    .justify {
        justify-content: space-around;
    }
    .bb {
        border-bottom: 1px solid dimgrey;
        padding-bottom: 10px;
    }
</style>