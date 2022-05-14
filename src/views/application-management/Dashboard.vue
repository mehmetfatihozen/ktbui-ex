<template>
  <div class="dashboard">
    <div class="left">
      <div class="row">
        <div class="col-7">
          Merhaba,
          <b>Aslı. Bugün 16 Haziran 2020</b>
          <div class="card-component mt-3"></div>
        </div>
        <div class="col-5">
          Bugün
          <b>En Yoğun</b>
          <div class="card-component mt-3">
            <ul class="dense-list">
              <li>
                <div class="row">
                  <div class="col">İnternet Bağlantı</div>
                  <div class="col-sm-auto">
                    <span>13,123</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">Şifre Parola</div>
                  <div class="col-sm-auto">
                    <span>10,123</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">Cihaz Sorunu</div>
                  <div class="col-sm-auto">
                    <span>9,231</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">Cihaz Talebi</div>
                  <div class="col-sm-auto">
                    <span>5,523</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col">Kullanıcı Adı Hatırlatma</div>
                  <div class="col-sm-auto">
                    <span>5,312</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <div class="card-component"></div>
        </div>
        <div class="col-6">
          <div class="card-component"></div>
        </div>
      </div>
      <div class="my-tasks">
        <label class="title">
          Benim
          <b>İşlerim</b>
        </label>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <font-awesome-icon icon="circle" class="circle"></font-awesome-icon>
            </td>
            <td>Tolgahan Özgür</td>
            <td>
              İnternet Bağlantı Sorunu -
              <span class="sub-title">
                  İnternet bağlantısı ile ilgili sorun yaşıyorum.
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                </span>
            </td>
            <td>14:53</td>
          </tr>
          <tr>
            <td>
              <font-awesome-icon icon="circle" class="circle"></font-awesome-icon>
            </td>
            <td>Tolgahan Özgür</td>
            <td>
              İnternet Bağlantı Sorunu -
              <span class="sub-title">
                  İnternet bağlantısı ile ilgili sorun yaşıyorum.
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                </span>
            </td>
            <td>14:53</td>
          </tr>
          <tr>
            <td>
              <font-awesome-icon icon="circle" class="circle"></font-awesome-icon>
            </td>
            <td>Tolgahan Özgür</td>
            <td>
              İnternet Bağlantı Sorunu -
              <span class="sub-title">
                  İnternet bağlantısı ile ilgili sorun yaşıyorum.
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                </span>
            </td>
            <td>14:53</td>
          </tr>
          <tr>
            <td>
              <font-awesome-icon icon="circle" class="circle"></font-awesome-icon>
            </td>
            <td>Tolgahan Özgür</td>
            <td>
              İnternet Bağlantı Sorunu -
              <span class="sub-title">
                  İnternet bağlantısı ile ilgili sorun yaşıyorum.
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                </span>
            </td>
            <td>14:53</td>
          </tr>
          <tr>
            <td>
              <font-awesome-icon icon="circle" class="circle"></font-awesome-icon>
            </td>
            <td>Tolgahan Özgür</td>
            <td>
              İnternet Bağlantı Sorunu -
              <span class="sub-title">
                  İnternet bağlantısı ile ilgili sorun yaşıyorum.
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                </span>
            </td>
            <td>14:53</td>
          </tr>
          </tbody>
        </table>
        <div class="see-all text-center">
          <router-link to="/tasks">Tümünü Gör</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('general/changeMenu', 'ApplicationMenu');
  }
}
</script>