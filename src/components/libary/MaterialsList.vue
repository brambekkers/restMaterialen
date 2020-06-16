<template>
    <div class="table-responsive-md">
        <table class="table table-striped">
            <thead class="text-primary">
                <tr>
                    <th>ID</th>
                    <th>Naam</th>
                    <th>Type</th>
                    <th>Lengte</th>
                    <th>Breedte</th>
                    <th>Dikte</th>
                    <th>Prijs</th>
                </tr>
            </thead>
            <tbody>
                <Material v-for="material of materials" :key="material.id" :material="material" />
            </tbody>
        </table>
    </div>
</template>

<script>
import Material from "@/components/libary/Material.vue";

export default {
    components: { Material },
    props: ["materials"]
};
</script>
