<template>
	<div
		class="table-responsive-lg"
		v-if="isAdmin && payments && payments.length"
	>
		<table class="table table-striped">
			<thead class="text-primary">
				<tr>
					<th>Materiaal</th>
					<th>Datum</th>
					<th>Gekocht door</th>
					<th>Afgehandeld door</th>
					<th>Aantal</th>
					<th>Totaalprijs</th>
				</tr>
			</thead>
			<tbody>
				<PaymentItem
					v-for="(payment, i) of sortPayments"
					:payment="payment"
					:key="i"
				/>
			</tbody>
		</table>
	</div>
	<div class="p-3" v-else>
		<h6>Geen betalingen</h6>
		Op dit moment staan er geen betalingen in de database.
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import PaymentItem from "@/components/dashboard/materials/PaymentItem.vue";

	export default {
		props: ["payments"],
		components: { PaymentItem },
		computed: {
			...mapGetters(["isAdmin"]),
			sortPayments() {
				return this.payments.sort(
					(a, b) => b.paymentDate.seconds - a.paymentDate.seconds
				);
			},
		},
		methods: {
			toTime(timestamp) {
				return timestamp.toDate();
			},
		},
	};
</script>
