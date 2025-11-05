<script>
    import FormLoginSign from "../../components/formLoginSign.svelte";
</script>
<div class="main">
    <h1 class="title oswald">AnimeBeats</h1>
    <FormLoginSign/>
</div>

<style>
    .main{
        padding: 2rem 3rem;
    }
    .title{
        text-align: center;
        margin-bottom: 20px;
    }
    @media(width< 800px){
        .main{
            padding: 1rem 1.5rem;
        }
    }
</style>