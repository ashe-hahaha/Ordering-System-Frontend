<!--
 * @Description: 商品详情页面
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue, VModel, Prop, Watch } from 'vue-property-decorator'
import EatenHeader from '@/components/EatenHeader/index'
import EatenFooter from '@/components/EatenFooter/index'
import Appraisal from '@/components/Appraisal/index'
import { UserApp, GoodDetails } from './index'
import { addFoodLabel } from '@/api/all'

@Component({
  components: { EatenHeader, EatenFooter, Appraisal }
})
export default class Food extends Vue {
  [x: string]: any
  // 评价的排序标签
  @VModel({ default: {} }) readonly foodVal: any
  @Prop({ default: false, type: Boolean }) readonly show?: boolean
  elTabIndex = 'first'
  dynamicTags: any = []
  inputValue = ''

  @Watch('foodVal', { deep: true })
  fn(val: any) {
    if (val) {
      // console.log(val.goodD.label)
      if (val.goodD.label !== '') {
        this.dynamicTags = val.goodD.label.split('，')
      } else {
        this.dynamicTags = []
      }
    }
  }

  get visible() {
    return this.show
  }

  hideView(e: any) {
    this.$emit('hideView', e)
  }

  shopping() {
    this.$showCart(this.foodVal.goodD.id, true)
  }

  handleInputConfirm(tag: any) {
    if (this.$store.getters.loginStatus) {
      this.dynamicTags.push(tag)
      this.inputValue = ''
      const label = this.dynamicTags.join('，')
      // console.log({ id: this.foodVal.goodD.id, label })
      addFoodLabel({ id: this.foodVal.goodD.id, label })
    } else {
      this.$alert('Please login first', 'Hint', {
        confirmButtonText: 'Confirm',
        type: 'warning'
      })
    }
  }

  protected render() {
    return (
      <el-dialog
        lock-scroll={false}
        custom-class="food-dialog"
        modal-append-to-body={false}
        visible={this.visible}
        {...{ on: { 'update:visible': this.hideView } }}>
        <div class="img-backgorund">
          <img src={this.foodVal.goodD.url} />
        </div>
        <div class="food-dialog-mid">
          <div>
            <span>Sell in a month {this.foodVal.goodD.monthlySale}</span>
            <span>favorable evaluation rate {this.foodVal.goodD.favorableRate}%</span>
          </div>
          <div>{this.foodVal.goodD.discount != 1 ? (this.foodVal.goodD.discount * 100).toFixed(1) : '0.99'}%</div>
          <div>
            <span class="pri">{(this.foodVal.goodD.price * this.foodVal.goodD.discount).toFixed(1)}</span>
            <span class="del">${this.foodVal.goodD.price}</span>
            <span class="other">Package fee${this.foodVal.goodD.packagingCosts}</span>
            <el-button type="primary" size="small" icon="el-icon-plus" onClick={this.shopping} round>
              Add to shoplist
            </el-button>
          </div>
        </div>
        <el-tabs v-model={this.elTabIndex} class="food-dialog-footer">
          <el-tab-pane label="Product information" name="first">
            <ul>
              <li>
                <span>Product description</span>
                <span>{this.foodVal.goodD.desc}</span>
              </li>
              <li>
                <span>Ingredients</span>
                <span>{this.foodVal.goodD.material}</span>
              </li>
              <li>
                <span>flavor</span>
                <span>{this.foodVal.goodD.taste}</span>
              </li>
              <li>
                <span>Fee description</span>
                <span>{this.foodVal.goodD.priceDescription}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="Comment" class="shop-card-appraisal" name="second">
            <appraisal></appraisal>
          </el-tab-pane>
          <el-tab-pane label="Lable" class="shop-card-label" name="third">
            <el-input
              v-model={this.inputValue}
              ref="saveTagInput"
              size="small"
              placeholder="Please input lable"
              maxlength="20"
              show-word-limit
              onChange={this.handleInputConfirm}></el-input>
            {this.dynamicTags.map((item: any) => {
              return (
                <el-tag key={item} disable-transitions={false}>
                  {item}
                </el-tag>
              )
            })}
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    )
  }
}
</script>
<style scoped lang="scss">
::v-deep .food-dialog {
  background-color: #f8f8f8;
  width: 600px;
  .el-dialog__headerbtn {
    left: 20px;
    .el-dialog__close {
      font-size: 25px;
      &::before {
        content: '<';
        display: inline-block;
        width: 28px;
        height: 28px;
        background-color: rgba($color: #000000, $alpha: 0.3);
        border-radius: 50%;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    .img-backgorund {
      margin-top: -30px;
      img {
        width: 100%;
        height: 28.19rem;
      }
    }
    .food-dialog-footer {
      background-color: white;
      margin: 20px auto;
      border-radius: 6px;
      padding: 0 15px;
      ul {
        > li {
          margin-bottom: 15px;
          min-height: 20px;
          > span {
            font-size: 14px;
            &:first-child {
              color: #868a8a;
              min-width: 60px;
              display: inline-block;
            }
            &:last-child {
              margin-left: 15px;
              color: black;
            }
          }
        }
      }
      .shop-card-label {
        min-height: 194px;
        .el-tag {
          margin-top: 10px;
          margin-right: 10px;
        }
      }
    }
    .food-dialog-mid {
      background-color: white;
      margin: 10px auto;
      border-radius: 6px;
      padding: 15px;
      & > div {
        &:nth-child(1) {
          span {
            font-size: 13px;
            color: #868a8a;
            &:last-child {
              margin-left: 10px;
            }
          }
        }
        &:nth-child(2) {
          margin: 10px 0;
          color: #f60;
          font-size: 13px;
          border: 1px solid #f60;
          padding: 2px;
          display: inline-block;
          border-radius: 5px;
        }
        &:nth-child(3) {
          & > span {
            margin-right: 6px;
          }
          .pri {
            color: rgb(255, 38, 0);
            font-size: 18px;
            font-weight: 700;
            &::before {
              content: '￥';
              display: inline-block;
              font-size: 13px;
            }
          }
          .del {
            position: relative;
            &::after {
              content: '';
              display: inline-block;
              position: absolute;
              width: 50px;
              border-top: 1px solid #868a8a;
              width: 100%;
              top: 10px;
              left: 2px;
            }
          }
          .other .del {
            font-size: 13px;
            color: #868a8a;
          }
          .el-button {
            float: right;
            padding: 9px 10px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  ::v-deep .food-dialog {
    width: 95%;
  }
}
</style>
