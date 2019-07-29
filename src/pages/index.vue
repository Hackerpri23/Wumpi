<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="text-center">
        <v-img
          src="https://cdn.discordapp.com/avatars/592568340485111827/33e085785f711d89ea67a37cc93fdeaf.png?size=512"
          height="256px"
        />
        <v-card-title class="headline">Welcome to Wumpi</v-card-title>
        <v-card-text>
          <p class="subtitle-1">Full suite of moderation. Easing the life of moderators everywhere.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            target="_blank"
            href="https://discordapp.com/oauth2/authorize?client_id=592568340485111827&permissions=8&scope=bot"
          >Invite Now!</v-btn>
          <v-spacer />
          <v-btn color="primary" target="_blank" href="https://discord.gg/mPPBNty">Join our Discord!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>
