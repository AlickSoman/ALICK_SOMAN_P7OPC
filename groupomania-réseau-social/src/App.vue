<template>
	<div id="container">
		<router-view />
		<div id="me2022">
			<div>
				<span> Groupomania - © 2022</span>
				<span>Contact l'Admin</span>
				<span>Par CONNECT-E </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
* {

	font-family: "Roboto", sans-serif;
	font-size: 1.06rem;
	margin: 0;
	padding: 0;
}

.CenterContent{
	display: flex;
	flex-direction: column;
}

#container {

	max-width: 80%;
	height: 100vh;
	margin: auto;
}
#me2022 {
	margin: auto;
	margin-top: 1rem;
	padding-top: 30px;
	display: flex;
	flex-direction: row;
	width: auto;
	justify-content: center;
	text-align: center;
	background: #D0505A;
}
#me2022 div{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
#me2022 div span{
	display: flex;
	flex-direction: row;
	margin: 3%;
	color:white;
	text-align: center;
	justify-content: space-between;
}

#me2022 div span:hover{
	color:rgba(255, 255, 255, 0.815);
	text-decoration: underline;
	cursor: pointer;
}

button {
	cursor: pointer;
	}
button:active {
	transform: scale(0.98);
	}
@media screen and (max-width: 992px) {
  * {
		font-size: 1em;
	}
	#container {
		max-width: 100%;
	}

	#me2022 div{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
}
</style>