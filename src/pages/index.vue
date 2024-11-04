<script setup>
import { ref } from "vue";
const componentKey = ref(0);

const forceRerender = () => {
	componentKey.value += 1;
};
</script>

<template>
	<TheMain :key="componentKey" />
</template>
