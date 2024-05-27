<script>


export default {
    name: 'LoadingMessage',
    data() {
        return {

        }
    },
    mounted() {
        setTimeout(() => {
            this.$router.push('/apartments');
        }, 3500);
    }

}
</script>

<template>
    <div class="container py-5 d-flex align-items-center justify-content-center">

        <div class="alert my-bg " role="alert">
            <h4 class="alert-heading">Il tuo messaggio è stato inviato con successo</h4>
            <p>Il messaggio è stato inviato. L'host provvederà a rispondere entro 24 ore</p>
            <hr>
            <div class="d-flex align-items-center gap-3">

                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0">Verrai reindirizzato alla pagina di ricerca</p>

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>