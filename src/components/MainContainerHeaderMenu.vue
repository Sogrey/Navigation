<script setup>

defineProps({
    innerText:String
})
</script>

<template>
  <a class="main-header-link" href="#">{{innerText}}</a>
</template>