<template>
  <VApp theme="dark">
    <v-app-bar>
      <v-app-bar-title>RJ Neo</v-app-bar-title>
    </v-app-bar>
    <VMain>
      <NuxtPage />
    </VMain>
    <v-footer>
      <v-bottom-sheet
        :model-value="true"
        :scrim="false"
        :scroll-strategy="'none'"
        :close-on-content-click="false"
        :persistent="true"
        :no-click-animation="true"
      >
        <v-card class="fill-height">
          <v-container>
            <v-row>
              <v-col cols="3" />
              <v-col cols="6">
                <NeoPlayer />
              </v-col>
              <v-col cols="3">
                Download
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-bottom-sheet>
    </v-footer>
  </VApp>
</template>
<script setup lang="ts">
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
</script>
