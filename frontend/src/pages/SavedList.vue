<template>
  <div class="savedList">
    <b-container fluid>
      <b-row style="margin: 5px;">
        <b-col>
          <savedplace-box v-for="(result, index) in selectedList" :key="index" :index="index" :selectedBox="selectedList[index]" @DeleteFromSavedBox="DeleteFromSavedBox"></savedplace-box>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'SavedList',
  props: {
    selectedList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      resultList: this.selectedList,
      result: []
    }
  },
  methods: {
    DeleteFromSavedBox (index) {
      this.$emit('DeleteFromSavedBox', index)
    }
  }
}
</script>
