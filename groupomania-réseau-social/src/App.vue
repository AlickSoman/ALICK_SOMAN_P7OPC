<template>
	<div id="container">
		<router-view />
		<div id="me2022"></div>
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
#container {
	max-width: 80%;
	height: 100vh;
	margin: auto;
}
#me2022 {
	margin: auto;
	margin-top: 1rem;
	height: 20px;
	width: auto;
	text-align: center;
	vertical-align: center;
	background: #4075C5;
}
#me2022::after {
	content:'SOMAN ALICK P7 2022';
}
i{
    color: #4075C5;
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
}
</style>