<script>
  export let clients = [];
</script>

<table>
  <tr>
    <th>Name</th>
    <th>Status</th>
    <th>Phone number</th>
    <th>Intakes</th>
    <th />
  </tr>
  {#each clients as client (client.clientId)}
    <tr>
      <td>{client?.firstName} {client?.lastName}</td>
      <td>{client?.active ? "ACTIVE" : "INACTIVE"}</td>
      <td><a href={`tel:${client?.telephone}`}>{client?.telephone}</a></td>
      <td>{client?.intakesByClientId?.totalCount}</td>
      <td><a href={`clients/${client.clientId}`}><button>More</button></a></td>
    </tr>
  {/each}
</table>

<style>
  table {
    margin: 0 auto;
  }
</style>
