<!--
 * @Description: 注册
 * @Author: Friends233
-->
<script lang="tsx">
import { Button } from 'element-ui'
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/logo/index'
import { Form, User } from './index'
import { userLogin, userRegister } from '@/api/user'

@Component({
  components: { Logo }
})
export default class Register extends Vue {
  $refs!: {
    ruleForm: any;
  }

  ruleForm: Form = {}

  rules = {
    userName: [
      { required: true, message: 'Please input the Firstname', trigger: 'blur' },
      { min: 3, max: 12, message: '3 to 12 characters in length', trigger: 'change' }
    ],
    // phoneNumber: [{ type: 'phoneNumber', required: true, message: '请输入手机号码', trigger: 'change' }],
    checkPass: [
      { required: true, message: 'Please enter your password again', trigger: 'blur' },
      { min: 6, max: 20, message: 'Password length between 6 and 20 characters', trigger: 'change' },
      { validator: this.validateCheckPass, trigger: 'blur' }
    ],
    checked: [{ required: true, message: 'Please check the service agreement', trigger: 'blur' }],
    password: [
      { required: true, message: 'Please enter your password', trigger: 'blur' },
      { min: 6, max: 20, message: 'Password length between 6 and 20 characters', trigger: 'change' }
    ]
  }

  validateCheckPass(rule: any, value: string, callback: Function) {
    if (value && value !== this.ruleForm.password) {
      callback('Inconsistency between two email entries')
    }
    callback()
  }

  submitForm() {
    try {
      this.$refs.ruleForm.validate(async (status: boolean) => {
        const params: User = {
          userName: this.ruleForm.userName || '',
          userPass: this.ruleForm.password || '',
          userAvatar: 'abc'
        }
        if (status) {
          // const res: any = await userRegister(params)
          const res: any = await userRegister(this.ruleForm.userName, this.ruleForm.password, 'abc')
          console.log(res)
          if (res.code == 1) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.ruleForm = {}
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  protected render() {
    return (
      <div class="login-form-wrapper">
        <div class="login-top">
          <logo></logo>
          <router-link to={{ name: 'login' }}>Login</router-link>
        </div>
        <div class="top-line"></div>
        <div class="login-form">
          <h2>Signup</h2>
          <el-form
            {...{
              props: {
                model: this.ruleForm
              }
            }}
            rules={this.rules}
            status-icon
            ref="ruleForm"
            class="ruleForm">
            <el-form-item label="Firstname" prop="userName">
              <el-input v-model={this.ruleForm.userName}></el-input>
            </el-form-item>
            <el-form-item label="Lastname" prop="verificationCode">
              <el-input v-model={this.ruleForm.verificationCode}></el-input>
            </el-form-item>
            <el-form-item label="Phone number" prop="phoneNumber">
              <el-input v-model={this.ruleForm.phoneNumber}></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model={this.ruleForm.password} autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Check password" prop="checkPass">
              <el-input type="password" v-model={this.ruleForm.checkPass} autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checked">
              <el-checkbox v-model={this.ruleForm.checked}>Agree to FDP User Service Agreement</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" onClick={this.submitForm}>
                Sign up
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constant.scss';
.login-form-wrapper {
  .login-top {
    width: $miniWidth;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      margin-right: 10px;
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid bisque;
      background-color: #ffc300;
      font-size: 12px;
      border-radius: 2px;
      &:hover {
        background-color: #ffc400d0;
      }
    }
  }
  .top-line {
    width: 100%;
    border-top: 4px solid #d8d8d8;
  }
  .login-form {
    width: 500px;
    margin: 0 auto;
    .el-form-item {
      margin-bottom: 15px;
      ::v-deep label {
        width: 100%;
        text-align: left;
      }
      &:last-child {
        margin-top: 25px;
        ::v-deep .el-form-item__content {
          button {
            width: 100%;
          }
        }
      }
      &:nth-child(2) {
        ::v-deep .el-input {
          width: 100%;
        }
      }
    }
    h2 {
      text-align: center;
    }
  }
}
@media screen and (max-width: 600px) {
  .login-form-wrapper {
    .login-top {
      width: $bodyMiniWidth;
    }
    .login-form {
      width: $bodyMiniWidth;
      .el-form-item {
        &:nth-child(2) {
          ::v-deep .el-input {
            width: 65%;
          }
        }
      }
    }
  }
}
</style>
