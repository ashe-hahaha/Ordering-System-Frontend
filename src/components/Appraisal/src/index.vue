<!--
 * @Description: 评论列表
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import Star from '@/components/Star/index'
import { Goods, UserApp } from './index'

@Component({
  components: {Star}
})
export default class Appraisal extends Vue {
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

  protected render() {
    return (
      <div class="shop-card-appraisal">
        <h2 class="shop-card-appraisal-total">111 reviews</h2>
        <ul class="shop-card-appraisal-tag">
          {this.appraisalTags.map((item) => {
            return <li>{item}</li>
          })}
        </ul>
        <ul class="shop-card-appraisal-content">
          {this.appraisals.map((item: UserApp) => {
            return (
              <li key={item.id}>
                <div>
                  <img src={item.avatar} />
                </div>
                <div>
                  <p class="user-name">{item.name}</p>
                  <div class="mid-line">
                    <star showText={true} num={item.rating} size={'13'}></star>
                    <span class="time">{item.time}</span>
                  </div>
                  <span class="appraisal-content">{item.content}</span>
                  <div class="img-list">
                    {item.imgUrl &&
                      item.imgUrl.map((i: string) => {
                        return (
                          <el-image
                            src={i}
                            preview-src-list={item.imgUrl}></el-image>
                        )
                      })}
                  </div>
                  <div class="like">
                    <el-checkbox text-color="">
                      <span>
                        <i class="el-icon-thumb"></i>Like
                      </span>
                    </el-checkbox>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
.shop-card-appraisal {
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
        img {
          width: 3.75rem;
        }
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
            margin-right: 0.63rem;
            width: 10.3rem;
            height: 10.3rem;
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
        &:last-child {
          margin-left: 0.94rem;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
