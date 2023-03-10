<template>
    <div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 font-weight-bold" id="exampleModalLabel">Create Transaksi</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="CreatePeminjaman">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Select your name :</label>
                                <select class="form-control" v-model="peminjaman.id_siswa">                                                   
                                    <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa" >{{ s.nama_siswa }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Select Books :</label>
                                <select class="form-control" v-model="peminjaman.id_buku">                                                   
                                    <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku" >{{ b.judul_buku }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-dark"> Borrow </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        <!-- Modal -->


        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary card-outline">
                                <div class="card-body">

                                    <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        Tambah
                                    </button>

                                    <!-- <a href="/tambahpinjam" class="btn btn-primary mb-2">Tambah</a> -->

                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Nama Siswa</th>
                                                <th>Tanggal Pinjam</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Tenggat</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="p in getpinjam" :key="p.id_peminjaman">
                                                <td>{{ p.id_peminjaman }}</td>
                                                <td>{{ p.nama_siswa }}</td>
                                                <td>{{ p.tgl_peminjaman }}</td>
                                                <td>{{ p.tgl_kembali }}</td>
                                                <td>
                                                    <span v-if="p.status == 'kembali'"
                                                        class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <!-- <button class="btn btn-success" @click="detail()">Detail</button>   -->
                                                        <router-link :to="{ path: '/detailpeminjaman/' + p.id_peminjaman }"
                                                            class="btn btn-primary"> Detail </router-link>
                                                        <span v-if="p.status == 'pinjam'"><button class="btn btn-warning"
                                                                @click="kembali(p)">Kembali</button></span>
                                                        <button type="button" @click="hapus(p)"
                                                            class="btn btn-danger">Hapus</button>
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

import navbar from '../components/template/NavigationBar.vue'
import sidebar from '../components/template/AppSidebar.vue'
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'
// import { Bootstrap4Pagination } from 'laravel-vue-pagination';
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import pagination from 'laravel-vue-pagination'


Vue.use(axios)

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
        // 'paginate-component' : pagination
    },
    data() {
        return {
            buku : {},
            siswa : {},
            peminjaman : {},
            getpinjam: {}
        }
    },  
    mounted() {
        this.DataSiswa()
        this.DataBuku()
        this.getpeminjaman()
        // this.GetDetail(this.$route.params.id)
    },
    methods : {
        DataSiswa() {
            axios.get('http://localhost:8000/api/tampilsiswa').then(
                ({data}) => {
                    this.siswa = data
                }
            )
        },
        DataBuku (){
            axios.get('http://localhost:8000/api/getbuku').then(
                ({data}) => {
                    this.buku = data
                }
            );
        },
        CreatePeminjaman : function() {
            axios.post('http://localhost:8000/api/createpeminjaman', this.peminjaman).then(
                ({data}) => {
                    swal("You Borrowed a Book!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Transaction')
                    this.peminjaman = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        getpeminjaman() {
            axios.get('http://localhost:8000/api/getpeminjaman')
                .then(
                    ({ data }) => {
                        this.getpinjam = data
                    }
                )
        },
        detail() {
            swal({
                title: ':(',
                text: 'Masih belum tersedia!!',
                icon: 'error',
                button: false,
                timer: 1000
            })
        },
        hapus(p) {
            swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa di balikin!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:8000/api/deletepeminjaman/' + p.id_peminjaman)
                    swal("Poof! data peminjaman sudah ke hapus!", {
                        icon: "success",
                        button: false
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                } else {
                    swal("Oke datanya gk jadi di hapus!", { icon: 'success' });

                }
            });
        },
        kembali(p) {
            swal({
                title: "Ingin mengembalikan buku?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.put('http://localhost:8000/api/pengembalian/' + p.id_peminjaman)
                        swal("Poof! Berhasil mengembalikan buku!", {
                            icon: "success",
                            button: false
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200);
                    } else {
                        swal("Kembali!", {
                            icon: 'success'
                        })

                    }
                });
        }
    }
}

</script>