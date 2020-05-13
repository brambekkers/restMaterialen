<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col">{{ material.id }}</div>
            <div class="col">{{ material.name }}</div>
            <div class="col">{{ material.type }}</div>
            <div class="col">{{ material.length }}</div>
            <div class="col">{{ material.width }}</div>
            <div class="col">{{ material.thickness }}</div>
        </div>
    </li>
</template>

<script>
export default {
    props: ["material"]
};
</script>
