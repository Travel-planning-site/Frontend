<template>
    <div class="main">
        <b-container fluid="fluid">
            <b-row id="header-page" cols="6">
                <b-col cols="6" md="md" style="text-align: right">
                    <b-button id="login" v-if="!isLogin" @click="$router.push('LoginBoard')">Login</b-button>
                    <p v-if="isLogin">Logout</p>
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
                        @click="$router.push('BasicInfo')">Make a Travel Plan</b-button>
                    <b-button style="font-size: 2.6rem" variant="light" @click="$router.push('MyPlan')">My Plans</b-button>
                </b-col>
            </b-row>
            <b-row></b-row>
        </b-container>
    </div>
</template>

<script>
import { LOCAL_URL } from '../url/BackendUrl'
import axios from 'axios'

export default {
  name: 'MainPage',
  created () {
    if (new URL(window.location.href).searchParams.get('code')) {
      var googleCode = new URL(window.location.href).searchParams.get('code')
      console.log(googleCode)
      this.requestUserInfo(new URL(window.location.href).searchParams.get('code'))
    }
  },
  data () {
    return {
      // eslint-disable-next-line indent
        isLogin: false
    }
  },
  methods: {
    async requestUserInfo (googleCode) {
      console.log(googleCode)
      axios.get(LOCAL_URL + '/login/auth?code=' + googleCode)
      window.location.assign('http://localhost:8080/#/')
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
    #login {
        font-size: 20px;
        font-family: yg-jalnan;
    }

    #image {
        width: 700px;
        height: 500px;
    }
</style>
