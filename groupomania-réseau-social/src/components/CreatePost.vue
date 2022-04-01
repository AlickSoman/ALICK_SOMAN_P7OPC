<template>
    <div id="createPost">
        <form @submit.prevent="createPost">
            <div id="text1">
                <input class="title" name="input" placeholder="Titre" v-model="title">
            </div>
            <div id="text">
                <textarea name="textarea" placeholder="Publiez votre message" v-model="text"></textarea>
            </div>
            <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
            </div>         
            <div id="btns">                
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                <input type="submit" value="J'envoie !" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CreatePost',
    data() {
        return {
            title: null,
            text: null,
            file: '',
            preview: null,
            errMsg: null
        }
    },
    methods: {
        selectFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        createPost() {
            /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
            if (!this.title) {
                this.errMsg = "Error => Vous devez remplir le champ titre et commentaire!"
                return
            }
            /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('text', this.text)
            formData.append('file', this.file)
            formData.append('userId', localStorage.getItem('userId'))
            /* envoi du form via axios.put de l'objet formData */
            axios.post('http://localhost:3000/api/posts/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(res => this.$emit('add-Post', res.data))
                .catch(error => console.log(error))
            /* on emet le toggle-Create pour cacher ce composant tout en effaçant les inputs */
            this.$emit('toggle-Create')
            this.title= ''
            this.text = ''
            this.file = ''
            this.preview = ''
            document.querySelector('form').reset()           
        }
    }
}
</script>

<style scoped>
#createPost {
    max-width: 50%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
}
form {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.title {
    margin-bottom: 1rem;
    padding: 0.4rem 0 0.5rem 1rem !important;
     height: 1rem;
    width: calc(100% - 1rem)
}
textarea {
    height: 5rem;
    padding: 1rem 0 0 1rem;
    width: calc(100% - 1rem)
}
#preview {
    overflow: hidden;
    max-width: 20%;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid hsla(0, 0%, 0%, 0.5);
    padding-top: 2rem;
}
.btn {
    background-color: #002b5c;
    border-style: none;
    outline: none;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 8px;
    color: white;
}
.btn:hover{
    background-color: #086b42; 
    box-shadow: #086b4271;

}
.upload:active {
  transform: scale(0.98);
}
p {
    margin-top: 1.6rem;
}
@media screen and (max-width: 992px) {
    #createPost {
        max-width: 90%;
    }
    #btns {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
 
    padding-top: 2rem;
}
}
</style>