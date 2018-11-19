<template>
    <div class="item-shoes">
        <p>{{marque}}<span> {{modele}} </span>{{prix}}</p>
        <img :src="img" alt="">
    </div>
</template>

<script>
export default {
    props: {
        marque : String,
        modele: String,
        prix: String,
        img: String
    }
}
</script>


