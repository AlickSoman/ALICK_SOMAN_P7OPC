<template>
    <div v-if="posts.length > 0" id="postsContainer">
        <div :key="post.id" v-for="post in posts" class="post">
            <div class="header">
                <div class="profileContainer">
                    <img :src="'http://localhost:3000/images/' + post.User.profile" :alt="post.User.profile" class="profile">    
                </div>
                <div class="description">
                    <div>
                        <h4>{{ post.User.firstname }} {{ post.User.lastname }}</h4>
                        <p>Le : {{moment(post.createdAt )}}</p>
                    </div>                 
                    <div v-if="auth(post.userId)" class="optionsBtn">
                        <button @click="modifyPost(post.id)"><i class="far fa-edit modify"></i>edit</button>
                        <button @click="deletePost(post.id)"><i class="far fa-trash-alt delete"></i></button>    
                    </div>
                </div>                               
            </div>
            <div class="centerPost"></div>
            <h2 class="title">{{ post.title }}</h2>
            <div v-if="post.file" class="fileContainer">          
                <img :src="'http://localhost:3000/images/' + post.file" :alt="post.file" class="file">
            </div>
            <p class="description">{{ post.text }}</p>
            <div class="interaction">
                <Likes :postId="post.id" :userId="userId" />
                |
                <button @click="toggleComments(post.id)" class="btn comments"><i class="far fa-comment"></i>Réagir !</button>
            </div>
            <Comments v-if="showComments == post.id" :comments="comments" :isAdmin="isAdmin" :userId="userId" :postId="post.id" 
                @created="addComment" @deleted="deleteComment" @modified="modifyComment"/>             
        </div>
    </div>
    <div id="noPost" v-else>
        <p>"!"</p>
    </div>
</template>

<script>
import Comments from "../components/Comments.vue"
import Likes from "../components/Likes.vue"
import router from '../router'
import moment from 'moment'
export default {
    name: 'Posts',
    components: {
        Comments,
        Likes
    },
    props: {
        posts: Array,
        isAdmin: Boolean,
        userId: Number
    },
    data() {
        return {
            comments: [],
            likes: [],
            showComments: null,
        }
    },
    methods: {

        // formatage de la date
        moment(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        /* détermine le statut de l'user connecté par rapport à ce post */
        auth(postUserId) {
            if (this.isAdmin) {
                return true
            }
            if (this.userId !== postUserId) {
                return false
            }
            return true          
        },
        /* la fonction pour montrer/cacher la section commentaires */
        toggleComments(postId) {
            if (this.showComments == postId) {
                postId = null
            }
            this.showComments = postId
            this.fetchComments(postId)
        },
        /* pour supprimer le post */
        deletePost(postId) {
            const data = {
                userId: localStorage.getItem('userId')
            }
            if (confirm("êtes vous sûr de vouloir supprimer cette publication ?")) {
                    fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)                
                    })
                        .catch(error => console.log(error))
                this.$emit('delete-Post', postId) // <- on envoie un emitter pour actualiser dynamiquement
            }
        },
        /* vers la page de modification du post (selon son id) */
        modifyPost(id) {
            router.push({ path: `/modify-post/${id}` })
        },
        /* ajout d'un commentaire (via les emitters du composant 'Comment') */
        async addComment(commentId) {
            const comment = await fetch(`http://localhost:3000/api/comments/${JSON.stringify(commentId)}`)
            const newComment =  await comment.json()
            this.comments.unshift(newComment)
            return newComment
        },
        /* actualisation suite à la suppression du commentaire */
        async deleteComment(commentId) {
            this.comments = this.comments.filter((comment) => comment.id != commentId)
        },
        /* actualisation suite à la modification du commentaire */
        async modifyComment(commentId, newText) {
            this.comments.forEach(comment => {
                if(comment.id == commentId) {
                    comment.text = newText
                }
            }) 
        },            
        /* le fetch de tous les commentaires d'un post (selon son postId) */
        async fetchComments(postId) {
            if (postId == null) {
                return
            }
            const resComments = await fetch(`http://localhost:3000/api/comments/${JSON.stringify(postId)}/all`)
            const dataComments = await resComments.json()
            dataComments.reverse()
            this.comments = dataComments
            return dataComments
        }        
    }
}
</script>

<style scoped>
#postsContainer {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: auto;
    margin: 2%;
    border-radius: 4px;
}
.post {
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
    width: 300px;
    max-width: 400;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.optionsBtn{
    border-top: 1px solid red;
    padding: 10px 0px 10px 0px;
}
.centerPost{
    display: flex;
    flex-direction: column;
    padding: 0 auto 20px auto;
    margin-bottom:20px ;
}
h4{
    color: #002b5c;
    font-weight: 800;
    text-transform: uppercase;
}
.title {
    color:#002b5c;
    text-align: center;
    margin: 0;
    padding: 0 0 1rem 1rem !important;
    height: 1rem;
    width: calc(90% - 1rem)
}
.title::first-letter{
    text-transform: capitalize;}
.description {
    margin: 1.4rem 0 1.4rem 0;
    text-align: center;
    width: 90%;
    padding-left: 16px;
    flex-wrap: wrap;
}
.profileContainer {
    margin: auto;
    width: 70px;
    height: 70px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
.far{
    color: #fd503a;
}
.profile {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.modify, .delete {
    margin: 0 0.2rem 0 1rem;
}

.fileContainer {
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
    object-fit: cover;
    text-align: center;
}
.file {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1)
}
button {
    background: none;
    border-style: none;
    outline: none;   
}
.interaction {
    border-top: 1px solid rgb(0 0 0 / 10%);
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
}
.comments {
    width: 40%;
}
#noPost {
    margin: 2rem;
}
i {
    margin-right: 4px;
}
@media screen and (max-width: 992px) {
    #postsContainer {
        width: 100%;
    }
    .post {
        margin: 2rem 0 0 0;
        width: 230px;
        max-width: 230;
    }
    .header {
        flex-direction: column;
    }
    .profileContainer {
        max-width: 64px;
        max-height: 64px;
    }
    .description {
        display: flex;
        flex-direction: column;
        text-align: center;
        vertical-align: center;
        width: 100%;
        padding-left: 0;
        flex-wrap: wrap;
        line-height: 2rem;
    }
    .optionsBtn {
        display: flex;
        justify-content: space-between;
    }
}
</style>