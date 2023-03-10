<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Form Tambah Buku</h1>
                        </div>          
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <form @submit.prevent="save">
                                        <label for="judul" class="form-label">Judul buku :</label>
                                        <input type="text" class="form-control" v-model="buku.judul_buku" id="judul" autocomplete="off" placeholder="Masukkan judul buku..">

                                        <label for="pengarang" class="form-label">Pengarang :</label>
                                        <input type="text" class="form-control" v-model="buku.pengarang" id="pengarang" autocomplete="off" placeholder="Masukkan nama pengarang..">

                                        <br>
                                        <input type="submit" class="btn btn-primary">

                                    </form>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';

Vue.use(axios);

import NavigationBar from '../template/NavigationBar.vue'
import AppSidebar from '../template/AppSidebar.vue'

export default {
    components:{
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar,
    },
    data() {
        return {
            buku : {}
        }
    },
    methods : {    
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://127.0.0.1:8000/api/createbuku', this.buku)
            .then(
                ({data}) => {
                    alert("Berhasil Tambah buku");
                    this.$router.push('/buku');
                    this.buku = data;
                }
            )
        },
    }
}
</script>
