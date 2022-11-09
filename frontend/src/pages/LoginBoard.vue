<template>
  <div class="LoginBoard">
    <b-container fluid>
      <b-row align-h="center">
        <b-card id="bcard" no-body>
          <b-card id="subcard" title="로그인 / 회원가입" sub-title="Google Login" bg-variant="light">
            <b-card-text>
              구글 계정과 연동되어 로그인/회원가입이 진행됩니다.
            </b-card-text>
            <b-button variant="outline-warning"
              @click="LoginonClicked()">
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
import { LOCAL_URL } from '../url/BackendUrl'
import axios from 'axios'

export default {
  name: 'LoginBoard',
  data () {
    return {
      userEmail: null
    }
  },
  methods: {
    LoginonClicked () {
      this.requestServercode()
    },
    requestServercode () {
      window.location.assign('http://localhost:9090/user/login')
    },
    requestAccessToken (refreshtoken) {
      const requestURL = LOCAL_URL + '/refresh?index=' + refreshtoken
      axios.post(requestURL)
        .then(res => {
          console.log(res)
        })
    },
    findUserInfo () {
      axios.get(LOCAL_URL + '/info')
    }
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
