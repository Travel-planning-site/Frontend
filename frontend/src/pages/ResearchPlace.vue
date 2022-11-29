<template>
  <div class="ResearchPlace_page">
    <b-container fluid>
      <b-row align-h="between">
        <b-col cols="11">
          <div style="margin-top: 10px;">
            <b-button v-b-toggle.sidebar-1><b-icon icon="list"></b-icon></b-button>
            <b-sidebar id="sidebar-1" title="SavedList" text-align="center" shadow>
              <savedplace-list :selectedList="resultList" @DeleteFromSavedBox="DeleteFromSavedBox" id="savedplace_area_Body"></savedplace-list>
            </b-sidebar>
          </div>
        </b-col>
        <b-col cols="1" style="margin-top: 10px;">
          <b-button @click="$router.go(-1)">
            이전
          </b-button>
          <b-button @click="nextOnClicked">
            다음
          </b-button>
        </b-col>
        <b-col cols="12" class="search_body">
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
                      <b-form-input
                        type="search"
                        v-model="search_term"
                        placeholder="장소검색"
                        @keyup.enter="searchOnEntered"
                      ></b-form-input>
                      <!-- <daum-search
                        :listData="listData"
                        @getImageList="getImageList"
                      ></daum-search> -->
                    </b-input-group>
                  </div>
                </b-col>
              </b-row>
              <b-row class="result_searched">
                <b-col id="result_box">
                  <b-row>
                    <result-list
                      :listData="listData"
                      :ImageList="ImageList"
                      @SelectFromResult_List="SelectFromResult_List"
                    ></result-list>
                  </b-row>
                  <b-row>
                    <pagination @PageChanged="PageChanged" v-if="search_results.length > 9"></pagination>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { LOCAL_URL } from '../url/BackendUrl'

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
      limit: 9,
      block: 4,
      currentPage: '',
      ImageList: [],
      list: [],
      userId: this.$cookies.get('info').id,
      infoIdx: null
    }
  },
  created () {
    console.log(this.$globalData.day)
    if (this.$route.params.infoIdx !== undefined) {
      this.infoIdx = this.$route.params.infoIdx
    } else {
      this.infoIdx = this.$route.params.idx
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
        } else {
          if (this.resultList.every(item => item.placeId !== selected.placeId)) {
            this.resultList.push(selected)
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
        this.PlaceSearch(this.search_term)
      }
    },
    async PlaceSearch (keyword) {
      // axios.get(LOCAL_URL + '/ResearchPlace/searchplace' + '?input=' + keyword)
      //   .then(axios.get(LOCAL_URL + '/ResearchPlace/getsearch')
      //     .then(res => {
      //       console.log(res)
      //     }))
      const response = await axios.get(LOCAL_URL + '/ResearchPlace/searchplace' + '?input=' + keyword)
      console.log(response)
      const response2 = await axios.get(LOCAL_URL + '/ResearchPlace/getsearch')
      console.log(response2)
      this.progressPlace(response2)
    },
    progressPlace (res) {
      for (var i = 0; i < res.data.length; i++) {
        for (var j = 0; j < res.data[i].length; j++) {
          this.search_results.push(res.data[i][j])
          this.total += res.data[i].length
          this.PageChanged(1)
        }
      }
    },
    // getImageList: function (list) {
    //   this.ImageList.splice(0)
    //   this.ImageList = list
    // },
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
      console.log('research: ', this.$route.params.idx)
      if (this.resultList.length > 1) {
        this.$router.push({
          name: 'InputData', params: { savedList: this.resultList, idx: this.infoIdx, userId: this.userId }
        })
      } else {
        alert('장소를 2개이상 선택해주세요.')
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "yg-jalnan";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.search_body {
  margin-top: 10%;
}
.area_searching {
  margin-bottom: 10%;
}
#result_box {
  background-color: white;
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
