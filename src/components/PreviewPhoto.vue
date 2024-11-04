<script setup>
import { placeholder } from "@babel/types";
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);

let src = "https://placehold.co/600x400/png";

watch(
	() => props.modelValue,
	(newValue) => {
		src = newValue;
	}
);
</script>
<template>
	<label for="image-upload">
		<img :src="src" />
	</label>
</template>

<style scoped>
img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
