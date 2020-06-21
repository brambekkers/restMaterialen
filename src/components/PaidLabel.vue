<template>
	<span
		class="badge badge-pill "
		:class="paid ? 'badge-success' : 'badge-danger' "
	>{{paid? 'Betaald' : 'niet betaald'}}</span>
</template>

<script>
export default {
	props: ["paid"]
};
</script>
