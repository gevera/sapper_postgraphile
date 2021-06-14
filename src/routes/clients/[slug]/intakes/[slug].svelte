<script>
  import { stores } from "@sapper/app";
  const { page } = stores();

  import { operationStore, query } from "@urql/svelte";

  import { onMount } from "svelte";
  onMount(() => {
    refresh();
  });

  const intake = operationStore(
    `
  query MyQuery {
      intakeByIntakeId(intakeId: 1) {
          rbc
          wbc
          weight
          intakeTime
          hct
          hbg
        }
    }
    `,
    {
      id: parseInt($page.params.slug),
    },
    { requestPolicy: "cache-first" }
  );
  query(intake);
  const refresh = () => ($intake.context = { requestPolicy: "network-only" });

</script>

<section>
  <h1>Intake details</h1>
  <br>
  {#if $intake.fetching}
    <h2>Loading...</h2>
  {:else if $intake.error}
    <h2>Oh no... {$intake.error.message}</h2>
  {:else}
    <table>
      <tr>
        <th>Time</th>
        <th>Red blood cells</th>
        <th>White blood cells</th>
        <th>Wheight</th>
        <th>HBG</th>
        <th>HCT</th>
      </tr>

      <tr>
        <td
          >{new Date(
            $intake?.data?.intakeByIntakeId?.intakeTime
          ).toLocaleDateString()}
        </td>
        <td>{$intake?.data?.intakeByIntakeId?.rbc}</td>
        <td>{$intake?.data?.intakeByIntakeId?.wbc}</td>
        <td>{$intake?.data?.intakeByIntakeId?.weight}</td>
        <td>{$intake?.data?.intakeByIntakeId?.hbg}</td>
        <td>{$intake?.data?.intakeByIntakeId?.hct}</td>
      </tr>
    </table>
  {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
</style>
