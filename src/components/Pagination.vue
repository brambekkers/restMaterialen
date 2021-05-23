<template>
	<nav aria-label="...">
		<ul class="pagination justify-content-center">
			<li
				class="page-item d-none d-lg-block"
				@click="previous()"
				:class="{ disabled: currentPage === 1 }"
			>
				<span class="page-link">Vorige</span>
			</li>
			<li class="page-item" @click="currentPage = 1" v-if="currentPage > 4">
				<span class="page-link">...</span>
			</li>
			<template v-for="i of pageAmount" :key="i">
				<li
					class="page-item"
					:class="{ active: i == currentPage }"
					@click="currentPage = i"
					v-if="inRange(i)"
				>
					<span class="page-link">
						{{ i }}
						<span class="sr-only" v-if="i === currentPage">(current)</span>
					</span>
				</li>
			</template>
			<li
				class="page-item"
				@click="currentPage = pageAmount"
				v-if="currentPage < pageAmount - 3"
			>
				<span class="page-link">...</span>
			</li>
			<li
				class="page-item d-none d-lg-block"
				@click="next()"
				:class="{ disabled: currentPage === pageAmount }"
			>
				<span class="page-link">Volgende</span>
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
				maxResults: 10
			};
		},
		watch: {
			content: {
				handler() {
					this.$emit("changePage", this.pagedContent);
				},
				immediate: true
			},
			currentPage: {
				handler() {
					this.$emit("changePage", this.pagedContent);
				},
				immediate: true
			}
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
			}
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
			inRange(i) {
				const range = 3;
				return i >= this.currentPage - range && i <= this.currentPage + range;
			}
		}
	};
</script>

<style></style>
