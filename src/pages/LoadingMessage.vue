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

<div class="container d-flex justify-content-center py-5" >

    <div class="alert border-1 border-black my-bg-opacity " role="alert">
        <div class="p-4">

            <div class="circle d-flex justify-content-center align-content-center mb-2">
                <i class="fa-solid fa-check check"></i>
            </div>
            <div class="down">

                <h4 class="alert-heading">Congratulazioni! <br>Il tuo messaggio è stato inviato con successo.</h4>
    
                <p>L'host prenderà in considerazione la sua richiesta e si proccuperà di rispondere entro 24 ore.</p>
                <div class="d-flex align-content-center gap-4">
                    
                    <div class="spinner-border" role="status">
    
                        <span class="visually-hidden"></span>

                    </div>

                    <p class="mb-0">Verrai reindirizzato alla pagina di ricerca</p>

                </div>
            
            </div>

  
  
        </div>
    
    </div>
</div>

</template>

<style lang="scss" scoped>
.my-bg-opacity{
    background-color: rgb(255, 255, 255);
    
   }
 .circle{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #ff385c40;
      position: relative;
    }
  .check{
    height: 80px;
    color: #ff385c;
  }
    
    

</style>