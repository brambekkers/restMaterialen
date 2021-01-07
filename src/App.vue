<template>
	<div id="app">
		<!-- FRONDEND -->
		<!-- front Header -->
		<transition
			:enter-active-class="transitionEnter"
			:leave-active-class="transitionLeave"
			mode="out-in"
		>
			<router-view style="animation-duration: 0.5s" v-if="landing" />
		</transition>
		<transition
			enter-active-class="animated slideInTop"
			leave-active-class="animated slideOutUp"
			mode="out-in"
		>
			<NavbarFront v-if="front" style="animation-duration: 0.5s" />
		</transition>
		<!--  Front Router View-->
		<transition
			:enter-active-class="transitionEnter"
			:leave-active-class="transitionLeave"
			mode="out-in"
		>
			<router-view style="animation-duration: 0.5s" v-if="front" />
		</transition>
		<!-- Front Footer  -->
		<transition name="slideUp" leave-active-class="animated slideOutDown">
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
		<div class="main-panel h-100">
			<!-- back Header -->
			<transition
				name="slideDown"
				leave-active-class="animated slideOutUp"
				mode="out-in"
			>
				<NavbarBack :title="$route.name" v-if="back" />
			</transition>
			<!-- back Main-->
			<transition
				:enter-active-class="transitionEnter"
				:leave-active-class="transitionLeave"
				mode="out-in"
			>
				<router-view style="animation-duration: 0.8s" v-if="back" />
			</transition>
			<!-- back Footer-->
			<transition
				name="slideUp"
				leave-active-class="animated slideOutDown"
				mode="out-in"
			>
				<FooterBack v-if="back" />
			</transition>
		</div>
	</div>
</template>

<script>
import NavbarFront from "@/components/Navbar.vue";
import FooterFront from "@/components/Footer.vue";
import SidebarBack from "@/components/dashboard/Sidebar.vue";
import NavbarBack from "@/components/dashboard/Navbar.vue";
import FooterBack from "@/components/Footer.vue";

export default {
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
			// if (transitionName === "slide") {
			//     const toDepth = to.path.split("/").length;
			//     const fromDepth = from.path.split("/").length;
			//     transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
			// }

			this.transitionEnter = to.meta.transitionEnter;
			this.transitionLeave = from.meta.transitionLeave;

			next();
		});
	},
};
</script>

<style lang="scss">
#app {
	font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
	background-color: #f4f3ef;
	width: 100vw;
	overflow-x: hidden;
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
