<template>
  <div class="savedBox" v-if="selectedBox">
    <b-card no-body>
      <b-row>
        <b-col>
          <div id="savedBox_Header">
            {{place.place_name}}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-body class="savedBox_Body">
            <b-card-sub-title class="savedBox_Body" style="margin-bottom: 5px;">{{place.place_addr}}</b-card-sub-title>
            <b-button block class="savedBox_Body" @click="DeleteOnClicked">Delete</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    selectedBox: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      place: this.selectedBox,
      id: this.index
    }
  },
  methods: {
    DeleteOnClicked () {
      this.$emit('DeleteFromSavedBox', this.id)
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
