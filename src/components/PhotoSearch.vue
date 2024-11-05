<script setup lang="ts">
import { computed, ref } from "vue";
import { usePhotoStore } from "@/stores/app";
import ItemPhoto from "@/components/ItemPhoto.vue";

const photoStore = usePhotoStore();
const searchQuery = ref("");

const filteredPhotos = computed(() => {
	if (!searchQuery.value) {
		return photoStore.photos;
	}

	const lowerCaseQuery = searchQuery.value.toLowerCase();

	return photoStore.photos.filter((photo) =>
		Object.values(photo).some((value) =>
			String(value).toLowerCase().includes(lowerCaseQuery)
		)
	);
});

const deletePhoto = (photoId) => {
	photoStore.deletePhoto(photoId);
};
</script>

<template>
	<v-text-field
		class="mb-5"
		v-model="searchQuery"
		label="Search something"
		clearable
	></v-text-field>
	<v-row class="mb-10" no-gutters v-if="searchQuery.length">
		<item-photo
			v-for="item in filteredPhotos"
			:key="item.id"
			cols="12"
			sm="6"
			md="4"
			:item="item"
			:deletePhoto="deletePhoto"
		>
		</item-photo>
	</v-row>
	<v-row>
		<v-col cols="12" v-if="filteredPhotos.length === 0" class="no-results">
			<h3 class="mb-15 text-center">Nothing found</h3>
		</v-col>
	</v-row>
</template>

<style>
.text-center {
	text-align: center;
}
</style>
