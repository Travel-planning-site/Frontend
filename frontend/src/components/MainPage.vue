<template>
<div class="main">
    <b-container>
        <b-row id="header-page" cols="6">
            <b-col cols="4" md style="text-align: right">
                <b-button id= "login">Login</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="logoImage">
                <b-img id="image" src="https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg" fluid alt="Responsive image"></b-img>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="buttons">
                <b-button id="makeButton" style="font-size: 3rem" size="lg" variant="light" @click ="$router.push('BasicInfo')">Make a Travel Plan</b-button>
                <b-button style="font-size: 3rem" size="lg" variant="light" >My Plans</b-button>
            </b-col>
        </b-row>
        <b-row></b-row>
    </b-container>
</div>
</template>

<script>

export default{

}
</script>

<style scoped>

.main {
    margin-left: 10px;
}
.logoImage {
    text-align: center;
}
.buttons {
    text-align: center;
    padding: 30px;
}
#header-page {
    margin: 15px;
    margin-bottom: 20px;
}
#makeButton {
    margin-right: 10px;
}
#login {
    font-size: 40px;
}

#image {
    width: 1024px;
    height: 800px;
}

</style>
