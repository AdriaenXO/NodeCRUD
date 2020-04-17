<template>
    <tr v-if="!isEditing">
        <td>{{displayUser(users.find(u => u.id === rating.user_id))}}</td>
        <td>{{displayBook(books.find(b => b.id === rating.book_id ))}}</td>
        <td>{{rating.rating}}/10</td>
        <td>
            <div class='extra content centered'>
            <span class='ui right floated edit icon' v-on:click="showForm">
                <i class="edit icon"></i>
            </span>
            <span class='ui right floated trash icon' v-on:click="deleteRating(rating)">
                <i class='trash icon'></i>
            </span>
            </div>
        </td>
    </tr>
    <tr v-else>
        <td>
            <select id="users" v-model="rating.user_id">
                <option v-for="user in users" :key="user.id" :value="user.id">{{ displayUser(user) }}</option>
            </select>
        </td>
        <td>
            <select id="books" v-model="rating.book_id">
                <option v-for="book in books" :key="book.id" :value="book.id">{{ displayBook(book) }}</option>
            </select>
        </td>
        <td><input v-model="rating.rating" type='number' ref='rating' min="0" max="10" defaultValue="10"></td>
        <td>
            <div class='ui two button attached buttons'>
                <button class='ui basic blue button' v-on:click="updateRating(rating)">
                    Update
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "rating",
        props: ['rating', 'users', 'books'],
        data () {
            return {
                isEditing: false,
            }
        },
        methods: {
            showForm() {
                this.isEditing = true;
            },
            updateRating(rating) {
                if (rating.rating !== '') {
                    this.isEditing = false;
                    this.$emit('update-rating', rating);
                } else {
                    this.$toast.error('Rating cannot be empty.');
                }
            },
            deleteRating(rating) {
                this.$emit('delete-rating', rating.id);
            }
        },
    }
</script>

<style scoped>
    select, option {
        max-width:100px;
    }
</style>