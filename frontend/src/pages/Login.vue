<template>
  <div class="Login">
  </div>
</template>

<script>
import { LOCAL_URL } from '../url/BackendUrl'
import axios from 'axios'

export default {
  name: 'Login',
  mounted () {
    console.log('생성')
    this.getToken()
    this.getUserInfo()
    setTimeout(this.goMain, 1000)
  },
  methods: {
    getToken () {
      axios.get(LOCAL_URL + '/user/token')
        .then(res => {
          this.token = res
          this.$cookies.set('token', res.data.accessToken, 1800000)
          // 30분만료
        })
    },
    getUserInfo () {
      axios.get(LOCAL_URL + '/user/userInfo', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('token')
        }
      }).then(res => this.saveUserToCookie(res.data))
    },
    goMain () {
      this.$router.push('/')
    },
    saveUserToCookie (res) {
      const info = {
        id: res.userId,
        name: res.userName,
        email: res.userEmail
      }
      this.$cookies.set('info', info, 1800000)
    }
  }
}
</script>
