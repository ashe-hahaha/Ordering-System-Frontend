<!--
 * @Description: 账户信息
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import EatenHeader from '@/components/EatenHeader/index'
import EatenFooter from '@/components/EatenFooter/index'

@Component({
  components: { EatenHeader, EatenFooter }
})
export default class UserInfo extends Vue {
  navList: { label: string; type: string; routLink: any }[] = [
    { label: 'My order', type: 'big', routLink: { name: 'order', index: 1 } },
    { label: 'All order', type: 'mid', routLink: { name: 'order', index: 1 } },
    { label: 'Waiting for pay', type: 'mid', routLink: { name: 'order', index: 2 } },
    { label: 'Waiting for comment', type: 'mid', routLink: { name: 'order', index: 3 } },
    { label: 'After sale', type: 'mid', routLink: { name: 'order', index: 4 } },
    { label: 'My favorite', type: 'big', routLink: { name: 'favorites', index: 1 } },
    { label: 'Collection of businesses', type: 'mid', routLink: { name: 'favorites', index: 1 } },
    { label: 'Collection of discount', type: 'mid', routLink: { name: 'favorites', index: 2 } },
    { label: 'Coupon', type: 'big', routLink: { name: 'coupon', index: 1 } },
    { label: 'Available coupon', type: 'mid', routLink: { name: 'coupon', index: 1 } },
    { label: 'Expired coupon', type: 'mid', routLink: { name: 'coupon', index: 2 } },
    { label: 'Personal info', type: 'big', routLink: { name: 'account', index: 1 } },
    { label: 'Account setting', type: 'mid', routLink: { name: 'account', index: 1 } }
  ]

  beforeCreate() {
    if (!this.$store.getters.loginStatus) {
    // if (this.$store.getters.loginStatus) {
      this.$alert('Please login first', 'Hint', {
        confirmButtonText: 'Confirm',
        type: 'warning'
      }).finally(() => {
        this.$router.go(-1)
      })
    }
  }

  goView(link: any) {
    const { name, index } = link
    if (index !== 0 && name !== '') {
      this.$router.push({ name: 'Home' })
      this.$router.push({ path: `/${name}?index=${index}` })
    }
  }

  protected render() {
    return (
      <div class="userInfo">
        <eaten-header></eaten-header>
        <div class="userInfo-mid">
          <ul class="userInfo-mid-left">
            {this.navList.map((item) => {
              return (
                <li class={item.type} onClick={() => this.goView(item.routLink)}>
                  {item.label}
                  <i v-show={item.type === 'mid'} class="el-icon-arrow-right"></i>
                </li>
              )
            })}
          </ul>
          <div class="userInfo-mid-right">
            <router-view key={this.$route.path}></router-view>
          </div>
        </div>
        <eaten-footer></eaten-footer>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
.userInfo {
  &-mid {
    width: $bodyWidth;
    min-height: 710px;
    margin: 30px auto;
    display: flex;
    &-left {
      padding: 0.94rem 1.25rem;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      width: 14.38rem;
      box-sizing: border-box;
      li {
        margin-bottom: 0.94rem;
        cursor: pointer;
        i {
          font-size: 0.75rem;
          font-weight: 700;
          float: right;
        }
      }
      .big {
        font-size: 1rem;
        color: #222222;
        font-weight: 500;
        margin-top: 1.75rem;
        &:first-child {
          margin-top: 0;
        }
        &:hover {
          color: #fe8c00;
        }
      }
      .mid {
        font-size: 0.88rem;
        color: #666;
      }
    }
    &-right {
      width: 56.75rem;
      padding: 0.94rem 1.25rem;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      box-sizing: border-box;
      margin-left: 0.63rem;
    }
  }
}
@media screen and (max-width: 600px) {
  .userInfo {
    &-mid {
      width: $bodyMiniWidth;
      min-height: 400px;
      &-left {
        width: 25%;
      }
      &-right {
        width: 70%;
      }
    }
  }
}
</style>
