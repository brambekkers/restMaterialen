<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title mb-0">Labels</h4>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-8">
                    <div class="form-group">
                        <input type="text" placeholder="Voeg een steekwoord toe" v-model="tag" class="form-control border-input" />
                    </div>
                </div>
                <div class="col-lg-4">
                    <button class="btn btn-outline-primary mt-0" @click.prevent="addTag()">Voeg toe</button>
                </div>
            </div>
        </div>

        <!-- Labels -->
        <div class="col-12">
            <div class="form-group" v-if="material.tags.length">
                <br />

                <span v-for="tag of material.tags" :key="tag" class="tag">
                    {{ tag }}
                    <i class="close fas fa-times" @click="removeTag(tag)"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["material"],
    data() {
        return {
            tag: ""
        };
    },
    methods: {
        addTag(tag) {
            if (this.tag.length > 0 && !this.material.tags.includes(this.tag)) {
                this.material.tags.push(this.tag);
                this.tag = "";
            }
        },
        removeTag(tag) {
            const i = this.material.tags.indexOf(tag);
            if (i !== -1) this.material.tags.splice(i, 1);
        }
    }
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

.close {
    position: absolute;
    color: red;
    font-size: 1.1rem;
    top: -5px;
    right: -2px;
}
</style>
