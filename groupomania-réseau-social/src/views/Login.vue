<template>
    <Nav redirection="/login" :logged="false"/>
    <section id="loginForm">
        <h3>Espace de connexion</h3>
        <form @submit.prevent="onSubmit">
            <input type="email" name="email" placeholder="Email" v-model="dataForm.email">
            <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password">
            <input type="submit" value="Je me connect" class="btn">
        </form>
        <h4>{{ errMsg }}</h4>
        <p>Je n'ai pas créé de compte ? Cliquez ici: <router-link to="/signup">Inscription</router-link></p>
    </section>
</template>

<script>
import store from '../store/index.js'
import Nav from '../components/Nav.vue'
import router from '../router'
export default {
    name: 'Login',
    components: {
        Nav
    },
    data() {
        return {
            dataForm: {
                email: null,
                password: null  
            },
            errMsg: null
        }
    },
    methods: {
        onSubmit() {
            /* assigne les valeurs du form à l'objet data */
            const data = {
                ...this.dataForm
            }      
            /* vérifie si tous les champs sont bien remplis */
            if (!data.email || !data.password) {
                this.errMsg = "Erreur dans le formulaire :! controller vos données"
                return
            }
            /* méthode POST pour l'envoi de body */
            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    const localData = res
                    store.state.isLogged = true // <- on envoi le booléan true afin d'ouvrir l'intercepteur de navigation
                    localData.json().then(data => {
                        /* on récupère dans localStorage les valeurs générés par le token */
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('userId', data.userId)
                        localStorage.setItem('isAdmin', data.isAdmin)
                    })
                    /* si la réponse est 200 alors on entre */
                    if (res.status === 200 ) {
                        router.push({ path: 'home' })
                    }  else {
                        this.errMsg = "Email ou mot de passe incorrect"
                    }             
                })                
                .catch(error => {console.error(error)})
        }
    }
}
</script>

<style scoped>
#loginForm {
    margin: 3rem;
    display: flex;
    height: 70vh;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}
h3 {
   background-color: #002b5c;
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    color: white;
    text-align: center;
    margin-bottom: 30px;
}
form {
    display: flex;
    flex-direction: column;
    width: 400px;
}
input {
    margin: 0.8rem;
    padding: 10px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 4px;
    outline: none;
}
input:hover {
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 18%);
}
.btn {
    color: white;
    background-color: #002b5c;
    margin: 2rem;
}
@media screen and (max-width: 992px) {
    form {
        width: 100%;
    }
}
</style>