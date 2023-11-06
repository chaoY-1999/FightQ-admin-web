import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history, SelectLang} from 'umi';
import styles from './index.less';
import {register} from '@/services/ant-design-pro/api';


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    const {password, checkPassword} = values;
    if (password !== checkPassword) {
      message.error('两次输入密码不一致！');
      return;
    }
    try {
      // 注册
      // const msg = await register({ ...values, type });
      const id = await register({...values});
      if (id > 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        let {redirect} = query as { redirect: string };
        redirect = redirect ?? '/';
        history.push(`/user/login?redirect${redirect}`);
        return;
      } else {
        throw new Error(`register error id:${id}`);
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg"/>}
          title="FightQ 管理中心"
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          subTitle="管理员专属-管理信息平台"
          initialValues={{
            autoRegister: true
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab="账号密码注册"
            />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="accountNo"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '请输入账号'
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '账号至少4位'
                  }
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！'
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码至少8位'
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码！'
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码至少8位'
                  }
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />*/}
            {/*</ProFormCheckbox>*/}
            <a style={{float: 'right'}} href={'/user/login'}>返回登录</a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
