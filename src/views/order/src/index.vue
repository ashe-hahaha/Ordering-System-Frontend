<!--
 * @Description: 订单
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { OrderList } from './index'
import { getOrder } from '@/api/all'

const typeToText = ['', 'Waiting for pay', 'Waiting for use', 'Waiting for comment', 'After sale']
const typeToPrompt = ['Total', 'Payment required', '', '', '']

const indexToView = ['', 'first', 'second', 'third', 'fourth']

@Component({
  components: {}
})
export default class Order extends Vue {
  activeName = 'first'
  orderData: { firest?: OrderList[]; second?: OrderList[]; third?: OrderList[]; fourth?: OrderList[] } = {}

  @Watch('$route', { deep: true })
  listenersRouter(val: any) {
    this.activeName = indexToView[Number(val.query.index)] || 'first'
  }

  mounted() {
    this.init()
  }

  getPrice(item: OrderList) {
    let price = 0
    price = Number(item.num) * Number(item.price)
    return price
  }

  async init() {
    const data = await getOrder(this.$store.getters.userId || '')
    // this.orderData = {
    //   ...data.data
    // }
    this.orderData = {
      firest: [],
      second: [],
      third: [],
      fourth: []
    }
    data.data.forEach((orders: any) => {
      orders.forEach((order: any) => {
        switch (order.orderStatus) {
          // Processing, Paid, Finished
          case "Processing":
            if (!this.orderData.second){
              this.orderData = {
                second: []
              }
            }
            if (this.orderData.second){
              this.orderData.second.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 2
              });
            }

            if (!this.orderData.firest){
              this.orderData = {
                firest: []
              }
            }
            if (this.orderData.firest){
              this.orderData.firest.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 1
              });
            }
            break;
            
          case "Paid":
            if (!this.orderData.third){
              this.orderData = {
                third: []
              }
            }
            if (this.orderData.third){
              this.orderData.third.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 3
              });
            }
            if (!this.orderData.firest){
              this.orderData = {
                firest: []
              }
            }
            if (this.orderData.firest){
              this.orderData.firest.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 1
              });
            }
            break;
          
          case "Finished":
            if (!this.orderData.fourth){
              this.orderData = {
                fourth: []
              }
            }
            if (this.orderData.fourth){
              this.orderData.fourth.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 4
              });
            }
            if (!this.orderData.firest){
              this.orderData = {
                firest: []
              }
            }
            if (this.orderData.firest){
              this.orderData.firest.push({
                label: order.restaurantName,
                desc: order.orderStatus,
                num: order.id,
                date: order.orderTime || '',
                price: order.totalPrice,
                url: '',
                type: 1
              });
            }
            break;

        }
      });
    });
  console.log(data.data)
  console.log(this.orderData)

  }

  protected render() {
    return (
      <el-tabs v-model={this.activeName}>
        <el-tab-pane label="All order" name="first">
          <ul class="order-list">
            {this.orderData.firest?.length === 0 && <p>No record</p>}
            {this.orderData.firest &&
              this.orderData.firest.map((item) => {
                return (
                  <li>
                    <img src={item.url} />
                    <div>
                      <span class="label">{item.label}</span>
                      <span class="num">{item.num} 份，</span>
                      <span class="desc">{item.desc}</span>
                      <span class="date">{item.date}</span>
                    </div>
                    <p class="price">
                      {typeToPrompt[item.type]}：{this.getPrice(item)}
                    </p>
                    <p class="news none-600">{typeToText[item.type]}</p>
                  </li>
                )
              })}
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Waiting for pay" name="second">
          <ul class="order-list">
            {this.orderData.second?.length === 0 && <p>No record</p>}
            {this.orderData.second &&
              this.orderData.second.map((item) => {
                return (
                  <li>
                    <img src={item.url} />
                    <div>
                      <span class="label">{item.label}</span>
                      <span class="num">{item.num} 份，</span>
                      <span class="desc">{item.desc}</span>
                      <span class="date">{item.date}</span>
                    </div>
                    <p class="price">
                      {typeToPrompt[item.type]}：{this.getPrice(item)}
                    </p>
                    <p class="news none-600">{typeToText[item.type]}</p>
                  </li>
                )
              })}
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Waiting for comment" name="third">
          <ul class="order-list">
            {this.orderData.third?.length === 0 && <p>No record</p>}
            {this.orderData.third &&
              this.orderData.third.map((item) => {
                return (
                  <li>
                    <img src={item.url} />
                    <div>
                      <span class="label">{item.label}</span>
                      <span class="num">{item.num} ，</span>
                      <span class="desc">{item.desc}</span>
                      <span class="date">{item.date}</span>
                    </div>
                    <p class="price">
                      {typeToPrompt[item.type]}：{this.getPrice(item)}
                    </p>
                    <p class="news none-600">{typeToText[item.type]}</p>
                  </li>
                )
              })}
          </ul>
        </el-tab-pane>
        <el-tab-pane label="After sale" name="fourth">
          <ul class="order-list">
            {this.orderData.fourth?.length === 0 && <p>No record</p>}
            {this.orderData.fourth &&
              this.orderData.fourth.map((item) => {
                return (
                  <li>
                    <img src={item.url} />
                    <div>
                      <span class="label">{item.label}</span>
                      <span class="num">{item.num} ，</span>
                      <span class="desc">{item.desc}</span>
                      <span class="date">{item.date}</span>
                    </div>
                    <p class="price">
                      {typeToPrompt[item.type]}：{this.getPrice(item)}
                    </p>
                    <p class="news none-600">{typeToText[item.type]}</p>
                  </li>
                )
              })}
          </ul>
        </el-tab-pane>
      </el-tabs>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
.el-tabs {
  ::v-deep .el-tabs__nav-scroll {
    .el-tabs__item {
      font-size: 1.25rem;
    }
    .is-active {
      color: black;
    }
  }
  .order-list {
    > li {
      display: flex;
      height: 6.88rem;
      box-sizing: border-box;
      padding: 0.63rem 0;
      border-top: 1px solid #e5e5e5;
      justify-content: space-between;
      padding-right: 6.25rem;
      &:first-child {
        border: none;
      }
      img {
        width: 5.63rem;
        height: 5.63rem;
        border-radius: 4px;
      }
      > div {
        flex: 1 1 20.31rem;
        margin-left: 0.63rem;
        padding-top: 0.63rem;
        .label {
          font-size: 1rem;
          display: block;
        }
        .num,
        .desc,
        .date {
          font-size: 0.75rem;
          color: #666666;
        }
        .date {
          display: block;
        }
        .desc {
          margin-top: 0.31rem;
        }
      }
      .price,
      .news {
        font-size: 0.75rem;
        color: #666666;
        padding-top: 0.94rem;
      }
      .price {
        flex: 0 0 12.5rem;
      }
      .news {
        flex: 0 0 6.26rem;
      }
    }
  }
}

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
    .order-list {
      > li {
        padding-right: 0;
        .price {
          flex: 0 0 4.5rem;
        }
      }
    }
  }
}
</style>
