<template>
<section class="CenterContent">
    <nav><Nav redirection="/home" :logged="true" /></nav>
    <Header :home="true" header="Forum Groupomania" class="positionNav"/>
    <button v-if="createPost" @click="toggleCreate" class="btn">Retour au posts</button>
    <button v-else @click="toggleCreate" class="btn">Écrire un Post</button> 
     <div id="ScrollTop"></div>
    <CreatePost v-show="createPost" @toggle-Create="toggleCreate" @add-Post="addPostFrontend" />

    <div v-if="!createPost" id="query">
        <span><i class="fas fa-search"></i></span>
        <input type="text" placeholder="Trouver un post" v-model="search">
    </div> 
    <Posts :posts="filterPosts" @delete-Post="deletePostFrontend" :isAdmin="isAdmin" :userId="userId"/>
    <a class="toTop" href="#ScrollTop"><i class="fas fa-arrow-up"></i></a>
</section>
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import CreatePost from "../components/CreatePost.vue"
import Posts from "../components/Posts.vue"


export default {
    name: "Home",
    components: {
        Nav,
        Header,
        CreatePost,
        Posts
    },
    data() {
        return {
            posts: [],
            createPost: false,
            isAdmin: null,
            userId: null,
            search: ""
        }
    },
    methods: {
        toggleCreate() {
            this.createPost = !this.createPost
            this.search = ""
        },
        async addPostFrontend() {
            this.posts = await this.fetchPosts()    
        },
        deletePostFrontend(id) {
            this.posts = this.posts.filter((post) => post.id !== id)
        },
        async fetchPosts() {
            const resPosts = await fetch('http://localhost:3000/api/posts/all')
            const dataPosts = await resPosts.json()
            dataPosts.forEach(post => {
                post.createdAt = post.createdAt.split('T')[0]
                post.User.username = post.User.firstname + " " + post.User.lastname
            })
            dataPosts.reverse()
            return dataPosts
        }
    },
    async created() {
        this.posts = await this.fetchPosts()
        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        this.userId = Number(localStorage.getItem('userId'))
    },
    computed: {
        filterPosts: function() {
            return this.posts.filter((post) => {
                return post.User.username.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }   
}
</script>

<style scoped>
.btn {
    display: inline-block;
    color: white;
    background: #002b5c;
    border: none;
    padding: 10px 48px;
    border-radius: 5px;
    text-decoration: none;
}
.positionNav h3{
    padding: 40px;
}
.btn:hover {
    box-shadow: 2px 2px 8px 5px #002b5c2c;
}
.btn:active {
    transform: scale(0.98);
}
.btn-block {
    display: block;
    width: 100%;
}
#query {
    margin: 1rem 0 0 0;
    justify-content: center;
    display: flex;
    flex-direction: row;
}
input {
    padding: 6px;
    border: 1px solid #002b5c;
    border-radius: 0 4px 4px 0;
    border-left-style: none;
    display: flex;
    width: 100%;
    flex-direction: row;
}
input:focus {
    outline: none;
}
.toTop{
position: fixed;
top: 85%; right: 5%;
    background-color: #002b5c;
    transition-delay: 2s ;
    padding: 10px 0px 10px 15px;
    border-radius: 50px;
    width: 30px;
    height: 30px;
}
.fa-arrow-up{
    left: 15px;
    color: white;
}
span {
    padding: 6px;
    border: 1px solid #002b5c;
    border-right-style: none;
    border-radius: 4px 0 0 4px;
}
@media screen and (max-width: 992px) {
    #query {
        margin: auto 2rem;
    }
    .btn {
        margin: 0.9rem 2rem;
    }
}
</style>