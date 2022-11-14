<template>
    <div class="main">
        <b-container fluid="fluid">
            <b-row id="header-page" cols="6">
                <b-col cols="6" md="md" style="text-align: right">
                    <b-button id="login" v-if="!isLogin"
                        @click="$router.push('LoginBoard')">
                        Login
                    </b-button>
                    <b-button id="logout" v-if="isLogin"
                        @click="Logout()">
                        Logout
                    </b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="logoImage">
                    <b-img
                        id="image"
                        src="/static/image/main.png"
                        fluid="fluid"
                        alt="Responsive image"></b-img>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="buttons">
                    <b-button
                        id="makeButton"
                        style="font-size: 2.6rem"
                        variant="light"
                        @click="IsAbletoMake()">
                        Make a Travel Plan
                    </b-button>
                    <b-button style="font-size: 2.6rem"
                        variant="light"
                        @click="IsAbletoMyplan()">
                        My Plans
                    </b-button>
                </b-col>
            </b-row>
            <b-row></b-row>
        </b-container>
    </div>
</template>

<script>
// import { LOCAL_URL } from '../url/BackendUrl'
// import axios from 'axios'

export default {
  name: 'MainPage',
  data () {
    return {
      userInfo: null,
      isLogin: false,
      token: null
    }
  },
  watch: {
    token: function (notExpired) {
      if (!notExpired) {
        console.log('만료')
        this.isLogin = false
        this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
      }
    }
  },
  mounted () {
    const token = this.$cookies.get('token') || false
    const info = this.$cookies.get('info') || false
    if ((token) || (info)) {
      this.token = token
      this.isLogin = true
      this.userInfo = info
    }
  },
  methods: {
    Logout () {
      this.isLogin = false
      this.$cookies.remove('info')
      this.userInfo = null
      alert('로그아웃되었습니다!')
    },
    IsAbletoMake () {
      if (!this.isLogin) {
        alert('로그인 이후 계획을 만들 수 있습니다!')
      } else {
        this.$router.push('BasicInfo')
      }
    },
    IsAbletoMyplan () {
      if (!this.isLogin) {
        alert('로그인 이후 사용 가능합니다!')
      } else {
        this.$router.push('MyPlan')
      }
    }
  }
}
</script>

<style scoped="scoped">
    @font-face {
        font-family: 'yg-jalnan';
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff") format('woff');
        font-weight: normal;
        font-style: normal;
    }

    .main {
        margin-left: 10px;
    }
    .logoImage {
        padding-top: 45px;
        text-align: center;
    }
    .buttons {
        text-align: center;
        padding: 30px;
        font-family: yg-jalnan;

    }
    #header-page {
        margin: 15px 15px 20px;
    }
    #makeButton {
        margin-right: 10px;
    }
    #login, #logout {
        font-size: 20px;
        font-family: yg-jalnan;
    }

    #image {
        width: 700px;
        height: 500px;
    }
</style>
