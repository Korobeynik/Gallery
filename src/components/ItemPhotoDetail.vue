<script setup>
import PreviewPhoto from "@/components/PreviewPhoto.vue";
import { reactive, ref, computed, onMounted } from "vue";
import { usePhotoStore } from "@/stores/app";

const photoStore = usePhotoStore();
const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => !!route.params.id);
const originalPhoto = computed(() => photoStore.getPhotoById(route.params.id));
const editablePhoto = ref({
	id: null,
	description: "",
	album: "",
	url: "",
});

const disabledButton = computed(() => {
	return !(
		editablePhoto.value.id &&
		editablePhoto.value.album &&
		editablePhoto.value.url
	);
});

const clearForm = () => {
	editablePhoto.value.id = "";
	editablePhoto.value.album = "";
	editablePhoto.value.description = "";
	editablePhoto.value.url = "";
};

onMounted(() => {
	if (isEditMode.value && originalPhoto.value) {
		editablePhoto.value = { ...originalPhoto.value };
	}
});

const handleSubmit = () => {
	if (isEditMode.value) {
		photoStore.updatePhoto(editablePhoto.value);
	} else {
		photoStore.addPhoto(editablePhoto.value);
	}
	router.push("/");
};
</script>

<template>
	<v-row>
		<v-col
			><h1>{{ isEditMode ? "Edit Photo" : "Add New Photo" }}</h1></v-col
		>
	</v-row>
	<v-row>
		<v-col>
			<form>
				<v-text-field
					v-model="editablePhoto.id"
					label="ID"
					required
				></v-text-field>

				<v-text-field
					v-model="editablePhoto.album"
					label="Album"
					required
				></v-text-field>

				<v-textarea
					v-model="editablePhoto.description"
					label="Description"
					required
				></v-textarea>

				<v-text-field v-model="editablePhoto.url" label="Url" required>
				</v-text-field>

				<div class="d-flex flex-wrap">
					<v-btn class="mt-4 mr-5" color="error" flex @click="clearForm">
						Cancel
					</v-btn>
					<v-btn
						class="mt-4"
						color="success"
						flex
						@click="handleSubmit"
						:disabled="disabledButton"
					>
						Save
					</v-btn>
				</div>
			</form>
		</v-col>
		<v-col>
			<PreviewPhoto v-model="editablePhoto.url"></PreviewPhoto>
		</v-col>
	</v-row>
</template>
