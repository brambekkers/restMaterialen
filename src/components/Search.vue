<template>
	<div>
		<div class="input-group no-border">
			<input
				type="text"
				value
				class="form-control"
				placeholder="Search..."
				v-model="text"
				:input="$emit('searchText', text)"
			/>
			<div class="input-group-append">
				<div class="input-group-text">
					<i class="fas fa-search"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: ""
			};
		}
	};
</script>

<style lang="scss" scoped>
	i {
		cursor: pointer !important;
	}
</style>
