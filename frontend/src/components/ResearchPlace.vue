<template>
    <div>
        <b-container fluid="fluid">
            <b-row>
              <p>Travel-Plan</p>
                <b-col class="search_body">
                    <b-container>
                        <div class="search_area">
                            <b-row class="area_searching">
                                <b-col>
                                    <b-input-group>
                                        <b-input-group-prepend is-text="is-text">
                                            <b-icon icon="search"></b-icon>
                                        </b-input-group-prepend>
                                        <b-form-input type="search" v-bind="search_term" placeholder="장소검색"></b-form-input>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                            <b-row class="result_searched">
                              <b-col cols="3" id="result_box">
                                <div>
                                  <b-img src="https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg" rounded center></b-img>
                                </div>
                                <div>
                                  장소
                                </div>
                                <div>
                                  주소
                                </div>
                              </b-col>
                            </b-row>
                        </div>
                    </b-container>
                </b-col>
                <b-col cols="3" class="container_savedplace">
                    <div class="savedplace_area">
                      <div id="savedplace_area_Header">저장된 장소</div>
                      <div id="savedplace_area_Body">Body</div>
                      <b-row cols="2" id="savedplace_area_Footer">
                      <b-col><b-button block>Back</b-button></b-col>
                      <b-col><b-button block>Next</b-button></b-col>
                      </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'ResearchPlace',
  data () {
    return {
      search_term: ''
    }
  }
}
</script>

<style scoped>
  .search_body {
    margin-top: 10%;
  }
  .area_searching {
    margin-bottom: 10%;
    background-color: yellow;
  }
  .result_searched {
    background-color:  gray;
  }
  .container_savedplace {
    background-color: gray;
    height: 100vh;
    text-align: center;
  }
  #result_box {
    background-color:white;
    margin: 10px;
    text-align: center;
  }
  #result_box div {
    margin: 10px;
  }
  #savedplace_area_Header {
    background-color: white;
    height: 5vh;
    margin: 10px;
  }
  #savedplace_area_Body {
    background: white;
    margin: 10px;
    height: 80vh;
  }
  #savedplace_area_Footer {
    margin: 10px;
    margin-top: 20px;
    height: 5vh;
    background-color: white;
  }
  img {
    max-width: 200px;
  }
</style>
