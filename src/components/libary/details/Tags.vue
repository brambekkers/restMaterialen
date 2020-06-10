<template>
    <div class="card" v-if="material">
        <div class="card-header">
            <h4 class="card-title mb-0">Labels</h4>
        </div>
        <div class="card-body">
            <!-- Labels -->
            <div class="col-12">
                <div class="form-group" v-if="material.tags.length">
                    <span v-for="tag of material.tags" :key="tag" class="tag">{{ tag }}</span>
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
</style>
