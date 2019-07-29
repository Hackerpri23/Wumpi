<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>{{ otherError }}</h1>
    <p>
      No worries though!
      <NuxtLink to="/">Click here</NuxtLink>&nbsp;to go to the home page OR
      <a href="https://discord.gg/mPPBNty" target="_blank">Click here</a> to join our discord where you can report this.
    </p>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: "Sorry, but this page was not found!",
      otherError:
        "We're really sorry about this but it seems like some sort of error occurred!"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
