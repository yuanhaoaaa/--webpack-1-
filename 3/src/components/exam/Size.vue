<template>
    <div class="size-wrapper">
        <ul class="size-container">
            <li v-for="index of count"
                :style="{marginTop: type + 'px'}"
                :key="index">
                <span >{{
                    (index ) % 10 === 0 ? (rangeStart + (index * 2)) - 20  : ''
                }}</span>
            </li>
             <li class="number-end" :style="{top: type === 2 ? '190px' :'126px'}"><span>190</span></li>
        </ul>
        <div class="size-arrow"
             v-if="isShowArrow"
             :style="{ top: top + 'px' }">
            <span>{{ number }}</span>
            <i></i>
        </div>
       
    </div>
</template>
<script>
export default {
    props: {
        // 起始范围
        rangeStart: {
            type: Number,
            default: 80,
        },
        // 结束范围
        rangeEnd: {
            type: Number,
            default: 210,
        },
        // 箭头位置
        number: {
            type: Number,
            default: 0,
        },
        // 是否展示箭头
        isShowArrow: {
            type: Boolean,
            default: false,
        },
        // 宽度类型    1 上边距 1px 2 上边距 2px   需按照type计算比例
        type: {
            type: Number,
            default: 1
        }
    },
    computed: {
        count () {
            let start = this.rangeStart;
            let end = this.rangeEnd
            // if (this.number !== 0) {
            //     start = Math.round((this.number / 10) * 10) - 30
            //     end = Math.round((this.number / 10) * 10) + 30
            // }
           
            return (end - start) / 2
        },
        top() {
            let top = (this.rangeEnd - this.number) / 2 * 3 - 38
            if (this.type === 1) {
                top = (this.rangeEnd - this.number) / 2 * 2 - 29
            }
            return  top
        }
    },
};
</script>
<style lang="less" scoped>
.size-wrapper {
    position: relative;
    width: 100px;
    .size-container {
        background: rgba(248, 248, 248, 1);
        padding: 0 5px 2px 0px;
        flex-direction: column;
        align-items: flex-end;
        transform: rotate(180deg);
        li {
            color: #333;
            height: 1px;
            width: 20px;
            background-color: #c2c2c1;
            position: relative;
            font-weight: bold;
            // float: right;
            span {
                display: block;
                position: absolute;
                left: 52px;
                top: -9px;
                text-align: center;
                width: 30px;
                 transform: rotate(180deg);
                 font-size: 12PX;
            }
        }
        li:nth-of-type(5n) {
            width: 35px;
        }
        li:nth-of-type(10n) {
            width: 50px;
        }
        li:last-child {
            width: 20px;
        }
    }
    .size-arrow {
        color: #818181;
        font-size: 10px;
        position: absolute;
      left: 115px;
        font-weight: bold;
        font-size: 14px;
        z-index: 9999;
        i{
            position: absolute;
            left: -27px;
            top: 0;
            border: 11px solid transparent;
            border-right: 16px solid #818181;
        }
    }
    .number-end{
        position: absolute;
        left: -80px;
        color: #333;
        font-size: 12PX;
        position: absolute;
        transform: rotate(180deg) !important;
    }
}
</style>
