<script lang="ts">
    export let data;
    console.log(data);
</script>
<section>
    <img src={data.bannerImage} alt="" class="banner">

</section>
<style>
    .banner{
        width: 100%;
        height: 300px;
        object-fit: cover;
        
    }
</style>