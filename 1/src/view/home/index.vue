<template>
    <div>
        {{home}}
        <Icon custom="i-icon i-icon-shop_fill" size="24" />
          <Button type="primary">Primary</Button>
    <Icon type="ios-add-circle-outline" />
a
    <div style="color:red;">
        <Icon type="md-heart-outline" />
    </div>
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
                home: 'hello world'
            }
        },
        methods: {
            handleAdd () {
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