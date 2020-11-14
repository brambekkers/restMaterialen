<template>
	<div class="main-content">
		<Header />
		<div class="container">
			<div class="row">
				<div class="col-3 ml-auto">
					<Search @searchText="searchText = $event" />
				</div>
			</div>
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Restmaterialen database</h5>
					<p class="card-category">Geen filter</p>
				</div>
				<div class="card-body">
					<MaterialsList
						v-if="materials"
						:materials="filteredMaterials"
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
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import LastTimeUpdated from "@/components/LastTimeUpdated.vue";

import MaterialsList from "@/components/libary/MaterialsList.vue";

import Loading from "@/components/Loading.vue";

export default {
	name: "Libary",
	data() {
		return {
			searchText: ""
		};
	},
	components: {
		Header,
		Search,
		MaterialsList,
		LastTimeUpdated,
		Loading
	},
	computed: {
		searchTags() {
			return this.searchText.split(" ").filter(a => a != "");
		},
		materials() {
			const materials = this.$store.getters.materials;
			if (materials) {
				for (const material of materials) {
					this.$store.dispatch("checkMaterial", material);
				}
				return this.$store.getters.materials;
			}
			return [];
		},
		filteredMaterials() {
			if (this.materials) {
				if (this.searchTags.length) {
					return this.materials.filter(m => {
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
		}
	}
};
</script>
