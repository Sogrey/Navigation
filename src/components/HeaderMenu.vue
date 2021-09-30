<script setup>

defineProps({
    innerText:String
})
</script>

<template>
  <a class="menu-link" href="#">{{innerText}}</a>
</template>