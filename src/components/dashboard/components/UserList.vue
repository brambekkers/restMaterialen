<template>
    <div class="table-responsive-md">
        <table class="table table-striped">
            <thead class="text-primary">
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Naam</th>
                    <th class="text-right">Acties</th>
                </tr>
            </thead>
            <tbody>
                <User v-for="user of users" :key="user.id" :user="user" />
            </tbody>
        </table>
    </div>
</template>

<script>
import User from "@/components/dashboard/components/User.vue";

export default {
    name: "Userlist",
    components: { User },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    }
};
</script>
