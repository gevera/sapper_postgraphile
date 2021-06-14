<script>
//   import { stores } from "@sapper/app";
//   const { page } = stores();
//   let showAddIntake = false;
//   $: console.log($page);
//   $: if ($page.path.includes("clients") && $page.params.slug) {
//     showAddIntake = true;
//   } else {
//     showAddIntake = false;
//   }
</script>

<nav>
  <ul>
    <li>
      <a href="/">Clients</a>
    </li>
    <li>
      <a href="/clients/newclient">Add a client</a>
    </li>
    <li>
      <a href="graphiql">Postgraphile</a>
    </li>
  </ul>
</nav>
