<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Envanter No:</label>
              <input type="text" class="form-control" placeholder="Envanter No">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Cihaz Tipi</label>
              <select class="form-control" @change="openDetail($event)">
                <option :value="null">Seçiniz</option>
                <option value="LAPTOP">LAPTOP</option>
                <option value="PRINTER">YAZICI</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Seri No</label>
              <input type="text" class="form-control" placeholder="Seri No">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Marka</label>
              <input type="text" class="form-control" placeholder="Marka">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Model</label>
              <input type="text" class="form-control" placeholder="Model">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Alt Model</label>
              <input type="text" class="form-control" placeholder="Alt Model">
            </div>
          </div>
        </div>
        <div class="row">

          <div class="col-4">
            <div class="form-group">
              <label>Birim </label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <label>Lokasyon</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Aksesuar</label>
              <input type="text" class="form-control" placeholder="Aksesuar">
            </div>
          </div>


        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Durum</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="KULLANICI" disabled>
                <div class="input-group-append">
                  <img class="cursor-pointer" src="@/assets/img/icons/plus-circle.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="col-4" v-if="showStateDate">
            <div class="form-group">
              <label>Durum Tarihi:</label>
              <span class="datepicker">
                    <input type="text" class="form-control" value="08.01.2020">
                  </span>
            </div>
          </div>
          <div class="col-4" v-if="showStateDate">
            <div class="form-group">
              <label>Personel Adı Soyadı:</label>

              <input type="text" class="form-control" value="MUHAMMED YÜCE">

            </div>
          </div>
        </div>

      </div>

    </div>

      <div class="accordion mt-4" role="tablist"  v-if="showLaptop||showPrinter">
        <b-card no-body>
          <b-card-header header-tag="header"  role="tab" class="mr-0" v-b-toggle.accordion-1>
            <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                      variant="null">
              Envanter Detayı
              <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
              <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
            </b-button>
          </b-card-header>
          <b-collapse visible id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
               <InventoryLaptop   v-if="showLaptop"/>
               <InventoryPrinter   v-if="showPrinter"/>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

  </div>
</template>

<script>



import InventoryLaptop from "@/components/inventories/InventoryLaptop";
import InventoryPrinter from "@/components/inventories/InventoryPrinter";

export default {
  name: "InventoryInfo",
  components: {InventoryLaptop,InventoryPrinter},
  data() {
    return {
      showStateDate: true,
      showLaptop: false,
      showPrinter: false,
    }
  },
  methods: {
    openDetail(event) {
      this.showLaptop=false;
      this.showPrinter=false;
      let value = event.target.value;
      if (value === 'LAPTOP') this.showLaptop = true;
      if (value === 'PRINTER') this.showPrinter = true;
    }
  }
}
</script>

