<template>
  <div class="LoginBoard">
    <b-container fluid>
      <b-row align-h="center">
        <b-card id="bcard" no-body>
          <b-card id="subcard" title="로그인 / 회원가입" sub-title="Google Login" bg-variant="light">
            <b-card-text>
              구글 계정과 연동되어 로그인/회원가입이 진행됩니다.
            </b-card-text>
            <b-button variant="outline-warning" @click="LoginonClicked()">
            로그인/회원가입
            </b-button>
            <b-button variant="outline-warning" class="btn1">
              <router-link to="/">뒤로가기</router-link>
            </b-button>
          </b-card>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { LOCAL_URL } from '../url/BackendUrl'
// import axios from 'axios'

export default {
  name: 'LoginBoard',
  created () {
  },
  methods: {
    LoginonClicked () {
      const OAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=169713788333-838a0rcafee5k2o0en414val4vgqh3ke.apps.googleusercontent.com&' +
        'response_type=code&' +
        'redirect_uri=http://localhost:8080/login/&' +
        'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
      window.location.assign(OAuthURL)
    }
    // requestAccessToken () {
    // }
  }
}
</script>

<style scoped>
    .Loginboard {
        height: 100vh;
    }
    #bcard {
        max-width: 540px;
        margin-top: 10%;
        border: 0px;
    }
    button {
        background-color: white;
    }
    button:hover{
      color:black;
    }
    a {
        text-decoration: none;
        color: #FFC107;
    }
    a:hover {
      color: black;
    }
</style>
