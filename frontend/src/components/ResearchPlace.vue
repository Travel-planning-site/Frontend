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
                                        <b-form-input type="search" v-model="search_term" placeholder="장소검색" @keyup.enter="searchOnEntered"></b-form-input>
                                        <daum-search :listData="listData" @getImageList="getImageList"></daum-search>
                                    </b-input-group>
                                  </div>
                                </b-col>
                            </b-row>
                            <b-row class="result_searched">
                              <b-col id="result_box">
                                <b-row>
                                  <result-list :listData="listData" :ImageList="ImageList" @SelectFromResult_List="SelectFromResult_List"></result-list>
                                </b-row>
                                <b-row>
                                  <pagination @PageChanged="PageChanged"></pagination>
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
                        <b-col><b-button block @click="nextOnClicked">Next</b-button></b-col>
                      </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ResearchPlace',
  data () {
    return {
      resultList: [],
      savedcheck: false,
      search_term: '',
      search_results: [],
      listData: [],
      total: 0,
      center_postion: {
        x: 33.450701,
        y: 126.570667
      },
      limit: 9,
      block: 4,
      currentPage: '',
      ImageList: [],
      list: []
    }
  },
  methods: {
    SelectFromResult_List: function (selected) {
      this.CheckValidationOfSaved(selected)
    },
    CheckValidationOfSaved: function (selected) {
      if (Object.keys(selected).length > 0) {
        if (this.resultList.length === 0) {
          this.resultList.push(selected)
          this.unitList(selected, this.search_results.findIndex(i => i.id === selected.id))
        } else {
          if (this.resultList.every((item) => item.id !== selected.id)) {
            this.resultList.push(selected)
            this.unitList(selected, this.search_results.findIndex(i => i.id === selected.id))
          }
        }
      }
    },
    DeleteFromSavedBox: function (index) {
      this.resultList.splice(index, 1)
    },
    searchOnEntered: function () {
      if (this.search_term.length > 0) {
        if (this.search_results.length > 0) {
          this.search_results.splice(0)
        }
        for (var i = 1; i < 3; i++) {
          this.kakaosearch(this.search_term, i)
        }
      }
    },
    kakaosearch (keyword, i) {
      axios.get(
        'https://dapi.kakao.com/v2/local/search/keyword.json?page=' + i + '&query=' + keyword, {
          headers: { 'Authorization': 'KakaoAK c01ebcf3f04756103db0826a158a5c21'
          }
        }).then((res) => {
        this.search_results.push(...res.data.documents)
        this.total += res.data.documents.length
        this.PageChanged(1)
      })
    },
    getImageList: function (list) {
      this.ImageList.splice(0)
      this.ImageList = list
    },
    PageChanged (page) {
      this.currentPage = page
      this.listData = this.search_results.slice(
        (page - 1) * this.limit,
        page * this.limit
      )
      // page : 1, listData = search_result[0] ~ search_result[8]
      this.$emit('listData', this.list)
    },
    nextOnClicked () {
      if (this.resultList.length > 1) {
        this.$router.push({name: 'InputData', params: { savedList: this.resultList }})
      } else {
        alert('장소를 2개이상 선택해주세요.')
        this.$router.push({name: 'InputData', params: { savedList: this.resultList }})
      }
    },
    unitList (selected, index) {
      console.log(index + 1)
      var obj = {
        place_name: '',
        address_name: '',
        x: 0,
        y: 0,
        placeImage: ''
      }
      obj.place_name = selected.place_name
      obj.address_name = selected.address_name
      obj.x = selected.x
      obj.y = selected.y
      obj.placeImage = this.ImageList[index]
      this.list.push(obj)
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
    height: 100vh;
  }
  #savedplace_area_Footer {
    margin: 10px;
    margin-top: 20px;
    height: 5vh;
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
