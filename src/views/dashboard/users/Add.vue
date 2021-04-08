<template>
	<div class="content">
		<div class="row d-flex justify-content-center">
			<div class="col-10 col-sm-6 col-xl-4">
				<form class="form" @submit.prevent="addUser">
					<div class="card card-signup mt-5">
						<div class="card-header text-center">
							<h4 class="card-title">Voeg gebruiker toe</h4>
						</div>
						<div class="card-body">
							<h5 class="title mb-0 text-info">Gegevens</h5>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-signature"></i>
									</span>
								</div>
								<input
									type="text"
									v-model="newUser.firstName"
									required
									class="form-control"
									placeholder="Voornaam"
								/>
							</div>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-signature"></i>
									</span>
								</div>
								<input
									type="text"
									v-model="newUser.lastName"
									required
									placeholder="Achternaam"
									class="form-control"
								/>
							</div>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-envelope"></i>
									</span>
								</div>
								<input
									type="email"
									v-model="newUser.email"
									required
									class="form-control"
									placeholder="Email"
								/>
							</div>
							<!-- School -->
							<h5 class="title mb-0 text-warning">School</h5>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-signature"></i>
									</span>
								</div>
								<input
									type="text"
									v-model="newUser.class"
									required
									class="form-control"
									placeholder="Klas"
								/>
							</div>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-signature"></i>
									</span>
								</div>
								<input
									type="text"
									v-model="newUser.study"
									required
									placeholder="Opleiding"
									class="form-control"
								/>
							</div>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-envelope"></i>
									</span>
								</div>
								<input
									type="number"
									v-model.number="newUser.studentNumber"
									required
									class="form-control"
									placeholder="Studentennummer"
								/>
							</div>
							<h5 class="title mb-0 mt-3 text-danger">
								Beveiliging
							</h5>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-lock"></i>
									</span>
								</div>
								<input
									type="password"
									v-model="newUser.password"
									required
									class="form-control"
									placeholder="Wachtwoord"
								/>
							</div>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-lock"></i>
									</span>
								</div>
								<input
									type="password"
									v-model="newUser.passwordCheck"
									required
									class="form-control"
									placeholder="Controle wachtwoord"
								/>
							</div>
						</div>
					</div>
					<button type="submit" class="btn btn-default float-end">
						Voeg gebruiker toe
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "addUser",
		data() {
			return {
				newUser: {
					firstName: "",
					lastName: "",
					email: "",
					class: "",
					study: "",
					studentNumber: "",
					password: "",
					passwordCheck: "",
				},
			};
		},
		computed: {
			passwordSame() {
				return this.newUser.password === this.newUser.passwordCheck;
			},
		},
		methods: {
			async addUser() {
				if (this.passwordSame) {
					try {
						// add user
						await this.$store.dispatch("addUserAsAdmin", this.newUser);

						// onComplete:
						this.$store.dispatch("notification", {
							style: "success",
							msg: {
								title: "Succesvol Toegevoegd!",
								text: "De gebruiker is succesvol toegevoegd!",
							},
						});

						// redirect
						this.$router.push("/dashboard/users");
					} catch (err) {
						this.$store.dispatch("notification", {
							style: "error",
							msg: err,
						});
					}
				} else {
					this.$store.dispatch("notification", {
						style: "error",
						msg: {
							code: "Wachtwoord fout",
							message: "Controle wachtwoord komt niet overeen",
						},
					});
				}
			},
		},
	};
</script>
