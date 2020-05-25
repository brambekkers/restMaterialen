<template>
	<div id="loading">
		<h3>De gegevens worden geladen</h3>
		<i class="fas fa-spinner"></i>
	</div>
</template>

<style lang="scss" scoped>
	#loading {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		text-align: center;

		.fa-spinner {
			font-size: 100px;
			width: auto;
			animation: spin 1s infinite ease;
			-webkit-animation: spin 1s infinite ease;
		}

		@keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
			}
		}
	}
</style>