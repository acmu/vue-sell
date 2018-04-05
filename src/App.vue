<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{ path: '/goods' }">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path: '/ratings' }">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path: '/seller' }">商家</a>
      </div>
    </div>
    <!-- router-view的keep-alive使渲染过的DOM不会重新渲染 -->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header';
  import { urlParse } from 'common/js/util.js';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          // 不能用直接赋值，这样是没有灵魂的，因为直接赋值会覆盖掉id属性
          // 而用ES6的Object.assign可以添加属性，不会覆盖原有的id属性
          // this.seller = response.data;
          this.seller = Object.assign({}, this.seller, response.data);
          console.log(this.seller.id);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  border-1px(rgba(7, 17, 27, .1))
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
