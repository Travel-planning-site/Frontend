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
    this.start()
  },
  methods: {
    async start () {
      console.log('생성')
      var token = await this.getToken()
      this.$cookies.set('token', token, 3600)
      this.getUserInfo()
      setTimeout(this.goMain, 1000)
    },
    getToken () {
      return new Promise(function (resolve) {
        axios.get(LOCAL_URL + '/user/token')
          .then(res => {
            console.log(res)
            resolve(res.data.accessToken)
          })
      })
    },
    getUserInfo () {
      var token = this.$cookies.get('token') || false
      if (token) {
        axios.get(LOCAL_URL + '/user/userInfo', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }).then(res => {
          this.saveUserToCookie(res.data)
          console.log(res.data)
        })
      }
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
      this.$cookies.set('info', JSON.stringify(info), 3600)
    }
  }
}
</script>
