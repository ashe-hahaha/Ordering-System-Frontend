<!--
 * @Description: 轮播图
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { FoodType, CarouselImg } from './index'
import { getSortAll } from '@/api/all'

@Component({
  components: {}
})
export default class Carousel extends Vue {
  [x: string]: any
  avatarImg: string = require('@/assets/avatar.jpg')
  download: string = require('@/assets/download-qr.png')

  get isLogin() {
    return this.$store.getters.loginStatus
  }
  get userName() {
    return this.$store.getters.userName
  }
  get userAvatar() {
    return this.$store.getters.userAvatar
  }

  goView(name = '') {
    if (name !== '') {
      this.$router.push({ name })
    }
  }

  carouselList: Array<CarouselImg> = [
    { id: 'shop_001', url: require('@/assets/images/delicious1.jpg') },
    { id: 'shop_001', url: require('@/assets/images/delicious2.jpg') },
    { id: 'shop_001', url: require('@/assets/images/delicious3.jpg') }
  ]
  foodTypeList: Array<FoodType> = []

  async mounted() {
    const content = await getSortAll()
    this.foodTypeList = content.data.map((shop: any) => {
      return {
        id: shop.id,
        label: shop.restaurantCatalog,
        color: 'blue',
        icon: 'icon-a',
      }
    })
  }

  protected render() {
    return (
      <div>
        <div class="carousel">
          <el-card class="carousel-card-left none-600" shadow="never">
            <h2 class="carousel-card-left-title">Food categories</h2>
            <ul class="carousel-card-left-menu">
              {this.foodTypeList.map((item) => {
                return (
                  <li
                    class="food-type"
                    onClick={() => this.$router.push({ name: 'shoplist', params: { typeId: item.id || '' } })}>
                    <i class={item.icon} style={'color:' + item.color + ';'}></i>
                    <a href="#">{item.label}</a>
                  </li>
                )
              })}
            </ul>
          </el-card>
          <el-carousel trigger="click">
            {this.carouselList.map((item, index) => {
              return (
                <li key={index} onClick={() => this.$router.push({ name: 'shop', params: { id: item.id || '' } })}>
                  <el-carousel-item>
                    <img width="100%" height="100%" src={item.url} />
                  </el-carousel-item>
                </li>
              )
            })}
          </el-carousel>
          <div class="carousel-card-right none-600">
            {!this.isLogin && (
              <el-card shadow="never">
                <img class="avatar" src={this.avatarImg} />
                <p class="user-name-mid">Hi!</p>
                <router-link to="/login">
                  <el-button round>Log in</el-button>
                </router-link>
                <br></br>
                <br></br>
                <router-link to="/register">
                  <el-button round>Sign Up</el-button>
                </router-link>
              </el-card>
            )}

            {this.isLogin && (
              <el-card shadow="never">
                <div class="top" onClick={() => this.goView('account')}>
                  <i class="el-icon-setting"></i>
                </div>
                <img class="avatar" src={this.userAvatar} />
                <p class="user-name-small">{this.userName}</p>
                <ul class="user-nav">
                  <li onClick={() => this.goView('order')}>
                    <i class="el-icon-s-order"></i>
                    <span>My orders</span>
                  </li>
                  <li onClick={() => this.goView('favorites')}>
                    <i class="el-icon-star-on"></i>
                    <span>My favorites</span>
                  </li>
                  <li onClick={() => this.$showCart()}>
                    <i class="el-icon-shopping-cart-2"></i>
                    <span>Shopping cart</span>
                  </li>
                  <li onClick={() => this.goView('coupon')}>
                    <i class="el-icon-coin"></i>
                    <span>Coupon</span>
                  </li>
                  <li onClick={() => this.goView('account')}>
                    <i class="el-icon-more"></i>
                    <span>More</span>
                  </li>
                </ul>
              </el-card>
            )}
            <el-card shadow="never">
              <img width="95" src={this.download}></img>
              <p class="download-label">Scan the QR code</p>
            </el-card>
          </div>
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
.carousel {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-carousel {
    width: 870px;
    height: 27.88rem;
    ::v-deep .el-carousel__container {
      width: 100%;
      height: 100%;
    }
  }
  &-card-left {
    width: 170px;
    margin-top: -45px;
    ::v-deep .el-card__body {
      padding: 0;
    }
    &-title {
      color: #222222;
      font-size: 16px;
      font-weight: 700;
      margin-left: 20px;
    }
    &-menu {
      .food-type {
        font-size: 13px;
        line-height: 20px;
        height: 20px;
        color: #646464;
        cursor: pointer;
        padding: 4px;
        i {
          margin-left: 10px;
        }
        a {
          margin-left: 5px;
        }
        &:hover {
          background-color: rgba(255, 150, 0, 0.08);
          a {
            color: #222222;
            font-weight: 700;
          }
          i {
            font-weight: 700;
          }
        }
      }
    }
  }
  &-card-right {
    width: 228px;
    height: 278px;
    text-align: center;
    .el-card {
      position: relative;
      &:first-child {
        height: 100%;
      }
      &:last-child {
        margin-top: 5px;
      }
    }
    .top {
      position: absolute;
      right: 12px;
      top: 10px;
      cursor: pointer;
      i {
        font-size: 20px;
        color: #666;
        display: inline-block;
      }
    }
    .user-name-small {
      font-size: 16px;
      color: #222;
      margin: 0 auto;
      cursor: pointer;
    }
    .user-nav {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 60px;
        margin-top: 10px;
        cursor: pointer;
        i {
          color: #ffc300;
          font-size: 24px;
          display: block;
        }
        span {
          font-size: 12px;
          color: #222;
        }
      }
    }
    .avatar {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      border: 4px solid #e5e5e5;
    }
    .a-button {
      width: 118px;
      text-align: center;
      margin: 10px auto 15px auto;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 40px;
      font-size: 14px;
      color: #333;
      transition: background-color 0.5s;
      display: block;
      line-height: 38px;
      &:hover {
        background-color: #f6f6f6;
        transition: background-color 0.5s;
      }
    }
    .download-label {
      margin: 0;
    }
  }
}

@media screen and (max-width: 600px) {
  .carousel {
    .el-carousel {
      width: 100%;
    }
  }
}
</style>
