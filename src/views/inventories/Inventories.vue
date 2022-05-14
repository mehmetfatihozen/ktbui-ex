<template>
  <div class="pools standart-page">
    <h3 class="title">ENVANTER LİSTESİ</h3>
    <div class="card-component mb-4">
      <div class="body">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label>Envanter No</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label>Cihaz Tipi</label>
                  <select class="form-control">
                    <option :value="null">Seçiniz</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label>Seri No</label>
                  <input type="text" class="form-control">
                </div>
              </div>

              <div class="col-6">
                <div class="form-group">
                  <label>Marka</label>
                  <select class="form-control">
                    <option :value="null">Seçiniz</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Şirket</label>
                  <select class="form-control">
                    <option :value="null">Seçiniz</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Lokasyon</label>
                  <select class="form-control">
                    <option :value="null">Seçiniz</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Demirbaş Durumu</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>

            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label>Fatura No</label>
              <input type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Satın Alma Tarihi</label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Sigorta Durumu</label>
                      <select class="form-control">
                        <option :value="null">Seçiniz</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Personel Adı Soyadı</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="footer d-flex justify-content-end">

        <button class="btn btn-outline-secondary">Temizle</button>
        <button class="btn btn-secondary" @click="list">Listele</button>
      </div>
    </div>
    <div v-if="showList">

      <table class="table table-hover mt-3 mb-3">
        <thead>
        <tr>
          <th class="text-nowrap">Envanter No</th>
          <th class="text-nowrap">Cihaz Tipi</th>
          <th class="text-nowrap">Personel</th>
          <th class="text-nowrap">Marka</th>
          <th class="text-nowrap">Seri No</th>
          <th class="text-nowrap">Lokasyon</th>
          <th class="text-nowrap">Sigorta Durumu</th>
          <th class="text-nowrap">Fat. No</th>
          <th class="text-nowrap">Satınalma T.</th>
          <th class="text-nowrap">D. Durum</th>
        </tr>
        </thead>
        <tbody>
        <tr class="cursor-pointer" @click="$router.push('/inventory-management/inventories/detail/1')">
          <td class="text-nowrap">1</td>
          <td class="text-nowrap">Laptop</td>
          <td class="text-nowrap">Muhammed YÜCE</td>
          <td class="text-nowrap">HP</td>
          <td class="text-nowrap">3CG7090XXV</td>
          <td class="text-nowrap">FULYA</td>
          <td class="text-nowrap">Sigorta Yok</td>

          <td class="text-nowrap">

          </td>
          <td class="text-nowrap">

          </td>
          <td class="text-nowrap">
            KULLANICI
          </td>
        </tr>

        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <i class="text-secondary">112 kayıttan 1 - 15 arası gösterilmektedir</i>
        </div>
        <div class="col">
          <div class="row">
            <div class="col d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-2">
              <select class="form-control">
                <option value="">10</option>
                <option value="" selected>25</option>
                <option value="">50</option>
                <option value="">100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mixin as clickaway} from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      activeListType: 0,
      showFilterDetail: false,
      showList: false
    };
  },
  components: {},
  methods: {
    changeActiveListType(id) {
      this.activeListType = id;
    },
    list() {
      this.showList = true;
      this.$store.state.inventory.showNewInventory=true;
    }
  },
  mounted() {
    this.$store.state.inventory.showNewInventory=false;
  }
};
</script>