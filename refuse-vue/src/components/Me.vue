<template>
  <div>
      <div @click="onclick">
          {{msg}}
      </div>
  </div>
</template>

<script>
export default {
    name: 'me',
    data: function(){
        return {
            msg: '毕业了'
        }
    },
    methods:{
        onclick: function(){

        }
    }
}
</script>

<style>

</style>