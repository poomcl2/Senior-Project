<template>


    <AppHeader fixed>
      <img class="navbar-brand-full" src="img/brand/isl.png" width="100" height="40" alt="CoreUI Logo">

      <SidebarToggler class="d-lg-none" display="md" mobile />

      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />


      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>

        <DefaultHeaderDropdownAccnt/>

        <b-col sm="8">
        <b >     Poom Chawalit    </b>
        </b-col>
      </b-navbar-nav>

    </AppHeader>

</template>

<script>
import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultHeader',
  components: {
    AsideToggler,
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  }
}
</script>

<style>

b{
  color:rgb(252, 252, 252)
}


.app-header {
  height: 53px;
  background:#26292E

}


</style>