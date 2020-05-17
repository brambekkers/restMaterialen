<template>
	<div>
		<Navbar />
		<div class="main-content">
			<div class="container">
				<div class="row" v-if="user">
					<div class="col-md-4 mt-5">
						<div class="card card-user">
							<div class="image">
								<img src="@/assets/img/background.jpg" alt="..." />
							</div>
							<div class="author">
								<a href="#">
									<img class="avatar border-gray" src="@/assets/img/noImage.jpg" alt="..." />
									<h5 class="title">{{ user.firstName }} {{ user.lastName }}</h5>
								</a>
							</div>
							<div class="card-footer">
								<hr />
								<div class="button-container">
									<div class="row">
										<div class="col-6 ml-auto">
											<h5>
												0
												<br />
												<small>Reserveringen</small>
											</h5>
										</div>
										<div class="col-6 ml-auto mr-auto">
											<h5>
												0
												<br />
												<small>Aankopen</small>
											</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-8 mt-md-5">
						<div class="card">
							<div class="card-header">
								<h5 class="title">Edit Profile</h5>
							</div>
							<div class="card-body">
								<form>
									<div class="row">
										<div class="col-md-5 pr-1">
											<div class="form-group">
												<label>UID</label>
												<input type="text" class="form-control" v-model="user.id" disabled />
											</div>
										</div>

										<div class="col-md-4 px-1">
											<div class="form-group">
												<label>Email adres</label>
												<input type="email" class="form-control" v-model="user.email" disabled />
											</div>
										</div>
										<div class="col-md-3 pl-1">
											<div class="form-group">
												<label>Rol</label>
												<input type="text" class="form-control" v-model="user.role" disabled />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 pr-1">
											<div class="form-group">
												<label>Voornaam</label>
												<input type="text" class="form-control" v-model="user.firstName" placeholder="Voornaam" />
											</div>
										</div>
										<div class="col-md-6 pl-1">
											<div class="form-group">
												<label>Achternaam</label>
												<input
													type="text"
													class="form-control"
													placeholder="Achternaam"
													v-model="user.lastName"
												/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<button class="btn btn-danger">Verwijder account</button>
						<button class="btn btn-default float-right">Update account</button>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";

	export default {
		name: "Profile",
		components: { Navbar, Footer },
		computed: {
			rank() {
				return "Lid";
			},
			user() {
				return this.$store.getters.user;
			}
		}
	};
</script>
