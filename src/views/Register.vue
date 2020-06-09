<template>
	<div id="register">
		<div class="background"></div>
		<div id="content">
			<Navbar />

			<div class="row">
				<div class="col-md-10 col-lg-8 col-xl-5 col-xxl-4 col-xxxl-3 mx-auto">
					<div class="wizard-container">
						<div class="card card-wizard active">
							<div class="card-header text-center">
								<h3 class="card-title my-4">Registreer</h3>
								<div class="wizard-navigation">
									<ul class="nav nav-pills d-flex">
										<li class="nav-item" :class="{ active: step === 1 }">
											<a class="nav-link" @click="step = maxStep >= 1 ? 1 : step">
												<i class="fas fa-user"></i>
												Profiel
											</a>
										</li>
										<li class="nav-item" :class="{ active: step === 2 }">
											<a class="nav-link" @click="step = maxStep >= 2 ? 2 : step">
												<i class="fas fa-school"></i>
												School
											</a>
										</li>
										<li class="nav-item" :class="{ active: step === 3 }">
											<a class="nav-link" @click="step = maxStep >= 3 ? 3 : step">
												<i class="fas fa-lock"></i>
												Beveiliging
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="card-body">
								<div class="tab-content">
									<!-- Step 1 -->
									<div class="tab-pane active" v-if="step === 1">
										<form @submit.prevent="next()">
											<h5 class="info-text mt-0">Laten we beginnen met wat algemene gegevens</h5>
											<div class="row justify-content-center">
												<div class="col-10">
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="fas fa-user"></i>
															</span>
														</div>
														<input
															type="text"
															class="form-control valid"
															placeholder="Voornaam"
															required
															v-model="newUser.firstName"
														/>
													</div>
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="far fa-user-circle"></i>
															</span>
														</div>
														<input
															type="text"
															placeholder="Achternaam"
															class="form-control"
															required
															v-model="newUser.lastName"
														/>
													</div>
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="far fa-envelope"></i>
															</span>
														</div>
														<input type="email" placeholder="Email" class="form-control" v-model="newUser.email" />
													</div>
												</div>
											</div>
											<div class="pull-right mt-5">
												<button
													type="submit"
													class="btn btn-next btn-fill btn-rose btn-wd valid"
													v-if="step <3"
												>Volgende</button>
											</div>
										</form>
									</div>
									<!-- Step 2 -->
									<div class="tab-pane active" v-show="step === 2">
										<form @submit.prevent="next()">
											<h5 class="info-text">nu wat gegevens over de school</h5>
											<div class="row justify-content-center">
												<div class="col-10">
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="fas fa-user"></i>
															</span>
														</div>
														<input
															type="number"
															class="form-control valid"
															placeholder="Studentennummer"
															required
															v-model.number="newUser.studentNumber"
														/>
													</div>
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="far fa-user-circle"></i>
															</span>
														</div>
														<input
															type="text"
															placeholder="Klas"
															class="form-control"
															required
															v-model="newUser.class"
														/>
													</div>

													<div class="form-group mt-4">
														<label>Welke opleiding volg je?</label>
														<select
															class="selectpicker form-control border-input show-tick"
															data-style="btn btn-neutral btn-block mt-0 border "
															v-model="newUser.study"
															required
															title="Opleiding"
														>
															<option class="bs-title-option" :value="null" hidden>Selecteer...</option>
															<option value="Meubel">Meubel</option>
															<option value="Interieur">Interieur</option>
															<option value="Creatief">Creatief</option>
															<option value="Stofferen">Stofferen</option>
															<option value="Werkvoorbereiding">Werkvoorbereiding</option>
															<option value="Werkvoorbereiding">Technisch leidinggevende</option>
															<option value="Overige">Overige</option>
														</select>
													</div>
												</div>
											</div>
											<div class="pull-right mt-5">
												<button type="submit" class="btn btn-next btn-fill btn-rose btn-wd valid">Volgende</button>
											</div>
											<div class="pull-left mt-5">
												<button class="btn btn-next btn-fill btn-rose btn-wd valid" @click="step--">Vorige</button>
											</div>
										</form>
									</div>
									<!-- Step 3 -->
									<div class="tab-pane active" v-if="step === 3">
										<form @submit.prevent="addUser()">
											<h5 class="info-text mt-0">Tot slot de Beveiliging van jouw account</h5>

											<div class="row justify-content-center">
												<div class="col-10">
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="fas fa-lock"></i>
															</span>
														</div>
														<input
															type="password"
															class="form-control valid"
															placeholder="Wachtwoord"
															required
															v-model="newUser.password"
														/>
													</div>
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">
																<i class="fas fa-unlock"></i>
															</span>
														</div>
														<input
															type="password"
															placeholder="Controle wachtwoord"
															class="form-control"
															required
															v-model="newUser.passwordCheck"
														/>
													</div>

													<Checkbox class="mt-5" @toggleCheck="policyCheck = $event" :link="'/privacy'" />
												</div>
											</div>
											<div class="pull-right mt-5">
												<button type="submit" class="btn btn-next btn-fill btn-rose btn-wd valid">Klaar</button>
											</div>
											<div class="pull-left mt-5">
												<button class="btn btn-next btn-fill btn-rose btn-wd valid" @click="step--">Vorige</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";
	import Checkbox from "@/components/Checkbox.vue";

	export default {
		components: { Navbar, Footer, Checkbox },
		data() {
			return {
				step: 1,
				maxStep: 1,
				newUser: {
					firstName: "",
					lastName: "",
					email: "",
					studentNumber: "",
					class: "",
					study: "",
					password: "",
					passwordCheck: "",
					privacyCheck: false
				}
			};
		},
		computed: {
			passwordSame() {
				return this.newUser.password === this.newUser.passwordCheck;
			}
		},
		methods: {
			next() {
				this.step++;
				this.maxStep = this.step > this.maxStep ? this.step : this.maxStep;
			},
			async addUser() {
				if (this.passwordSame) {
					try {
						// add user
						await this.$store.dispatch("addUser", this.newUser);

						// onComplete:
						this.$store.dispatch("notification", {
							style: "success",
							msg: {
								title: "Succesvol Toegevoegd!",
								text: "De gebruiker is succesvol toegevoegd!"
							}
						});

						// redirect
						this.$router.push("/profile");
					} catch (err) {
						this.$store.dispatch("notification", {
							style: "error",
							msg: err
						});
					}
				} else {
					this.$store.dispatch("notification", {
						style: "error",
						msg: {
							code: "Wachtwoord fout",
							message: "Controle wachtwoord komt niet overeen"
						}
					});
				}
			}
		},
		updated() {
			$(".selectpicker").selectpicker();
		}
	};
</script>

<style lang="scss" scoped>
	#register {
		position: relative;

		height: 100vh;

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

		#content {
			position: absolute;
			width: 100%;
			z-index: 2;
			box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
			border-radius: 6px;
			min-width: 400px;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	.card-wizard .nav-pills {
		background: transparent;
	}

	.wizard-navigation {
		.nav-item {
			width: 33.3333%;
			cursor: pointer;
			background: #9a9a9a;
		}
		.active {
			box-shadow: 0 5px 5px hsla(30, 2%, 60%, 0.5);
		}
	}

	.nav-link {
		border-radius: 0 0 0 0 !important;
	}
</style>