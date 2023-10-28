<!--
 * @Description: 店铺详情页面
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import Star from '@/components/Star/index'
import EatenHeader from '@/components/EatenHeader/index'
import EatenFooter from '@/components/EatenFooter/index'
import Appraisal from '@/components/Appraisal/index'
import Food from '@/views/food'
import { Goods, UserApp, GoodDetails, Shops } from './index'
import storage from '@/storage'
import { getShop } from '@/api/home'
import { getFood } from '@/api/all'

@Component({
  components: { EatenHeader, EatenFooter, Star, Food, Appraisal }
})
export default class Shop extends Vue {
  [x: string]: any
  foodVal: { appraisalTags?: string[]; appraisals?: UserApp[]; goodD?: GoodDetails } = {
    // 评价的排序标签
    appraisalTags: [
      'Tastes great(85)',
      'Quality-price ratio(70)',
      'The food is good(50)',
      'Fast food(70)',
      'Pick up in store(70)',
      'Generous portion(68)',
      'Repeat customer(44)',
      'Friends get together(20)',
      'Affordable(7)'
    ],
    appraisals: [
      {
        id: '1000',
        name: 'Tom',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      },
      {
        id: '1001',
        name: 'Jacky',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      },
      {
        id: '1002',
        name: 'Jason',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      }
    ],
    // 商品详情
    goodD: {
      desc: 'Rice',
      material: 'Rice',
      taste: 'Common',
      priceDescription: '',
      monthlySale: 4071,
      favorableRate: 98,
      discount: 0.57,
      price: 27.9,
      packagingCosts: 2
    }
  }

  // 评价的排序标签
  appraisalTags = [
  'Tastes great(85)',
      'Quality-price ratio(70)',
      'The food is good(50)',
      'Fast food(70)',
      'Pick up in store(70)',
      'Generous portion(68)',
      'Repeat customer(44)',
      'Friends get together(20)',
      'Affordable(7)'
  ]
  appraisals = [
  {
        id: '1000',
        name: 'Tom',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      },
      {
        id: '1001',
        name: 'Jacky',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      },
      {
        id: '1002',
        name: 'Jason',
        rating: 4.8,
        content:
          'I recently visited [Restaurant Name] and had an amazing dining experience. The restaurant had a welcoming ambiance and the staff was friendly and attentive. The food was outstanding. Every dish was prepared with great attention to detail and the flavors were exceptional. The menu offered a diverse range of options, catering to various preferences.The service was top-notch. The staff was knowledgeable about the menu, and their recommendations were spot-on. They ensured that we had everything we needed throughout the meal.Overall, I highly recommend [Restaurant Name]. It\'s a must-visit for anyone looking for a memorable dining experience.',
        time: '2023.10.10',
        avatar: 'https://www.dpfile.com/ugc/user/anonymous.png',
        imgUrl: [
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif',
          'http://www.canyin168.com/UploadFiles/Article/2018/6/201806251026586061.gif'
        ]
      }
  ]

  shop: { shop?: Shops; food?: any[] } = {}
  shopId = ''
  visible = false
  elTabIndex = 'first'

  addShoppingCart(item: any, e: any) {
    e.stopPropagation()
    this.$showCart(item.id, true)
  }

  mounted() {
    this.init()
  }

  async init() {
    if (this.$route.params.id) {
      this.shopId = this.$route.params.id
      storage.set('shopId', this.shopId)
    } else {
      this.shopId = storage.get('shopId') as string
    }
    try {
      const data = await getShop(this.shopId)
      // this.shop = data.data
      
      this.shop = {
        food: data.data.foodMenu,
        shop: {
          name: data.data.restaurantName,
          address: data.data.address.street + ', ' + data.data.address.city + ', ' + data.data.address.state,
          food: data.data.foodMenu,
          phoneNumber: data.data.phoneNumber,
          business: data.data.business,
          coverImg: data.data.coverImg
          // name?: string;
          // rating?: number;
          // price?: number;
          // address?: string;
          // phoneNumber?: string;
          // business?: string;
          // desc?: string[];
          // coverImg?: string[];
          // food?: any[];
          // [propName: string]: any;
        }
      }
    console.log(this.shop.food)
    console.log(this.shop.shop)
    } catch (err) {
      console.log(err)
    }
  }

