<script>
  import { mutation } from "@urql/svelte";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  const createClientMutation = mutation({
    query: `
      mutation MyMutationCreate(
          $firstName: String!, 
          $lastName: String!, 
          $telephone: String!, 
          $gender: String!, 
          $dob: Date!,
          $active: Boolean!
          ) {
            createClient(
                    input: {
                    client: {
                        firstName: $firstName
                        lastName: $lastName
                        telephone: $telephone
                        gender: $gender
                        dob: $dob,
                        active: $active
                    }
                    }
                ) {
                    client {
                    firstName
                    lastName
                    telephone
                    nodeId
                    clientId
                    active
                    }
            }
      }
    `,
  });

  const updateClientMutation = mutation({
    query: `
      mutation MyMutationUpdate(
          $id: Int!,
          $firstName: String, 
          $lastName: String, 
          $telephone: String, 
          $gender: String, 
          $dob: Date,
          $active: Boolean
          ) {
            updateClientByClientId(
                input: {
                clientPatch: {
                    active: $active
                    clientId: $id
                    dob: $dob
                    gender: $gender
                    firstName: $firstName
                    lastName: $lastName
                    telephone: $telephone
                }
                clientId: $id
                }
            ) {
                client {
                firstName
                lastName
                }
            }
      }
    `,
  });

  let clt = {
    firstName: "",
    lastName: "",
    telephone: "",
    dob: "",
    gender: "",
    active: true,
  };

  export let originalClient;

  const createNewClient = async () => {
    const responseCreate = await createClientMutation({
      ...clt,
      dob: new Date(clt.dob),
    });
    // console.log(responseCreate);
    if (responseUpdate.data) {
      goto("/");
    }
  };

  const updateClient = async () => {
    const responseUpdate = await updateClientMutation({
      ...clt,
      id: originalClient.clientId,
      dob: new Date(clt.dob),
    });
    // console.log(responseUpdate);
    if (responseUpdate.data) {
      goto("/");
    }
  };

  const handleClient = async () => {
    originalClient ? updateClient() : createNewClient();
  };

  onMount(() => {
    if (originalClient) {
      clt = Object.assign({}, originalClient);
    }
  });
</script>

<section>
    <form on:submit|preventDefault={handleClient}>
      <div class="grd">
          <label for="fistName"
            >First Name
        
            <input type="text" name="firstName" required bind:value={clt.firstName} />
          </label>
          <label for="lastName"
            >Last Name
        
            <input type="text" name="lastName" required bind:value={clt.lastName} />
          </label>
          <label for="telephone"
            >Telephone
        
            <input type="tel" name="telephone" required bind:value={clt.telephone} />
          </label>
          <label for="dob"
            >Date of Birth
        
            <input type="date" name="dob" required bind:value={clt.dob} />
          </label>
          <label for="gender"
            >Gender
        
            <select name="gender" required bind:value={clt.gender}>
              <option value="" disabled selected>-</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </label>
          <label for="active"
            >Active
        
            <input type="checkbox" bind:checked={clt.active} />
          </label>
      </div>
      <br />
      {#if originalClient}
        <button type="submit">Update client</button>
      {:else}
        <button type="submit">Add client</button>
      {/if}
    </form>
</section>

<style>
    .grd {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
