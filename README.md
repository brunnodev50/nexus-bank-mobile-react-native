# 🏦 Nexus Bank Mobile

> Um aplicativo de Fintech moderno desenvolvido com **React Native** e **Expo**, focado em UI Design (Dark Mode), responsividade e experiência do usuário.

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
