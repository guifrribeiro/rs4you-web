import React, { useCallback, useMemo, useState } from 'react';
import {
  createContext,
  useContext,
} from 'react';
import { store } from 'react-notifications-component';
import { axios } from '../services/api';
import { REQUEST } from '../utils/enumerators';

type ChildrenProps = {
  children: React.ReactNode;
}

type AxiosContextType = {
  status: number | undefined;
}

const AxiosContext = createContext({} as AxiosContextType);

export function AxiosWrapper({ children }: ChildrenProps) : JSX.Element {
  const [status, setStatus] = useState();

  const responseError = useCallback(
    (error) => {
      if (error.response) {
        setStatus(error.response.status);
        if (status === REQUEST.LOGINFAILED) {
          store.addNotification({
            title: "Login/Senha inválidos!",
            message: " ",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        } else if (status === REQUEST.EXPIREDTOKEN) {
          store.addNotification({
            title: "Token de acesso expirado!",
            message: "Faça o login novamente.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        } else if (status === REQUEST.UNAUTHORIZED) {
          store.addNotification({
            title: "Acesso não autorizado!",
            message: " ",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        } else if (status === REQUEST.NOTFOUND) {
          store.addNotification({
            title: "Recurso não encontrado!",
            message: " ",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        } else if (status === REQUEST.SERVICEUNAVAILABLE) {
          store.addNotification({
            title: "Serviço indisponível!",
            message: " ",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        } else {
          store.addNotification({
            title: "Erro desconhecido!",
            message: "Entre em contato com a administração.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      } else {
        store.addNotification({
          title: "Não foi possível obter resposta da requisição!",
          message: "Tente novamentem em breve.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
      return Promise.reject(error);
    },
    [status]
  );

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        responseError(error);
      }
    );
  }, [responseError]);

  return (
    <AxiosContext.Provider value={{ status }}>
      { children }
    </AxiosContext.Provider>
  );
}

export function useAppContext() : AxiosContextType {
  return useContext(AxiosContext);
}