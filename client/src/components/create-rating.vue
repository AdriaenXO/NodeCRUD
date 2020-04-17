<template>
    <div class='ui basic content center aligned segment'>
        <button class='ui basic button icon' v-on:click="openForm" v-show="!isEditing">
            <i class='plus icon'></i>
        </button>
        <div class='ui centered card' v-show="isEditing">
            <div class='content'>
                <div class='ui form'>
                    <div class='field'>
                        <label>User</label>
                        <select id="users" v-model="user_id">
                            <option v-for="user in users" :key="user.id" :value="user.id">{{ displayUser(user) }}</option>
                        </select>
                    </div>
                    <div class='field'>
                        <label>Book</label>
                        <select id="books" v-model="book_id">
                            <option v-for="book in books" :key="book.id" :value="book.id">{{ displayBook(book) }}</option>
                        </select>
                    </div>
                    <div class='field'>
                        <label>Rating</label>
                        <input v-model="rating" type='number' ref='rating' min="0" max="10" defaultValue="10">
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
        name: "create-rating",
        props: ['users', 'books'],
        data () {
            return {
                user_id: null,
                book_id: null,
                rating: 10,
                isEditing: false,
            }
        },
        methods: {
            openForm() {
                this.isEditing = true;
            },
            closeForm() {
                this.user_id = null;
                this.book_id = null;
                this.rating = null;
                this.isEditing = false;
            },
            sendForm() {
                if (this.user_id !== null && this.book_id !== null && this.rating !== null) {
                    const user_id = this.user_id;
                    const book_id = this.book_id;
                    const rating = parseInt(this.rating);
                    this.$emit('create-rating', {
                        user_id,
                        book_id,
                        rating
                    });
                    this.closeForm()
                } else {
                    this.$toast.error('User, book and rating cannot be empty.');
                }
            }
        }
    }
</script>

<style scoped>

</style>