
<template>
	<div class="col-md-12">
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
								<input type="text" class="form-control" placeholder="Achternaam" v-model="user.lastName" />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<button class="btn btn-danger" @click="deleteButton()">Verwijder account</button>
		<button class="btn btn-default float-right">Update account</button>
	</div>
</template>

<script>
	export default {
		props: ["user"]
	};
</script>