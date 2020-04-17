<template>
    <div class="card" v-if="!isEditing">
        <div class="content">
            <strong>ID:</strong> {{book.id}}
        </div>
        <div class="content">
            <strong>Title:</strong> {{book.title}}
        </div>
        <div class="content">
            <strong>Author:</strong> {{book.author}}
        </div>
        <div class="content">
            <strong>Year:</strong> {{book.year}}
        </div>
        <div class='extra content centered'>
            <span class='ui right floated edit icon' v-on:click="showForm">
                <i class="edit icon"></i>
            </span>
            <span class='ui right floated trash icon' v-on:click="deleteBook(book)">
                <i class='trash icon'></i>
            </span>
        </div>
    </div>
    <div class="card" v-else>
        <div class='ui form'>
            <div class='field'>
                <label>ID</label>
                <input type='text' disabled="disabled" v-model="book.id" />
            </div>
            <div class='field'>
                <label>Title</label>
                <input type='text' v-model="book.title" />
            </div>
            <div class='field'>
                <label>Author</label>
                <input type='text' v-model="book.author" />
            </div>
            <div class='field'>
                <label>Year</label>
                <input type='number' v-model="book.year"/>
            </div>
            <div class='ui two button attached buttons'>
                <button class='ui basic blue button' v-on:click="updateBook(book)">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "book",
        props: ['book'],
        data () {
            return {
                isEditing: false,
            }
        },
        methods: {
            showForm() {
                this.isEditing = true;
            },
            updateBook(book) {
                if (book.title.length > 0 && book.author.length > 0 && book.year.toString().length > 0) {
                    this.isEditing = false;
                    this.$emit('update-book', book);
                } else {
                    this.$toast.error('Title, author and year cannot be empty.');
                }
            },
            deleteBook(book) {
                this.$emit('delete-book', book.id);
            }
        },
    }
</script>

<style scoped>

</style>