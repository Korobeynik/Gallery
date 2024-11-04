<script setup>
import { ref } from "vue";
import { usePhotoStore } from "@/stores/app";
import { onMounted } from "vue";
const photoStore = usePhotoStore();
const { deletePhoto } = photoStore;

const photo = defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>
<template>
	<v-col
		class="mb-0 item-photo"
		md="3"
		sm="2"
		xs="1"
		:style="{ backgroundImage: `url(${photo.item.url})` }"
	>
		<router-link class="link-item" :to="`/photos/${photo.item.id}`">
		</router-link>
		<div class="actions">
			<v-btn
				:to="`/photos/${photo.item.id}`"
				density="comfortable"
				icon="$pencil"
			>
				<v-icon icon="mdi-pencil"></v-icon>
			</v-btn>
			<v-btn
				@click="deletePhoto(photo.item.id)"
				density="comfortable"
				icon="$delete"
			></v-btn>
		</div>
	</v-col>
</template>

<style lang="scss">
.item-photo {
	height: 150px;
	background-size: cover;
	position: relative;
	overflow: hidden;
	border: 6px solid #222;
	&:hover {
		.actions {
			transform: translateY(0px);
		}
	}
	.link-item {
		position: absolute;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}
	.actions {
		width: 100%;
		height: 40px;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 3px 10px;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		z-index: 100;
		transform: translateY(40px);
		transition: 0.2s linear;
	}
}
</style>
