
<template>
	<div class="col-md-12">
		<div class="card">
			<div class="card-header">
				<h5 class="title">Profiel aanpassen</h5>
			</div>
			<div class="card-body">
				<form>
					<div class="row">
						<div class="col-md-5">
							<div class="form-group">
								<label>UID</label>
								<input
									type="text"
									class="form-control"
									:value="user.id"
									disabled
								/>
							</div>
						</div>

						<div class="col-md-4">
							<div class="form-group">
								<label>Email adres</label>
								<input
									type="email"
									class="form-control"
									:value="user.email"
									disabled
								/>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label>Rol</label>
								<input
									type="text"
									class="form-control"
									:value="
										user.admin
											? 'Admin'
											: user.editor
											? 'Beheerder'
											: 'Gebruiker'
									"
									disabled
								/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Voornaam</label>
								<input
									type="text"
									class="form-control"
									v-model="user.firstName"
									placeholder="Voornaam"
								/>
							</div>
						</div>
						<div class="col-md-6">
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
						<div class="col-md-4">
							<div class="form-group">
								<label>Klas</label>
								<input
									type="text"
									class="form-control"
									placeholder="Klas"
									v-model="user.class"
								/>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label>Opleiding</label>
								<input
									type="text"
									class="form-control"
									placeholder="Opleiding"
									v-model="user.study"
								/>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label>Studentennummer</label>
								<input
									type="number"
									class="form-control"
									placeholder="Studentennummer"
									v-model.number="user.studentNumber"
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["user"],
	};
</script>