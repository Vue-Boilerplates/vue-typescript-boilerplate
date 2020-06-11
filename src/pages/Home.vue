<template>
  <div class="home">
    <Navbar />
    <h1>Vue Boilerplates</h1>
    <h3>vue-boilerplate-ts</h3>
    <img width="130px" height="auto" src="/img/vue-boilerplates.svg" />
    <h3>Vue + Typescript + Lazy loading and code splitting</h3>
    <div class="block">
      <h2>Why Vue Boilerplates?</h2>
      <p>
        While mobile-first approach becomes a standard and uncertain network
        conditions are something we should always take into consideration, it’s
        harder and harder to keep your application loading fast. Vue
        Boilerplates was built with vue.js performance optimization techniques
        that make them loading instantly and perform smooth 🚀.
      </p>
    </div>
    <div class="block">
      <h2>Lets grow together!</h2>
      <h3>Please consider becoming a donor 🙏.</h3>
      <p>
        Make a custom one time or recurring contribution to support my open
        source projects
      </p>
      <a
        class="donate-btn"
        target="_blank"
        href="https://opencollective.com/vue-boilerplates"
        >Donate
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import Navbar from "@/components/Navbar.vue";

@Component({
  name: "Home",
  components: {
    Navbar,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.block {
  margin: 3rem 2rem 3rem 2rem;
}
h1,
h2 {
  margin: 0;
}
h3 {
  margin-top: 0.5rem;
}
img {
  margin-bottom: 1rem;
}
.donate-btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  background-color: #1e7e34;
  border-color: #1c7430;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  text-decoration: none;
}
.donate-btn:hover {
  color: #fff;
  background-color: #218838;
  border-color: #1e7e34;
}
</style>
