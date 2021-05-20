<template>
	<div class="main-content">
		<Header />
		<div class="container px-0 px-md-3">
			<div class="row">
				<div class="col-12 col-md-6 col-xl-3 ms-auto">
					<Search @searchText="searchText = $event" />
				</div>
			</div>
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Restmaterialen database</h5>
					<p class="card-category mb-1" v-if="searchTags.length">
						<span
							class="mx-1 badge rounded-pill bg-light text-dark"
							v-for="(tag, i) of searchTags"
							:key="i"
							>{{ tag }}</span
						>
					</p>
				</div>
				<div class="card-body px-0 px-md-2 pt-1">
					<MaterialsList
						v-if="materials"
						:materials="filteredMaterials"
						:unfilteredMaterials="materials"
					/>
					<Loading v-else />
				</div>
				<div class="card-footer">
					<hr />
					<LastTimeUpdated />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/libary/Header.vue";
import Search from "@/components/Search.vue";
import LastTimeUpdated from "@/components/LastTimeUpdated.vue";

import MaterialsList from "@/components/libary/MaterialsList.vue";

import Loading from "@/components/Loading.vue";

export default {
	name: "Libary",
	data() {
		return {
			searchText: "",
		};
	},
	components: {
		Header,
		Search,
		MaterialsList,
		LastTimeUpdated,
		Loading,
	},
	computed: {
		searchTags() {
			return this.searchText.split(" ").filter((a) => a != "");
		},
		materials() {
			return this.$store.getters.materials;
		},
		filteredMaterials() {
			if (this.materials) {
				if (this.searchTags.length) {
					return this.materials.filter((m) => {
						for (const tag of this.searchTags) {
							for (const mTags of m.tags) {
								if (mTags.toLowerCase().includes(tag.toLowerCase())) {
									return true;
								}
							}
							return (
								m.name.toLowerCase().includes(tag.toLowerCase()) ||
								m.type.toLowerCase().includes(tag.toLowerCase())
							);
						}
					});
				}
				return this.materials;
			}
		},
	},
};
</script>
