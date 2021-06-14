<script>
  export let clientIntakes = [];
  export let clientId;
</script>

<section>
  <h1>Intake table</h1>
  <table>
    <tr>
      <th>Time</th>
      <th>Red blood cells</th>
      <th />
    </tr>
    {#each clientIntakes as intake (intake.intakeId)}
      <tr>
        <td>{new Date(intake?.intakeTime).toLocaleDateString()} </td>
        <td>{intake?.rbc }</td>
        <td><a href={`clients/${clientId}/intakes/${intake?.intakeId}`}><button>More</button></a></td>
      </tr>
    {/each}
  </table>

  
</section>


<style>
    section {
        display: flex;
        flex-direction: column;
    }
</style>