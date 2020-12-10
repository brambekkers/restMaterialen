<template>
	<div class="table-responsive-lg" v-if="isAdmin">
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
				<tr class="item" v-for="(payment, i) of payments" :key="i">
					<td class="font-weight-bold pl-4">
						{{ payment.materialName }}
					</td>
					<td>
						{{ payment.paymentDate.toDate().toLocaleDateString() }}
					</td>
					<td>{{ payment.userID }}</td>
					<td>{{ payment.registeredBy }}</td>
					<td>{{ payment.amount }}</td>
					<td>
						<span class="badge badge-pill badge-success px-3 py-2"
							>€ {{ payment.price }}</span
						>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props: ["payments", "isAdmin"],
		methods: {
			toTime(timestamp) {
				return timestamp.toDate();
			},
		},
	};
</script>
