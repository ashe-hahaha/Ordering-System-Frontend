<!--
 * @Description: 抵用券
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'

const indexToView = ['', 'first', 'second', 'third', 'fourth']

@Component({
  components: {}
})
export default class Order extends Vue {
  activeName = 'first'

  @Watch('$route', { deep: true })
  listenersRouter(val: any) {
    this.activeName = indexToView[Number(val.query.index)] || 'first'
  }

  protected render() {
    return (
      <el-tabs v-model={this.activeName}>
        <el-tab-pane label="Available coupons" name="first">
          <span>You don't have coupons</span>
        </el-tab-pane>
        <el-tab-pane label="Expired coupons" name="second">
          <span>You don't have coupons</span>
        </el-tab-pane>
      </el-tabs>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
@media screen and (max-width: 600px) {
  .el-tabs {
    ::v-deep .el-tabs__nav-scroll {
      .el-tabs__item {
        font-size: 8px;
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
