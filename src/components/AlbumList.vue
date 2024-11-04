<script>
import { ref } from "vue";
import { usePhotoStore } from "@/stores/app";

export default {
	setup() {
		const photoStore = usePhotoStore();
		const newAlbum = ref("");

		const addNewAlbum = () => {
			if (newAlbum.value.trim()) {
				photoStore.addAlbum(newAlbum.value.trim());
				newAlbum.value = "";
			}
		};

		return {
			albums: photoStore.albums,
			newAlbum,
			addNewAlbum,
		};
	},
};
</script>
<template>
	<v-container>
		<h3>Album List</h3>
		<v-list-item density="compact" nav>
			<v-list-item v-for="album in albums" :key="album">{{
				album
			}}</v-list-item>
		</v-list-item>

		<form @submit.prevent="addNewAlbum">
			<v-text-field v-model="newAlbum" label="Add new album" />
			<v-btn color="#5865f2" rounded="xl" size="small" block
				>Add New Album</v-btn
			>
		</form>
	</v-container>
</template>
