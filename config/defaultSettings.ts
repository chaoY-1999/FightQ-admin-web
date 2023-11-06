import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'FightQ',
  pwa: false,
  logo: 'https://github.com/chaoY-1999/FightQ-admin-web/blob/eada5caaff18a23f7022ae5b6098aa11211e4453/public/logo.svg',
  iconfontUrl: '',
};

export default Settings;
