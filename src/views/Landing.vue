<template>
	<div class="landing">
		<section class="top shadow-lg">
			<div class="background"></div>
			<div class="content">
				<p class="brand">
					<img
						src="@/assets/img/duurzaamheid/denkt_duurzaam.png"
						alt="HMC mbo vakschool"
					/>
				</p>

				<h3 class="subtitle fw-bolder">
					Duurzaam hergebruik van materialen uit de branche
				</h3>
				<router-link
					tag="button"
					class="btn btn-outline-default btn-lg mt-2"
					to="/libary"
					>Bekijk materialen</router-link
				>
			</div>
		</section>
		<section class="bottom">
			<h5>OPENINGSTIJDEN CONTAINERS</h5>

			<h6>CIRCUSTEK</h6>
			<p>
				Ophalen eigen gereserveerde: <br />
				Donderdagochtend: 08:30 / 12:00
			</p>
			<h6>OPLEIDINGEN</h6>
			<p>
				Ophalen materiaal verplichte schoolwerkstukken:<br />
				Maak hierover een afspraak met je praktijkdocent.
			</p>

			<p>
				Meer info: Sjors van der Voort<br />
				s.vandervoort@hmcollege.nl
			</p>
		</section>
	</div>
</template>

<script>
	export default {
		name: "Landing",
	};
</script>

<style lang="scss" scoped>
	.landing {
		z-index: 1000;
		display: flex;
		flex-direction: column;

		section {
			padding: 0 50px;
		}

		.top {
			position: relative;
			height: 40vh;
			background: lightgrey;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;

			.background {
				position: absolute;
				opacity: 0.5;
				z-index: 1;
				width: 100%;
				height: 100%;
				background: url("../assets/img/background.jpg");
				background-repeat: no-repeat;
				background-size: cover;
			}
			.content {
				z-index: 2;

				.brand {
					margin-bottom: 0;
					height: 200px;

					img {
						height: 110%;
					}
				}
				.title {
					font-weight: 400;
					font-size: calc(2rem + 1.5vmin);
					text-shadow: -2px 2px 0px rgba(0, 0, 0, 0.3),
						-2px 4px 2px rgba(0, 0, 0, 0.1);
				}

				.subtitle {
					font-size: calc(0.8rem + 1.5vmin);
				}

				.separator {
					position: relative;
					width: 100%;
					margin: 20px 0;
					height: 1px;
					text-align: center;

					i {
						position: absolute;
						font-size: 2vmin;
						transform: translate(-50%, -50%);
					}

					.line_left:before {
						content: "";
						position: absolute;
						top: 0;
						left: 5%;
						right: 54%;
						width: 41%;
						height: 1px;
						background-image: linear-gradient(
							to left,
							rgb(48, 49, 51),
							transparent
						);
					}

					.line_right:before {
						content: "";
						position: absolute;
						top: 0;
						left: 54%;
						right: 5%;
						width: 41%;
						height: 1px;
						background-image: linear-gradient(
							to right,
							rgb(48, 49, 51),
							transparent
						);
					}
				}
			}
		}

		.bottom {
			font-size: 1.1rem;
			padding-top: 40px;
			background-color: #fffef9;
			text-align: center;

			h4,
			h5,
			h6 {
				margin-top: 2rem;
				font-weight: 700;
			}
		}
	}
</style>
