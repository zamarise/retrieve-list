<template>
  <div>
    <div class="wrapper">
      <div v-for="(item, listId) in listIds" :key="item.id">
        <h2>{{ listId }}</h2>

        <p v-for="(object, index) in noName(item)" :key="index">
          {{ object.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { listItems } from "./../api/list";

export default {
  data() {
    return {
      loading: true,
      data: [],
    };
  },

  computed: {
    listIds() {
      return this.groupBy(this.data, "listId");
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      this.loading = true;
      try {
        const response = await listItems.index({
          method: "GET",
        });
        this.data = response;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    groupBy(items, key) {
      return items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
      );
    },

    noName(groupedIds) {
      return Object.values(groupedIds)
        .map((item) => item)
        .filter(({ name }) => {
          return name;
        });
    },
  },
};
</script>

<style scoped>
h2 {
  color: #222831;
  background-color: #ffd369;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 80px;
  row-gap: 1em;
}
.wrapper p {
  color: #393e46;
  display: flex;
  align-items: center;
}
</style>
