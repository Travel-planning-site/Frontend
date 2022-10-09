<template>
  <div class="SidebarBox">
    <b-container flex>
      <b-row>
        <b-col id="image_col" cols="12" md="auto">
          <b-img-lazy id="image" center thumbnail src="https://picsum.photos/125/125/?image=58"></b-img-lazy>
        </b-col>
        <b-col class="info_container">
          <b-row class="info_items">
            <b-col class="info" center cols="12" md="auto">
              <div id="info_place">{{savedProps.placeName}}</div>
              <div id="info_address" style="color: gray">{{savedProps.addressName}}</div>
            </b-col>
            <b-col class="buttons" cols="12" md="auto">
              <b-row class="buttons">
                <b-col><b-button size="sm" style="font-size: .8vw; padding: 5px;" @click="startingClicked">출발지로 지정</b-button></b-col>
                <b-col><b-button size="sm" style="font-size: .8vw; padding: 5px;" @click="destinationClicked">도착지로 지정</b-button></b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'SidebarBox',
  props: {
    savedProps: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    startingClicked () {
      this.$emit('startingonClicked', this.index)
    },
    destinationClicked () {
      this.$emit('destinationClicked', this.index)
    }
  }
}
</script>

<style>
  .SidebarBox {
    border: 1px solid black;
    border-radius: 15px;
  }
  .info_container {
    display: inline-flex;
  }
  .info_items {
    align-content: space-evenly;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .info{
    word-break: keep-all;
    display: block;
    flex-wrap: wrap;
    font-size: .9vw;
  }
  .buttons {
    flex-wrap: wrap;
    word-break: keep-all;
  }
  #image {
    width: 130px;
    height: 130px;
  }
  #info_place{
    padding-bottom: 2px;
  }
</style>
