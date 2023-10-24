<!--
 * @Description: 页脚
 * @Author: Friends233
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class EatenFooter extends Vue {
  staticDataOne: Array<string> = ['About us', 'NUS-ISS', 'SWE5001', 'Achitecting Scalable System', 'Team02', 'Food delivery platform']

  protected render() {
    return (
      <div class="eaten-footer">
        <p>
          About us 
        </p>
        <p>
          NUS-ISS SWE5001 Achitecting Scalable System
        </p>
        <p>
          Team02 Food delivery platform
        </p>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
.eaten-footer {
  width: $bodyWidth;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  border-top: 1px solid #E5E5E5;
  margin-top: 50px;
  p {
    text-align: center;
    &:first-child {
      font-size: 14px;
      text-align: center;
    }
    font-size: 12px;
    color: #999aaa;
  }
}
@media screen and (max-width: 600px) {
  .eaten-footer {
    width:$bodyMiniWidth;
    p {
      font-size: 10px !important;
    }
  }
}
</style>
