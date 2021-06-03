<template>
	<div id="register">
		<div class="background"></div>
		<div id="content">
			<div class="row h-100 d-flex align-items-center">
				<div class="col-md-10 col-lg-8 col-xl-5 mx-auto">
					<div class="wizard-container">
						<div class="card card-wizard active">
							<div class="card-header text-center">
								<h3 class="card-title my-4">Registreer</h3>
								<div class="wizard-navigation">
									<ul class="nav nav-pills d-flex">
										<li class="nav-item" :class="{ active: step === 1 }">
											<a
												class="nav-link"
												@click="step = maxStep >= 1 ? 1 : step"
											>
												<i class="fas fa-user"></i>
												Profiel
											</a>
										</li>
										<li class="nav-item" :class="{ active: step === 2 }">
											<a
												class="nav-link"
												@click="step = maxStep >= 2 ? 2 : step"
											>
												<i class="fas fa-school"></i>
												School
											</a>
										</li>
										<li class="nav-item" :class="{ active: step === 3 }">
											<a
												class="nav-link"
												@click="step = maxStep >= 3 ? 3 : step"
											>
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
											<h5 class="info-text mt-0">
												Laten we beginnen met wat algemene gegevens
											</h5>
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
														<input
															type="email"
															placeholder="Email"
															class="form-control"
															v-model="newUser.email"
														/>
													</div>
												</div>
											</div>
											<div class="float-end mt-5">
												<button
													type="submit"
													class="btn btn-next btn-fill btn-rose btn-wd valid"
													v-if="step < 3"
												>
													Volgende
												</button>
											</div>
										</form>
									</div>
									<!-- Step 2 -->
									<div class="tab-pane active" v-show="step === 2">
										<form @submit.prevent="next()">
											<h5 class="info-text">
												nu wat gegevens over de school
											</h5>
											<div class="row justify-content-center">
												<div class="col-10">
													<div class="form-group mt-4">
														<div class="input-group mb-0">
															<div class="input-group-prepend">
																<span class="input-group-text pe-2">
																	<i class="fas fa-address-card"></i>
																</span>
															</div>
															<select
																class="form-select form-control border-input show-tick"
																v-model="newUser.type"
																required
																title="Type"
															>
																<option value="student" selected>
																	Student
																</option>
																<option value="teacher">
																	Docent
																</option>
															</select>
														</div>
														<label v-if="newUser.type === 'teacher'"
															><b>Let op:</b> Om je als docent te registeren heb
															je een docenten HMC-adresemail nodig nodig.</label
														>
													</div>
													<div
														class="form-group mt-4"
														v-if="newUser.type === 'student'"
													>
														<div class="input-group mb-0">
															<div class="input-group-prepend">
																<span class="input-group-text pe-2">
																	<i class="fas fa-user-tag"></i>
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
														<label
															><b>Let op:</b> Controleer je studentennummer
															goed! Zonder geldig studentennummer kun je geen
															materiaal aanschaffen.</label
														>
													</div>
													<div
														class="input-group"
														v-if="newUser.type === 'student'"
													>
														<div class="input-group-prepend">
															<span class="input-group-text pe-2">
																<i class="fas fa-graduation-cap"></i>
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

													<div class="form-group mt-2">
														<label v-if="newUser.type === 'student'"
															>Welke opleiding volg je?</label
														>
														<label v-if="newUser.type === 'teacher'"
															>Voor welke opleiding werk je?</label
														>
														<select
															class="form-select form-control border-input show-tick"
															v-model="newUser.study"
															required
															title="Opleiding"
														>
															<option
																class="bs-title-option"
																:value="''"
																hidden
															>
																Selecteer...
															</option>
															<option value="Meubel">
																Meubel
															</option>
															<option value="Interieur">
																Interieur
															</option>
															<option value="Creatief">
																Creatief
															</option>
															<option value="Stofferen">
																Stofferen
															</option>
															<option value="Werkvoorbereiding">
																Werkvoorbereiding
															</option>
															<option value="Werkvoorbereiding">
																Technisch leidinggevende
															</option>
															<option value="Overige">
																Overige
															</option>
														</select>
													</div>
												</div>
											</div>
											<div class="float-end mt-5">
												<button
													type="submit"
													class="btn btn-next btn-fill btn-rose btn-wd valid"
												>
													Volgende
												</button>
											</div>
											<div class="float-start mt-5">
												<button
													class="btn btn-next btn-fill btn-rose btn-wd valid"
													@click="step--"
												>
													Vorige
												</button>
											</div>
										</form>
									</div>
									<!-- Step 3 -->
									<div class="tab-pane active" v-show="step === 3">
										<form @submit.prevent="addUser()">
											<h5 class="info-text mt-0">
												Tot slot de Beveiliging van jouw account
											</h5>

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

													<Checkbox
														class="mt-5"
														@toggleCheck="setCheck"
														:link="'/privacy'"
													/>
												</div>
											</div>

											<div class="float-end mt-5">
												<button
													type="submit"
													class="btn btn-next btn-fill btn-rose btn-wd valid"
												>
													Klaar
												</button>
											</div>
											<div class="float-start mt-5">
												<button
													class="btn btn-next btn-fill btn-rose btn-wd valid"
													@click="step--"
												>
													Vorige
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
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
					type: "student",
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
		methods: {
			setCheck(val) {
				this.newUser.privacyCheck = val;
			},
			next() {
				this.step++;
				this.maxStep = this.step > this.maxStep ? this.step : this.maxStep;
			},
			async addUser() {
				if (!this.passwordCheck()) return;
				if (!this.privacyCheck()) return;
				if (!this.teacherCheck()) return;
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
			},
			passwordCheck() {
				if (this.newUser.password === this.newUser.passwordCheck) {
					return true;
				} else {
					this.$store.dispatch("notification", {
						style: "warning",
						msg: {
							title: "Wachtwoord fout",
							text: "Controle wachtwoord komt niet overeen"
						}
					});
					return false;
				}
			},
			privacyCheck() {
				if (this.newUser.privacyCheck) {
					return true;
				} else {
					this.$store.dispatch("notification", {
						style: "warning",
						msg: {
							title: "Voorwaarden niet geaccepteerd",
							text: "Accepteer de privacy voorwaarden om door te  gaan."
						}
					});
					return false;
				}
			},
			teacherCheck() {
				if (this.newUser.type === "student") return true;

				// Test if hmc-email
				const test1 = this.newUser.email.includes("@hmcollege.nl");
				// Test if teacher account
				const regex = new RegExp("^[A-Za-z]+.([A-Za-z].)?[A-Za-z]+$");
				const str = this.newUser.email.substr(0, this.newUser.email.indexOf("@"));
				const test2 = regex.test(str);

				if (!test1 || !test2) {
					this.$store.dispatch("notification", {
						style: "warning",
						msg: {
							title: "Geen geldig docenten email adres",
							text:
								"Vul een geldig HMC-emailadres in dat is gekoppeld aan een docentenaccount."
						}
					});
					return false;
				} else {
					return true;
				}
				return false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	#register {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 9999;
		background: white;
		display: flex;
		overflow: none;
		overflow: hidden;

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
			width: 100vw;
			height: 80vh;
			z-index: 2;
			// box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
			border-radius: 6px;
			min-width: 400px;
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
