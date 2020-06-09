<template>
	<div class="card" v-if="material">
		<div class="card-header">
			<h4 class="card-title mb-0">Beheer</h4>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-12 text-center">
					<img class="fluid-img" :src="material.qr" />
				</div>
				<div class="col-12">
					<div class="row">
						<div class="col-12">
							<div class="form-group">
								<label>Materiaal ID</label>
								<input type="text" v-model="material.id" class="form-control border-input" disabled />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ReservationAdmin from "@/components/dashboard/reservations/ReservationAdmin.vue";

	export default {
		props: ["material"],
		components: { ReservationAdmin }
	};
</script>
