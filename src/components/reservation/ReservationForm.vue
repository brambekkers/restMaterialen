<template>

	<div
		class="card card-signup"
		v-if="material"
	>
		<div class="card-header ">
			<h4 class="card-title mb-0">Reserveer</h4>
			<h6 class="card-title mt-0">{{material.name}}</h6>

		</div>
		<div class="card-body text-left py-0">
			<hr class="my-0">

			<form class="form">
				<div class="my-2">
					<label class="row">
						<div class="col-6 title">Totaal beschikbaar:</div>
						<div class="col-6">{{material.unitAvalible}}</div>
						<div class="col-6 title">Prijs per {{unit}}: </div>
						<div class="col-6">{{material.price}} euro</div>
					</label>
				</div>
				<hr class="my-0">
				<div class="mt-2 mb-3">
					<label>
						Hoeveel wil je reserveren?
					</label>
					<div class="input-group ">
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="fas fa-calculator"></i>
							</span>
						</div>
						<input
							type="number"
							class="form-control rounded-0 border-right-0"
							placeholder="Aantal"
							v-model.number="amount"
							min="1"
							:max="material.unitAvalible"
							required
						>
						<div class="input-group-append text-size-sm">
							<label class="input-group-text mb-0">{{unit}}</label>
						</div>
					</div>
				</div>

				<div class="form-check text-left">
					<label class="form-check-label">
						<input
							class="form-check-input"
							type="checkbox"
							v-model="policyCheck"
						>

						<span class="form-check-sign">
							<transition name="fade">
								<i
									class="fas fa-check"
									v-if="policyCheck"
								></i>
							</transition>
						</span>
						Ik accepteer <router-link to="/policy">de voorwaarde</router-link>.
					</label>
				</div>
			</form>
		</div>
		<div class="card-footer ">
			<a
				href="javascript:;"
				class="btn btn-info btn-round"
			>Reserveer</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return {
			policyCheck: false,
			amount: null
		};
	},
	computed: {
		materials() {
			return this.$store.getters.materials;
		},
		material() {
			if (this.materials) {
				const id = this.$route.params.id;
				return this.materials.filter(item => item.id === id)[0];
			}
		},
		unit() {
			if (this.material.priceUnit) {
				const unit = this.material.priceUnit.split(" ")[1];
				if (unit === "deel") return "delen";
				return unit.toLowerCase();
			}
			return "eenheden";
		}
	}
};
</script>

<style lang="scss" scoped>
	.card {
		display: flex;
		height: 100%;
		flex-direction: column;
		text-align: center;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;

		.card-body {
			flex: 0 1 auto;
		}
	}

	.form-check .form-check-sign > i {
		color: white;
		font-size: 15px;
		position: absolute;
		top: 4px;
		left: 4px;
	}

	.form-check input[type="checkbox"]:checked + .form-check-sign:after {
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
