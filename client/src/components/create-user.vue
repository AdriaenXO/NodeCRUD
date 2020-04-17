<template>
    <div class='ui basic content center aligned segment'>
        <button class='ui basic button icon' v-on:click="openForm" v-show="!isEditing">
            <i class='plus icon'></i>
        </button>
        <div class='ui centered card' v-show="isEditing">
            <div class='content'>
                <div class='ui form'>
                    <div class='field'>
                        <label>First name</label>
                        <input v-model="firstName" type='text' ref='firstName' defaultValue="">
                    </div>
                    <div class='field'>
                        <label>Last name</label>
                        <input v-model="lastName" type='text' ref='lastName' defaultValue="">
                    </div>
                    <div class='ui attached buttons'>
                        <button class='ui blue button' v-on:click="sendForm">
                            Create
                        </button>
                        <button class='ui red button' v-on:click="closeForm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "create-user",
        data() {
            return {
                firstName: '',
                lastName: '',
                isEditing: false,
            }
        },
        methods: {
            openForm() {
                this.isEditing = true;
            },
            closeForm() {
                this.firstName = '';
                this.lastName = '';
                this.isEditing = false;
            },
            sendForm() {
                if (this.firstName.length > 0 && this.lastName.length > 0) {
                    const firstName = this.firstName;
                    const lastName = this.lastName;
                    this.$emit('create-user', {
                        firstName,
                        lastName,
                    });
                    this.closeForm();
                } else {
                    this.$toast.error('First name and last name cannot be empty.');
                }
            }
        }
    }
</script>

<style scoped>

</style>