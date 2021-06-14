<script>
  import { mutation } from "@urql/svelte";
  import { goto } from "@sapper/app";

  export let clientId;

  let intakeData = {
    wbc: "",
    rbc: "",
    hbg: "",
    hct: "",
    weight: "",
  };

  const createIntakeMutation = mutation({
    query: `
        mutation MyMutation($id: Int!, $wbc: BigFloat!, $rbc: BigFloat!, $hbg: BigFloat!, $hct: BigFloat!, $weight: BigFloat!) {
        createIntake(
            input: {intake: {clientId: $id, wbc: $wbc, rbc: $rbc, hbg: $hbg, hct: $hct, weight: $weight}}
        ) {
            intake {
              intakeId
            }
        }
        }`,
  });
  const createNewIntake = async () => {
    const responseCreate = await createIntakeMutation({
      id: parseInt(clientId),
      ...intakeData,
    });
    // console.log(responseCreate);
    if (responseCreate.data) {
      goto(`/clients/${clientId}`);
    }
  };
</script>

<section>
  <h1>New Intake</h1>
  <form on:submit|preventDefault={createNewIntake}>
    <label for="wbc"
      >White blood cells
      <input type="number" name="wbc" step="0.1" required bind:value={intakeData.wbc} />
    </label>
    <label for="rbc"
      >Red blood cells
      <input type="number" name="rbc" step="0.1" required bind:value={intakeData.rbc} />
    </label>
    <label for="hbg"
      >HBG
      <input type="number" name="hbg" step="0.1" required bind:value={intakeData.hbg} />
    </label>
    <label for="hct"
      >HCT
      <input
        type="number"
        name="hct"
        required
        step="0.1" 
        bind:value={intakeData.hct}
        min="0"
        max="100"
      />
    </label>
    <label for="weight"
      >Weight
      <input type="number" step="0.1"  name="weight" bind:value={intakeData.weight} />
    </label>
    <button type="submit">Send</button>
  </form>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
</style>
