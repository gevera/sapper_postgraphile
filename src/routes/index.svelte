<script>
  import {
    operationStore,
    query,
  } from "@urql/svelte";

  import ClientsTable from "../components/ClientsTable.svelte";

  const clients = operationStore(
    `
    query MyQuery {
      allClients {
        nodes {
          clientId
          firstName
          lastName
          active
          telephone
          intakesByClientId {
            totalCount
          }
        }
      }
    }
	`,
    { requestPolicy: "cache-first" }
  );

  query(clients);

  const refresh = () => ($clients.context = { requestPolicy: "network-only" });
</script>

<svelte:head>
  <title>Postgraphile Clients</title>
</svelte:head>
<section>
  <header>
    <h1>Client List</h1>
    <button on:click={refresh}>refresh</button>
  </header>

  {#if $clients.fetching}
    <h2>Loading...</h2>
  {:else if $clients.error}
    <h2>Oh no... {$clients.error.message}</h2>
  {:else}
    <ClientsTable clients={$clients?.data?.allClients?.nodes} />
  {/if}
</section>