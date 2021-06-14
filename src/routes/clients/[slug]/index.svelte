<script>
  import ClientForm from "../../../components/ClientForm.svelte";

  import { stores } from "@sapper/app";
  const { page } = stores();

  import { operationStore, query } from "@urql/svelte";
  import { onMount } from "svelte";
  import IntakeTable from "../../../components/IntakeTable.svelte";

  const client = operationStore(
    `
    query MyQuery($id: Int!) {
        clientByClientId(clientId: $id) {
            firstName
            lastName
            dob
            gender
            telephone
            active
            clientId
            intakesByClientId {
                nodes {
                    intakeId
                    intakeTime
                    rbc
                }
            }
        }
    }
	`,
    { id: parseInt($page.params.slug) },
    { requestPolicy: "cache-first" }
  );

  query(client);

  const refresh = () => ($client.context = { requestPolicy: "network-only" });

  onMount(() => {
    refresh();
  });

  $: clientIntakes = $client.data?.clientByClientId.intakesByClientId?.nodes
</script>

<div class="rght">
    <a href={`/clients/${$page.params.slug}/intakes/newintake`}
    ><button>New Intake</button></a
    >
</div>
{#if $client.fetching}
  <h2>Loading...</h2>
{:else if $client.error}
  <h2>Oh no... {$client.error.message}</h2>
{:else}
  <div class="flx">
    <ClientForm originalClient={$client.data?.clientByClientId} />
    <IntakeTable {clientIntakes} clientId={$page.params.slug}/>
  </div>
{/if}


<style>
    .rght {
        text-align: right;
    }
</style>