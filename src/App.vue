<template>
	<perfect-scrollbar>
		<div id="app-main">
			<transition
				enter-active-class="animated slideInDown"
				leave-active-class="animated slideOutUp"
				mode="out-in"
			>
				<NavbarFront
					v-if="front || landing"
					style="animation-duration: 0.5s"
				/>
			</transition>

			<!--  Front Router View-->
			<router-view v-slot="{ Component }">
				<transition
					:enter-active-class="transitionEnter"
					:leave-active-class="transitionLeave"
					mode="out-in"
				>
					<component
						:is="Component"
						style="animation-duration: 0.5s"
						v-if="front"
					/>
					<component
						:is="Component"
						style="animation-duration: 0.5s"
						v-else-if="landing"
					/>
				</transition>
			</router-view>

			<!-- Front Footer  -->
			<transition
				enter-active-class="animated slideInUp"
				leave-active-class="animated slideOutDown "
			>
				<FooterFront v-if="front" style="animation-duration: 0.5s" />
			</transition>

			<!-- BACKEND -->
			<!-- back Sidebar -->
			<transition
				name="slideLeft"
				leave-active-class="animated slideOutLeft"
				mode="out-in"
			>
				<SidebarBack style="animation-duration: 0.8s" v-if="back" />
			</transition>
			<div class="main-panel" v-if="back">
				<!-- back Header -->
				<transition
					name="slideDown"
					leave-active-class="animated slideOutUp"
					mode="out-in"
				>
					<NavbarBack :title="$route.name" />
				</transition>
				<!-- back Main-->
				<router-view v-slot="{ Component }">
					<transition
						:enter-active-class="transitionEnter"
						:leave-active-class="transitionLeave"
						mode="out-in"
					>
						<component
							:is="Component"
							style="animation-duration: 0.8s"
						/>
					</transition>
				</router-view>
				<!-- back Footer-->
				<transition
					name="slideUp"
					leave-active-class="animated slideOutDown"
					mode="out-in"
				>
					<FooterBack />
				</transition>
			</div>
		</div>
	</perfect-scrollbar>
</template>

<script>
	import NavbarFront from "@/components/Navbar.vue";
	import FooterFront from "@/components/Footer.vue";
	import SidebarBack from "@/components/dashboard/Sidebar.vue";
	import NavbarBack from "@/components/dashboard/Navbar.vue";
	import FooterBack from "@/components/Footer.vue";

	import { useToast } from "vue-toastification";

	export default {
		setup() {
			// Get toast interface
			const toast = useToast();
			return { toast };
		},
		components: {
			NavbarFront,
			FooterFront,
			SidebarBack,
			NavbarBack,
			FooterBack,
		},
		computed: {
			landing() {
				return this.$route.meta.template === "landing";
			},
			front() {
				return this.$route.meta.template === "front";
			},
			back() {
				return this.$route.meta.template === "back";
			},
		},
		data() {
			return {
				transitionEnter: "",
				transitionLeave: "",
			};
		},
		mounted() {
			this.$store.dispatch("addFirebase");
		},
		created() {
			this.$router.beforeEach((to, from, next) => {
				this.transitionEnter = to.meta.transitionEnter;
				this.transitionLeave = from.meta.transitionLeave;

				next();
			});
			this.$store.commit("toast", this.toast);
		},
	};
</script>

<style lang="scss">
	body {
		@media (max-width: 1200px) and (min-width: 768px) {
			p {
				font-size: 12px !important;
			}
		}

		@media (max-width: 768px) {
			p {
				font-size: 11px !important;
			}
		}
	}
	#app {
		overflow: hidden;
	}
	#app-main {
		font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
		background-color: #fffef9;
		width: 100vw;
		overflow-x: hidden;
		height: 100vh;
		min-height: 100vh;
	}

	.btn-transparent {
		background: transparent !important;
		color: #66615b !important;
	}

	.bootstrap-select {
		padding: 0 !important;
	}
</style>
