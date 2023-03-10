<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Anggota</h1>
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
                                    <router-link class="btn btn-info mb-2" to="/tambahsiswa">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Nama Lengkap</th>
                                            <th>tgl lahir</th>
                                            <th>gender</th>
                                            <th>Kelas</th>
                                            <th>alamat</th>
                                            <th>aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(siswa , index) in siswa" :key="siswa.id_siswa">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ siswa.nama_siswa }}</td>
                                                    <td>{{ siswa.tanggal_lahir }}</td>
                                                    <td>{{ siswa.gender }}</td>
                                                    <td>{{ siswa.nama_kelas }}</td>
                                                    <td>{{ siswa.alamat }}</td>
                                                    <td>
                                                        <div class="btn-group">

                                                            <!-- <button class="btn btn-success" @click="showDetail(siswa)"> Detail </button> -->
                                                            <router-link :to="{path : '/detailsiswa/' + siswa.id_siswa}" class="btn btn-success">Detail</router-link>
                                                            <router-link :to="{path : '/editsiswa/' + siswa.id_siswa}" class="btn btn-primary">Edit</router-link>
                                                            <!-- <a href="" @click.prevent="ShowEdit" class="btn btn-primary">Edit</a> -->
                                                            <button type="button" class="btn btn-danger" @click="remove(siswa)"> Hapus </button>
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
                siswa: {}
            }
        },
        created() {
            this.GetSiswa();
        },
        methods: {
            GetSiswa(){
                var page = "http://127.0.0.1:8000/api/tampilsiswa";
                axios.get(page).then(
                    ({data})=>{
                        console.log(data);
                        this.siswa = data;
                    }
                );
            },
            remove(siswa){
             axios.delete('http://localhost:8000/api/deletesiswa/'+siswa.id_siswa)
             .then(
                (response) => {
                    console.log(response)
                        alert("sukses delete siswa")
                }
             )
            }
        },
    }
    </script>