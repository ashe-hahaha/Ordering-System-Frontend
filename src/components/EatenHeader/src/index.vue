<!--
 * @Description: 导航栏
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Logo from '@/components/logo/index'
import { createRandomId } from '@/utils/index'
import ShoppingCart from '@/components/Shoppingcart'
import { Nav } from './index'

@Component({
  components: { Logo, ShoppingCart }
})
export default class EatenHeader extends Vue {
  [x: string]: any
  @Prop({ default: false, type: Boolean }) readonly show: boolean | undefined

  appView = require('@/assets/download-qr.png')

  // 顶部的菜单
  topNavMenu: Array<Nav> = [
    {
      id: '1',
      routerLink: 'test1',
      value: 'User Center',
      children: [
        { id: '1-1', value: 'My Orders', routerLink: 'order' },
        { id: '1-3', value: 'My Favorites', routerLink: 'favorites' },
        { id: '1-2', value: 'coupon', routerLink: 'coupon' },
        { id: '1-4', value: 'Account Settings', routerLink: 'account' }
      ]
    },
    // {
    //   id: '2',
    //   value: '手机访问',
    //   routerLink: 'test4',
    //   onMouseover: this.appViewer
    // },
    {
      id: '3',
      value: 'Shopping Cart',
      routerLink: 'test7',
      onClick: this.showShoppingCart
    },
    // {
    //   id: '4',
    //   value: '网站导航',
    //   routerLink: 'test5',
    //   children: [
    //     { id: '3-1', value: '美团外卖', routerLink: 'test6' },
    //     { id: '3-2', value: '饿了么外卖', routerLink: 'test7' }
    //   ]
    // }
  ]
  // 轮播旁的菜单
  headerNavMenu: Array<Nav> = [
    { id: createRandomId(), value: 'Food deliver' },
    { id: createRandomId(), value: 'Supermaket' },
    { id: createRandomId(), value: 'Fruit' },
    { id: createRandomId(), value: 'Errand' },
    { id: createRandomId(), value: 'Entertainment' }
  ]

  searchContent = ''

  // 登陆状态
  get isLogin() {
    return this.$store.getters.loginStatus
  }

  get userName() {
    return this.$store.getters.userName
  }

  appViewer(view: string) {
    const appview: any = this.$refs.appView
    appview.style.display = view
  }

  showShoppingCart() {
    this.$showCart()
  }

  handleSelect(key: string) {
    if (!key.includes('test')) {
      this.$router.push({ name: key })
    }
  }

  logOut() {
    this.$store.dispatch('Logout')
    this.$router.go(0)
  }

  goView(name = '') {
    if (name !== '') {
      this.$router.push({ name: name })
    }
  }

  async serachFood(keywords: string) {
    if (this.$route.name !== 'search') {
      this.$router.push({ name: 'search', params: { keywords: keywords } })
    } else {
      this.$EventBus.$emit('searchFood', keywords)
    }
  }

  renderTopNavMenu(ary: Array<Nav>) {
    return ary.map((item: Nav) => {
      if (item.children) {
        return (
          <el-submenu index={item.routerLink}>
            <template slot="title">{item.value}</template>
            {item.children.map((i: Nav) => {
              return <el-menu-item index={i.routerLink}>{i.value}</el-menu-item>
            })}
          </el-submenu>
        )
      } else {
        return (
          <el-menu-item index={item.routerLink}>
            <span
              onClick={() => item.onClick && item.onClick()}
              onMouseout={() => item.onMouseover && item.onMouseover('none')}
              onMouseover={() => item.onMouseover && item.onMouseover('block')}>
              {item.value}
            </span>
          </el-menu-item>
        )
      }
    })
  }

