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
    text-decoration: none;
    color: rgb(255, 255, 255);
    text-align: center;
}
#back {
    text-decoration: none;
    color: rgb(255, 255, 255);
    text-align: center;
    background-color: #002b5c;
    padding: 10px 10px;
    border-radius: 5px;
}
#back:hover {
 text-decoration: underline ;
 color:#aa3131;
 }
#text {
    text-align: center;
    background-color: #002b5cb6;
    width: 140px;
    padding: 10px 10px;
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
i{
    color: #ffffff;
}
</style>