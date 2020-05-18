<template>
    <div class="card">
        <div class="card-header d-flex">
            <h4 class="card-title mb-0">Prijs</h4>
            <i class="information fas fa-info-circle ml-auto text-warning mt-1 mr-1"></i>
        </div>
        <div class="card-body">
            <div class="row" >
                <!-- Price -->
                <div class="col-sm-6 col-md-3">
                    <div class="form-group">
                        <label>Prijs</label>
                        <input
                            type="number"
                            v-model="material.price"
                            placeholder="Wat is de prijs"
                            class="form-control border-input"
                            required
                        />
                    </div>
                </div>
                <!-- Type -->
                <div class="col-sm-6 col-md-3 form-group">
                    <label>Eenheid</label>
                    <select
                        class="selectpicker form-control border-input show-tick"
                        data-style="btn btn-neutral btn-block mt-0 border "
                        v-model="material.priceUnit"
                        required
                        title="Selecteer..."
                    >
                        <option class="bs-title-option" value hidden selected disabled></option>
                        <option value="Per stuk">Per stuk</option>
                        <option value="Per meter">Per meter</option>
                        <option value="Per m3">Per m3</option>
                        <option value="Per plaat">Per plaat</option>
                        <option value="Per m2">Per m2</option>
                        
                    </select>
                </div>
                <!-- Amount -->
                <div class="col-md-6 col-xl-6 form-group">
                    <label>Eén stuk bestaat uit hoeveel eenheden?</label>
                    <div class="row">
                        <div class="col-6 col-md-10 col-xl-8"><input
                        type="number"
                        v-model="material.unitAmount"
                        placeholder="Aantal stuks uit dit materiaal"
                        class="form-control border-input "
                        required
                    /></div>
                    </div>
                    
                </div>
            </div>
            <div class="form-group" v-if="material.price && material.unitAmount">
                <label>(Prijs per eenheid * aantal)</label>
                <p class="mb-0">
                    Totale prijs voor dit onderdeel:
                    <h5 class="ml-5 title mt-0 ">{{ material.price * material.unitAmount}} euro</h5>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["material"],
    mounted() {
        $(".selectpicker").selectpicker();
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
</style>
