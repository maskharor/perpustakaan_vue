import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../components/DashboardView.vue'
// IMPORT SISWA
import TampilSiswa from '../components/siswa/IndexSiswa.vue'
import TambahSiswa from '../components/siswa/TambahSiswa.vue'
import EditSiswa from '../components/siswa/EditSiswa.vue'
import DetailSiswa from '../components/siswa/DetailSiswa.vue'
// IMPORT BUKU
import TampilBuku from '../components/buku/IndexBuku.vue'
import TambahBuku from '../components/buku/TambahBuku.vue'
import EditBuku from '../components/buku/EditBuku.vue'
// IMPORT TRANSAKSI
import TransaksiPerpus from '../components/TransaksiView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/siswa',
    name: 'IndexSiswa',
    component: TampilSiswa
  },
  {
    path: '/tambahsiswa',
    name: 'TambahSiswa',
    component: TambahSiswa
  },
  {
    path: '/editsiswa/:id',
    name: 'EditSiswa',
    component: EditSiswa
  },
  {
    path: '/detailsiswa/:id',
    name: 'DetailSiswa',
    component: DetailSiswa
  },
  {
    path: '/buku',
    name: 'IndexSiswa',
    component: TampilBuku
  },
  {
    path: '/tambahbuku',
    name: 'TambahBuku',
    component: TambahBuku
  },
  {
    path: '/editBuku/:id',
    name: 'EditBuku',
    component: EditBuku
  },
  {
    path: '/Transaksi',
    name: 'TransaksiPerpus',
    component: TransaksiPerpus
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
