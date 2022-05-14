<template>
  <div id="app">
    <Popup v-if="$store.state.general.showPopup"/>
    <b-overlay :show="$store.state.general.showOverlay" rounded="sm" class="d-flex flex-fill w-100">
      <component :is="layout">
        <router-view/>
      </component>
    </b-overlay>
  </div>
</template>

<script>
import UserService from './services/user.service';
import layout from "./layouts/Default";
import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import Popup from "@/components/Popup";
import {AbilityBuilder} from "@casl/ability";
import axios from 'axios';
import {mapActions} from "vuex";

export default {
  data() {
    return {
      connection: null,
      connectionId: null
    }
  },
  components: {
    Popup,
    layout
  },
  methods: {
    ...mapActions('general', ['getSystemMessages']),
    checkUnauthorized() {
      axios.interceptors.response.use((response) => {
        if (response.data.hasError && response.data.errorCode === "402") {
          this.$store.dispatch('auth/logout');
        } else {
          return response;
        }
      });
    },
    updateSokcetId(connectionId) {
      if (this.$store.state.auth.user) {
        UserService.updateSocketId(connectionId);
      }
    },
    socketProcess() {
      this.connection = new HubConnectionBuilder()
          .withUrl(`${process.env.VUE_APP_USER_API_URL}HititApiSignalRHub`, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
          })
          .configureLogging(LogLevel.Information)
          .build();
      this.connection.start().then(() => {
        this.connection.invoke('getConnectionId').then((connectionId) => {
          this.connectionId = connectionId;
          this.updateSokcetId(connectionId);
        });
        this.connection.on('PersonelSistemdenAt', () => {
          this.$store.dispatch('auth/logout');
        });
      }).catch(function (err) {
        return console.error(err);
      });
    },
    updateRules(items) {
      const {can, rules} = new AbilityBuilder();
      items.forEach(item => {
        if (item.uiUrl) {
          if (item.okuma)
            can('read', item.uiUrl);
          if (item.yazma)
            can('create', item.uiUrl);
          if (item.silme)
            can('delete', item.uiUrl);
        }
      })
      this.$ability.update(rules);
    },
    setDefaults() {
      if (localStorage.getItem('messages')) {
        this.$store.state.general.systemMessages = JSON.parse(localStorage.getItem('messages'));
      }
      if (localStorage.getItem('user')) {
        this.$store.state.auth.user = JSON.parse(localStorage.getItem('user'))
      }
      if (localStorage.getItem('menu')) {
        this.$store.state.general.menu = JSON.parse(localStorage.getItem('menu'))
      }
      if (localStorage.getItem('permissions')) {
        this.updateRules(JSON.parse(localStorage.getItem('permissions')))
      }
      if (localStorage.getItem('activeMenu')) {
        this.$store.dispatch('general/changeMenu', localStorage.getItem('activeMenu'))
      }
    }
  },
  created() {
    this.checkUnauthorized();
    this.socketProcess();
    this.setDefaults();
  },
  mounted() {
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'default-layout');
    }
  },
  watch: {
    '$store.state.auth.user.token'(nw) {
      if (nw) {
        this.getSystemMessages().then(res => {
          localStorage.setItem('messages', JSON.stringify(res.data));
        });
        this.updateSokcetId(this.connectionId);
      }
    },
    $route(to) {
      this.$store.dispatch('hr/resetState');
      this.$store.dispatch('application/resetState');
      this.$store.dispatch('supplierManagement/resetState');
      this.$store.dispatch('inventory/resetState');
      this.$store.dispatch('sp/resetState');
      document.title = to.meta.title || "KTB";
    }
  }
};
</script>
