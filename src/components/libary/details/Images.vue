<template>
    <div class="card" v-if="material">
        <div class="card-header">
            <h4 class="card-title mb-0">Afbeeldingen</h4>
        </div>
        <div class="card-body">
            <!-- Images -->
            <div class="col-12">
                <div v-if="material.images.length">
                    <span v-for="image of material.images" :key="image.path" class="thumbnail">
                        <img :src="image.url" class="img-thumbnail" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["material"]
};
</script>

<style lang="scss" scoped>
.thumbnail {
    display: inline-block;
    position: relative;
    width: 200px;
    height: auto;
    margin: 10px 10px;

    img {
    }
}
</style>
