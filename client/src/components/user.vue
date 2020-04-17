<template>
    <div class="card" v-if="!isEditing">
        <div class="content">
            <strong>ID:</strong> {{user.id}}
        </div>
        <div class="content">
            <strong>First name:</strong> {{user.firstName}}
        </div>
        <div class="content">
            <strong>Last name:</strong> {{user.lastName}}
        </div>
        <div class='extra content centered'>
            <span class='ui right floated edit icon' v-on:click="showForm">
                <i class="edit icon"></i>
            </span>
            <span class='ui right floated trash icon' v-on:click="deleteUser(user)">
                <i class='trash icon'></i>
            </span>
        </div>
    </div>
    <div class="card" v-else>
        <div class='ui form'>
            <div class='field'>
                <label>ID</label>
                <input type='text' disabled="disabled" v-model="user.id" />
            </div>
            <div class='field'>
                <label>First name</label>
                <input type='text' v-model="user.firstName" />
            </div>
            <div class='field'>
                <label>Last name</label>
                <input type='text' v-model="user.lastName" />
            </div>
            <div class='ui two button attached buttons'>
                <button class='ui basic blue button' v-on:click="updateUser(user)">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user",
        props: ['user'],
        data () {
            return {
                isEditing: false,
            }
        },
        methods: {
            showForm() {
                this.isEditing = true;
            },
            updateUser(user) {
                if (user.firstName.length > 0 && user.lastName.length > 0) {
                    this.isEditing = false;
                    this.$emit('update-user', user);
                } else {
                    this.$toast.error('First name and last name cannot be empty.');
                }
            },
            deleteUser(user) {
                this.$emit('delete-user', user.id);
            }
        },
    }
</script>

<style scoped>

</style>