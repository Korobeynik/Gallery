<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { BASE_URL } from "@/constans/api";
import axios from "axios";
import { usePhotoStore } from "@/stores/app";
import ItemPhoto from "@/components/ItemPhoto.vue";
import PhotoSearch from "@/components/PhotoSearch.vue";

let opened = ref(0);
const photoStore = usePhotoStore();

const photos = ref(photoStore.photos);

const groupedPhotos = computed(() => {
	return photoStore.photos.reduce((groups, photo) => {
		if (!groups[photo.album]) {
			groups[photo.album] = [];
		}
		groups[photo.album].push(photo);
		return groups;
	}, {});
});

const deleteAlbum = (albumName) => {
	photoStore.photos = photoStore.photos.filter(
		(photo) => photo.album !== albumName
	);
	photoStore.savePhotosToLocalStorage();
};

const deletePhoto = (photoId) => {
	photoStore.deletePhoto(photoId);
};

onMounted(() => {
	photoStore.fetchPhotos();
});
</script>

<template>
	<v-container align="start">
		<PhotoSearch />
		<v-expansion-panels>
			<v-expansion-panel
				v-for="(albumPhotos, albumName) in groupedPhotos"
				:key="albumName"
			>
				<div class="accordion">
					<v-btn
						class="btn-delete"
						density="comfortable"
						icon="$delete"
						@click="deleteAlbum(albumName)"
					></v-btn>
					<v-expansion-panel-title>
						<h3 class="mr-5">{{ albumName }} Album</h3>
						<span
							>{{ albumPhotos.length }} -

							{{ albumPhotos.length == 1 ? `photo` : `photos` }}
						</span>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-row class="mb-2" no-gutters>
							<item-photo
								v-for="item in albumPhotos"
								:key="item.id"
								:item="item"
								:deletePhoto="deletePhoto"
							></item-photo>
						</v-row>
					</v-expansion-panel-text>
				</div>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-container>
</template>

<style lang="scss">
.v-list-item__prepend {
	&:hover {
		cursor: poiner;
	}
}
.accordion {
	position: relative;
	.btn-delete {
		position: absolute;
		right: 5px;
		top: 6px;
		z-index: 10;
	}
	.v-expansion-panel-title__icon {
		position: relative;
		left: -20px;
	}
}
@media (min-width: 960px) {
	.v-container {
		max-width: 95%;
	}
}
</style>
