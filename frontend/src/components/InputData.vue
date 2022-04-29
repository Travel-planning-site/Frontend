<template>
    <div class="body">
      <b-container cols="6">
        <b-row>
            <b-col cols="6"><input-data-form></input-data-form></b-col>
            <b-col><kakao-map></kakao-map></b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import KakaoMap from './KakaoMap.vue'

export default{
  components: { KakaoMap, InputDataForm },
  name: 'InputData',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
