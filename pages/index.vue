<template>
  <VContainer>
    <VRow>
      <VCol :cols="6" md="4" lg="3" v-for="item in home.sections[1]?.items" :key="item.id">
        <v-card>
          <v-img cover :src="item.photo" class="align-end">
            <v-card-title>{{ item.title }}</v-card-title>
          </v-img>
        </v-card>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup lang="ts">
const home = useHome()
const { fetchHome } = home
onMounted(() => {
  fetchHome()
})
</script>
