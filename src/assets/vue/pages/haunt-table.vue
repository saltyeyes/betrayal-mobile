<template id="page-haunt-table">
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link="Back"></f7-nav-left>
      <f7-nav-title>Haunt Checker</f7-nav-title>
    </f7-navbar>
    <div class="card">
      <form class="list">
        <ul>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Gender</div>
                <div class="item-input-wrap">
                  <select name="gender">
                    <option value="male" selected>Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
    <div class="card">

    </div>
  </f7-page>
</template>

<script>
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader } from 'framework7-vue';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'page-haunt-table',
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader
    },
    created: function() {
    },
    methods: {
      ...mapActions(['resetCharacter'])
    },
    computed: {
      ...mapGetters(['stats', 'characters'])
    },
  }
</script>
