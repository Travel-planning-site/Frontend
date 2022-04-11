<template>
  <div class="savedBox">
    <b-card no-body>
      <b-row>
        <b-col>
          <div id="savedBox_Header">
            {{place_name}}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-body class="savedBox_Body">
            <b-card-sub-title class="savedBox_Body" style="margin-bottom: 5px;">{{place_addr}}</b-card-sub-title>
            <b-button block class="savedBox_Body">Delete</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      place_name: '장소이름',
      place_addr: '장소주소'
    }
  }
}
</script>
<style scoped>
#savedBox_Header {
  white-space: nowrap;
}
.savedBox_Body {
  white-space: nowrap;
  text-align: center;
}
.savedBox {
  padding: 10px;
}
</style>
