<template>
	<nav aria-label="...">
		<ul class="pagination justify-content-center">
			<li class="page-item disabled" @click="previous()">
				<span class="page-link">Previous</span>
			</li>

			<li
				class="page-item"
				v-for="i of pageAmount"
				:class="{ active: i == currentPage }"
				:key="i"
				@click="currentPage = i"
			>
				<span class="page-link">
					{{ i }}
					<span class="sr-only" v-if="i === currentPage">(current)</span>
				</span>
			</li>

			<li class="page-item" @click="next()">
				<span class="page-link">Next</span>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: ["content"],
	data() {
		return {
			currentPage: 1,
			maxResults: 10,
		};
	},
	watch: {
		content: {
			handler() {
				this.$emit("changePage", this.pagedContent);
			},
			immediate: true,
		},
		currentPage: {
			handler() {
				this.$emit("changePage", this.pagedContent);
			},
			immediate: true,
		},
	},
	emits: ["changePage"],
	computed: {
		pageAmount() {
			if (!this.content) return 1;
			return Math.ceil(this.content.length / this.maxResults);
		},
		pagedContent() {
			if (!this.content) return [];
			const start = (this.currentPage - 1) * this.maxResults;
			const end =
				start + this.maxResults > this.content.length
					? this.content.length
					: start + this.maxResults;
			return this.content.slice(start, end);
		},
	},
	methods: {
		previous() {
			if (this.currentPage === 1) return;
			this.currentPage--;
		},
		next() {
			if (this.currentPage === this.pageAmount) return;
			this.currentPage++;
		},
	},
};
</script>

<style></style>
