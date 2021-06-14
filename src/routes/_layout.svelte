<script>
  import {  createClient, setClient, fetchExchange } from "@urql/svelte";
  import Nav from "../components/Nav.svelte";
  const client = createClient({
    url: "http://localhost:3000/graphql",
    exchanges: [fetchExchange],
  });

  setClient(client);
</script>
<Nav />
<main>
	<slot></slot>
</main>