  async viewFood(item: any) {
    try {
      const data: any = await getFood(item.id)
      // "foodMenu": [
      //   {
      //       "foodName": "sala",
      //       "foodDescription": "haochi",
      //       "foodCatalog": "india food",
      //       "foodPrice": 22.0,
      //       "id": 1
      //   }

      // export interface GoodDetails {
      //   desc?: string;
      //   material?: string;
      //   taste?: string;
      //   priceDescription?: string;
      //   monthlySale?: string | number;
      //   favorableRate?: string | number;
      //   discount?: string | number;
      //   price?: number;
      //   packagingCosts: ?number;
      // }
      this.$set(this.foodVal, 'goodD', { ...data.data.food })
      console.log(this.foodVal.goodD)
      this.visible = true
    } catch (err) {
      console.log(err)
    }
  }

  protected render() {
    return (
      <div class="shop-wrapper">
        <eaten-header></eaten-header>
        <food v-model={this.foodVal} show={this.visible} onHideView={(e: any) => (this.visible = e)}></food>
        <div class="shop">
          <el-breadcrumb class="shop-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to={{ name: 'Home' }}>Home</el-breadcrumb-item>
            <el-breadcrumb-item to={{ name: 'shoplist' }}>Shop list</el-breadcrumb-item>
            <el-breadcrumb-item to={{ name: 'shop' }}>Shop detail</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="shop-header">
            <div class="shop-header-left">
              <div>
                <p class="shop-header-left-title">{this.shop?.shop?.name}</p>
                <div>
                  <star num={this.shop?.shop?.rating} size={'16'}></star>
                  <p>
                    {this.shop?.shop?.rating}Per pax${this.shop?.shop?.price}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  location: {this.shop?.shop?.address}
                  <i class="el-icon-location-information"></i>
                </p>
                <p>tel: {this.shop?.shop?.phoneNumber}</p>
                <p>opening hours: {this.shop?.shop?.business}</p>
              </div>
              <div>
                <ul>
                  {this.shop?.shop?.desc?.includes('wifi') && (
                    <li>
                      <img src="https://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png" />
                      <p>wifi</p>
                    </li>
                  )}
                  {this.shop?.shop?.desc?.includes('stop') && (
                    <li>
                      <img src="https://p1.meituan.net/codeman/4b1c5696fe5bf2c4d23fb01659b3e68b1960.png" />
                      <p>Car park</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div class="shop-header-right none-600">
              <div class="img-top">
                {/* <img src={this.shop?.shop?.coverImg && this.shop?.shop?.coverImg[0]} /> */}
                <img src={this.shop?.shop?.coverImg} />
              </div>
              {/* <div>
                {this.shop?.shop?.coverImg?.map((item) => {
                    return (
                      <el-image
                        style="width: 100px; height: 100px; margin-right: 5px;"
                        src={item}
                        preview-src-list={this.shop?.shop?.coverImg}></el-image>
                    )
                  })}
              </div> */}
            </div>
          </div>
          <el-tabs class="shop-card" type="border-card">
            <el-tab-pane label="点餐">
              <ul class="shop-card-list">
                {this.shop.food &&
                  this.shop.food.map((item: any) => {
                    return (
                      <li onClick={() => this.viewFood(item)} key={item.id}>
                        <img src={item.url} />
                        <div class="shop-card-list-text">
                          <p class="shop-card-list-name">{item.foodName}</p>
                          <p class="shop-card-list-desc">{item.desc}</p>
                          <p class="shop-card-list-sold">{item.sold}</p>
                        </div>
                        <p class="shop-card-list-price">￥{item.foodPrice}</p>
                        <a class="none" onClick={(e: any) => this.addShoppingCart(item, e)}>
                          Add to shopcart
                        </a>
                        <el-button
                          onClick={(e: any) => this.addShoppingCart(item, e)}
                          class="none-600"
                          type="primary"
                          icon="el-icon-plus"
                          plain>
                          Add to shopcart
                        </el-button>
                      </li>
                    )
                  })}
              </ul>
            </el-tab-pane>
            <el-tab-pane class="shop-card-appraisal" label="评价">
              <Appraisal></Appraisal>
            </el-tab-pane>
          </el-tabs>
        </div>
        <eaten-footer></eaten-footer>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
.shop-wrapper {
  .shop {
    width: $bodyWidth;
    margin: 1.25rem auto;
    &-header {
      margin-top: 1.25rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #666;
      background-color: #fff;
      border-radius: 0.63rem;
      padding: 1.25rem 1.25rem 2.06rem;
      border: 1px solid #e5e5e5;
      box-shadow: 0 5px 0.88rem 0 rgb(0 0 0 / 10%);
      &-left {
        flex: 0 0 53.25rem;
        &-title {
          font-size: 1.63rem;
          line-height: 2.31rem;
          margin: 0;
        }
        & > div {
          border-bottom: 1px solid #e5e5e5;
          margin-top: 1.56rem;
          width: 90%;
          &:nth-child(1) {
            margin-top: 0.63rem;
            & > div {
              display: flex;
              margin: 0.63rem 0;
              p {
                margin: 0;
                font-size: 1rem;
              }
            }
          }
          &:nth-child(2) {
            p {
              font-size: 0.88rem;
            }
          }
          &:nth-child(3) {
            border: none;
          }
          ul {
            display: flex;
            margin-top: 0.63rem;
            li {
              margin-right: 1.25rem;
              text-align: center;
              img {
                width: 1.5rem;
                height: 1.5rem;
              }
            }
          }
        }
      }
      &-right {
        flex: 0 0 20.88rem;
        .img-top {
          img {
            width: 380px;
          height: 214px;
          }
          
        }
      }
    }
    &-card {
      margin-top: 1.25rem;
      ::v-deep .el-tabs__header .el-tabs__item {
        text-align: center;
        width: 11.25rem;
        line-height: 3.75rem;
        height: 3.75rem;
        font-size: 1.06rem;
      }
      ::v-deep .el-tabs__content .el-tabs__item {
        height: 4.69rem;
        line-height: 4.69rem;
        font-size: 1rem;
      }
      &-list {
        min-height: 52.94rem;
        img {
          width: 6.25rem;
        }
        li {
          position: relative;
          > a {
            position: absolute;
            right: 8px;
            bottom: 20px;
            font-size: 9px;
            color: #409eff;
          }
        }
        &-name {
          font-size: 1rem;
          margin-top: 0;
        }
        &-desc {
          font-size: 0.88rem;
          color: #868a8a;
        }
        &-sold {
          font-size: 0.75rem;
          color: #666;
        }
        &-price {
          font-size: 1.88rem;
          color: #f60;
          width: 18.75rem;
          position: relative;
        }
        &-text {
          margin: 0 1.88rem;
          width: 33.13rem;
        }
        li {
          height: 6.25rem;
          display: flex;
          border-bottom: 1px solid #e5e5e5;
          padding: 0.63rem 5px;
          cursor: pointer;
          &:hover {
            background-color: #fbfbfb;
          }
          button {
            height: 2.5rem;
            align-self: center;
            border-radius: 0.94rem;
            margin-left: 3.13rem;
          }
        }
      }
      &-appraisal {
        padding: 0.63rem;
        &-tag {
          &::after {
            content: '';
            display: block;
            clear: both;
          }
          li {
            padding: 5px 0.63rem;
            float: left;
            font-size: 0.88rem;
            line-height: 2.13rem;
            padding: 0 0.63rem;
            border: 1px solid #e5e5e5;
            border-radius: 2px;
            margin: 0 0.63rem 0.63rem 0;
            cursor: pointer;
          }
        }
        &-content {
          margin-top: 1.88rem;
          li {
            display: flex;
            & > div {
              .user-name {
                margin: 5px 0;
                font-size: 1rem;
              }
              .mid-line {
                display: flex;
                justify-content: space-between;
                .time {
                  font-size: 0.75rem;
                  line-height: 1.25rem;
                  color: #999;
                }
              }
              .img-list {
                margin: 0.94rem 0;
                .el-image {
                  margin-right: 0.94rem;
                }
              }
              .like {
                text-align: right;
                margin: 3.13rem 1.25rem 1.25rem 0;
                cursor: pointer;
                ::v-deep .el-checkbox__input {
                  display: none;
                }
              }
              &:first-child {
                width: 23.13rem;
              }
              &:last-child {
                border-bottom: 1px solid #e5e5e5;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .shop-wrapper {
    .shop {
      width: $bodyMiniWidth;
      &-header {
        &-left {
          flex: 1;
        }
      }
      &-card {
        margin-top: 1.25rem;
        ::v-deep .el-tabs__header .el-tabs__item {
          text-align: center;
          width: 8.25rem !important;
        }
        &-list {
          img {
            width: 5.25rem;
            height: 5.25rem;
          }
          &-price {
            font-size: 1rem;
            color: #f60;
            width: 18.75rem;
          }
        }
      }
    }
  }
}
</style>
