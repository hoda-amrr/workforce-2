import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { RootState } from '../../../store/state.types.ts';
import { showHideLoader } from '../../../store/loader/loaderSlice.ts';
import { InfoCircleIcon } from '../../../utils/icons/InfoCircleIcon.tsx';
import messages from '../../../assets/locale/messages.ts';
import Input from '../../../components/Input/index.tsx';
import Checkbox from '../../../components/Checkbox/index.tsx';
import Button from '../../../components/Button/index.tsx';
import { LoginFormInterface, FormInputs } from './login.types.ts';
import { ROUTE_PATHS } from '../../../utils/RoutePaths.ts';
import useLogin from './useLogin.ts';
import { Snackbar } from '@mui/material';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const {
    login: { welcome, signMsg, labels, placeholders },
  } = messages[lang];
  const { loginMutation } = useLogin();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('wrongFormat')
      .matches(/\.[a-zA-Z]+$/, 'wrongFormat')
      .required('emailRequired'),
    password: yup.string().required('passwordRequired'),
    rememberMe: yup.boolean().default(false).required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
    resolver: yupResolver<LoginFormInterface>(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    dispatch(showHideLoader(true));
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    } finally {
      dispatch(showHideLoader(false));
    }
  };

  return (
    <>
      <Snackbar />
      <div className='rounded-3xl bg-white !px-12 !py-20 box-shadow w-full'>
        <div className='mb-8'>
          <p
            className='text-xl font-normal text-gray-default mb-2'
            id='login-welcome-msg'
          >
            {welcome}
          </p>
          <h1
            className='text-2xl font-semibold text-blue-dark'
            id='login-sign-title'
          >
            {signMsg}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-6'>
            <Controller
              name='email'
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    id='login-email-input'
                    type='email'
                    label={labels.email}
                    labelClassName='mb-2'
                    placeholder={placeholders.email}
                    isInputHasErr={!!error}
                    errMsg={error?.message}
                    onChange={onChange}
                    value={value}
                  />
                </>
              )}
            />
          </div>

          <div className='mb-6'>
            <Controller
              name='password'
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  id='login-password-input'
                  type='password'
                  label={labels.password}
                  labelClassName='mb-2'
                  placeholder={placeholders.password}
                  isInputHasErr={!!error}
                  errMsg={error?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          {userInfo?.message && (
            <div
              className='flex gap-x-4 bg-red bg-opacity-5 rounded-lg py-3 px-4 mb-4'
              id='login-error-msg'
            >
              <InfoCircleIcon iconColor='red' />
              <p className='text-red'>{userInfo?.message}</p>
            </div>
          )}

          <div className='flex justify-between items-center mb-6'>
            <div>
              <Controller
                name='rememberMe'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    label={labels.rememberMe}
                    checkboxClass='text-gray-medium'
                    iconShape='square'
                    id='login-remember-me-checkbox'
                  />
                )}
              />
            </div>
            <Link
              to={ROUTE_PATHS['resetPassword']}
              className='text-primary font-semibold text-sm'
              id='login-forget-password-link'
            >
              {labels.forgetPassword}
            </Link>
          </div>

          <Button
            label={labels.signIn}
            color='primary'
            block
            type='submit'
            disabled={Object.keys(errors).length > 0}
            id='login-sign-in-button'
          />
        </form>
      </div>
    </>
  );
};

export default Login;
