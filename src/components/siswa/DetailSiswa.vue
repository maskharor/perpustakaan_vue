<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Detail</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="m-0">Detail Anggota</h4>
                                </div>
                                <div class="card-body text-justify">
                                    <h5 class="mb-3">{{siswa.nama_siswa}}</h5>

                                    <h6>Tanggal Lahir</h6>
                                    <p class="card-text">{{siswa.tgl_lahir}}</p>

                                    <h6>Jenis Kelamin</h6>
                                    <p class="card-text">{{siswa.jk}}</p>

                                    <h6>Alamat</h6>
                                    <p class="card-text">{{siswa.alamat}}</p>

                                    <h6>Kelas</h6>
                                    <p class="card-text">{{siswa.nama_kelas}}</p>

                                    <router-link class="btn btn-primary" to="/siswa">Kembali</router-link>
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

import NavigationBar from '../template/NavigationBar.vue'
import AppSidebar from '../template/AppSidebar.vue'

export default {
    components:{
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar,
    },
   data : function (){
        return{
                siswa: [],
                    id_siswa: "",
                    id_kelas: "",
                    nama_siswa: "",
                    tanggal_lahir: "",
                    gender: "",
                    alamat: "",
                kelas: {},
        }
   },
   mounted(){
    this.GetSiswa(),
    this.getdetail(this.$route.params.id),
    this.DataKelas()
   },
   methods: {
        GetSiswa (){
            axios.get('http://127.0.0.1:8000/api/getsiswa')
            .then(
                ({data}) => {
                    this.siswa = data
                }
            );
        },
        DataKelas(){
            axios.get('http://127.0.0.1:8000/api/getkelas')
            .then(
            ({data}) => {
                this.kelas = data
            }
        );
        },
        getdetail(id_siswa){
            axios.get('http://127.0.0.1:8000/api/getsiswa/' + id_siswa)
            .then((response) => {
                console.log(response.data[0])
                this.id_siswa = response.data[0].id_siswa
                this.id_kelas = response.data[0].id_kelas
                this.nama_siswa = response.data[0].nama_siswa
                this.tanggal_lahir = response.data[0].tanggal_lahir
                this.gender = response.data[0].gender
                this.alamat = response.data[0].alamat
            })
        },
    }    
}
   

</script>

