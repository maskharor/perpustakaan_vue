<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Buku</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-info card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="/tambahbuku">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Judul Buku</th>
                                            <th>Pengarang</th>
                                            <th>aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(buku , index) in buku" :key="buku.id_buku">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ buku.judul_buku }}</td>
                                                    <td>{{ buku.pengarang }}</td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <!-- <button class="btn btn-success" @click="showDetail(siswa)"> Detail </button> -->
                                                            <router-link :to="{path : '/detailbuku/' + buku.id_buku}" class="btn btn-success">Detail</router-link>
                                                            <router-link :to="{path : '/editbuku/' + buku.id_buku}" class="btn btn-primary">Edit</router-link>
                                                            <!-- <a href="" @click.prevent="ShowEdit" class="btn btn-primary">Edit</a> -->
                                                            <button type="button" class="btn btn-danger" @click="remove(buku)"> Hapus </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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

export default {
    data() {
            return{
                buku: {}
            }
        },
        created() {
            this.GetBuku();
        },
        methods: {
            GetBuku(){
                var page = "http://127.0.0.1:8000/api/getbuku";
                axios.get(page).then(
                    ({data})=>{
                        console.log(data);
                        this.buku = data;
                    }
                );
            },
            remove(buku){
             axios.delete('http://localhost:8000/api/deletebuku/'+buku.id_buku)
             .then(
                (response) => {
                    console.log(response)
                        alert("sukses delete buku")
                        setTimeout(() => {
                            location.reload()
                        }, 1200);
                }
                
             )
            }
        },
    }
    </script>