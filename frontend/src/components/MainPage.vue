<template>
    <div class="main">
        <b-container fluid="fluid">
            <b-row id="header-page" cols="6">
                <b-col cols="6" md="md" style="text-align: right">
                    <b-button id="login">Login</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="logoImage">
                    <b-img
                        id="image"
                        src="/static/image/main.png"
                        fluid="fluid"
                        alt="Responsive image"></b-img>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="buttons">
                    <b-button
                        id="makeButton"
                        style="font-size: 2.6rem"
                        variant="light"
                        @click="$router.push('BasicInfo')">Make a Travel Plan</b-button>
                    <b-button style="font-size: 2.6rem" variant="light" @click="$router.push('MyPlan')">My Plans</b-button>
                </b-col>
            </b-row>
            <b-row></b-row>
        </b-container>
    </div>
</template>

<script>

export default {}
</script>

<style scoped="scoped">
    @font-face {
        font-family: 'yg-jalnan';
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff") format('woff');
        font-weight: normal;
        font-style: normal;
    }

    .main {
        margin-left: 10px;
    }
    .logoImage {
        padding-top: 45px;
        text-align: center;
    }
    .buttons {
        text-align: center;
        padding: 30px;
        font-family: yg-jalnan;

    }
    #header-page {
        margin: 15px 15px 20px;
    }
    #makeButton {
        margin-right: 10px;
    }
    #login {
        font-size: 20px;
        font-family: yg-jalnan;
    }

    #image {
        width: 700px;
        height: 500px;
    }
</style>
