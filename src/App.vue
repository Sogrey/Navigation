<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HeaderMenu from "./components/HeaderMenu.vue";
import LeftSideWrapper from "./components/LeftSideWrapper.vue";
import MainContainerTitle from "./components/MainContainerTitle.vue";
import MainContainerHeaderMenu from "./components/MainContainerHeaderMenu.vue";
import ContentWrapperAD from "./components/ContentWrapperAD.vue";
import ContentSectionList from "./components/ContentSectionList.vue";
import ContentSectionCard from "./components/ContentSectionCard.vue";
</script>

<template>
  <div class="dark-light">
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.5"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg>
  </div>
  <div class="app">
    <div class="header">
      <div class="menu-circle"></div>
      <div class="header-menu">
        <HeaderMenu class="is-active" innerText="Apps" />
        <HeaderMenu class="notify" innerText="Your work" />
        <HeaderMenu innerText="Discover" />
        <HeaderMenu class="notify" innerText="Market" />
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div class="header-profile">
        <img
          class="profile-img"
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt=""
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <LeftSideWrapper />
        <LeftSideWrapper />
        <LeftSideWrapper />
      </div>
      <div class="main-container">
        <div class="main-header">
          <MainContainerTitle innerText="All Apps" />
          <div class="header-menu">
            <MainContainerHeaderMenu class="is-active" innerText="Desktop" />
            <MainContainerHeaderMenu innerText="Mobile" />
            <MainContainerHeaderMenu innerText="Web" />
          </div>
        </div>
        <div class="content-wrapper">
          <ContentWrapperAD />
          <ContentSectionList />
          <ContentSectionCard />
        </div>
      </div>
    </div>
    <div class="overlay-app"></div>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
