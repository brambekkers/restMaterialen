<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <form @submit.prevent="add()">
                            <div class="card">
                                <div class="card-header d-flex">
                                    <h4 class="card-title">
                                        Algemene materiaal info
                                    </h4>
                                    <i class="information fas fa-info-circle ml-auto text-warning mt-1 mr-1"></i>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-8 col-xl-5">
                                            <div class="form-group">
                                                <label>Naam</label>
                                                <input type="text" v-model="newMaterial.name" placeholder="Wat is het voor materiaal" class="form-control border-input" required />
                                            </div>
                                        </div>
                                        <!-- TYPE -->
                                        <div class="col-4 col-xl-3">
                                            <div class="form-group">
                                                <label>Type</label>
                                                <select
                                                    class="selectpicker form-control border-input show-tick"
                                                    data-style="btn btn-neutral btn-block mt-0 border "
                                                    v-model="newMaterial.type"
                                                    required
                                                    title="Selecteer..."
                                                >
                                                    <option class="bs-title-option" value="" hidden disabled></option>
                                                    <option value="Plaatmateriaal">Plaatmateriaal</option>
                                                    <option value="Massief hout">Massief hout</option>
                                                    <option value="Meubelstoffen">Meubelstoffen</option>
                                                    <option value="Overige">Overige</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-8 col-xl-4">
                                            <div class="form-group">
                                                <label>Herkomst</label>
                                                <input type="text" v-model="newMaterial.origin" placeholder="Waar komt het materiaal vandaan?" class="form-control border-input" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Lengte</label>
                                                <input type="number" v-model.number="newMaterial.length" placeholder="Lengte" class="form-control" min="1" required />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Breedte</label>
                                                <input type="number" v-model.number="newMaterial.width" placeholder="Breedte" class="form-control" min="1" required />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Dikte</label>
                                                <input type="number" v-model.number="newMaterial.thickness" placeholder="Dikte" class="form-control" min="1" required />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Aantal</label>
                                                <input type="number" v-model.number="amount" placeholder="Aantal" class="form-control" min="1" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label>Omschrijving</label>
                                                <textarea rows="5" v-model="newMaterial.description" placeholder="Omschrijving van het materiaal" class="form-control border-input" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title mb-0">
                                                Afbeeldingen
                                            </h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-8">
                                                    <div class="form-group">
                                                        <input type="file" id="newImage" accept="image/png, image/jpeg" class="form-control-file mt-2" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <button class="btn btn-outline-primary mt-0" @click.prevent="addImage">
                                                        Voeg toe
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Images -->
                                            <div class="col-12">
                                                <div class="form-group" v-if="newMaterial.images.length">
                                                    <br />

                                                    <span v-for="(image, i) of newMaterial.images" :key="image.path" class="thumbnail">
                                                        <img :src="image.url" class="img-thumbnail" />
                                                        <i class="close fas fa-times" @click="removeImage(i)"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title mb-0">
                                                Labels
                                            </h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-8">
                                                    <div class="form-group">
                                                        <input type="text" placeholder="Voeg een steekwoord toe" v-model="tag" class="form-control border-input" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <button class="btn btn-outline-primary mt-0" @click.prevent="addTag">
                                                        Voeg toe
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Labels -->
                                        <div class="col-12">
                                            <div class="form-group" v-if="newMaterial.tags.length">
                                                <br />

                                                <span v-for="tag of newMaterial.tags" :key="tag" class="tag">
                                                    {{ tag }}
                                                    <i class="close fas fa-times" @click="removeTag(tag)"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-default float-right" type="submit">
                                Voeg materiaal toe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Notify from "bootstrap-notify";
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "AddMaterial",
    data() {
        return {
            tag: "",
            amount: 1,
            newMaterial: {
                name: "",
                type: "",
                origin: "",
                length: null,
                width: null,
                thickness: null,
                description: "",
                claimed: false,
                tags: [],
                images: [],
                creationTime: null,
                lastEditTime: null
            }
        };
    },
    components: { Sidebar, Navbar, Footer },
    methods: {
        addTag() {
            if (this.tag.length > 0 && !this.newMaterial.tags.includes(this.tag)) {
                this.newMaterial.tags.push(this.tag);
                this.tag = "";
            }
        },
        removeTag(tag) {
            const i = this.newMaterial.tags.indexOf(tag);
            if (i !== -1) this.newMaterial.tags.splice(i, 1);
        },
        async addImage() {
            // Get files from input
            const input = document.getElementById("newImage");
            const image = input.files[0];
            // Upload files to server
            // return image info (url and path)
            const imageInfo = await this.$store.dispatch("uploadImage", image);
            // Push image info to newMaterial
            this.newMaterial.images.push(imageInfo);
        },
        async removeImage(i) {
            const path = this.newMaterial.images[i].path;
            const isremoved = await this.$store.dispatch("removeImage", path);

            if (isremoved) this.newMaterial.images.splice(i, 1);

            //
        },
        async add() {
            for (let i = 0; i < this.amount; i++) {
                this.newMaterial.creationTime = new Date();
                this.newMaterial.lastEditTime = new Date();
                const res = await this.$store.dispatch("addMaterial", this.newMaterial);

                if (res === true) {
                    this.notification(true);
                    this.$router.push("/dashboard/materials");
                } else {
                    this.notification(false, res);
                }
            }
            this.resetFields();
        },
        notification(succes, error) {
            if (succes) {
                const color = "success";
                $.notify(
                    {
                        title: "Toegevoegd!",
                        message: "Het materiaal is succesvol aan de database toegevoegd!"
                    },
                    {
                        type: "success"
                    }
                );
            } else {
                $.notify(
                    {
                        title: "Error",
                        message: error
                    },
                    {
                        type: "danger"
                    }
                );
            }
        },
        resetFields() {
            this.tag = "";
            this.amount = 1;

            this.newMaterial.name = "";
            this.newMaterial.type = "";
            this.newMaterial.origin = "";
            this.newMaterial.length = null;
            this.newMaterial.width = null;
            this.newMaterial.thickness = null;
            this.newMaterial.amount = 1;
            this.newMaterial.description = "";
            this.newMaterial.tags = [];
            this.newMaterial.images = [];
        }
    }
};
</script>

<style lang="scss" scoped>
.information {
    font-size: 2.5rem;

    &:hover {
        cursor: pointer;
        animation: jello; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 2s; /* don't forget to set a duration! */
    }
}
.thumbnail {
    display: inline-block;
    position: relative;
    width: 200px;
    height: auto;
    margin: 10px 10px;
}

.tag {
    display: inline-block;
    position: relative;
    margin: 0 5px;
    border-radius: 27px;
    font-size: 13px;
    letter-spacing: 0.45px;
    background: #fdfdfd;
    padding: 8px 18px;
    color: #464748;
    border: 1px solid #e8e5e5;
}

.close {
    position: absolute;
    color: red;
    font-size: 1.1rem;
    top: -5px;
    right: -2px;
}
</style>
