# 🏦 Nexus Bank Mobile

> Um aplicativo de Fintech moderno desenvolvido com **React Native** e **Expo**, focado em UI Design (Dark Mode), responsividade e experiência do usuário.

| Login | Cadastro | Home |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/e7a09c8e-0d08-4ca0-803e-4b9cc2fd42a2" width="250" /> | <img src="https://github.com/user-attachments/assets/aada7bdb-85b6-4ebb-905a-057c6bab3329" width="250" /> | <img src="https://github.com/user-attachments/assets/dd15e6d1-54bf-417f-8c24-f3c0f54ce8c6" width="250" /> |

| Pix | Boleto | Extrato |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/820d568b-8a80-4692-8229-7f20ad834346" width="250" /> | <img src="https://github.com/user-attachments/assets/c2b780ea-6274-47dc-b269-2ffabef4ac6d" width="250" /> | <img src="https://github.com/user-attachments/assets/cd68406e-9e58-4320-9867-02b957732a5a" width="250" /> |

<br>

## 📱 Sobre o Projeto

O **Nexus Bank** é um projeto de simulação de um banco digital completo. O objetivo foi criar uma interface mobile responsiva e elegante, implementando lógicas de front-end para simular o fluxo real de uma conta bancária sem a necessidade de um backend complexo.

O app conta com um sistema de **"Homologação Simulada"**, onde as transações (Pix, Pagamentos e Recargas) são processadas localmente para demonstrar o funcionamento da interface, validação de formulários e atualização de saldo/extrato em tempo real.

## ✨ Funcionalidades

* **🔐 Autenticação Simulada:**
    * Tela de Login e Cadastro.
    * **Validação de CPF** com máscara automática (Regex).
    * Geração automática de número de conta e cartão virtual ao cadastrar.
* **💳 Cartão de Crédito Virtual:**
    * Design responsivo com **Linear Gradient** (Estilo Nubank/Inter).
    * Exibição dinâmica do nome do titular e numeração gerada.
    * Adaptação para diferentes tamanhos de tela.
* **💰 Dashboard Financeiro:**
    * Visualização de saldo.
    * Extrato de movimentações com atualização instantânea (State Management).
* **🔄 Simulação de Transações (Modals):**
    * **Pix:** Envio com input de chave e valor.
    * **Pagamento:** Leitura simulada de código de barras (Lógica de valor fixo para teste).
    * **Recarga:** Simulação de recarga com input de telefone.
    * *Feedback visual de "Sistema em Homologação" antes de confirmar a operação.*

## 🚀 Tecnologias Utilizadas

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) (UI do Cartão)
* [Vector Icons](https://icons.expo.fyi/) (MaterialCommunityIcons & Ionicons)
* JavaScript (ES6+)

## 📦 Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/brunnodev50/nexus-bank-mobile-react-native.git](https://github.com/brunnodev50/nexus-bank-mobile-react-native.git)
