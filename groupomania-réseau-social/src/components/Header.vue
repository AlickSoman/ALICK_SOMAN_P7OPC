<template>
    <header>
        <!--  si on ne se trouve pas sur la page 'home' (accueil) alors on peut y revenir via la flèche "retour" -->
        <div v-if="!home" id="back">
            <router-link to="/home" class="back"><i class="fas fa-arrow-left"></i>Forum</router-link>
        </div>      
        <div id="text">
            <h3>{{header}}</h3>  
        </div>             
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        header: String,
        home: Boolean
    }
}
</script>

<style scoped>
header {
    margin: 2rem;
    display: flex;
    justify-content: space-around;
}
.back {
    padding: 3px 10px 3px 10px;

    text-decoration: none;
    color: black;
}
#back:hover {
    border-radius: 20px;
    background-color: #e09f9a9d;
}
#text {
    text-align: center;
    background-color: #4075C5;
    width: 140px;
    border-radius: 5px;
}
h3{
       color: aliceblue; 
}
img {
    height: 2rem;
}
p {
    font-weight: bold;
}
i {
    margin-right: 0.5rem;
}
</style>