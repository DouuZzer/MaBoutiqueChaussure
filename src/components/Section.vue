<template>
    <section class="content-section" v-bind:id="idSection">
        <h1>{{titleSection}}</h1>
        <p>{{contentSection}}</p>
    </section>
</template>

<script>
    export default {
        props: {
            idSection: String,
            titleSection: String,
            contentSection: String
        }
    }
</script>

<style scoped>
    section.content-section {
        height: 100vh;
        background-color:cornflowerblue;
        padding-top: 150px;
    }

    section.content-section:nth-child(even) {
        background-color: darkslategray;
    }

    section.content-section > h1 {
        color: white;
        font-size: 60px;
        margin: 0;
    }
</style>


