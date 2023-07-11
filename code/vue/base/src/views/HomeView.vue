<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { data } = useQuery({
  queryKey: ["welcome"],
  queryFn: async () =>
    fetch("https://api.example.com/welcome").then(
      (res) => res.json() as Promise<{ message: string }>
    ),
});
</script>

<template>
  <main>{{ data?.message }}</main>
</template>
