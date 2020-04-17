<template>
  <div id="app">
    <div class="extra center aligned">
      <h1>Library</h1>
    </div>
    <div class="ui three column grid container">
      <div class="column">
        <create-user v-on:create-user="createUser"></create-user>
      </div>

      <div class="column">
        <create-book v-on:create-book="createBook"></create-book>
      </div>

      <div class="column">
        <create-rating :users="users" :books="books" v-on:create-rating="createRating"></create-rating>
      </div>

      <div class="column">
        <div class="ui two cards">
          <user v-for="(user, index) of users" :user="user" :key=index v-on:delete-user="deleteUser" v-on:update-user="updateUser"></user>
        </div>
      </div>

      <div class="column">
        <div class="ui cards two column">
          <book v-for="(book, index) of books" :book="book" :key=index v-on:delete-book="deleteBook" v-on:update-book="updateBook"></book>
        </div>
      </div>

      <div class="column">
        <table class="ui two column celled padded table">
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Rating</th>
            <th></th>
          </tr>
          <rating v-for="(rating, index) of ratings" :rating="rating" :key=index v-on:delete-rating="deleteRating" v-on:update-rating="updateRating" :users="users" :books="books"></rating>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import user from "@/components/user";
import book from "@/components/book";
import rating from "@/components/rating";
import CreateUser from "@/components/create-user";
import CreateBook from "@/components/create-book";
import CreateRating from "@/components/create-rating";

export default {
  name: 'app',
  components: {
    CreateRating,
    CreateBook,
    CreateUser,
    user,
    book,
    rating
  },
  data() {
    return {
      users: null,
      books: null,
      ratings: null,
    }
  },
  created() {
    this.$toast.info('Starting...');
    // get users
    axios.get(this.$data.SERVER_PATH + 'users').then(response => (this.users = response.data));

    // get books
    axios.get(this.$data.SERVER_PATH + 'books').then(response => (this.books = response.data));

    //get ratings
    axios.get(this.$data.SERVER_PATH + 'ratings').then(response => (this.ratings = response.data));
  },
  methods: {
    createUser(user) {
      user.id = Math.max(...this.users.map(u => u.id), 1)+1;
      axios.post(this.$data.SERVER_PATH + 'users', user).then(response => (this.users = response.data));
      this.$toast.success('Successfully added an user.');
    },
    updateUser(user) {
      axios.put(this.$data.SERVER_PATH + 'users/' + user.id, { id: user.id, firstName: user.firstName, lastName: user.lastName }).then(response => (this.users = response.data));
      this.$toast.success('Successfully updated an user.');
    },
    deleteUser(id) {
      axios.delete(this.$data.SERVER_PATH + 'users/' + id).then(response => (this.users = response.data));
      this.$toast.success('Successfully removed an user.');
    },

    createBook(book) {
      book.id = Math.max(...this.books.map(b => b.id), 1)+1;
      axios.post(this.$data.SERVER_PATH + 'books', book).then(response => (this.books = response.data));
      this.$toast.success('Successfully added a book.');
    },
    updateBook(book) {
      axios.put(this.$data.SERVER_PATH + 'books/' + book.id, { id: book.id, title: book.title, author: book.author, year: parseInt(book.year)}).then(response => (this.books = response.data));
      this.$toast.success('Successfully updated a book.');
    },
    deleteBook(id) {
      axios.delete(this.$data.SERVER_PATH + 'books/' + id).then(response => (this.books = response.data));
      this.$toast.success('Successfully removed a book.');
    },

    createRating(rating) {
      rating.id = Math.max(...this.ratings.map(r => r.id), 1)+1;
      axios.post(this.$data.SERVER_PATH + 'ratings', rating).then(response => (this.ratings = response.data));
      this.$toast.success('Successfully added a rating.');
    },
    updateRating(rating) {
      axios.put(this.$data.SERVER_PATH + 'ratings/' + rating.id, { id: rating.id, user_id: rating.user_id, book_id: rating.book_id, rating: parseInt(rating.rating), }).then(response => (this.ratings = response.data));
      this.$toast.success('Successfully updated a rating.');
    },
    deleteRating(id) {
      axios.delete(this.$data.SERVER_PATH + 'ratings/' + id).then(response => (this.ratings = response.data));
      this.$toast.success('Successfully removed a rating.');
    },
  }
}
</script>

<style>
  h1 {
    text-align: center;
  }

  .trash {
    color: darkred;
  }

  .edit, .plus {
    color: darkgreen;
  }
</style>