  protected render() {
    return (
      <div class="eaten-header">
        <div class="eaten-header-top">
          <div class="eaten-header-top-left">
            {/* <div class="eaten-header-top-left-address">
              <i class="el-icon-map-location"></i>
              <span>Singapore</span>
              <a class="eaten-header-top-left-btn" href="#">
                change location
              </a>
              <span class="none-600">[Western NUS]</span>
            </div> */}
            <div class="eaten-header-top-left-user">
              <div v-show={!this.isLogin} class="isLoginF">
                <router-link class="orange" to={{ name: 'login' }}>
                  Log in
                </router-link>
                <router-link to={{ name: 'register' }}>Sign Up</router-link>
              </div>
              <div v-show={this.isLogin} class="isLoginT">
                <router-link class="orange" to={{ name: 'account' }}>
                  {this.userName}
                </router-link>
                <a href="#" onClick={this.logOut}>
                  Log out
                </a>
              </div>
            </div>
          </div>
          <div class="user-ico none" onClick={() => this.$router.push({ name: 'account' })}>
            <i class="el-icon-user"></i>
          </div>
          <div class="eaten-header-top-right none-600">
            <el-menu default-active="activeIndex" mode="horizontal" onSelect={this.handleSelect}>
              {this.renderTopNavMenu(this.topNavMenu)}
            </el-menu>
            <div class="app-view" ref="appView">
              <img src={this.appView} />
            </div>
          </div>
        </div>
        <div class="eaten-header-mid">
          <div class="eaten-header-mid-logo">
            <logo></logo>
          </div>
          <div class="eaten-header-mid-search">
            <el-input
              v-model={this.searchContent}
              onChange={() => this.serachFood(this.searchContent)}
              placeholder="Enter the food name or tags"></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              {...{
                on: {
                  '!click': () => this.serachFood(this.searchContent)
                }
              }}></el-button>
          </div>
        </div>
        <div v-show={this.show} class="eaten-header-nav">
          <ul>
            {this.headerNavMenu.map((item) => {
              return (
                <li key={item.id} class="eaten-header-nav-list">
                  {item.value}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';

.eaten-header {
  min-height: 197px;
  background: #fff;
  box-shadow: 0 2px 27px 0 rgba(0, 0, 0, 0.1);
  &-top {
    width: 100%;
    background: #f8f8f8;
    box-sizing: border-box;
    font-size: 12px;
    color: #999;
    height: 40px;
    padding: 0 $padding;
    display: flex;
    justify-content: space-between;
    /*搜索组件最外层div */
    .eaten-header-mid-search {
      width: 300px;
      margin-right: 15px;
      border-radius: 95px;
      background: rgb(0 234 245 / 48%);
    }
    /*搜索input框 */
    :deep(.el-input__wrapper) {
      background-color: transparent;/*覆盖原背景颜色，设置成透明 */
      border-radius: 95px;
      border: 0;
      box-shadow: 0 0 0 0px;
    }
    /*搜索button按钮 */
    :deep(.el-input-group__append) {
      background: rgb(0 234 245 / 48%);
      border-radius: 95px;
      border: 0;
      box-shadow: 0 0 0 0px;
    }
    .user-ico {
      line-height: 40px;
      cursor: pointer;
      i {
        font-size: 15px;
      }
    }
    &-left {
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      &-address {
        display: flex;
        justify-content: space-between;
        height: 20px;
        i {
          padding-top: 3px;
        }
        a {
          &:hover {
            color: #fe8c00;
          }
          background: #f4f4f4;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          color: #666;
          margin: 0 4px;
          padding: 0 2px;
        }
      }
      &-user {
        & > div {
          display: flex;
          justify-content: space-between;
          margin-left: 30px;
          width: 100px;
          .orange {
            color: #fe8c00;
          }
        }
      }
    }
    &-right {
      position: relative;
      ::v-deep .el-menu {
        background-color: #f8f8f8;
        height: 40px;
        border-bottom: none;
        .el-submenu > div {
          i {
            display: none;
          }
          height: 40px;
          line-height: 40px;
          border-bottom: none;
        }
      }
      ::v-deep .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
      .app-view {
        position: absolute;
        left: 96px;
        display: none;
        padding: 5px;
        margin-top: 5px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        img {
          width: 86px;
        }
      }
    }
  }
  &-mid {
    width: $bodyWidth;
    margin: 30px auto;
    display: flex;
    &-logo {
      img {
        width: 126px;
        height: 46px;
      }
    }
    &-search {
      display: flex;
      width: 550px;
      margin: 6px auto;
      ::v-deep .el-input {
        margin-left: -46px;
        input {
          border-radius: 0;
        }
      }
      .el-button {
        height: 40px;
        width: 70px;
        border-radius: 0;
      }
    }
  }
  &-nav {
    width: $bodyWidth;
    padding: 0 $padding;
    margin-top: 2px;
    ul {
      display: flex;
      justify-content: space-between;
      width: 500px;
      margin: 0 auto;
    }
    &-list {
      color: #222;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #fbc700;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .eaten-header {
    &-mid {
      flex-wrap: wrap;
      width: $bodyMiniWidth;
      &-logo {
        margin: 0 auto;
      }
      &-search {
        ::v-deep .el-input {
          margin-left: 0;
        }
      }
    }
    &-nav {
      display: none;
    }
  }
}
</style>
