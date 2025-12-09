import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert, KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// --- COMPONENTE: CARTÃO DE CRÉDITO (Responsivo) ---
const CreditCard = ({ holderName, cardNumber }) => {
  return (
    <View style={cardStyles.container}>
      <LinearGradient
        colors={['#4c1d95', '#7c3aed', '#2563eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={cardStyles.card}
      >
        <View style={cardStyles.cardHeader}>
          <MaterialCommunityIcons name="integrated-circuit-chip" size={40} color="#fbbf24" />
          <MaterialCommunityIcons name="contactless-payment" size={24} color="rgba(255,255,255,0.8)" />
        </View>

        <View style={cardStyles.cardNumberContainer}>
          <Text style={cardStyles.cardNumber}>{cardNumber || '0000 0000 0000 0000'}</Text>
        </View>

        <View style={cardStyles.cardFooter}>
          <View style={{ flex: 2 }}>
            <Text style={cardStyles.label}>NOME DO TITULAR</Text>
            <Text style={cardStyles.cardHolder} numberOfLines={1}>{holderName || 'USUÁRIO'}</Text>
          </View>
          
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={cardStyles.label}>VALIDADE</Text>
            <Text style={cardStyles.expiry}>12/30</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View style={cardStyles.mastercardContainer}>
              <View style={[cardStyles.mcCircle, cardStyles.mcRed]} />
              <View style={[cardStyles.mcCircle, cardStyles.mcYellow]} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

// --- COMPONENTE: BOTÃO DE AÇÃO ---
const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <View style={styles.iconCircle}>
      <MaterialCommunityIcons name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- COMPONENTE: ITEM DE TRANSAÇÃO ---
const TransactionItem = ({ icon, title, date, value, isNegative }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionLeft}>
      <View style={styles.transactionIconBg}>
        <MaterialCommunityIcons name={icon} size={20} color="#fff" />
      </View>
      <View>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
    </View>
    <Text style={[styles.transactionValue, isNegative ? styles.textRed : styles.textGreen]}>
      {isNegative ? '-' : '+'} R$ {value}
    </Text>
  </View>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [screen, setScreen] = useState('login'); 
  
  // Dados do Usuário
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Inputs
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputCpf, setInputCpf] = useState(''); 

  // Controle do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [transactionValue, setTransactionValue] = useState('');
  const [transactionTarget, setTransactionTarget] = useState('');

  // --- FUNÇÃO DE MÁSCARA CPF ---
  const handleCpfChange = (text) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setInputCpf(value);
  };

  const handleRegister = () => {
    if (!inputName || !inputEmail || !inputPassword || !inputCpf) {
      Alert.alert('Erro', 'Preencha todos os campos, incluindo CPF');
      return;
    }
    
    const fakeCardNumber = `5234 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} 1024`;
    
    const newUser = {
      name: inputName.toUpperCase(),
      email: inputEmail,
      cpf: inputCpf,
      password: inputPassword,
      card: fakeCardNumber
    };

    setUser(newUser);
    setBalance(1500.00);
    setScreen('home');
    setTransactions([
      { id: 1, title: 'Bônus de Boas-vindas', date: 'Hoje', value: '1.500,00', icon: 'gift', isNegative: false }
    ]);
  };

  const handleLogin = () => {
    if (user && (inputEmail !== user.email || inputPassword !== user.password)) {
      Alert.alert('Erro', 'Credenciais inválidas');
      return;
    }
    if (!user) {
        handleRegister(); 
        return;
    }
    setScreen('home');
  };

  const openTransactionModal = (type) => {
    setCurrentAction(type);
    setTransactionValue('');
    setTransactionTarget('');
    setModalVisible(true);
  };

  const processTransaction = () => {
    // Validação especial: Se for 'pagar', não precisa validar o campo valor (pois é fixo)
    const needsValue = currentAction !== 'pagar';

    if (!transactionTarget || (needsValue && !transactionValue)) {
      Alert.alert('Atenção', 'Preencha todos os dados');
      return;
    }

    Alert.alert(
      "Sistema em Homologação",
      "Esta é uma movimentação de teste. O valor será simulado no seu extrato.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => finalizeTransaction() }
      ]
    );
  };

  const finalizeTransaction = () => {
    // Se for pagamento de boleto, força o valor para 100,00
    const finalValueStr = currentAction === 'pagar' ? '100,00' : transactionValue;
    
    const valueNum = parseFloat(finalValueStr.replace(',', '.'));
    const newBalance = balance - valueNum;
    
    setBalance(newBalance);

    const newTransaction = {
      id: Math.random().toString(),
      title: currentAction === 'pix' ? 'Envio Pix' : currentAction === 'pagar' ? 'Pagamento Boleto' : 'Recarga Celular',
      date: 'Agora',
      value: finalValueStr,
      icon: currentAction === 'pix' ? 'cube-scan' : currentAction === 'pagar' ? 'barcode' : 'cellphone',
      isNegative: true
    };

    setTransactions([newTransaction, ...transactions]);
    setModalVisible(false);
  };

  // --- RENDERS ---

  if (screen === 'login') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.authContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialCommunityIcons name="bank" size={80} color="#2563eb" style={{marginBottom: 20}} />
        <Text style={styles.authTitle}>NEXUS BANK</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor="#64748b" 
          value={inputEmail}
          onChangeText={setInputEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor="#64748b" 
          secureTextEntry 
          value={inputPassword}
          onChangeText={setInputPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('register')}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  if (screen === 'register') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.authContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.authTitle}>Crie sua conta</Text>
        <Text style={styles.authSubtitle}>Seu cartão será gerado automaticamente.</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome Completo" 
          placeholderTextColor="#64748b" 
          value={inputName}
          onChangeText={setInputName}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="CPF (000.000.000-00)" 
          placeholderTextColor="#64748b"
          value={inputCpf}
          onChangeText={handleCpfChange}
          keyboardType="numeric"
          maxLength={14}
        />

        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor="#64748b"
          value={inputEmail}
          onChangeText={setInputEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor="#64748b" 
          secureTextEntry
          value={inputPassword}
          onChangeText={setInputPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>CRIAR CONTA & GERAR CARTÃO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.linkText}>Voltar para Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* MODAL DE TRANSAÇÕES */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentAction === 'pix' ? 'Área Pix' : currentAction === 'pagar' ? 'Pagar Boleto' : 'Recarga de Celular'}
            </Text>

            <Text style={styles.inputLabel}>
              {currentAction === 'pix' ? 'Chave Pix (CPF, E-mail ou Aleatória)' : 
               currentAction === 'pagar' ? 'Código de Barras' : 'Número com DDD'}
            </Text>
            <TextInput 
              style={styles.modalInput} 
              placeholder="Digite aqui..." 
              placeholderTextColor="#94a3b8"
              value={transactionTarget}
              onChangeText={setTransactionTarget}
              keyboardType={currentAction === 'pix' ? 'default' : 'numeric'}
            />

            {/* CAMPO VALOR: Só aparece se NÃO for 'pagar' */}
            {currentAction !== 'pagar' && (
              <>
                <Text style={styles.inputLabel}>Valor (R$)</Text>
                <TextInput 
                  style={styles.modalInput} 
                  placeholder="0,00" 
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  value={transactionValue}
                  onChangeText={setTransactionValue}
                />
              </>
            )}

            {/* Se for pagar, avisa o valor fixo */}
            {currentAction === 'pagar' && (
              <Text style={{color: '#94a3b8', fontSize: 12, marginTop: 10, fontStyle: 'italic'}}>
                * Valor padrão de teste: R$ 100,00
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={processTransaction}>
                <Text style={styles.modalBtnText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name.split(' ')[0]}</Text>
            <Text style={styles.welcome}>Bem-vindo ao Nexus Bank</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => setScreen('login')}>
            <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <CreditCard holderName={user?.name} cardNumber={user?.card} />
        </View>

        <View style={styles.balanceSection}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Saldo em conta</Text>
            <Ionicons name="eye-outline" size={20} color="#94a3b8" />
          </View>
          <Text style={styles.balanceValue}>R$ {balance.toFixed(2).replace('.', ',')}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsContainer}>
          <ActionButton icon="cube-scan" label="Pix" onPress={() => openTransactionModal('pix')} />
          <ActionButton icon="barcode" label="Pagar" onPress={() => openTransactionModal('pagar')} />
          <ActionButton icon="cellphone-charging" label="Recarga" onPress={() => openTransactionModal('recarga')} />
          <ActionButton icon="cash-fast" label="Transferir" onPress={() => Alert.alert('Em breve')} />
          <ActionButton icon="finance" label="Investir" onPress={() => Alert.alert('Em breve')} />
        </ScrollView>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Últimas movimentações</Text>
          {transactions.map((item) => (
            <TransactionItem 
              key={item.id}
              icon={item.icon} 
              title={item.title} 
              date={item.date} 
              value={item.value} 
              isNegative={item.isNegative} 
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- ESTILOS CSS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 30 },
  
  // Auth
  authContainer: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', padding: 20 },
  authTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  authSubtitle: { color: '#94a3b8', fontSize: 14, marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#1e293b', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 15, fontSize: 16 },
  primaryButton: { width: '100%', backgroundColor: '#2563eb', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#3b82f6', marginTop: 20, fontSize: 14 },

  // Header
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  welcome: { color: '#94a3b8', fontSize: 14 },
  profileButton: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 50 },

  // Balance
  balanceSection: { paddingHorizontal: 20, marginVertical: 15 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  balanceLabel: { color: '#94a3b8', fontSize: 16 },
  balanceValue: { color: '#fff', fontSize: 28, fontWeight: 'bold' },

  // Actions
  actionsContainer: { paddingLeft: 20, marginBottom: 25 },
  actionButton: { alignItems: 'center', marginRight: 20 },
  iconCircle: { width: 60, height: 60, backgroundColor: '#1e293b', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { color: '#fff', fontSize: 12 },

  // Transactions
  transactionsSection: { backgroundColor: '#1e293b', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, minHeight: 400 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  transactionLeft: { flexDirection: 'row', alignItems: 'center' },
  transactionIconBg: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  transactionTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  transactionDate: { color: '#94a3b8', fontSize: 12 },
  transactionValue: { fontSize: 16, fontWeight: 'bold' },
  textRed: { color: '#ef4444' },
  textGreen: { color: '#10b981' },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputLabel: { color: '#94a3b8', fontSize: 14, marginBottom: 5, marginTop: 10 },
  modalInput: { backgroundColor: '#0f172a', color: '#fff', padding: 12, borderRadius: 8, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  modalBtn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#ef4444', marginRight: 10 },
  confirmBtn: { backgroundColor: '#2563eb', marginLeft: 10 },
  modalBtnText: { color: '#fff', fontWeight: 'bold' },
});

// ESTILOS AJUSTADOS DO CARTÃO (100% Responsivo)
const cardStyles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    width: '100%', 
  },
  card: { 
    width: '100%',
    maxWidth: 400,
    height: 220,
    borderRadius: 16, 
    padding: 20, 
    justifyContent: 'space-between', 
    elevation: 10 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardNumberContainer: { 
    marginTop: 10 
  },
  cardNumber: { 
    color: '#fff', 
    fontSize: 20,
    letterSpacing: 2, 
    fontFamily: 'monospace', 
    textShadowColor: 'rgba(0,0,0,0.3)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2 
  },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    width: '100%'
  },
  label: { 
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 10, 
    marginBottom: 2, 
    fontWeight: 'bold' 
  },
  cardHolder: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  expiry: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  mastercardContainer: { 
    flexDirection: 'row', 
    position: 'relative', 
    width: 44, 
    height: 30 
  },
  mcCircle: { 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    position: 'absolute', 
    top: 0 
  },
  mcRed: { backgroundColor: 'rgba(235, 0, 27, 0.8)', left: 0 },
  mcYellow: { backgroundColor: 'rgba(247, 158, 27, 0.8)', right: 0 },
});