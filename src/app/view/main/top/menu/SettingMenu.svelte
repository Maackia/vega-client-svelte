<script lang="ts">
  import { SessionService } from '../../../../model/session/SessionService';
  import type { ModalType } from '../../../../model/window/ModalType';
  import { WindowService } from '../../../../model/window/WindowService';
  import DefaultMenuItem from './DefaultSettingMenuItem.svelte';
  import SettingMenuImage from './SettingMenuImage.svelte';
  import SettingSwitch from './SettingSwitch.svelte';
  import UserSettingMenuItem from './UserSettingMenuItem.svelte';

  const logout = () => {
    SessionService.setPrivateKey('');
  };

  const openModal = (modal: ModalType) => {
    WindowService.openModal(modal);
  };
</script>

<div class="setting-list">
  <UserSettingMenuItem />
  <DefaultMenuItem
    menuClick={() => openModal('stream')}
    name="방송 설정"
    icon="fas fa-podcast"
  >
    <SettingMenuImage slot="extra" />
  </DefaultMenuItem>
  <DefaultMenuItem
    menuClick={() => openModal('site')}
    name="사이트 설정"
    icon="fas fa-tools"
  />
  <DefaultMenuItem
    menuClick={() => openModal('chat-widget')}
    name="채팅위젯 설정"
    icon="fas fa-comment"
  />
  <DefaultMenuItem
    menuClick={() => openModal('donation')}
    name="후원 설정"
    icon="fas fa-donate"
  />
  <DefaultMenuItem name="테마" icon="fas fa-adjust">
    <SettingSwitch slot="extra" />
  </DefaultMenuItem>
  <DefaultMenuItem name="모바일 모드" icon="fas fa-mobile" />
  <DefaultMenuItem name="후원리스트" icon="fas fa-clipboard-list" />
  <div class="logout" on:click={logout}>
    <h4>로그아웃</h4>
  </div>
</div>

<style lang="scss">
  .setting-list {
    width: 100%;
    height: 100%;
    position: relative;

    border-radius: 0 0 5px 5px;
    background: #2a2f38;
  }

  // 로그아웃 부분
  .logout {
    min-height: 45px;
    color: #ffffff;
    background-color: #ff4081;
    text-align: center;
    border-radius: 0px 0px 3px 3px;

    h4 {
      font-size: 18px;
      padding: 14px;
      font-weight: bolder;
    }
  }
</style>
