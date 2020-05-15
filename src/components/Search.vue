<template>
    <form @submit.prevent="search">
        <div class="input-group no-border">
            <input
                type="text"
                value
                class="form-control"
                placeholder="Search..."
                v-model="searchText"
            />
            <div class="input-group-append">
                <div class="input-group-text">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            searchText: ""
        };
    },
    methods: {
        search() {
            this.$emit("search", this.search);
        }
    }
};
</script>
