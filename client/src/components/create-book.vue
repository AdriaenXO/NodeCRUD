<template>
    <div class='ui basic content center aligned segment'>
        <button class='ui basic button icon' v-on:click="openForm" v-show="!isEditing">
            <i class='plus icon'></i>
        </button>
        <div class='ui centered card' v-show="isEditing">
            <div class='content'>
                <div class='ui form'>
                    <div class='field'>
                        <label>Title</label>
                        <input v-model="title" type='text' ref='title' defaultValue="">
                    </div>
                    <div class='field'>
                        <label>Author</label>
                        <input v-model="author" type='text' ref='author' defaultValue="">
                    </div>
                    <div class='field'>
                        <label>Year</label>
                        <input v-model="year" type='number' ref='year' min="1900" max="2100" defaultValue="2020">
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
        name: "create-book",
        data() {
            return {
                title: '',
                author: '',
                year: null,
                isEditing: false,
            }
        },
        methods: {
            openForm() {
                this.isEditing = true;
            },
            closeForm() {
                this.title = '';
                this.author = '';
                this.year = null;
                this.isEditing = false;
            },
            sendForm() {
                if (this.title.length > 0 && this.author.length > 0 && this.year !== null) {
                    const title = this.title;
                    const author = this.author;
                    const year = parseInt(this.year);
                    this.$emit('create-book', {
                        title,
                        author,
                        year
                    });
                    this.closeForm();
                } else {
                    this.$toast.error('Title, author and year cannot be empty.');
                }
            }
        }
    }
</script>

<style scoped>

</style>