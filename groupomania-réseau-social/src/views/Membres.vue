<template>
    <Nav redirection="/home" :logged="true" />  
    <Header :home="false" header="Membres" />
            <div id="query">
            <span><i class="fas fa-search"></i></span>
            <input type="text" placeholder="Recherche" v-model="search">
        </div>  
    <div id="usersContainer" class="userCt">
         
        <div :key="user.id" v-for="user in filterUsers" class="user">
            <div id="header">
                <div class="profileContainer">
                    <img :src="'http://localhost:3000/images/' + user.profile" :alt="user.profile" class="profile">    
                </div>
                <h4>{{user.firstname}} {{user.lastname}}</h4>   
            </div>             
            <div>                
                <p>Nombre de post(s) : {{user.Posts.length}}</p>
                <p>Likes reçus: {{getLikes(user.Posts)}}</p>
                <p class="event">Dernier post le :<br> {{getDate(user.Posts)}}  </p>                    
            </div>           
        </div>            
    </div> 
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
export default {
    name: 'Membres',
    components: {
        Nav,
        Header
    },
    data() {
        return {
            users: [],
            showPosts: null,
            search: ""
        }
    },
    methods: {
        /* on récupère les users */
        async fetchUsers() {
            const res = await fetch('http://localhost:3000/api/users/all')
            const data = await res.json()

            data.forEach(user => {
                user.username = user.firstname + " " + user.lastname
            })
            return data
        },
        /* le compteur des likes reçus par l'user */
        getLikes(userPosts) {
            let totalLikes = 0
            userPosts.forEach(post => {
                totalLikes += post.Likes.length
            })
            return totalLikes
        },
        /* la date dU post le plus récent */
        
        getDate(userPosts) {
            if (userPosts < 1) {
                return "Pas encore posté"
            } else {
                return userPosts[userPosts.length -1].createdAt.split('T')[0]   
            }
            
            
        }
    },
    async created() {
        this.users = await this.fetchUsers()
    },
    computed: {
        filterUsers: function() {
            return this.users.filter((user) => {
                return user.username.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
}
</script>

<style scoped>
#usersContainer {
    display: flex;
    /* flex: 3; */
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 4px;
}
.user {
    box-shadow: 2px 2px 9px 5px rgb(0 0 0 / 10%);
    padding: 1rem;
    width: 300px;
    /* height: auto; */
    margin: 0.5%;
    margin-top:0.7%;
    border-radius: 10px;
     
}
#header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;;
}
.profileContainer {
    width: 96px;
    height: 96px;
    min-width: 64px;
    min-height: 64px;    
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
}
.profile {
    /* height: 100%; */
    width: 100%;
    object-fit: cover;
}
h4{
    color:#4075C5;
    font-weight: 800;
    text-transform: uppercase;

}
i{
    color: #4075C5;
}
p {
    margin: 0.3rem;
    text-align: center;
}
#query {
    text-align: center;
    margin-bottom: 1.4% !important;
    background: #4075C5;
    width: 100%;
}
input {
    border: 1px solid #4075C5;
    border-radius: 0 10px 10px 0;
    border-left-style: none;
    padding: 7px;
}

input:focus {
    outline: none;
}
span {
    border: 1px solid #4075C5;
    background: #ffffff;
    border-right-style: none;
    border-radius: 10px 0 0 10px;
    padding: 7px;
}
@media screen and (max-width: 992px) {
    #usersContainer {
        max-width: 100%;
    }
}

</style>