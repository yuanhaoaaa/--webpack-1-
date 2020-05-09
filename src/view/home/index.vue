<template>
    <div>
        {{home}}
        <p>数量：{{count}}</p>
        <button @click="handleAdd">增加数量</button>
        <router-link to="/test">跳转</router-link>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        data: () => {
            return {
                home: '首页'
            }
        },
        methods: {
            handleAdd () {
                console.log(this)
                console.log(this.$store)
                this.$store.commit('setCount', 3)
            }
        },
        computed: {
            ...mapGetters(['count']),
        },
    }
</script>

<style lang="less" scoped>

</style>