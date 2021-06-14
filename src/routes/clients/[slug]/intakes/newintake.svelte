<script>
  import IntakeForm from "../../../../components/IntakeForm.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<IntakeForm clientId={$page.params?.slug}/>
