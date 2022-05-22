<template>
  <div class="SidebarBox">
    <b-container>
      <b-row>
        <b-col id="image_col" sm="3">
          <b-img id="image" center src="https://picsum.photos/125/125/?image=58"></b-img>
        </b-col>
        <b-col class="info_col">
          <b-row>
            <b-col class="info">
              <div>{{savedProps.place_name}}</div>
              <div>{{savedProps.address_name}}</div>
            </b-col>
            <b-col class="buttons">
              <div><b-button style="margin: 5px;">출발지로 지정</b-button></div>
              <div><b-button>도착지로 지정</b-button></div>
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
  }
}
</script>

<style>
  .info{
    word-break: keep-all;
  }
  .info_col {
    margin: 10px;
  }
  #image {
    max-width: 130px;
  }
</style>
