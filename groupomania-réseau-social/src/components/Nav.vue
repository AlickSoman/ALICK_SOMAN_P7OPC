<template>
    
    <div id="nav"> 
            <!-- <div class="bondRoll"><img src="../assets/logos/Bitmap.svg" alt="baniere"> </div> -->
        <div id="logo">
            <router-link :to="redirection">
                <div id="logoContainer">
                    <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo">    
                </div>                
            </router-link>
        </div>
        <!-- Menu à afficher si l'utilisateur n'est pas connecté -> signup/login -->
        <div id="routes" v-if="!logged">
            <router-link to="/signup" class="link">Créer un compte</router-link>
            <router-link to="/login" class="link">Se connecter</router-link>    
        </div>  
        <!-- Si l'utilisateur est connecté en affiche -> membres/profil et déconnexion -->
        <div id="options" v-else>
            <router-link to="/profile" class="link"><i class="fas fa-user"></i>Profil</router-link>
            <router-link to="/membres" class="link"><i class="fas fa-users"></i>Membres</router-link>
            <router-link to="/" @click="logout" class="link"><i class="fas fa-sign-out-alt"></i>Déconnexion</router-link>
        </div>    
    </div>
</template>

<script>
import store from '../store/index.js'
import router from '../router'
export default {
    name: 'Nav',
    props: {
        redirection: String,
        logged: Boolean,
    },
    methods: {
        /* déconnexion de l'user */
        logout() {
            store.state.isLogged = false
            /* maintenant que isLogged (dans le store) est false on va renvoyer le user vers la page /login */
            router.push({ path: 'login' }) 
            /* pour déconnecter l'user on appelle la méthode clear() pour effacer tous les items dans localStorage */
            localStorage.clear() 
            console.log("utilisateur déconnecté")
        }
    }
}
</script>

<style scoped>
#nav {
    padding: 0 5% 0 5%;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 100px;
    background-color: #d05059;
}
#logoContainer img{
    max-width: 200px;
}
#routes, #options {
    display: flex;
    justify-content: flex-end;  
    width: 100%;  
}
/* .bondRoll{
    height: 200px;
} */
.link {
    text-align: center;
    margin: 0 5px 0 5px;
    border-radius: 10px;
    padding: 1rem;
    text-decoration: none;
    background: #ececeb;
    color: rgba(0, 0, 0, 0.75);
}
.link:hover{
    color: black;
    box-sizing: content-box;
}
i {
    margin-right: 2px;
}
@media screen and (max-width: 992px) {
    #nav {
        text-align: center;
        flex-wrap: wrap;
    }
    .link {
    text-align: center;
    margin: 0 5px 0 5px;
    border-radius: 10px;
    padding: 0 0.9em 0 0.9em;
    font-size: 15px;

}

    #options, #routes {
        justify-content: space-between;
    }
}
</style>