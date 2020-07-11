<template>
      <v-card width="300">
        <v-img height="200"
        :src="imageSrc"
        :srcset="imageSrcset"
        />
        <v-card-title primary-title>
          {{ title }}
        </v-card-title>
       <v-card-subtitle class="pb-4">Number 10</v-card-subtitle>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam tincidunt quam rhoncus
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn>
            Listen
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  name: 'AppTeaser',
  props: {
    image: {
      type: Object,
      default: null
    },
    link: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    imageSrc () {
      if (!this.image) return null
      return `${this.image.url}?w=256&h=160&fit=thumb&fm=jpg&fl=progressive&q=70`
    },
    imageSrcset () {
      if (!this.image) return null
      return `${this.image.url}?w=512&h=320&fit=thumb&fm=jpg&fl=progressive&q=40 2x`
    }
  }
}
</script>
