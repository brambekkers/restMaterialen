<template>
	<div class="table-responsive-lg" v-if="isAdmin && payments">
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
					v-for="(payment, i) of payments"
					:payment="payment"
					:key="i"
				/>
			</tbody>
		</table>
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
		},
		methods: {
			toTime(timestamp) {
				return timestamp.toDate();
			},
		},
	};
</script>
