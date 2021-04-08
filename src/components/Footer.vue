<template>
	<footer class="footer pb-2">
		<div class="container-fluid">
			<!-- <nav class="footer-nav">
				<ul>
					<li>
						<router-link to="/about">Over</router-link>
					</li>
					<li>
						<router-link to="/Blog">Blog</router-link>
					</li>
					<li>
						<router-link to="/Licences">Voorwaarden</router-link>
					</li>
				</ul>
			</nav> -->
			<div class="credits ms-auto">
				<span class="copyright">
					© {{ new Date().getFullYear() }}, made by
					<a href="https://brambekkers.nl"> Bram Bekkers </a>
				</span>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		pointer-events: none;
	}
</style>
