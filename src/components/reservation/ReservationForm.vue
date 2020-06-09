<template>

	<div
		class="card card-signup"
		v-if="material"
	>
		<form
			class="form"
			@submit.prevent="makeReservation()"
		>
			<div class="card-header ">
				<h4 class="card-title mb-0">Reserveer</h4>
				<h6 class="card-title mt-0">{{material.name}}</h6>

			</div>
			<div class="card-body text-left py-0">
				<hr class="my-0">

				<div class="my-2">
					<label class="row">
						<div class="col-6 title">Totaal beschikbaar:</div>
						<div class="col-6">{{material.unitAvalible}}</div>
						<div class="col-6 title">Prijs {{material.priceUnit.toLowerCase()}}: </div>
						<div class="col-6">{{material.price}} euro</div>
					</label>
				</div>
				<hr class="my-0">
				<div class="my-3">
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
							<label class="input-group-text mb-0">{{material.unit}}</label>
						</div>
					</div>
				</div>

				<div
					class="form-group text-right"
					v-if="material.price && material.unitAmount"
				>
					<label>De totale prijs:</label>
					<p class="mb-0"><h5 class="title mt-0 ">{{ material.price * amount}} euro</h5></p>
				</div>
				<Checkbox @toggleCheck="policyCheck = $event" :link="'/policy'"/>
			</div>
			<div class="card-footer ">
				<button
					type="submit"
					class="btn btn-info btn-round"
				>Reserveer</button>
			</div>
		</form>

	</div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";

export default {
	components: {Checkbox},
	name: "ReservationForm",
	data() {
		return {
			policyCheck: false,
			amount: null,
			reservation: null,
			hasReservate: false
		};
	},
	watch:{
		reservation(){
			if(this.reservation){
				this.$store.dispatch('alert', {
					type: 'warning',
					msg: {
						title: 'Al gereserveerd',
						text: `Je hebt al ${this.reservation.amount} ${this.material.unit} van ${this.material.name} gereserveerd. Je kunt natuurlijk altijd nog meer reserveren maar dat komt dan bovenop je besetaande reservering.`
					}
				})
			}
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		materials() {
			return this.$store.getters.materials;
		},
		material() {
			if (this.materials) {
				const id = this.$route.params.id;
				return this.materials.filter(item => item.id === id)[0];
			}
		},
	},
	methods: {
		async makeReservation() {
			if(this.policyCheck){
				if(!this.hasReservate){
					this.hasReservate = true
					try {
						const reservation = await this.$store.dispatch("reservate", {
							id: this.$route.params.id,
							amount: this.amount,
							userAmount: this.amount + (this.reservation ? this.reservation.amount : 0)
						});
						// onComplete:
						this.$store.dispatch("notification", {
							style: "success",
							msg: {
								title: "Succesvol gereserveerd!",
								text:
									"Je hebt het materiaal succesvol gereserveerd."
							}
							});
						// redirect
						this.$router.push("/profile");
					} catch (err) {
						this.hasReservate = false
						this.$store.dispatch('notification', {
							style: 'error',
							msg: {
								code: err.code,
								message: err.message
							}
						})
					};
				}
				
			}else{
				this.$store.dispatch('notification', {
					style: 'warning',
					msg: {
						title: 'Accepteer de voorwaarde',
						text: `Om te kunnen reserveren moet je de voorwaarden accepteren. Lees deze goed door voordat je reserveerd.`
					}
				})
			}
		},
		 getReservation() {
			setTimeout(async()=>{
				this.reservation = await this.$store.dispatch("getReservation", this.$route.params.id);
			},1000);
		}

	},
	mounted(){
		this.getReservation();
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

	
</style>
