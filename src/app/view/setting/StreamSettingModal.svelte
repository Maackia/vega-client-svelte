<script lang="ts">
  import InlineSVG from 'svelte-inline-svg';
  import { get } from 'svelte/store';
  import { ProfileService } from '../../service/ProfileService';
  import SettingModal from './SettingModal.svelte';
  import ExternalStreamSettingForm from './stream/ExternalStreamSettingForm.svelte';
  import LocalStreamSettingForm from './stream/LocalStreamSettingForm.svelte';

  const platforms = [
    {
      id: 'local',
      icon: 'mycast',
      title: '로컬서버',
    },
    {
      id: 'totoro',
      icon: 'totoro',
      title: '이웃서버',
    },
    {
      id: 'twitch',
      icon: 'twitch',
      title: '트위치',
    },
    {
      id: 'afreeca',
      icon: 'afreecatv',
      title: '아프리카TV',
    },
  ];
  let currentPlatformId = 'local';
  let localId = get(ProfileService.localId);
  let afreecaId = get(ProfileService.afreecaId);
  let twitchId = get(ProfileService.twitchId);

  ProfileService.platform.subscribe((v) => (currentPlatformId = v));
  ProfileService.localId.subscribe((v) => (localId = v));
  ProfileService.afreecaId.subscribe((v) => (afreecaId = v));
  ProfileService.twitchId.subscribe((v) => (twitchId = v));
</script>

<SettingModal title="방송 설정" icon="fas fa-podcast">
  <div slot="body" class="stream-setup">
    <div class="stream-btn">
      {#each platforms as p}
        <button
          name="stream-live-select"
          class="live-select"
          class:active={p.id === currentPlatformId}
          on:click={(_) => (currentPlatformId = p.id)}
        >
          <!-- SVG 변경 필수 -->
          <div class="icon">
            <InlineSVG src="/assets/image/stream/{p.icon}.svg" />
          </div>
          <h3>{p.title}</h3>
        </button>
      {/each}
    </div>

    <div class="stream-form">
      {#if currentPlatformId === 'local'}
        <LocalStreamSettingForm
          streamLink="rtmp://mycast.xyz/live"
          streamKey={localId}
        />
      {:else if currentPlatformId === 'totoro'}
        <LocalStreamSettingForm
          streamLink="rtmp://totoro.mycast.xyz/live"
          streamKey={localId}
        />
      {:else if currentPlatformId === 'afreeca'}
        <ExternalStreamSettingForm streamKey={afreecaId} />
      {:else if currentPlatformId === 'twitch'}
        <ExternalStreamSettingForm streamKey={twitchId} />
      {:else}
        <div />
      {/if}
      <button class="stream-sub">
        <h2>방송 설정 저장</h2>
      </button>
    </div>
  </div>
</SettingModal>

<style lang="scss">
  .stream-setup {
    height: 778px;
    position: relative;

    .stream-btn {
      width: 100%;
      height: 140px;
      display: flex;
      border-bottom: 1px solid #1f2226;
      margin-bottom: 15px;

      .live-select {
        width: 25%;
        height: 140px;
        padding: 10px 10px 10px 10px;

        text-align: center;
        border: 0px;
        border-radius: 0px;

        background-color: #2a2f38;
        color: #fff;

        &:hover {
          background-color: #1f2226;
        }
        &.active {
          background-color: #ff4081;
        }

        .icon {
          width: 60px;
          height: 60px;
          margin: 12px 22px;
          margin-bottom: 15px;
          fill: #ffffff;
        }
        h3 {
          font-size: 18px;
          letter-spacing: 1px;
        }
      }
    }
    .stream-form {
      width: calc(100% - 30px);
      height: calc(100% - 156px);
      padding: 0px 15px;
    }
    .stream-sub {
      width: 100%;
      height: auto;
      margin: 0px -15px;
      border: 0px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      padding: 20px 15px;
      background-color: #ff4081;
      color: #ffffff;

      position: absolute;
      bottom: 0px;
    }
  }
  // 모바일 처리
  @media (min-width: 320px) and (max-width: 500px) {
    .stream-setup {
      height: auto;
      .stream-btn {
        height: 107px;
        .live-select {
          height: 107px;
          .icon {
            width: calc(100% - 24px);
            height: auto;
            margin: 0px 12px;
            margin-bottom: 5px;
          }
          h3 {
            font-size: 14px;
            letter-spacing: 1px;
          }
        }
      }
      .stream-sub {
        position: fixed;
      }
    }
  }
</style>
