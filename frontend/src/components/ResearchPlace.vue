<template>
    <div class="ResearchPlace_page">
        <b-container fluid="fluid">
            <b-row>
                <b-col cols="9" class="search_body">
                  <div id="Page_name">
                    Travel Plan
                  </div>
                    <b-container>
                        <div class="search_area">
                            <b-row class="area_searching">
                                <b-col>
                                  <div style="padding: 2px;">
                                    <b-input-group>
                                        <b-input-group-prepend is-text="is-text">
                                            <b-icon icon="search"></b-icon>
                                        </b-input-group-prepend>
                                        <b-form-input type="search" v-bind="search_term" :search_term="search_term" placeholder="장소검색" @keyup.enter="searchOnEntered"></b-form-input>
                                    </b-input-group>
                                  </div>
                                </b-col>
                            </b-row>
                            <b-row class="result_searched">
                              <b-col cols="3" id="result_box">
                                <b-row>
                                  <result-list :results="results" @SelectFromResult_List="SelectFromResult_List"></result-list>
                                </b-row>
                              </b-col>
                            </b-row>
                        </div>
                    </b-container>
                </b-col>
                <b-col cols="3" class="container_savedplace">
                    <div class="savedplace_area">
                      <div id="savedplace_area_Header">저장된 장소</div>
                      <savedplace-list :selectedList="resultList" @DeleteFromSavedBox="DeleteFromSavedBox" id="savedplace_area_Body"></savedplace-list>
                      <b-row cols="2" id="savedplace_area_Footer">
                        <b-col><b-button block @click="$router.go(-1)">Back</b-button></b-col>
                        <b-col><b-button block @click="$router.push('InputData')">Next</b-button></b-col>
                      </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script>
import ResultBox from './ResultBox.vue'
import axios from 'axios'
export default {
  components: { ResultBox },
  name: 'ResearchPlace',
  data () {
    return {
      results: {
        place_img: 'https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg',
        place_name: '장소이름',
        place_addr: '장소주소'
      },
      selectedList: {
        place_img: '',
        place_name: '',
        place_addr: ''
      },
      search_term: null,
      resultList: [],
      savedcheck: false
    }
  },
  methods: {
    SelectFromResult_List: function (selected) {
      this.CheckValidationOfSaved(selected)
    },
    CheckValidationOfSaved: function (selected) {
      var i
      if (Object.keys(selected).length > 0) {
        if (this.resultList.length === 0) {
          this.resultList.push(selected)
        } else {
          for (i = 0; i < this.resultList.length; i++) {
            if (selected.place_addr !== this.resultList[i].place_addr) {
            }
          }
        }
        this.savedcheck = true
      }
    },
    DeleteFromSavedBox: function (index) {
      this.resultList.splice(index, 1)
    },
    searchOnEntered: function () {
      console.log('검색어: ' + this.search_term)
      if (this.search_term !== null) {
      axios
        .get(
          'http://localhost:9090/kakao/search' + query
        )
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  .search_body {
    margin-top: 10%;
  }
  .area_searching {
    margin-bottom: 10%;
    background-color: gray;
  }
  .result_searched {
    background-color:  gray;
  }
  .container_savedplace {
    background-color: gray;
    height: 100%;
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
  .ResearchPlace_page {
    min-width: 900px;
    width: auto;
    overflow: hidden;
  }
  .row {
    display: flex;
  }
  #Page_name {
    font-family: yg-jalnan;
    margin: 10px;
    font-size: 50px;
    text-align: center;
  }
</style>
