<template>
	<tr class="item">
		<td class="font-weight-bold ps-4">
			<router-link :to="`/dashboard/materials/${payment.materialID}`">
				<i class="fas fa-exclamation-circle fa-2x text-info" role="button" />
			</router-link>
		</td>
		<td class="font-weight-bold ps-4">
			{{ payment.materialName }}
		</td>
		<td>
			{{ payment.paymentDate.toDate().toLocaleDateString() }}
		</td>
		<td>{{ user }}</td>
		<td>{{ registeredBy }}</td>
		<td>{{ payment.amount }}</td>
		<td>
			<span class="badge badge-pill badge-success px-3 py-2"
				>€ {{ payment.price }}</span
			>
		</td>
	</tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	props: ["payment"],
	data() {
		return {
			user: "",
			registeredBy: "",
		};
	},
	methods: {
		...mapActions(["getUserName"]),
	},
	async mounted() {
		this.user = await this.getUserName(this.payment.userID);
		this.registeredBy = await this.getUserName(this.payment.registeredBy);
	},
};
</script>

<style></style>
