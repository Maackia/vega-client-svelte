<script lang="ts">
  import type { StreamInfo } from '../../model/stream/StreamInfo';
  import { StreamService } from '../../model/stream/StreamService';
  import StreamEntry from './StreamEntry.svelte';

  let entries: StreamInfo[] = [];

  StreamService.locals.subscribe((v) => (entries = v));
</script>

<div class="stream-list">
  {#each entries as b}
    <StreamEntry
      description={b.description}
      icon={b.icon}
      thumbnail={b.thumbnail}
      title={b.title}
      viewer={b.viewer?.toString()}
    />
  {/each}
</div>

<style lang="scss">
  .stream-list {
    position: absolute;
    bottom: 5px;
    left: 5px;
    height: auto;
    width: auto;
    margin-left: -2px;

    background: #2a2f38;
    border: 1px solid #1f2226;

    box-shadow: 2px 0px 5px 1px rgb(0 0 0 / 40%),
      1px 0px 5px 0px rgb(0 0 0 / 30%), 1px 0px 5px 0px rgb(0 0 0 / 30%);
  }
</style>
