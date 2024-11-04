<template>
	<v-navigation-drawer
		v-model="drawer"
		:rail="rail"
		permanent
		fixed
		@click="rail = false"
	>
		<v-list-item
			class="header-item"
			prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
			title="John Leider"
			nav
		>
			<template v-slot:append>
				<v-btn
					icon="mdi-chevron-left"
					variant="text"
					@click.stop="rail = !rail"
				></v-btn>
			</template>
			<div>
				<v-btn
					to="/upload-photo"
					color="#5865f2"
					rounded="xl"
					size="small"
					block
					>Upload</v-btn
				>
			</div>
		</v-list-item>

		<v-divider></v-divider>

		<v-list density="compact" nav>
			<v-list-item
				prepend-icon="mdi-home-city"
				title="Photos"
				value="photos"
				to="/"
			></v-list-item>
			<v-list-item
				prepend-icon="mdi-account"
				title="Videos"
				value="videos"
				to="/videos"
			></v-list-item>
			<v-list-item
				prepend-icon="mdi-account-group-outline"
				title="Projects"
				value="projects"
				to="/projects"
			>
			</v-list-item>
		</v-list>
		<AlbumList v-show="!rail" class="album-list"></AlbumList>
	</v-navigation-drawer>
</template>

<script>
import AlbumList from "@/components/AlbumList.vue";
export default {
	components: {
		AlbumList,
	},
	data() {
		return {
			drawer: true,
			rail: true,
		};
	},
};
</script>

<style lang="scss">
.header-item {
	.v-list-item-title {
		font-size: 20px;
		text-align: center;
	}
}
.v-navigation-drawer__content {
	.v-list-item--nav.header-item {
		padding: 20px 5px;
		.v-list-item-title {
			font-size: 18px;
			margin-bottom: 10px;
			display: block;
		}
		.v-avatar.v-avatar--size-default {
			--v-avatar-height: 45px;
		}
	}
}
</style>
